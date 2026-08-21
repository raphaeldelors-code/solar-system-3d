import { describe, it, expect } from 'vitest';
import { raDecToUnit, CONSTELLATIONS } from '../src/data/constellations';
import { constellationCenter, constellationEmphasis } from '../src/render/scene';

describe('raDecToUnit', () => {
  it('maps the equatorial pole straight up', () => {
    for (const ra of [0, 6, 12, 18]) {
      const [x, y, z] = raDecToUnit(ra, 90);
      expect(x).toBeCloseTo(0, 12);
      expect(y).toBeCloseTo(1, 12);
      expect(z).toBeCloseTo(0, 12);
    }
    const [x, y, z] = raDecToUnit(0, -90);
    expect(x).toBeCloseTo(0, 12);
    expect(y).toBeCloseTo(-1, 12);
    expect(z).toBeCloseTo(0, 12);
  });

  it('maps the celestial equator to unit vectors in the horizontal plane', () => {
    for (const ra of [0, 3, 6, 9, 12, 15, 18, 21]) {
      const [x, y, z] = raDecToUnit(ra, 0);
      expect(Math.hypot(x, y, z)).toBeCloseTo(1, 12);
      expect(y).toBeCloseTo(0, 12);
    }
  });

  it('returns a unit vector for arbitrary coordinates', () => {
    const [x, y, z] = raDecToUnit(5.9195, 7.407); // Betelgeuse
    expect(Math.hypot(x, y, z)).toBeCloseTo(1, 12);
  });

  it('keeps the north-up axis: positive declination is +y', () => {
    const [, y] = raDecToUnit(10, 30);
    expect(y).toBeCloseTo(Math.sin((30 * Math.PI) / 180), 12);
  });
});

describe('CONSTELLATIONS data', () => {
  it('every constellation has at least 2 stars and at least 1 line', () => {
    for (const c of CONSTELLATIONS) {
      expect(c.stars.length, c.name).toBeGreaterThanOrEqual(2);
      expect(c.lines.length, c.name).toBeGreaterThanOrEqual(1);
    }
  });

  it('all line endpoints are valid star indices', () => {
    for (const c of CONSTELLATIONS) {
      for (const [a, b] of c.lines) {
        expect(a, `${c.name} a=${a}`).toBeGreaterThanOrEqual(0);
        expect(b, `${c.name} b=${b}`).toBeGreaterThanOrEqual(0);
        expect(a, `${c.name} a`).toBeLessThan(c.stars.length);
        expect(b, `${c.name} b`).toBeLessThan(c.stars.length);
      }
    }
  });

  it('all stars have valid J2000 coordinates', () => {
    for (const c of CONSTELLATIONS) {
      for (const s of c.stars) {
        expect(s.raHours, `${c.name}/${s.name}`).toBeGreaterThanOrEqual(0);
        expect(s.raHours, `${c.name}/${s.name}`).toBeLessThan(24);
        expect(s.decDeg, `${c.name}/${s.name}`).toBeGreaterThanOrEqual(-90);
        expect(s.decDeg, `${c.name}/${s.name}`).toBeLessThanOrEqual(90);
      }
    }
  });

  it('names within a constellation are unique', () => {
    for (const c of CONSTELLATIONS) {
      const names = new Set(c.stars.map((s) => s.name));
      expect(names.size, c.name).toBe(c.stars.length);
    }
  });
});

describe('known-figure sanity', () => {
  it('Orion belt stars are collinear-ish (Alnitak-Alnilam-Mintaka)', () => {
    const orion = CONSTELLATIONS.find((c) => c.name === 'Orion')!;
    const mintaka = raDecToUnit(orion.stars[2].raHours, orion.stars[2].decDeg);
    const alnilam = raDecToUnit(orion.stars[3].raHours, orion.stars[3].decDeg);
    const alnitak = raDecToUnit(orion.stars[4].raHours, orion.stars[4].decDeg);
    // The belt spans only ~2 degrees of sky: the three unit vectors are
    // nearly parallel.
    const dot = (u: number[], v: number[]) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    expect(dot(mintaka, alnilam)).toBeGreaterThan(0.999);
    expect(dot(alnilam, alnitak)).toBeGreaterThan(0.999);
  });

  it('Polaris projects near the north pole', () => {
    const umi = CONSTELLATIONS.find((c) => c.name === 'Ursa Minor')!;
    const pol = umi.stars.find((s) => s.name === 'Polaris')!;
    const [, y] = raDecToUnit(pol.raHours, pol.decDeg);
    expect(y).toBeGreaterThan(0.9999);
  });
});

describe('constellationCenter', () => {
  it('is a unit vector pointing at the figure', () => {
    for (const c of CONSTELLATIONS) {
      const [x, y, z] = constellationCenter(c);
      expect(Math.hypot(x, y, z), c.name).toBeCloseTo(1, 12);
    }
  });
  it('matches the mean star direction (Orion, near +x/−z sky)', () => {
    const orion = CONSTELLATIONS.find((c) => c.name === 'Orion')!;
    const [cx, cy, cz] = constellationCenter(orion);
    // Independent recomputation from the raw star data.
    let mx = 0,
      my = 0,
      mz = 0;
    for (const s of orion.stars) {
      const [sx, sy, sz] = raDecToUnit(s.raHours, s.decDeg);
      mx += sx;
      my += sy;
      mz += sz;
    }
    const len = Math.hypot(mx, my, mz);
    expect(cx).toBeCloseTo(mx / len, 12);
    expect(cy).toBeCloseTo(my / len, 12);
    expect(cz).toBeCloseTo(mz / len, 12);
  });
  it('Ursa Minor sits near the north celestial pole', () => {
    // Its 7 stars span declination 71.8°…89.3°, so the centroid direction is
    // a few degrees off the pole — but unmistakably a north-pole figure.
    const umi = CONSTELLATIONS.find((c) => c.name === 'Ursa Minor')!;
    const [, y] = constellationCenter(umi);
    expect(y).toBeGreaterThan(0.98);
  });
});

describe('constellationEmphasis', () => {
  const at = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return constellationEmphasis([Math.sin(a), Math.cos(a), 0], [0, 1, 0]);
  };
  it('is 1 when the figure is dead center', () => {
    expect(constellationEmphasis([0, 0, 1], [0, 0, 1])).toBeCloseTo(1, 12);
    expect(at(0)).toBeCloseTo(1, 12);
  });
  it('is 0 at/behind the fade ring (40°) and for the whole sky behind', () => {
    expect(at(40)).toBeCloseTo(0, 9);
    expect(at(60)).toBeCloseTo(0, 12);
    expect(constellationEmphasis([0, 0, -1], [0, 0, 1])).toBeCloseTo(0, 12);
  });
  it('is full inside the inner band (15°) and linear in between', () => {
    expect(at(10)).toBeCloseTo(1, 9);
    expect(at(15)).toBeCloseTo(1, 9);
    // band midpoint (15+40)/2 = 27.5° => exactly half emphasis
    expect(at(27.5)).toBeCloseTo(0.5, 9);
    // rises monotonically toward the center
    expect(at(45)).toBeLessThan(at(30));
    expect(at(30)).toBeLessThan(at(20));
    expect(at(20)).toBeLessThan(at(10));
  });
});
