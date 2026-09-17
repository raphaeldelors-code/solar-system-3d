import { describe, it, expect } from 'vitest';
import {
  ONBOARD_STEPS,
  ONBOARD_KEY,
  shouldShowOnboarding,
  markOnboarded,
} from '../src/sim/onboarding';

/** In-memory Storage stub (localStorage is unavailable in the node env). */
function memStorage(init: Record<string, string> = {}) {
  let map = new Map(Object.entries(init));
  return {
    getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
    setItem: (k: string, v: string) => void map.set(k, v),
  };
}

describe('onboarding step data', () => {
  it('has exactly three steps', () => {
    expect(ONBOARD_STEPS).toHaveLength(3);
  });

  it('every step has a title, body, icon, and a valid target', () => {
    for (const s of ONBOARD_STEPS) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.body.length).toBeGreaterThan(0);
      expect(s.icon.length).toBeGreaterThan(0);
      // target is null (the 3D view) or a CSS selector starting with #
      expect(s.target === null || s.target.startsWith('#')).toBe(true);
    }
  });

  it('covers the three core gestures in order: look, fly, time', () => {
    expect(ONBOARD_STEPS[0].title).toMatch(/drag|look/i);
    expect(ONBOARD_STEPS[1].title).toMatch(/click|fly|planet/i);
    expect(ONBOARD_STEPS[2].title).toMatch(/time|timeline|scrub/i);
  });
});

describe('shouldShowOnboarding', () => {
  it('is true when the user has never seen it (empty storage)', () => {
    expect(shouldShowOnboarding(memStorage())).toBe(true);
  });

  it('is false once marked onboarded', () => {
    const s = memStorage();
    markOnboarded(s);
    expect(shouldShowOnboarding(s)).toBe(false);
  });

  it('is true when storage throws (private mode) — fail open', () => {
    const throwing = {
      getItem: () => {
        throw new Error('denied');
      },
    };
    expect(shouldShowOnboarding(throwing)).toBe(true);
  });
});

describe('markOnboarded', () => {
  it('persists the flag under the documented key', () => {
    const s = memStorage();
    markOnboarded(s);
    expect(s.getItem(ONBOARD_KEY)).toBe('1');
  });

  it('does not throw when storage is unavailable', () => {
    const throwing = {
      setItem: () => {
        throw new Error('denied');
      },
    };
    expect(() => markOnboarded(throwing)).not.toThrow();
  });
});
