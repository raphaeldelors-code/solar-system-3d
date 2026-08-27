/**
 * App entry: builds the Three.js scene, wires the control panel, and runs
 * the animation loop. The sim layer (src/sim) stays pure and is tested in
 * Node; everything DOM/WebGL lives here and in src/render.
 */
import * as THREE from 'three';
import { SimClock } from './sim/clock';
import { ALL_BODIES } from './data/bodies';
import { searchBodies, groupedBodyMenu } from './data/searchIndex';
import {
  searchConstellations,
  constellationMenu,
  CONSTELLATION_ID_PREFIX,
} from './data/constellationSearch';
import {
  buildScene,
  updatePositions,
  applySpin,
  updateBeltFields,
  satelliteExtentScene,
  updateBodyHighlight,
  constellationCenter,
  constellationEmphasis,
  constellationEmphasisOpacity,
  constellationLabelPose,
  constellationPresence,
  updateConstellationHighlight,
  updateConstellationFigureHighlights,
  lerpScale,
  applyScaleMorph,
  reprojectOrbitLine,
  resampleMoonOrbitLine,
  VISIBLE_SCALE,
  TRUE_SCALE,
  CONSTELLATION_RADIUS,
  type BuiltScene,
  type VisualScale,
} from './render/scene';
import { CONSTELLATIONS } from './data/constellations';
import {
  frameBody,
  frameSystem,
  frameConstellations,
  frameConstellation,
  stepFlight,
  makeFlight,
  easeInOutCubic,
  type CamAnchor,
  type Flight,
} from './render/cameraFlight';
import { attachRealTextures } from './render/realTextures';
import { orbitReadout, formatPeriod, formatDistanceKm } from './sim/orbitInfo';
import { parseAppState, encodeAppState, type ViewState } from './state/urlState';
import { findEvents, type Event as SimEvent } from './sim/events';
import { J2000_UTC } from './sim/types';

// PWA: register the offline service worker in production builds only
// (vite preview / dev use a live server; a cached shell would be confusing).
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      /* offline support is a nicety; never block the app on it */
    });
  });
}

// Sky tour: after the Sky anchor's flight lands, no single static view can
// show all 88 constellations — they cover the entire celestial sphere (decl
// −90°…+90°, full RA), so no finite FOV fits them in one frame.
// So the camera pans around the origin in a gentle panorama, sweeping every
// constellation into view in turn; any user input stops it. `skyTour` holds
// the camera's spherical pose around the origin.
const SKY_TOUR_YAW = 0.15; // rad/s of azimuth — a full lap in ~42 s
let skyTour: { theta: number; phi: number; radius: number } | null = null;
// Armed by `flyTo` when the destination is the Sky anchor; the render loop
// starts the tour from the landed pose once the flight finishes.
let pendingSkyTour = false;

function stopSkyTour(): void {
  if (!skyTour) return;
  skyTour = null;
  built.controls.enabled = true;
  built.controls.update();
}

// Begin the panorama from wherever the sky flight just landed, so there is
// no visible jump: seed the spherical pose from the live camera position.
function startSkyTour(): void {
  const p = built.camera.position;
  const radius = p.length();
  if (radius < 1e-6) return;
  const phi = Math.acos(Math.min(1, Math.max(-1, p.y / radius)));
  const theta = Math.atan2(p.x, p.z);
  skyTour = { theta, phi, radius };
  built.controls.enabled = false;
}

// One frame of the panorama: advance the azimuth, keep elevation + distance,
// and look back at the origin so the solar system stays centred.
function advanceSkyTour(dtSeconds: number): void {
  if (!skyTour) return;
  skyTour.theta += SKY_TOUR_YAW * dtSeconds;
  const { theta, phi, radius } = skyTour;
  const sinPhi = Math.sin(phi);
  built.camera.position.set(
    radius * sinPhi * Math.sin(theta),
    radius * Math.cos(phi),
    radius * sinPhi * Math.cos(theta),
  );
  // De-roll (plan 015 P2): keep the sweep level even if the camera was rolled
  // before the tour started (lookAt honors camera.up).
  deRollCameraUp(1);
  built.camera.lookAt(0, 0, 0);
}

// Any manual camera input ends the tour (drag to orbit, wheel, pan, or the
// user picking a body / another anchor).
for (const ev of ['pointerdown', 'wheel', 'keydown', 'touchstart']) {
  window.addEventListener(ev, stopSkyTour, { passive: true });
}

// --- Constellation proximity highlight (D4) ------------------------------
// The dome is static and the camera moves, so each figure's center DIRECTION
// is precomputed once; per frame it's one dot-product per constellation
// (88 total) between that direction and the camera's view axis. Throttled
// to ~5 Hz and skipped entirely when the camera pose is unchanged — the
// feature costs nothing while idle.
const CONSTELLATION_CENTER_DIRS = CONSTELLATIONS.map((c) => constellationCenter(c));
// Figure far-tip angular half-extents (plan 010): precomputed once for the
// constellation fly-to's zoom solve (frameConstellation). Same geometry the
// label solver uses, so the framing and the label side agree.
const CONSTELLATION_HALF_EXTENT = CONSTELLATIONS.map((c) => constellationLabelPose(c).halfExtent);
const CONSTELLATION_EMPHASES = new Float32Array(CONSTELLATIONS.length);
const HIGHLIGHT_INTERVAL_MS = 200; // ~5 Hz
let lastHighlightMs = 0;
let lastHighlightPoseKey = '';
const HIGHLIGHT_FWD = new THREE.Vector3();
// Scratch: previous follow-pivot position (Trackball follow-mode delta, below).
const _followPrevPivot = new THREE.Vector3();
// Scratch: de-roll vectors (plan 015 P2 flights/sky tour ease camera.up back
// to a canonical frame — see deRollCameraUp).
const _deRollDir = new THREE.Vector3();
const _deRollRef = new THREE.Vector3();
const _deRollUp = new THREE.Vector3();
const _deRollQ = new THREE.Quaternion();
const _deRollIdentity = new THREE.Quaternion();

/**
 * Ease `camera.up` back toward a canonical, un-rolled frame (plan 015 P2).
 * Trackball rotation rolls camera.up freely (that is what allows rotating
 * OVER a pole), but flight + sky-tour poses are driven by lookAt(), which
 * honors camera.up — so a rolled up would land/pan the view sideways. Blend
 * toward the canonical up perpendicular to the view direction: world +Y,
 * falling back to world +Z when the view looks near-vertically.
 * @param t 0..1 blend (1 = fully canonical)
 */
function deRollCameraUp(t: number): void {
  if (t <= 0) return;
  // Forward = view axis (camera -> target).
  _deRollDir.subVectors(built.controls.target, built.camera.position).normalize();
  // Canonical up = world +Y projected perpendicular to the view axis — the
  // standard "north on top" frame (a cross product would be 90° off, landing
  // the view sideways). Fall back to world +Z when the view is near-vertical,
  // where +Y is (almost) parallel to the view axis and the projection degenerates.
  _deRollRef.set(0, 1, 0);
  if (Math.abs(_deRollDir.dot(_deRollRef)) > 0.99) _deRollRef.set(0, 0, 1);
  // u = ref - f * (ref . f), normalized -> the nearest perpendicular to f.
  _deRollUp.copy(_deRollRef).addScaledVector(_deRollDir, -_deRollRef.dot(_deRollDir)).normalize();
  // q rotates current up -> canonical up; slerping it toward identity by
  // (1 - t) keeps only the fraction t of that rotation, applied in-place.
  _deRollQ.setFromUnitVectors(built.camera.up, _deRollUp).slerp(_deRollIdentity, 1 - t);
  built.camera.up.applyQuaternion(_deRollQ);
}

function updateConstellationHighlightThrottled(nowMs: number): void {
  if (nowMs - lastHighlightMs < HIGHLIGHT_INTERVAL_MS) return;
  const cp = built.camera.position;
  // Include the pick in the gate: a selection change must force a highlight
  // refresh even if the camera is parked (plan 010).
  const key = `${cp.x.toFixed(2)}|${cp.y.toFixed(2)}|${cp.z.toFixed(2)}|${built.camera.quaternion.w.toFixed(3)}|${selectedConstellation}`;
  if (key === lastHighlightPoseKey) return;
  lastHighlightMs = nowMs;
  lastHighlightPoseKey = key;
  // Camera forward = its local −Z expressed in world space.
  HIGHLIGHT_FWD.set(0, 0, -1).applyQuaternion(built.camera.quaternion);
  const vx = HIGHLIGHT_FWD.x,
    vy = HIGHLIGHT_FWD.y,
    vz = HIGHLIGHT_FWD.z;
  // Plan 015 P5: nearest figure by TRUE angular distance (the D4 emphasis
  // saturates at 1 within 22°, so a max-emphasis test would tie several
  // figures). One argmin per refresh — 88 dot products at ~5 Hz.
  let nearestIdx = -1;
  let bestDot = -Infinity;
  for (let i = 0; i < CONSTELLATION_CENTER_DIRS.length; i++) {
    const d = CONSTELLATION_CENTER_DIRS[i];
    CONSTELLATION_EMPHASES[i] = constellationEmphasis(d, [vx, vy, vz]);
    const dot = d[0] * vx + d[1] * vy + d[2] * vz;
    if (dot > bestDot) {
      bestDot = dot;
      nearestIdx = i;
    }
  }
  // Camera-distance presence (plan 003 P4): the sky is a full-sphere
  // wraparound, so in a body close-up it sweeps across the whole frame and
  // dominates. Fade the whole sky (lines, names, star dots) to 0.25× up
  // close and back to 1.0× by the Sky-anchor distance — smooth in both
  // directions, never fully off.
  const presence = constellationPresence(built.camera.position.length());
  updateConstellationHighlight(
    built.constellations,
    CONSTELLATION_EMPHASES,
    presence,
    selectedConstellation || null,
    nowMs / 1000,
    nearestIdx,
  );
  // Plan 012: the constellation figures breathe with the same curves.
  if (figuresOn) {
    updateConstellationFigureHighlights(
      built.constellationFigures,
      CONSTELLATION_EMPHASES,
      presence,
    );
  }
}

/**
 * Per-frame breathing pulse on the picked constellation's lines (plan 010):
 * the pose-gated highlight above only refreshes when the camera moves, so the
 * gold line's opacity would freeze if the user parks the view. This runs every
 * frame (one material write) so the pulse stays smooth.
 */
function updatePickedConstellationPulse(nowMs: number): void {
  if (!selectedConstellation) return;
  const child = built.constellations.children.find(
    (o) => o.name === `constellation-lines:${selectedConstellation}`,
  ) as THREE.LineSegments | undefined;
  if (child) {
    // NOTE: deliberately NOT multiplied by constellationPresence — the sky
    // presence dims the sky when the camera is near a body, but the picked
    // figure's emphasis must stay fully visible at ANY distance (the S4
    // sky-dome view parks the camera at ~600 units, where presence ≈ 0.55
    // would half-dim the gold we just flew to). The figure is what the user
    // asked to see.
    (child.material as THREE.LineBasicMaterial).opacity = constellationEmphasisOpacity(
      nowMs / 1000,
    );
  }
}

const canvas = document.getElementById('app') as HTMLCanvasElement;
const dateEl = document.getElementById('date') as HTMLSpanElement;
const speedEl = document.getElementById('speed') as HTMLInputElement;
const speedValueEl = document.getElementById('speed-value') as HTMLSpanElement;
const pauseBtn = document.getElementById('pause') as HTMLButtonElement;
const reverseBtn = document.getElementById('reverse') as HTMLButtonElement;
const nowBtn = document.getElementById('now') as HTMLButtonElement;
const findInputEl = document.getElementById('find') as HTMLInputElement;
const findListEl = document.getElementById('find-list') as HTMLDivElement;
const orbitsEl = document.getElementById('orbits') as HTMLInputElement;
const labelsEl = document.getElementById('labels') as HTMLInputElement;
const beltsEl = document.getElementById('belts') as HTMLInputElement;
const figuresEl = document.getElementById('figures') as HTMLInputElement;
let figuresOn = false;
const shareBtn = document.getElementById('share') as HTMLButtonElement;
const screenshotBtn = document.getElementById('screenshot') as HTMLButtonElement;
const tooltipEl = document.getElementById('tooltip') as HTMLDivElement;
const infoEl = document.getElementById('info') as HTMLDivElement;
const glLostEl = document.getElementById('gl-lost') as HTMLDivElement;
const glReloadBtn = document.getElementById('gl-reload') as HTMLButtonElement;
const infoNameEl = document.getElementById('info-name') as HTMLDivElement;
const infoPeriodEl = document.getElementById('info-period') as HTMLSpanElement;
const infoDistanceEl = document.getElementById('info-distance') as HTMLSpanElement;
const infoRangeEl = document.getElementById('info-range') as HTMLSpanElement;
const infoLabel1El = document.getElementById('info-label-1') as HTMLSpanElement;
const infoLabel2El = document.getElementById('info-label-2') as HTMLSpanElement;
const infoLabel3El = document.getElementById('info-label-3') as HTMLSpanElement;
const eventsToggleBtn = document.getElementById('events-toggle') as HTMLButtonElement;
const eventsRangeEl = document.getElementById('events-range') as HTMLSelectElement;
const eventsRowEl = document.getElementById('events-row') as HTMLDivElement;
const eventsListEl = document.getElementById('events-list') as HTMLDivElement;
const datePickEl = document.getElementById('date-pick') as HTMLInputElement;

const byId = new Map(ALL_BODIES.map((b) => [b.id, b]));

// id -> parent id for quick "which planet owns this satellite" lookups.
const moonParent = new Map<string, string>(
  ALL_BODIES.filter((b) => b.kind === 'moon' && b.parent).map((m) => [m.id, m.parent as string]),
);

const clock = new SimClock(Date.now());
// `!`: definitely assigned by the initial rebuildScene(scale) call below;
// TS can't see the assignment through the function boundary.
let built!: BuiltScene;
let scale: VisualScale = VISIBLE_SCALE;
let followId = '';
/**
 * Currently highlighted body — a planet OR a moon (plan 015 P6). The
 * follow/camera can be on the parent planet while the selected satellite
 * stays lit — that's how "pick a satellite" works: planet+all-orbits view
 * + highlighted moon. A planet pick lights ITS OWN heliocentric orbit.
 * '' = nothing picked.
 */
let selectedBodyId = '';
/**
 * The constellation picked from the find box (plan 010, S4): its figure's
 * lines take the warm-gold emphasis color + a breathing pulse to stand out
 * from the other 87. '' = nothing picked (all figures in the base blue).
 */
let selectedConstellation = '';
let lastDays = clock.t;
let lastMs = performance.now();
// Throttle for the per-frame Moon orbit-line resample (see the frame loop).
let lastMoonResampleMs = 0;
// True while the WebGL context is down (driver reset / tab reclaimed). The
// render loop keeps ticking its rAF chain but skips all sim + GPU work until
// the browser fires `webglcontextrestored`, so a lost context costs nothing
// and the view comes back on its own (no forced reload).
let contextLost = false;
// Active camera flight (anchor / picked-body). `null` when no flight is in
// progress; the render loop advances it and hands control back to the free
// TrackballControls when it lands.
let flight: Flight | null = null;

// --- Scale toggle (B3) ------------------------------------------------------
// One control, two states: "Visible scale" (the default exaggerated layout)
// and "Real scale" (true physical sizes + distances). Flipping it runs a
// 3 s eased MORPH between the two — the render loop advances `morph`
// (0 = visible, 1 = real) each frame and applies the blended scale
// `lerpScale(VISIBLE_SCALE, TRUE_SCALE, ease(p))` to body positions, belts
// and orbit lines, plus the blended radii via `applyScaleMorph`. Flipping
// mid-morph reverses smoothly from the current progress (dir = target - p).
// The baked mesh is always visible-mode geometry, so the morph (or a parked
// real-scale state) must keep driving `applyScaleMorph` every frame.
const MORPH_DUR = 3.0; // seconds, each way

interface ScaleMorph {
  /** "How real" 0..1 (eased with easeInOutCubic when applied). */
  p: number;
  /** Direction of travel: +1 → real scale, -1 → visible scale. 0 = parked. */
  dir: 1 | -1 | 0;
  /** Set once the post-arrival "System" reframe flight has been started. */
  reframed: boolean;
}

let morph: ScaleMorph | null = null;
// Segment switch (plan 003 P2): BOTH options are always on screen — the lit
// one is the mode the view is in or heading to. Replaced the old single
// label-flipping button whose state had to be read off the text.
const scaleRealEl = document.getElementById('scale-real') as HTMLButtonElement | null;
const scaleVisibleEl = document.getElementById('scale-visible') as HTMLButtonElement | null;
const scaleCaptionEl = document.getElementById('scale-caption') as HTMLDivElement | null;

/** Staged narration — thresholds on the eased "how real" value. */
const MORPH_CAPTIONS: [at: number, text: string][] = [
  [0.0, 'Morphing to real scale…'],
  [
    0.2,
    'Sizes snap to reality — the default view exaggerates radii ~300× (Sun) to ~40,000× (Earth).',
  ],
  [0.5, 'Distances snap to reality — Earth is 150 million km from the Sun, not 15 units.'],
  [0.8, 'At real scale Neptune is 4.5 BILLION km out. Most of this view is empty space.'],
];

function morphCaption(p: number): string {
  let text = MORPH_CAPTIONS[0][1];
  for (const [at, t] of MORPH_CAPTIONS) if (p >= at) text = t;
  return text;
}

/** The switch mode the view is in, or heading to while a morph runs. */
function scaleTarget(): 'real' | 'visible' {
  if (morph) {
    // While moving, light the DESTINATION (the option being clicked);
    // when parked (dir 0), light where we landed (p=1 ⇒ real).
    if (morph.dir === 0) return morph.p >= 0.5 ? 'real' : 'visible';
    return morph.dir === 1 ? 'real' : 'visible';
  }
  return scale === TRUE_SCALE ? 'real' : 'visible';
}

function syncScaleUI(): void {
  const real = scaleTarget() === 'real';
  for (const el of [scaleRealEl, scaleVisibleEl]) {
    if (!el) continue;
    const active = el === scaleRealEl ? real : !real;
    el.classList.toggle('active', active);
    el.setAttribute('aria-checked', String(active));
  }
  if (!scaleCaptionEl) return;
  scaleCaptionEl.hidden = !morph;
  if (morph) {
    scaleCaptionEl.textContent =
      morph.dir === -1
        ? 'Returning to the visible view…'
        : morph.dir === 0
          ? 'Real scale — sizes and distances to the same ratio. Toggle back any time.'
          : morphCaption(easeInOutCubic(morph.p));
  }
}

/** Reached an end of the current morph leg: park, or drop the morph at p=0. */
function morphEnd(): void {
  if (!morph) return;
  if (morph.p >= 1) {
    // Park at real scale. Positions/orbits already sit exactly on TRUE_SCALE
    // at p=1; keep the morph ALIVE at p=1 so `applyScaleMorph` keeps driving
    // body radii (the baked meshes are still the visible-mode geometry), and
    // make `scale` authoritative for the URL and anchor framing.
    morph = { p: 1, dir: 0, reframed: false };
    scale = TRUE_SCALE;
  } else {
    // p=0: the blended layout equals the baked visible-mode scene exactly,
    // so the morph can be dropped with no visual change.
    morph = null;
    scale = VISIBLE_SCALE;
  }
  syncScaleUI();
  syncUrl();
}

/**
 * Drive the scale switch toward `target`. Clicking the option already
 * lit does nothing (idempotent); clicking the other one reverses a
 * mid-morph from the current progress instead of restarting it.
 */
function requestScale(target: 'real' | 'visible'): void {
  if (scaleTarget() === target) return;
  if (morph && morph.dir !== 0) {
    // Mid-morph: reverse from the current progress (p stays as-is).
    morph.dir = target === 'real' ? 1 : -1;
    morph.reframed = false;
  } else if (target === 'real') {
    // Visible (or mid-restore) state: head to real scale from p=0.
    flight = null; // cancel any in-progress flight; the camera stays free
    stopSkyTour();
    morph = { p: 0, dir: 1, reframed: false };
  } else {
    // At real scale (parked p=1, or a URL-restored true-scale load with no
    // morph): head back to visible from p=1.
    flight = null;
    stopSkyTour();
    morph = { p: 1, dir: -1, reframed: false };
  }
  syncScaleUI();
}

/**
 * Re-sample the Moon's orbit line at the live sim time RIGHT NOW (bypassing
 * the frame-loop throttle). Called on date jumps (picker, "Now", event
 * clicks) so the first frame after the jump already shows the line at the
 * new epoch instead of waiting out the ~250 ms throttle.
 */
function resampleMoonNow(): void {
  const moonEntry = built.bodies.get('moon');
  if (moonEntry?.orbit) resampleMoonOrbitLine(moonEntry.orbit, clock.t, scale);
  lastMoonResampleMs = performance.now();
}

function rebuildScene(newScale: VisualScale): BuiltScene {
  if (built) built.dispose();
  built = buildScene(canvas, ALL_BODIES, newScale);
  // keep the shareable URL in sync as the user moves the camera
  built.controls.addEventListener('change', syncUrl);
  // re-attach moon orbits to parent pivots
  for (const entry of built.bodies.values()) {
    if (entry.orbit && entry.parent) {
      entry.parent.pivot.add(entry.orbit);
    }
  }
  applyToggles();
  updatePositions(built, clock.t, scale);
  // Optional real NASA textures: probe public/textures/<id>.jpg and swap them
  // over the procedural maps when present. Fire-and-forget (async decode);
  // the probe+texture caches make repeat rebuilds cheap no-ops.
  const texLoader = new THREE.TextureLoader();
  void attachRealTextures(built.bodies.values(), texLoader);
  // re-frame camera on follow target
  if (followId) {
    const entry = built.bodies.get(followId);
    if (entry) {
      const d = scale.followDistanceKm(entry.def.radiusKm);
      built.controls.target.copy(entry.worldPos);
      built.camera.position.copy(entry.worldPos).add(new THREE.Vector3(d, d * 0.6, d));
    }
  }
  return built;
}

// --- Camera anchors & flight ----------------------------------------------
// Three "Visible" mode anchors + a smooth eased fly-to between them. The
// framing math lives in render/cameraFlight.ts (pure & unit-tested); here we
// just read the live camera pose, compute a destination, and hand the flight
// to the render loop.

const FOV_DEG = 50; // matches the PerspectiveCamera in buildScene

/**
 * Farthest heliocentric scene extent in the current scale (outermost
 * aphelion). With `planetsOnly` the dwarf planets are excluded, so the
 * System anchor frames the eight main planets (the dwarfs' distant orbits
 * would just stretch the frame out to nothing useful).
 */
function systemRadius(planetsOnly = false): number {
  let maxR = 0;
  for (const entry of built.bodies.values()) {
    const el = entry.def.elements;
    if (!el) continue;
    // a is in AU -> map through the scale's distance ramp at aphelion
    // (a(1+e)). The ramp's linear extension past the last anchor keeps the
    // farthest orbit inside the frame.
    if (entry.def.kind === 'planet' || (!planetsOnly && entry.def.kind === 'dwarf')) {
      const apoAu = el.a * (1 + el.e);
      maxR = Math.max(maxR, scale.planetDistance(apoAu));
    }
  }
  return Math.max(maxR, 1);
}

function camAnchorFor(name: 'system' | 'constellations'): CamAnchor {
  if (name === 'constellations') {
    return frameConstellations(CONSTELLATION_RADIUS, systemRadius(), FOV_DEG);
  }
  // Main planets only: the dwarfs (Pluto..Makemake) are far out and would
  // over-zoom the frame; the user wants the main planets captured here.
  // fill 0.95 (vs 0.85) pulls the camera in so the planets' orbits fill the
  // view rather than leaving a wide empty margin.
  return frameSystem(systemRadius(true), FOV_DEG, 0.95);
}

function camAnchorForBody(id: string): CamAnchor | null {
  const entry = built.bodies.get(id);
  if (!entry) return null;
  // The framing target is always the body itself — or its parent planet when
  // a satellite is picked. Both a planet pick and one of its satellite picks
  // produce the SAME view: planet + all of its satellite orbits filling the
  // screen. The selected moon is distinguished by its highlight ring (see
  // `selectedSatelliteId`), not by a separate close-up. This also keeps the
  // camera locked to the (slow) planet rather than whipping around with the
  // fast moon.
  const planetId = moonParent.get(id) ?? id;
  const planet = built.bodies.get(planetId) ?? entry;
  const satExtent = satelliteExtentScene(planetId, scale);
  // Framing extent: the planet's own disc, widened to span the full
  // satellite system (2× outermost orbit + planet radius) when present.
  const extent = Math.max(
    planet.frameExtent,
    satExtent > 0 ? 2 * satExtent + planet.sceneRadius : 0,
  );
  // Pass the live canvas aspect so the framing solves for the tighter of the
  // vertical/horizontal FOV — a wide satellite system then always lands with
  // margin on landscape screens, never full-screen or cut off (plan 008 S3).
  return frameBody(
    [planet.worldPos.x, planet.worldPos.y, planet.worldPos.z],
    extent,
    FOV_DEG,
    built.camera.aspect,
  );
}

/**
 * Sky-dome anchor for a picked constellation (plan 010, S4): the camera
 * moves to sit on the figure's own direction line at `CONSTELLATION_RADIUS /
 * 8` (600 units) from the origin, looking outward at the dome — the Sun is
 * then directly behind the camera. The FOV is solved (in
 * `frameConstellation`) so the figure's far tip fills ~55 % of the smaller
 * screen axis with a safe margin: small figures zoom in, the largest (Hydra)
 * clamp at 120° and can be panned.
 */
function camAnchorForConstellation(name: string): CamAnchor | null {
  const idx = CONSTELLATIONS.findIndex((c) => c.name === name);
  if (idx < 0) return null;
  return frameConstellation(
    CONSTELLATION_CENTER_DIRS[idx],
    CONSTELLATION_HALF_EXTENT[idx],
    CONSTELLATION_RADIUS,
    CONSTELLATION_RADIUS / 8, // 600 units from the origin — "inside the dome"
    built.camera.aspect,
  );
}

/**
 * Start an eased flight from the current camera pose to `dest`.
 * `bodyId` (optional) is the picked body being tracked — the orbit-target
 * follows its live position each frame so a fast-moving planet isn't landed
 * behind; leave `null` for the global Sun / constellations anchors.
 */
function flyTo(dest: CamAnchor, duration = 1.4, bodyId: string | null = null, sky = false): void {
  // Picking a body arms the follow so after landing the camera keeps it
  // centered (the existing follow behavior). Global anchors clear it.
  // For satellites the CAMERA locks to the parent planet (see followLockId),
  // while the follow/selection stays on the moon for info + highlight.
  followId = bodyId ?? '';
  setFindValue(followId);
  // Plan 015 P6: the picked body gets the blue ring + its orbit line lit —
  // a MOON (ring on the moon, its orbit) or a PLANET (ring on the planet,
  // its heliocentric orbit). The Sun has no orbit line (ring only).
  selectedBodyId = bodyId ?? '';
  // Every pick that is NOT a constellation clears the gold emphasis (plan
  // 015 P1): global anchors (Sky/System) pass bodyId=null, so the clear must
  // be unconditional — a parked camera otherwise keeps the gold (the
  // highlight pass is pose-gated and would not refresh on its own).
  selectedConstellation = '';
  lastHighlightPoseKey = ''; // force a highlight refresh even mid-flight
  syncUrl(); // shareable state follows the pick: c= cleared when a body is chosen
  // A Sky landing kicks off the panoramic tour; any other flight cancels it.
  stopSkyTour();
  pendingSkyTour = sky;
  updateInfo();
  // Build the flight from the live camera pose (pos + orbit target). The
  // offset-lerp form keeps a moving picked body rigidly framed; global
  // anchors have a static origin target so they reduce to an eased move.
  // For satellites the flight tracks the PLANET (dest is already aimed at
  // the planet, and following the planet keeps the view from whirling with
  // the fast moon).
  const trackId = bodyId ? (moonParent.has(bodyId) ? moonParent.get(bodyId)! : bodyId) : null;
  // The FOV eases to the anchor's requested value (sky anchor widens it)
  // or back to the default so a wide sky view is never retained.
  flight = makeFlight(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    dest,
    duration,
    trackId,
    built.camera.fov,
    FOV_DEG,
  );
}

/**
 * Fly to a picked constellation (plan 010, S4): move to the sky-dome anchor
 * that centres the figure, light its lines gold, and drop any body follow.
 * The figure is static (the sky doesn't move), so no body tracking is needed
 * — the flight lands and hands the camera back to TrackballControls looking
 * out at the dome. Re-picking the same constellation re-flies (harmless);
 * picking a different one moves the gold emphasis over.
 */
function flyToConstellation(name: string): void {
  const dest = camAnchorForConstellation(name);
  if (!dest) return; // unknown name — ignore
  selectedConstellation = name; // arm the gold emphasis (before the flight so it shows)
  followId = ''; // a constellation pick is not a body follow
  selectedBodyId = '';
  stopSkyTour();
  pendingSkyTour = false;
  lastHighlightPoseKey = ''; // force the highlight pass to refresh on the next frame
  updateInfo();
  flight = makeFlight(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    dest,
    1.6,
    null,
    built.camera.fov,
    FOV_DEG,
  );
  syncUrl();
}

// Anchor buttons. `data-anchor` distinguishes the two global presets; a
// per-body button (or a pick) flies to that body instead.
function wireAnchorButtons(): void {
  const bar = document.getElementById('anchors');
  if (!bar) return;
  bar.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('button[data-fly]');
    if (!btn) return;
    const fly = btn.dataset.fly!;
    if (fly === 'system') flyTo(camAnchorFor('system'), 1.6);
    else if (fly === 'constellations') flyTo(camAnchorFor('constellations'), 1.8, null, true);
    else {
      const dest = camAnchorForBody(fly);
      if (dest) flyTo(dest, 1.4, fly);
    }
    syncUrl();
  });
  // Real/Visible scale switch (B3, plan 003 P2): both options always
  // visible; clicking the unlit one morphs there (reverses mid-morph),
  // clicking the lit one is a no-op.
  scaleRealEl?.addEventListener('click', () => requestScale('real'));
  scaleVisibleEl?.addEventListener('click', () => requestScale('visible'));
}

function applyToggles(): void {
  for (const entry of built.bodies.values()) {
    if (entry.orbit) (entry.orbit.material as THREE.Material).visible = orbitsEl.checked;
    entry.label.visible = labelsEl.checked;
  }
  // Constellation NAME labels follow the Labels toggle (D3); the sky lines
  // and star dots are always present — they are the sky itself.
  for (const child of built.constellations.children) {
    if (child.name.startsWith('constellation-label:')) child.visible = labelsEl.checked;
  }
  for (const field of built.belts) {
    field.mesh.visible = beltsEl.checked;
  }
  // Plan 012: constellation figures (the "Figures" toggle). The per-figure
  // fade runs in the highlight pass; here we just switch the group.
  built.constellationFigures.visible = figuresOn;
}

function fmtSpeed(): void {
  const s = clock.getSpeed();
  // The slider is a MAGNITUDE (log10 days/second, can go well below 1 for
  // slow satellite observation); direction lives on the Reverse toggle.
  // Show the direction explicitly so a reversed sim is never ambiguous.
  const arrow = clock.isReversed ? '← ' : '';
  const a = Math.abs(s);
  // Below 0.1 d/s show "h/s" (hours per second) — the satellite-observation
  // range reads better that way than 0.0x d/s.
  let mag: string, unit: string;
  if (a >= 100) {
    mag = a.toFixed(0);
    unit = 'd/s';
  } else if (a >= 1) {
    mag = a.toFixed(1);
    unit = 'd/s';
  } else if (a >= 0.1) {
    mag = a.toFixed(2);
    unit = 'd/s';
  } else {
    mag = (a * 24).toFixed(2);
    unit = 'h/s';
  }
  speedValueEl.textContent = `${arrow}${mag} ${unit}`;
}

function fmtDate(): void {
  const d = clock.toDate();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  dateEl.textContent = `${y}-${m}-${day} ${h}:${min} UTC`;
  // Keep the date picker in sync (it shows the calendar day the sim clock is
  // on). Setting .value programmatically never fires 'change', so this can't
  // loop with the picker's own change handler. Skip while the user is
  // actively editing the picker (it's only a date input, but don't clobber
  // an in-progress keyboard entry).
  if (document.activeElement !== datePickEl) {
    const pick = `${y}-${m}-${day}`;
    if (datePickEl.value !== pick) datePickEl.value = pick;
  }
}

/**
 * Jump the sim clock to the date picked in the calendar input, keeping the
 * current time of day. Invalid / cleared input is ignored.
 */
function applyDatePick(): void {
  const raw = datePickEl.value;
  if (!raw) return;
  const [y, m, day] = raw.split('-').map(Number);
  if (!y || !m || !day) return;
  const cur = clock.toDate();
  const target = new Date(Date.UTC(y, m - 1, day, cur.getUTCHours(), cur.getUTCMinutes()));
  if (Math.abs(target.getTime() - cur.getTime()) < 60_000) return; // same day
  clock.setDate(target);
  resampleMoonNow(); // Moon orbit line jumps with the epoch
  dateEl.classList.remove('flash');
  void dateEl.offsetWidth;
  dateEl.classList.add('flash');
  if (eventsVisible()) refreshEvents();
  syncUrl();
}

/**
 * Panel info card. Shows the followed body's orbital readout, or — when a
 * constellation is picked from the find box (plan 010, S4) and no body is
 * followed — the figure's sky center + star count (orbit rows are reused for
 * center RA / center Dec / star count).
 */
function updateInfo(): void {
  if (!followId) {
    if (selectedConstellation) {
      const idx = CONSTELLATIONS.findIndex((c) => c.name === selectedConstellation);
      const c = idx >= 0 ? CONSTELLATIONS[idx] : undefined;
      if (!c) {
        infoEl.hidden = true;
        return;
      }
      const [dx, dy, dz] = CONSTELLATION_CENTER_DIRS[idx];
      const decDeg = (Math.asin(Math.min(1, Math.max(-1, dy))) * 180) / Math.PI;
      let raH = (Math.atan2(-dz, -dx) * 180) / Math.PI / 15;
      if (raH < 0) raH += 24;
      infoEl.hidden = false;
      infoNameEl.textContent = `${c.name} — constellation`;
      infoLabel1El.textContent = 'Center RA';
      infoLabel2El.textContent = 'Center Dec';
      infoLabel3El.textContent = 'Stars';
      infoPeriodEl.textContent = `${raH.toFixed(1)}h`;
      infoDistanceEl.textContent = `${decDeg >= 0 ? '+' : ''}${decDeg.toFixed(1)}°`;
      infoRangeEl.textContent = `${c.stars.length} stars`;
      return;
    }
    infoEl.hidden = true;
    return;
  }
  const def = byId.get(followId);
  const r = def ? orbitReadout(def, clock.t) : null;
  if (!def || !r) {
    infoEl.hidden = true;
    return;
  }
  infoEl.hidden = false;
  infoNameEl.textContent = def.name;
  infoLabel1El.textContent = 'Orbit period';
  infoLabel2El.textContent = 'Distance';
  infoLabel3El.textContent = 'Peri / Apo';
  infoPeriodEl.textContent = formatPeriod(r.periodDays);
  infoDistanceEl.textContent =
    def.kind === 'moon'
      ? `${formatDistanceKm(r.distanceKm)} from ${byId.get(def.parent ?? '')?.name ?? 'parent'}`
      : `${formatDistanceKm(r.distanceKm)} from Sun`;
  infoRangeEl.textContent = `${formatDistanceKm(r.perihelionKm)} / ${formatDistanceKm(r.aphelionKm)}`;
}

// --- UI wiring -------------------------------------------------------------

speedEl.addEventListener('input', () => {
  clock.setLogSpeed(parseFloat(speedEl.value));
  fmtSpeed();
  syncUrl();
});

pauseBtn.addEventListener('click', () => {
  clock.setPaused(!clock.isPaused);
  pauseBtn.textContent = clock.isPaused ? 'Resume' : 'Pause';
  syncUrl();
});

// Time direction is a toggle, NOT part of the slider: the slider stays a
// pure magnitude so slow satellite observation is available in BOTH
// directions (the old signed slider made "slow" only reachable one way).
reverseBtn.addEventListener('click', () => {
  clock.setReversed(!clock.isReversed);
  reverseBtn.textContent = clock.isReversed ? 'Reverse ←' : 'Reverse →';
  reverseBtn.classList.toggle('active', clock.isReversed);
  fmtSpeed();
  syncUrl();
});

nowBtn.addEventListener('click', () => {
  clock.setDate(new Date());
  resampleMoonNow(); // Moon orbit line jumps with the epoch
  syncUrl();
});

// --- Celestial events (B1) -------------------------------------------------
// Scan a window around "now" for eclipses, transits, conjunctions, oppositions
// and Saturn ring edge-ings; render them as a clickable list. Clicking an
// event jumps the sim clock to that instant and flies to the relevant body.

function eventsVisible(): boolean {
  return !eventsRowEl.hidden;
}

function setComputing(msg: string): void {
  eventsListEl.textContent = msg;
  eventsListEl.classList.add('computing');
}

function clearComputing(): void {
  eventsListEl.classList.remove('computing');
}

/** Scan the sim around the current date and fill the events list. */
function refreshEvents(): void {
  if (!eventsVisible()) return;
  const years = parseInt(eventsRangeEl.value, 10) || 5;
  setComputing('Computing events…');
  // Defer the (up to ~1 s) scan one frame so "Computing events…" paints first.
  requestAnimationFrame(() => {
    const nowMs = clock.toDate().getTime();
    const spanMs = years * 365.25 * 86_400_000;
    const t0Days = (nowMs - spanMs - J2000_UTC) / 86_400_000;
    const t1Days = (nowMs + spanMs - J2000_UTC) / 86_400_000;
    const evs = findEvents(t0Days, t1Days, { coarseStepDays: 0.2 });
    renderEvents(evs);
  });
}

function renderEvents(evs: SimEvent[]): void {
  clearComputing();
  eventsListEl.replaceChildren();
  if (evs.length === 0) {
    const p = document.createElement('p');
    p.className = 'ev-note';
    p.textContent = 'No events in this window.';
    eventsListEl.appendChild(p);
    return;
  }
  const frag = document.createDocumentFragment();
  for (const ev of evs) {
    const row = document.createElement('div');
    row.className = 'ev ' + evClass(ev);
    const d = new Date(ev.dateMs);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const dateSpan = document.createElement('span');
    dateSpan.className = 'ev-date';
    dateSpan.textContent = `${y}-${m}-${dd}`;
    const what = document.createElement('span');
    what.className = 'ev-what';
    what.textContent = ev.title;
    what.title = ev.detail;
    const det = document.createElement('span');
    det.className = 'ev-detail';
    det.textContent = ev.detail;
    what.appendChild(det);
    row.append(dateSpan, what);
    row.addEventListener('click', () => {
      clock.setDate(new Date(ev.dateMs));
      resampleMoonNow(); // Moon orbit line jumps with the epoch
      syncUrl();
      // Flash the date readout so the jump is obvious.
      dateEl.classList.remove('flash');
      void dateEl.offsetWidth;
      dateEl.classList.add('flash');
      // Fly to the event's primary body if it has a frameable anchor.
      const id = ev.bodyId;
      if (id) {
        const dest = camAnchorForBody(id);
        if (dest) flyTo(dest, 1.4, id);
      }
    });
    frag.appendChild(row);
  }
  eventsListEl.appendChild(frag);
}

/** Colour class per event type (drives the date accent in the list). */
function evClass(ev: SimEvent): string {
  switch (ev.type) {
    case 'solar-eclipse':
      return 'ecl-solar';
    case 'lunar-eclipse':
      return 'ecl-lunar';
    case 'transit':
      return 'transit';
    case 'saturn-edge-on':
      return 'saturn';
    default:
      return '';
  }
}

eventsToggleBtn.addEventListener('click', () => {
  eventsRowEl.hidden = !eventsRowEl.hidden;
  eventsToggleBtn.classList.toggle('active', !eventsRowEl.hidden);
  if (!eventsRowEl.hidden) refreshEvents();
  syncUrl();
});

eventsRangeEl.addEventListener('change', () => {
  refreshEvents();
});

datePickEl.addEventListener('change', () => {
  applyDatePick();
});

// --- Body search combobox (B2) + constellations (plan 010, S4) --------------
// The panel's "Find" combobox lists the 88 IAU constellations alongside the
// bodies. Constellation rows are tagged `const:<Name>` (bodies stay bare ids)
// so one dropdown, one keyboard-nav path and one `findPick` handle both kinds.
// Selecting a body flies the camera exactly like a pick; selecting a
// constellation flies to a sky-dome view that centres it and lights its lines
// gold. The empty query / "Free camera" row drops both. The `f` / `c` URL
// params keep `followId` / `selectedConstellation` as the sources of truth.

const findMenu = groupedBodyMenu(ALL_BODIES); // body display order, unfiltered
const constellationMenuAll = constellationMenu(); // 88, IAU order (ids `const:Name`)
const FIND_MENU_CONST_CAP = 15; // empty-query menu: bodies + a slice of consts
let findActiveIdx = -1; // highlighted row in the open dropdown

/**
 * A single dropdown row: a body (`c: false`) or a constellation (`c: true`).
 * `id` is the pick id — the bare body id for bodies, or the `const:<Name>`
 * namespaced id for constellations (so one `findPick` handles both kinds).
 */
interface FindRow {
  c: boolean;
  id: string;
  name: string;
  sub: string;
}

function findRowsFor(query: string): FindRow[] {
  const rows: FindRow[] = [];
  if (!query.trim()) {
    for (const e of findMenu) rows.push({ c: false, id: e.id, name: e.name, sub: e.sub });
    for (const e of constellationMenuAll.slice(0, FIND_MENU_CONST_CAP)) {
      rows.push({ c: true, id: e.id, name: e.name, sub: e.sub });
    }
    return rows;
  }
  const bodies = searchBodies(ALL_BODIES, query);
  for (const h of bodies) {
    rows.push({
      c: false,
      id: h.id,
      name: h.name,
      sub: h.parentName ? `moon of ${h.parentName}` : h.kind,
    });
  }
  const consts = searchConstellations(query);
  for (const c of consts) rows.push({ c: true, id: c.id, name: c.name, sub: c.sub });
  return rows;
}

function findLabel(id: string): string {
  if (id === '') return 'Free camera';
  if (id.startsWith(CONSTELLATION_ID_PREFIX)) return id.slice(CONSTELLATION_ID_PREFIX.length);
  return byId.get(id)?.name ?? id;
}

/** Reflect the current follow into the input (called by flyTo + URL restore). */
function setFindValue(id: string): void {
  findInputEl.value = findLabel(id);
}

function findClose(): void {
  findListEl.hidden = true;
  findActiveIdx = -1;
}

function findMarkActive(): void {
  const rows = findListEl.querySelectorAll<HTMLElement>('.fr');
  rows.forEach((r, i) => r.classList.toggle('active', i === findActiveIdx));
  rows[findActiveIdx]?.scrollIntoView({ block: 'nearest' });
}

function findRender(query: string): void {
  const rows = findRowsFor(query);
  findListEl.replaceChildren();
  const frag = document.createDocumentFragment();
  if (!query.trim()) {
    // Unfiltered: Free camera row first, then bodies + a slice of constellations.
    const free = document.createElement('div');
    free.className = 'fr fr-free';
    free.innerHTML =
      '<span class="fr-name">Free camera</span><span class="fr-sub">orbit wherever</span>';
    free.addEventListener('click', () => findPick(''));
    frag.appendChild(free);
    for (const r of rows) {
      const row = document.createElement('div');
      row.className = r.c ? 'fr fr-const' : 'fr';
      row.innerHTML = `<span class="fr-name">${r.name}</span><span class="fr-sub">${r.sub}</span>`;
      row.addEventListener('click', () => findPick(r.id));
      frag.appendChild(row);
    }
  } else if (rows.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'fr-empty';
    empty.textContent = 'No matches';
    frag.appendChild(empty);
  } else {
    for (const r of rows) {
      const row = document.createElement('div');
      row.className = r.c ? 'fr fr-const' : 'fr';
      row.innerHTML = `<span class="fr-name">${r.name}</span><span class="fr-sub">${r.sub}</span>`;
      row.addEventListener('click', () => findPick(r.id));
      frag.appendChild(row);
    }
  }
  findListEl.appendChild(frag);
  findActiveIdx = 0;
  findMarkActive();
  findListEl.hidden = false;
}

/**
 * Select a body (or `const:<Name>` constellation, or '' = free camera) from
 * the dropdown and fly to it. Constellations fly to a sky-dome view that
 * centres the figure and lights its lines gold (plan 010, S4); the
 * body/constellation pick clears the other's selection so only one target is
 * ever emphasized.
 */
function findPick(id: string): void {
  findInputEl.value = findLabel(id);
  findClose();
  findInputEl.blur();
  if (id.startsWith(CONSTELLATION_ID_PREFIX)) {
    flyToConstellation(id.slice(CONSTELLATION_ID_PREFIX.length));
    return;
  }
  if (id) {
    const dest = camAnchorForBody(id);
    if (dest) {
      flyTo(dest, 1.4, id);
      return;
    }
  }
  // "Free camera" (or a body with no frame): drop both selections.
  followId = '';
  selectedConstellation = '';
  updateInfo();
  syncUrl();
}

findInputEl.addEventListener('focus', () => findRender(findInputEl.value));
findInputEl.addEventListener('input', () => {
  // Any edit breaks "exactly one body" — re-open as a search from the
  // typed text so the user can pick what they mean.
  findRender(findInputEl.value);
});
findInputEl.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    ev.preventDefault();
    // Esc closes the list; pressed again (list closed), it drops the follow.
    if (!findListEl.hidden) findClose();
    else findPick('');
    return;
  }
  if (findListEl.hidden) return;
  const rows = findListEl.querySelectorAll<HTMLElement>('.fr');
  if (ev.key === 'ArrowDown') {
    ev.preventDefault();
    findActiveIdx = Math.min(rows.length - 1, findActiveIdx + 1);
    findMarkActive();
  } else if (ev.key === 'ArrowUp') {
    ev.preventDefault();
    findActiveIdx = Math.max(0, findActiveIdx - 1);
    findMarkActive();
  } else if (ev.key === 'Enter') {
    ev.preventDefault();
    const active = rows[findActiveIdx];
    if (active) active.click();
  }
});
document.addEventListener('pointerdown', (ev) => {
  if (!findListEl.hidden && !(ev.target as Element | null)?.closest('#find-wrap')) findClose();
});

orbitsEl.addEventListener('change', () => {
  applyToggles();
  syncUrl();
});
labelsEl.addEventListener('change', () => {
  applyToggles();
  syncUrl();
});
beltsEl.addEventListener('change', () => {
  applyToggles();
  syncUrl();
});
figuresEl.addEventListener('change', () => {
  figuresOn = figuresEl.checked;
  applyToggles();
  syncUrl();
});

window.addEventListener('resize', () => {
  built.camera.aspect = window.innerWidth / window.innerHeight;
  built.camera.updateProjectionMatrix();
  built.renderer.setSize(window.innerWidth, window.innerHeight);
  // Trackball (plan 015 P2) caches the canvas rect in handleResize() at
  // construction; refresh it after a resize or drag mapping goes stale.
  built.controls.handleResize();
});

// --- Shareable URL state ----------------------------------------------------
// Restore state from the query string (time, speed, follow, scale, toggles,
// camera) before building the scene; keep the address bar in sync afterward.

const urlState = parseAppState(window.location.href);
if (urlState.timeMs != null) clock.setDate(new Date(urlState.timeMs));
if (urlState.speedLog != null) {
  // Magnitude slider: clamp to the HTML range (sub-day down, 316 d/s up).
  const sp = Math.max(-3, Math.min(2.5, urlState.speedLog));
  speedEl.value = String(sp);
  clock.setLogSpeed(sp);
}
if (urlState.reversed != null) {
  clock.setReversed(urlState.reversed);
  reverseBtn.textContent = urlState.reversed ? 'Reverse ←' : 'Reverse →';
}
if (urlState.scale) {
  // The initial rebuildScene(scale) bakes the scene at this scale; the
  // toggle morphs from there live (no rebuild needed).
  scale = urlState.scale === 'true' ? TRUE_SCALE : VISIBLE_SCALE;
}
if (urlState.orbits != null) orbitsEl.checked = urlState.orbits;
if (urlState.labels != null) labelsEl.checked = urlState.labels;
if (urlState.belts != null) beltsEl.checked = urlState.belts;
if (urlState.figures != null) {
  figuresEl.checked = urlState.figures;
  figuresOn = urlState.figures;
}
if (urlState.paused != null) {
  clock.setPaused(urlState.paused);
  pauseBtn.textContent = urlState.paused ? 'Resume' : 'Pause';
}
if (urlState.eventsOpen != null) {
  eventsRowEl.hidden = !urlState.eventsOpen;
  eventsToggleBtn.classList.toggle('active', urlState.eventsOpen);
}
// Restore an opened events list from a shared link.
if (!eventsRowEl.hidden) refreshEvents();
if (urlState.follow && byId.has(urlState.follow)) {
  setFindValue(urlState.follow);
  followId = urlState.follow;
  // Restoring a body selection re-arms its highlight ring too (plan 015 P6:
  // any body — planet or satellite).
  selectedBodyId = urlState.follow;
}
// Restored constellation pick (plan 010, S4): re-arm the gold emphasis + the
// find box label. No flight on load — a shared link's `cam` param (applied
// below) already restores the exact view the picker parked the camera in.
if (urlState.constellation && CONSTELLATIONS.some((c) => c.name === urlState.constellation)) {
  selectedConstellation = urlState.constellation;
  setFindValue(`const:${urlState.constellation}`);
  lastHighlightPoseKey = ''; // refresh the highlight pass immediately
}

/** Snapshot the current UI + camera into a shareable ViewState. */
function captureState(): ViewState {
  return {
    timeMs: clock.toDate().getTime(),
    speedLog: parseFloat(speedEl.value),
    reversed: clock.isReversed,
    follow: followId || undefined,
    constellation: selectedConstellation || undefined,
    scale: scale === TRUE_SCALE ? 'true' : 'visible',
    orbits: orbitsEl.checked,
    labels: labelsEl.checked,
    belts: beltsEl.checked,
    figures: figuresOn,
    paused: clock.isPaused,
    eventsOpen: !eventsRowEl.hidden,
    cam: {
      pos: [built.camera.position.x, built.camera.position.y, built.camera.position.z],
      target: [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    },
  };
}

let urlTimer: ReturnType<typeof setTimeout> | undefined;
/** Debounced history.replaceState so the address bar stays shareable. */
function syncUrl(): void {
  if (urlTimer !== undefined) return;
  urlTimer = setTimeout(() => {
    urlTimer = undefined;
    window.history.replaceState(null, '', encodeAppState(window.location.href, captureState()));
  }, 300);
}

shareBtn.addEventListener('click', async () => {
  const url = encodeAppState(window.location.href, captureState());
  window.history.replaceState(null, '', url);
  try {
    await navigator.clipboard.writeText(url);
    shareBtn.textContent = 'Link copied ✓';
  } catch {
    shareBtn.textContent = 'Link in address bar';
  }
  setTimeout(() => {
    shareBtn.textContent = 'Copy share link';
  }, 1500);
});

// --- Screenshot ------------------------------------------------------------
// Export the current WebGL frame as a PNG. The renderer is built with
// preserveDrawingBuffer so canvas.toBlob() sees the last present.
screenshotBtn.addEventListener('click', async () => {
  const canvas = built.renderer.domElement;
  const d = clock.toDate();
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp =
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}Z`;
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/png'),
  );
  if (!blob) {
    screenshotBtn.textContent = 'Export failed';
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `solar-system-${stamp}.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  screenshotBtn.textContent = 'Saved ✓';
  setTimeout(() => {
    screenshotBtn.textContent = 'Save screenshot';
  }, 1500);
});

// --- Init ------------------------------------------------------------------

rebuildScene(scale);
wireAnchorButtons();
// Reflect a URL-restored scale in the toggle (label + active state).
syncScaleUI();
// Apply the shared camera last (rebuildScene may have re-framed the follow target).
if (urlState.cam) {
  built.camera.position.set(...urlState.cam.pos);
  built.controls.target.set(...urlState.cam.target);
  built.controls.update();
}
fmtSpeed();
fmtDate();

// Debug/test handle: lets scripts (and e2e checks) inspect the live scene
// without coupling to module internals. Intentionally minimal.
(window as unknown as Record<string, unknown>).__solar = {
  get scene() {
    return built.scene;
  },
  get camera() {
    return built.camera;
  },
  get controls() {
    return built.controls;
  },
  get renderer() {
    return built.renderer;
  },
  // Live body entries (id -> {def, mesh, worldPos, sceneRadius, frameExtent,
  // parent}) + the satellite-extent helper, so e2e checks can verify
  // planet fly-to framing against the scene's own numbers.
  get bodies() {
    return built.bodies;
  },
  // Reads the LIVE scale each call (scale is a mutable module `let`).
  satelliteExtentScene: (planetId: string) => satelliteExtentScene(planetId, scale),
  clock,
};

// --- Hover tooltip ----------------------------------------------------------
// Raycast body meshes on pointer-move and show a name tooltip near the
// cursor. Throttled so it never fights the render loop, and suppressed
// while the pointer is down (orbiting/panning).
const raycaster = new THREE.Raycaster();
const pointerNdc = new THREE.Vector2();
let pointerPx = 0,
  pointerPy = 0;
let pointerOnCanvas = false;
let lastPickMs = 0;
let picking = false;

function bodyMeshes(): THREE.Object3D[] {
  const out: THREE.Object3D[] = [];
  for (const e of built.bodies.values()) out.push(e.mesh);
  return out;
}

function showTooltip(name: string, sub: string): void {
  tooltipEl.innerHTML = `${name}${sub ? `<span class="sub"> ${sub}</span>` : ''}`;
  tooltipEl.style.left = `${pointerPx}px`;
  tooltipEl.style.top = `${pointerPy}px`;
  tooltipEl.classList.add('show');
}
function hideTooltip(): void {
  tooltipEl.classList.remove('show');
}

function doPick(): void {
  if (!pointerOnCanvas || picking) {
    hideTooltip();
    return;
  }
  raycaster.setFromCamera(pointerNdc, built.camera);
  const hits = raycaster.intersectObjects(bodyMeshes(), false);
  if (hits.length > 0) {
    const id = hits[0].object.userData.id as string | undefined;
    const def = id ? byId.get(id) : undefined;
    if (def) {
      const sub =
        def.kind === 'moon'
          ? `moon of ${byId.get(def.parent ?? '')?.name ?? ''}`
          : def.kind.charAt(0).toUpperCase() + def.kind.slice(1);
      showTooltip(def.name, sub);
      return;
    }
  }
  hideTooltip();
}

canvas.addEventListener('pointermove', (ev) => {
  pointerOnCanvas = true;
  pointerPx = ev.clientX;
  pointerPy = ev.clientY;
  pointerNdc.set(
    (ev.clientX / window.innerWidth) * 2 - 1,
    -(ev.clientY / window.innerHeight) * 2 + 1,
  );
  const now = performance.now();
  if (now - lastPickMs < 50) return; // throttle
  lastPickMs = now;
  doPick();
});
canvas.addEventListener('pointerleave', () => {
  pointerOnCanvas = false;
  hideTooltip();
});
canvas.addEventListener('pointerdown', () => {
  picking = true;
  hideTooltip();
});
window.addEventListener('pointerup', () => {
  picking = false;
});

// --- Click-to-pick: fly to a clicked body ---------------------------------
// A genuine click (press + release with no meaningful drag) on a body starts
// an eased flight to it and arms the follow so it stays centered on landing.
// Dragging to orbit / panning never triggers it (distance threshold).
let pressX = 0,
  pressY = 0;
canvas.addEventListener('pointerdown', (ev) => {
  pressX = ev.clientX;
  pressY = ev.clientY;
});
canvas.addEventListener('pointerup', (ev) => {
  if (Math.hypot(ev.clientX - pressX, ev.clientY - pressY) > 6) return; // drag, not a click
  const rect = canvas.getBoundingClientRect();
  pointerNdc.set(
    ((ev.clientX - rect.left) / rect.width) * 2 - 1,
    -((ev.clientY - rect.top) / rect.height) * 2 + 1,
  );
  raycaster.setFromCamera(pointerNdc, built.camera);
  const hits = raycaster.intersectObjects(bodyMeshes(), false);
  if (hits.length > 0) {
    const id = hits[0].object.userData.id as string | undefined;
    const dest = id ? camAnchorForBody(id) : null;
    if (dest) flyTo(dest, 1.4, id);
  }
});

// --- Animation loop ---------------------------------------------------------

function frame(): void {
  requestAnimationFrame(frame);

  // GPU context is down (see the webglcontextlost/restored handlers at the
  // bottom): stop doing sim + GPU work while it's out. We deliberately keep
  // the rAF chain alive instead of tearing it down — on restore the next
  // frame just resumes, with zero re-init or forced reload.
  if (contextLost) return;

  const nowMs = performance.now();
  const dtReal = Math.min(0.1, (nowMs - lastMs) / 1000);
  lastMs = nowMs;

  clock.tick(dtReal);
  const dtDays = clock.t - lastDays;
  lastDays = clock.t;

  // --- Real-scale morph (B3): advance the toggle morph and derive this
  // frame's scale. `frameScale` is what positions/belts/orbits use; outside
  // a morph it is exactly the static `scale`. Body RADII are driven
  // separately by applyScaleMorph (the baked mesh is always the build-scale
  // geometry).
  let frameScale: VisualScale = scale;
  if (morph) {
    if (morph.dir !== 0) {
      // Ease the 3 s leg. `morph.p` is the raw 0..1 position; the EASED
      // value drives both the layout blend and the body radii so everything
      // moves in lockstep.
      morph.p = Math.min(1, Math.max(0, morph.p + (morph.dir * dtReal) / MORPH_DUR));
      if ((morph.dir === 1 && morph.p >= 1) || (morph.dir === -1 && morph.p <= 0)) {
        morphEnd();
      }
    }
    const e = morph.dir === 0 ? 1 : easeInOutCubic(morph.p);
    frameScale = lerpScale(VISIBLE_SCALE, TRUE_SCALE, e);
    applyScaleMorph(built, e);
    // Re-project every orbit line through the blend so lines stay glued to
    // the bodies at any progress (cheap: 256 pts/line, no geometry alloc).
    // Only moons route through the moonDistance mapping — planets use
    // planetDistance (passing a planet id as moonId would mis-scale it).
    for (const entry of built.bodies.values()) {
      if (entry.orbit)
        reprojectOrbitLine(entry.orbit, frameScale, entry.parent ? entry.def.id : null);
    }
    // On the last frame of a leg, reframe the camera: a fresh "System" fit
    // in the NEW layout (the old framing is meaningless across the scale
    // change), eased over 1.2 s so it lands as a graceful pull-in / push-out.
    // Reversing mid-leg cancels any in-flight reframe (user intent wins).
    if (morph.dir === 0) {
      if (!morph.reframed) {
        morph.reframed = true;
        flight = makeFlight(
          [built.camera.position.x, built.camera.position.y, built.camera.position.z],
          [built.controls.target.x, built.controls.target.y, built.controls.target.z],
          camAnchorFor('system'),
          1.2,
          null,
          built.camera.fov,
          FOV_DEG,
        );
        built.controls.enabled = false;
      }
    } else if (flight && morph.reframed) {
      flight = null; // mid-leg reversal: drop the reframe, hand back to controls
      built.controls.enabled = true;
      built.controls.update();
    }
  }

  // Moon orbit line (moon-orbit fix): the drawn loop is sampled at a
  // placeholder epoch and re-sampled here, throttled to ~4 Hz, at the LIVE
  // sim time — so the line always matches the Moon's real, slowly-precessing
  // geocentric path (129 ephemeris samples ≈ 1 ms, negligible). It writes the
  // same position/unit-dir/km buffers `reprojectOrbitLine` uses, so it also
  // feeds the scale morph's per-frame re-projection correctly.
  {
    const now = performance.now();
    if (now - lastMoonResampleMs > 250) {
      lastMoonResampleMs = now;
      const moonEntry = built.bodies.get('moon');
      if (moonEntry?.orbit) resampleMoonOrbitLine(moonEntry.orbit, clock.t, frameScale);
    }
  }

  updatePositions(built, clock.t, frameScale);
  // The belt population (2,100 Kepler solves + matrix composes) is the
  // heaviest per-frame CPU cost. When the sim is paused nothing moves, so
  // skip it entirely — belt matrices were already written on the last tick.
  if (!clock.isPaused) updateBeltFields(built, clock.t, frameScale);
  applySpin(built, dtDays);

  if (flight) {
    // Camera flight in progress. Drive the camera manually from the eased
    // (target + offset) path — do NOT call controls.update() here: with
    // damping on it would re-derive the camera from its internal spherical
    // state (and any residual drag delta) and fight/corrupt the flight. If
    // the flight tracks a picked body, substitute its live world position so
    // a fast-moving planet is landed on, not where it was when we started.
    built.controls.enabled = false;
    const sample = stepFlight(flight, dtReal);
    let target = sample.target;
    if (flight.followId) {
      const e = built.bodies.get(flight.followId);
      if (e) target = [e.worldPos.x, e.worldPos.y, e.worldPos.z];
    }
    // camera = live target + eased offset (rigidly tracks a moving body).
    built.controls.target.set(target[0], target[1], target[2]);
    built.camera.position.set(
      target[0] + sample.offset[0],
      target[1] + sample.offset[1],
      target[2] + sample.offset[2],
    );
    // Ease the FOV too (sky anchor widens it; others ease back to 50°).
    // Only touch the projection matrix while it is actually changing.
    if (Math.abs(built.camera.fov - sample.fov) > 1e-3) {
      built.camera.fov = sample.fov;
      built.camera.updateProjectionMatrix();
    }
    // De-roll (plan 015 P2): trackball rotation rolls camera.up; ease it back
    // to the canonical frame over the flight so the landing is level. Must run
    // before lookAt (which honors camera.up).
    deRollCameraUp(easeInOutCubic(Math.min(1, flight.t / flight.duration)));
    built.camera.lookAt(target[0], target[1], target[2]);
    if (sample.done) {
      flight = null;
      if (pendingSkyTour) {
        // Sky anchor landed: start the panoramic sweep from this pose. The
        // tour drives the camera directly (controls stay disabled) and runs
        // until the user grabs it (pointerdown/wheel/keydown, see above).
        pendingSkyTour = false;
        startSkyTour();
      } else {
        built.controls.enabled = true;
        // Re-sync the control's internal state to the pose we just landed on
        // so user drag/wheel resumes smoothly from here (plan 015 P2: with
        // Trackball this is just a no-op re-derivation of the eye vector).
        built.controls.update();
        // the user can break free any time via the Free-camera option.
        if (followId) {
          const e = built.bodies.get(followId);
          if (e) built.controls.target.copy(e.worldPos);
        }
      }
      syncUrl();
    }
  } else if (skyTour) {
    // Panoramic sky sweep (post-Sky-anchor): pan around the origin so the
    // full sky of constellations comes into view in turn.
    advanceSkyTour(dtReal);
  } else if (followId) {
    // Free follow: keep the followed body centered at the orbit pivot.
    // When the followed body is a satellite, lock the CAMERA to its parent
    // planet (not the moon): the moon orbits the planet many times per sim
    // day, so chasing the moon made the whole view whirl/jitter at speed
    // (the "chaotic tracking"). The planet is the stable pivot; the selected
    // moon is instead marked by its pulsing highlight ring (see below), which
    // reads correctly at any speed. Planets are only a little faster than the
    // camera's lerp can track, so the view stays steady.
    const entry = built.bodies.get(followId);
    const lockEntry =
      entry && moonParent.has(followId) ? built.bodies.get(moonParent.get(followId)!) : entry;
    if (lockEntry) {
      // Trackball (plan 015 P2): controls.update() no longer re-derives the
      // camera from the pivot (OrbitControls' spherical state did), so a
      // target-only lerp would leave the camera parked. Move the pivot toward
      // the body and shift the CAMERA by the same delta — rigid tracking that
      // preserves the user's current view offset (and any trackball roll).
      _followPrevPivot.copy(built.controls.target);
      built.controls.target.lerp(lockEntry.worldPos, 0.2);
      const dx = built.controls.target.x - _followPrevPivot.x;
      const dy = built.controls.target.y - _followPrevPivot.y;
      const dz = built.controls.target.z - _followPrevPivot.z;
      built.camera.position.x += dx;
      built.camera.position.y += dy;
      built.camera.position.z += dz;
    }
    built.controls.update();
  } else {
    built.controls.update();
  }

  // Constellation proximity highlight (D4): fade each figure by how close its
  // center is to the view center. Throttled + pose-gated, so idle frames cost
  // nothing. Runs after the camera pose for this frame is finalized.
  updateConstellationHighlightThrottled(nowMs);
  // The picked constellation's gold lines pulse every frame (plan 010) — the
  // pose-gated pass above only refreshes when the camera moves, so without
  // this the pulse would freeze in a parked view. One material write.
  updatePickedConstellationPulse(nowMs);

  // Pulsing highlight on the picked body — a planet or a moon (plan 015 P6) —
  // driven by wall-clock time so the pulse is smooth and independent of the
  // sim speed / direction.
  updateBodyHighlight(built, selectedBodyId, nowMs / 1000);

  // Shadow culling: the Sun is a point light, so its shadow is a 6-face
  // cube map (2048² each) re-rendered every frame — the heaviest single GPU
  // cost. The shadow cube's far plane is 140 units (SUN_SHADOWS.far), so once
  // the camera is beyond that the planets are far enough apart that their
  // mutual shadows are sub-pixel / invisible anyway. Disable the whole shadow
  // pass out there; keep it for close/mid views where eclipses + ring shadows
  // are actually visible. Only toggle when the state actually changes.
  const SHADOW_CULL_DIST = 170;
  const camDist = built.camera.position.length();
  const shadowsOn = camDist <= SHADOW_CULL_DIST;
  if (shadowsOn !== built.sunLight.castShadow) built.sunLight.castShadow = shadowsOn;

  built.renderer.render(built.scene, built.camera);
  fmtDate();
  updateInfo();
}
requestAnimationFrame(frame);

// --- WebGL context loss / restore -----------------------------------------
// three.js registers its OWN webglcontextlost/restored listeners on the
// canvas: it preventDefaults the loss (so the browser keeps the context alive
// for recovery), flags its internal _isContextLost (making render() a no-op
// while down), and on restore re-initializes GPU state. These app-level
// listeners layer the UX on top: pause the render loop + show the overlay
// while the context is out, and hide the overlay and resume when it comes
// back. We do NOT touch the renderer here — three.js owns that path.
canvas.addEventListener('webglcontextlost', (ev: Event) => {
  // Three.js preventDefaults its own listener; we just observe the loss.
  ev.preventDefault();
  contextLost = true;
  glLostEl.hidden = false;
  glLostEl.classList.add('show');
});

canvas.addEventListener('webglcontextrestored', () => {
  contextLost = false;
  glLostEl.hidden = true;
  glLostEl.classList.remove('show');
  // Resync the renderer to the (possibly) current viewport after the browser
  // recreates the underlying context, so the first resumed frame isn't stale.
  built.renderer.setSize(window.innerWidth, window.innerHeight);
  lastMs = performance.now(); // don't apply a huge dt to the sim on resume
});

// Escape hatch in case the browser never fires a restore (rare, but e.g. some
// mobile drivers). A manual reload always works and is what a user would do
// by hand anyway.
glReloadBtn.addEventListener('click', () => window.location.reload());
