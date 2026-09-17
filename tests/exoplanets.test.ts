import { describe, it, expect } from 'vitest';
import { EXO_SYSTEMS, EXO_PLANET_COUNT, EXO_EPOCH_DAYS, exoElements } from '../src/sim/exoplanets';

describe('exoplanets — baked NASA Exoplanet Archive data (plan 044 B6)', () => {
  it('has the curated multi-planet systems', () => {
    expect(EXO_SYSTEMS.length).toBeGreaterThanOrEqual(10);
    // Every curated system has >=3 planets (that's the curation rule).
    for (const s of EXO_SYSTEMS) {
      expect(s.planets.length).toBeGreaterThanOrEqual(3);
      expect(s.star.length).toBeGreaterThan(0);
    }
  });

  it('planet count matches the sum across systems', () => {
    const total = EXO_SYSTEMS.reduce((n, s) => n + s.planets.length, 0);
    expect(EXO_PLANET_COUNT).toBe(total);
  });

  it('every planet has finite, physically-sane elements', () => {
    for (const s of EXO_SYSTEMS) {
      for (const p of s.planets) {
        expect(Number.isFinite(p.P)).toBe(true);
        expect(p.P).toBeGreaterThan(0); // period > 0 days
        expect(Number.isFinite(p.a)).toBe(true);
        expect(p.a).toBeGreaterThan(0); // semi-major axis > 0 AU
        expect(p.e).toBeGreaterThanOrEqual(0);
        expect(p.e).toBeLessThan(1); // bound orbit
        expect(p.i).toBeGreaterThanOrEqual(0);
        expect(p.i).toBeLessThanOrEqual(180);
        expect(Number.isFinite(p.M0)).toBe(true);
        // mass/radius may be unknown (null) but never NaN
        if (p.M != null) expect(Number.isFinite(p.M)).toBe(true);
        if (p.R != null) expect(Number.isFinite(p.R)).toBe(true);
      }
    }
  });

  it('exoElements produces a valid OrbitalElements shape', () => {
    const p = EXO_SYSTEMS[0].planets[0];
    const el = exoElements(p);
    expect(el.a).toBe(p.a);
    expect(el.e).toBe(p.e);
    expect(el.i).toBe(p.i);
    expect(el.node).toBe(0); // no node column in pscomppars
    expect(el.peri).toBe(p.L);
    expect(el.n).toBeCloseTo(360 / p.P, 6);
    // M0 converted from radians to degrees
    expect(el.M0).toBeCloseTo((p.M0 * 180) / Math.PI, 6);
  });

  it('epoch is a positive days-since-J2000 value', () => {
    expect(EXO_EPOCH_DAYS).toBeGreaterThan(0);
  });
});
