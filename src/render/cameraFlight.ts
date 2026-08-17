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
 * reduce to an ordinary eased move.
 */

export type Vec3 = readonly [number, number, number];

export interface CamAnchor {
  /** World-space camera position. */
  pos: Vec3;
  /** World-space point the camera should orbit / look at. */
  target: Vec3;
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
}

export interface FlightSample {
  /** Interpolated orbit target (or the live body position, set by caller). */
  target: Vec3;
  /** Interpolated camera − target offset. */
  offset: Vec3;
  /** target + offset (the camera position to set). */
  pos: Vec3;
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

/**
 * Frame a single body of world position `center` and world radius `r` from
 * the current camera position: the destination keeps the current view
 * bearing (so it flies/rotates in from where you already are, rather than
 * snapping to an arbitrary angle) and pulls back until the body fills a
 * comfortable fraction of the view height.
 */
export function frameBody(
  currentPos: Vec3,
  center: Vec3,
  r: number,
  fovDeg: number,
): CamAnchor {
  // Keep the camera on the SAME side it already is: the bearing runs from
  // the body back toward the current camera position, so the fly-to rotates
  // in from the viewer's present vantage instead of swinging around the
  // far side of the body.
  const dir = dirTo(center, currentPos);
  const vHalf = (fovDeg * Math.PI) / 360; // half vertical fov
  // Body diameter (2r) fills ~15% of the view height at `dist`:
  //   2r = tan(vHalf) * dist * 0.15  =>  dist = 2r / (0.15 * tan(vHalf))
  let dist = (2 * r) / (0.15 * Math.tan(vHalf)) + r;
  // Floor so a tiny moon isn't absurdly close; never closer than 2 units.
  dist = Math.max(dist, r * 12, 2);
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
  // radius fits in 85% of the view height:  radius = tan(vHalf)*dist*0.85
  const dist = radius / (0.85 * Math.tan(vHalf)) + radius;
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
  return { target, offset, pos: add(target, offset), done: flight.t >= flight.duration };
}

/** Convenience: build a Flight from a `from`/`to` CamAnchor pair. */
export function makeFlight(
  fromPos: Vec3,
  fromTarget: Vec3,
  to: CamAnchor,
  duration: number,
  followId: string | null,
): Flight {
  return {
    fromTarget: fromTarget,
    fromOffset: sub(fromPos, fromTarget),
    toTarget: to.target,
    toOffset: sub(to.pos, to.target),
    duration,
    t: 0,
    followId,
  };
}
