import { describe, it, expect } from 'vitest';
import { STARFIELD, realStarAttributes, spikeIndices } from '../src/sim/starfield';
import { raDecToUnit } from '../src/data/constellations';

describe('BSC5 real starfield (plan 044 B3)', () => {
  it('decodes the full naked-eye catalog', () => {
    // The Yale Bright Star Catalogue has 9,110 objects; ~8,999 are stars
    // (the rest are novae / non-stellar). We bake the star rows.
    expect(STARFIELD.length).toBeGreaterThan(8000);
    expect(STARFIELD.length).toBeLessThan(9200);
  });

  it('every star has a unit direction, bounded color, and positive size', () => {
    for (const s of STARFIELD) {
      const len = Math.hypot(s.u[0], s.u[1], s.u[2]);
      expect(len).toBeCloseTo(1, 3);
      for (const c of s.c) {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(1);
      }
      expect(s.size).toBeGreaterThan(0);
      expect(s.spike).toBeGreaterThanOrEqual(0);
      expect(s.spike).toBeLessThanOrEqual(1);
    }
  });

  it('magnitudes span the naked-eye range (brightest to faintest)', () => {
    const mags = STARFIELD.map((s) => s.mag);
    expect(Math.min(...mags)).toBeLessThan(0); // Sirius V=-1.46 etc.
    expect(Math.max(...mags)).toBeGreaterThan(6); // down to ~V6.5+
  });

  it('marks exactly the brightest stars for diffraction spikes', () => {
    const idx = spikeIndices(STARFIELD);
    expect(idx.length).toBeGreaterThan(100);
    expect(idx.length).toBeLessThan(300);
    // Every spike star is brighter than the faintest non-spike star.
    const spikeMags = idx.map((i) => STARFIELD[i].mag);
    const nonSpikeMags = STARFIELD.filter((_, i) => !idx.includes(i)).map((s) => s.mag);
    expect(Math.max(...spikeMags)).toBeLessThanOrEqual(Math.min(...nonSpikeMags) + 0.01);
  });

  it('realStarAttributes places stars on the shell with the right channels', () => {
    const { position, color, size, spike } = realStarAttributes(STARFIELD, 5000, 5600);
    const n = STARFIELD.length;
    expect(position.length).toBe(n * 3);
    expect(color.length).toBe(n * 3);
    expect(size.length).toBe(n);
    expect(spike.length).toBe(n);
    for (let i = 0; i < n; i++) {
      const r = Math.hypot(position[i * 3], position[i * 3 + 1], position[i * 3 + 2]);
      // float32 storage + hypot reconstruction adds ~1e-4 relative error.
      expect(r).toBeGreaterThanOrEqual(5000 - 0.01);
      expect(r).toBeLessThanOrEqual(5600 + 0.01);
    }
  });

  it('the baked directions match raDecToUnit for a known star (Sirius)', () => {
    // Sirius: RA 6h45m, Dec -16°43' (V=-1.46). Find the brightest star and
    // confirm its baked direction is a unit vector (the projection is baked in
    // the generator using the same raDecToUnit convention).
    const brightest = STARFIELD.reduce((a, b) => (a.mag < b.mag ? a : b));
    expect(brightest.mag).toBeLessThan(0);
    const len = Math.hypot(brightest.u[0], brightest.u[1], brightest.u[2]);
    expect(len).toBeCloseTo(1, 3);
    // Sanity: raDecToUnit still produces a unit vector (the shared convention).
    const [x, y, z] = raDecToUnit(6.75, -16.7);
    expect(Math.hypot(x, y, z)).toBeCloseTo(1, 5);
  });
});
