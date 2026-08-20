import { describe, it, expect } from 'vitest';
import { solveKepler, positionAt, normalizeDeg } from '../src/sim/kepler';
import { J2000_UTC } from '../src/sim/types';

const DEG = Math.PI / 180;

describe('solveKepler (radians)', () => {
  it('returns M for a circular orbit (e=0)', () => {
    // API is radians-only: for a circular orbit E == M exactly.
    expect(solveKepler(42 * DEG, 0)).toBeCloseTo(42 * DEG, 10);
  });

  it('resolves the equation for high eccentricity', () => {
    const e = 0.45;
    for (const mDeg of [0, 15, 90, 179, 270, 359]) {
      const m = mDeg * (Math.PI / 180);
      const E = solveKepler(m, e);
      const residual = E - e * Math.sin(E) - m;
      expect(Math.abs(residual)).toBeLessThan(1e-7);
    }
  });

  it('is monotonic in M', () => {
    const e = 0.3;
    let prev = -Infinity;
    for (let d = 0; d < 360; d += 10) {
      const E = solveKepler(d * DEG, e);
      expect(E).toBeGreaterThan(prev);
      prev = E;
    }
  });
});

describe('normalizeDeg', () => {
  it('maps to [0,360)', () => {
    expect(normalizeDeg(-10)).toBe(350);
    expect(normalizeDeg(370)).toBe(10);
    expect(normalizeDeg(0)).toBe(0);
  });
});

describe('positionAt (real elements)', () => {
  // J2000 elements (JPL mean elements, converted to our convention:
  // M0 = L - varpi, peri = varpi - node; node=0 for Earth).
  // Verified against Meeus "Astronomical Algorithms" solar theory.
  const earth = {
    a: 1.00000261,
    e: 0.01671123,
    i: -0.00001531,
    node: 0.0,
    peri: 102.93768193,
    M0: -2.47311,
    n: 0.98560912,
  };

  it('Earth is at ~0.983 AU from the Sun at J2000 (perihelion ~Jan 3)', () => {
    const p = positionAt(earth, 0);
    const r = Math.hypot(p.x, p.y, p.z);
    expect(r).toBeCloseTo(0.9833, 2);
  });

  it('Earth heliocentric ecliptic longitude at J2000 is ~100.38 deg', () => {
    const p = positionAt(earth, 0);
    // Heliocentric longitude = atan2(y, x); Sun geocentric = that + 180 (~280.38).
    // Matches Meeus solar theory to ~0.002 deg (mean vs apparent).
    const lon = normalizeDeg(Math.atan2(p.y, p.x) * (180 / Math.PI));
    expect(lon).toBeCloseTo(100.38, 1);
  });

  it('returns to the same position after one full period', () => {
    const period = 360 / earth.n;
    const p0 = positionAt(earth, 0);
    const p1 = positionAt(earth, period);
    expect(p1.x).toBeCloseTo(p0.x, 5);
    expect(p1.y).toBeCloseTo(p0.y, 5);
    expect(p1.z).toBeCloseTo(p0.z, 5);
  });

  it('Mars is between 1.381 and 1.666 AU (perihelion..aphelion)', () => {
    const mars = {
      a: 1.52371034,
      e: 0.0933941,
      i: 1.84969142,
      node: 49.55953891,
      peri: -73.5031685,
      M0: 19.39019754,
      n: 0.52402078,
    };
    let min = Infinity,
      max = -Infinity;
    for (let d = 0; d < 687; d += 5) {
      const p = positionAt(mars, d);
      const r = Math.hypot(p.x, p.y, p.z);
      min = Math.min(min, r);
      max = Math.max(max, r);
    }
    expect(min).toBeGreaterThan(1.381);
    expect(min).toBeLessThan(1.4); // a(1-e) = 1.3814
    expect(max).toBeGreaterThan(1.66);
    expect(max).toBeLessThan(1.67); // a(1+e) = 1.666
  });

  it('J2000 epoch constant is 2000-01-01 12:00 UTC', () => {
    expect(new Date(J2000_UTC).toISOString()).toBe('2000-01-01T12:00:00.000Z');
  });
});
