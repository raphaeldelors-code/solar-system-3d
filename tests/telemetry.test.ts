import { describe, it, expect } from 'vitest';
import {
  CONSENT_KEY,
  readConsent,
  writeConsent,
  consentAllowsExternal,
  FPS_BUCKETS,
  fpsBucketIndex,
  createFpsHistogram,
  recordFrame,
  buildReport,
} from '../src/telemetry/telemetry';

/** A minimal in-memory Storage stand-in (getItem/setItem only). */
function fakeStorage(initial: Record<string, string> = {}): Pick<Storage, 'getItem' | 'setItem'> {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (k) => (map.has(k) ? map.get(k)! : null),
    setItem: (k, v) => {
      map.set(k, v);
    },
  };
}

describe('consent (opt-in, persisted)', () => {
  it('empty storage → unset (the default; never assume consent)', () => {
    expect(readConsent(fakeStorage())).toBe('unset');
  });
  it('reads a stored granted / declined', () => {
    expect(readConsent(fakeStorage({ [CONSENT_KEY]: 'granted' }))).toBe('granted');
    expect(readConsent(fakeStorage({ [CONSENT_KEY]: 'declined' }))).toBe('declined');
  });
  it('unknown / corrupted stored value → unset (never treat unknown data as consent)', () => {
    expect(readConsent(fakeStorage({ [CONSENT_KEY]: 'maybe' }))).toBe('unset');
    expect(readConsent(fakeStorage({ [CONSENT_KEY]: '' }))).toBe('unset');
  });
  it('writeConsent persists granted / declined, no-ops on unset', () => {
    const s = fakeStorage();
    writeConsent(s, 'granted');
    expect(s.getItem(CONSENT_KEY)).toBe('granted');
    writeConsent(s, 'declined');
    expect(s.getItem(CONSENT_KEY)).toBe('declined');
    // unset must not clobber a prior choice
    writeConsent(s, 'unset');
    expect(s.getItem(CONSENT_KEY)).toBe('declined');
  });
  it('only an explicit granted allows external reporting', () => {
    expect(consentAllowsExternal('granted')).toBe(true);
    expect(consentAllowsExternal('unset')).toBe(false);
    expect(consentAllowsExternal('declined')).toBe(false);
  });
});

describe('fps histogram', () => {
  it('buckets are ordered and cover the full range (no gaps, open-ended last)', () => {
    expect(FPS_BUCKETS.length).toBeGreaterThanOrEqual(3);
    for (let i = 1; i < FPS_BUCKETS.length; i++) {
      expect(FPS_BUCKETS[i].min).toBe(FPS_BUCKETS[i - 1].max);
    }
    expect(FPS_BUCKETS[FPS_BUCKETS.length - 1].max).toBe(Infinity);
  });
  it('fpsBucketIndex maps durations to the right bucket', () => {
    expect(fpsBucketIndex(8)).toBe(0); // 60fps
    expect(fpsBucketIndex(16)).toBe(1); // boundary → next bucket (half-open)
    expect(fpsBucketIndex(25)).toBe(1); // 30fps
    expect(fpsBucketIndex(33)).toBe(2); // boundary
    expect(fpsBucketIndex(50)).toBe(2);
    expect(fpsBucketIndex(100)).toBe(4); // jank
    expect(fpsBucketIndex(500)).toBe(4); // open-ended
  });
  it('negative durations clamp to the first bucket (clock-skew artifact)', () => {
    expect(fpsBucketIndex(-5)).toBe(0);
  });
  it('recordFrame increments the right bucket + total', () => {
    const h = createFpsHistogram();
    recordFrame(h, 8);
    recordFrame(h, 25);
    recordFrame(h, 25);
    recordFrame(h, 500);
    expect(h.total).toBe(4);
    expect(h.counts[0]).toBe(1);
    expect(h.counts[1]).toBe(2);
    expect(h.counts[4]).toBe(1);
    expect(h.counts.reduce((a, b) => a + b, 0)).toBe(4); // counts sum to total
  });
  it('createFpsHistogram starts all-zero', () => {
    const h = createFpsHistogram();
    expect(h.total).toBe(0);
    expect(h.counts.every((c) => c === 0)).toBe(true);
    expect(h.counts.length).toBe(FPS_BUCKETS.length);
  });
});

describe('buildReport (payload shape)', () => {
  it('error report carries name + stack + tier + version', () => {
    const r = buildReport('error', 'TypeError: x is undefined', 'high', 'abc123', {
      stack: 'at main.ts:1',
    });
    expect(r.kind).toBe('error');
    expect(r.name).toBe('TypeError: x is undefined');
    expect(r.stack).toBe('at main.ts:1');
    expect(r.qualityTier).toBe('high');
    expect(r.version).toBe('abc123');
    expect(r.value).toBeUndefined();
    expect(r.fps).toBeUndefined();
  });
  it('counter report carries name + value, no stack', () => {
    const r = buildReport('counter', 'context_loss', 'low', 'dev', { value: 1 });
    expect(r.kind).toBe('counter');
    expect(r.name).toBe('context_loss');
    expect(r.value).toBe(1);
    expect(r.stack).toBeUndefined();
  });
  it('fps snapshot is attached when provided', () => {
    const h = createFpsHistogram();
    recordFrame(h, 25);
    const r = buildReport('error', 'err', 'medium', 'dev', { fps: h });
    expect(r.fps).toBe(h);
  });
});
