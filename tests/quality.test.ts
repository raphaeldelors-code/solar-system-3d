import { describe, it, expect } from 'vitest';
import {
  QUALITY_PROFILES,
  QUALITY_TIERS,
  selectQualityTier,
  scaledBeltCount,
  createFpsWatchdog,
} from '../src/render/quality';
import { BELTS, sampleBelt } from '../src/data/belts';

describe('selectQualityTier (static deviceMemory select)', () => {
  it('undefined deviceMemory (Firefox/Safari) → high (never make a capable device worse)', () => {
    expect(selectQualityTier(undefined)).toBe('high');
  });
  it('≤4 GB → low', () => {
    expect(selectQualityTier(1)).toBe('low');
    expect(selectQualityTier(2)).toBe('low');
    expect(selectQualityTier(4)).toBe('low');
  });
  it('≥8 GB → high', () => {
    expect(selectQualityTier(8)).toBe('high');
    expect(selectQualityTier(16)).toBe('high');
    expect(selectQualityTier(32)).toBe('high');
  });
  it('5–7 GB → medium', () => {
    expect(selectQualityTier(5)).toBe('medium');
    expect(selectQualityTier(6)).toBe('medium');
    expect(selectQualityTier(7)).toBe('medium');
  });
});

describe('QUALITY_PROFILES (monotone degradation)', () => {
  it('high → medium → low strictly degrades each knob', () => {
    const [h, m, l] = QUALITY_TIERS.map((t) => QUALITY_PROFILES[t]);
    expect(h.pixelRatioCap).toBeGreaterThan(m.pixelRatioCap);
    expect(m.pixelRatioCap).toBeGreaterThan(l.pixelRatioCap);
    expect(h.beltCountScale).toBeGreaterThan(m.beltCountScale);
    expect(m.beltCountScale).toBeGreaterThan(l.beltCountScale);
    // shadows + post are on for high/medium, off for low
    expect(h.shadows).toBe(true);
    expect(m.shadows).toBe(true);
    expect(l.shadows).toBe(false);
    expect(h.post).toBe(true);
    expect(m.post).toBe(true);
    expect(l.post).toBe(false);
  });
});

describe('scaledBeltCount (prefix scaling)', () => {
  it('high tier keeps the full count', () => {
    for (const belt of BELTS) {
      expect(scaledBeltCount(belt.count, 'high')).toBe(belt.count);
    }
  });
  it('low tier scales down by the profile factor', () => {
    for (const belt of BELTS) {
      const expected = Math.max(1, Math.round(belt.count * QUALITY_PROFILES.low.beltCountScale));
      expect(scaledBeltCount(belt.count, 'low')).toBe(expected);
    }
  });
  it('a low-tier sample is a strict PREFIX of the high-tier sample (no visual pop)', () => {
    for (const belt of BELTS) {
      const full = sampleBelt(belt);
      const low = sampleBelt(belt, scaledBeltCount(belt.count, 'low'));
      expect(low.length).toBeLessThan(full.length);
      for (let i = 0; i < low.length; i++) {
        expect(low[i].elements.a).toBe(full[i].elements.a);
        expect(low[i].elements.e).toBe(full[i].elements.e);
        expect(low[i].elements.M0).toBe(full[i].elements.M0);
        expect(low[i].size).toBe(full[i].size);
      }
    }
  });
});

describe('createFpsWatchdog (one-shot downgrade)', () => {
  const fast = 8; // ~125 fps
  const slow = 40; // ~25 fps

  it('never fires before the window is full', () => {
    let fired = 0;
    const wd = createFpsWatchdog({
      from: 'high',
      windowSize: 10,
      sustained: 1,
      onDowngrade: () => fired++,
    });
    for (let i = 0; i < 9; i++) expect(wd.sample(slow)).toBeNull();
    expect(fired).toBe(0);
  });

  it('fires exactly once when the rolling average stays slow', () => {
    let fired = 0;
    let to: string | null = null;
    const wd = createFpsWatchdog({
      from: 'high',
      windowSize: 10,
      sustained: 1,
      onDowngrade: (t) => {
        fired++;
        to = t;
      },
    });
    let result: string | null = null;
    for (let i = 0; i < 10; i++) result = wd.sample(slow);
    expect(result).toBe('medium'); // one step down, not to low
    expect(fired).toBe(1);
    expect(to).toBe('medium');
    // further samples never fire again (one-shot)
    for (let i = 0; i < 20; i++) expect(wd.sample(slow)).toBeNull();
    expect(fired).toBe(1);
  });

  it('never fires on a fast frame stream', () => {
    let fired = 0;
    const wd = createFpsWatchdog({
      from: 'high',
      windowSize: 10,
      sustained: 1,
      onDowngrade: () => fired++,
    });
    for (let i = 0; i < 100; i++) expect(wd.sample(fast)).toBeNull();
    expect(fired).toBe(0);
  });

  it('requires `sustained` consecutive slow windows before firing', () => {
    let fired = 0;
    const wd = createFpsWatchdog({
      from: 'high',
      windowSize: 10,
      sustained: 2,
      onDowngrade: () => fired++,
    });
    // 10 slow frames → window full, 1 slow window (not enough for sustained=2)
    for (let i = 0; i < 10; i++) wd.sample(slow);
    expect(fired).toBe(0);
    // 10 more slow frames → 2 consecutive slow windows → fires
    for (let i = 0; i < 10; i++) wd.sample(slow);
    expect(fired).toBe(1);
  });

  it('a fast window breaks the sustained streak (no fire until `sustained` slow windows in a row)', () => {
    let fired = 0;
    // Small window (2) so a fast run fully flushes it before the streak can
    // reach `sustained` (3): the rolling window evaluates every frame once full,
    // so the flush must land within (sustained-1) frames to avoid firing.
    const wd = createFpsWatchdog({
      from: 'high',
      windowSize: 2,
      sustained: 3,
      onDowngrade: () => fired++,
    });
    // 2 slow → window full, streak 1 (not enough for sustained=3)
    wd.sample(slow);
    wd.sample(slow);
    expect(fired).toBe(0);
    // 2 fast → window flushes to fast (avg < 33) → streak resets to 0
    wd.sample(fast);
    wd.sample(fast);
    // 2 slow → window goes slow again, streak 1 (still not enough)
    wd.sample(slow);
    wd.sample(slow);
    expect(fired).toBe(0);
    // 2 more slow → streak 3 → fires
    wd.sample(slow);
    wd.sample(slow);
    expect(fired).toBe(1);
  });

  it('low tier has no tier below it → nextTier is null and it never fires', () => {
    let fired = 0;
    const wd = createFpsWatchdog({
      from: 'low',
      windowSize: 5,
      sustained: 1,
      onDowngrade: () => fired++,
    });
    expect(wd.nextTier).toBeNull();
    for (let i = 0; i < 20; i++) expect(wd.sample(slow)).toBeNull();
    expect(fired).toBe(0);
  });
});
