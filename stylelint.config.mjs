/**
 * Stylelint for the workspace's SCSS. Run with `npm run lint:styles`
 * (add `-- --fix` to autofix). Component styles written inline in .ts files
 * are not linted; move them to a .scss file to get coverage.
 *
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['**/dist/**', '**/coverage/**', '**/node_modules/**', 'tools/**/files/**'],
  rules: {
    // BEM-style names used across ui-lib: block, block__element, block--modifier.
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      { message: (name) => `Class "${name}" should be kebab-case BEM (block__element--modifier)` },
    ],
    // Design tokens are all namespaced: --garage-*, plus local helpers like --tone.
    'custom-property-pattern': [
      '^(?:garage-)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      { message: (name) => `Custom property "${name}" should be kebab-case` },
    ],
    // Angular view-encapsulation selectors.
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['host', 'host-context'] }],
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }],
    // Font names (Roboto, SFMono-Regular) aren't keywords; also covers --garage-font-family.
    'value-keyword-case': ['lower', { ignoreProperties: ['/font-family$/'] }],
  },
};
