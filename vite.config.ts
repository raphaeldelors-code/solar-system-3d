import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5173 },
  build: { outDir: 'dist', target: 'es2022' },
  resolve: {
    alias: {
      // Plan 044 B1: the `satellite.js` root entry re-exports a WASM module
      // (top-level await) that the IIFE build can't emit. Alias the bare
      // specifier to a local shim that re-exports only the pure-JS SGP4 core
      // (twoline2satrec + propagate) from the non-WASM submodules.
      'satellite.js': new URL('./src/vendor/satellite.js-shim.ts', import.meta.url).pathname,
    },
  },
});
