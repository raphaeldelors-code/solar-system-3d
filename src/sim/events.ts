// Celestial event engine (pure TS, no three/DOM).
//
// Detects, over a [t0, t1] window (days since J2000):
//   • Solar / lunar eclipses   — geocentric Sun–Moon separation vs apparent
//     radii, candidates from synodic new/full moons, refined at 1 h.
//   • Transits (Mercury, Venus) — inferior conjunction + apparent overlap of
//     the planet disc with the Sun.
//   • Conjunctions (any planet pair, geocentric sep < ~1°).
//   • Oppositions (outer planets, geocentric elongation peak > ~170°).
//   • Saturn ring plane edge-on — Earth line of sight vs Saturn ring normal.
//
// All vectors are in the J2000 ecliptic frame (AU), the same frame the planet
// ephemeris (src/sim/kepler.ts) and the geocentric Moon (src/sim/moon.ts) use.
// The Earth entry in the body table is the Earth/Moon BARYCENTER; its
// ~4671 km offset from Earth's centre is negligible at the degree-level
// precision these detectors use (the A2 ground-truth already pins this
// composition against Horizons DE441).
//
// Performance: planet positions are precomputed on a coarse time grid once,
// then shared by the conjunction/opposition/transit scans, so a full 50-year
// sweep costs one pass per planet (~1e5 Kepler solves) plus cheap vector math.
import { positionAt, type Vec3 } from './kepler';
import { moonGeocentricJ2000 } from './moon';
import { PLANETS, SUN, MOONS } from '../data/bodies';
import { AU_KM, J2000_UTC } from './types';

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

export type EventType =
  'solar-eclipse' | 'lunar-eclipse' | 'transit' | 'conjunction' | 'opposition' | 'saturn-edge-on';

export interface Event {
  type: EventType;
  /** Days since J2000 (TT approximation). */
  tDays: number;
  /** UTC millisecond timestamp of the event instant. */
  dateMs: number;
  /** Short human title (e.g. "Solar eclipse"). */
  title: string;
  /** One-line detail for the UI. */
  detail: string;
  /** Primary body id to fly to (planet for oppositions/transits, etc.). */
  bodyId?: string;
  /** Second body id (the paired planet for conjunctions). */
  bodyId2?: string;
}

export interface FindOptions {
  /** Conjunction angular threshold in degrees (default 1.0). */
  conjunctionDeg?: number;
  /** Saturn ring edge-on threshold in degrees (default 2.0). */
  edgeOnDeg?: number;
  /** Coarse scan step in days (default: adaptive ~1 day). */
  coarseStepDays?: number;
}

// ---- body lookups ---------------------------------------------------------

const PLANET_IDS = PLANETS.map((p) => p.id);
const byPlanetId = new Map(PLANETS.map((p) => [p.id, p]));
const EARTH = byPlanetId.get('earth')!;
const MOON = MOONS.find((m) => m.id === 'moon')!;
const INNER = ['mercury', 'venus'];
const OUTER = ['mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

// ---- tiny 3D helpers (allocation-light, on plain Vec3) --------------------

function vlen(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}
function vsub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
function vneg(v: Vec3): Vec3 {
  return { x: -v.x, y: -v.y, z: -v.z };
}
/** Angle between two (possibly non-unit) vectors, in degrees, clamped acos. */
function angleBetweenDeg(a: Vec3, b: Vec3): number {
  const dot = a.x * b.x + a.y * b.y + a.z * b.z;
  const na = vlen(a),
    nb = vlen(b);
  if (na === 0 || nb === 0) return 0;
  const c = Math.min(1, Math.max(-1, dot / (na * nb)));
  return Math.acos(c) * RAD;
}
/** Apparent (angular) radius in degrees of a body of radiusKm at distKm. */
function apparentRadiusDeg(radiusKm: number, distKm: number): number {
  const s = radiusKm / distKm;
  if (s >= 1) return 90;
  if (s <= 0) return 0;
  return Math.asin(s) * RAD;
}
function tToMs(tDays: number): number {
  return J2000_UTC + Math.round(tDays * 86_400_000);
}
/** Adaptive coarse step: keep the grid ~20k points for any window length. */
function stepFor(rangeDays: number, override?: number): number {
  if (override) return override;
  return Math.min(2, Math.max(0.25, rangeDays / 20_000));
}
/** Build a time grid [t0, t1] inclusive at the given step. */
function grid(t0: number, t1: number, step: number): number[] {
  const out: number[] = [];
  for (let t = t0; t <= t1 + 1e-9; t += step) out.push(t);
  if (out.length === 0 || out[out.length - 1] < t1) out.push(t1);
  return out;
}
/** Golden-section minimiser of a unimodal scalar on [lo, hi]. */
function refineExtremum(
  f: (t: number) => number,
  lo: number,
  hi: number,
  wantMax: boolean,
  iters = 48,
): { t: number; value: number } {
  const g = (Math.sqrt(5) - 1) / 2;
  const fx = (t: number) => (wantMax ? -f(t) : f(t));
  let a = lo,
    b = hi;
  for (let i = 0; i < iters; i++) {
    const m1 = b - g * (b - a);
    const m2 = a + g * (b - a);
    if (fx(m1) < fx(m2)) b = m2;
    else a = m1;
  }
  const t = (a + b) / 2;
  return { t, value: f(t) };
}
function makeEvent(
  type: EventType,
  tDays: number,
  title: string,
  detail: string,
  bodyId?: string,
  bodyId2?: string,
): Event {
  return { type, tDays, dateMs: tToMs(tDays), title, detail, bodyId, bodyId2 };
}

// ---- precomputed planet positions (shared by several detectors) -----------

interface PlanetGrid {
  times: number[];
  // heliocentric position of each planet at each time index
  pos: Vec3[][];
}
function buildPlanetGrid(t0: number, t1: number, step: number): PlanetGrid {
  const times = grid(t0, t1, step);
  const pos = PLANETS.map((p) => times.map((t) => positionAt(p.elements!, t)));
  return { times, pos };
}
/**
 * Geocentric direction (unnormalised) of planet `i` at grid index `k`:
 * heliocentric(planet i) − heliocentric(earth).
 */
function geoDir(p: PlanetGrid, i: number, k: number): Vec3 {
  return vsub(p.pos[i][k], p.pos[PLANET_IDS.indexOf('earth')][k]);
}

// ---- 1. Eclipses (Sun–Moon, geocentric) ----------------------------------

interface SunMoonState {
  sep: number; // geocentric Sun–Moon angular separation [deg]
  sunR: number; // apparent solar radius [deg]
  moonR: number; // apparent lunar radius [deg]
  dSunKm: number; // Earth–Sun distance [km]
  dMoonKm: number; // Earth–Moon distance [km]
}
function sunMoonState(t: number): SunMoonState {
  const earth = positionAt(EARTH.elements!, t);
  const sunGeo = vneg(earth);
  const [mx, my, mz] = moonGeocentricJ2000(t);
  const moonGeo = { x: mx, y: my, z: mz };
  const sep = angleBetweenDeg(sunGeo, moonGeo);
  const dSunKm = vlen(earth) * AU_KM;
  const dMoonKm = vlen(moonGeo) * AU_KM;
  return {
    sep,
    sunR: apparentRadiusDeg(SUN.radiusKm, dSunKm),
    moonR: apparentRadiusDeg(MOON.radiusKm, dMoonKm),
    dSunKm,
    dMoonKm,
  };
}

/**
 * Solar + lunar eclipses in [t0, t1]. New-moon candidates (local minima of the
 * Sun–Moon separation) are refined at 1 h and classified as total/annular/
 * partial; full-moon candidates (local maxima) as total/partial/penumbral.
 */
export function findEclipses(t0: number, t1: number, opts?: FindOptions): Event[] {
  const step = stepFor(t1 - t0, opts?.coarseStepDays);
  const times = grid(t0, t1, step);
  const seps = times.map((t) => sunMoonState(t).sep);
  const out: Event[] = [];

  for (let i = 1; i < seps.length - 1; i++) {
    const s = seps[i];
    const isMin = s < seps[i - 1] && s < seps[i + 1];
    const isMax = s > seps[i - 1] && s > seps[i + 1];
    if (!isMin && !isMax) continue;

    const tC = times[i];
    // Refine the extremum over ±2 days (new/full moon) with 1 h sampling.
    const { t } = refineExtremum((tt) => sunMoonState(tt).sep, tC - 2, tC + 2, isMax);
    const st = sunMoonState(t);

    if (isMin) {
      // New moon → potential SOLAR eclipse. An eclipse is visible from Earth's
      // SURFACE whenever the geocentric Sun–Moon sep is less than the sum of
      // the apparent radii PLUS the parallax term (how far the Moon appears
      // shifted from a surface observer vs the geocentre): R_earth/d_moon
      // (~0.95°). Using the geocentre sum alone would only catch the "central"
      // eclipses and miss most partials/annulars whose geocentric sep is 0.6–1.4°.
      const parallax = apparentRadiusDeg(EARTH.radiusKm, st.dMoonKm);
      if (st.sep < st.sunR + st.moonR + parallax) {
        const kind =
          st.sep < st.moonR - st.sunR
            ? 'Total solar eclipse'
            : st.sep < st.sunR - st.moonR
              ? 'Annular solar eclipse'
              : 'Partial solar eclipse';
        out.push(
          makeEvent(
            'solar-eclipse',
            t,
            'Solar eclipse',
            `${kind} · Sun–Moon sep ${st.sep.toFixed(2)}°`,
            'sun',
            'moon',
          ),
        );
      }
    } else {
      // Full moon → potential LUNAR eclipse. `deficit` = how far short of
      // opposition (180°) the Moon sits; the smaller it is, the deeper the
      // shadow. Umbra / penumbra radii are Earth's apparent disc against the
      // Sun's, seen from the Moon (apparent angles of Earth's radii minus /
      // plus the Sun's).
      const deficit = 180 - st.sep;
      const [mx, my, mz] = moonGeocentricJ2000(t);
      const dMoonKm = vlen({ x: mx, y: my, z: mz }) * AU_KM;
      const earthUmbra = apparentRadiusDeg(EARTH.radiusKm, dMoonKm) - st.sunR;
      const earthPenumbra = apparentRadiusDeg(EARTH.radiusKm, dMoonKm) + st.sunR;
      if (deficit < st.moonR + earthPenumbra) {
        const kind =
          deficit < earthUmbra - st.moonR
            ? 'Total lunar eclipse'
            : deficit < earthUmbra + st.moonR
              ? 'Partial lunar eclipse'
              : 'Penumbral lunar eclipse';
        out.push(
          makeEvent(
            'lunar-eclipse',
            t,
            'Lunar eclipse',
            `${kind} · ${deficit.toFixed(2)}° from opposition`,
            'moon',
          ),
        );
      }
    }
  }
  return out;
}

// ---- 2. Transits (inner planets) ------------------------------------------

/**
 * Transits of Mercury / Venus in [t0, t1]: local minima of the geocentric
 * Sun–planet elongation (inferior conjunction) refined, then a transit is
 * recorded when the planet's apparent disc overlaps the Sun's.
 */
export function findTransits(t0: number, t1: number, opts?: FindOptions): Event[] {
  const p = buildPlanetGrid(t0, t1, stepFor(t1 - t0, opts?.coarseStepDays));
  const eIdx = PLANET_IDS.indexOf('earth');
  const out: Event[] = [];

  for (const id of INNER) {
    const i = PLANET_IDS.indexOf(id);
    const body = byPlanetId.get(id)!;
    // coarse elongation of the planet from the Sun (geocentric)
    const elong = p.times.map((_, k) => {
      const planetGeo = geoDir(p, i, k);
      const sunGeo = vneg(p.pos[eIdx][k]);
      return angleBetweenDeg(planetGeo, sunGeo);
    });
    for (let k = 1; k < elong.length - 1; k++) {
      if (!(elong[k] < elong[k - 1] && elong[k] < elong[k + 1])) continue;
      if (elong[k] > 30) continue; // must be near inferior conjunction
      const tC = p.times[k];
      const el = (t: number) => {
        const planetGeo = vsub(positionAt(body.elements!, t), positionAt(EARTH.elements!, t));
        const sunGeo = vneg(positionAt(EARTH.elements!, t));
        return angleBetweenDeg(planetGeo, sunGeo);
      };
      const { t, value } = refineExtremum(el, tC - 2, tC + 2, false);
      // apparent radii at the conjunction instant
      const dSunKm = vlen(positionAt(EARTH.elements!, t)) * AU_KM;
      const planetGeo = vsub(positionAt(body.elements!, t), positionAt(EARTH.elements!, t));
      const dPlanetKm = vlen(planetGeo) * AU_KM;
      const sunR = apparentRadiusDeg(SUN.radiusKm, dSunKm);
      const planetR = apparentRadiusDeg(body.radiusKm, dPlanetKm);
      if (value < sunR + planetR) {
        const kind =
          value < sunR - planetR ? 'Transit (planet fully on the Sun)' : 'Partial transit';
        out.push(
          makeEvent('transit', t, `${body.name} transit`, `${kind} · sep ${value.toFixed(2)}°`, id),
        );
      }
    }
  }
  return out;
}

// ---- 3. Conjunctions (all planet pairs) -----------------------------------

/**
 * Geocentric conjunctions (angular sep < conjunctionDeg, default 1°) between
 * every pair of the 8 planets. Coarse local minima are refined; the pair and
 * minimum separation are recorded.
 */
export function findConjunctions(t0: number, t1: number, opts?: FindOptions): Event[] {
  const threshold = opts?.conjunctionDeg ?? 1.0;
  const p = buildPlanetGrid(t0, t1, stepFor(t1 - t0, opts?.coarseStepDays));
  const eIdx = PLANET_IDS.indexOf('earth');
  const n = p.times.length;
  const out: Event[] = [];

  // geocentric direction of each planet at each grid index (precomputed)
  const geo: Vec3[][] = PLANETS.map((_, i) => {
    const arr: Vec3[] = new Array(n);
    for (let k = 0; k < n; k++) arr[k] = geoDir(p, i, k);
    return arr;
  });

  for (let a = 0; a < PLANETS.length; a++) {
    for (let b = a + 1; b < PLANETS.length; b++) {
      const sep = (i: number) => angleBetweenDeg(geo[a][i], geo[b][i]);
      for (let k = 1; k < n - 1; k++) {
        const s = sep(k);
        if (!(s < sep(k - 1) && s < sep(k + 1))) continue;
        if (s > threshold * 2.5) continue; // pre-filter
        const tC = p.times[k];
        const f = (t: number) => {
          const ga = vsub(positionAt(PLANETS[a].elements!, t), positionAt(EARTH.elements!, t));
          const gb = vsub(positionAt(PLANETS[b].elements!, t), positionAt(EARTH.elements!, t));
          return angleBetweenDeg(ga, gb);
        };
        const { t, value } = refineExtremum(f, tC - 2, tC + 2, false);
        if (value < threshold) {
          const A = PLANETS[a].name,
            B = PLANETS[b].name;
          out.push(
            makeEvent(
              'conjunction',
              t,
              `${A}–${B} conjunction`,
              `sep ${value.toFixed(2)}°`,
              PLANETS[a].id,
              PLANETS[b].id,
            ),
          );
        }
      }
    }
  }
  void eIdx;
  return out;
}

// ---- 4. Oppositions (outer planets) ---------------------------------------

/**
 * Oppositions of the outer planets: local maxima of the geocentric Sun–planet
 * elongation, refined, kept when the peak exceeds oppositionDeg (default 170°).
 *
 * The default is deliberately well below 180°: a planet at opposition is
 * defined as the elongation PEAK, and that peak is not always ≥ 178°. Saturn's
 * geocentric latitude (up to ±2.5°) can pull the opposition elongation down to
 * ~177.5° (e.g. 2024-09-08, 2025-09-21), and Mars's up to ~177.7° (2022-12-08).
 * A 178° gate silently drops exactly those real oppositions. Since elongation
 * of an outer planet has one dominant maximum per synodic period, every peak
 * above 170° is a genuine opposition.
 */
export function findOppositions(
  t0: number,
  t1: number,
  opts?: { oppositionDeg?: number; coarseStepDays?: number },
): Event[] {
  const threshold = opts?.oppositionDeg ?? 170;
  const p = buildPlanetGrid(t0, t1, stepFor(t1 - t0, opts?.coarseStepDays));
  const eIdx = PLANET_IDS.indexOf('earth');
  const out: Event[] = [];

  for (const id of OUTER) {
    const i = PLANET_IDS.indexOf(id);
    const body = byPlanetId.get(id)!;
    const elong = p.times.map((_, k) => angleBetweenDeg(geoDir(p, i, k), vneg(p.pos[eIdx][k])));
    for (let k = 1; k < elong.length - 1; k++) {
      if (!(elong[k] > elong[k - 1] && elong[k] > elong[k + 1])) continue;
      if (elong[k] < 170) continue; // near opposition
      const tC = p.times[k];
      const f = (t: number) =>
        angleBetweenDeg(
          vsub(positionAt(body.elements!, t), positionAt(EARTH.elements!, t)),
          vneg(positionAt(EARTH.elements!, t)),
        );
      const { t, value } = refineExtremum(f, tC - 3, tC + 3, true);
      if (value > threshold) {
        out.push(
          makeEvent(
            'opposition',
            t,
            `${body.name} opposition`,
            `elongation ${value.toFixed(2)}° from the Sun`,
            id,
          ),
        );
      }
    }
  }
  return out;
}

// ---- 5. Saturn ring plane edge-on -----------------------------------------

/**
 * Saturn's ring-plane normal (spin axis) in the J2000 ecliptic frame, derived
 * from the IAU north pole (RA 40.588°, Dec 83.537°) by a +ε rotation about
 * the vernal axis. Edge-on occurs when Earth's line of sight is (nearly) in
 * the ring plane, i.e. perpendicular to this normal.
 */
function saturnRingNormal(): Vec3 {
  const ra = 40.588 * DEG,
    dec = 83.537 * DEG,
    eps = 23.4392911 * DEG;
  const X = Math.cos(dec) * Math.cos(ra);
  const Y = Math.cos(dec) * Math.sin(ra);
  const Z = Math.sin(dec);
  // Equatorial -> ecliptic: rotate by -eps about the vernal axis (x).
  const y = Y * Math.cos(eps) + Z * Math.sin(eps);
  const z = -Y * Math.sin(eps) + Z * Math.cos(eps);
  const L = Math.hypot(X, y, z);
  return { x: X / L, y: y / L, z: z / L };
}
const SATURN_NORMAL = saturnRingNormal();

/**
 * "Ring tilt" in degrees: the angle between Earth's line of sight to Saturn
 * and the ring plane (0 = perfectly edge-on, 90 = face-on).
 */
export function saturnRingTiltDeg(t: number): number {
  const saturn = positionAt(byPlanetId.get('saturn')!.elements!, t);
  const earth = positionAt(EARTH.elements!, t);
  const los = vsub(earth, saturn); // from Saturn toward Earth
  const dot = Math.abs(los.x * SATURN_NORMAL.x + los.y * SATURN_NORMAL.y + los.z * SATURN_NORMAL.z);
  const c = Math.min(1, dot / (vlen(los) || 1));
  const angleToNormal = Math.acos(c) * RAD; // 0..90
  return 90 - angleToNormal;
}

/** Saturn ring-plane edge-on events (tilt < edgeOnDeg, default 2°). */
export function findSaturnEdgeOn(t0: number, t1: number, opts?: FindOptions): Event[] {
  const threshold = opts?.edgeOnDeg ?? 2.0;
  const step = stepFor(t1 - t0, opts?.coarseStepDays);
  const times = grid(t0, t1, step);
  const tilts = times.map(saturnRingTiltDeg);
  const out: Event[] = [];
  for (let i = 1; i < tilts.length - 1; i++) {
    if (!(tilts[i] < tilts[i - 1] && tilts[i] < tilts[i + 1])) continue;
    if (tilts[i] > threshold * 2.5) continue;
    const tC = times[i];
    // The edge-on crossing is a wide, shallow minimum (the line of sight
    // grazes the ring plane over many months), so use a generous refine
    // window to land in the true bottom, and dedup below.
    const { t, value } = refineExtremum(saturnRingTiltDeg, tC - 45, tC + 45, false);
    if (value < threshold) {
      out.push(
        makeEvent(
          'saturn-edge-on',
          t,
          'Saturn rings edge-on',
          `ring plane tilt ${value.toFixed(2)}° from Earth`,
          'saturn',
        ),
      );
    }
  }
  // Dedup: a single edge-on period can yield several near-adjacent minima on
  // the coarse grid; keep the shallowest within any 30-day cluster.
  out.sort((a, b) => a.tDays - b.tDays);
  const deduped: Event[] = [];
  for (const e of out) {
    const prev = deduped[deduped.length - 1];
    if (prev && e.tDays - prev.tDays < 30) {
      const v = (x: Event) => parseFloat(x.detail.match(/tilt ([\d.]+)/)?.[1] ?? '99');
      if (v(e) < v(prev)) deduped[deduped.length - 1] = e;
    } else {
      deduped.push(e);
    }
  }
  return deduped;
}

// ---- top-level -------------------------------------------------------------

/**
 * Run every detector over [t0Days, t1Days] and return all detected events
 * sorted by time. This is the function the UI calls (on time jumps > 1 y)
 * and the tests call (usually over a narrow window around a known date).
 */
export function findEvents(t0Days: number, t1Days: number, opts?: FindOptions): Event[] {
  const events: Event[] = [
    ...findEclipses(t0Days, t1Days, opts),
    ...findTransits(t0Days, t1Days, opts),
    ...findConjunctions(t0Days, t1Days, opts),
    ...findOppositions(t0Days, t1Days, {
      coarseStepDays: opts?.coarseStepDays,
    }),
    ...findSaturnEdgeOn(t0Days, t1Days, opts),
  ];
  events.sort((a, b) => a.dateMs - b.dateMs);
  return events;
}
