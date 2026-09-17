import { describe, it, expect } from 'vitest';
import { bodyFacts, formatDayLength, FUN_FACTS } from '../src/render/bodyFacts';
import {
  INTRO_LEGS,
  INTRO_DURATION,
  INTRO_TAIL_DURATION,
  TITLE_FADE_IN_START,
  TITLE_FADE_IN_END,
  introShouldPlay,
  titleOpacity,
  introTailSpeed,
  introTailGlow,
} from '../src/render/intro';
import { cineEase } from '../src/render/cameraFlight';
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

  it('respects reduced-motion, ?intro=0, a pinned URL, and a prior intro', () => {
    expect(introShouldPlay(true, null, false, false)).toBe(false);
    expect(introShouldPlay(false, '0', false, false)).toBe(false);
    expect(introShouldPlay(false, null, true, false)).toBe(false);
    // already played in this session (sessionStorage seen-flag) — no replay
    expect(introShouldPlay(false, null, false, true)).toBe(false);
    expect(introShouldPlay(false, '1', false, true)).toBe(false);
    expect(introShouldPlay(false, null, false, false)).toBe(true);
    expect(introShouldPlay(false, '1', false, false)).toBe(true);
  });

  it('fades the title in then out (spanning the A6 tail), clamped to [0,1]', () => {
    const total = INTRO_DURATION + INTRO_TAIL_DURATION;
    expect(titleOpacity(0)).toBe(0);
    expect(titleOpacity(TITLE_FADE_IN_START)).toBe(0);
    expect(titleOpacity(TITLE_FADE_IN_END)).toBe(1);
    // mid-intro (well before the tail) is fully opaque
    expect(titleOpacity(INTRO_DURATION * 0.5)).toBe(1);
    // the title is still up at the start of the tail, then fades out over the
    // last ~1.6 s of the whole intro (legs + tail)
    expect(titleOpacity(INTRO_DURATION)).toBeGreaterThan(0);
    expect(titleOpacity(total)).toBe(0);
    expect(titleOpacity(total + 5)).toBe(0);
    // mid-fade-in is a value strictly between 0 and 1
    expect(titleOpacity((TITLE_FADE_IN_START + TITLE_FADE_IN_END) / 2)).toBeGreaterThan(0);
    expect(titleOpacity((TITLE_FADE_IN_START + TITLE_FADE_IN_END) / 2)).toBeLessThan(1);
  });

  it('cineEase is a smooth quintic in/out (0→1, symmetric, gentler than cubic)', () => {
    expect(cineEase(0)).toBe(0);
    expect(cineEase(1)).toBe(1);
    expect(cineEase(0.5)).toBeCloseTo(0.5, 5);
    // clamped outside [0,1]
    expect(cineEase(-1)).toBe(0);
    expect(cineEase(2)).toBe(1);
    // quintic is "flatter" at the ends than the cubic: at x=0.25 the quintic
    // has barely moved (slow start) while the cubic has moved more.
    expect(cineEase(0.25)).toBeLessThan(0.1);
    expect(cineEase(0.75)).toBeGreaterThan(0.9);
  });

  it('introTailSpeed eases from the start speed to the target over the tail', () => {
    expect(introTailSpeed(0, 0, 1.5)).toBeCloseTo(0, 5);
    expect(introTailSpeed(INTRO_TAIL_DURATION, 0, 1.5)).toBeCloseTo(1.5, 5);
    // monotonic increasing from 0 → 1.5
    let prev = -Infinity;
    for (let i = 0; i <= 10; i++) {
      const v = introTailSpeed((i / 10) * INTRO_TAIL_DURATION, 0, 1.5);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
    // clamped at the ends (negative / over-long times)
    expect(introTailSpeed(-1, 0, 1.5)).toBeCloseTo(0, 5);
    expect(introTailSpeed(INTRO_TAIL_DURATION + 5, 0, 1.5)).toBeCloseTo(1.5, 5);
    // a ramp DOWN (tail starts faster than the target) is monotonic decreasing
    expect(introTailSpeed(0, 2, 1)).toBeCloseTo(2, 5);
    expect(introTailSpeed(INTRO_TAIL_DURATION, 2, 1)).toBeCloseTo(1, 5);
  });

  it('introTailGlow ramps 0→1→0 over the tail (lights up, holds, settles)', () => {
    expect(introTailGlow(0)).toBe(0);
    expect(introTailGlow(INTRO_TAIL_DURATION)).toBe(0);
    // peaks at 1 during the hold (the middle of the tail)
    expect(introTailGlow(INTRO_TAIL_DURATION * 0.5)).toBeCloseTo(1, 5);
    // monotonic up to the peak, then down
    let prev = -Infinity;
    for (let i = 0; i <= 20; i++) {
      const t = (i / 20) * INTRO_TAIL_DURATION;
      const v = introTailGlow(t);
      if (t <= INTRO_TAIL_DURATION * 0.4) expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
    // clamped at the ends
    expect(introTailGlow(-1)).toBe(0);
    expect(introTailGlow(INTRO_TAIL_DURATION + 5)).toBe(0);
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

  it('resolves the time-scrub keys (, and .) — plan 044 C4', () => {
    expect(commandForKey(',')).toBe('time-step-back');
    expect(commandForKey('.')).toBe('time-step-fwd');
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
