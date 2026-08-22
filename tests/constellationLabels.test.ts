/**
 * Tests for the constellation NAME labels (D7, plan 003 P3, re-anchored
 * plan 004 Q1): the elegant lettering sits BESIDE each figure with a
 * CONSTANT VISIBLE gap (CONSTELLATION_LABEL_EDGE_GAP_RAD, ~2°) from the
 * figure's FAR TIP to the ink's near edge — the margin is
 * `halfExtent + EDGE_GAP + inkRad/2` where `halfExtent` is the far tip on
 * the label side (the pose flips the principal axis to carry it) and
 * `inkRad` is the ACTUAL letter ink width (layout table, not the sprite
 * padding). The sprite is sized ~the figure's own angular span (floor
 * 0.2 rad), unchanged from plan 003. The label fades with the SAME
 * emphasis as its own figure's lines (D4) — the highlight lookup is
 * name-based, so an interleaved child order (lines0, label0, lines1,
 * label1, …) can never fade label k with constellation k+1's emphasis.
 */
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  constellationCenter,
  constellationLabelPose,
  constellationLabelWidth,
  constellationLabelInkWidthRad,
  constellationLabelMargin,
  updateConstellationHighlight,
  CONSTELLATION_BASE_OPACITY,
  CONSTELLATION_PEAK_OPACITY,
  CONSTELLATION_LABEL_EDGE_GAP_RAD,
  CONSTELLATION_LABEL_MIN_WIDTH_RAD,
} from '../src/render/scene';
import { CONSTELLATIONS, raDecToUnit } from '../src/data/constellations';
import { layoutConstellationName, CONSTELLATION_NAME_CANVAS_W } from '../src/render/textures';

function unit(v: [number, number, number]): number {
  return Math.hypot(v[0], v[1], v[2]);
}

describe('constellationLabelPose (plan 004 Q1)', () => {
  it('flips the principal axis so the label side carries the figure FAR TIP', () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      expect(pose.halfExtent).toBeGreaterThan(0);
      expect(unit(pose.axis)).toBeCloseTo(1, 6);
      // The max SIGNED star projection on the pose axis equals halfExtent —
      // the far tip is on the +axis (label) side. Before plan 004 the sign
      // was arbitrary and 5 of 13 figures (Cygnus, Orion, Scorpius,
      // Canis Major, Taurus) had their name past the near/phantom edge.
      let maxPlus = 0;
      for (const s of c.stars) {
        const d = raDecToUnit(s.raHours, s.decDeg);
        const p = d[0] * pose.axis[0] + d[1] * pose.axis[1] + d[2] * pose.axis[2];
        if (p > maxPlus) maxPlus = p;
      }
      expect(maxPlus).toBeCloseTo(pose.halfExtent, 5);
    }
  });

  it('keeps the label on the same side of the sky as the figure (no wrap-around)', () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      const labelDir = pose.labelDir(constellationLabelMargin(c));
      // Same hemisphere as the centroid: dot > 0 (all these margins are
      // well below π/2).
      const [cx, cy, cz] = constellationCenter(c);
      const dot = labelDir[0] * cx + labelDir[1] * cy + labelDir[2] * cz;
      expect(dot).toBeGreaterThan(0.5);
    }
  });
});

describe('label margin — constant INK-edge gap (plan 004 Q1)', () => {
  it('sits exactly halfExtent + EDGE_GAP + inkRad/2 past the centroid', () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      const margin = constellationLabelMargin(c);
      const inkRad = constellationLabelInkWidthRad(c);
      expect(margin).toBeCloseTo(
        pose.halfExtent + CONSTELLATION_LABEL_EDGE_GAP_RAD + inkRad / 2,
        6,
      );

      // And the label direction really is `margin` past the centroid
      // (exact spherical offset along the pose axis).
      const [cx, cy, cz] = constellationCenter(c);
      const labelDir = pose.labelDir(margin);
      const cosAng = cx * labelDir[0] + cy * labelDir[1] + cz * labelDir[2];
      const ang = Math.acos(Math.min(1, Math.max(-1, cosAng)));
      expect(ang).toBeCloseTo(margin, 5);
    }
  });

  it("puts the INK's near edge a CONSTANT EDGE_GAP past the figure's far tip", () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      const inkEdge = constellationLabelMargin(c) - constellationLabelInkWidthRad(c) / 2;
      // The user-visible gap: from the far tip to the first letter.
      expect(inkEdge - pose.halfExtent).toBeCloseTo(CONSTELLATION_LABEL_EDGE_GAP_RAD, 6);
    }
  });

  it('never overlaps the figure (ink near edge past the far tip)', () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      expect(constellationLabelMargin(c) - constellationLabelInkWidthRad(c) / 2).toBeGreaterThan(
        pose.halfExtent,
      );
    }
  });
});

describe('constellationLabelInkWidthRad (plan 004 Q1)', () => {
  it('is the ink FRACTION of the canvas times the sprite width', () => {
    for (const c of CONSTELLATIONS) {
      const ink = layoutConstellationName(c.name).inkWidthPx / CONSTELLATION_NAME_CANVAS_W;
      expect(constellationLabelInkWidthRad(c)).toBeCloseTo(ink * constellationLabelWidth(c), 6);
      // The ink is strictly narrower than the sprite block (padding exists).
      expect(constellationLabelInkWidthRad(c)).toBeLessThan(constellationLabelWidth(c));
    }
  });

  it('varies with name length — long names fill more of the block', () => {
    // "URSA MAJOR" (10 chars) must have a wider ink than "ARIES" (5).
    const um = CONSTELLATIONS.find((c) => c.name === 'Ursa Major')!;
    const ar = CONSTELLATIONS.find((c) => c.name === 'Aries')!;
    expect(constellationLabelInkWidthRad(um)).toBeGreaterThan(constellationLabelInkWidthRad(ar));
  });
});

describe('constellationLabelWidth (plan 003 P3 — unchanged)', () => {
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

  it('is strictly narrower than the pre-plan-003 0.5-rad-half-width sprite for every figure', () => {
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
