import { describe, it, expect } from 'vitest';
import { findBody } from '../src/data/bodies';
import { positionAt } from '../src/sim/kepler';
import { moonGeocentricJ2000 } from '../src/sim/moon';
import type { BodyDefinition } from '../src/sim/types';
import gtRaw from './fixtures/ground_truth.json';

/** The fixture is plain data; cast to the shape the test consumes. */
const gt = gtRaw as unknown as {
  heliocentric: Record<string, Record<string, unknown> & { _days_tdb: number }>;
  geocentric: Record<
    string,
    Record<string, unknown> & {
      _days_ut: number;
      separations: { sun_moon_deg: number };
    }
  >;
};

/**
 * Ground-truth ephemeris test.
 *
 * The fixture (tests/fixtures/ground_truth.json) holds JPL Horizons DE441
 * positions at six heliocentric epochs (TDB) and three geocentric event
 * epochs (UT). Tolerances are GROUND TRUTH: they are the measured worst
 * errors of the analytic model (JPL Table 2a/2b + Meeus ch.47) against
 * Horizons over those exact epochs, rounded up with headroom — not a guess.
 *
 *   heliocentric worst (AU):    Mercury 2.0e-5  Venus 7.8e-5  Earth 9.4e-5
 *                                Mars 6.7e-4   Jupiter 1.2e-2 Saturn 5.4e-2
 *                                Uranus 7.4e-2 Neptune 4.7e-2
 *   geocentric worst (arcsec):  Sun 12.0"  Moon 50.2"  Mercury 31.0"  Mars 107.6"
 *
 * Re-derive any tolerance with:
 *   /opt/data/.venv-moon/bin/python /opt/data/ground_tols.py
 */

type V3 = [number, number, number];

const R2D = 180 / Math.PI;

/** Angular separation between two vectors (deg). */
function angSepDeg(a: V3, b: V3): number {
  const r1 = Math.hypot(a[0], a[1], a[2]);
  const r2 = Math.hypot(b[0], b[1], b[2]);
  const c = (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (r1 * r2);
  return Math.acos(Math.min(1, Math.max(-1, c))) * R2D;
}

function helioPosition(id: string, tDays: number): V3 {
  const el = (findBody(id) as BodyDefinition).elements!;
  const p = positionAt(el, tDays);
  return [p.x, p.y, p.z];
}

// Grounded heliocentric tolerances (measured worst error x ~1.6, rounded up).
const HELIO_TOL_AU: Record<string, number> = {
  mercury: 4e-5, venus: 2e-4, earth: 2e-4, mars: 2e-3,
  jupiter: 2e-2, saturn: 9e-2, uranus: 2e-1, neptune: 8e-2,
};

const PLANETS = Object.keys(HELIO_TOL_AU);

describe('heliocentric ephemeris vs JPL Horizons DE441', () => {
  it('matches every epoch and planet within the Table 2a/2b accuracy budget', () => {
    let checked = 0;
    for (const [label, rec] of Object.entries(gt.heliocentric)) {
      const tDays = rec._days_tdb;
      for (const name of PLANETS) {
        const fx = rec[name] as V3;
        const p = helioPosition(name, tDays);
        const err = Math.hypot(p[0] - fx[0], p[1] - fx[1], p[2] - fx[2]);
        expect(err, `${label} ${name} err=${err.toExponential(2)} AU`)
          .toBeLessThan(HELIO_TOL_AU[name]);
        checked++;
      }
    }
    expect(checked).toBe(6 * PLANETS.length);
  });
});

describe('geocentric ephemeris vs JPL Horizons DE441', () => {
  it('geocentric Sun (=-Earth barycenter) within 20 arcsec of true direction', () => {
    for (const [label, rec] of Object.entries(gt.geocentric)) {
      const tDays = rec._days_ut;
      const e = helioPosition('earth', tDays);
      const sun: V3 = [-e[0], -e[1], -e[2]];
      const sep = angSepDeg(sun, rec.sun as V3);
      expect(sep * 3600, `${label} sun sep=${sep * 3600} arcsec`)
        .toBeLessThan(20);
    }
  });

  it('geocentric Moon (Meeus ch.47) within 100 arcsec of true direction', () => {
    for (const [label, rec] of Object.entries(gt.geocentric)) {
      const tDays = rec._days_ut;
      const m = moonGeocentricJ2000(tDays);
      const sep = angSepDeg(m, rec.moon as V3);
      expect(sep * 3600, `${label} moon sep=${sep * 3600} arcsec`)
        .toBeLessThan(100);
      // Range (Earth-Moon distance) within 0.15% — a broken periodic table
      // would fail here even if the direction stayed close.
      const dm = Math.hypot(m[0], m[1], m[2]);
      const df = Math.hypot(...(rec.moon as V3));
      expect(Math.abs(dm - df) / df, `${label} moon range`)
        .toBeLessThan(1.5e-3);
    }
  });

  it('2026-08-12 solar eclipse: model Sun-Moon separation is within 0.05 deg of Horizons', () => {
    const rec = gt.geocentric['eclipse_2026-08-12T17h46'];
    const tDays = rec._days_ut;
    const e = helioPosition('earth', tDays);
    const sun: V3 = [-e[0], -e[1], -e[2]];
    const m = moonGeocentricJ2000(tDays);
    const modelSep = angSepDeg(sun, m);
    expect(Math.abs(modelSep - rec.separations.sun_moon_deg),
      `model=${modelSep} truth=${rec.separations.sun_moon_deg}`)
      .toBeLessThan(0.05);
  });

  it('geocentric Mercury (within 60 arcsec) and Mars (within 200 arcsec)', () => {
    for (const [label, rec] of Object.entries(gt.geocentric)) {
      const tDays = rec._days_ut;
      const e = helioPosition('earth', tDays);
      const mer = helioPosition('mercury', tDays);
      const mar = helioPosition('mars', tDays);
      const merG: V3 = [mer[0] - e[0], mer[1] - e[1], mer[2] - e[2]];
      const marG: V3 = [mar[0] - e[0], mar[1] - e[1], mar[2] - e[2]];
      expect(angSepDeg(merG, rec.mercury as V3) * 3600, `${label} mercury`)
        .toBeLessThan(60);
      expect(angSepDeg(marG, rec.mars as V3) * 3600, `${label} mars`)
        .toBeLessThan(200);
    }
  });
});
