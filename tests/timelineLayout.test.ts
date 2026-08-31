import { describe, it, expect } from 'vitest';
import {
  eventEmoji,
  timelineLayout,
  BODY_EMOJI,
  EVENT_EMOJI,
  TIMELINE_MARKER_CAP,
  type TimelineEventLike,
} from '../src/render/scrubMath';

// A fixed 2025 span (J2000-referenced) for deterministic layout math.
// J2000 = 2000-01-01T12:00Z; 2025-01-01T00:00Z is 9132 days later.
const SPAN0 = (Date.UTC(2025, 0, 1) - Date.UTC(2000, 0, 1, 12)) / 86_400_000;
const SPAN_LEN = 365; // 2025 is not a leap year

describe('eventEmoji', () => {
  it('uses fixed glyphs for eclipses and Saturn edge-on', () => {
    expect(eventEmoji({ type: 'solar-eclipse', tDays: 0, title: '' })).toBe(
      EVENT_EMOJI['solar-eclipse'],
    );
    expect(eventEmoji({ type: 'lunar-eclipse', tDays: 0, title: '' })).toBe('🌕');
    expect(eventEmoji({ type: 'saturn-edge-on', tDays: 0, title: '' })).toBe('🪐');
  });

  it('transit / opposition use the recognizable body emoji (plan 024 F2)', () => {
    expect(eventEmoji({ type: 'transit', tDays: 0, title: '', bodyId: 'mercury' })).toBe(
      BODY_EMOJI.mercury,
    ); // ⚪
    expect(eventEmoji({ type: 'transit', tDays: 0, title: '', bodyId: 'venus' })).toBe('💛');
    expect(eventEmoji({ type: 'opposition', tDays: 0, title: '', bodyId: 'jupiter' })).toBe('🟠');
    // Moon/Sun ids resolve too (they used to fall through to the fallback).
    expect(eventEmoji({ type: 'transit', tDays: 0, title: '', bodyId: 'moon' })).toBe('🌙');
    expect(eventEmoji({ type: 'opposition', tDays: 0, title: '', bodyId: 'sun' })).toBe('☀️');
  });

  it('conjunction concatenates both bodies emojis (order = bodyId, bodyId2)', () => {
    expect(
      eventEmoji({ type: 'conjunction', tDays: 0, title: '', bodyId: 'mercury', bodyId2: 'venus' }),
    ).toBe('⚪💛');
    expect(
      eventEmoji({ type: 'conjunction', tDays: 0, title: '', bodyId: 'mars', bodyId2: 'jupiter' }),
    ).toBe('🔴🟠');
  });

  it('falls back to a neutral glyph when the body id is unknown', () => {
    expect(eventEmoji({ type: 'transit', tDays: 0, title: '' })).toBe('●');
    expect(eventEmoji({ type: 'opposition', tDays: 0, title: '', bodyId: 'pluto' })).toBe('●');
  });
});

describe('timelineLayout', () => {
  const ev = (frac: number, extra?: Partial<TimelineEventLike>): TimelineEventLike => ({
    type: 'opposition',
    tDays: SPAN0 + frac * SPAN_LEN,
    title: `ev@${frac}`,
    bodyId: 'mars',
    ...extra,
  });

  it('maps tDays to a day-of-year fraction across the full range', () => {
    const r = timelineLayout(SPAN0, SPAN_LEN, [ev(0), ev(0.5), ev(1)], SPAN0);
    expect(r.markers.map((m) => m.frac)).toEqual([0, 0.5, 1]);
  });

  it('drops events outside the year', () => {
    const r = timelineLayout(SPAN0, SPAN_LEN, [ev(-0.02), ev(0.3), ev(1.05)], SPAN0);
    expect(r.markers.map((m) => m.frac)).toEqual([0.3]);
  });

  it('clamps the caret to [0,1] and reports the current day-of-year', () => {
    expect(timelineLayout(SPAN0, SPAN_LEN, [], SPAN0 - 50).caretFrac).toBe(0);
    expect(timelineLayout(SPAN0, SPAN_LEN, [], SPAN0 + SPAN_LEN + 50).caretFrac).toBe(1);
    expect(timelineLayout(SPAN0, SPAN_LEN, [], SPAN0 + 0.25 * SPAN_LEN).caretFrac).toBeCloseTo(
      0.25,
      9,
    );
  });

  it('sorts markers by position (input order is irrelevant)', () => {
    const r = timelineLayout(SPAN0, SPAN_LEN, [ev(0.9), ev(0.1), ev(0.5)], SPAN0);
    expect(r.markers.map((m) => m.frac)).toEqual([0.1, 0.5, 0.9]);
  });

  it('caps markers at TIMELINE_MARKER_CAP and reports overflow', () => {
    const events = Array.from({ length: TIMELINE_MARKER_CAP + 7 }, (_, i) =>
      ev(i / (TIMELINE_MARKER_CAP + 7)),
    );
    const r = timelineLayout(SPAN0, SPAN_LEN, events, SPAN0);
    expect(r.markers.length).toBe(TIMELINE_MARKER_CAP);
    expect(r.overflow).toBe(7);
  });

  it('handles a 366-day (leap) year span', () => {
    const leap0 = (Date.UTC(2024, 0, 1) - Date.UTC(2000, 0, 1, 12)) / 86_400_000;
    const r = timelineLayout(leap0, 366, [], leap0 + 183);
    expect(r.caretFrac).toBeCloseTo(183 / 366, 9);
  });
});
