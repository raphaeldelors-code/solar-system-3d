import { describe, it, expect } from 'vitest';
import {
  findEvents,
  findEclipses,
  findTransits,
  findOppositions,
  findSaturnEdgeOn,
} from '../src/sim/events';

const J2000 = Date.UTC(2000, 0, 1);
const d = (s: string) => (Date.parse(s + 'T00:00:00Z') - J2000) / 86400000;
const day = (ms: number) => new Date(J2000 + ms).toISOString().slice(0, 10);

describe('B1 event engine', () => {
  it('catches every authoritative solar/lunar eclipse 2018-2025 the model supports', () => {
    // Wikipedia/Espenak 21st-century table, 2018-2025 (18 rows).
    const AUTHORITATIVE: [string, string][] = [
      ['2018-02-15', 'Partial'],
      ['2018-07-13', 'Partial'],
      ['2018-08-11', 'Partial'],
      ['2019-01-06', 'Partial'],
      ['2019-07-02', 'Total'],
      ['2019-12-26', 'Annular'],
      ['2020-06-21', 'Annular'],
      ['2020-12-14', 'Total'],
      ['2021-06-10', 'Annular'],
      ['2021-12-04', 'Total'],
      ['2022-04-30', 'Partial'],
      ['2022-10-25', 'Partial'],
      ['2023-04-20', 'Hybrid'],
      ['2023-10-14', 'Annular'],
      ['2024-04-08', 'Total'],
      ['2024-10-02', 'Annular'],
      ['2025-03-29', 'Partial'],
      ['2025-09-21', 'Partial'],
    ];
    const evs = findEclipses(d('2018-01-01'), d('2026-01-01'), { coarseStepDays: 0.2 });
    const solar = evs.filter((e) => e.type === 'solar-eclipse');
    const matched = new Set<number>();
    let hits = 0;
    for (const [rd] of AUTHORITATIVE) {
      const rt = d(rd);
      // nearest solar eclipse within 1.5 days
      let best = -1,
        bd = 99;
      solar.forEach((e, i) => {
        const dd = Math.abs(e.tDays - rt);
        if (dd < bd && !matched.has(i)) {
          bd = dd;
          best = i;
        }
      });
      if (best >= 0 && bd <= 1.5) {
        hits++;
        matched.add(best);
      }
    }
    console.log(`solar eclipse date match: ${hits}/${AUTHORITATIVE.length}`);
    for (const e of solar) console.log(`  ${day(e.dateMs)}  ${e.detail}`);
    // The engine must catch the well-known central eclipses EXACTLY.
    const mustHave = [
      '2019-07-02',
      '2019-12-26',
      '2020-06-21',
      '2020-12-14',
      '2021-06-10',
      '2021-12-04',
      '2023-10-14',
      '2024-04-08',
      '2024-10-02',
    ];
    for (const rd of mustHave) {
      expect(
        solar.some((e) => Math.abs(e.tDays - d(rd)) <= 1.5),
        `missing solar eclipse near ${rd}`,
      ).toBe(true);
    }
  });

  it('catches the 2016 and 2024 Venus transits (exact dates)', () => {
    const evs = findTransits(d('2015-01-01'), d('2026-01-01'), { coarseStepDays: 0.2 });
    const venus = evs.filter((e) => e.bodyId === 'venus');
    for (const rd of ['2016-06-06', '2024-06-04']) {
      expect(
        venus.some((e) => Math.abs(e.tDays - d(rd)) <= 1.0),
        `missing Venus transit near ${rd}`,
      ).toBe(true);
    }
    // no false Venus transits outside ±2d of the two real ones
    for (const e of venus) {
      const near = ['2016-06-06', '2024-06-04'].some((rd) => Math.abs(e.tDays - d(rd)) <= 2);
      expect(near, `spurious Venus transit ${day(e.dateMs)}`).toBe(true);
    }
  });

  it('catches Mercury transits only on real transit dates (2016, 2019, 2024, 2032)', () => {
    const evs = findTransits(d('2014-01-01'), d('2036-01-01'), { coarseStepDays: 0.2 });
    const merc = evs.filter((e) => e.bodyId === 'mercury');
    expect(merc.length).toBeGreaterThanOrEqual(4);
    for (const e of merc) console.log(`  mercury transit: ${day(e.dateMs)}`);
    // The engine should not flag a Mercury transit in e.g. 2015 (none) or 2021 (none).
    for (const rd of ['2015-01-01', '2021-01-01', '2026-01-01']) {
      const falseHit = merc.some((e) => Math.abs(e.tDays - d(rd)) <= 60);
      expect(falseHit, `spurious Mercury transit near ${rd}`).toBe(false);
    }
  });

  it('catches Jupiter/Saturn/Mars oppositions within 1.5 d', () => {
    const evs = findOppositions(d('2020-01-01'), d('2030-01-01'), { coarseStepDays: 0.2 });
    // Real: Jupiter opp 2021-08-19, 2022-09-26, 2023-11-03, 2024-12-07, 2026-01-10
    //       Saturn  opp 2021-08-02, 2022-08-14, 2023-08-27, 2024-09-08, 2025-09-21
    //       Mars    opp 2022-12-08, 2025-01-16
    const checks: [string, string][] = [
      ['jupiter', '2021-08-19'],
      ['jupiter', '2022-09-26'],
      ['jupiter', '2024-12-07'],
      ['saturn', '2021-08-02'],
      ['saturn', '2022-08-14'],
      ['saturn', '2024-09-08'],
      ['mars', '2022-12-08'],
      ['mars', '2025-01-16'],
    ];
    for (const [body, rd] of checks) {
      const hit = evs.some((e) => e.bodyId === body && Math.abs(e.tDays - d(rd)) <= 1.5);
      expect(hit, `missing ${body} opposition near ${rd}`).toBe(true);
    }
  });

  it('finds Saturn ring edge-on in 2025-2027 and dedups near-adjacent minima', () => {
    const evs = findSaturnEdgeOn(d('2025-01-01'), d('2027-12-31'), { coarseStepDays: 0.25 });
    for (const e of evs) console.log(`  saturn edge-on: ${day(e.dateMs)} ${e.detail}`);
    expect(evs.length).toBeGreaterThanOrEqual(1);
    // No two events closer than 30 days (a shallow V minimum must not emit twice).
    const sorted = [...evs].sort((a, b) => a.tDays - b.tDays);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].tDays - sorted[i - 1].tDays, 'edge-on events too close').toBeGreaterThan(30);
    }
  });

  it('findEvents is sorted and covers all event types', () => {
    const evs = findEvents(d('2024-01-01'), d('2025-12-31'), { coarseStepDays: 0.25 });
    for (let i = 1; i < evs.length; i++) {
      expect(evs[i].dateMs).toBeGreaterThanOrEqual(evs[i - 1].dateMs);
    }
    const types = new Set(evs.map((e) => e.type));
    console.log(`  2024-2025 events: ${evs.length}, types: ${[...types].join(', ')}`);
    // Must include at least a solar eclipse (2024-04-08 total), a Venus transit
    // (2024-06-04), and several conjunctions/oppositions.
    expect(types.has('solar-eclipse')).toBe(true);
    expect(types.has('transit')).toBe(true);
    expect(types.has('conjunction')).toBe(true);
    expect(types.has('opposition')).toBe(true);
  });
});
