/**
 * Camera flight: smooth eased transitions between "anchors" — the deep-sky
 * constellations, the whole solar system, and any picked body. Pure math, no
 * DOM / no three.js, so it is unit-tested in Node.
 *
 * `main.ts` owns the live PerspectiveCamera + OrbitControls and drives these
 * with `stepFlight` each frame. The transition eases both the camera
 * position and the orbit target with cubic in/out (slow start, fast middle,
 * gentle landing) — the "zoom + rotation with acceleration & deceleration"
 * the user asked for. FOV is held constant; the zoom comes from camera
 * distance, so there is no dolly-zoom distortion.
 */

export type Vec3 = readonly [number, number, number];

export interface CamAnchor {
  /** World-space camera position. */
  pos: Vec3;
  /** World-space point the camera should orbit / look at. */
  target: Vec3;
}

export interface Flight {
  fromPos: Vec3;
  fromTarget: Vec3;
  toPos: Vec3;
  toTarget: Vec3;
  /** Seconds for the whole move. */
  duration: number;
  /** Elapsed seconds. */
  t: number;
  /**
   * Body the flight is targeting (picked planet / moon). When set, the
   * orbit-target keeps tracking that body's live world position each frame
   * so the camera lands on the moving body, not where it was when the
   * flight started. `null` for the global anchors (Sun / constellations).
   */
  followId: string | null;
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

export interface FlightSample {
  pos: Vec3;
  target: Vec3;
  done: boolean;
}

/**
 * Advance a flight by `dt` seconds and return the camera pose for this
 * frame. Mutates `flight.t` (so it is stateful across frames).
 */
export function stepFlight(flight: Flight, dtSeconds: number): FlightSample {
  flight.t += dtSeconds;
  const k = easeInOutCubic(flight.t / flight.duration);
  const lp = (a: number, b: number) => a + (b - a) * k;
  return {
    pos: [lp(flight.fromPos[0], flight.toPos[0]),
           lp(flight.fromPos[1], flight.toPos[1]),
           lp(flight.fromPos[2], flight.toPos[2])],
    target: [lp(flight.fromTarget[0], flight.toTarget[0]),
             lp(flight.fromTarget[1], flight.toTarget[1]),
             lp(flight.fromTarget[2], flight.toTarget[2])],
    done: flight.t >= flight.duration,
  };
}
