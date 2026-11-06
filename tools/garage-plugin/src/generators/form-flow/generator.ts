import {
  Tree,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  joinPathFragments,
  logger,
  names,
  offsetFromRoot,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { FormFlowGeneratorSchema } from './schema';

/** Marker comment in an app's app.routes.ts; new routes are inserted above it. */
export const ROUTES_MARKER = '// <form-flow-routes>';

interface StepTemplateVars {
  key: string;
  fileName: string;
  className: string;
  propertyName: string;
  label: string;
  prevPath: string | null;
  nextPath: string;
}

export interface NormalizedOptions {
  fileName: string;
  className: string;
  propertyName: string;
  constantName: string;
  title: string;
  projectName: string;
  projectRoot: string;
  importPath: string;
  routePath: string;
  app: string;
  guarded: boolean;
  e2e: boolean;
  steps: StepTemplateVars[];
  skipFormat: boolean;
}

const titleCase = (s: string) =>
  names(s)
    .fileName.split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export function normalizeOptions(tree: Tree, schema: FormFlowGeneratorSchema): NormalizedOptions {
  const n = names(schema.name);
  const stepNames = (schema.steps ?? 'details')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => names(s).fileName)
    .filter((s) => s !== 'review');

  if (stepNames.length === 0) {
    throw new Error('Provide at least one data-entry step, e.g. --steps=owner,vehicle');
  }
  const duplicates = stepNames.filter((s, i) => stepNames.indexOf(s) !== i);
  if (duplicates.length) {
    throw new Error(`Duplicate step names: ${[...new Set(duplicates)].join(', ')}`);
  }

  const projectRoot = joinPathFragments(schema.directory ?? 'libs/forms', n.fileName);
  if (tree.exists(projectRoot)) {
    throw new Error(`${projectRoot} already exists.`);
  }

  const steps: StepTemplateVars[] = stepNames.map((step, i) => {
    const sn = names(step);
    return {
      key: sn.propertyName,
      fileName: sn.fileName,
      className: sn.className,
      propertyName: sn.propertyName,
      label: titleCase(step),
      prevPath: i === 0 ? null : stepNames[i - 1],
      nextPath: stepNames[i + 1] ?? 'review',
    };
  });

  return {
    fileName: n.fileName,
    className: n.className,
    propertyName: n.propertyName,
    constantName: n.constantName,
    title: schema.title ?? titleCase(schema.name),
    projectName: n.fileName,
    projectRoot,
    importPath: `@garage/${n.fileName}`,
    routePath: schema.route ?? n.fileName,
    app: schema.app ?? 'garage',
    guarded: schema.guarded ?? true,
    e2e: schema.e2e ?? true,
    steps,
    skipFormat: schema.skipFormat ?? false,
  };
}

export async function formFlowGenerator(tree: Tree, schema: FormFlowGeneratorSchema) {
  const options = normalizeOptions(tree, schema);
  const vars = { ...options, offset: offsetFromRoot(options.projectRoot), tmpl: '' };

  // 1. Library skeleton: project config, tsconfigs, jest, eslint, shell, state, routes, review step.
  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'library',
    tags: ['type:feature', 'scope:forms'],
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files', 'lib'), options.projectRoot, vars);

  // 2. One component per data-entry step.
  for (const step of options.steps) {
    generateFiles(tree, path.join(__dirname, 'files', 'step'), options.projectRoot, {
      ...vars,
      step,
      stepFileName: step.fileName, // used in template paths (__stepFileName__)
    });
  }

  // 3. Make the library importable as @garage/<name>.
  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions ??= {};
    json.compilerOptions.paths ??= {};
    json.compilerOptions.paths[options.importPath] = [
      joinPathFragments(options.projectRoot, 'src/index.ts'),
    ];
    return json;
  });

  // 4. Lazy-load it from the app and add an e2e smoke test.
  if (options.app) {
    registerRoute(tree, options);
    if (options.e2e) addE2eSpec(tree, options, vars);
  }

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return () => {
    logger.info('');
    logger.info(`Form flow "${options.title}" created in ${options.projectRoot}.`);
    logger.info(`  nx test ${options.projectName}`);
    if (options.app) logger.info(`  nx serve ${options.app}  ->  /${options.routePath}`);
  };
}

export function registerRoute(tree: Tree, options: NormalizedOptions): void {
  const routesFile = `apps/${options.app}/src/app/app.routes.ts`;
  const snippet = [
    '  {',
    `    path: '${options.routePath}',`,
    ...(options.guarded ? ['    canActivate: [authGuard],'] : []),
    `    loadChildren: () => import('${options.importPath}').then((m) => m.${options.propertyName}Routes),`,
    '  },',
  ].join('\n');

  const source = tree.exists(routesFile) ? tree.read(routesFile, 'utf-8') : null;
  const markerIndex = source?.indexOf(ROUTES_MARKER) ?? -1;
  if (!source || markerIndex === -1) {
    logger.warn(
      `Could not find "${ROUTES_MARKER}" in ${routesFile}. Add this route manually:\n${snippet}`,
    );
    return;
  }

  const lineStart = source.lastIndexOf('\n', markerIndex) + 1;
  let updated = `${source.slice(0, lineStart)}${snippet}\n${source.slice(lineStart)}`;

  if (options.guarded && !/\bauthGuard\b/.test(source)) {
    updated = `import { authGuard } from '@garage/ui-lib';\n${updated}`;
  }
  tree.write(routesFile, updated);
}

function addE2eSpec(tree: Tree, options: NormalizedOptions, vars: object): void {
  const e2eRoot = `apps/${options.app}-e2e`;
  if (!tree.exists(e2eRoot)) {
    logger.warn(`No ${e2eRoot} project found; skipping e2e spec.`);
    return;
  }
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'e2e'),
    joinPathFragments(e2eRoot, 'src'),
    vars,
  );
}

export default formFlowGenerator;
