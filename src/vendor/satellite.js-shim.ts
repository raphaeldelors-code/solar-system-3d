/**
 * Local shim for the `satellite.js` package (plan 044 B1).
 *
 * The package's root entry (`node_modules/satellite.js/dist/index.js`) does
 * `export * from './wasm/index.js'`, and that WASM module uses top-level
 * await — which the project's IIFE build (Rollup) cannot emit. We only need
 * the pure-JS SGP4 core (`twoline2satrec` + `propagate`), which lives in the
 * non-WASM submodules `dist/io.js` and `dist/propagation.js`.
 *
 * This shim re-exports exactly those, via RELATIVE paths (which bypass the
 * package's `exports` map, whose only entry is the WASM-polluted root).
 * `vite.config.ts` aliases the bare specifier `satellite.js` to this file, so
 * `import ... from 'satellite.js'` in src/ resolves here. The import closure
 * of io.js + propagation.js is WASM-free (verified: no `wasm` references in
 * the transitive import graph).
 *
 * satellite.js is MIT-licensed (see node_modules/satellite.js/LICENSE).
 */
export { twoline2satrec } from '../../node_modules/satellite.js/dist/io.js';
export { propagate } from '../../node_modules/satellite.js/dist/propagation.js';
export type { SatRec } from '../../node_modules/satellite.js/dist/propagation/SatRec.js';
