import { describe, it, expect } from 'vitest';
import { parseKpJson, latestKp, gScale, gScaleLabel, auroraVisual } from '../src/sim/spaceWeather';

describe('spaceWeather — NOAA Kp parsing + aurora mapping (plan 044 B5)', () => {
  describe('parseKpJson', () => {
    it('parses the NOAA array form (oldest→newest)', () => {
      const raw = [
        { time_tag: '2026-09-16T18:00:00', Kp: 2.0, a_running: 8, station_count: 8 },
        { time_tag: '2026-09-16T21:00:00', Kp: 2.67, a_running: 12, station_count: 8 },
      ];
      const out = parseKpJson(raw);
      expect(out).toHaveLength(2);
      expect(out[1].Kp).toBe(2.67);
      expect(out[1].time_tag).toBe('2026-09-16T21:00:00');
    });

    it('drops malformed rows (missing Kp / non-finite / wrong type)', () => {
      const raw = [
        { Kp: 3.0 }, // no time_tag
        { time_tag: 'y' }, // no Kp
        { time_tag: 'z', Kp: 'high' }, // string
        { time_tag: 'w', Kp: NaN }, // non-finite
        { time_tag: 'ok', Kp: 4.5 },
      ];
      const out = parseKpJson(raw);
      expect(out).toHaveLength(1);
      expect(out[0].Kp).toBe(4.5);
    });

    it('returns [] for non-array / empty / null input (never throws)', () => {
      expect(parseKpJson(null)).toEqual([]);
      expect(parseKpJson('nope')).toEqual([]);
      expect(parseKpJson({})).toEqual([]);
      expect(parseKpJson([])).toEqual([]);
    });
  });

  describe('latestKp', () => {
    it('returns the last sample (newest) or null when empty', () => {
      const s = parseKpJson([
        { time_tag: 'a', Kp: 1 },
        { time_tag: 'b', Kp: 2 },
        { time_tag: 'c', Kp: 3 },
      ]);
      expect(latestKp(s)?.Kp).toBe(3);
      expect(latestKp([])).toBeNull();
    });
  });

  describe('gScale', () => {
    it('classifies Kp into the NOAA G-scale', () => {
      expect(gScale(0)).toBe('quiet');
      expect(gScale(4.9)).toBe('quiet');
      expect(gScale(5)).toBe('G1');
      expect(gScale(6.9)).toBe('G1');
      expect(gScale(7)).toBe('G2');
      expect(gScale(7.9)).toBe('G2');
      expect(gScale(8)).toBe('G3');
      expect(gScale(8.9)).toBe('G3');
      expect(gScale(9)).toBe('G4');
    });

    it('labels each scale for the panel', () => {
      expect(gScaleLabel('quiet')).toBe('Quiet');
      expect(gScaleLabel('G1')).toContain('Minor');
      expect(gScaleLabel('G4')).toContain('Severe');
    });
  });

  describe('auroraVisual', () => {
    it('is invisible (intensity 0) below Kp 4', () => {
      expect(auroraVisual(0).intensity).toBe(0);
      expect(auroraVisual(3.9).intensity).toBe(0);
    });

    it('ramps intensity 0.25→1.0 over Kp 4→9', () => {
      expect(auroraVisual(4).intensity).toBeCloseTo(0.25);
      expect(auroraVisual(9).intensity).toBeCloseTo(1.0);
      // monotonic increase
      expect(auroraVisual(6).intensity).toBeGreaterThan(auroraVisual(4).intensity);
      expect(auroraVisual(8).intensity).toBeGreaterThan(auroraVisual(6).intensity);
    });

    it('shifts colour green→red as the storm deepens', () => {
      const calm = auroraVisual(4).color;
      const storm = auroraVisual(9).color;
      // green channel drops, red channel rises
      expect(storm[0]).toBeGreaterThan(calm[0]); // red up
      expect(storm[1]).toBeLessThan(calm[1]); // green down
      // calm aurora is green-dominant
      expect(calm[1]).toBeGreaterThan(calm[0]);
    });

    it('clamps Kp above 9 to the max visual', () => {
      expect(auroraVisual(12).intensity).toBeCloseTo(1.0);
    });
  });
});
