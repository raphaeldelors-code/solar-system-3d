#!/usr/bin/env node
/**
 * CI bundle-size budget (plan 044 D5).
 *
 * Fails the build if the MAIN entry chunk (the first-load JS the browser must
 * fetch before anything renders) exceeds the budget. This is a regression
 * guard: it does not chase a specific target, it stops the bundle from
 * silently growing past a ceiling.
 *
 * Why the entry chunk, not the whole dist/? The lazy chunks (e.g. the 105 kB
 * horizonsMoon ephemeris) are fetched on demand and are not a first-load tax,
 * so they are intentionally excluded. The entry chunk is the number that
 * matters for time-to-interactive on the target phones.
 *
 * The budget is set with headroom above the current entry size (~1.19 MB,
 * dominated by three.js). The plan's original "800 kB" target was written when
 * the bundle was 775 kB, before the B1–B8 data features landed; three.js alone
 * is ~1.0 MB source, so 800 kB is not reachable without dropping the 3D
 * renderer. The starfield lazy-load (D5 follow-up) is expected to bring the
 * entry down further — lower the budget then.
 */
import { readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// First-load budget for the main entry chunk (bytes). ~1.24 MB.
const BUDGET_BYTES = 1_300_000;

function fail(msg) {
  console.error(`\n❌ BUNDLE SIZE BUDGET EXCEEDED\n${msg}\n`);
  process.exit(1);
}

// 1. Find the entry chunk referenced by dist/index.html.
let indexHtml;
try {
  indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');
} catch {
  fail(`dist/index.html not found — run \`npm run build\` first.`);
}
const m = indexHtml.match(/\/assets\/index-[^"']+\.js/);
if (!m) fail('Could not find the entry chunk (/assets/index-*.js) in dist/index.html.');
const entryPath = join(distDir, m[0]);

// 2. Measure it.
let size;
try {
  size = statSync(entryPath).size;
} catch {
  fail(`Entry chunk ${m[0]} not found on disk.`);
}

const mb = (b) => (b / 1_000_000).toFixed(3);
console.log(`Entry chunk: ${m[0]}`);
console.log(`  size:   ${size.toLocaleString()} bytes (${mb(size)} MB)`);
console.log(`  budget: ${BUDGET_BYTES.toLocaleString()} bytes (${mb(BUDGET_BYTES)} MB)`);

if (size > BUDGET_BYTES) {
  const over = size - BUDGET_BYTES;
  fail(
    `The entry chunk is ${over.toLocaleString()} bytes over budget.\n` +
      `If this is intentional (a new feature), raise BUDGET_BYTES in ` +
      `scripts/size-budget.mjs with a comment explaining why — otherwise, ` +
      `find what grew (npm run build) and trim it.`,
  );
}
console.log(`\n✅ Within budget (${mb(BUDGET_BYTES) - mb(size)} MB of headroom).\n`);
