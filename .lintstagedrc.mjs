import path from 'node:path';

/**
 * Pre-commit checks on staged files (run by .husky/pre-commit).
 * Everything goes through one task list so the steps run in order and never
 * edit the same file concurrently.
 */
const FORMATTABLE = /\.(?:ts|mjs|js|json|html|scss|css|md|ya?ml)$/;
const LINTABLE = /\.(?:ts|mjs|js|html|json)$/;

const rel = (files) => files.map((f) => path.relative(process.cwd(), f));
const quote = (files) => files.map((f) => JSON.stringify(f)).join(' ');

export default {
  '*': (absFiles) => {
    const files = rel(absFiles);
    const formattable = files.filter((f) => FORMATTABLE.test(f));
    const scss = files.filter((f) => f.endsWith('.scss'));
    const lintable = files.filter((f) => LINTABLE.test(f));

    const tasks = [];
    if (formattable.length) tasks.push(`nx format:write --files=${formattable.join(',')}`);
    if (scss.length) tasks.push(`stylelint --fix --allow-empty-input ${quote(scss)}`);
    // ESLint runs per Nx project (each has its own Angular config), on projects touched by the commit.
    if (lintable.length) tasks.push(`nx affected -t lint --files=${lintable.join(',')}`);
    return tasks;
  },
};
