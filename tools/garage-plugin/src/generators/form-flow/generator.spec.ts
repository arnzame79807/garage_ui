import { Tree, readJson, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { ROUTES_MARKER, formFlowGenerator } from './generator';

const APP_ROUTES = `import { Route } from '@angular/router';
import { authGuard } from '@garage/ui-lib';

export const appRoutes: Route[] = [
  ${ROUTES_MARKER} Routes added by the generator go above this line.
  { path: '**', redirectTo: '' },
];
`;

describe('form-flow generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write('apps/garage/src/app/app.routes.ts', APP_ROUTES);
    tree.write('apps/garage-e2e/src/support/auth.ts', 'export async function signIn() {}\n');
  });

  const run = (overrides: Record<string, unknown> = {}) =>
    formFlowGenerator(tree, {
      name: 'vehicleRegistration',
      steps: 'owner, vehicle-details',
      skipFormat: true,
      ...overrides,
    });

  it('creates a feature library project', async () => {
    await run();
    const config = readProjectConfiguration(tree, 'vehicle-registration');
    expect(config.root).toBe('libs/forms/vehicle-registration');
    expect(config.tags).toEqual(['type:feature', 'scope:forms']);
  });

  it('generates the shell, state, routes and one component per step plus review', async () => {
    await run();
    const lib = 'libs/forms/vehicle-registration';
    for (const file of [
      'jest.config.ts',
      'eslint.config.mjs',
      'tsconfig.lib.json',
      'src/index.ts',
      'src/lib/vehicle-registration.routes.ts',
      'src/lib/vehicle-registration.state.ts',
      'src/lib/vehicle-registration-flow.component.ts',
      'src/lib/steps/owner/owner-step.component.ts',
      'src/lib/steps/owner/owner-step.component.spec.ts',
      'src/lib/steps/vehicle-details/vehicle-details-step.component.ts',
      'src/lib/steps/review/review-step.component.ts',
    ]) {
      expect(tree.exists(`${lib}/${file}`)).toBe(true);
    }
    expect(tree.exists(`${lib}/jest.config.ts.template`)).toBe(false);
  });

  it('wires step navigation in order and ends at review', async () => {
    await run();
    const steps = 'libs/forms/vehicle-registration/src/lib/steps';
    const owner = tree.read(`${steps}/owner/owner-step.component.ts`, 'utf-8');
    const details = tree.read(
      `${steps}/vehicle-details/vehicle-details-step.component.ts`,
      'utf-8',
    );
    expect(owner).toContain("['..', 'vehicle-details']");
    expect(owner).not.toContain('Back');
    expect(details).toContain("['..', 'owner']");
    expect(details).toContain("['..', 'review']");
  });

  it('uses the correct relative offset to workspace configs', async () => {
    await run();
    const tsconfig = readJson(tree, 'libs/forms/vehicle-registration/tsconfig.json');
    expect(tsconfig.extends).toBe('../../../tsconfig.base.json');
  });

  it('adds a path alias', async () => {
    await run();
    const paths = readJson(tree, 'tsconfig.base.json').compilerOptions.paths;
    expect(paths['@garage/vehicle-registration']).toEqual([
      'libs/forms/vehicle-registration/src/index.ts',
    ]);
  });

  it('registers a guarded, lazy route above the marker', async () => {
    await run();
    const routes = tree.read('apps/garage/src/app/app.routes.ts', 'utf-8') ?? '';
    const route = routes.indexOf("path: 'vehicle-registration'");
    expect(route).toBeGreaterThan(-1);
    expect(route).toBeLessThan(routes.indexOf(ROUTES_MARKER));
    expect(routes).toContain('canActivate: [authGuard]');
    expect(routes).toContain(
      "import('@garage/vehicle-registration').then((m) => m.vehicleRegistrationRoutes)",
    );
  });

  it('can skip the guard and use a custom route', async () => {
    await run({ guarded: false, route: 'register' });
    const routes = tree.read('apps/garage/src/app/app.routes.ts', 'utf-8') ?? '';
    expect(routes).toContain("path: 'register'");
    expect(routes).not.toMatch(/path: 'register',\s+canActivate/);
  });

  it('adds an e2e spec to the app e2e project', async () => {
    await run();
    const spec = tree.read('apps/garage-e2e/src/vehicle-registration.spec.ts', 'utf-8');
    expect(spec).toContain("page.goto('/vehicle-registration')");
    expect(spec).toContain('signIn(page)');
  });

  it('rejects an existing project folder', async () => {
    await run();
    await expect(run()).rejects.toThrow('already exists');
  });

  it('requires at least one data-entry step', async () => {
    await expect(run({ steps: 'review' })).rejects.toThrow('at least one');
  });
});
