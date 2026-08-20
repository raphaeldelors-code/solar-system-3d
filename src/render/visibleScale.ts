/**
 * "Visible scale" layout — derived so nothing overlaps.
 *
 * Old single-curve mappings (one log formula for planets, one for moons)
 * compressed the outer system: every adjacent planet orbit overlapped and
 * moon orbits piled onto their parent's disc. This module replaces them with
 * a layout that is solved, not eyeballed:
 *
 *  1. Planet distances: a piecewise-linear ramp through per-orbit anchors.
 *     Each anchor sits exactly where the previous orbit's worst-case
 *     envelope (body radius + rings + its stacked moon system) plus a
 *     margin ends. Adjacent-orbit clearance therefore holds by
 *     construction for every non-crossing pair (the real ellipses of the
 *     TNOs genuinely cross in radius and stay separated in 3D by
 *     inclination/longitude).
 *  2. Planets/dwarfs: radius = 0.8 + 0.45*log10(km/100 + 1) — exaggerated
 *     but compressed compared to the old 0.5 + 0.9*log10(...), so bodies
 *     stop swallowing the corridors between orbits.
 *  3. Moons: their own, much smaller radius formula so satellites read as
 *     satellites, plus a per-moon distance clamp on top of a square-root
 *     base curve:
 *        - floor: stacked per-moon floors so regular sibling chains
 *          (Galilean moons, Saturn's ring-plane set, Uranian regulars)
 *          never fall back onto each other or onto the parent's disc;
 *          also covers eccentric moons whose real perigee maps too close;
 *        - cap:   keeps wide irregulars (Himalia, Iapetus, Nereid) inside
 *          the corridor to the next orbit.
 *
 *  4. Orbit LINES use the same per-point mapping as the body positions,
 *     so eccentric ellipses stay glued to their drawn path.
 *
 * The anchors and clamps below are the fixed point of the constraint
 * solver in `solve_scale.py` (total fails: 0). Keep the two in sync if
 * body data or the formulas change.
 */

/** Scene radius of the Sun in visible mode (its true 696,000 km would
 *  dwarf the whole layout; Mercury's orbit starts at 5.0 units). */
export const SUN_R = 1.35;

// --------------------------------------------------------------------------
// Planet orbit ramp
// --------------------------------------------------------------------------

/**
 * Locked (a in AU, scene distance) anchors. Piecewise-linear in a between
 * anchors. Spacing is what clears the outer body's envelope — see the
 * module docstring for the derivation.
 */
const ANCHORS: ReadonlyArray<readonly [au: number, d: number]> = [
  [0.387098, 5.0], // mercury
  [0.723321, 9.724486], // venus
  [1.0, 15.051293], // earth
  [1.523712, 23.211311], // mars
  [2.7675, 28.814579], // asteroid belt centre (Ceres)
  [5.20248, 43.956733], // jupiter
  [9.541499, 66.964136], // saturn
  [19.187979, 84.022651], // uranus
  [30.069528, 102.130054], // neptune
  [39.482117, 126.602786], // pluto
  [43.11, 128.602786], // haumea
  [45.43, 130.602786], // makemake
  [67.864, 132.602786], // eris
];

/** Piecewise-linear heliocentric distance mapping (AU -> scene units).
 *  Mirrors `ramp` in solve_scale.py, including the linear extension past
 *  the last anchor (used by the far-extent check for Eris's apoapsis). */
export function planetDistance(au: number): number {
  if (au <= ANCHORS[0][0]) return ANCHORS[0][1];
  for (let i = 1; i < ANCHORS.length; i++) {
    const [a1, d1] = ANCHORS[i];
    if (au <= a1) {
      const [a0, d0] = ANCHORS[i - 1];
      return d0 + ((au - a0) / (a1 - a0)) * (d1 - d0);
    }
  }
  const [a0, d0] = ANCHORS[ANCHORS.length - 2];
  const [a1, d1] = ANCHORS[ANCHORS.length - 1];
  return d1 + ((au - a1) / (a1 - a0)) * (d1 - d0); // extend past last anchor
}

// --------------------------------------------------------------------------
// Body radii
// --------------------------------------------------------------------------

/** Scene radius for a planet / dwarf (visible mode). */
export function planetRadiusKm(km: number): number {
  return 0.8 + 0.45 * Math.log10(km / 100 + 1);
}

/** Scene radius for a moon (visible mode) — small enough to read as a
 *  satellite, floor of 0.08 so tiny moons stay visible. */
export function moonRadiusKm(km: number): number {
  return Math.max(0.08, 0.08 + 0.09 * Math.log10(km / 100 + 1));
}

// --------------------------------------------------------------------------
// Moon distances
// --------------------------------------------------------------------------

/**
 * Base moon-orbit curve (scene units) for real km distance. Monotonic
 * (square-root remap of the parent-relative distance), so siblings ordered
 * by real distance stay ordered. This alone does NOT clear overlaps for
 * tightly-packed regular moon systems — the per-moon clamp table below does
 * that job.
 */
export function baseMoonDistance(km: number): number {
  return 0.9 + 1.7 * Math.sqrt(km / 400_000);
}

interface MoonClamp {
  /**
   * Minimum scene distance. Applied unconditionally to the base curve so a
   * sibling chain never falls back onto the parent's envelope or onto each
   * other (also covers eccentric moons whose real perigee maps too close).
   */
  floor: number;
  /**
   * Maximum scene distance — the apoapsis corridor to the next orbit,
   * pre-subtracted of this moon's own radius so its surface stays clear.
   * Omitted (`undefined`) when a moon has no corridor cap (e.g. a lone
   * moon with no outer orbit).
   */
  cap?: number;
}

/**
 * Solved per-moon clamps. Keys are the moon ids from `src/data/bodies.ts`.
 * `floor`/`cap` are scene units. Values are the fixed point of the
 * constraint solver in `solve_scale.py` — keep them in sync.
 */
const MOON_CLAMPS: Readonly<Record<string, MoonClamp>> = {
  moon: { floor: 2.208715, cap: 3.111655 },
  phobos: { floor: 1.978417, cap: 2.79312 },
  deimos: { floor: 2.294943, cap: 2.794943 },
  amalthea: { floor: 2.584476, cap: 11.023209 },
  io: { floor: 3.034156, cap: 10.93183 },
  europa: { floor: 3.569515, cap: 10.937531 },
  ganymede: { floor: 4.118656, cap: 10.918046 },
  callisto: { floor: 4.683945, cap: 10.921384 },
  himalia: { floor: 5.143966, cap: 11.023314 },
  enceladus: { floor: 5.170574, cap: 8.103596 },
  tethys: { floor: 5.601783, cap: 8.080787 },
  dione: { floor: 6.057633, cap: 8.078954 },
  rhea: { floor: 6.525752, cap: 8.068518 },
  titan: { floor: 7.048484, cap: 8.024341 },
  iapetus: { floor: 7.569867, cap: 8.069867 },
  miranda: { floor: 4.292651, cap: 6.671852 },
  ariel: { floor: 4.72486, cap: 6.644337 },
  umbriel: { floor: 5.184918, cap: 6.644004 },
  titania: { floor: 5.655488, cap: 6.633825 },
  oberon: { floor: 6.135031, cap: 6.635031 },
  triton: { floor: 2.461502, cap: 9.679395 },
  nereid: { floor: 8.720057, cap: 9.745187 },
};

/**
 * Clamp the base curve for a specific moon. Mirrors `dvis` in
 * `solve_scale.py`: floor-clamp then cap-clamp, both unconditional. Returns
 * `null` when the id has no entry (caller falls back to the raw base
 * curve).
 */
export function moonDistance(moonId: string, km: number): number | null {
  const c = MOON_CLAMPS[moonId];
  if (!c) return null;
  let d = baseMoonDistance(km);
  if (d < c.floor) d = c.floor;
  if (c.cap !== undefined && d > c.cap) d = c.cap;
  return d;
}

/** Suggested follow-camera distance for a body of the given km radius. */
export function followDistanceKm(km: number): number {
  return Math.max(3, planetRadiusKm(km) * 6);
}
