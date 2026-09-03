import { test, expect } from 'vitest';
import { LENS_R, LENS_ZOOM, lensZoomAt, lensDisplace, lensClampX } from '../src/render/lensMath.js';

test('zoom is max at the focal point and exactly 1 at the rim', () => {
  expect(lensZoomAt(0)).toBe(LENS_ZOOM);
  expect(lensZoomAt(LENS_R / 2)).toBeCloseTo(1 + (LENS_ZOOM - 1) * 0.25, 6);
  expect(lensZoomAt(LENS_R)).toBeCloseTo(1, 6);
  // beyond the rim stays clamped at 1×
  expect(lensZoomAt(LENS_R + 50)).toBe(1);
});

test('displace is identity at the focal point', () => {
  const d = lensDisplace(0, 0);
  expect(d).not.toBeNull();
  expect(d!.x).toBe(0);
  expect(d!.y).toBe(0);
  expect(d!.scale).toBe(LENS_ZOOM);
});

test('displace approaches the identity at the rim (seamless blend)', () => {
  // Just inside the rim (3 o'clock): the transform is ≈1× (zoom ≈1.001), so the
  // element stays ~where the real strip has it — the glass blends in.
  const d = lensDisplace(LENS_R - 1, 0)!;
  expect(d.x).toBeCloseTo(LENS_R - 1, 0);
  expect(d.scale).toBeCloseTo(1, 2);
  // Just inside the rim, below the line (6 o'clock).
  const d2 = lensDisplace(0, LENS_R - 1)!;
  expect(d2.y).toBeCloseTo(LENS_R - 1, 0);
});

test('displace pushes elements outward, near-center more than near-rim', () => {
  const mid = lensDisplace(10, 0)!; // 10px right of center
  const rim = lensDisplace(50, 0)!; // 50px right of center
  // both move right, the near-center one proportionally more
  expect(mid.x).toBeGreaterThan(10);
  expect(rim.x).toBeGreaterThan(50);
  expect(mid.scale).toBeGreaterThan(rim.scale);
});

test('displace is monotonic in r (no folding of packed events)', () => {
  let prev = -Infinity;
  for (let r = 0; r < LENS_R; r += 1) {
    const d = lensDisplace(r, 0)!;
    expect(d.x).toBeGreaterThan(prev);
    prev = d.x;
  }
});

test('displace returns null at and beyond the rim', () => {
  expect(lensDisplace(LENS_R, 0)).toBeNull();
  expect(lensDisplace(LENS_R + 1, 0)).toBeNull();
  expect(lensDisplace(0, LENS_R)).toBeNull();
});

test('displace handles the vertical (below-line) axis', () => {
  const d = lensDisplace(0, 10)!;
  expect(d.y).toBeGreaterThan(10);
  expect(d.x).toBe(0);
});

test('lensClampX clamps the focal point to the strip', () => {
  expect(lensClampX(100, 1000)).toBe(100);
  expect(lensClampX(-50, 1000)).toBe(0);
  expect(lensClampX(1200, 1000)).toBe(1000);
});
