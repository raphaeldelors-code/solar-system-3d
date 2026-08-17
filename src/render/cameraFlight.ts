/**
 * Camera flight: smooth eased transitions between "anchors" — the deep-sky
 * constellations, the whole solar system, and any picked body. Pure math, no
 * DOM / no three.js, so it is unit-tested in Node.
 *
 * `main.ts` owns the live PerspectiveCamera + OrbitControls and drives these
 * with `stepFlight` each frame. The transition eases BOTH the orbit target
 * and the camera's offset-from-target with cubic in/out (slow start, fast
 * middle, gentle landing) — the "zoom + rotation with acceleration &
 * deceleration" the user asked for. FOV is held constant; the zoom comes
 * from camera distance, so there is no dolly-zoom distortion.
 *
 * The camera pose is always expressed as `target + offset` (offset = camera −
 * target). Interpolating the *offset* (not the absolute position) means a
 * flight to a moving picked body stays rigidly attached to it: the whole
 * (target + camera) frame translates with the body every frame, so the body
 * is exactly framed at landing no matter how far it has orbited since the
 * flight began. Global anchors have a static target (the origin), so they
 * reduce to an ordinary eased move. The FOV is eased too: an anchor may
 * request a different field of view (the sky anchor widens it to reveal
 * more constellations; other anchors return to the default 50°).
 */

export type Vec3 = readonly [number, number, number];

export interface CamAnchor {
  /** World-space camera position. */
  pos: Vec3;
  /** World-space point the camera should orbit / look at. */
  target: Vec3;
  /**
   * Optional camera FOV (degrees) to ease to on landing. Set by anchors that
   * need a different field of view than the default (the constellations
   * anchor widens it so more of the sky is visible at once). Omit to keep
   * the current FOV.
   */
  fov?: number;
}

export interface Flight {
  /** World-space orbit target at flight start. */
  fromTarget: Vec3;
  /** Camera − target at flight start. */
  fromOffset: Vec3;
  /** World-space orbit target the flight should end on. */
  toTarget: Vec3;
  /** Camera − target at the destination (fixed offset = the landing framing). */
  toOffset: Vec3;
  /** Seconds for the whole move. */
  duration: number;
  /** Elapsed seconds. */
  t: number;
  /**
   * Body the flight is targeting (picked planet / moon). When set, the
   * render loop substitutes that body's LIVE world position for the
   * interpolated target each frame (and re-derives the camera from it), so a
   * moving body is landed on, not where it was when the flight started.
   * `null` for the global anchors (Sun / constellations).
   */
  followId: string | null;
  /** FOV (degrees) the camera eases to over the flight. */
  toFov: number;
  /** FOV (degrees) at flight start. */
  fromFov: number;
}

export interface FlightSample {
  /** Interpolated orbit target (or the live body position, set by caller). */
  target: Vec3;
  /** Interpolated camera − target offset. */
  offset: Vec3;
  /** target + offset (the camera position to set). */
  pos: Vec3;
  /** Eased FOV (degrees) for this frame. */
  fov: number;
  done: boolean;
}

/**
 * Smooth cubic ease-in/ease-out. `x` in [0,1] -> eased [0,1]. Gives the
 * acceleration/deceleration: starts slow, fastens in the middle, settles
 * gently at the end.
 */
export function easeInOutCubic(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Unit vector from `a` to `b` ([0,1,0] if they coincide). */
export function dirTo(a: Vec3, b: Vec3): Vec3 {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
  const len = Math.hypot(dx, dy, dz);
  if (len < 1e-9) return [0, 1, 0];
  return [dx / len, dy / len, dz / len];
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

/** Fraction of the view height a picked body should fill at landing —
 *  "almost full screen," with a touch of headroom so it isn't edge-to-edge. */
const BODY_FILL = 0.9;

/**
 * Frame a single body of world position `center` from the current camera
 * position. `extent` is the body's full width in scene units (diameter for a
 * plain body, or the ring's outer diameter for a ringed planet, so the whole
 * body + rings land in frame). The destination keeps the current view bearing
 * (so it flies/rotates in from where you already are, rather than snapping to
 * an arbitrary angle) and pulls in until the body fills most of the view —
 * the "almost full screen" the user asked for on pick.
 */
export function frameBody(
  currentPos: Vec3,
  center: Vec3,
  extent: number,
  fovDeg: number,
): CamAnchor {
  // Keep the camera on the SAME side it already is: the bearing runs from
  // the body back toward the current camera position, so the fly-to rotates
  // in from the viewer's present vantage instead of swinging around the
  // far side of the body.
  const dir = dirTo(center, currentPos);
  const vHalf = (fovDeg * Math.PI) / 360; // half vertical fov
  // A body of width `extent` at distance `dist` fills
  //   extent / (2 * tan(vHalf) * dist)
  // of the view height. Set that to BODY_FILL and solve for `dist`. For a
  // ringed planet `extent` is the outer-ring diameter, which keeps the
  // camera safely outside the rings. Tiny absolute floor so we never skim a
  // sub-unit body's surface.
  const dist = Math.max(extent / (2 * BODY_FILL * Math.tan(vHalf)), 0.35);
  return {
    pos: [center[0] + dir[0] * dist, center[1] + dir[1] * dist, center[2] + dir[2] * dist],
    target: center,
  };
}

/**
 * Frame the whole solar system (Sun at the origin) so the farthest body
 * (radius `radius`, e.g. the outermost aphelion) fits with headroom, from a
 * pleasant ~25° elevation.
 */
export function frameSystem(radius: number, fovDeg: number): CamAnchor {
  const vHalf = (fovDeg * Math.PI) / 360;
  // The region within `radius` of the origin fits in 85% of the view height:
  //   radius = tan(vHalf) * dist * 0.85   =>   dist = radius / (0.85 tan)
  // The caller chooses what to include in `radius` (the main planets'
  // aphelia, or the full reach including dwarf planets).
  const dist = radius / (0.85 * Math.tan(vHalf));
  const elev = 0.42; // height = 0.42 * dist  (~25° above the ecliptic)
  return {
    pos: [0, dist * elev, dist * Math.sqrt(1 - elev * elev)],
    target: [0, 0, 0],
  };
}

/**
 * Deep-sky / constellations anchor: pull the camera back so the solar
 * system (radius `solarRadius`) shrinks to a small central cluster while the
 * constellation sky (a shell of radius `shellRadius`) fills the frame. The
 * camera is kept just inside the constellation shell so the sky wraps the
 * view rather than sitting in front of it.
 */
export function frameConstellations(
  shellRadius: number,
  solarRadius: number,
  fovDeg: number,
): CamAnchor {
  const vHalf = (fovDeg * Math.PI) / 360;
  // Solar system fills ~8% of the view height at `dist`.
  const fit = solarRadius / (0.08 * Math.tan(vHalf));
  // ...but stay inside the constellation shell (82%) so it surrounds us.
  const dist = Math.min(fit, shellRadius * 0.82);
  const elev = 0.35;
  return {
    pos: [0, dist * elev, dist * Math.sqrt(1 - elev * elev)],
    target: [0, 0, 0],
    // The constellations wrap the WHOLE celestial sphere, so a fixed 50° FOV
    // can only ever show a 50° cap of the sky no matter how far the camera
    // backs off. Widening the FOV is what actually reveals more constellations
    // at once — the "unzoom a bit more" the user asked for.
    fov: 78,
  };
}

/**
 * Advance a flight by `dt` seconds and return the camera pose for this
 * frame. Mutates `flight.t` (so it is stateful across frames). The caller
 * may override `sample.target` with a live body position (for a picked body)
 * and then use `add(sample.target, sample.offset)` as the camera position.
 */
export function stepFlight(flight: Flight, dtSeconds: number): FlightSample {
  flight.t += dtSeconds;
  const k = easeInOutCubic(flight.t / flight.duration);
  const lp = (a: number, b: number) => a + (b - a) * k;
  const target: Vec3 = [
    lp(flight.fromTarget[0], flight.toTarget[0]),
    lp(flight.fromTarget[1], flight.toTarget[1]),
    lp(flight.fromTarget[2], flight.toTarget[2]),
  ];
  const offset: Vec3 = [
    lp(flight.fromOffset[0], flight.toOffset[0]),
    lp(flight.fromOffset[1], flight.toOffset[1]),
    lp(flight.fromOffset[2], flight.toOffset[2]),
  ];
  const fov = flight.fromFov + (flight.toFov - flight.fromFov) * k;
  return { target, offset, pos: add(target, offset), fov, done: flight.t >= flight.duration };
}

/**
 * Build a Flight from the live camera pose to a `to` anchor. The flight
 * eases the FOV to `to.fov` when the anchor requests one (sky anchor),
 * otherwise it eases back to `defaultFov` so a wide sky view is never
 * silently retained by later flights.
 */
export function makeFlight(
  fromPos: Vec3,
  fromTarget: Vec3,
  to: CamAnchor,
  duration: number,
  followId: string | null,
  fromFov: number,
  defaultFov: number,
): Flight {
  return {
    fromTarget: fromTarget,
    fromOffset: sub(fromPos, fromTarget),
    toTarget: to.target,
    toOffset: sub(to.pos, to.target),
    duration,
    t: 0,
    followId,
    toFov: to.fov ?? defaultFov,
    fromFov,
  };
}
