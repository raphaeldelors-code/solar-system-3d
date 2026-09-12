/**
 * Plan 035 F2 — deep-sky unit tests.
 *
 * The GPU-facing parts (skybox sphere, star Points, zodiacal shader) need a
 * WebGL context, so only the PURE layers are exercised here in Node:
 *   - mulberry32 (deterministic PRNG)
 *   - makeStarAttributes (star table: shell radii, colors, sizes)
 *   - zodiacalPeakOpacity (the afterglow intensity model mirrored by the GLSL)
 *   - the exported layout constants (layering invariants)
 */
import { describe, it, expect } from 'vitest';
import {
  mulberry32,
  makeStarAttributes,
  zodiacalPeakOpacity,
  STAR_COUNT,
  STAR_SHELL_MIN,
  STAR_SHELL_MAX,
  STAR_COLORS,
  SKYBOX_RADIUS,
  ZODIACAL_RADIUS,
} from '../src/render/skybox';

describe('mulberry32 (seeded RNG)', () => {
  it('is deterministic for a fixed seed', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
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

describe('makeStarAttributes', () => {
  it('produces the requested number of points', () => {
    const { position, color, size } = makeStarAttributes(100, 5000, 5600);
    expect(position.length).toBe(300);
    expect(color.length).toBe(300);
    expect(size.length).toBe(100);
  });

  it('places every star on the configured shell radius range', () => {
    const { position } = makeStarAttributes(2000, 5000, 5600);
    for (let i = 0; i < 2000; i++) {
      const r = Math.hypot(position[i * 3], position[i * 3 + 1], position[i * 3 + 2]);
      expect(r).toBeGreaterThanOrEqual(4999);
      expect(r).toBeLessThanOrEqual(5601);
    }
  });

  it('is deterministic for a fixed seed', () => {
    const a = makeStarAttributes(50, 5000, 5600, 7);
    const b = makeStarAttributes(50, 5000, 5600, 7);
    expect(Array.from(a.position)).toEqual(Array.from(b.position));
    expect(Array.from(a.color)).toEqual(Array.from(b.color));
    expect(Array.from(a.size)).toEqual(Array.from(b.size));
  });

  it('keeps colors bounded and sizes in the documented pixel range', () => {
    const { color, size } = makeStarAttributes(3000, 5000, 5600);
    for (let i = 0; i < color.length; i++) {
      expect(color[i]).toBeGreaterThanOrEqual(0);
      expect(color[i]).toBeLessThanOrEqual(1.01); // palette ≤1.0 × brightness ≤1.0
    }
    for (let i = 0; i < size.length; i++) {
      expect(size[i]).toBeGreaterThanOrEqual(0.8);
      expect(size[i]).toBeLessThanOrEqual(3.4); // 0.8 + rng^3 × 2.6
    }
  });

  it('has real color VARIATION (not monochrome)', () => {
    const { color } = makeStarAttributes(STAR_COUNT, STAR_SHELL_MIN, STAR_SHELL_MAX);
    // Count how many of the 6 palette classes actually appear (by R-channel
    // bucket — the classes are far enough apart in R to be separable).
    const classes = new Set<number>();
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = color[i * 3];
      const k = STAR_COLORS.findIndex((c) => Math.abs(c[0] * 0.75 - r) < 0.06);
      if (k >= 0) classes.add(k);
    }
    expect(classes.size).toBeGreaterThanOrEqual(4);
  });
});

describe('zodiacalPeakOpacity', () => {
  it('peaks at the Sun on the ecliptic plane', () => {
    const peak = zodiacalPeakOpacity(0, 0);
    expect(peak).toBeCloseTo(0.16, 5);
    // Strictly above every non-central direction.
    for (const [alt, sep] of [
      [0, 10],
      [0, 30],
      [30, 0],
      [60, 0],
      [30, 60],
    ] as const) {
      expect(peak).toBeGreaterThan(zodiacalPeakOpacity(alt, sep));
    }
  });

  it('vanishes in the anti-solar direction (sep = 180°)', () => {
    expect(zodiacalPeakOpacity(0, 180)).toBe(0);
    expect(zodiacalPeakOpacity(45, 180)).toBe(0);
  });

  it('monotonically falls off as the sun-separation grows', () => {
    const seq = [0, 30, 60, 90, 120].map((s) => zodiacalPeakOpacity(0, s));
    for (let i = 1; i < seq.length; i++) expect(seq[i]).toBeLessThan(seq[i - 1]);
    expect(seq[3]).toBeCloseTo(0, 5); // 90°: cos = 0
  });

  it('is dimmer off the ecliptic plane at equal sun-separation', () => {
    expect(zodiacalPeakOpacity(45, 45)).toBeLessThan(zodiacalPeakOpacity(0, 45));
    // ...but never fully dark (the 0.25 floor keeps a faint high glow).
    expect(zodiacalPeakOpacity(90, 0)).toBeGreaterThan(0);
  });

  it('honors a custom peak', () => {
    expect(zodiacalPeakOpacity(0, 0, 0.3)).toBeCloseTo(0.3, 5);
  });
});

describe('layout invariants (layering)', () => {
  it('starfield shell sits outside the constellation dome (4800, scene.ts)', () => {
    expect(STAR_SHELL_MIN).toBeGreaterThan(4800);
  });

  it('zodiacal dome encloses the system but sits inside the starfield', () => {
    expect(ZODIACAL_RADIUS).toBeGreaterThan(100); // encloses Kuiper belt (50 AU)
    expect(ZODIACAL_RADIUS).toBeLessThan(STAR_SHELL_MIN);
  });

  it('skybox shell is inside the camera far plane (20000, scene.ts)', () => {
    expect(SKYBOX_RADIUS).toBeGreaterThan(STAR_SHELL_MAX);
    expect(SKYBOX_RADIUS).toBeLessThan(20000);
  });
});
