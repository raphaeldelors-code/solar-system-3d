import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

// Flat config (ESLint v9+). TypeScript-aware rules for src/ + tests/, plain
// JS rules for the service worker + build scripts. `eslint-config-prettier`
// goes last so it switches off every stylistic rule that Prettier owns.
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // The codebase has an established, deliberate style; keep lint focused
      // on real defects (unreachable code, dup args, no-unused) rather than
      // rehashing taste. Prettier handles all the rest via `npm run format`.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // D10 (plan 046): enforce the "pure sim/data" invariant. The sim + data
    // layers must stay free of three.js and the DOM so they run in Node under
    // vitest and can be unit-tested without a browser. This was previously
    // convention-only (enforced by review); now it's a lint gate so it can't
    // silently rot.
    files: ['src/sim/**/*.ts', 'src/data/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'three',
              message:
                'src/sim and src/data must stay pure (no three.js) so they run in Node under vitest. Move three-dependent code to src/render.',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        {
          name: 'document',
          message:
            'src/sim and src/data must stay pure (no DOM) so they run in Node under vitest. Move DOM code to src/app or src/render.',
        },
        {
          name: 'window',
          message:
            'src/sim and src/data must stay pure (no DOM) so they run in Node under vitest. Move DOM code to src/app or src/render.',
        },
        {
          name: 'navigator',
          message:
            'src/sim and src/data must stay pure (no DOM) so they run in Node under vitest. Move DOM code to src/app or src/render.',
        },
      ],
    },
  },
  {
    // public/sw.js + scripts are plain browser/node JS, not TS.
    files: ['public/**/*.js', 'scripts/**/*.js', 'scripts/**/*.mjs', 'vite.config.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  eslintConfigPrettier,
);
