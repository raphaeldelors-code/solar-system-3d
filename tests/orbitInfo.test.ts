/**
 * Orbit readout tests: period from mean motion, live focus distance,
 * peri/apoapsis bounds, and formatters. Pure sim layer (Node-only).
 */
import { describe, it, expect } from 'vitest';
import { ALL_BODIES } from '../src/data/bodies';
import { AU_KM } from '../src/sim/types';
import { positionAt } from '../src/sim/kepler';
import { orbitReadout, formatPeriod, formatDistanceKm } from '../src/sim/orbitInfo';

const byId = new Map(ALL_BODIES.map((b) => [b.id, b]));

/** Days since J2000 for a UTC date (matches src/sim/clock.ts convention). */
const daysSince = (iso: string): number =>
  (Date.parse(iso) - Date.UTC(2000, 0, 1, 12)) / 86_400_000;

describe('orbitReadout', () => {
  it('returns null for the star (no elements)', () => {
    expect(orbitReadout(byId.get('sun')!, 0)).toBeNull();
  });

  it('Earth: period ~365.25 d, distance within [peri, apo] ~1 AU', () => {
    const r = orbitReadout(byId.get('earth')!, daysSince('2026-08-16T00:00:00Z'));
    expect(r).not.toBeNull();
    expect(r!.periodDays).toBeCloseTo(365.25, 1);
    expect(r!.distanceKm / AU_KM).toBeGreaterThan(0.98);
    expect(r!.distanceKm / AU_KM).toBeLessThan(1.02);
    expect(r!.distanceKm).toBeGreaterThanOrEqual(r!.perihelionKm * (1 - 1e-9));
    expect(r!.distanceKm).toBeLessThanOrEqual(r!.aphelionKm * (1 + 1e-9));
  });

  it('Earth distance matches positionAt magnitude (independent path)', () => {
    const def = byId.get('earth')!;
    const t = daysSince('2026-08-16T00:00:00Z');
    const r = orbitReadout(def, t)!;
    const p = positionAt(def.elements!, t);
    const expected = Math.hypot(p.x, p.y, p.z) * AU_KM;
    expect(r.distanceKm).toBeCloseTo(expected, 3);
  });

  it('Mercury: period ~88 d and peri/apoapsis from a(1∓e)', () => {
    const def = byId.get('mercury')!;
    const r = orbitReadout(def, 0)!;
    expect(r.periodDays).toBeCloseTo(87.97, 1);
    expect(r.perihelionKm).toBeCloseTo(def.elements!.a * (1 - def.elements!.e) * AU_KM, 0);
    expect(r.aphelionKm).toBeCloseTo(def.elements!.a * (1 + def.elements!.e) * AU_KM, 0);
  });

  it('Moon: period ~27.3 d, distance ~384,400 km in km (not AU)', () => {
    const r = orbitReadout(byId.get('moon')!, daysSince('2026-08-16T00:00:00Z'));
    expect(r).not.toBeNull();
    expect(r!.periodDays).toBeCloseTo(27.32, 1);
    expect(r!.distanceKm).toBeGreaterThan(363_000);
    expect(r!.distanceKm).toBeLessThan(406_000);
  });

  it('every orbiting body yields a finite, positive readout', () => {
    for (const b of ALL_BODIES) {
      if (!b.elements) continue;
      const r = orbitReadout(b, daysSince('2026-08-16T00:00:00Z'));
      expect(r, b.id).not.toBeNull();
      expect(Number.isFinite(r!.periodDays) && r!.periodDays > 0, b.id).toBe(true);
      expect(Number.isFinite(r!.distanceKm) && r!.distanceKm > 0, b.id).toBe(true);
    }
  });
});

describe('formatPeriod', () => {
  it('hours below 2 d', () => expect(formatPeriod(1)).toBe('24.0 h'));
  it('days below 1000 d', () => expect(formatPeriod(27.32)).toBe('27.3 d'));
  it('years above 1000 d with sensible precision', () => {
    expect(formatPeriod(365.25)).toBe('1.00 yr');
    expect(formatPeriod(10_759)).toBe('29.5 yr');
    expect(formatPeriod(365.25 * 164.8)).toBe('165 yr');
  });
  it('rejects invalid input', () => {
    expect(formatPeriod(0)).toBe('—');
    expect(formatPeriod(Number.NaN)).toBe('—');
  });
});

describe('formatDistanceKm', () => {
  it('plain km below 1e6', () => expect(formatDistanceKm(384_400)).toBe('384,400 km'));
  it('million km below 1e8', () => expect(formatDistanceKm(14_900_000)).toBe('14.9 M km'));
  it('billion km at/above 1e8', () => expect(formatDistanceKm(AU_KM)).toBe('0.15 B km'));
  it('rejects invalid input', () => {
    expect(formatDistanceKm(-1)).toBe('—');
    expect(formatDistanceKm(Number.POSITIVE_INFINITY)).toBe('—');
  });
});
