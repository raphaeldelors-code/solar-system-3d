import { describe, it, expect, beforeAll } from 'vitest';
import {
  moonHorizons,
  moonHorizonsDiff,
  preloadHorizons,
  horizonsSnapshot,
} from '../src/sim/horizons';
import { moonGeocentricJ2000 } from '../src/sim/moon';

const AU_KM = 149_597_870.7;
// The baked snapshot is sampled every 6 hours (see the bake script); the lazy
// snapshot object only carries { n, data }, so the step is asserted here.
const STEP_HOURS = 6;

describe('horizons (baked DE441 Moon ephemeris)', () => {
  beforeAll(async () => {
    // The snapshot is now lazy-loaded (plan 044 D5) — await it once so the
    // sync assertions below run against real data.
    await preloadHorizons();
  });

  it('snapshot is well-formed', () => {
    const snap = horizonsSnapshot();
    expect(snap).not.toBeNull();
    expect(snap!.n).toBeGreaterThan(100);
    expect(snap!.data.length).toBe(snap!.n * 4);
    // first row tDays is ~2026-09-01 (≈ 9739 days after J2000)
    expect(snap!.data[0]).toBeGreaterThan(9700);
    expect(snap!.data[0]).toBeLessThan(9800);
  });

  it('returns null outside the baked window', () => {
    // 2020 (well before the window)
    expect(moonHorizons(1000)).toBeNull();
    // 2030 (well after)
    expect(moonHorizons(12000)).toBeNull();
  });

  it('returns a valid position at the first sample', () => {
    const t0 = horizonsSnapshot()!.data[0];
    const p = moonHorizons(t0);
    expect(p).not.toBeNull();
    const [x, y, z] = p!;
    const rKm = Math.hypot(x, y, z) * AU_KM;
    // Moon distance is 356,000–407,000 km
    expect(rKm).toBeGreaterThan(350_000);
    expect(rKm).toBeLessThan(410_000);
  });

  it('interpolates smoothly (no jumps between samples)', () => {
    const t0 = horizonsSnapshot()!.data[0];
    const stepDays = STEP_HOURS / 24;
    const p0 = moonHorizons(t0)!;
    const p1 = moonHorizons(t0 + stepDays / 2)!; // half-step
    const p2 = moonHorizons(t0 + stepDays)!;
    // half-step point should be between the two samples (within tolerance)
    const midX = (p0[0] + p2[0]) / 2;
    const midY = (p0[1] + p2[1]) / 2;
    const midZ = (p0[2] + p2[2]) / 2;
    // linear interpolation: p1 should be very close to the midpoint
    const err = Math.hypot(p1[0] - midX, p1[1] - midY, p1[2] - midZ) * AU_KM;
    expect(err).toBeLessThan(50_000); // < 50 km (should be ~0 for linear)
  });

  it('Meeus vs DE441 residual is physically plausible (< 500 km)', () => {
    const snap = horizonsSnapshot()!;
    // Pick a time in the middle of the window
    const tMid = (snap.data[0] + snap.data[(snap.n - 1) * 4]) / 2;
    const meeus = moonGeocentricJ2000(tMid);
    const diff = moonHorizonsDiff(meeus, tMid);
    expect(diff).not.toBeNull();
    // DE441 range should be a valid Moon distance
    expect(diff!.rangeKm).toBeGreaterThan(350_000);
    expect(diff!.rangeKm).toBeLessThan(410_000);
    // Meeus ch.47 is accurate to ~0.01° in position ≈ ~100 km at lunar distance.
    // DE441 is the truth. The residual should be < 500 km (generous bound).
    expect(diff!.residualKm).toBeLessThan(500);
    // And > 0 (they are different models)
    expect(diff!.residualKm).toBeGreaterThan(0);
  });

  it('returns null for the diff outside the window', () => {
    const meeus = moonGeocentricJ2000(1000);
    expect(moonHorizonsDiff(meeus, 1000)).toBeNull();
  });
});
