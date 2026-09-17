/**
 * Plan 035 F5 — real "facts" for the body info card (display only).
 *
 * The existing panel card already shows the LIVE orbital readout (period /
 * distance / peri-apo) from the sim. F5 adds a small block of STATIC, real
 * physical facts a curious viewer would want — radius, day length, axial tilt,
 * and one fun fact — sourced from the existing `BodyDefinition` (no new sim
 * math; this module only formats numbers already in the data model).
 *
 * Kept pure + dependency-free so the formatting (and the fun-fact copy) is
 * unit-testable without a THREE scene.
 */
import type { BodyDefinition } from '../sim/types';
import { formatDistanceKm } from '../sim/orbitInfo';

/** One label/value pair rendered as an info-card row. */
export interface FactRow {
  label: string;
  value: string;
}

/**
 * One-line "fun fact" per body. Intentionally short and widely-verified; bodies
 * without an entry simply omit the row (the card must never show a blank).
 * Copy is factual and conservative — no disputed numbers.
 */
export const FUN_FACTS: Record<string, string> = {
  sun: 'The Sun holds 99.86% of the Solar System’s mass.',
  mercury: 'A Mercury year is just 88 days, yet one of its days lasts 176 Earth days.',
  venus: 'Venus spins backwards, so there the Sun rises in the west.',
  earth: 'The only known world with liquid-water oceans on its surface.',
  mars: 'Home to Olympus Mons, the tallest volcano in the Solar System.',
  jupiter: 'The Great Red Spot is a storm wider than Earth, raging for centuries.',
  saturn: 'Its rings are mostly water ice, yet the system is barely 1 km thick in places.',
  uranus: 'Uranus rolls around the Sun on its side — tilted about 98°.',
  neptune: 'Winds here reach ~2,100 km/h, the fastest in the Solar System.',
  moon: 'The Moon drifts away from Earth by about 3.8 cm each year.',
  pluto: 'Pluto’s bright heart is Sputnik Planitia, a nitrogen-ice plain.',
};

/**
 * Format a rotation period (hours) as a day length. A negative value is
 * retrograde — the magnitude is shown with a "(retrograde)" tag so a Venus
 * day (≈243 d) reads correctly without a confusing negative.
 */
export function formatDayLength(hours: number | null): string {
  if (hours === null || !Number.isFinite(hours) || hours === 0) return '—';
  const retro = hours < 0;
  const h = Math.abs(hours);
  const s = h < 48 ? `${h.toFixed(1)} h` : `${(h / 24).toFixed(1)} d`;
  return retro ? `${s} (retrograde)` : s;
}

/**
 * The static fact rows for a body, in display order. Always returns the
 * radius/day/tilt rows (they come straight from the definition) and the fun
 * fact only when one exists — so the card never shows an empty "Fun fact" row.
 */
export function bodyFacts(def: BodyDefinition): FactRow[] {
  const rows: FactRow[] = [
    { label: 'Radius', value: formatDistanceKm(def.radiusKm) },
    { label: 'Day length', value: formatDayLength(def.rotationHours) },
    { label: 'Axial tilt', value: `${def.tiltDeg.toFixed(0)}°` },
  ];
  const fact = FUN_FACTS[def.id];
  if (fact) rows.push({ label: 'Fun fact', value: fact });
  return rows;
}
