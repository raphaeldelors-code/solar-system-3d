import type { OrbitalElements } from './types';
import { JULIAN_CENTURY_DAYS } from './types';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const DEG = Math.PI / 180;

/**
 * Solve Kepler's equation M = E - e·sin(E) for the eccentric anomaly E.
 *
 * **All angles in radians.** Newton–Raphson; converges in <8 iterations
 * for e < 0.6 (all our bodies).
 */
export function solveKepler(M: number, e: number, tol = 1e-10): number {
  const m = M % (2 * Math.PI);
  let E = e < 0.8 ? m : Math.PI;
  for (let k = 0; k < 64; k++) {
    const f = E - e * Math.sin(E) - m;
    const fp = 1 - e * Math.cos(E);
    const dE = f / fp;
    E -= dE;
    if (Math.abs(dE) < tol) break;
  }
  return E;
}

/**
 * Elements resolved at a time: all fields concrete, no `rates` (already
 * applied) and no `periodicM` (a time-evolution input, not a resolved
 * value — its effect is folded into `M0`).
 */
type ResolvedElements = Omit<Required<Omit<OrbitalElements, 'rates'>>, 'periodicM'>;

/** Elements at a given time (applies optional secular rates). */
export function elementsAt(
  el: OrbitalElements,
  daysSinceJ2000: number,
): ResolvedElements {
  const c = daysSinceJ2000 / JULIAN_CENTURY_DAYS;
  const r = el.rates;
  return {
    a: el.a + (r?.a ?? 0) * c,
    e: el.e + (r?.e ?? 0) * c,
    i: el.i + (r?.i ?? 0) * c,
    node: el.node + (r?.node ?? 0) * c,
    peri: el.peri + (r?.peri ?? 0) * c,
    M0: el.M0 + (r?.M0 ?? 0) * c + periodicMOffset(el, daysSinceJ2000),
    n: el.n,
  };
}

/**
 * JPL Table 2b periodic terms of the MEAN ANOMALY, in degrees:
 * dM = sum over terms of (b*T^2 + c*cos(f*T) + s*sin(f*T)), with T in
 * Julian centuries since J2000 and `f` a frequency in deg/century.
 * Applied on top of the secular M(t) by every path that evolves the mean
 * anomaly in time (per-frame positions, orbit-line sampling).
 */
export function periodicMOffset(el: OrbitalElements, daysSinceJ2000: number): number {
  if (!el.periodicM) return 0;
  const T = daysSinceJ2000 / JULIAN_CENTURY_DAYS;
  let dM = 0;
  for (const term of el.periodicM) {
    const ang = term.f * T;
    dM += term.b * T * T + term.c * Math.cos(ang * DEG) + term.s * Math.sin(ang * DEG);
  }
  return dM;
}

/** Resolved elements at a given time, allocation-free (see `ResolvedElements`). */
export function elementsAtInto(el: OrbitalElements, daysSinceJ2000: number, out: ResolvedElements): void {
  const c = daysSinceJ2000 / JULIAN_CENTURY_DAYS;
  const r = el.rates;
  out.a = el.a + (r?.a ?? 0) * c;
  out.e = el.e + (r?.e ?? 0) * c;
  out.i = el.i + (r?.i ?? 0) * c;
  out.node = el.node + (r?.node ?? 0) * c;
  out.peri = el.peri + (r?.peri ?? 0) * c;
  out.M0 = el.M0 + (r?.M0 ?? 0) * c + periodicMOffset(el, daysSinceJ2000);
  out.n = el.n;
}

/**
 * Heliocentric position in the ecliptic frame (x toward vernal equinox,
 * y 90° along the ecliptic, z toward ecliptic north), in the same unit
 * as `a` (AU for planets, km for moons).
 *
 * Elements carry angles in **degrees**; internally converted to radians.
 * In-plane (perifocal) coordinates: (a(cosE - e), a√(1-e²) sinE).
 */
export function positionAt(el: OrbitalElements, daysSinceJ2000: number): Vec3 {
  return positionAtInto(el, daysSinceJ2000, { x: 0, y: 0, z: 0 });
}

/**
 * Allocation-free `positionAt`: writes into the caller-owned `out`.
 * Single-threaded render loop shares one scratch per module.
 */
export function positionAtInto(el: OrbitalElements, daysSinceJ2000: number, out: Vec3): Vec3 {
  const e = el.a + (el.rates?.a ?? 0) * (daysSinceJ2000 / JULIAN_CENTURY_DAYS);
  const ee = el.e + (el.rates?.e ?? 0) * (daysSinceJ2000 / JULIAN_CENTURY_DAYS);
  const inc = el.i + (el.rates?.i ?? 0) * (daysSinceJ2000 / JULIAN_CENTURY_DAYS);
  const node = el.node + (el.rates?.node ?? 0) * (daysSinceJ2000 / JULIAN_CENTURY_DAYS);
  const peri = el.peri + (el.rates?.peri ?? 0) * (daysSinceJ2000 / JULIAN_CENTURY_DAYS);
  const M0 = el.M0 + (el.rates?.M0 ?? 0) * (daysSinceJ2000 / JULIAN_CENTURY_DAYS)
    + periodicMOffset(el, daysSinceJ2000);
  return positionAtMeanAnomalyInto(e, ee, inc, node, peri, M0, el.n, daysSinceJ2000, out);
}

/**
 * Position given an explicit mean anomaly M (**radians**) with elements
 * already resolved at the desired epoch. Used for orbit-line sampling.
 */
export function positionAtMeanAnomaly(
  e: ResolvedElements,
  M: number,
): Vec3 {
  return positionAtMeanAnomalyInto(e.a, e.e, e.i, e.node, e.peri, e.M0, e.n, 0, { x: 0, y: 0, z: 0 }, M);
}

/** Core rotation math, allocation-free. `M` optional: default = M0 + n·tDays. */
export function positionAtMeanAnomalyInto(
  a: number, e: number, iDeg: number, nodeDeg: number, periDeg: number,
  M0Deg: number, n: number, daysSinceJ2000: number, out: Vec3,
  MOverride?: number,
): Vec3 {
  const M = MOverride ?? (M0Deg + n * daysSinceJ2000) * DEG;
  const E = solveKepler(M, e);
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const w = periDeg * DEG;
  const O = nodeDeg * DEG;
  const inc = iDeg * DEG;

  const cosO = Math.cos(O), sinO = Math.sin(O);
  const cosw = Math.cos(w), sinw = Math.sin(w);
  const cosi = Math.cos(inc), sini = Math.sin(inc);

  out.x = (cosO * cosw - sinO * sinw * cosi) * xp + (-cosO * sinw - sinO * cosw * cosi) * yp;
  out.y = (sinO * cosw + cosO * sinw * cosi) * xp + (-sinO * sinw + cosO * cosw * cosi) * yp;
  out.z = (sinw * sini) * xp + (cosw * sini) * yp;
  return out;
}

/** Normalize an angle (radians) to [0, 2π). */
export function normalizeRad(rad: number): number {
  const d = rad % (2 * Math.PI);
  return d < 0 ? d + 2 * Math.PI : d;
}

/** Normalize an angle (degrees) to [0, 360). */
export function normalizeDeg(deg: number): number {
  const d = deg % 360;
  return d < 0 ? d + 360 : d;
}

/** Sample a full orbit as points (for drawing orbit lines). */
export function sampleOrbit(el: OrbitalElements, daysSinceJ2000: number, samples = 256): Vec3[] {
  const e = elementsAt(el, daysSinceJ2000);
  const pts: Vec3[] = [];
  for (let k = 0; k <= samples; k++) {
    const M = k * (2 * Math.PI / samples);
    pts.push(positionAtMeanAnomaly(e, M));
  }
  return pts;
}
