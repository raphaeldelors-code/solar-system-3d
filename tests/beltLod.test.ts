import { describe, expect, it } from 'vitest';
import { beltLod, clampPixelRatio, LOD_BLEND_WIDTH, LOD_NEAR_DIST } from '../src/render/beltLod';

describe('beltLod', () => {
  const belt = 28.8; // asteroid-belt centre scene radius (visible)

  it('is fully near when the camera is inside the near band', () => {
    const d = beltLod(belt, belt); // camDist == beltDist → deep in the near zone
    expect(d.mode).toBe('near');
    expect(d.blend).toBe(1);
  });

  it('is fully far once the camera passes the far boundary', () => {
    const d = beltLod(belt + LOD_NEAR_DIST + LOD_BLEND_WIDTH + 10, belt);
    expect(d.mode).toBe('far');
    expect(d.blend).toBe(0);
  });

  it('is continuous and monotonic non-increasing across the band', () => {
    let prev = Infinity;
    for (let cd = belt; cd <= belt + LOD_NEAR_DIST + LOD_BLEND_WIDTH + 5; cd += 0.5) {
      const { blend } = beltLod(cd, belt);
      expect(blend).toBeLessThanOrEqual(prev + 1e-9);
      prev = blend;
    }
  });

  it('cross-fades roughly mid-band', () => {
    const { blend } = beltLod(belt + LOD_NEAR_DIST + LOD_BLEND_WIDTH / 2, belt);
    expect(blend).toBeGreaterThan(0);
    expect(blend).toBeLessThan(1);
    expect(blend).toBeCloseTo(0.5, 1);
  });

  it('keeps mode = near while blend is the majority, far once it drops below half', () => {
    expect(beltLod(belt + LOD_NEAR_DIST, belt).mode).toBe('near'); // boundary → blend 1
    expect(beltLod(belt + LOD_NEAR_DIST + LOD_BLEND_WIDTH * 0.7, belt).mode).toBe('far');
  });
});

describe('clampPixelRatio', () => {
  it('clamps to [1, 2]', () => {
    expect(clampPixelRatio(0)).toBe(1);
    expect(clampPixelRatio(1)).toBe(1);
    expect(clampPixelRatio(2)).toBe(2);
    expect(clampPixelRatio(3)).toBe(2);
    expect(clampPixelRatio(10)).toBe(2);
  });
});
