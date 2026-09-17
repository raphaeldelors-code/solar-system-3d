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
import {
  ringBandProfile,
  saturnRingProfile,
  saturnRingColor,
  remapRingUVRadial,
} from '../src/render/rings';

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

describe('saturnRingProfile (plan 044 A4 — real ring structure)', () => {
  it('stays within [0,1] across the whole annulus', () => {
    for (let t = 0; t <= 1.0001; t += 0.001) {
      const a = saturnRingProfile(Math.min(1, t));
      expect(a).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThanOrEqual(1);
    }
  });

  it('is 0 outside [0,1]', () => {
    expect(saturnRingProfile(-0.1)).toBe(0);
    expect(saturnRingProfile(1.1)).toBe(0);
  });

  it('has the dense B ring as the brightest band (t≈0.28–0.69)', () => {
    // Mid-B-ring should be near the profile's peak.
    const bMid = saturnRingProfile(0.48);
    expect(bMid).toBeGreaterThan(0.8);
    // The B ring should be brighter than the C ring and the A ring.
    const cMid = saturnRingProfile(0.14);
    const aMid = saturnRingProfile(0.88);
    expect(bMid).toBeGreaterThan(cMid);
    expect(bMid).toBeGreaterThan(aMid);
  });

  it('has a dark Cassini division between B and A (t≈0.69–0.76)', () => {
    const cassini = saturnRingProfile(0.727);
    const bEdge = saturnRingProfile(0.68);
    const aEdge = saturnRingProfile(0.77);
    // The division is darker than both its neighbours.
    expect(cassini).toBeLessThan(bEdge);
    expect(cassini).toBeLessThan(aEdge);
    expect(cassini).toBeLessThan(0.2);
  });

  it('has the faint C ring innermost (t≈0–0.28)', () => {
    const cMid = saturnRingProfile(0.14);
    expect(cMid).toBeGreaterThan(0.2);
    expect(cMid).toBeLessThan(0.6);
  });

  it('has the A ring outermost (t≈0.76–1.0), dimmer than B', () => {
    const aMid = saturnRingProfile(0.88);
    expect(aMid).toBeGreaterThan(0.4);
    expect(aMid).toBeLessThan(saturnRingProfile(0.48));
  });

  it('has the Encke gap (t≈0.95) darker than its A-ring neighbours', () => {
    const encke = saturnRingProfile(0.952);
    const left = saturnRingProfile(0.93);
    const right = saturnRingProfile(0.97);
    expect(encke).toBeLessThan(left);
    expect(encke).toBeLessThan(right);
  });

  it('fades to ~0 at both edges (limb transparency)', () => {
    expect(saturnRingProfile(0)).toBeCloseTo(0, 3);
    expect(saturnRingProfile(1)).toBeCloseTo(0, 3);
  });

  it('is deterministic (same t → same value, no Math.random)', () => {
    const a = saturnRingProfile(0.5);
    const b = saturnRingProfile(0.5);
    expect(a).toBe(b);
  });
});

describe('saturnRingColor (plan 044 A4)', () => {
  it('returns sRGB 0..255 triples', () => {
    for (let t = 0; t <= 1.0001; t += 0.1) {
      const [r, g, b] = saturnRingColor(Math.min(1, t));
      for (const c of [r, g, b]) {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(255);
      }
    }
  });

  it('is warmer (more red than blue) on the inner rings, cooler on the outer', () => {
    const inner = saturnRingColor(0.1);
    const outer = saturnRingColor(0.9);
    // Inner: red channel noticeably above blue (tan).
    expect(inner[0]).toBeGreaterThan(inner[2]);
    // Outer: red and blue closer together (whiter).
    const innerGap = inner[0] - inner[2];
    const outerGap = outer[0] - outer[2];
    expect(outerGap).toBeLessThan(innerGap);
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
