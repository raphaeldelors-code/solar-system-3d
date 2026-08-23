/**
 * Constellation search index (pure — no DOM, no three).
 *
 * Plan 010 (S4): the panel's "Find" combobox lists all 88 IAU
 * constellations alongside the bodies. This module owns the constellation
 * side of that dropdown: a display-order menu and a ranked,
 * case-insensitive substring matcher with the same scoring shape as
 * `searchIndex.ts` (exact name > prefix > substring, shorter names break
 * ties) so the two row kinds read consistently in one dropdown.
 *
 * A constellation's id is namespaced `const:<Name>` so `findPick` can tell
 * the two kinds apart without consulting either table.
 */
import { CONSTELLATIONS, type Constellation } from './constellations';

export interface ConstellationHit {
  /** Namespaced id: `const:` + the constellation's display name. */
  id: string;
  name: string;
  /** One line under the name in the dropdown. */
  sub: string;
}

/** Prefix that marks a find row as a constellation (vs a body id). */
export const CONSTELLATION_ID_PREFIX = 'const:';

export function constellationId(c: Constellation): string {
  return `${CONSTELLATION_ID_PREFIX}${c.name}`;
}

/** Display-order menu: all 88 in `CONSTELLATIONS` (IAU) order. */
export function constellationMenu(): ConstellationHit[] {
  return CONSTELLATIONS.map((c) => ({
    id: constellationId(c),
    name: c.name,
    sub: 'constellation',
  }));
}

const norm = (s: string): string => s.toLowerCase().trim().replace(/\s+/g, ' ');

/**
 * Rank one candidate against the query: -1 = no match. Same shape as
 * `searchIndex.score`: exact name > name-prefix > name-substring, then
 * shorter names break ties. A constellation's name is its only key (no
 * aliases / parents).
 */
function score(name: string, q: string): number {
  const n = norm(name);
  if (n === q) return 100;
  if (n.startsWith(q)) return 80;
  if (n.includes(q)) return 60;
  return -1;
}

/**
 * Case-insensitive substring search over the 88 constellations, best match
 * first. Empty/blank query returns the full `constellationMenu` (the
 * unfiltered dropdown); unknown queries match nothing.
 */
export function searchConstellations(query: string): ConstellationHit[] {
  const q = norm(query);
  const menu = constellationMenu();
  if (!q) return menu;
  return menu
    .map((e) => ({ e, s: score(e.name, q) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s || a.e.name.localeCompare(b.e.name))
    .map((x) => x.e);
}
