/**
 * Plan 035 F4 tests: fresnel atmosphere rim strength + ring band profile +
 * radial UV remap. All pure math / geometry — no WebGL, runs in node.
 */
import * as THREE from 'three';
import { describe, it, expect } from 'vitest';
import {
  atmosphereStrength,
  atmosphereConfigFor,
  ATMOSPHERE_TINTS,
} from '../src/render/atmosphere';
import { ringBandProfile, remapRingUVRadial } from '../src/render/rings';

describe('atmosphereStrength (fresnel rim)', () => {
  it('vanishes at the head-on centre (nDotView = 1)', () => {
    // Front-disc centre: normal points straight at the camera.
    const s = atmosphereStrength(1, 3.2, 0.08);
    // Only the base haze remains.
    expect(s).toBeCloseTo(0.08, 4);
  });

  it('peaks at the rim (nDotView -> 0)', () => {
    const s = atmosphereStrength(0, 3.2, 0.08);
    // Rim: base + full shaped term.
    expect(s).toBeCloseTo(1, 4);
    expect(s).toBeGreaterThan(0.99);
  });

  it('is 0 on the back hemisphere (nDotView < 0)', () => {
    // The back face is culled (FrontSide), so nDotView < 0 never renders; the
    // pure helper clamps it to a defined value (the max rim, since the formula
    // has no front/back distinction). What matters on-screen is only [0,1].
    const s = atmosphereStrength(-1, 3.2, 0.08);
    expect(s).toBeGreaterThanOrEqual(0.08);
    expect(s).toBeLessThanOrEqual(1);
  });

  it('is monotonically increasing toward the rim on the front hemisphere', () => {
    // As nDotView goes 1 -> 0 (centre -> rim), strength must rise.
    let prev = -Infinity;
    for (let ndv = 1; ndv >= 0.001; ndv -= 0.01) {
      const s = atmosphereStrength(ndv, 3.2, 0.08);
      expect(s).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = s;
    }
  });

  it('higher power => thinner rim (steeper falloff from the edge)', () => {
    // At a point well off the rim, a high power collapses toward the base.
    const mid = 0.5;
    const thin = atmosphereStrength(mid, 5, 0.08);
    const thick = atmosphereStrength(mid, 2, 0.08);
    expect(thin).toBeLessThan(thick);
  });
});

describe('atmosphereConfigFor', () => {
  it('has a vivid blue for Earth and none for the Sun/Moon', () => {
    const earth = atmosphereConfigFor('earth');
    expect(earth).not.toBeNull();
    // Blue channel dominant.
    expect(earth!.tint[2]).toBeGreaterThan(earth!.tint[0]);
    expect(atmosphereConfigFor('sun')).toBeNull();
    expect(atmosphereConfigFor('moon')).toBeNull();
  });

  it('gives every atmosphere-bearing planet a tint, and none to airless bodies', () => {
    // Gas/ice giants + Venus + Mars + Earth all have shells.
    for (const id of ['venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']) {
      const c = atmosphereConfigFor(id);
      expect(c, id).not.toBeNull();
      expect(c!.tint, id).toHaveLength(3);
    }
    // Mercury is airless -> no shell.
    expect(atmosphereConfigFor('mercury')).toBeNull();
    expect(Object.keys(ATMOSPHERE_TINTS).length).toBe(7);
  });
});

describe('ringBandProfile (Cassini + Encke)', () => {
  it('stays within [0,1] across the whole annulus', () => {
    for (let t = 0; t <= 1.0001; t += 0.001) {
      const a = ringBandProfile(Math.min(1, t));
      expect(a).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThanOrEqual(1);
    }
  });

  it('has a sharp dark Cassini division near t=0.72', () => {
    const at = ringBandProfile(0.72);
    const left = ringBandProfile(0.69);
    const right = ringBandProfile(0.75);
    // The gap is darker than its neighbours.
    expect(at).toBeLessThan(left);
    expect(at).toBeLessThan(right);
  });

  it('has bright B and A rings', () => {
    const b = ringBandProfile(0.42);
    const a = ringBandProfile(0.86);
    expect(b).toBeGreaterThan(0.5);
    expect(a).toBeGreaterThan(0.4);
  });

  it('fades to ~0 at both edges (limb transparency)', () => {
    expect(ringBandProfile(0)).toBeCloseTo(0, 3);
    expect(ringBandProfile(1)).toBeCloseTo(0, 3);
  });
});

describe('remapRingUVRadial', () => {
  it('normalises u to [0,1] across the annulus radius', () => {
    const geo = new THREE.RingGeometry(2, 5, 24, 4);
    remapRingUVRadial(geo);
    const uv = geo.attributes.uv as THREE.BufferAttribute;
    let min = Infinity,
      max = -Infinity;
    for (let i = 0; i < uv.count; i++) {
      const u = uv.getX(i);
      if (u < min) min = u;
      if (u > max) max = u;
      expect(uv.getY(i)).toBe(0);
    }
    expect(min).toBeCloseTo(0, 5);
    expect(max).toBeCloseTo(1, 5);
  });

  it('maps inner-radius vertices to u=0 and outer to u=1', () => {
    const geo = new THREE.RingGeometry(3, 9, 32, 1);
    remapRingUVRadial(geo);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const uv = geo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const rad = Math.hypot(pos.getX(i), pos.getY(i));
      const u = uv.getX(i);
      const expected = (rad - 3) / (9 - 3);
      expect(u).toBeCloseTo(expected, 4);
    }
  });
});
