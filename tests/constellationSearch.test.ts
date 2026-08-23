/**
 * Tests for the constellation find-box module (plan 010, S4):
 *
 *  - `constellationMenu()` — all 88 in IAU order, namespaced `const:` ids.
 *  - `searchConstellations(q)` — case-insensitive ranked substring matching:
 *    exact name > prefix > substring, empty query = full menu, no-match = [].
 */
import { describe, it, expect } from 'vitest';
import {
  constellationMenu,
  searchConstellations,
  CONSTELLATION_ID_PREFIX,
} from '../src/data/constellationSearch';
import { CONSTELLATIONS } from '../src/data/constellations';

describe('constellationMenu', () => {
  it('lists all 88 constellations in IAU (data) order', () => {
    const menu = constellationMenu();
    expect(menu.length).toBe(88);
    menu.forEach((e, i) => expect(e.name).toBe(CONSTELLATIONS[i].name));
  });
  it('namespaces every id with the const: prefix and marks the sub label', () => {
    for (const e of constellationMenu()) {
      expect(e.id).toBe(`${CONSTELLATION_ID_PREFIX}${e.name}`);
      expect(e.sub).toBe('constellation');
    }
  });
});

describe('searchConstellations', () => {
  it('empty / blank query returns the full 88-entry menu', () => {
    expect(searchConstellations('').length).toBe(88);
    expect(searchConstellations('   ').length).toBe(88);
  });
  it('is case-insensitive and whitespace-normalizing', () => {
    const exact = searchConstellations('ORION');
    expect(exact.length).toBe(1);
    expect(exact[0].name).toBe('Orion');
    const spaced = searchConstellations('  URSA   major  ');
    expect(spaced.length).toBe(1);
    expect(spaced[0].name).toBe('Ursa Major');
  });
  it('exact match ranks first, then prefix, then substring', () => {
    const hits = searchConstellations('canis');
    // "Canis Major" and "Canis Minor" both start with the query; neither is
    // an exact match. Both must appear and sort alphabetically among ties.
    const names = hits.map((h) => h.name);
    expect(names).toContain('Canis Major');
    expect(names).toContain('Canis Minor');
    expect(names.indexOf('Canis Major')).toBeLessThan(names.indexOf('Canis Minor'));
    const exactFirst = searchConstellations('Orion');
    expect(exactFirst[0].name).toBe('Orion');
  });
  it('prefix beats substring when both match', () => {
    // "sco" is a PREFIX of Scorpius (score 80) and only an interior substring
    // of Microscopium (score 60): the prefix must rank first even though
    // "Microscopium" is alphabetically before "Scorpius" — proving score, not
    // localeCompare, orders the rows.
    const hits = searchConstellations('sco');
    expect(hits.length).toBeGreaterThanOrEqual(2);
    expect(hits[0].name).toBe('Scorpius');
    expect(hits.map((h) => h.name)).toContain('Microscopium');
  });
  it('unknown query matches nothing', () => {
    expect(searchConstellations('zzzznotconstellation')).toEqual([]);
  });
  it('every returned hit keeps a valid namespaced id', () => {
    for (const h of searchConstellations('a')) {
      expect(h.id.startsWith(CONSTELLATION_ID_PREFIX)).toBe(true);
      expect(h.id.slice(CONSTELLATION_ID_PREFIX.length)).toBe(h.name);
    }
  });
});
