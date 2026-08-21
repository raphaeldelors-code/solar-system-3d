import { describe, it, expect } from 'vitest';
import { ALL_BODIES } from '../src/data/bodies';
import { searchBodies, groupedBodyMenu } from '../src/data/searchIndex';

describe('searchBodies', () => {
  it('returns every body in menu order for an empty query', () => {
    const all = searchBodies(ALL_BODIES, '');
    expect(all.length).toBe(ALL_BODIES.length);
    expect(all[0].id).toBe('sun');
    expect(all.map((h) => h.id)).toContain('moon');
  });

  it('matches by name, case-insensitive, exact first', () => {
    const hits = searchBodies(ALL_BODIES, 'mars');
    expect(hits[0].id).toBe('mars');
    const lower = searchBodies(ALL_BODIES, 'MARS');
    expect(lower[0].id).toBe('mars');
  });

  it('matches by name substring and prefix', () => {
    expect(searchBodies(ALL_BODIES, 'ganym')[0].id).toBe('ganymede');
    expect(searchBodies(ALL_BODIES, 'io').map((h) => h.id)).toContain('io');
  });

  it('matches moons via parent-name context ("moon of mars")', () => {
    const hits = searchBodies(ALL_BODIES, 'moon of mars');
    expect(hits.length).toBe(2);
    expect(hits.map((h) => h.id).sort()).toEqual(['deimos', 'phobos']);
    for (const h of hits) expect(h.parentName).toBe('Mars');
  });

  it('matches the bare parent name and ranks the planet above its moons', () => {
    const hits = searchBodies(ALL_BODIES, 'mars');
    expect(hits[0].id).toBe('mars');
    const ids = hits.map((h) => h.id);
    expect(ids).toContain('phobos');
    expect(ids).toContain('deimos');
  });

  it('matches kind words ("moon" lists satellites)', () => {
    const moons = searchBodies(ALL_BODIES, 'moon');
    expect(moons.length).toBe(22); // the Moon + 21 satellites
    expect(moons.map((h) => h.id)).toContain('moon');
  });

  it('matches aliases ("luna" → the Moon, "world" → Earth)', () => {
    expect(searchBodies(ALL_BODIES, 'luna')[0].id).toBe('moon');
    expect(searchBodies(ALL_BODIES, 'world')[0].id).toBe('earth');
  });

  it('returns no hits for nonsense', () => {
    expect(searchBodies(ALL_BODIES, 'zzzzz')).toEqual([]);
  });

  it('normalizes whitespace and punctuation-like typos', () => {
    expect(searchBodies(ALL_BODIES, '  Io  ')).toEqual(searchBodies(ALL_BODIES, 'io'));
  });
});

describe('groupedBodyMenu', () => {
  it('orders sun, then planet → its moons, then dwarf planets', () => {
    const menu = groupedBodyMenu(ALL_BODIES);
    expect(menu.length).toBe(ALL_BODIES.length);
    const ids = menu.map((e) => e.id);
    expect(ids[0]).toBe('sun');
    // every moon appears immediately after its planet's block (not in a tail)
    const moonIdx = ids.indexOf('moon');
    const earthIdx = ids.indexOf('earth');
    expect(moonIdx - earthIdx).toBe(1);
    // moons are contiguous with their planet, dwarfs close the list
    const jup = ids.indexOf('jupiter');
    for (const m of ['io', 'europa', 'ganymede', 'callisto', 'amalthea', 'himalia']) {
      expect(ids.indexOf(m)).toBeGreaterThan(jup);
      expect(ids.indexOf(m)).toBeLessThan(ids.indexOf('saturn'));
    }
    for (const d of ['pluto', 'ceres', 'eris', 'haumea', 'makemake']) {
      expect(ids.indexOf(d)).toBeGreaterThan(ids.indexOf('neptune'));
    }
  });

  it('labels moons with their parent context line', () => {
    const menu = groupedBodyMenu(ALL_BODIES);
    const titan = menu.find((e) => e.id === 'titan')!;
    expect(titan.parentName).toBe('Saturn');
    expect(titan.sub).toBe('moon of Saturn');
    const sun = menu.find((e) => e.id === 'sun')!;
    expect(sun.sub).toBe('the star');
  });

  it('covers every body exactly once', () => {
    const ids = groupedBodyMenu(ALL_BODIES).map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.sort()).toEqual(ALL_BODIES.map((b) => b.id).sort());
  });
});
