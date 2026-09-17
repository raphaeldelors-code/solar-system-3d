import { describe, it, expect } from 'vitest';
import { parseNeoFeed, toLunarDistances, formatNeoLabel, type NeoApproach } from '../src/sim/neo';

// Real CNEOS feed shape (captured from api.nasa.gov, DEMO_KEY).
const SAMPLE_FEED = {
  element_count: 2,
  near_earth_objects: {
    '2026-09-18': [
      {
        name: '260277 (2004 TR12)',
        id: '2260277',
        is_potentially_hazardous_asteroid: false,
        estimated_diameter: {
          kilometers: { estimated_diameter_min: 0.589, estimated_diameter_max: 1.318 },
        },
        close_approach_data: [
          {
            close_approach_date_full: '2026-Sep-18 12:25',
            miss_distance: { kilometers: 30_398_631.06 },
            relative_velocity: { kilometers_per_second: 15.45 },
            orbiting_body: 'earth',
          },
        ],
        nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb/dbobj/2260277',
      },
    ],
    '2026-09-19': [
      {
        name: '2024 YQ4',
        id: '698552',
        is_potentially_hazardous_asteroid: true,
        estimated_diameter: {
          kilometers: { estimated_diameter_min: 25.0, estimated_diameter_max: 55.9 },
        },
        close_approach_data: [
          {
            close_approach_date_full: '2026-Sep-19 03:10',
            miss_distance: { kilometers: 230_640.0 },
            relative_velocity: { kilometers_per_second: 12.1 },
            orbiting_body: 'earth',
          },
        ],
        nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb/dbobj/698552',
      },
    ],
  },
};

describe('parseNeoFeed', () => {
  it('returns the soonest approach across the whole feed', () => {
    const r = parseNeoFeed(SAMPLE_FEED);
    expect(r.count).toBe(2);
    expect(r.soonest?.name).toBe('260277 (2004 TR12)'); // Sep-18 < Sep-19
    expect(r.soonest?.approachUtc).toBe('2026-09-18T12:25:00Z');
    expect(r.soonest?.missDistanceKm).toBeCloseTo(30_398_631.06);
    expect(r.soonest?.velocityKmS).toBeCloseTo(15.45);
    expect(r.soonest?.diameterKm).toEqual([0.589, 1.318]);
    expect(r.soonest?.hazardous).toBe(false);
    expect(r.soonest?.jplUrl).toContain('2260277');
  });

  it('flags hazardous objects', () => {
    const r = parseNeoFeed(SAMPLE_FEED);
    // The Sep-19 one is hazardous; find it by name.
    const feed = parseNeoFeed({
      near_earth_objects: { '2026-09-19': SAMPLE_FEED.near_earth_objects['2026-09-19'] },
    });
    expect(feed.soonest?.hazardous).toBe(true);
    expect(feed.soonest?.name).toBe('2024 YQ4');
    void r;
  });

  it('normalizes CNEOS month names to ISO (UTC)', () => {
    const r = parseNeoFeed(SAMPLE_FEED);
    expect(r.soonest?.approachUtc).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  });

  it('returns null soonest on empty/invalid feed (never throws)', () => {
    expect(parseNeoFeed(null).soonest).toBeNull();
    expect(parseNeoFeed({}).soonest).toBeNull();
    expect(parseNeoFeed({ near_earth_objects: {} }).soonest).toBeNull();
    expect(parseNeoFeed({ near_earth_objects: { '2026-09-18': [] } }).soonest).toBeNull();
    expect(parseNeoFeed('garbage').soonest).toBeNull();
  });

  it('skips malformed entries but counts valid ones', () => {
    const feed = {
      near_earth_objects: {
        '2026-09-18': [
          { name: 'bad', id: '1' }, // no close_approach_data
          SAMPLE_FEED.near_earth_objects['2026-09-18'][0], // valid
        ],
      },
    };
    const r = parseNeoFeed(feed);
    expect(r.count).toBe(1);
    expect(r.soonest?.name).toBe('260277 (2004 TR12)');
  });
});

describe('toLunarDistances', () => {
  it('converts km to lunar distances (1 LD = 384,400 km)', () => {
    expect(toLunarDistances(384_400)).toBeCloseTo(1.0);
    expect(toLunarDistances(768_800)).toBeCloseTo(2.0);
  });
});

describe('formatNeoLabel', () => {
  const a: NeoApproach = {
    name: '2024 YQ4',
    id: '698552',
    approachUtc: '2026-09-19T03:10:00Z',
    missDistanceKm: 230_640,
    velocityKmS: 12.1,
    diameterKm: [25, 55.9],
    hazardous: true,
    jplUrl: 'x',
  };
  const now = Date.parse('2026-09-16T00:00:00Z');

  it('formats a future approach with days', () => {
    const label = formatNeoLabel(a, now);
    expect(label).toContain('2024 YQ4');
    expect(label).toContain('LD');
    expect(label).toContain('in 3d');
    expect(label).toContain('⚠'); // hazardous
  });

  it('says "today" for an approach later the same day', () => {
    const sameDay: NeoApproach = { ...a, approachUtc: '2026-09-16T20:00:00Z' };
    expect(formatNeoLabel(sameDay, now)).toContain('today');
  });

  it('says "now" for a past approach', () => {
    const past: NeoApproach = { ...a, approachUtc: '2026-09-15T00:00:00Z' };
    expect(formatNeoLabel(past, now)).toContain('now');
  });

  it('omits the hazard marker for non-hazardous objects', () => {
    const safe: NeoApproach = { ...a, hazardous: false };
    expect(formatNeoLabel(safe, now)).not.toContain('⚠');
  });
});
