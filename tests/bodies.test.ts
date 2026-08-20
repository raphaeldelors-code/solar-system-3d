import { describe, it, expect } from 'vitest';
import { ALL_BODIES, findBody, SUN, PLANETS, MOONS, DWARF_PLANETS } from '../src/data/bodies';
import type { BodyDefinition } from '../src/sim/types';
import { positionAt, sampleOrbit } from '../src/sim/kepler';

/** Heliocentric distance from a position (unit of `a`). */
function dist(p: { x: number; y: number; z: number }): number {
  return Math.hypot(p.x, p.y, p.z);
}

function isFiniteNumber(x: number): boolean {
  return Number.isFinite(x);
}

describe('body data', () => {
  it('has a sun, 8 planets, dwarf planets, and moons', () => {
    expect(SUN.kind).toBe('star');
    expect(PLANETS).toHaveLength(8);
    expect(DWARF_PLANETS.length).toBeGreaterThanOrEqual(1);
    expect(MOONS.length).toBeGreaterThanOrEqual(9);
    expect(ALL_BODIES).toHaveLength(1 + PLANETS.length + DWARF_PLANETS.length + MOONS.length);
  });

  it('has unique ids and names', () => {
    const ids = ALL_BODIES.map((b) => b.id);
    const names = ALL_BODIES.map((b) => b.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every non-sun body has valid elements', () => {
    for (const b of ALL_BODIES) {
      if (b.kind === 'star') continue;
      const el = b.elements;
      expect(el, `${b.id}: missing elements`).toBeDefined();
      if (!el) continue;
      expect(isFiniteNumber(el.a) && el.a > 0, `${b.id}: a=${el.a}`).toBe(true);
      // inclination may be a tiny negative in JPL tables; allow a small margin
      expect(isFiniteNumber(el.e) && el.e >= 0 && el.e < 0.8, `${b.id}: e=${el.e}`).toBe(true);
      expect(isFiniteNumber(el.i) && el.i >= -0.01 && el.i <= 180, `${b.id}: i=${el.i}`).toBe(true);
      expect(isFiniteNumber(el.n) && el.n > 0, `${b.id}: n=${el.n}`).toBe(true);
    }
  });

  it('every moon resolves its parent (a planet), planets/dwarfs orbit the sun', () => {
    for (const b of ALL_BODIES) {
      if (b.kind === 'star') continue;
      const parent = b.parent ? findBody(b.parent) : undefined;
      expect(parent, `${b.id}: unknown parent '${b.parent}'`).toBeDefined();
      if (b.kind === 'moon') expect(parent!.kind, `${b.id} parent kind`).toBe('planet');
      else expect(b.parent, `${b.id} parent`).toBe('sun');
    }
  });

  it('orbit sampling is finite for every body (incl. e > 0.4)', () => {
    for (const b of ALL_BODIES) {
      if (!b.elements) continue;
      for (const p of sampleOrbit(b.elements, 0, 64)) {
        expect(isFiniteNumber(p.x), `${b.id} x finite`).toBe(true);
        expect(isFiniteNumber(p.y), `${b.id} y finite`).toBe(true);
        expect(isFiniteNumber(p.z), `${b.id} z finite`).toBe(true);
      }
    }
  });

  it('kepler solver converges at every sampled anomaly for every body', () => {
    for (const b of ALL_BODIES) {
      if (!b.elements) continue;
      for (let k = 0; k < 16; k++) {
        const p = positionAt(b.elements, (k / 16) * (360 / b.elements.n));
        expect(dist(p), `${b.id} dist`).toBeGreaterThan(0);
      }
    }
  });
});

describe('spot checks (real astronomy)', () => {
  it('Pluto: period ~90,560 d, distance stays in [a(1-e), a(1+e)]', () => {
    const pluto = findBody('pluto') as BodyDefinition;
    const el = pluto.elements!;
    const period = 360 / el.n;
    expect(period).toBeGreaterThan(90000);
    expect(period).toBeLessThan(91200);
    const ds = sampleOrbit(el, 0, 360).map(dist);
    expect(Math.min(...ds)).toBeGreaterThan(el.a * (1 - el.e) * 0.999);
    expect(Math.max(...ds)).toBeLessThan(el.a * (1 + el.e) * 1.001);
  });

  it('Ceres orbits in the asteroid belt: 2.1–3.4 AU from the sun', () => {
    const ceres = findBody('ceres') as BodyDefinition;
    const ds = sampleOrbit(ceres.elements!, 0, 360).map(dist);
    expect(Math.min(...ds)).toBeGreaterThan(2.1);
    expect(Math.max(...ds)).toBeLessThan(3.4);
  });

  it('Eris: 44 deg inclination, e ~ 0.44', () => {
    const eris = findBody('eris') as BodyDefinition;
    expect(eris.elements!.i).toBeCloseTo(44.04, 1);
    expect(eris.elements!.e).toBeCloseTo(0.436, 2);
  });

  it('moon periods (deg/day -> days) match known values', () => {
    const cases: Array<[string, number, number]> = [
      ['moon', 27.3, 0.6],
      ['io', 1.77, 0.03],
      ['europa', 3.55, 0.05],
      ['ganymede', 7.15, 0.1],
      ['callisto', 16.69, 0.3],
      ['titan', 15.95, 0.2],
      ['triton', 5.88, 0.1],
      ['nereid', 306.8, 5],
      ['oberon', 13.46, 0.2],
      ['enceladus', 1.37, 0.02],
    ];
    for (const [id, expectedDays, tol] of cases) {
      const b = findBody(id) as BodyDefinition;
      const period = 360 / b.elements!.n;
      expect(period, `${id} period`).toBeGreaterThan(expectedDays - tol);
      expect(period, `${id} period`).toBeLessThan(expectedDays + tol);
    }
  });

  it('retrograde Triton orbits with i > 90, prograde moons with i < 90', () => {
    expect((findBody('triton') as BodyDefinition).elements!.i).toBeGreaterThan(90);
    for (const m of MOONS) {
      if (m.id === 'triton') continue;
      expect(m.elements!.i, `${m.id} i`).toBeLessThan(90);
    }
  });

  it('moon at J2000 sits near a (sanity: |r - a| <= a*(e + 0.02))', () => {
    for (const m of MOONS) {
      const p = positionAt(m.elements!, 0);
      const r = dist(p);
      expect(r, `${m.id} |r|`).toBeGreaterThan(0);
      expect(Math.abs(r - m.elements!.a), `${m.id} |r-a|`).toBeLessThan(
        m.elements!.a * (m.elements!.e + 0.02),
      );
    }
  });
});
