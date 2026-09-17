import { describe, it, expect } from 'vitest';
import { SBDB, hasSbdb, formatDiscoveryDate, sbdbFacts } from '../src/sim/sbdb';

describe('sbdb — baked NASA/JPL Small-Body Database records (plan 044 B4)', () => {
  it('has exactly the five small bodies the app models', () => {
    expect(Object.keys(SBDB).sort()).toEqual(
      ['ceres', 'eris', 'haumea', 'makemake', 'pluto'].sort(),
    );
  });

  it('hasSbdb is true for the small bodies and false for the major planets', () => {
    expect(hasSbdb('pluto')).toBe(true);
    expect(hasSbdb('ceres')).toBe(true);
    expect(hasSbdb('earth')).toBe(false);
    expect(hasSbdb('jupiter')).toBe(false);
    expect(hasSbdb('moon')).toBe(false);
  });

  it('every record has a designation, orbit class, and discovery date', () => {
    for (const rec of Object.values(SBDB)) {
      expect(rec.shortname).toBeTruthy();
      expect(rec.orbitClass).toBeTruthy();
      expect(rec.discoveryDate).toMatch(/^\d{4}-[A-Za-z]{3}-\d{2}$/);
      expect(rec.h).not.toBeNull();
    }
  });

  it('Pluto is a TransNeptunian Object discovered 1930 at Flagstaff', () => {
    const p = SBDB.pluto;
    expect(p.orbitClass).toBe('TransNeptunian Object');
    expect(p.discoveryDate).toBe('1930-Jan-23');
    expect(p.discoveryLocation).toBe('Flagstaff');
    expect(p.h).toBe('-0.55');
  });

  it('Ceres is the only one with a geometric albedo in the SBDB', () => {
    expect(SBDB.ceres.albedo).toBe('0.090');
    expect(SBDB.pluto.albedo).toBeNull();
    expect(SBDB.eris.albedo).toBeNull();
  });

  it('formatDiscoveryDate compacts "YYYY-MMM-DD" to "MMM YYYY"', () => {
    expect(formatDiscoveryDate('1930-Jan-23')).toBe('Jan 1930');
    expect(formatDiscoveryDate('1801-Jan-01')).toBe('Jan 1801');
    // unexpected format -> returned verbatim (never blank, never throws)
    expect(formatDiscoveryDate('garbage')).toBe('garbage');
  });

  it('sbdbFacts returns [] for a body without a record', () => {
    expect(sbdbFacts('earth')).toEqual([]);
    expect(sbdbFacts('sun')).toEqual([]);
  });

  it('sbdbFacts emits designation, class, H, discovery, and obs arc for Pluto', () => {
    const rows = sbdbFacts('pluto');
    const byLabel = Object.fromEntries(rows.map((r) => [r.label, r.value]));
    expect(byLabel['Designation']).toBe('134340 Pluto');
    expect(byLabel['Class']).toBe('TransNeptunian Object');
    expect(byLabel['Abs. magnitude H']).toBe('-0.55');
    expect(byLabel['Discovered']).toBe('Jan 1930 @ Flagstaff');
    // 31524 days / 365.25 ≈ 86 years, 7212 obs
    expect(byLabel['Obs. arc']).toBe('86 yr · 7,212 obs');
  });

  it('sbdbFacts omits the albedo row when the SBDB has none', () => {
    const plutoLabels = sbdbFacts('pluto').map((r) => r.label);
    expect(plutoLabels).not.toContain('Albedo');
    const ceresLabels = sbdbFacts('ceres').map((r) => r.label);
    expect(ceresLabels).toContain('Albedo');
  });
});
