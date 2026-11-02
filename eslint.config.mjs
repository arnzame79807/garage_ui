import nx from '@nx/eslint-plugin';

/**
 * Root ESLint config. `@nx/enforce-module-boundaries` encodes the workspace
 * architecture via project tags:
 *
 *   type:app      -> may import type:feature, type:ui
 *   type:feature  -> may import type:ui only (features never import each other)
 *   type:ui       -> may import type:ui only
 *   type:e2e      -> standalone (talks to apps over HTTP)
 *   type:tooling  -> may import type:tooling
 */
export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/coverage', 'tools/**/files/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:feature', 'type:ui'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:ui'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui'],
            },
            {
              sourceTag: 'type:e2e',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'type:tooling',
              onlyDependOnLibsWithTags: ['type:tooling'],
            },
          ],
        },
      ],
    },
  },
];
