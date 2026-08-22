/**
 * Tests for the constellation camera-distance PRESENCE (plan 003 P4): the
 * sky is a full-sphere wraparound, so in a body close-up it sweeps across
 * the whole frame behind the planet and dominates the view. `presence` is a
 * multiplicative opacity factor: floor 0.25× close-up → 1.0× at the Sky
 * anchor — smooth (smoothstep), monotonic, and the existing emphasis values
 * are never distorted (presence only scales the base/peak range).
 */
import { describe, it, expect } from 'vitest';
import {
  constellationPresence,
  updateConstellationHighlight,
  CONSTELLATION_PRESENCE_NEAR,
  CONSTELLATION_PRESENCE_FAR,
  CONSTELLATION_PRESENCE_FLOOR,
  CONSTELLATION_BASE_OPACITY,
  CONSTELLATION_PEAK_OPACITY,
} from '../src/render/scene';
import { CONSTELLATIONS } from '../src/data/constellations';
import * as THREE from 'three';

describe('constellationPresence', () => {
  it('is floored at PRESENCE_FLOOR up close and 1 beyond the Sky anchor', () => {
    expect(constellationPresence(0)).toBe(CONSTELLATION_PRESENCE_FLOOR);
    expect(constellationPresence(CONSTELLATION_PRESENCE_NEAR)).toBe(CONSTELLATION_PRESENCE_FLOOR);
    // Sky anchor (frameConstellations, 120° FOV, 2026-08-21 data) lands at
    // 2756 — beyond the ramp end, so the sky is at FULL presence there and
    // on the sky tour (r ≈ 2756) as well.
    expect(constellationPresence(2756)).toBe(1);
    expect(constellationPresence(CONSTELLATION_PRESENCE_FAR)).toBe(1);
    expect(constellationPresence(10_000)).toBe(1);
  });

  it('is monotonic non-decreasing and within [floor, 1]', () => {
    let prev = constellationPresence(0);
    expect(prev).toBeGreaterThanOrEqual(0);
    for (let d = 0; d <= 4000; d += 10) {
      const v = constellationPresence(d);
      expect(v).toBeGreaterThanOrEqual(prev - 1e-12);
      expect(v).toBeGreaterThanOrEqual(CONSTELLATION_PRESENCE_FLOOR - 1e-12);
      expect(v).toBeLessThanOrEqual(1 + 1e-12);
      prev = v;
    }
  });

  it('ramps smoothly (smoothstep) between the two plateaus', () => {
    const mid = (CONSTELLATION_PRESENCE_NEAR + CONSTELLATION_PRESENCE_FAR) / 2;
    expect(constellationPresence(mid)).toBeCloseTo(
      CONSTELLATION_PRESENCE_FLOOR + (1 - CONSTELLATION_PRESENCE_FLOOR) * 0.5,
      5,
    );
  });
});

describe('presence floor (plan 004 Q2)', () => {
  it('is the MIDDLE (0.5) — between pre-P4 over-presence (≈1.0) and the 0.25 floor', () => {
    // Pins the intent so a revert to 0.25 is a visible regression: the user
    // found 0.25 "almost not there anymore" in close-ups (2026-08-21).
    expect(CONSTELLATION_PRESENCE_FLOOR).toBe(0.5);
  });

  it('is at (a hair above) the floor in a close-up / overview view, full at the Sky anchor', () => {
    // Default camera (0,16,30) → length 34; System anchor → 232. The ramp is
    // gentle over 2→2756, so both sit within 0.1% of the floor — for the eye,
    // on the floor. Assert the bound, not an exact match, so the test stays
    // honest about the smoothstep.
    for (const d of [34, 232]) {
      expect(constellationPresence(d)).toBeGreaterThanOrEqual(CONSTELLATION_PRESENCE_FLOOR);
      // ≤ ~1% above the floor — the sky reads as the flat "middle" here.
      expect(constellationPresence(d)).toBeLessThan(CONSTELLATION_PRESENCE_FLOOR + 0.015);
    }
    // Sky anchor stays exactly full — the fix must not touch the sky view.
    expect(constellationPresence(2756)).toBe(1);
  });
});

describe('updateConstellationHighlight presence factor', () => {
  function fakeSky() {
    const group = new THREE.Group();
    const lineMats: THREE.LineBasicMaterial[] = [];
    const labelMats: THREE.SpriteMaterial[] = [];
    for (const c of CONSTELLATIONS) {
      const lm = new THREE.LineBasicMaterial({ transparent: true });
      const lines = new THREE.LineSegments(new THREE.BufferGeometry(), lm);
      lines.name = `constellation-lines:${c.name}`;
      group.add(lines);
      lineMats.push(lm);
      const sm = new THREE.SpriteMaterial({ transparent: true });
      const label = new THREE.Sprite(sm);
      label.name = `constellation-label:${c.name}`;
      group.add(label);
      labelMats.push(sm);
    }
    const dots = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({ transparent: true, opacity: 1 }),
    );
    dots.name = 'constellation-stars';
    group.add(dots);
    return { group, lineMats, labelMats, dots };
  }

  it('scales lines, labels AND the shared star dots by the same factor', () => {
    const { group, lineMats, labelMats, dots } = fakeSky();
    const emphases = new Array(CONSTELLATIONS.length).fill(1); // everything at peak
    const p = 0.4;
    updateConstellationHighlight(group, emphases, p);
    const expected = CONSTELLATION_PEAK_OPACITY * p;
    for (const m of lineMats) expect(m.opacity).toBeCloseTo(expected, 5);
    for (const m of labelMats) expect(m.opacity).toBeCloseTo(expected, 5);
    expect((dots.material as THREE.PointsMaterial).opacity).toBeCloseTo(p, 5);
  });

  it('preserves the base/peak emphasis RANGE shape (only scales it)', () => {
    const { group, lineMats } = fakeSky();
    const p = 0.5;
    updateConstellationHighlight(group, new Array(CONSTELLATIONS.length).fill(0), p);
    expect(lineMats[0].opacity).toBeCloseTo(CONSTELLATION_BASE_OPACITY * p, 5);
    updateConstellationHighlight(group, new Array(CONSTELLATIONS.length).fill(1), p);
    expect(lineMats[0].opacity).toBeCloseTo(CONSTELLATION_PEAK_OPACITY * p, 5);
  });

  it('defaults to presence 1 (back-compat for existing call sites)', () => {
    const { group, lineMats } = fakeSky();
    updateConstellationHighlight(group, new Array(CONSTELLATIONS.length).fill(1));
    expect(lineMats[0].opacity).toBeCloseTo(CONSTELLATION_PEAK_OPACITY, 5);
  });
});
