/**
 * JPL Horizons live Moon ephemeris (plan 044 B2).
 *
 * The JPL Horizons API (ssd.jpl.nasa.gov) has NO CORS headers, so a static
 * GitHub Pages app cannot call it from the browser. Instead we BAKE a
 * high-precision DE441 ephemeris snapshot of the Moon (geocentric, J2000
 * ecliptic, 6-hour steps) into `horizonsMoon.json` and interpolate it at
 * runtime. This makes the "most accurate" claim live: the info card can
 * diff the app's Meeus ch.47 analytic Moon against JPL's numerical DE441
 * ephemeris and show the residual.
 *
 * The snapshot covers 2026-09-01 .. 2027-08-31 (the time-scrub range).
 * Outside that window `moonHorizons()` returns null and the UI falls back
 * to the Meeus-only readout.
 *
 * Pure + dependency-free (unit-tested in tests/horizons.test.ts).
 */
/**
 * The baked snapshot, loaded lazily (plan 044 D5). The 120 kB JSON is
 * dynamic-imported so it is NOT in the main bundle — it only matters when the
 * Moon info card is open. `preloadHorizons()` is kicked off at module load, so
 * the chunk fetches in the background (in parallel with the main bundle) and is
 * almost always ready by the time the user opens the Moon card. Until it
 * resolves, `moonHorizons()`/`moonHorizonsDiff()` return null and the UI shows
 * the Meeus-only readout (the same fallback as out-of-window times).
 */
let snapshot: { n: number; data: number[] } | null = null;
let snapshotPromise: Promise<void> | null = null;

/**
 * Load the baked snapshot (idempotent). Resolves once the data is cached.
 * Exported so tests can await it; the app relies on the module-load preload.
 */
export function preloadHorizons(): Promise<void> {
  if (snapshot) return Promise.resolve();
  if (!snapshotPromise) {
    snapshotPromise = import('../data/horizonsMoon.json')
      .then((m) => {
        snapshot = m.default as { n: number; data: number[] };
      })
      .catch((err) => {
        // A failed preload must not take the app down — the Moon card simply
        // falls back to the Meeus-only readout.
        snapshotPromise = null;
        console.warn('[horizons] snapshot preload failed', err);
      });
  }
  return snapshotPromise;
}

// Kick the background preload off at module load (see above).
void preloadHorizons();

/**
 * The loaded snapshot, or null until `preloadHorizons()` resolves. Exposed for
 * tests (and any future code that needs the raw rows / window metadata).
 */
export function horizonsSnapshot(): { n: number; data: number[] } | null {
  return snapshot;
}

/**
 * Interpolate the baked Horizons Moon ephemeris at `tDays` (days from J2000,
 * TT — the same time base as `moonGeocentricJ2000`). Returns the geocentric
 * position in AU (J2000 ecliptic), or null if `tDays` is outside the baked
 * window.
 *
 * Linear interpolation between 6-hour samples: the Moon moves ~1.3°/h, so a
 * 6 h step is ~7.8°; linear over half a step (~3.9°) has a geometric error
 * of ~r·(1−cos(1.95°)) ≈ 12 km — well below the Meeus-vs-DE441 residual we
 * are trying to display (~100 km), so it does not pollute the diff.
 */
export function moonHorizons(tDays: number): [number, number, number] | null {
  if (!snapshot) return null; // not loaded yet (or preload failed)
  const { data, n } = snapshot;
  if (n < 2) return null;
  const t0 = data[0];
  const t1 = data[(n - 1) * 4];
  if (tDays < t0 || tDays > t1) return null;
  // Rows are uniformly spaced (stepHours); binary-search the bracket.
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (data[mid * 4] <= tDays) lo = mid;
    else hi = mid;
  }
  const a = tDays - data[lo * 4];
  const b = data[hi * 4] - data[lo * 4];
  const f = b > 0 ? a / b : 0;
  const x = data[lo * 4 + 1] + f * (data[hi * 4 + 1] - data[lo * 4 + 1]);
  const y = data[lo * 4 + 2] + f * (data[hi * 4 + 2] - data[lo * 4 + 2]);
  const z = data[lo * 4 + 3] + f * (data[hi * 4 + 3] - data[lo * 4 + 3]);
  return [x, y, z];
}

/**
 * Diff the Meeus analytic Moon against the baked Horizons (DE441) ephemeris
 * at `tDays`. Returns null when the snapshot does not cover the time.
 *
 * `rangeKm` is the Earth–Moon distance from the DE441 ephemeris (the
 * "truth" readout); `residualKm` is the magnitude of the Meeus position
 * error relative to DE441 — the number that proves the analytic model's
 * accuracy.
 */
export function moonHorizonsDiff(
  meeusAu: [number, number, number],
  tDays: number,
): { rangeKm: number; residualKm: number } | null {
  const hz = moonHorizons(tDays);
  if (!hz) return null;
  const AU_KM = 149_597_870.7;
  const rangeKm = Math.hypot(hz[0], hz[1], hz[2]) * AU_KM;
  const dx = (hz[0] - meeusAu[0]) * AU_KM;
  const dy = (hz[1] - meeusAu[1]) * AU_KM;
  const dz = (hz[2] - meeusAu[2]) * AU_KM;
  return { rangeKm, residualKm: Math.hypot(dx, dy, dz) };
}
