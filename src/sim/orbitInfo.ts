/**
 * Orbit readout for the info panel.
 *
 * Pure (no DOM, no three): derives the sidereal period from the mean motion
 * and the current focus distance from `positionAt`, in km regardless of the
 * element unit (AU for planets/dwarfs, km for moons). Unit-tested in
 * `tests/orbitInfo.test.ts`.
 */
import type { BodyDefinition } from './types';
import { AU_KM } from './types';
import { elementsAt, positionAt } from './kepler';

export interface OrbitReadout {
  /** Sidereal orbital period [days] = 360 / |mean motion|. */
  periodDays: number;
  /** Current distance from the focus (Sun, or the parent planet) [km]. */
  distanceKm: number;
  /** Periapsis distance a·(1−e) [km]. */
  perihelionKm: number;
  /** Apoapsis distance a·(1+e) [km]. */
  aphelionKm: number;
}

/**
 * Readout for a body at `daysSinceJ2000`, or null when the body has no orbit
 * (the star) or a degenerate mean motion (n = 0).
 */
export function orbitReadout(
  def: BodyDefinition,
  daysSinceJ2000: number,
): OrbitReadout | null {
  const el = def.elements;
  if (!el) return null;
  const e = elementsAt(el, daysSinceJ2000);
  if (e.n === 0) return null;
  const pos = positionAt(el, daysSinceJ2000);
  const kmPerUnit = def.kind === 'moon' ? 1 : AU_KM;
  return {
    periodDays: 360 / Math.abs(e.n),
    distanceKm: Math.hypot(pos.x, pos.y, pos.z) * kmPerUnit,
    perihelionKm: e.a * (1 - e.e) * kmPerUnit,
    aphelionKm: e.a * (1 + e.e) * kmPerUnit,
  };
}

/** Human-friendly period: hours under 2 d, days up to a year, years above. */
export function formatPeriod(days: number): string {
  if (!Number.isFinite(days) || days <= 0) return '—';
  if (days < 2) return `${(days * 24).toFixed(1)} h`;
  if (days < 365) return `${days.toFixed(1)} d`;
  const yr = days / 365.25;
  const s = yr >= 100 ? yr.toFixed(0) : yr >= 10 ? yr.toFixed(1) : yr.toFixed(2);
  return `${s} yr`;
}

/** Human-friendly distance in km (rounded; M/B above 1e6/1e9). */
export function formatDistanceKm(km: number): string {
  if (!Number.isFinite(km) || km < 0) return '—';
  if (km < 1e6) return `${Math.round(km).toLocaleString('en-US')} km`;
  if (km < 1e8) return `${(km / 1e6).toFixed(1)} M km`;
  return `${(km / 1e9).toFixed(2)} B km`;
}