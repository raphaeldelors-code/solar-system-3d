/**
 * Tests for the constellation name-label geometry (plan 003 P3, re-anchored
 * plan 004 Q1, re-sized + de-cluttered plan 006):
 *
 *  - `constellationLabelPose(c)` — the figure's principal axis + far-tip
 *    half-extent, and the exact-spherical label direction.
 *    INVARIANTS (unit-tested):
 *      * the axis carries the FAR tip (max signed projection === halfExtent)
 *      * the label lands `margin` past the centroid along the axis, on the
 *        far side (dot(dir, labelDir(margin)) ≈ cos(margin))
 *      * the label sits on the celestial sphere (unit length)
 *
 *  - Constant size tiers (plan 006): `constellationLabelHeightRad` returns
 *    exactly two values; `constellationLabelWidth` is constant per tier.
 *
 *  - `resolveConstellationLabels` (plan 006): static anti-overlap solver —
 *    the full 88 sky must contain NO pair of overlapping names, and the
 *    placement of one label must not change when an unrelated constellation
 *    is added (determinism).
 */
import { describe, expect, it } from 'vitest';
import {
  constellationCenter,
  constellationLabelHeightRad,
  constellationLabelInkWidthRad,
  constellationLabelMargin,
  constellationLabelOpacity,
  constellationLabelPose,
  constellationLabelWidth,
  CONSTELLATION_LABEL_BASE_OPACITY,
  CONSTELLATION_LABEL_HEIGHT_RAD,
  CONSTELLATION_LABEL_MINOR_HEIGHT_RAD,
  CONSTELLATION_LABEL_PEAK_OPACITY,
  resolveConstellationLabels,
} from '../src/render/scene';
import { CONSTELLATIONS, raDecToUnit } from '../src/data/constellations';
import type { Constellation } from '../src/data/constellations';

const approx = (a: number, b: number, eps: number) => Math.abs(a - b) <= eps;
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

describe('constellationLabelPose (plan 003 P3 / 004 Q1 / 006 sizing)', () => {
  it('axis is unit and tangent to the sphere at the centroid', () => {
    for (const c of CONSTELLATIONS) {
      const dir = constellationCenter(c);
      const pose = constellationLabelPose(c);
      expect(Math.hypot(...pose.axis)).toBeCloseTo(1, 5);
      // Tangent: perpendicular to the centroid direction.
      expect(Math.abs(dot(dir, pose.axis))).toBeLessThan(1e-6);
    }
  });

  it('the label side carries the FAR tip (max signed projection === halfExtent)', () => {
    for (const c of CONSTELLATIONS) {
      const pose = constellationLabelPose(c);
      let maxPlus = 0;
      for (const s of c.stars) {
        const p = dot(raDecToUnit(s.raHours, s.decDeg), pose.axis);
        if (p > maxPlus) maxPlus = p;
      }
      // The far tip's projection IS halfExtent, up to float error.
      expect(approx(pose.halfExtent, maxPlus, 1e-9)).toBe(true);
      expect(pose.halfExtent).toBeGreaterThan(0);
    }
  });

  it('labelDir lands `margin` past the centroid ON THE FAR SIDE, unit length', () => {
    for (const c of CONSTELLATIONS) {
      const dir = constellationCenter(c);
      const pose = constellationLabelPose(c);
      for (const margin of [0.2, 0.5, 1.0]) {
        const ld = pose.labelDir(margin);
        // Exact spherical offset: angle(centroid, label) === margin.
        expect(Math.acos(dot(dir, ld))).toBeCloseTo(margin, 6);
        // Unit direction.
        expect(Math.hypot(...ld)).toBeCloseTo(1, 6);
        // Far side: the label must be farther along the axis than the
        // centroid — i.e. its projection on the axis is POSITIVE (the pose
        // flipped the axis so the far tip is on the + side).
        expect(dot(ld, pose.axis)).toBeGreaterThan(0.5 * margin - 1e-6);
      }
    }
  });

  it('label margin grows with figure size + name length, and beats the figure', () => {
    for (const c of CONSTELLATIONS) {
      const m = constellationLabelMargin(c);
      const pose = constellationLabelPose(c);
      // Always beyond the far tip + the gap (the margin must clear the
      // figure, not land inside it).
      expect(m).toBeGreaterThan(pose.halfExtent + 0.03);
      // And a real margin (the ink half is non-trivial for every name).
      expect(m).toBeGreaterThan(0.05);
    }
  });

  it('plan 006: letter cap height is exactly two tiers, independent of name', () => {
    const seen = new Set<number>();
    for (const c of CONSTELLATIONS) {
      const h = constellationLabelHeightRad(c);
      seen.add(h);
      expect([CONSTELLATION_LABEL_HEIGHT_RAD, CONSTELLATION_LABEL_MINOR_HEIGHT_RAD]).toContain(h);
    }
    // Both tiers actually occur in the 88 (a long figure and a tiny one).
    expect(seen.size).toBe(2);
    expect(seen.has(CONSTELLATION_LABEL_HEIGHT_RAD)).toBe(true);
    expect(seen.has(CONSTELLATION_LABEL_MINOR_HEIGHT_RAD)).toBe(true);
  });

  it('plan 006: label width is constant per tier (longer names = wider sprite, same letters)', () => {
    for (const c of CONSTELLATIONS) {
      const h = constellationLabelHeightRad(c);
      const w = constellationLabelWidth(c);
      // Width = H × (canvasW / font size); always positive and wider than the ink.
      expect(w).toBeGreaterThan(constellationLabelInkWidthRad(c));
      expect(w).toBeGreaterThan(h); // 4:1-ish blocks are wider than tall.
    }
  });

  it('plan 006: ink width fraction is well inside the sprite for every name', () => {
    for (const c of CONSTELLATIONS) {
      const ink = constellationLabelInkWidthRad(c);
      const full = constellationLabelWidth(c);
      // The ink is a strict sub-fraction of the block (padding exists).
      expect(ink).toBeGreaterThan(0);
      expect(ink / full).toBeLessThan(1);
    }
  });
});

describe('constellationLabelOpacity (plan 006 label fade curve)', () => {
  it('is 0.05 at the edges and 1.0 dead center, monotonically increasing', () => {
    expect(constellationLabelOpacity(0)).toBeCloseTo(CONSTELLATION_LABEL_BASE_OPACITY, 6);
    expect(constellationLabelOpacity(1)).toBeCloseTo(CONSTELLATION_LABEL_PEAK_OPACITY, 6);
    let prev = constellationLabelOpacity(0);
    for (let i = 1; i <= 10; i++) {
      const v = constellationLabelOpacity(i / 10);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe('resolveConstellationLabels (plan 006 anti-overlap solver)', () => {
  /** Ink boxes of the resolved labels: angular half-widths around each dir. */
  const boxes = (c: Constellation[], placements: ReturnType<typeof resolveConstellationLabels>) =>
    c.map((cc, i) => ({
      dir: placements[i].dir,
      inkHalf: placements[i].inkHalf,
      halfH: placements[i].halfH,
      name: cc.name,
    }));

  /** Ellipse overlap (same math as the solver) between two placed labels. */
  const overlap = (
    a: { dir: [number, number, number]; inkHalf: number; halfH: number },
    b: { dir: [number, number, number]; inkHalf: number; halfH: number },
  ): number => {
    const ox = a.inkHalf + b.inkHalf;
    const oy = a.halfH + b.halfH;
    let mx = a.dir[0] + b.dir[0],
      my = a.dir[1] + b.dir[1],
      mz = a.dir[2] + b.dir[2];
    const ml = Math.hypot(mx, my, mz);
    if (ml < 1e-6) return 0;
    mx /= ml;
    my /= ml;
    mz /= ml;
    let ux = my * a.dir[2] - mz * a.dir[1],
      uy = mz * a.dir[0] - mx * a.dir[2],
      uz = mx * a.dir[1] - my * a.dir[0];
    const ul = Math.hypot(ux, uy, uz);
    if (ul < 1e-6) return 0;
    ux /= ul;
    uy /= ul;
    uz /= ul;
    const vx = my * uz - mz * uy,
      vy = mz * ux - mx * uz,
      vz = mx * uy - my * ux;
    const ax = ux * a.dir[0] + uy * a.dir[1] + uz * a.dir[2],
      ay = vx * a.dir[0] + vy * a.dir[1] + vz * a.dir[2];
    const bx = ux * b.dir[0] + uy * b.dir[1] + uz * b.dir[2],
      by = vx * b.dir[0] + vy * b.dir[1] + vz * b.dir[2];
    const nx = (ax - bx) / ox;
    const ny = (ay - by) / oy;
    const d2 = nx * nx + ny * ny;
    return d2 < 1 ? 1 - d2 : 0;
  };

  it('returns one placement per constellation, in input order, on the sphere', () => {
    const placements = resolveConstellationLabels(CONSTELLATIONS);
    expect(placements.length).toBe(CONSTELLATIONS.length);
    for (const p of placements) {
      expect(Math.hypot(...p.dir)).toBeCloseTo(1, 5);
      expect([1, -1]).toContain(p.side);
      expect([1.0, 1.5]).toContain(p.marginScale);
      expect(p.inkHalf).toBeGreaterThan(0);
      expect(p.halfH).toBeGreaterThan(0);
      expect(p.offset).toBeGreaterThan(0);
    }
  });

  it('plan 006: the FULL 88-constellation sky has NO overlapping name pair', () => {
    const placements = resolveConstellationLabels(CONSTELLATIONS);
    const bs = boxes(CONSTELLATIONS, placements);
    let worst = 0;
    for (let i = 0; i < bs.length; i++) {
      for (let j = i + 1; j < bs.length; j++) {
        const o = overlap(bs[i], bs[j]);
        if (o > worst) worst = o;
      }
    }
    // Zero overlap (the padding in inkHalf/halfH makes this exact).
    expect(worst).toBe(0);
  });

  it('plan 006: each label stays near its own figure (offset ≤ 1.5× the natural margin)', () => {
    // The solver places the label exactly `offset` radians from the centroid
    // (a spherical offset along the figure axis), where
    // offset = margin0 × marginScale and marginScale ∈ {1, 1.5}. So the
    // label can never drift farther than 1.5× its natural "beside the
    // figure" margin — the guarantee that keeps every name with its own
    // figure even when crowded by a neighbor.
    const placements = resolveConstellationLabels(CONSTELLATIONS);
    for (let i = 0; i < CONSTELLATIONS.length; i++) {
      const c = CONSTELLATIONS[i];
      const p = placements[i];
      expect(p.offset).toBeLessThanOrEqual(1.5 * constellationLabelMargin(c) + 1e-12);
      // And the label direction is exactly `offset` from the centroid.
      const d = Math.acos(Math.min(1, Math.max(-1, dot(constellationCenter(c), p.dir))));
      expect(d).toBeCloseTo(p.offset, 9);
    }
  });

  it('plan 006: deterministic — same input, same output', () => {
    const a = resolveConstellationLabels(CONSTELLATIONS);
    const b = resolveConstellationLabels(CONSTELLATIONS);
    expect(b).toEqual(a);
  });

  it('plan 006: deterministic — order-independent tie-breaks (shuffled input, same set)', () => {
    const a = resolveConstellationLabels(CONSTELLATIONS);
    const shuffled = [...CONSTELLATIONS].sort((x, y) => y.name.localeCompare(x.name));
    const b = resolveConstellationLabels(shuffled);
    // The PLACEMENT SET is identical regardless of input order (the solver
    // sorts internally by figure size + name).
    const key = (c: Constellation, p: { dir: [number, number, number] }) =>
      `${c.name}:${p.dir.map((v) => v.toFixed(6)).join(',')}`;
    const setA = new Set(CONSTELLATIONS.map((c, i) => key(c, a[i])));
    const setB = new Set(shuffled.map((c, i) => key(c, b[i])));
    expect(setB).toEqual(setA);
  });

  it('plan 006: the top-priority (largest) figure places identically alone or in the full sky', () => {
    // The solver places figures biggest-first (name tie-break), so the
    // largest figure is placed with zero neighbors — its placement must be
    // exactly the single-constellation result, even inside the full sky.
    let topIdx = 0;
    for (let i = 1; i < CONSTELLATIONS.length; i++) {
      const da = constellationLabelPose(CONSTELLATIONS[i]).halfExtent;
      const db = constellationLabelPose(CONSTELLATIONS[topIdx]).halfExtent;
      if (
        da > db ||
        (da === db && CONSTELLATIONS[i].name.localeCompare(CONSTELLATIONS[topIdx].name) < 0)
      ) {
        topIdx = i;
      }
    }
    const top = CONSTELLATIONS[topIdx];
    // Guard: the top figure must be the unique largest (else the tie-break
    // pair could interact before either is placed — the invariant is
    // only guaranteed for a unique maximum).
    const second = [...CONSTELLATIONS.keys()]
      .filter((i) => i !== topIdx)
      .reduce((best, i) => {
        const h = constellationLabelPose(CONSTELLATIONS[i]).halfExtent;
        const hb = constellationLabelPose(CONSTELLATIONS[best]).halfExtent;
        return h > hb ? i : best;
      }, 0);
    expect(constellationLabelPose(top).halfExtent).toBeGreaterThan(
      constellationLabelPose(CONSTELLATIONS[second]).halfExtent,
    );
    const base = resolveConstellationLabels([top]);
    const all = resolveConstellationLabels(CONSTELLATIONS);
    expect(all[topIdx].dir).toEqual(base[0].dir);
    expect(all[topIdx].marginScale).toBe(base[0].marginScale);
    expect(all[topIdx].side).toBe(base[0].side);
  });
});
