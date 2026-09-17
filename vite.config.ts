import { defineConfig, type Plugin } from 'vite';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Plan 044 D4: inject a content-hash build version into public/sw.js at build
 * time. The service worker uses this value to version its cache name
 * (`orrery-<version>`), so when a new deploy changes the app code, the old
 * cache is evicted on SW `activate` and the runtime cache can't grow unbounded
 * across deploys.
 *
 * We hash the FULL emitted dist/ output (every file the SW serves — index.html,
 * offline.html, manifest, icons, and the JS/CSS bundles) EXCEPT sw.js itself,
 * so the version reflects the entire app the SW actually serves. `public/sw.js`
 * is copied verbatim by Vite (public files aren't processed), so we
 * post-process it on disk in `closeBundle`, after the bundle is written.
 */
function swBuildVersion(): Plugin {
  let outDir = 'dist';
  return {
    name: 'sw-build-version',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const swPath = join(outDir, 'sw.js');
      if (!existsSync(swPath)) return;

      // Recursively hash every emitted file (sorted, by relative path) except
      // sw.js, so the version is deterministic for a given app and changes
      // whenever any served file changes.
      const hash = createHash('sha256');
      const walk = (dir: string, prefix: string): void => {
        for (const entry of readdirSync(dir).sort()) {
          const abs = join(dir, entry);
          const rel = prefix ? `${prefix}/${entry}` : entry;
          if (rel === 'sw.js') continue;
          if (statSync(abs).isDirectory()) {
            walk(abs, rel);
          } else {
            hash.update(rel); // include the path so renames also bump the version
            hash.update(readFileSync(abs));
          }
        }
      };
      walk(outDir, '');
      const version = hash.digest('hex').slice(0, 10);

      const sw = readFileSync(swPath, 'utf8');
      if (sw.includes('__BUILD_VERSION__')) {
        writeFileSync(swPath, sw.replace('__BUILD_VERSION__', version));
      }
    },
  };
}

export default defineConfig({
  base: './',
  server: { port: 5173 },
  build: { outDir: 'dist', target: 'es2022' },
  plugins: [swBuildVersion()],
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
