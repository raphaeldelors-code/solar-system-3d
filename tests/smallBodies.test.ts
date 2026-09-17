import { describe, it, expect } from 'vitest';
import {
  SMALL_BODIES,
  smallBodyDefinitions,
  smallBodyFacts,
  hasSmallBody,
} from '../src/sim/smallBodies';
import { ALL_BODIES } from '../src/data/bodies';

describe('smallBodies — baked SBDB named asteroids + comets (plan 044 B7)', () => {
  it('bakes a healthy set of named bodies', () => {
    expect(SMALL_BODIES.length).toBeGreaterThanOrEqual(40);
    const kinds = new Set(SMALL_BODIES.map((b) => b.kind));
    expect(kinds.has('asteroid')).toBe(true);
    expect(kinds.has('comet')).toBe(true);
  });

  it('every body has finite, sane J2000 elements', () => {
    for (const b of SMALL_BODIES) {
      const e = b.elements;
      for (const k of ['a', 'e', 'i', 'node', 'peri', 'M0', 'n'] as const) {
        expect(Number.isFinite(e[k]), `${b.name}.${k}`).toBe(true);
      }
      expect(e.a, `${b.name} a`).toBeGreaterThan(0);
      expect(e.e, `${b.name} e`).toBeGreaterThanOrEqual(0);
      expect(e.e, `${b.name} e`).toBeLessThan(1);
      expect(e.n, `${b.name} n`).not.toBe(0);
    }
  });

  it('every body has a positive radius (measured or estimated)', () => {
    for (const b of SMALL_BODIES) {
      expect(b.radiusKm, b.name).toBeGreaterThan(0);
    }
  });

  it('maps to BodyDefinitions with the small kind + heliocentric parent', () => {
    const defs = smallBodyDefinitions();
    expect(defs.length).toBe(SMALL_BODIES.length);
    for (const d of defs) {
      expect(d.kind).toBe('small');
      expect(d.parent).toBe('sun');
      expect(d.elements).toBeDefined();
      expect(d.color).toHaveLength(3);
    }
  });

  it('the famous bodies are present with correct orders of magnitude', () => {
    const byId = new Map(SMALL_BODIES.map((b) => [b.id, b]));
    // Halley: a≈17.9 AU, e≈0.968, retrograde (i>90).
    const halley = byId.get('halley');
    expect(halley).toBeDefined();
    expect(halley!.elements.a).toBeCloseTo(17.9, 0);
    expect(halley!.elements.e).toBeGreaterThan(0.9);
    expect(halley!.elements.i).toBeGreaterThan(90);
    // Vesta: main belt, a≈2.36 AU.
    const vesta = byId.get('vesta');
    expect(vesta!.elements.a).toBeCloseTo(2.36, 1);
    // Sedna: scattered disc, a≈544 AU.
    const sedna = byId.get('sedna');
    expect(sedna!.elements.a).toBeGreaterThan(400);
  });

  it('SBDB fact rows are non-empty for small bodies and empty otherwise', () => {
    const halley = SMALL_BODIES.find((b) => b.id === 'halley')!;
    const rows = smallBodyFacts(halley.id);
    expect(rows.length).toBeGreaterThan(0);
    const labels = rows.map((r) => r.label);
    expect(labels).toContain('Designation');
    expect(labels).toContain('Class');
    // A major planet has no small-body record.
    expect(smallBodyFacts('earth')).toEqual([]);
    expect(hasSmallBody('earth')).toBe(false);
    expect(hasSmallBody('halley')).toBe(true);
  });

  it('small bodies are part of ALL_BODIES (so the scene + search see them)', () => {
    const ids = new Set(ALL_BODIES.map((b) => b.id));
    expect(ids.has('halley')).toBe(true);
    expect(ids.has('vesta')).toBe(true);
    const smallInAll = ALL_BODIES.filter((b) => b.kind === 'small');
    expect(smallInAll.length).toBe(SMALL_BODIES.length);
  });
});
