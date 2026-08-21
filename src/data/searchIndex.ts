/**
 * Body search index (pure — no DOM, no three).
 *
 * Backs the panel's "Find a body" combobox: an alias-aware, case-insensitive
 * substring matcher over the single data table (`ALL_BODIES`) plus a grouped
 * menu model (sun → planets → their moons, then dwarf planets) so the
 * dropdown reads as a hierarchy instead of a flat 36-row list.
 *
 * "Aliases" are threefold: the body's own name, its kind label
 * ("planet", "moon", …), and its parent's name — so "moon of mars" or just
 * "mars" both land on Phobos/Deimos. A small `ALIASES` table adds colloquial
 * names (e.g. "luna" for the Moon) on top of that.
 */
import type { BodyDefinition } from '../sim/types';

export interface SearchHit {
  id: string;
  name: string;
  kind: BodyDefinition['kind'];
  /** Parent body's display name (moons only) — shown as the row's context. */
  parentName?: string;
}

export interface SearchEntry {
  id: string;
  name: string;
  kind: BodyDefinition['kind'];
  parentName?: string;
  /** One line under the name in the dropdown, e.g. "moon of Earth". */
  sub: string;
}

/** Colloquial / alternate names, keyed by body id. */
const ALIASES: Record<string, string[]> = {
  sun: ['solar', 'star'],
  moon: ['luna', 'earth moon', 'the moon'],
  mercury: ['mercury'],
  venus: ['venus', 'morning star'],
  earth: ['earth', 'world'],
  mars: ['mars'],
  jupiter: ['jupiter'],
  saturn: ['saturn'],
  uranus: ['uranus'],
  neptune: ['neptune'],
  pluto: ['pluto'],
  ceres: ['ceres'],
  eris: ['eris'],
  haumea: ['haumea'],
  makemake: ['makemake'],
};

/**
 * The flat menu in display order: Sun, then each planet (in `bodies` order)
 * followed immediately by its moons, then the dwarf planets. Mirrors the
 * ordering the old native `<select>` used to present, just grouped.
 */
export function groupedBodyMenu(bodies: readonly BodyDefinition[]): SearchEntry[] {
  const out: SearchEntry[] = [];
  const used = new Set<string>();
  const name = (b: BodyDefinition): string => b.name;
  for (const b of bodies) {
    if (b.kind === 'moon') continue; // emitted under its parent below
    if (b.kind === 'star') {
      out.push({ id: b.id, name: name(b), kind: b.kind, sub: 'the star' });
      used.add(b.id);
      continue;
    }
    if (b.kind === 'dwarf') continue; // after the planets
    out.push({
      id: b.id,
      name: name(b),
      kind: b.kind,
      sub: 'planet',
    });
    used.add(b.id);
    for (const m of bodies) {
      if (m.kind !== 'moon' || m.parent !== b.id) continue;
      out.push({
        id: m.id,
        name: name(m),
        kind: 'moon',
        parentName: name(b),
        sub: `moon of ${name(b)}`,
      });
      used.add(m.id);
    }
  }
  for (const b of bodies) {
    if (b.kind === 'dwarf' && !used.has(b.id)) {
      out.push({ id: b.id, name: name(b), kind: b.kind, parentName: 'sun', sub: 'dwarf planet' });
      used.add(b.id);
    }
  }
  return out;
}

const norm = (s: string): string => s.toLowerCase().trim().replace(/\s+/g, ' ');

function haystacks(id: string, entry: SearchEntry, parentName?: string): string[] {
  const hs = new Set<string>();
  hs.add(norm(entry.name));
  hs.add(norm(entry.kind));
  for (const a of ALIASES[id] ?? []) hs.add(norm(a));
  if (parentName) {
    hs.add(norm(parentName));
    hs.add(norm(`${entry.kind} of ${parentName}`));
    hs.add(norm(`${parentName} ${entry.kind}`));
  }
  return [...hs];
}

/**
 * Rank one candidate body against the query: -1 = no match. Higher is better:
 * exact name > name-prefix > name-substring > alias-substring, then parent
 * context, then shorter names break ties (so "moon" beats "phobos").
 */
function score(id: string, entry: SearchEntry, q: string, parentName?: string): number {
  const hs = haystacks(id, entry, parentName);
  let s = -1;
  if (q === norm(entry.name)) s = 100;
  else if (norm(entry.name).startsWith(q)) s = 80;
  else if (norm(entry.name).includes(q)) s = 60;
  else {
    for (const h of hs)
      if (h.includes(q)) {
        s = h === q ? 70 : 40;
        break;
      }
    if (s < 0) return -1;
  }
  if (parentName && norm(parentName).includes(q)) s += 10;
  s -= norm(entry.name).length / 4;
  return s;
}

/**
 * Case-insensitive substring search over `bodies`, best match first.
 * Empty/blank query returns every body in `groupedBodyMenu` order (the
 * unfiltered dropdown); unknown bodies simply never match.
 */
export function searchBodies(bodies: readonly BodyDefinition[], query: string): SearchHit[] {
  const q = norm(query);
  const menu = groupedBodyMenu(bodies);
  if (!q) {
    return menu.map((e) => ({
      id: e.id,
      name: e.name,
      kind: e.kind,
      parentName: e.parentName,
    }));
  }
  const hits = menu
    .map((e) => ({ e, s: score(e.id, e, q, e.parentName) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s || a.e.name.localeCompare(b.e.name))
    .map((x) => ({
      id: x.e.id,
      name: x.e.name,
      kind: x.e.kind,
      parentName: x.e.parentName,
    }));
  return hits;
}
