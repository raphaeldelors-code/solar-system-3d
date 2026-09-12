import { describe, it, expect } from 'vitest';
import { bodyFacts, formatDayLength, FUN_FACTS } from '../src/render/bodyFacts';
import {
  INTRO_LEGS,
  INTRO_DURATION,
  TITLE_FADE_IN_START,
  TITLE_FADE_IN_END,
  TITLE_FADE_OUT_START,
  TITLE_FADE_OUT_END,
  introShouldPlay,
  titleOpacity,
} from '../src/render/intro';
import {
  COMMANDS,
  commandForKey,
  digitToPlanet,
  paletteEntries,
  jumpEntries,
} from '../src/render/commands';
import type { BodyDefinition } from '../src/sim/types';

// ---- bodyFacts -------------------------------------------------------------

const earth: BodyDefinition = {
  id: 'earth',
  name: 'Earth',
  kind: 'planet',
  parent: 'sun',
  radiusKm: 6371,
  rotationHours: 23.934,
  tiltDeg: 23.44,
  color: [0.2, 0.3, 0.6],
  elements: { a: 1, e: 0, i: 0, node: 0, peri: 0, M0: 0, n: 0.9856 },
};

describe('bodyFacts', () => {
  it('returns radius, day, tilt rows and a fun fact for Earth', () => {
    const rows = bodyFacts(earth);
    const labels = rows.map((r) => r.label);
    expect(labels).toEqual(['Radius', 'Day length', 'Axial tilt', 'Fun fact']);
    expect(rows[0].value).toContain('km');
    expect(rows[2].value).toBe('23°');
    expect(rows[3].value).toBe(FUN_FACTS.earth);
  });

  it('omits the fun-fact row when none exists', () => {
    const rows = bodyFacts({ ...earth, id: 'xanadu' });
    expect(rows.map((r) => r.label)).toEqual(['Radius', 'Day length', 'Axial tilt']);
  });

  it('tags retrograde rotation and shows the magnitude', () => {
    expect(formatDayLength(-5832.5)).toBe('243.0 d (retrograde)');
    expect(formatDayLength(23.9)).toBe('23.9 h');
    expect(formatDayLength(0)).toBe('—');
  });
});

// ---- intro -----------------------------------------------------------------

describe('intro', () => {
  it('totals a duration of ~5.8 s (≤ 6 s)', () => {
    expect(INTRO_DURATION).toBeCloseTo(5.8, 2);
    expect(INTRO_DURATION).toBeLessThan(6);
  });

  it('ends on Earth', () => {
    expect(INTRO_LEGS[INTRO_LEGS.length - 1].bodyId).toBe('earth');
  });

  it('respects reduced-motion, ?intro=0, and a pinned URL', () => {
    expect(introShouldPlay(true, null, false)).toBe(false);
    expect(introShouldPlay(false, '0', false)).toBe(false);
    expect(introShouldPlay(false, null, true)).toBe(false);
    expect(introShouldPlay(false, null, false)).toBe(true);
    expect(introShouldPlay(false, '1', false)).toBe(true);
  });

  it('fades the title in then out, clamped to [0,1]', () => {
    expect(titleOpacity(0)).toBe(0);
    expect(titleOpacity(TITLE_FADE_IN_START)).toBe(0);
    expect(titleOpacity(TITLE_FADE_IN_END)).toBe(1);
    expect(titleOpacity((TITLE_FADE_IN_END + TITLE_FADE_OUT_START) / 2)).toBe(1);
    expect(titleOpacity(TITLE_FADE_OUT_END)).toBe(0);
    expect(titleOpacity(INTRO_DURATION)).toBe(0);
    // mid-fade-in is a value strictly between 0 and 1
    expect(titleOpacity((TITLE_FADE_IN_START + TITLE_FADE_IN_END) / 2)).toBeGreaterThan(0);
    expect(titleOpacity((TITLE_FADE_IN_START + TITLE_FADE_IN_END) / 2)).toBeLessThan(1);
  });
});

// ---- commands --------------------------------------------------------------

describe('commands', () => {
  it('every command has a unique id and a non-empty label/group', () => {
    const ids = new Set(COMMANDS.map((c) => c.id));
    expect(ids.size).toBe(COMMANDS.length);
    for (const c of COMMANDS) {
      expect(c.label.length).toBeGreaterThan(0);
      expect(c.group).toBeTruthy();
    }
  });

  it('resolves letter keys case-insensitively', () => {
    expect(commandForKey('o')).toBe('orbits');
    expect(commandForKey('O')).toBe('orbits');
    expect(commandForKey('a')).toBe('atmospheres');
    expect(commandForKey('p')).toBe('post');
  });

  it('resolves named keys (Space, Escape, arrows)', () => {
    expect(commandForKey('Space')).toBe('pause');
    expect(commandForKey('Escape')).toBe('release');
    expect(commandForKey('ArrowUp')).toBe('speed-up');
    expect(commandForKey('ArrowDown')).toBe('speed-down');
  });

  it('maps digits to jump commands', () => {
    expect(commandForKey('1')).toBe('jump-digit-1');
    expect(commandForKey('8')).toBe('jump-digit-8');
    expect(commandForKey('0')).toBe('jump-digit-0');
  });

  it('returns null for keys with no command', () => {
    expect(commandForKey('q')).toBeNull();
    expect(commandForKey('Tab')).toBeNull();
  });

  it('digitToPlanet maps 1->first planet, 0->sun, out-of-range->null', () => {
    const planets = [{ id: 'mercury' }, { id: 'venus' }, { id: 'earth' }];
    expect(digitToPlanet('1', planets, 'sun')).toBe('mercury');
    expect(digitToPlanet('3', planets, 'sun')).toBe('earth');
    expect(digitToPlanet('0', planets, 'sun')).toBe('sun');
    expect(digitToPlanet('9', planets, 'sun')).toBeNull();
  });

  it('palette entries include every command + one jump entry per planet', () => {
    const planets = [
      { id: 'mercury', name: 'Mercury' },
      { id: 'earth', name: 'Earth' },
    ];
    const entries = paletteEntries(planets);
    expect(entries.length).toBe(COMMANDS.length + planets.length);
    const jump = entries.filter((e) => e.id.startsWith('jump-'));
    expect(jump).toHaveLength(2);
    expect(jump[0].label).toBe('Go to Mercury');
  });

  it('jumpEntries builds "Go to <name>" labels', () => {
    const j = jumpEntries([{ id: 'saturn', name: 'Saturn' }]);
    expect(j[0].id).toBe('jump-saturn');
    expect(j[0].label).toBe('Go to Saturn');
  });
});
