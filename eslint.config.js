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
    // public/sw.js + scripts are plain browser/node JS, not TS.
    files: ['public/**/*.js', 'scripts/**/*.js', 'vite.config.js'],
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
