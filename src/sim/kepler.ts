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

/** Elements at a given time (applies optional secular rates). */
export function elementsAt(
  el: OrbitalElements,
  daysSinceJ2000: number,
): Required<Omit<OrbitalElements, 'rates'>> {
  const c = daysSinceJ2000 / JULIAN_CENTURY_DAYS;
  const r = el.rates;
  return {
    a: el.a + (r?.a ?? 0) * c,
    e: el.e + (r?.e ?? 0) * c,
    i: el.i + (r?.i ?? 0) * c,
    node: el.node + (r?.node ?? 0) * c,
    peri: el.peri + (r?.peri ?? 0) * c,
    M0: el.M0 + (r?.M0 ?? 0) * c,
    n: el.n,
  };
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
  const e = elementsAt(el, daysSinceJ2000);
  const M = (e.M0 + e.n * daysSinceJ2000) * DEG;
  return positionAtMeanAnomaly(e, M);
}

/**
 * Position given an explicit mean anomaly M (**radians**) with elements
 * already resolved at the desired epoch. Used for orbit-line sampling.
 */
export function positionAtMeanAnomaly(
  e: Required<Omit<OrbitalElements, 'rates'>>,
  M: number,
): Vec3 {
  const E = solveKepler(M, e.e);
  const xp = e.a * (Math.cos(E) - e.e);
  const yp = e.a * Math.sqrt(1 - e.e * e.e) * Math.sin(E);

  const w = e.peri * DEG;
  const O = e.node * DEG;
  const inc = e.i * DEG;

  const cosO = Math.cos(O), sinO = Math.sin(O);
  const cosw = Math.cos(w), sinw = Math.sin(w);
  const cosi = Math.cos(inc), sini = Math.sin(inc);

  return {
    x: (cosO * cosw - sinO * sinw * cosi) * xp + (-cosO * sinw - sinO * cosw * cosi) * yp,
    y: (sinO * cosw + cosO * sinw * cosi) * xp + (-sinO * sinw + cosO * cosw * cosi) * yp,
    z: (sinw * sini) * xp + (cosw * sini) * yp,
  };
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
