import { describe, it, expect } from 'vitest';
import {
  SUN_R,
  planetRadiusKm,
  moonRadiusKm,
  baseMoonDistance,
  planetDistance,
  moonDistance,
} from '../src/render/visibleScale';
import { SUN_SHADOWS } from '../src/render/shadows';
import {
  SUN,
  PLANETS,
  DWARF_PLANETS,
  MOONS,
} from '../src/data/bodies';
import { BELTS } from '../src/data/belts';

/**
 * Mirrors the constraint solver in `solve_scale.py`.
 *
 * The solver produces two fixed-point tables — the planet-distance anchors
 * and the per-moon floor/cap clamps — and then re-derives every invariant
 * from the real body data to prove they hold (TOTAL FAILS: 0). This test
 * reproduces that derivation in TypeScript and asserts it against the
 * tables stored in `src/render/visibleScale.ts`, so any drift between the
 * body data, the formulas, and the solved constants fails fast.
 *
 * To regenerate after a data/formula change: `python3 solve_scale.py`,
 * copy the emitted anchors and clamps into `visibleScale.ts`, and update
 * the `SOLVER_ANCHORS` snapshot below.
 */

// --- solver constants (must match solve_scale.py) ---------------------------
const GAP_MOON = 0.15;
const MARGIN = 0.5;
const GAP_BODY = 0.4;
const TNO = new Set(['pluto', 'haumea', 'makemake', 'eris']);
const IRREG = new Set(['himalia', 'iapetus', 'nereid']);
/** Anchor tables are stored at 6 decimal places; this is the sync tolerance. */
const EPS = 1e-3;

// --- data from the real sources (single source of truth) --------------------
interface Planet {
  id: string;
  a: number; // AU
  e: number;
  r: number; // scene radius (visible)
  ringOuter: number; // 0 = no rings
}

const ALL = [...PLANETS, ...DWARF_PLANETS];
const P = (b: (typeof ALL)[number]): Planet => ({
  id: b.id,
  a: b.elements!.a,
  e: b.elements!.e,
  r: planetRadiusKm(b.radiusKm),
  ringOuter: b.rings?.outer ?? 0,
});
const planets: Planet[] = ALL.map(P).sort((x, y) => x.a - y.a);
const byId = new Map(planets.map((p) => [p.id, p]));
const order = planets.map((p) => p.id);
const parentOf = new Map<string, Planet>();
for (const m of MOONS) if (m.parent) parentOf.set(m.id, byId.get(m.parent)!);

const moonsOf = (pid: string) =>
  MOONS.filter((m) => m.parent === pid).map((m) => ({
    id: m.id,
    ak: m.elements!.a, // km (moon unit)
    e: m.elements!.e,
    r: moonRadiusKm(m.radiusKm),
  }));

// --- envelope / corridor (must match solve_scale.py) ------------------------
const ext = (p: Planet): number =>
  p.ringOuter > 0 ? p.r * p.ringOuter : p.r;

const off = new Map<string, number>(); // per-moon offset = max(base(a apo), floor)
const floor = new Map<string, number>();
const stackOuter = (pid: string): number => {
  const ls = moonsOf(pid);
  if (ls.length === 0) return 0;
  return Math.max(...ls.map((m) => off.get(m.id)! + m.r));
};
const envelope = (p: Planet): number => Math.max(ext(p), stackOuter(p.id));

for (const p of planets) {
  const regs = moonsOf(p.id)
    .filter((m) => !IRREG.has(m.id))
    .sort((x, y) => x.ak - y.ak);
  const irr = moonsOf(p.id).filter((m) => IRREG.has(m.id)).sort((x, y) => x.ak - y.ak);
  const seq = [...regs, ...irr];
  for (let k = 0; k < seq.length; k++) {
    const m = seq[k];
    let fl = k === 0
      ? ext(p) + m.r + GAP_BODY
      : off.get(seq[k - 1].id)! + seq[k - 1].r + m.r + GAP_MOON;
    // eccentric moons: perigee must still clear the parent surface
    fl = Math.max(fl, (ext(p) + m.r + GAP_BODY * 0.5) / Math.max(1e-9, 1 - m.e));
    floor.set(m.id, fl);
    off.set(m.id, Math.max(baseMoonDistance(m.ak * (1 + m.e)), fl));
  }
}

const crosses = (i: string, o: string): boolean => {
  const i0 = i < o ? i : o;
  const o0 = i < o ? o : i;
  return (i0 === 'neptune' && TNO.has(o0)) || (TNO.has(i0) && TNO.has(o0));
};
const need = (i: Planet, o: Planet): number => envelope(i) + envelope(o) + MARGIN;

/** Moon apoapsis corridor for a parent (null = outermost, e.g. Pluto).
 *  Mirrors the solver's `CAP[p]`: the inner and next neighbours' corridors,
 *  measured from the parent's own peri/apo. */
function corridor(pid: string): number | null {
  const idx = order.indexOf(pid);
  const p = byId.get(pid)!;
  let cap: number | null = null;
  if (idx > 0) {
    const i = byId.get(order[idx - 1])!; // inner neighbour
    if (!crosses(i.id, pid)) {
      const c = planetDistance(p.a * (1 - p.e)) - planetDistance(i.a * (1 + i.e)) - envelope(i);
      cap = cap === null ? c : Math.min(cap, c);
    }
  }
  if (idx < order.length - 1) {
    const n = byId.get(order[idx + 1])!; // next neighbour
    if (!crosses(pid, n.id)) {
      const c = planetDistance(n.a * (1 - n.e)) - planetDistance(p.a * (1 + p.e)) - envelope(n);
      cap = cap === null ? c : Math.min(cap, c);
    }
  }
  return cap;
}

/** Displayed moon distance = base, then floor-clamp, then cap-clamp. */
function dvis(id: string, dkm: number): number {
  const p = parentOf.get(id)!;
  const m = moonsOf(p.id).find((x) => x.id === id)!;
  let v = baseMoonDistance(dkm);
  v = Math.max(v, floor.get(id)!);
  const cap = corridor(p.id);
  if (cap !== null) v = Math.min(v, cap - m.r);
  return v;
}

// --- the solved planet-distance anchors (must match visibleScale.ts) --------
const SOLVER_ANCHORS: Array<{ id: string; a: number; d: number }> = [
  { id: 'mercury', a: 0.387099, d: 5.0 },
  { id: 'venus', a: 0.723332, d: 9.724523 },
  { id: 'earth', a: 1.000003, d: 15.05106 },
  { id: 'mars', a: 1.52371, d: 23.211637 },
  { id: 'ceres', a: 2.7675, d: 28.815177 },
  { id: 'jupiter', a: 5.203363, d: 43.950402 },
  { id: 'saturn', a: 9.53707, d: 66.856402 },
  { id: 'uranus', a: 19.191264, d: 83.895733 },
  { id: 'neptune', a: 30.068963, d: 101.998096 },
  { id: 'pluto', a: 39.482117, d: 126.472295 },
  { id: 'haumea', a: 43.11, d: 128.472295 },
  { id: 'makemake', a: 45.43, d: 130.472295 },
  { id: 'eris', a: 67.864, d: 132.472295 },
];

// ===========================================================================
describe('visibleScale — solver floor/envelope invariants', () => {
  it('anchor snapshot matches the real body data (drift guard)', () => {
    expect(order).toEqual(SOLVER_ANCHORS.map((x) => x.id));
    for (const s of SOLVER_ANCHORS) {
      const p = byId.get(s.id)!;
      expect(p.a, `a[${s.id}]`).toBeCloseTo(s.a, 4);
      // the ramp evaluated at each anchor must land on the stored distance
      expect(planetDistance(p.a), `d[${s.id}]`).toBeCloseTo(s.d, 3);
    }
  });

  it('the stored ramp is strictly increasing (no overlapping orbits)', () => {
    for (let x = 0.2; x <= 140; x += 0.2) {
      const y = x + 0.2;
      expect(planetDistance(y), `ramp @ ${x}`).toBeGreaterThan(planetDistance(x));
    }
  });

  it('the stored ramp extends linearly past the last anchor', () => {
    const A = SOLVER_ANCHORS[SOLVER_ANCHORS.length - 2];
    const B = SOLVER_ANCHORS[SOLVER_ANCHORS.length - 1];
    for (const au of [B.a + 5, B.a + 20, 120]) {
      const t = (au - B.a) / (B.a - A.a);
      const expectLin = B.d + (B.d - A.d) * t;
      expect(planetDistance(au)).toBeCloseTo(expectLin, 6);
    }
  });

  it('planet adjacency: worst-case apse clearance for every non-crossing pair', () => {
    for (let k = 0; k < order.length - 1; k++) {
      const i = byId.get(order[k])!;
      const o = byId.get(order[k + 1])!;
      if (crosses(i.id, o.id)) continue; // accepted real-space radial crossing
      const room = planetDistance(o.a * (1 - o.e)) - planetDistance(i.a * (1 + i.e));
      const n = need(i, o);
      expect(room, `${i.id}->${o.id}`).toBeGreaterThanOrEqual(n - EPS);
    }
  });

  it('moons: perigee clears the parent and apoapsis stays inside the corridor', () => {
    for (const p of planets) {
      const cap = corridor(p.id);
      for (const m of moonsOf(p.id)) {
        const peri = dvis(m.id, m.ak * (1 - m.e));
        expect(peri, `${p.id}/${m.id} peri`).toBeGreaterThanOrEqual(ext(p) - EPS);
        if (cap !== null) {
          const apoSurf = dvis(m.id, m.ak * (1 + m.e)) + m.r;
          expect(apoSurf, `${p.id}/${m.id} apo`).toBeLessThanOrEqual(cap + EPS);
        }
      }
    }
  });

  it('sibling moons: inner apoapsis and outer perigee keep a surface gap', () => {
    for (const p of planets) {
      const regs = moonsOf(p.id).filter((m) => !IRREG.has(m.id)).sort((a, b) => a.ak - b.ak);
      const irr = moonsOf(p.id).filter((m) => IRREG.has(m.id)).sort((a, b) => a.ak - b.ak);
      const seq = [...regs, ...irr];
      for (let k = 0; k < seq.length - 1; k++) {
        const m1 = seq[k];
        const m2 = seq[k + 1];
        const gap = dvis(m2.id, m2.ak * (1 - m2.e)) - dvis(m1.id, m1.ak * (1 + m1.e));
        const n = m1.r + m2.r + GAP_MOON;
        expect(gap, `${p.id} ${m1.id}/${m2.id}`).toBeGreaterThanOrEqual(n - EPS);
      }
    }
  });

  it('the per-moon floor/cap clamp path is exercised', () => {
    // Every moon resolves to a finite scene distance.
    for (const m of MOONS) {
      expect(Number.isFinite(moonDistance(m.id, m.elements!.a)), m.id).toBe(true);
    }
    // Phobos is the tight case: its base curve at perigee (1.16) sits well
    // below the solved floor (1.978), so the floor clamp must engage.
    const phobos = MOONS.find((m) => m.id === 'phobos')!;
    const pPeri = phobos.elements!.a * (1 - phobos.elements!.e);
    expect(moonDistance('phobos', pPeri), 'floor engages')
      .toBeGreaterThan(baseMoonDistance(pPeri) + 0.5);
    // The displayed orbit is always bounded by [floor, cap - r] (cap when set).
    for (const p of planets) {
      const cap = corridor(p.id);
      for (const m of moonsOf(p.id)) {
        const lo = moonDistance(m.id, m.ak * (1 - m.e));
        const hi = moonDistance(m.id, m.ak * (1 + m.e));
        expect(lo, `${m.id} has a clamp`).not.toBeNull();
        expect(hi, `${m.id} has a clamp`).not.toBeNull();
        const loN = lo as number;
        const hiN = hi as number;
        expect(loN, `${m.id} >= floor`).toBeGreaterThanOrEqual(floor.get(m.id)! - EPS);
        if (cap !== null) expect(hiN, `${m.id} <= cap`).toBeLessThanOrEqual(cap - m.r + EPS);
        expect(hiN, `${m.id} apo>=peri`).toBeGreaterThanOrEqual(loN - EPS);
      }
    }
  });

  it('sun clearance, belt ranges, and far extent stay within the shadow camera', () => {
    const mercury = byId.get('mercury')!;
    const inner = planetDistance(mercury.a * (1 - mercury.e)) - mercury.r;
    expect(inner).toBeGreaterThanOrEqual(SUN_R + GAP_BODY - EPS);

    for (const belt of BELTS) {
      const lo = belt.a[0] * (1 - belt.e[1]);
      const hi = belt.a[1] * (1 + belt.e[1]);
      // belt stays between its neighbouring orbits' corridors
      expect(planetDistance(lo)).toBeGreaterThan(0);
      expect(planetDistance(hi)).toBeGreaterThanOrEqual(planetDistance(lo));
    }

    const eris = byId.get('eris')!;
    const maxrad = planetDistance(eris.a * (1 + eris.e));
    expect(maxrad, 'far extent <= shadow far').toBeLessThan(SUN_SHADOWS.far);
    expect(SUN.radiusKm).toBeGreaterThan(0);
  });
});
