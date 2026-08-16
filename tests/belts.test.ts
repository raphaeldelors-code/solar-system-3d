import { describe, it, expect } from 'vitest';
import {
  BELTS, mulberry32, sampleBelt,
} from '../src/data/belts';
import { positionAt } from '../src/sim/kepler';

describe('mulberry32 (seeded RNG)', () => {
  it('is deterministic for a fixed seed', () => {
    const a = mulberry32(1234);
    const b = mulberry32(1234);
    for (let i = 0; i < 16; i++) expect(a()).toBe(b());
  });

  it('differs across seeds', () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    const seq = Array.from({ length: 8 }, () => a());
    const seqB = Array.from({ length: 8 }, () => b());
    expect(seq).not.toEqual(seqB);
  });

  it('stays in [0, 1)', () => {
    const rnd = mulberry32(0x5eed);
    for (let i = 0; i < 1000; i++) {
      const v = rnd();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe('sampleBelt', () => {
  for (const belt of BELTS) {
    it(`samples ${belt.count} objects for ${belt.id}`, () => {
      const objects = sampleBelt(belt);
      expect(objects).toHaveLength(belt.count);
    });

    it(`is deterministic for ${belt.id}`, () => {
      const a = sampleBelt(belt);
      const b = sampleBelt(belt);
      expect(a.length).toBe(b.length);
      for (let i = 0; i < a.length; i++) {
        expect(a[i].elements.a).toBe(b[i].elements.a);
        expect(a[i].elements.e).toBe(b[i].elements.e);
        expect(a[i].elements.M0).toBe(b[i].elements.M0);
        expect(a[i].size).toBe(b[i].size);
      }
    });

    it(`keeps elements inside their ranges for ${belt.id}`, () => {
      for (const o of sampleBelt(belt)) {
        const el = o.elements;
        expect(el.a).toBeGreaterThanOrEqual(belt.a[0]);
        expect(el.a).toBeLessThanOrEqual(belt.a[1]);
        expect(el.e).toBeGreaterThanOrEqual(belt.e[0]);
        expect(el.e).toBeLessThan(belt.e[1]);
        expect(el.i).toBeGreaterThanOrEqual(belt.i[0]);
        expect(el.i).toBeLessThanOrEqual(belt.i[1]);
        expect(el.node).toBeGreaterThanOrEqual(0);
        expect(el.node).toBeLessThan(360);
        expect(el.peri).toBeGreaterThanOrEqual(0);
        expect(el.peri).toBeLessThan(360);
        expect(el.M0).toBeGreaterThanOrEqual(0);
        expect(el.M0).toBeLessThan(360);
      }
    });

    it(`obeys Kepler's third law (n = 360 / 365.25·a^1.5) for ${belt.id}`, () => {
      for (const o of sampleBelt(belt)) {
        const el = o.elements;
        const periodDays = 365.25 * Math.pow(el.a, 1.5);
        expect(el.n).toBeCloseTo(360 / periodDays, 10);
        // Sanity: a belt object's period is positive and reasonable.
        expect(el.n).toBeGreaterThan(0);
      }
    });

    it(`keeps instance sizes within baseSize·(1±jitter) for ${belt.id}`, () => {
      for (const o of sampleBelt(belt)) {
        expect(o.size).toBeGreaterThanOrEqual(belt.baseSize * (1 - belt.sizeJitter) - 1e-12);
        expect(o.size).toBeLessThanOrEqual(belt.baseSize * (1 + belt.sizeJitter) + 1e-12);
      }
    });
  }

  it('produces finite positions through the Kepler solver', () => {
    for (const belt of BELTS) {
      const objects = sampleBelt(belt).slice(0, 50);
      for (const t of [0, 1000, 100000, -5000]) {
        for (const o of objects) {
          const p = positionAt(o.elements, t);
          expect(Number.isFinite(p.x)).toBe(true);
          expect(Number.isFinite(p.y)).toBe(true);
          expect(Number.isFinite(p.z)).toBe(true);
          // Radial distance must stay near a (± e).
          const r = Math.hypot(p.x, p.y, p.z);
          expect(r).toBeGreaterThan(o.elements.a * (1 - o.elements.e) * 0.9);
          expect(r).toBeLessThan(o.elements.a * (1 + o.elements.e) * 1.1 + 1e-9);
        }
      }
    }
  });
});
