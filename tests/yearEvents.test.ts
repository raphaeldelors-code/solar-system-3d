import { describe, it, expect } from 'vitest';
import { yearEvents, _clearYearEventsCache } from '../src/render/yearEvents';

// The real event engine over whole years: each sweep costs ~0.1-0.3 s, so
// keep this suite to the two years with well-known events (2024 Venus
// transit, 2025 Mars opposition + eclipses + Saturn edge-on) and a cache
// test. The engine's own date-accuracy is pinned in tests/events.test.ts.
const J2000 = Date.UTC(2000, 0, 1, 12);

describe('yearEvents (per-year findEvents cache)', () => {
  it('returns the year span in days since J2000 (365/366 by leap year)', () => {
    const y2025 = yearEvents(2025);
    expect(y2025.year).toBe(2025);
    expect(y2025.spanLenDays).toBe(365);
    expect(y2025.span0Days).toBeCloseTo((Date.UTC(2025, 0, 1) - J2000) / 86_400_000, 9);

    const y2024 = yearEvents(2024);
    expect(y2024.spanLenDays).toBe(366); // leap year
    expect(y2024.span0Days).toBeCloseTo((Date.UTC(2024, 0, 1) - J2000) / 86_400_000, 9);
  });

  it('2024 contains the Venus transit in June (2024-06-04)', () => {
    const evs = yearEvents(2024).events;
    const transit = evs.find((e) => e.type === 'transit' && e.bodyId === 'venus');
    expect(transit, `no Venus transit in 2024 (got ${evs.length} events)`).toBeTruthy();
    expect(new Date(transit!.dateMs).getUTCMonth()).toBe(5); // June
  });

  it('2025 contains the January Mars opposition and solar eclipses', () => {
    const evs = yearEvents(2025).events;
    const marsOpp = evs.find((e) => e.type === 'opposition' && e.bodyId === 'mars');
    expect(marsOpp, `no Mars opposition in 2025 (got ${evs.length} events)`).toBeTruthy();
    // 2025-01-16 (authoritative, pinned in events.test.ts)
    expect(new Date(marsOpp!.dateMs).getUTCFullYear()).toBe(2025);
    expect(new Date(marsOpp!.dateMs).getUTCMonth()).toBe(0); // January
    expect(evs.filter((e) => e.type === 'solar-eclipse').length).toBeGreaterThanOrEqual(1);
  });

  it('caches per year (same reference, no re-scan) until cleared', () => {
    _clearYearEventsCache(2023);
    const a = yearEvents(2023);
    const b = yearEvents(2023);
    expect(b).toBe(a); // identical reference = cache hit
    _clearYearEventsCache(2023);
    const c = yearEvents(2023);
    expect(c).not.toBe(a); // cleared → recomputed
  });
});
