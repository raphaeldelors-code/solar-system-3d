/**
 * Plan 044 B4 — SBDB body-facts panel.
 *
 * Adds NASA/JPL Small-Body Database (SBDB) facts to the info card for the
 * five small bodies the app models (Pluto, Ceres, Eris, Haumea, Makemake).
 * The major planets are NOT in the SBDB (it is the asteroid/comet database),
 * so this only applies to the dwarf planets / largest asteroid.
 *
 * DATA SOURCE & WHY BAKED: the SBDB API (ssd-api.jpl.nasa.gov/sbdb.api)
 * returns NO `Access-Control-Allow-Origin` header, so a static GitHub Pages
 * app cannot call it from the browser (same blocker as B2's Horizons). We
 * therefore bake the verified data at build time — the values below were
 * fetched live from the SBDB API on 2026-09-17 and are conservative (only
 * fields the API actually returned; no invented numbers).
 *
 * Kept pure + dependency-free so the row formatting is unit-testable without
 * a THREE scene or DOM.
 */
import type { FactRow } from '../render/bodyFacts';

/** One body's verified SBDB record (only fields the API returned). */
export interface SbdbRecord {
  /** JPL SPK-ID (e.g. "20134340"). */
  spkid: string;
  /** IAU full designation (e.g. "134340 Pluto (1930 BM)"). */
  fullname: string;
  /** Short designation (e.g. "134340 Pluto"). */
  shortname: string;
  /** Orbit class name (e.g. "TransNeptunian Object"). */
  orbitClass: string;
  /** Absolute magnitude H (string as returned; may be negative). */
  h: string | null;
  /** Geometric albedo (only Ceres has one in the SBDB). */
  albedo: string | null;
  /** Discovery date, SBDB "YYYY-MMM-DD" form (e.g. "1930-Jan-23"). */
  discoveryDate: string | null;
  /** Discovery site (e.g. "Flagstaff"). */
  discoveryLocation: string | null;
  /** First observation used in the orbit solution (ISO date). */
  firstObs: string | null;
  /** Last observation used in the orbit solution (ISO date). */
  lastObs: string | null;
  /** Length of the observation data arc, in days. */
  dataArc: string | null;
  /** Number of observations used in the orbit solution. */
  nObs: number | null;
}

/**
 * Verified SBDB records for the app's small bodies. Fetched live from
 * https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=<name>&phys-par=1&discovery=1
 * on 2026-09-17. `null` = the API did not return that field for this body.
 */
export const SBDB: Record<string, SbdbRecord> = {
  pluto: {
    spkid: '20134340',
    fullname: '134340 Pluto (1930 BM)',
    shortname: '134340 Pluto',
    orbitClass: 'TransNeptunian Object',
    h: '-0.55',
    albedo: null,
    discoveryDate: '1930-Jan-23',
    discoveryLocation: 'Flagstaff',
    firstObs: '1930-03-29',
    lastObs: '2016-07-19',
    dataArc: '31524',
    nObs: 7212,
  },
  ceres: {
    spkid: '20000001',
    fullname: '1 Ceres (A801 AA)',
    shortname: '1 Ceres',
    orbitClass: 'Main-belt Asteroid',
    h: '3.34',
    albedo: '0.090',
    discoveryDate: '1801-Jan-01',
    discoveryLocation: 'Palermo',
    firstObs: '1995-01-05',
    lastObs: '2021-01-28',
    dataArc: '9520',
    nObs: 1075,
  },
  eris: {
    spkid: '20136199',
    fullname: '136199 Eris (2003 UB313)',
    shortname: '136199 Eris',
    orbitClass: 'TransNeptunian Object',
    h: '-1.26',
    albedo: null,
    discoveryDate: '2003-Oct-21',
    discoveryLocation: 'Palomar',
    firstObs: '1954-09-03',
    lastObs: '2026-02-06',
    dataArc: '26089',
    nObs: 4064,
  },
  haumea: {
    spkid: '20136108',
    fullname: '136108 Haumea (2003 EL61)',
    shortname: '136108 Haumea',
    orbitClass: 'TransNeptunian Object',
    h: '0.14',
    albedo: null,
    discoveryDate: '2003-Mar-07',
    discoveryLocation: 'Sierra Nevada',
    firstObs: '1955-03-22',
    lastObs: '2026-04-14',
    dataArc: '25956',
    nObs: 6692,
  },
  makemake: {
    spkid: '20136472',
    fullname: '136472 Makemake (2005 FY9)',
    shortname: '136472 Makemake',
    orbitClass: 'TransNeptunian Object',
    h: '-0.25',
    albedo: null,
    discoveryDate: '2005-Mar-31',
    discoveryLocation: 'Palomar',
    firstObs: '1955-01-29',
    lastObs: '2026-04-05',
    dataArc: '25999',
    nObs: 6348,
  },
};

/** True when the body has a baked SBDB record (the five small bodies). */
export function hasSbdb(id: string): boolean {
  return id in SBDB;
}

/**
 * Format an SBDB "YYYY-MMM-DD" discovery date as a compact "MMM YYYY"
 * (e.g. "1930-Jan-23" -> "Jan 1930"). The day is dropped for display since
 * the card is a facts summary, not an ephemeris. Returns the raw string if
 * the format is unexpected (never throws, never blank).
 */
export function formatDiscoveryDate(sbdbDate: string): string {
  const m = /^(\d{4})-([A-Za-z]{3})-(\d{2})$/.exec(sbdbDate);
  if (!m) return sbdbDate;
  return `${m[2]} ${m[1]}`;
}

/**
 * The SBDB fact rows for a body, in display order. Returns [] for bodies
 * without a record (the major planets) so the caller simply skips the block.
 * Rows are only emitted when the underlying value is present — the card must
 * never show a blank value.
 */
export function sbdbFacts(id: string): FactRow[] {
  const rec = SBDB[id];
  if (!rec) return [];
  const rows: FactRow[] = [];
  rows.push({ label: 'Designation', value: rec.shortname });
  rows.push({ label: 'Class', value: rec.orbitClass });
  if (rec.h !== null) rows.push({ label: 'Abs. magnitude H', value: rec.h });
  if (rec.albedo !== null) rows.push({ label: 'Albedo', value: rec.albedo });
  if (rec.discoveryDate) {
    const where = rec.discoveryLocation ? ` @ ${rec.discoveryLocation}` : '';
    rows.push({ label: 'Discovered', value: `${formatDiscoveryDate(rec.discoveryDate)}${where}` });
  }
  if (rec.dataArc && rec.nObs) {
    const years = (Number(rec.dataArc) / 365.25).toFixed(0);
    rows.push({ label: 'Obs. arc', value: `${years} yr · ${rec.nObs.toLocaleString()} obs` });
  }
  return rows;
}
