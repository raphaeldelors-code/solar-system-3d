/**
 * Tests for the constellation NAME labels (D7, plan 003 P3): the elegant
 * lettering sits BESIDE each figure at a CONSTANT angular gap past its far
 * edge (margin = halfExtent + CONSTELLATION_LABEL_GAP_RAD — compact figures
 * get their name hugging the figure, big figures keep the same small gap),
 * and fades with the SAME emphasis as its own figure's lines (D4) — the
 * highlight lookup is name-based, so an interleaved child order
 * (lines0, label0, lines1, label1, …) can never fade label k with
 * constellation k+1's emphasis. The sprite is sized ~the figure's own
 * angular span, never the old 0.5 rad half-width (1.0 rad full).
 */
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  constellationCenter,
  constellationLabelPose,
  constellationLabelWidth,
  updateConstellationHighlight,
  CONSTELLATION_BASE_OPACITY,
  CONSTELLATION_PEAK_OPACITY,
  CONSTELLATION_LABEL_GAP_RAD,
  CONSTELLATION_LABEL_MIN_WIDTH_RAD,
} from '../src/render/scene';
import { CONSTELLATIONS } from '../src/data/constellations';

/** The margin the build uses: figure far edge + constant gap. */
function labelMargin(c: (typeof CONSTELLATIONS)[number]): number {
  return constellationLabelPose(c).halfExtent + CONSTELLATION_LABEL_GAP_RAD;
}

function unit(v: [number, number, number]): number {
  return Math.hypot(v[0], v[1], v[2]);
}

describe('constellationLabelPose', () => {
  it("offsets the label by a CONSTANT gap past the figure's far edge", () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      const dir = constellationCenter(c);
      expect(pose.halfExtent).toBeGreaterThan(0);

      // The label sits at the centroid's direction rotated by the margin
      // (exact spherical offset), and that margin is always the figure's
      // own half extent PLUS the fixed gap — compact figures (Aquila,
      // Lyra) get their name close, extended figures (Leo, Scorpius) keep
      // the same small gap instead of an overlapping name.
      const margin = labelMargin(c);
      const labelDir = pose.labelDir(margin);
      expect(unit(labelDir)).toBeCloseTo(1, 6);

      const cosAng = dir[0] * labelDir[0] + dir[1] * labelDir[1] + dir[2] * labelDir[2];
      const ang = Math.acos(Math.min(1, Math.max(-1, cosAng)));
      expect(ang).toBeCloseTo(margin, 5);
      expect(ang).toBeCloseTo(pose.halfExtent + CONSTELLATION_LABEL_GAP_RAD, 5);

      // The label is NOT at the figure center (the old "simple label"
      // placement) — it is past the figure's far edge.
      expect(ang).toBeGreaterThan(pose.halfExtent);
    }
  });

  it('keeps the label on the same side of the sky as the figure (no wrap-around)', () => {
    for (const c of CONSTELLATIONS) {
      const dir = constellationCenter(c);
      const labelDir = constellationLabelPose(c).labelDir(labelMargin(c));
      // Same hemisphere as the figure: dot > 0 (margin < π/2 for these
      // figures, all of which are compact angular spans).
      const dot = dir[0] * labelDir[0] + dir[1] * labelDir[1] + dir[2] * labelDir[2];
      expect(dot).toBeGreaterThan(0.5);
    }
  });
});

describe('constellationLabelWidth (plan 003 P3)', () => {
  it("sizes the sprite ~the figure's angular span, floored at MIN_WIDTH_RAD", () => {
    for (const c of CONSTELLATIONS) {
      const w = constellationLabelWidth(c);
      expect(w).toBeGreaterThanOrEqual(CONSTELLATION_LABEL_MIN_WIDTH_RAD);
      expect(w).toBeCloseTo(
        Math.max(CONSTELLATION_LABEL_MIN_WIDTH_RAD, 0.8 * constellationLabelPose(c).halfExtent),
        5,
      );
    }
  });

  it('is strictly narrower than the old 0.5-rad-half-width sprite for every figure', () => {
    for (const c of CONSTELLATIONS) {
      const oldFull = 2 * Math.max(0.5, constellationLabelPose(c).halfExtent * 1.5);
      expect(constellationLabelWidth(c)).toBeLessThan(oldFull);
    }
  });
});

describe('updateConstellationHighlight (name-based index)', () => {
  /** A group in the interleaved order buildConstellations produces. */
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
    return { group, lineMats, labelMats };
  }

  it("fades each label with ITS OWN figure's emphasis (not the next one)", () => {
    const { group, lineMats, labelMats } = fakeSky();
    // Only the LAST constellation is at the view center (emphasis 1);
    // everything else is at the base opacity. A running index counter would
    // shift every label by one and leave the last label unlit.
    const emphases = new Array(CONSTELLATIONS.length).fill(0);
    emphases[CONSTELLATIONS.length - 1] = 1;
    updateConstellationHighlight(group, emphases);

    const peak = CONSTELLATION_PEAK_OPACITY;
    const base = CONSTELLATION_BASE_OPACITY;
    for (let i = 0; i < CONSTELLATIONS.length - 1; i++) {
      expect(labelMats[i].opacity).toBeCloseTo(base, 5);
      expect(lineMats[i].opacity).toBeCloseTo(base, 5);
    }
    const last = CONSTELLATIONS.length - 1;
    expect(labelMats[last].opacity).toBeCloseTo(peak, 5);
    expect(lineMats[last].opacity).toBeCloseTo(peak, 5);
  });

  it('fades lines and labels of the same figure together at partial emphasis', () => {
    const { group, lineMats, labelMats } = fakeSky();
    const base = CONSTELLATION_BASE_OPACITY;
    const peak = CONSTELLATION_PEAK_OPACITY;
    const emphases = CONSTELLATIONS.map((_, i) => i / (CONSTELLATIONS.length - 1));
    updateConstellationHighlight(group, emphases);
    for (let i = 0; i < CONSTELLATIONS.length; i++) {
      const t = base + (peak - base) * emphases[i];
      expect(lineMats[i].opacity).toBeCloseTo(t, 5);
      expect(labelMats[i].opacity).toBeCloseTo(t, 5);
    }
  });

  it('ignores unrelated children (star dots, etc.)', () => {
    const { group, labelMats } = fakeSky();
    const dots = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial());
    dots.name = 'constellation-stars';
    group.add(dots);
    expect(() =>
      updateConstellationHighlight(
        group,
        CONSTELLATIONS.map(() => 1),
      ),
    ).not.toThrow();
    // Labels still at peak, dots untouched.
    for (const m of labelMats) expect(m.opacity).toBeCloseTo(CONSTELLATION_PEAK_OPACITY, 5);
  });
});
