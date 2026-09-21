/**
 * App entry: builds the Three.js scene, wires the control panel, and runs
 * the animation loop. The sim layer (src/sim) stays pure and is tested in
 * Node; everything DOM/WebGL lives here and in src/render.
 */
import * as THREE from 'three';
import { SimClock } from './sim/clock';
import { ALL_BODIES, PLANETS } from './data/bodies';
import {
  buildScene,
  updatePositions,
  satelliteExtentScene,
  constellationCenter,
  constellationEmphasis,
  constellationEmphasisOpacity,
  constellationLabelPose,
  constellationPresence,
  updateConstellationHighlight,
  updateConstellationFigureHighlights,
  resampleMoonOrbitLine,
  setIssSatellite,
  resampleIssOrbitLine,
  resolveConstellationLabels,
  constellationLabelOpacity,
  VISIBLE_SCALE,
  TRUE_SCALE,
  CONSTELLATION_RADIUS,
  type BuiltScene,
  type VisualScale,
} from './render/scene';
import {
  selectQualityTier,
  createFpsWatchdog,
  type QualityTier,
  type FpsWatchdog,
} from './render/quality';
import { createTelemetry } from './telemetry/client';
import { initI18n, t } from './i18n/i18n';
import { buildExoScene, type ExoScene } from './render/exoScene';
import { EXO_SYSTEMS } from './sim/exoplanets';
import { fetchIssTle, FALLBACK_ISS_TLE } from './data/issTle';
import { parseTle, type Satellite } from './sim/sgp4';
import { isSunOccluded } from './render/post';
import {
  createPlanetLabelLayer,
  updatePlanetScreenLabels,
  projectWorldToScreen,
  type PlanetLabelInput,
  type PlanetLabelLayer,
} from './render/planetScreenLabels';
import {
  createConstellationLabelLayer,
  updateConstellationScreenLabels,
  CONSTELLATION_LABEL_MIN_SCREEN_OPACITY,
  type ScreenLabelLayer,
  type ScreenLabelUpdate,
} from './render/constellationScreenLabels';
import { CONSTELLATIONS } from './data/constellations';
import {
  frameBody,
  frameSystem,
  frameConstellations,
  frameConstellation,
  makeFlight,
  easeInOutCubic,
  type CamAnchor,
  type Flight,
} from './render/cameraFlight';
import { attachRealTextures } from './render/realTextures';
// Plan 035 F5 — cinematic intro, keyboard/palette commands, and the info-card
// "facts" rows. All three are pure modules (unit-tested in tests/f5Commands.
// test.ts); main.ts only wires their results to the DOM + scene.
import {
  INTRO_LEGS,
  INTRO_DURATION,
  INTRO_TAIL_DURATION,
  INTRO_SEEN_KEY,
  titleOpacity,
  introShouldPlay,
  introTailSpeed,
  introTailGlow,
} from './render/intro';
import { commandForKey, digitToPlanet, paletteEntries, COMMANDS } from './render/commands';
import { bodyFacts } from './render/bodyFacts';
import { sbdbFacts } from './sim/sbdb';
import { smallBodyFacts } from './sim/smallBodies';
import { fetchApod } from './sim/apod';
import { ONBOARD_STEPS, shouldShowOnboarding, markOnboarded } from './sim/onboarding';
import { parseKpJson, latestKp, gScale, gScaleLabel, type KpSample } from './sim/spaceWeather';
import { parseNeoFeed, formatNeoLabel } from './sim/neo';

import { orbitReadout, formatPeriod, formatDistanceKm } from './sim/orbitInfo';
import { parseAppState, encodeAppState, type ViewState } from './state/urlState';
import { createEventsPanel } from './app/eventsPanel';
import { createFrameLoop } from './app/frameLoop';
import { createScrub } from './app/scrub';
import type { ScrubState, ThreeFingerScrub } from './app/scrubTypes';
import { createSearchUi } from './app/searchUi';
import { createContextLoss } from './app/contextLoss';
import { type BodyDefinition } from './sim/types';
import { moonGeocentricJ2000 } from './sim/moon';
import { moonHorizonsDiff } from './sim/horizons';
import { monthGrid, fmtMonthYear, isSameDayUtc } from './render/calendar';
import { yearSpan } from './render/yearEvents';

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
// (88 total) between that direction and the camera's view axis. The 88
// emphases are computed EVERY frame (the screen-space label overlay, plan
// 016 P1, needs them at display rate); the MATERIAL writes (lines/figures)
// stay throttled to ~5 Hz and pose-gated, so idle frames cost little.
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

// --- Plan 016 P1: screen-space constellation name labels (2D overlay) ----
// The 88 name sprites moved off the sky dome to a 2D canvas overlay
// (render/constellationScreenLabels.ts): a screen-space label can never
// depth-pop or slice through a figure, and its opacity is recomputed at
// display rate (no 5 Hz stepping).
let labelLayer: ScreenLabelLayer | null = null;
// Plan 044 A5: screen-space planet/body name labels (2D overlay). The 3D
// sprites moved to a 2D canvas overlay (render/planetScreenLabels.ts): a
// screen-space label can never sit on the Sun's disc, and it gets leader
// lines + distance fade + de-collision (the max-8 rule the constellation
// names already use).
let planetLabelLayer: PlanetLabelLayer | null = null;
// The plan-006 solver's per-figure anchor directions — unchanged math; the
// overlay only renders them in screen space.
const LABEL_ANCHOR_DIRS = resolveConstellationLabels(CONSTELLATIONS).map((p) => p.dir);
// Scratch: label-occlusion ray + direction (one per label, reused).
const LABEL_OCCL_RAY = new THREE.Raycaster();
const LABEL_OCCL_DIR = new THREE.Vector3();

/**
 * Plan 016 P1: per-frame constellation emphases. The 88-dot-product loop
 * moved out of the 5 Hz pose-gated pass (below) into the render loop so
 * the screen-space label overlay can re-evaluate every name's opacity at
 * display rate — 5 Hz opacity stepping was half of the old sprite flicker.
 *
 * Plan 017 F1: the per-frame NEAREST-figure argmin is gone — it is what made
 * the green highlight hop between figures on small camera nudges. Only the
 * D4 per-figure emphasis curve is computed now (drives opacity fades); no
 * "nearest" index is tracked anywhere.
 */
function computeConstellationEmphases(): void {
  // Camera forward = its local −Z expressed in world space.
  HIGHLIGHT_FWD.set(0, 0, -1).applyQuaternion(built.camera.quaternion);
  const vx = HIGHLIGHT_FWD.x,
    vy = HIGHLIGHT_FWD.y,
    vz = HIGHLIGHT_FWD.z;
  for (let i = 0; i < CONSTELLATION_CENTER_DIRS.length; i++) {
    const d = CONSTELLATION_CENTER_DIRS[i];
    CONSTELLATION_EMPHASES[i] = constellationEmphasis(d, [vx, vy, vz]);
  }
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
    // Plan 044 C4: reduced-motion → a STATIC full opacity (no breathing
    // pulse). The figure stays emphasized, just without the wall-clock
    // oscillation.
    (child.material as THREE.LineBasicMaterial).opacity = REDUCED_MOTION
      ? 1
      : constellationEmphasisOpacity(nowMs / 1000);
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
const dsoEl = document.getElementById('dso') as HTMLInputElement;
const dofEl = document.getElementById('dof') as HTMLInputElement;
let figuresOn = false;
let dsoOn = false;
const shareBtn = document.getElementById('share') as HTMLButtonElement;
const screenshotBtn = document.getElementById('screenshot') as HTMLButtonElement;
const tooltipEl = document.getElementById('tooltip') as HTMLDivElement;
const infoEl = document.getElementById('info') as HTMLDivElement;
const glLostEl = document.getElementById('gl-lost') as HTMLDivElement;
// --- Plan 035 F5 state + elements ------------------------------------------
// Cinematic intro: a one-shot, skippable dolly on first load (far-out → Sun
// → Earth) with the title fading in/out. Skipped for reduced-motion, `?intro=0`,
// and shared links that pin a view (a restore must not get overridden).
let intro: {
  leg: number; // index into INTRO_LEGS
  titleEl: HTMLDivElement | null;
  // Plan 044 A6: the TAIL — after the last camera leg lands on Earth, the
  // intro does NOT end immediately. Instead the camera settles, the timeline
  // strip glows into view, time visibly accelerates, and an event marker pops
  // at "you are here". `tail` is true once the legs are done and the tail is
  // running; `tailT` is the tail's elapsed seconds; `tailFromSpeed` is the
  // speed at the moment the tail started (the ramp's start point).
  tail: boolean;
  tailT: number;
  tailFromSpeed: number;
} | null = null;
const introWrapEl = document.getElementById('intro') as HTMLDivElement | null;
const introTitleEl = document.getElementById('intro-title') as HTMLDivElement | null;
const introSkipEl = document.getElementById('intro-skip') as HTMLButtonElement | null;
// Command palette (Ctrl/Cmd+K or `?`): a searchable list of every command +
// jump-to-body. `palette` holds its live filter query.
const paletteEl = document.getElementById('palette') as HTMLDivElement | null;
const paletteInputEl = document.getElementById('palette-input') as HTMLInputElement | null;
const paletteListEl = document.getElementById('palette-list') as HTMLDivElement | null;
let paletteOpen = false;
let paletteQuery = '';
let paletteSel = 0;
let paletteItems: { id: string; label: string; keys: string[]; hint: string }[] = [];
// F5 toggles not backed by an existing checkbox: atmospheres (fresnel shells)
// + Milky Way + zodiacal light (deep-sky sub-layers).
let atmosOn = true;
let milkyWayOn = true;
let zodiacalOn = true;
// Camera preset cycle target for the `c` key (top → side → back to follow).
let cameraPresetIdx = 0;
const glReloadBtn = document.getElementById('gl-reload') as HTMLButtonElement;
// Plan 022 F3: always-visible mini date/speed strip (top-right). Written by
// the same fmtDate()/fmtSpeed() as the panel, so the strip can never
// diverge from the control panel. Day-only vs full date is chosen in
// hudDateDayOnly (re-checked on resize). Plan 025 F2: the strip is the
// MINIMAL date + speed + year-jump buttons — the scrub travel sub-line and
// the year-position gauge are gone ("makes no sense" — the full-width
// event bar at the top is the scrub feedback now). The .scrubbing emphasis
// class still pulses the pane while a gesture is live.
const hudMiniEl = document.getElementById('hud-mini') as HTMLDivElement;
const hudDateEl = document.getElementById('hud-date') as HTMLSpanElement;
const hudSpeedEl = document.getElementById('hud-speed') as HTMLSpanElement;
// Plan 025 F3: full-width TOP event bar (visible only while scrubbing).
// The #hud-timeline-months axis (ticks + 45° month labels) is static DOM;
// #hud-timeline-dynamic holds the event markers, rebuilt on year change and
// when a deferred event sweep lands; fill + caret are persistent children.
const hudTimelineEl = document.getElementById('hud-timeline') as HTMLDivElement;
const hudTimelineTrackEl = document.getElementById('hud-timeline-track') as HTMLDivElement;
const hudTimelineDynEl = document.getElementById('hud-timeline-dynamic') as HTMLDivElement;
const hudTimelineFillEl = document.getElementById('hud-timeline-fill') as HTMLDivElement;
const hudTimelineCaretEl = document.getElementById('hud-timeline-caret') as HTMLDivElement;
// Plan 044 A6: the bar (bar-relative, the SAME coordinate space the caret +
// event markers use — 12px side inset) — the intro tail's "you are here"
// marker lives here so its `left` lines up exactly with the caret.
const hudTimelineBarEl = document.getElementById('hud-timeline-bar') as HTMLDivElement;
const hudTimelineYearEl = document.getElementById('hud-timeline-year') as HTMLSpanElement;
const hudTlTipEl = document.getElementById('hud-tl-tip') as HTMLDivElement;
// Plan 025 F4: the rolling magnifier lens (window + 8× event track + date
// readout) — a child of #hud-timeline-track so its `left` is track-relative,
// the same coordinate space the pointer math uses.
const hudTlLensEl = document.getElementById('hud-tl-lens') as HTMLDivElement;
const hudTlLensCanvasEl = document.getElementById('hud-tl-lens-canvas') as HTMLCanvasElement;
const hudTlLensDateEl = document.getElementById('hud-tl-lens-date') as HTMLDivElement;
// Plan 026 F1: the clickable-date calendar popover. The popover is a normal
// interactive layer (pointer-events:auto); #hud-date re-enables pointer-events
// so it can be clicked without the pane intercepting the canvas.
const dateCalEl = document.getElementById('date-cal') as HTMLDivElement;
const dateCalTitleEl = document.getElementById('date-cal-title') as HTMLSpanElement;
const dateCalPrevEl = document.getElementById('date-cal-prev') as HTMLButtonElement;
const dateCalNextEl = document.getElementById('date-cal-next') as HTMLButtonElement;
const dateCalGridEl = document.getElementById('date-cal-grid') as HTMLDivElement;
const dateCalTodayEl = document.getElementById('date-cal-today') as HTMLButtonElement;
// Plan 026 F2: quick year-nav buttons (±1/±5 y).
const dateCalYn5El = document.getElementById('date-cal-y-5') as HTMLButtonElement;
const dateCalYn1El = document.getElementById('date-cal-y-1') as HTMLButtonElement;
const dateCalYp1El = document.getElementById('date-cal-y+1') as HTMLButtonElement;
const dateCalYp5El = document.getElementById('date-cal-y+5') as HTMLButtonElement;
// The month/year the popover is currently showing (independent of the sim
// clock — the user can browse other months before committing a day).
let calYear = 0;
let calMonth = 0;
let calOpen = false;
// Last selected day the popover rendered (for the frame-loop live-tracking
// guard — only re-render when the viewed month/year or selected day changes).
let calSelDay = -1;
// F3: day-only vs full date for the mini strip. Matches the phone breakpoint
// the panel collapses under (560 px) — re-checked on resize below.
let hudDateDayOnly = window.innerWidth < 560;
const infoNameEl = document.getElementById('info-name') as HTMLDivElement;
const infoPeriodEl = document.getElementById('info-period') as HTMLSpanElement;
const infoDistanceEl = document.getElementById('info-distance') as HTMLSpanElement;
const infoRangeEl = document.getElementById('info-range') as HTMLSpanElement;
const infoFactsEl = document.getElementById('info-facts') as HTMLDivElement | null;
const spaceWeatherEl = document.getElementById('space-weather') as HTMLSpanElement | null;
const neoEl = document.getElementById('neo') as HTMLSpanElement | null;
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
// F1: HDR post-processing switch (the `?post=0` device fallback + `p` key).
// Declared here (not at its use in the URL block) so the keydown handler can
// reference it without a temporal-dead-zone error; default true.
let postOn = true;
// D6: quality tier (plan 045). Selected once at boot from deviceMemory (or a
// `?q=` override) and applied in rebuildScene; the fps watchdog may downgrade
// it ONCE (high→medium→low) if the device can't hold ~30 fps. Declared here so
// the boot block + watchdog can reference it before the URL parse runs.
let qualityTier: QualityTier = 'high';
// D7: privacy-first telemetry (plan 044). OPT-IN — nothing is sent externally
// until the user grants consent in the About dialog; until then every report
// is local-only (console + an in-app error toast). No external sink is
// configured by default, so even with consent granted nothing leaves the
// browser. The owner can drop in a sink (Sentry/GlitchTip/custom) by passing
// `sink:` here — the consent gate in the client enforces it.
const telemetry = createTelemetry({
  version: (import.meta.env.VITE_APP_VERSION as string | undefined) ?? 'dev',
  getQualityTier: () => qualityTier,
  onError: (message) => {
    // In-app error toast (created in the HTML; lazily fetched so this callback
    // is safe to call before the init section runs). Auto-dismisses.
    const toast = document.getElementById('telemetry-toast');
    if (!toast) return;
    toast.textContent = `Something went wrong: ${message}`;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 6000);
  },
});
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
// D10: true while the tab is hidden (visibilitychange). The frame loop skips
// all sim + GPU work while hidden; the visibilitychange listener (below) keeps
// this in sync and resets lastMs on return so the sim doesn't jump.
let hidden = document.hidden;
// Throttle for the per-frame Moon orbit-line resample (see the frame loop).
let lastMoonResampleMs = 0;
// Plan 044 B1: the live ISS satellite record (set once a TLE loads). Shared
// across scene rebuilds so a scale morph doesn't lose the TLE.
let issSatellite: Satellite | null = null;

// ---------------------------------------------------------------------------
// F6 idle-skip: skip the (expensive) WebGL render pass when the on-screen
// frame is provably static — sim paused, camera settled (no flight/morph/drag),
// no scrub, no intro/tour, and no wall-clock-driven highlight pulse. `sceneDirty`
// is set by any input that can change the view (controls change, keydown, pointer,
// resize, command) and consumed on the next render. When idle we still keep the
// rAF chain alive (so the first interaction re-renders immediately) but skip the
// GPU render entirely — this is the "battery" saving of the F6 perf pass.
// ---------------------------------------------------------------------------
let sceneDirty = true;
function markSceneDirty(): void {
  sceneDirty = true;
}
// F6 camera-motion scratch: detect any camera/target change between frames
// (drag, wheel zoom, damping settle, follow lerp) without relying on the
// OrbitControls 'change' event. A sub-1e-4 move counts as "moving".
const F6_LAST_CAM = { x: 0, y: 0, z: 0 };
const F6_LAST_TARGET = { x: 0, y: 0, z: 0 };
let f6CamInit = false;
/** F6: true when this frame's camera moved vs the last rendered frame. */
let f6CameraMoving = false;
// True while the WebGL context is down (driver reset / tab reclaimed). The
// render loop keeps ticking its rAF chain but skips all sim + GPU work until
// the browser fires `webglcontextrestored`, so a lost context costs nothing
// and the view comes back on its own (no forced reload).
let contextLost = false;
// Active camera flight (anchor / picked-body). `null` when no flight is in
// progress; the render loop advances it and hands control back to the free
// OrbitControls when it lands.
let flight: Flight | null = null;

// Plan 044 C4: honor `prefers-reduced-motion` for camera flights. When set,
// flyTo/makeFlight land INSTANTLY (duration 0 → the eased lerp resolves to the
// end pose on the first frame) instead of animating the dolly. The intro is
// already skipped under reduced-motion (introShouldPlay); this covers the
// user-initiated fly-to-body / fly-to-anchor flights.
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

export interface ScaleMorph {
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
  markSceneDirty(); // F6: scale change re-maps every body
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
  // Plan 044 B1: the ISS orbit line jumps with the epoch too.
  const issEntry = built.bodies.get('iss');
  if (issEntry?.orbit && issEntry.satellite) {
    resampleIssOrbitLine(issEntry.orbit, issEntry.satellite, clock.t, scale);
  }
  lastMoonResampleMs = performance.now();
}

function rebuildScene(newScale: VisualScale): BuiltScene {
  if (built) built.dispose();
  built = buildScene(canvas, ALL_BODIES, newScale, qualityTier);
  // keep the shareable URL in sync as the user moves the camera
  built.controls.addEventListener('change', syncUrl);
  // re-attach moon orbits to parent pivots
  for (const entry of built.bodies.values()) {
    if (entry.orbit && entry.parent) {
      entry.parent.pivot.add(entry.orbit);
    }
  }
  // Plan 044 B1: re-attach the live ISS satellite across a rebuild (scale
  // morph) so the TLE isn't lost — the new scene's ISS body is hidden until
  // this runs, so a TLE that already loaded keeps the ISS visible.
  if (issSatellite) setIssSatellite(built, issSatellite, clock.t, scale);
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
      const d = scale.followDistanceKm(
        entry.def.radiusKm,
        entry.def.kind === 'dwarf',
        entry.def.kind === 'small',
      );
      built.controls.target.copy(entry.worldPos);
      built.camera.position.copy(entry.worldPos).add(new THREE.Vector3(d, d * 0.6, d));
    }
  }
  return built;
}

// --- Plan 044 B6: exoplanet mode -------------------------------------------
// A separate "Systems" view renders a chosen exoplanet system as a mini solar
// system (host star + planets on their real Keplerian orbits). It runs on its
// OWN scene/camera/renderer (render/exoScene.ts) over the same canvas, so the
// main solar-system scene is paused while it's active. The exo scene is
// created lazily on first entry and reused across system switches.
let exoMode = false;
let exoScene: ExoScene | null = null;
let exoSystemIdx = 0;
const exoSysSel = document.getElementById('exo-system') as HTMLSelectElement | null;
const exoInfoEl = document.getElementById('exo-info') as HTMLDivElement | null;
const exoBackBtn = document.getElementById('exo-back') as HTMLButtonElement | null;
// The exo scene renders its planet labels into the #exo-labels overlay.
const exoLabelLayer = document.getElementById('exo-labels') as HTMLDivElement | null;

function setExoMode(on: boolean): void {
  if (on === exoMode) return;
  exoMode = on;
  // Toggle the two view sections: the solar-system controls hide in exo mode,
  // the exo controls (system picker + back) show.
  const solarSections = document.getElementById('solar-controls');
  const exoSection = document.getElementById('exo-controls');
  if (solarSections) solarSections.style.display = on ? 'none' : '';
  if (exoSection) exoSection.style.display = on ? '' : 'none';
  // The main scene's 2D label overlays (planet names + constellation names)
  // would bleed through the exo scene — hide them while exo mode is active
  // (the exo scene draws its own labels into #exo-labels).
  if (planetLabelLayer) planetLabelLayer.canvas.style.display = on ? 'none' : '';
  if (labelLayer) labelLayer.canvas.style.display = on ? 'none' : '';
  if (on) {
    if (!exoScene && exoLabelLayer) exoScene = buildExoScene(built.renderer, exoLabelLayer);
    // Populate the system picker once.
    if (exoSysSel && exoSysSel.options.length === 0) {
      for (const s of EXO_SYSTEMS) {
        const opt = document.createElement('option');
        opt.value = String(EXO_SYSTEMS.indexOf(s));
        opt.textContent = `${s.star} (${s.planets.length})`;
        exoSysSel.appendChild(opt);
      }
    }
    if (exoSysSel) exoSysSel.value = String(exoSystemIdx);
    exoScene?.selectSystem(exoSystemIdx);
    updateExoInfo();
  } else {
    exoScene?.hide();
  }
}

function selectExoSystem(idx: number): void {
  if (idx < 0 || idx >= EXO_SYSTEMS.length) return;
  exoSystemIdx = idx;
  if (exoMode && exoScene) {
    exoScene.selectSystem(idx);
    updateExoInfo();
  }
}

function updateExoInfo(): void {
  if (!exoInfoEl) return;
  const s = EXO_SYSTEMS[exoSystemIdx];
  const known = s.planets.filter((p) => p.M != null).length;
  exoInfoEl.textContent = `${s.planets.length} planets · ${known} with mass`;
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
 * behind; leave `null` ONLY for a destination that selects nothing (none of
 * the current call sites do — the Sky/System anchors select the Sun, and
 * constellation picks use `flyToConstellation`).
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
  // Plan 044 C4: reduced-motion → duration 0 (instant cut, no dolly).
  flight = makeFlight(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    dest,
    REDUCED_MOTION ? 0 : duration,
    trackId,
    built.camera.fov,
    FOV_DEG,
  );
}

/**
 * Fly to a picked constellation (plan 010, S4): move to the sky-dome anchor
 * that centres the figure, light its lines gold, and drop any body follow.
 * The figure is static (the sky doesn't move), so no body tracking is needed
 * — the flight lands and hands the camera back to OrbitControls looking
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
    REDUCED_MOTION ? 0 : 1.6,
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
    if (fly === 'system') flyTo(camAnchorFor('system'), 1.6, 'sun');
    else if (fly === 'constellations') flyTo(camAnchorFor('constellations'), 1.8, 'sun', true);
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

  // Plan 044 B6: exoplanet mode. "Systems" enters it; the picker switches
  // systems; "Back" returns to the solar system.
  document.getElementById('exo-enter')?.addEventListener('click', () => setExoMode(true));
  exoBackBtn?.addEventListener('click', () => setExoMode(false));
  exoSysSel?.addEventListener('change', (ev) =>
    selectExoSystem(parseInt((ev.target as HTMLSelectElement).value, 10)),
  );
}

function applyToggles(): void {
  markSceneDirty(); // F6: orbit/label/belt/figure visibility changed
  for (const entry of built.bodies.values()) {
    if (entry.orbit) (entry.orbit.material as THREE.Material).visible = orbitsEl.checked;
    // Plan 044 A5: the 3D sprite labels stay hidden — the 2D overlay
    // (planetLabelLayer, below) draws the names instead. The Labels toggle
    // shows/hides that overlay, not these sprites.
  }
  // Constellation NAME labels follow the Labels toggle (D3). Plan 016 P1:
  // they live on the 2D screen-space overlay, so the toggle just shows or
  // hides the layer. The sky lines and star dots are always present — they
  // are the sky itself.
  labelLayer?.setVisible(labelsEl.checked);
  // Plan 044 A5: the planet/body name overlay shares the Labels toggle.
  planetLabelLayer?.setVisible(labelsEl.checked);
  for (const field of built.belts) {
    field.mesh.visible = beltsEl.checked;
  }
  // Plan 012: constellation figures (the "Figures" toggle). The per-figure
  // fade runs in the highlight pass; here we just switch the group.
  built.constellationFigures.visible = figuresOn;
  // Plan 046 B4: Messier deep-sky markers (the "DSO" toggle). Off by default.
  built.dso.visible = dsoOn;
  // Plan 044 A3: subtle DOF (bokeh) toggle. Off by default. Only meaningful on
  // the HDR/composer path — when postOn is false the composer (and its bokeh
  // pass) isn't rendered, so the toggle is a no-op there. D6: the low tier has
  // no composer at all (built.post === null), so it's a no-op there too.
  built.post?.setDOF(dofEl.checked && postOn);
}

// --- Plan 044 A3: sun lens flare + subtle DOF ------------------------------
// Per-frame driver for the camera-attached flare overlay and the bokeh focus.
// Scratch vectors are module-level (no per-frame allocation).
const _flareSunWorld = new THREE.Vector3();
const _flareSunNdc = new THREE.Vector3();
const _flareBodyWorld = new THREE.Vector3();
let _flareOccluders: THREE.Object3D[] | null = null;

function updateSunFlareAndDOF(): void {
  // D6: the flare + DOF live in the post stack, which the low tier doesn't
  // build — nothing to drive there.
  if (!built.post) return;
  const cam = built.camera;
  const sun = built.bodies.get('sun');
  const flare = built.post.flare;
  // Hide the flare if the sun body isn't in the scene (e.g. not built yet).
  if (!sun) {
    flare.group.visible = false;
    return;
  }
  sun.mesh.getWorldPosition(_flareSunWorld);
  // Project the sun to NDC (z in [-1,1]; z>1 = behind the camera).
  _flareSunNdc.copy(_flareSunWorld).project(cam);
  const inFrame =
    _flareSunNdc.z < 1 &&
    _flareSunNdc.x > -1.05 &&
    _flareSunNdc.x < 1.05 &&
    _flareSunNdc.y > -1.05 &&
    _flareSunNdc.y < 1.05;
  if (!inFrame) {
    flare.group.visible = false;
  } else {
    // Occlusion: hide the flare when a planet sits between the camera and the
    // sun (a screen-space overlay can't depth-test against the scene).
    if (_flareOccluders === null) {
      _flareOccluders = [];
      for (const entry of built.bodies.values()) {
        if (entry.def.id !== 'sun') _flareOccluders.push(entry.mesh);
      }
    }
    const occluded = isSunOccluded(cam, _flareSunWorld, _flareOccluders);
    flare.group.visible = !occluded;
    if (!occluded) {
      flare.update(cam, _flareSunNdc);
    }
  }
  // Subtle DOF: focus tracks the selected body's distance from the camera so
  // the focused planet stays sharp while the foreground/background softens.
  // Only written while the pass is enabled (one uniform write per frame).
  if (built.post.dofEnabled()) {
    const focusId = followId || selectedBodyId || 'sun';
    const focusBody = built.bodies.get(focusId);
    let dist = 1.0;
    if (focusBody) {
      focusBody.mesh.getWorldPosition(_flareBodyWorld);
      dist = cam.position.distanceTo(_flareBodyWorld);
    }
    built.post.setDOFFocus(dist);
  }
}

/**
 * Format the current speed as the panel readout (and the scrub overlay's)
 * string: magnitude + unit + an explicit reverse arrow. Kept separate from
 * fmtSpeed so the scrub feedback in the mini strip (plan 022) shares the exact same
 * formatting — one code path, no drift.
 */
function speedValueStr(): string {
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
    unit = t('unitDaysPerSec');
  } else if (a >= 1) {
    mag = a.toFixed(1);
    unit = t('unitDaysPerSec');
  } else if (a >= 0.1) {
    mag = a.toFixed(2);
    unit = t('unitDaysPerSec');
  } else {
    mag = (a * 24).toFixed(2);
    unit = t('unitHoursPerSec');
  }
  return `${arrow}${mag} ${unit}`;
}

function fmtSpeed(): void {
  const s = speedValueStr();
  speedValueEl.textContent = s;
  hudSpeedEl.textContent = s; // F3: the mini strip shares the exact string
}

function fmtDate(): void {
  const d = clock.toDate();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  dateEl.textContent = `${y}-${m}-${day} ${h}:${min} UTC`;
  // F3: the mini strip. Day-only on phones (<560 px) to keep the strip
  // narrow next to the full-width panel; full `YYYY-MM-DD HH:MM` elsewhere.
  // The panel's Date row always keeps the full form.
  hudDateEl.textContent = hudDateDayOnly ? `${y}-${m}-${day}` : `${y}-${m}-${day} ${h}:${min}`;
  // Plan 025 F3 (v2): the strip's year label is ALWAYS on, so it tracks the
  // sim clock every frame (not just while scrubbing). Cheap: a 4-char
  // textContent write, and only when the year actually changes.
  const yearStr = String(y);
  if (hudTimelineYearEl.textContent !== yearStr) {
    hudTimelineYearEl.textContent = yearStr;
  }
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
  markSceneDirty(); // F6: date jump repositions every body
  dateEl.classList.remove('flash');
  void dateEl.offsetWidth;
  dateEl.classList.add('flash');
  if (eventsPanel.eventsVisible()) eventsPanel.refreshEvents();
  syncUrl();
}

// --- Plan 026 F1: clickable-date calendar popover -------------------------
// The mini pane's date (#hud-date) opens a calendar popover. Browsing the
// month/year is free (calYear/calMonth track the VIEW, not the clock); only
// clicking a day (or "Today") commits a jump to the sim clock, keeping the
// current time of day — the same contract as #date-pick.

/** Render the popover's header title + 6×7 day grid for calYear/calMonth. */
function renderCalendar(): void {
  dateCalTitleEl.textContent = fmtMonthYear(calYear, calMonth);
  const { grid } = monthGrid(calYear, calMonth);
  const sim = clock.toDate();
  const today = new Date();
  const frag = document.createDocumentFragment();
  for (const d of grid) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    if (d === 0) {
      cell.classList.add('blank');
    } else {
      cell.textContent = String(d);
      const dayDate = new Date(Date.UTC(calYear, calMonth, d));
      if (isSameDayUtc(dayDate, sim)) cell.classList.add('sel');
      if (
        isSameDayUtc(dayDate, today) &&
        calYear === today.getUTCFullYear() &&
        calMonth === today.getUTCMonth()
      ) {
        cell.classList.add('today');
      }
      cell.addEventListener('click', () => pickCalendarDay(d));
    }
    frag.appendChild(cell);
  }
  dateCalGridEl.replaceChildren(frag);
}

/** Commit a day from the popover: jump the clock, keep time-of-day. */
function pickCalendarDay(day: number): void {
  const cur = clock.toDate();
  const target = new Date(Date.UTC(calYear, calMonth, day, cur.getUTCHours(), cur.getUTCMinutes()));
  if (Math.abs(target.getTime() - cur.getTime()) < 60_000) return; // same day
  clock.setDate(target);
  resampleMoonNow(); // Moon orbit line jumps with the epoch
  markSceneDirty(); // F6: date jump repositions every body
  dateEl.classList.remove('flash');
  void dateEl.offsetWidth;
  dateEl.classList.add('flash');
  if (eventsPanel.eventsVisible()) eventsPanel.refreshEvents();
  syncUrl();
  renderCalendar(); // re-mark the selected day
}

/** Open the popover, seeded to the sim clock's current month. */
function openCalendar(): void {
  const d = clock.toDate();
  calYear = d.getUTCFullYear();
  calMonth = d.getUTCMonth();
  calSelDay = d.getUTCDate();
  calOpen = true;
  dateCalEl.classList.add('open');
  dateCalEl.setAttribute('aria-hidden', 'false');
  renderCalendar();
}

function closeCalendar(): void {
  if (!calOpen) return;
  calOpen = false;
  dateCalEl.classList.remove('open');
  dateCalEl.setAttribute('aria-hidden', 'true');
}

/** Move the popover's view by `delta` months (wraps across years). */
function calShiftMonths(delta: number): void {
  const idx = calYear * 12 + calMonth + delta;
  calYear = Math.floor(idx / 12);
  calMonth = ((idx % 12) + 12) % 12;
  renderCalendar();
}

/** Plan 026 F2: jump the popover's view by `delta` years (month preserved). */
function calShiftYears(delta: number): void {
  calYear += delta;
  renderCalendar();
}

dateCalYn5El.addEventListener('click', () => calShiftYears(-5));
dateCalYn1El.addEventListener('click', () => calShiftYears(-1));
dateCalYp1El.addEventListener('click', () => calShiftYears(1));
dateCalYp5El.addEventListener('click', () => calShiftYears(5));

hudDateEl.addEventListener('click', () => {
  if (calOpen) closeCalendar();
  else openCalendar();
});
// Keyboard: Enter/Space on the focused date toggles the popover.
hudDateEl.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' || ev.key === ' ') {
    ev.preventDefault();
    if (calOpen) closeCalendar();
    else openCalendar();
  }
});
dateCalPrevEl.addEventListener('click', () => calShiftMonths(-1));
dateCalNextEl.addEventListener('click', () => calShiftMonths(1));
dateCalTodayEl.addEventListener('click', () => {
  const now = new Date();
  const cur = clock.toDate();
  const target = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      cur.getUTCHours(),
      cur.getUTCMinutes(),
    ),
  );
  clock.setDate(target);
  resampleMoonNow();
  dateEl.classList.remove('flash');
  void dateEl.offsetWidth;
  dateEl.classList.add('flash');
  if (eventsPanel.eventsVisible()) eventsPanel.refreshEvents();
  syncUrl();
  calYear = now.getUTCFullYear();
  calMonth = now.getUTCMonth();
  renderCalendar();
});
// Close on outside click (anywhere that isn't the popover or the date) or Esc.
document.addEventListener('pointerdown', (ev) => {
  if (!calOpen) return;
  const t = ev.target as Element | null;
  if (t && (t.closest('#date-cal') || t === hudDateEl)) return;
  closeCalendar();
});
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') closeCalendar();
  // F1: F2 toggles the HDR post stack (bloom + ACES). `p` is already the
  // pause URL param, so the keyboard toggle uses F2 (no Chrome default,
  // no clash with the input keys: Escape/Enter/Space/arrows).
  else if (ev.key === 'F2') {
    ev.preventDefault();
    postOn = !postOn;
    built.sunGlow.visible = postOn;
    markSceneDirty(); // F6: F2 changes the HDR path even when the view is parked
  }
});

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
        setInfoFacts(null);
        return;
      }
      const [dx, dy, dz] = CONSTELLATION_CENTER_DIRS[idx];
      const decDeg = (Math.asin(Math.min(1, Math.max(-1, dy))) * 180) / Math.PI;
      let raH = (Math.atan2(-dz, -dx) * 180) / Math.PI / 15;
      if (raH < 0) raH += 24;
      infoEl.hidden = false;
      infoNameEl.textContent = `${c.name} — constellation`;
      infoLabel1El.textContent = t('infoCenterRa');
      infoLabel2El.textContent = t('infoCenterDec');
      infoLabel3El.textContent = t('infoStars');
      infoPeriodEl.textContent = `${raH.toFixed(1)}h`;
      infoDistanceEl.textContent = `${decDeg >= 0 ? '+' : ''}${decDeg.toFixed(1)}°`;
      infoRangeEl.textContent = `${c.stars.length} stars`;
      setInfoFacts(null); // a constellation shows no body facts — clear any stale rows
      return;
    }
    infoEl.hidden = true;
    setInfoFacts(null);
    return;
  }
  const def = byId.get(followId);
  const r = def ? orbitReadout(def, clock.t) : null;
  if (!def || !r) {
    infoEl.hidden = true;
    setInfoFacts(null);
    return;
  }
  infoEl.hidden = false;
  infoNameEl.textContent = def.name;
  infoLabel1El.textContent = t('infoOrbitPeriod');
  infoLabel2El.textContent = t('infoDistance');
  infoLabel3El.textContent = t('infoPeriApo');
  infoPeriodEl.textContent = formatPeriod(r.periodDays);
  infoDistanceEl.textContent =
    def.kind === 'moon'
      ? `${formatDistanceKm(r.distanceKm)} from ${byId.get(def.parent ?? '')?.name ?? 'parent'}`
      : `${formatDistanceKm(r.distanceKm)} from Sun`;
  infoRangeEl.textContent = `${formatDistanceKm(r.perihelionKm)} / ${formatDistanceKm(r.aphelionKm)}`;
  setInfoFacts(def, clock.t);
}

/**
 * F5: render (or clear) the static "facts" block under the live readout.
 * Called from every `updateInfo()` branch so the card never carries a body's
 * facts while showing a constellation (or nothing). Display-only.
 */
function setInfoFacts(def: BodyDefinition | null, tDays?: number): void {
  if (!infoFactsEl) return;
  infoFactsEl.replaceChildren();
  if (!def) return;
  for (const row of bodyFacts(def)) {
    const el = document.createElement('div');
    el.className = 'info-row';
    const label = document.createElement('span');
    label.textContent = row.label;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = row.value;
    el.append(label, value);
    infoFactsEl.appendChild(el);
  }
  // Plan 044 B4: for the five small bodies (Pluto, Ceres, Eris, Haumea,
  // Makemake) append the NASA/JPL SBDB facts — designation, orbit class,
  // absolute magnitude, discovery, and observation arc. The major planets
  // are not in the SBDB, so sbdbFacts returns [] for them and nothing is
  // added. (Baked data: the SBDB API has no CORS headers, see src/sim/sbdb.ts.)
  for (const row of sbdbFacts(def.id)) {
    const el = document.createElement('div');
    el.className = 'info-row';
    const label = document.createElement('span');
    label.textContent = row.label;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = row.value;
    el.append(label, value);
    infoFactsEl.appendChild(el);
  }
  // Plan 044 B7: named asteroids + comets get their own SBDB facts block
  // (designation, class, H, diameter, SPK-ID). The five dwarf planets use
  // B4's sbdbFacts above; the two are mutually exclusive per body.
  for (const row of smallBodyFacts(def.id)) {
    const el = document.createElement('div');
    el.className = 'info-row';
    const label = document.createElement('span');
    label.textContent = row.label;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = row.value;
    el.append(label, value);
    infoFactsEl.appendChild(el);
  }
  // Plan 044 B2: for the Moon, diff the analytic Meeus model against the
  // baked JPL Horizons (DE441) ephemeris and show the residual — the live
  // "most accurate" proof. Only when the snapshot covers the current time.
  if (def.id === 'moon' && tDays !== undefined) {
    const meeus = moonGeocentricJ2000(tDays);
    const diff = moonHorizonsDiff(meeus, tDays);
    if (diff) {
      const rows: { label: string; value: string }[] = [
        { label: 'JPL Horizons range', value: formatDistanceKm(diff.rangeKm) },
        { label: 'Meeus vs DE441', value: `Δ ${diff.residualKm.toFixed(1)} km` },
      ];
      for (const row of rows) {
        const el = document.createElement('div');
        el.className = 'info-row';
        const label = document.createElement('span');
        label.textContent = row.label;
        const value = document.createElement('span');
        value.className = 'value';
        value.textContent = row.value;
        el.append(label, value);
        infoFactsEl.appendChild(el);
      }
    }
  }
}

// --- UI wiring -------------------------------------------------------------

/**
 * Set the speed from a slider value (log10 days/s) and sync the readout and
 * URL. Both the slider's own `input` event and the time-scrub gesture
 * (plan 022) write through here so the panel and the gesture can never
 * diverge.
 */
function applySliderSpeed(logValue: number): void {
  speedEl.value = String(logValue);
  clock.setLogSpeed(logValue);
  markSceneDirty(); // F6: speed change alters motion
  fmtSpeed();
  syncUrl();
}

speedEl.addEventListener('input', () => {
  applySliderSpeed(parseFloat(speedEl.value));
});

pauseBtn.addEventListener('click', () => {
  clock.setPaused(!clock.isPaused);
  pauseBtn.textContent = clock.isPaused ? t('resume') : t('pause');
  markSceneDirty(); // F6: pause/resume changes motion state
  syncUrl();
});

// Time direction is a toggle, NOT part of the slider: the slider stays a
// pure magnitude so slow satellite observation is available in BOTH
// directions (the old signed slider made "slow" only reachable one way).
reverseBtn.addEventListener('click', () => {
  clock.setReversed(!clock.isReversed);
  reverseBtn.textContent = clock.isReversed ? 'Reverse ←' : 'Reverse →';
  reverseBtn.classList.toggle('active', clock.isReversed);
  markSceneDirty(); // F6: direction change (affects motion when running)
  fmtSpeed();
  syncUrl();
});

nowBtn.addEventListener('click', () => {
  clock.setDate(new Date());
  resampleMoonNow(); // Moon orbit line jumps with the epoch
  markSceneDirty(); // F6: epoch jump repositions every body
  syncUrl();
});

// --- Celestial events (B1) — extracted to src/app/eventsPanel.ts (plan 044 D2) ---
const eventsPanel = createEventsPanel({
  clock,
  dateEl,
  eventsToggleBtn,
  eventsRangeEl,
  eventsRowEl,
  eventsListEl,
  datePickEl,
  resampleMoonNow,
  syncUrl,
  camAnchorForBody,
  flyTo,
  applyDatePick,
});

// The "Find" combobox (body + constellation search) lives in src/app/searchUi.ts
// (plan 044 D2). Only setFindValue is needed here (flyTo + URL restore call it).
const { setFindValue } = createSearchUi({
  byId,
  camAnchorForBody,
  findInputEl,
  findListEl,
  flyTo,
  flyToConstellation,
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
dsoEl.addEventListener('change', () => {
  dsoOn = dsoEl.checked;
  applyToggles();
  syncUrl();
});
dofEl.addEventListener('change', () => {
  applyToggles();
  syncUrl();
});

// --- Plan 035 F5: commands, cinematic intro, palette, info facts -----------
// The pure math lives in src/render/{commands,intro,bodyFacts}.ts (unit-tested).
// This block wires those to the live scene + DOM. Every keyboard/palette action
// funnels through runCommand(id) so the key handler, the palette, and a future
// ?cmd= URL param all share one dispatch.

/** Toggle the fresnel atmosphere shells (the `a` key). */
function toggleAtmospheres(): void {
  atmosOn = !atmosOn;
  for (const entry of built.bodies.values()) {
    if (entry.atmosphereMesh) entry.atmosphereMesh.visible = atmosOn;
  }
}

/** Show/hide the deep-sky sub-layers (Milky-Way + starfield = `m`, zodiacal = `z`). */
function applySkyVisibility(): void {
  markSceneDirty(); // F6: sky layer visibility changed
  const g = built.skybox.group;
  const mw = g.getObjectByName('milkyway-skybox');
  const stars = g.getObjectByName('starfield');
  const zodi = g.getObjectByName('zodiacal-light');
  if (mw) mw.visible = milkyWayOn;
  if (stars) stars.visible = milkyWayOn; // the starfield is part of the deep sky
  if (zodi) zodi.visible = zodiacalOn;
}

/**
 * Cycle the camera preset (the `c` key): top-down → side-on → back to the
 * default 3/4 framing of the followed body. Works on the followed body (or the
 * Sun if none) by building a fresh anchor from its live position + extent.
 */
function cycleCameraPreset(): void {
  cameraPresetIdx = (cameraPresetIdx + 1) % 3;
  const fid = followId || 'sun';
  const entry = built.bodies.get(fid);
  if (!entry) return;
  const aspect = built.camera.aspect;
  // Default framing (idx 2) reuses the body anchor (a clean 3/4 reframe).
  if (cameraPresetIdx === 2) {
    const dest = camAnchorForBody(fid);
    if (dest) flyTo(dest, 0.9, fid);
    return;
  }
  // extent: the body's rendered radius (scaled to scene units).
  const r = (entry as unknown as { radius: number }).radius ?? 1;
  const extent = Math.max(r * 2, 0.5);
  const base = frameBody(
    [entry.worldPos.x, entry.worldPos.y, entry.worldPos.z],
    extent,
    FOV_DEG,
    aspect,
  );
  // top-down: straight up; side-on: in the ecliptic plane.
  const dist = Math.hypot(
    base.pos[0] - base.target[0],
    base.pos[1] - base.target[1],
    base.pos[2] - base.target[2],
  );
  const dest: CamAnchor =
    cameraPresetIdx === 0
      ? { pos: [base.target[0], base.target[1] + dist, base.target[2]], target: base.target }
      : { pos: [base.target[0], base.target[1], base.target[2] + dist], target: base.target };
  flyTo(dest, 0.9, fid);
}

/** Jump the camera to a body id (palette `jump-<id>` / digit keys). */
function jumpToBody(id: string): void {
  const dest = camAnchorForBody(id);
  if (dest) flyTo(dest, 1.4, id);
}

/** Stop the follow (the `Esc` key) — the camera parks free at the origin. */
function releaseFollow(): void {
  followId = '';
  selectedBodyId = '';
  selectedConstellation = '';
  lastHighlightPoseKey = '';
  setFindValue('');
  updateInfo();
  syncUrl();
}

/**
 * The single command dispatcher. `id` is a stable command id from the registry
 * (or `jump-<bodyId>` / `jump-digit-<d>`). Unknown ids are a silent no-op so a
 * stale palette entry can never throw.
 */
function runCommand(id: string): void {
  markSceneDirty(); // F6: any command may change the frame
  if (id.startsWith('jump-digit-')) {
    const d = id.slice('jump-digit-'.length);
    const pid = digitToPlanet(d, PLANETS, 'sun');
    if (pid) jumpToBody(pid);
    return;
  }
  if (id.startsWith('jump-')) {
    jumpToBody(id.slice('jump-'.length));
    return;
  }
  switch (id) {
    case 'pause':
      clock.setPaused(!clock.isPaused);
      pauseBtn.textContent = clock.isPaused ? t('resume') : t('pause');
      syncUrl();
      break;
    case 'speed-up':
    case 'speed-down': {
      const delta = id === 'speed-up' ? 0.25 : -0.25;
      const next = Math.max(-3, Math.min(2.5, parseFloat(speedEl.value) + delta));
      applySliderSpeed(next);
      break;
    }
    case 'now':
      clock.setDate(new Date());
      resampleMoonNow();
      syncUrl();
      break;
    case 'reverse':
      clock.setReversed(!clock.isReversed);
      reverseBtn.textContent = clock.isReversed ? 'Reverse ←' : 'Reverse →';
      reverseBtn.classList.toggle('active', clock.isReversed);
      fmtSpeed();
      syncUrl();
      break;
    case 'time-step-back':
    case 'time-step-fwd': {
      // Plan 044 C4: a keyboard path to scrub time (the timeline drag is the
      // mouse/touch equivalent). The step is proportional to the current sim
      // speed — 5× the per-second rate — so at 1 d/s a tap jumps 5 days and at
      // 30 d/s it jumps 150 days: the same "feel" as a short drag, and it
      // respects the Reverse toggle (back = against the flow).
      const days = Math.abs(clock.getSpeed()) * 5;
      const dir = id === 'time-step-fwd' ? 1 : -1;
      const sign = clock.isReversed ? -1 : 1;
      const d = clock.toDate();
      d.setTime(d.getTime() + dir * sign * days * 86_400_000);
      clock.setDate(d);
      resampleMoonNow();
      syncUrl();
      break;
    }
    case 'orbits':
      orbitsEl.checked = !orbitsEl.checked;
      applyToggles();
      syncUrl();
      break;
    case 'labels':
      labelsEl.checked = !labelsEl.checked;
      applyToggles();
      syncUrl();
      break;
    case 'belts':
      beltsEl.checked = !beltsEl.checked;
      applyToggles();
      syncUrl();
      break;
    case 'figures':
      figuresEl.checked = !figuresEl.checked;
      figuresOn = figuresEl.checked;
      applyToggles();
      syncUrl();
      break;
    case 'milkyway':
      milkyWayOn = !milkyWayOn;
      applySkyVisibility();
      break;
    case 'zodiacal':
      zodiacalOn = !zodiacalOn;
      applySkyVisibility();
      break;
    case 'atmospheres':
      toggleAtmospheres();
      break;
    case 'post':
      postOn = !postOn;
      built.sunGlow.visible = postOn;
      break;
    case 'scale':
      requestScale(scale === TRUE_SCALE ? 'visible' : 'real');
      break;
    case 'camera-preset':
      cycleCameraPreset();
      break;
    case 'release':
      releaseFollow();
      break;
    case 'screenshot':
      screenshotBtn.click();
      break;
    case 'palette':
      if (paletteOpen) closePalette();
      else openPalette();
      break;
  }
}

// --- Cinematic intro --------------------------------------------------------
// A one-shot, skippable dolly: far-out establishing pull → settle on the Sun →
// push to Earth. Each leg is a normal flight; we arm `followId` on each so the
// render loop tracks the live body (no whirling on the moving Earth). The
// title fades in over the first legs and out near the end. Any user input
// (drag / wheel / key / click a body) skips to the final Earth leg.
function startIntro(): void {
  if (intro || !introTitleEl || !introWrapEl) return;
  introWrapEl.hidden = false;
  introWrapEl.setAttribute('aria-hidden', 'false');
  introTitleEl.hidden = false;
  introTitleEl.style.opacity = '0';
  if (introSkipEl) introSkipEl.hidden = false; // Plan 037: hidden in the DOM now
  // Leg 1 starts from a far-out system anchor (3× the system fit) so the pull
  // reads as "we're deep in space". We park the camera there, then arm the
  // first leg (a flight to the Sun) so the dolly begins moving immediately.
  const sys = camAnchorFor('system');
  const far: CamAnchor = {
    pos: [sys.pos[0] * 3, sys.pos[1] * 3, sys.pos[2] * 3],
    target: [0, 0, 0],
  };
  built.camera.position.set(far.pos[0], far.pos[1], far.pos[2]);
  built.controls.target.set(0, 0, 0);
  intro = { leg: 0, titleEl: introTitleEl, tail: false, tailT: 0, tailFromSpeed: 0 };
  built.controls.enabled = false;
  lastIntroTotal = 0; // the title clock spans the WHOLE intro (0..INTRO_DURATION)
  beginIntroLeg(0);
}

/** Start a specific intro leg as a flight (armed to its body). */
function beginIntroLeg(i: number): void {
  if (!intro) return;
  const leg = INTRO_LEGS[i];
  const dest = camAnchorForBody(leg.bodyId) ?? camAnchorFor('system');
  // Leg 0 is the far-out establishing pull: start from 3× and pull IN to the
  // Sun (zoom multiplier applied to the destination so the camera closes in).
  if (i === 0) {
    dest.pos = [dest.pos[0] * leg.zoom, dest.pos[1] * leg.zoom, dest.pos[2] * leg.zoom];
  }
  followId = leg.bodyId;
  setFindValue(leg.bodyId);
  selectedBodyId = leg.bodyId;
  selectedConstellation = '';
  intro.leg = i;
  built.controls.enabled = false;
  // Plan 044 A6: the intro legs use the smoother quintic `cineEase` (the
  // "cinematic" fly-to) instead of the cubic normal flights use.
  flight = makeFlight(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    dest,
    leg.duration,
    leg.bodyId,
    built.camera.fov,
    FOV_DEG,
    true,
  );
}

let lastIntroTotal = 0;

/**
 * Per-frame intro tick (called from the render loop while `intro` is active).
 * `dtReal` is the real elapsed seconds. Drives the title fade on the whole
 * intro clock (legs + tail), and — once the legs are done — the A6 TAIL: the
 * timeline strip glows into view, time visibly accelerates, and an event
 * marker pops at "you are here".
 */
function tickIntroTitle(dtReal: number): void {
  if (!intro) return;
  lastIntroTotal += dtReal;
  if (intro.titleEl) intro.titleEl.style.opacity = String(titleOpacity(lastIntroTotal));
  // Plan 044 A6: the TAIL runs after the last leg lands on Earth. The camera
  // is settled (no flight), so this is pure UI: glow the strip, ramp the time
  // speed, and pop the event marker. When the tail elapses, finish the intro.
  if (intro.tail) {
    intro.tailT += dtReal;
    tickIntroTail(intro.tailT);
    if (intro.tailT >= INTRO_TAIL_DURATION) finishIntro(false);
    return;
  }
  // Safety: if a leg's flight never reports "done" (e.g. a stalled device),
  // end the intro once the whole intro (legs + tail) has elapsed rather than
  // locking the controls forever.
  if (lastIntroTotal > INTRO_DURATION + INTRO_TAIL_DURATION + 1.5) {
    finishIntro(false);
  }
}

/**
 * Plan 044 A6: one frame of the intro tail. `t` is the tail's elapsed seconds.
 * Reveals + glows the timeline strip, ramps the sim speed from the tail's
 * start speed to a pleasant "time is flowing" default, and pops the "you are
 * here" event marker. The strip is left visible (the intro hands back to the
 * user on the timeline, which is the whole point of the tail).
 */
function tickIntroTail(t: number): void {
  // 1. Reveal the strip + paint the current year's events (once per year).
  tlShow();
  tlRefresh();
  // 2. Advance the caret to the CURRENT day-of-year every frame — tlRefresh
  // only repaints on a year change, but the tail's speed ramp moves the date
  // continuously, so the "you are here" caret (and the marker on it) must
  // track it live.
  const year = tlCurrentYear();
  const { span0Days, spanLenDays } = yearSpan(year);
  const frac = Math.min(1, Math.max(0, (clock.t - span0Days) / spanLenDays));
  tlSetCaret(frac);
  // 3. Glow: a box-shadow pulse on the strip, scaled by the tail glow curve.
  const glow = introTailGlow(t);
  hudTimelineEl.style.boxShadow =
    glow > 0.01 ? `0 0 ${18 * glow}px ${6 * glow}px rgba(120, 200, 255, ${0.55 * glow})` : '';
  // 4. Time visibly accelerates: ramp the speed slider from where it was to a
  // pleasant default (1.5 ≈ a few days per second — motion you can see).
  const from = intro?.tailFromSpeed ?? 0;
  const to = 1.5;
  applySliderSpeed(introTailSpeed(t, from, to));
  // 5. Pop the "you are here" event marker at the caret (the tail's payoff:
  // the timeline is alive, and here's where you are in it).
  popIntroTailMarker(glow, frac);
}

/**
 * Plan 044 A6: the tail's event-marker pop. A single marker at the caret
 * ("you are here") that scales/fades in with the glow, then settles. It lives
 * in the persistent `#hud-timeline-track` (NOT the dynamic layer, which
 * `tlPaint` clears on a year change) and is repositioned each frame so it
 * tracks the moving caret as time ramps.
 */
function popIntroTailMarker(glow: number, frac: number): void {
  if (glow <= 0.01) return;
  let el = document.getElementById('intro-tail-marker') as HTMLElement | null;
  if (!el) {
    el = document.createElement('div');
    el.id = 'intro-tail-marker';
    hudTimelineBarEl.appendChild(el);
  }
  el.style.left = `${frac * 100}%`;
  const s = 0.6 + 0.8 * glow; // pop from 0.6× to 1.4×
  el.style.transform = `translate(-50%, -50%) scale(${s})`;
  el.style.opacity = String(glow);
}

/**
 * A leg's flight just completed (the render loop's flight-done branch calls
 * this while `intro` is active). Advance to the next leg, or — on the final
 * leg — start the A6 TAIL (the intro now ENDS on the time-scrub, not the
 * moment the camera lands).
 */
function onIntroLegDone(): void {
  if (!intro) return;
  if (intro.leg < INTRO_LEGS.length - 1) {
    beginIntroLeg(intro.leg + 1);
  } else {
    // Plan 044 A6: landed on Earth — do NOT finish yet. Start the tail: the
    // camera is settled (no flight), so the render loop's idle-skip won't
    // stall it, and tickIntroTitle drives the strip glow + speed ramp + marker
    // pop until INTRO_TAIL_DURATION elapses.
    intro.tail = true;
    intro.tailT = 0;
    intro.tailFromSpeed = parseFloat(speedEl.value) || 0;
    // The tail's first frame reveals the strip; make sure the idle-skip
    // renders it (the strip is DOM, but the speed ramp moves the sim).
    markSceneDirty();
  }
}

/** End the intro, optionally immediately (skipped). Lands on Earth + arms follow. */
function finishIntro(skipped: boolean): void {
  if (!intro) return;
  const el = intro.titleEl;
  intro = null;
  // Plan 037: mark the intro seen for this session so a plain reload does not
  // replay the dolly. Safe to call unconditionally — finishIntro only runs once
  // per intro (guarded above). sessionStorage may throw (private mode) — ignore.
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    /* ignore — intro simply replays next load */
  }
  // Plan 044 A6: clear the tail's glow + "you are here" marker. On a natural
  // completion the strip is LEFT visible (the intro ends ON the timeline — the
  // user lands on it); on a skip we hide it again (the user jumped ahead).
  hudTimelineEl.style.boxShadow = '';
  const tailMarker = document.getElementById('intro-tail-marker');
  if (tailMarker) tailMarker.remove();
  if (skipped) hudTimelineEl.classList.remove('visible');
  if (introWrapEl) {
    introWrapEl.hidden = true;
    introWrapEl.setAttribute('aria-hidden', 'true');
  }
  // If the last leg already landed us on Earth (natural completion), there is
  // nothing left to fly — just arm the follow and hand back the controls. A
  // SKIP from an earlier leg (Sun) still needs the short Earth fly.
  const alreadyEarth = followId === 'earth';
  if (!alreadyEarth) {
    const dest = camAnchorForBody('earth');
    if (dest) {
      followId = 'earth';
      setFindValue('earth');
      selectedBodyId = 'earth';
      selectedConstellation = '';
      flight = makeFlight(
        [built.camera.position.x, built.camera.position.y, built.camera.position.z],
        [built.controls.target.x, built.controls.target.y, built.controls.target.z],
        dest,
        skipped ? 0.6 : 1.0,
        'earth',
        built.camera.fov,
        FOV_DEG,
      );
      built.controls.enabled = false;
      if (el) {
        el.style.opacity = '0';
        el.hidden = true;
      }
      if (introSkipEl) introSkipEl.hidden = true;
      syncUrl();
      return;
    }
  }
  // Already on Earth (natural end) or no Earth anchor: hand back to the free
  // follow immediately.
  built.controls.enabled = true;
  built.controls.update();
  const e = built.bodies.get(followId);
  if (e) built.controls.target.copy(e.worldPos);
  if (el) {
    el.style.opacity = '0';
    el.hidden = true;
  }
  if (introSkipEl) introSkipEl.hidden = true;
  syncUrl();
  // Plan 044 C2: on a NATURAL completion (not a skip), walk a first-timer
  // through the three core gestures. A short delay lets the landing settle
  // and the intro fade finish before the coach card slides up. localStorage
  // inside showOnboarding() keeps it to once per browser.
  if (!skipped) {
    window.setTimeout(showOnboarding, 700);
    // C3: the timeline nudge fires a touch later so it doesn't compete with
    // the coach card sliding up (the card is bottom-center, the hint is
    // top-center — but two simultaneous first-run prompts is too much).
    window.setTimeout(showTimelineHint, 1400);
  }
}

// ===== Plan 044 C2: 3-step first-run coach overlay =====
// Shown once per browser (localStorage) after the intro lands on Earth. The
// pure step data + persistence live in src/sim/onboarding.ts (unit-tested);
// this is the thin DOM wiring.
const onboardEl = document.getElementById('onboard') as HTMLDivElement | null;
const onboardIcon = document.getElementById('onboard-icon') as HTMLDivElement | null;
const onboardTitle = document.getElementById('onboard-title') as HTMLDivElement | null;
const onboardBody = document.getElementById('onboard-body') as HTMLDivElement | null;
const onboardDots = document.getElementById('onboard-dots') as HTMLDivElement | null;
const onboardNext = document.getElementById('onboard-next') as HTMLButtonElement | null;
const onboardSkip = document.getElementById('onboard-skip') as HTMLButtonElement | null;
let onboardStep = 0;

function renderOnboardStep(): void {
  if (!onboardEl || !onboardIcon || !onboardTitle || !onboardBody || !onboardDots || !onboardNext)
    return;
  const step = ONBOARD_STEPS[onboardStep];
  onboardIcon.textContent = step.icon;
  onboardTitle.textContent = step.title;
  onboardBody.textContent = step.body;
  // progress dots
  onboardDots.textContent = '';
  for (let i = 0; i < ONBOARD_STEPS.length; i++) {
    const d = document.createElement('span');
    if (i === onboardStep) d.className = 'on';
    onboardDots.appendChild(d);
  }
  const last = onboardStep === ONBOARD_STEPS.length - 1;
  onboardNext.textContent = last ? 'Start exploring ✦' : 'Next →';
}

function dismissOnboarding(): void {
  if (onboardEl) {
    onboardEl.hidden = true;
    onboardEl.setAttribute('aria-hidden', 'true');
  }
  markOnboarded();
}

function showOnboarding(): void {
  if (!onboardEl || !onboardNext || !onboardSkip) return;
  if (!shouldShowOnboarding()) return; // already seen
  onboardStep = 0;
  renderOnboardStep();
  onboardEl.hidden = false;
  onboardEl.setAttribute('aria-hidden', 'false');
  onboardNext.focus();
}

if (onboardNext) {
  onboardNext.addEventListener('click', () => {
    if (onboardStep < ONBOARD_STEPS.length - 1) {
      onboardStep++;
      renderOnboardStep();
    } else {
      dismissOnboarding();
    }
  });
}
if (onboardSkip) {
  onboardSkip.addEventListener('click', dismissOnboarding);
}
// Esc dismisses the tour (the palette also listens for Esc, but the tour is
// only open when the palette is closed, so there's no conflict).
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && onboardEl && !onboardEl.hidden) dismissOnboarding();
});

// ===== Plan 044 C3: one-time "drag to travel through time" nudge =====
// The timeline is a quiet 5px line; the time-travel scrub is the app's
// differentiator, so a first-timer gets a single ~4s pulse above it. Shown
// once per browser (localStorage ss3d.tlhint.v1), after the intro lands.
const tlHintEl = document.getElementById('tl-hint') as HTMLDivElement | null;
const TL_HINT_KEY = 'ss3d.tlhint.v1';
function showTimelineHint(): void {
  if (!tlHintEl) return;
  try {
    if (localStorage.getItem(TL_HINT_KEY) === '1') return;
    localStorage.setItem(TL_HINT_KEY, '1');
  } catch {
    /* private mode — show it anyway (harmless) */
  }
  tlHintEl.hidden = false;
  // The CSS animation runs 4s then holds at opacity 0; hide the element after
  // so it stops occupying the (pointer-transparent) layout slot.
  window.setTimeout(() => {
    tlHintEl.hidden = true;
  }, 4200);
}

// Any manual input on the 3D view (not the UI panel / palette) skips the
// intro to the final Earth leg — the user has spoken. The skip button itself
// and the palette input are excluded so they can do their own thing.
for (const ev of ['pointerdown', 'wheel', 'touchstart'] as const) {
  canvas.addEventListener(ev, () => {
    if (intro) finishIntro(true);
  });
}
// A keypress that the command palette intercepts (typing / or ?) must NOT
// also skip the intro — that keydown belongs to the palette.
window.addEventListener('keydown', (ev) => {
  if (!intro || ev.key === '/' || ev.key === '?' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
  // Ignore keys aimed at a text input (the find box) — those are typing, not
  // a command.
  const tag = (ev.target as HTMLElement | null)?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  finishIntro(true);
});
// The skip button ends the intro cleanly (no fly-from-current; just park on
// Earth like a normal skip).
if (introSkipEl) introSkipEl.addEventListener('click', () => finishIntro(true));

// --- Keyboard command dispatch (F5) ----------------------------------------
// One global handler routes printable command keys to runCommand (see the
// registry in render/commands.ts). `/` and `?` open the palette (not a
// command). Escape closes the palette first, else releases the follow. We only
// act on a bare keypress (no modifier) so Cmd/Ctrl/Alt browser shortcuts are
// never hijacked, and we ignore events aimed at a text input (the find box).
window.addEventListener('keydown', (ev) => {
  if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
  const tag = (ev.target as HTMLElement | null)?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (ev.key === '/' || ev.key === '?') {
    ev.preventDefault();
    if (paletteOpen) closePalette();
    else openPalette();
    return;
  }
  if (ev.key === 'Escape') {
    if (paletteOpen) closePalette();
    else releaseFollow();
    return;
  }
  const key = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
  const id = commandForKey(key);
  if (id) {
    ev.preventDefault();
    runCommand(id);
  }
});

// --- Command palette --------------------------------------------------------
function paletteMatches(id: string, label: string, hint: string, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    id.includes(needle) ||
    label.toLowerCase().includes(needle) ||
    hint.toLowerCase().includes(needle)
  );
}

function renderPaletteList(): void {
  if (!paletteListEl) return;
  paletteListEl.replaceChildren();
  const q = paletteQuery.trim();
  let count = 0;
  for (let i = 0; i < paletteItems.length; i++) {
    const item = paletteItems[i];
    if (!paletteMatches(item.id, item.label, item.hint, q)) continue;
    const row = document.createElement('div');
    row.className = 'pal-item' + (i === paletteSel ? ' active' : '');
    const keys = document.createElement('span');
    keys.className = 'pal-keys';
    keys.textContent = item.keys.join(' ') || '•';
    const label = document.createElement('span');
    label.className = 'pal-label';
    label.textContent = item.label;
    const hint = document.createElement('span');
    hint.className = 'pal-hint';
    hint.textContent = item.hint;
    row.append(keys, label, hint);
    row.addEventListener('click', () => {
      runCommand(item.id);
      closePalette();
    });
    paletteListEl.appendChild(row);
    count++;
  }
  if (count === 0) {
    const empty = document.createElement('div');
    empty.className = 'pal-empty';
    empty.textContent = 'No matching commands';
    paletteListEl.appendChild(empty);
  }
}

function openPalette(): void {
  if (!paletteEl || !paletteInputEl || !paletteListEl) return;
  paletteOpen = true;
  paletteQuery = '';
  paletteSel = 0;
  paletteEl.hidden = false;
  paletteInputEl.value = '';
  // Build the item list once per open (commands + jump-to-planet entries).
  paletteItems = paletteEntries(PLANETS.map((p) => ({ id: p.id, name: p.name }))).map((e) => ({
    id: e.id,
    label: e.label,
    keys: e.keys,
    hint: e.hint,
  }));
  // Also expose the digit-jump mapping in the list labels is implicit; the
  // command list already covers the toggles. Render + focus.
  renderPaletteList();
  requestAnimationFrame(() => paletteInputEl.focus());
}

function closePalette(): void {
  if (!paletteEl) return;
  paletteOpen = false;
  paletteEl.hidden = true;
}

// Palette input: type-to-filter + arrow/enter/esc. A keydown here must NOT
// re-enter the global command handler (it's the active text input).
if (paletteInputEl) {
  paletteInputEl.addEventListener('input', () => {
    paletteQuery = paletteInputEl.value;
    paletteSel = 0;
    renderPaletteList();
  });
  paletteInputEl.addEventListener('keydown', (ev) => {
    ev.stopPropagation();
    if (ev.key === 'Escape') {
      closePalette();
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      paletteSel = Math.min(paletteItems.length - 1, paletteSel + 1);
      renderPaletteList();
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      paletteSel = Math.max(0, paletteSel - 1);
      renderPaletteList();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      // Find the Nth visible (matching) item and run it.
      const q = paletteQuery.trim();
      let visible = 0;
      for (const item of paletteItems) {
        if (!paletteMatches(item.id, item.label, item.hint, q)) continue;
        if (visible === paletteSel) {
          runCommand(item.id);
          closePalette();
          break;
        }
        visible++;
      }
    }
  });
}
// Click outside the palette closes it.
document.addEventListener('pointerdown', (ev) => {
  if (paletteOpen && paletteEl && !(ev.target as Element | null)?.closest('#palette'))
    closePalette();
});

// D10: pause sim + GPU work when the tab is hidden. The browser throttles
// rAF to ~0 in a background tab anyway, but we stop the sim clock advancing
// and reset the lastMs reference on return so the first visible frame doesn't
// see a huge dtReal. An AbortController owns this listener (the plan's
// "one AbortController for page-level listeners" — this is the first
// subsystem to adopt it; the rest are audited in the plan notes).
const pageListeners = new AbortController();
document.addEventListener(
  'visibilitychange',
  () => {
    hidden = document.hidden;
    if (!hidden) {
      // Just became visible: reset the reference so the next frame's dtReal
      // is small (the frame loop also resets it, but doing it here means the
      // very first visible frame is already clean).
      lastMs = performance.now();
    }
  },
  { signal: pageListeners.signal },
);

window.addEventListener('resize', () => {
  markSceneDirty(); // F6: viewport changed — repaint
  built.camera.aspect = window.innerWidth / window.innerHeight;
  built.camera.updateProjectionMatrix();
  built.renderer.setSize(window.innerWidth, window.innerHeight);
  // F1: keep the post stack's render target at the new size too. D6: the low
  // tier has no composer, so this is a no-op there.
  built.post?.setSize(window.innerWidth, window.innerHeight);
  // F3: re-check the phone breakpoint for the mini strip's day-only date.
  // Only rewrite when it actually flips (a refresh mid-frame is otherwise a
  // no-op for the date, but avoid redundant DOM writes on every resize).
  const dayOnly = window.innerWidth < 560;
  if (dayOnly !== hudDateDayOnly) {
    hudDateDayOnly = dayOnly;
    fmtDate();
  }
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
// F1: `?post=0` disables the HDR post stack (device fallback — some GPUs
// choke on the HalfFloat RT / bloom). It is a GLOBAL param, not part of the
// ViewState round-trip, so read it straight off the URL here.
{
  const postParam = new URL(window.location.href, 'http://localhost').searchParams.get('post');
  if (postParam === '0') postOn = false;
}
// D6: quality tier. `?q=high|medium|low` overrides (testing / power users);
// otherwise select from navigator.deviceMemory (undefined on Firefox/Safari →
// 'high', the current behaviour). The tier is applied in rebuildScene below.
{
  const qParam = new URL(window.location.href, 'http://localhost').searchParams.get('q');
  if (qParam === 'high' || qParam === 'medium' || qParam === 'low') {
    qualityTier = qParam;
  } else {
    qualityTier = selectQualityTier(
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
    );
  }
}
if (urlState.belts != null) beltsEl.checked = urlState.belts;
if (urlState.figures != null) {
  figuresEl.checked = urlState.figures;
  figuresOn = urlState.figures;
}
if (urlState.dso != null) {
  dsoEl.checked = urlState.dso;
  dsoOn = urlState.dso;
}
if (urlState.dof != null) dofEl.checked = urlState.dof;
if (urlState.paused != null) {
  clock.setPaused(urlState.paused);
  pauseBtn.textContent = urlState.paused ? t('resume') : t('pause');
}
if (urlState.eventsOpen != null) {
  eventsRowEl.hidden = !urlState.eventsOpen;
  eventsToggleBtn.classList.toggle('active', urlState.eventsOpen);
}
// Restore an opened events list from a shared link.
if (!eventsRowEl.hidden) eventsPanel.refreshEvents();
// Plan 017 F4: the selection is ALWAYS the view anchor — a restored body
// keeps its follow, a restored constellation keeps its pick, and anything
// else (no/unknown follow) re-anchors on the Sun. There is no free-camera
// state anymore.
const restoredConstellation =
  urlState.constellation && CONSTELLATIONS.some((c) => c.name === urlState.constellation)
    ? urlState.constellation
    : null;
if (urlState.follow && byId.has(urlState.follow)) {
  setFindValue(urlState.follow);
  followId = urlState.follow;
  // Restoring a body selection re-arms its highlight ring too (plan 015 P6:
  // any body — planet or satellite).
  selectedBodyId = urlState.follow;
} else if (!restoredConstellation) {
  setFindValue('sun');
  followId = 'sun';
  selectedBodyId = 'sun';
}
// Restored constellation pick (plan 010, S4): re-arm the gold emphasis + the
// find box label. No flight on load — a shared link's `cam` param (applied
// below) already restores the exact view the picker parked the camera in.
if (restoredConstellation) {
  selectedConstellation = restoredConstellation;
  setFindValue(`const:${restoredConstellation}`);
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
    dso: dsoOn,
    dof: dofEl.checked,
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
  // Plan 016 P1: the name labels live on the 2D overlay, which
  // canvas.toBlob() cannot see. Composite the WebGL frame + overlay onto a
  // temporary canvas at pixel size and export that, so saved PNGs keep
  // their labels (the base-variant lettering, exactly as on screen).
  // Plan 044 A5: the planet/body name overlay is composited too.
  // Plan 044 B8 (photo mode): ALWAYS composite through a temp canvas so the
  // branded watermark (app name + sim date + share URL) can be drawn on top
  // — saved PNGs are the shareability engine.
  const out = document.createElement('canvas');
  out.width = canvas.width;
  out.height = canvas.height;
  const octx = out.getContext('2d')!;
  octx.drawImage(canvas, 0, 0);
  const overlays = [labelLayer, planetLabelLayer].filter(
    (l): l is NonNullable<typeof l> => !!l && labelsEl.checked,
  );
  for (const l of overlays) {
    octx.drawImage(l.canvas, 0, 0, canvas.width, canvas.height);
  }
  // Watermark: two right-aligned lines in the bottom corner.
  const fs = Math.max(14, Math.round(out.width / 90));
  octx.font = `600 ${fs}px system-ui, -apple-system, sans-serif`;
  octx.textAlign = 'right';
  octx.textBaseline = 'bottom';
  octx.shadowColor = 'rgba(0,0,0,0.85)';
  octx.shadowBlur = fs / 2;
  octx.fillStyle = 'rgba(235, 240, 250, 0.92)';
  const dateLine = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  octx.fillText(`Orrery · ${dateLine}`, out.width - fs, out.height - fs * 2.2);
  // Short canonical domain (not the full param URL — that's what "Copy share
  // link" is for). Keeps the export clean and brandable.
  octx.font = `400 ${Math.round(fs * 0.82)}px system-ui, -apple-system, sans-serif`;
  octx.fillStyle = 'rgba(235, 240, 250, 0.6)';
  octx.fillText('raphaeldelors-code.github.io/solar-system-3d', out.width - fs, out.height - fs);
  octx.shadowBlur = 0;
  const blob = await new Promise<Blob | null>((resolve) =>
    out.toBlob((b) => resolve(b), 'image/png'),
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

// --- APOD (plan 044 B8) ------------------------------------------------------
// "Today in space" — daily return hook. Live fetch (CORS-open API), 12 h
// localStorage cache, DEMO_KEY by default (override via ?nasa_key=...).
const apodBtn = document.getElementById('apod') as HTMLButtonElement;
const apodCard = document.getElementById('apod-card') as HTMLDivElement;
const apodImg = document.getElementById('apod-img') as HTMLImageElement;
const apodTitle = document.getElementById('apod-title') as HTMLDivElement;
const apodBlurb = document.getElementById('apod-blurb') as HTMLDivElement;
const apodDate = document.getElementById('apod-date') as HTMLSpanElement;
const apodLink = document.getElementById('apod-link') as HTMLAnchorElement;
const apodCopy = document.getElementById('apod-copy') as HTMLDivElement;
const nasaKey = new URLSearchParams(window.location.search).get('nasa_key') ?? undefined;

apodBtn.addEventListener('click', async () => {
  apodBtn.textContent = 'Loading…';
  apodBtn.disabled = true;
  try {
    const item = await fetchApod(undefined, { key: nasaKey });
    apodImg.src = item.url;
    apodImg.alt = item.title;
    apodTitle.textContent = item.title;
    apodBlurb.textContent = item.blurb;
    apodDate.textContent = item.date;
    apodLink.href = item.pageUrl;
    apodCopy.textContent = item.copyright ? `© ${item.copyright}` : '';
    apodCard.hidden = false;
    apodBtn.textContent = 'Today in space (APOD)';
  } catch (err) {
    apodCard.hidden = true;
    apodBtn.textContent = 'APOD unavailable';
    console.warn('APOD fetch failed:', err);
  } finally {
    apodBtn.disabled = false;
    setTimeout(() => {
      if (apodBtn.textContent === 'APOD unavailable') {
        apodBtn.textContent = 'Today in space (APOD)';
      }
    }, 2500);
  }
});

// --- Plan 044 D1: About / attribution dialog --------------------------------
const aboutDialog = document.getElementById('about') as HTMLDivElement;
const aboutBtn = document.getElementById('about-btn') as HTMLButtonElement;
const aboutClose = document.getElementById('about-close') as HTMLButtonElement;

function openAbout(): void {
  aboutDialog.hidden = false;
  aboutClose.focus();
}
function closeAbout(): void {
  aboutDialog.hidden = true;
  aboutBtn.focus();
}
aboutBtn.addEventListener('click', openAbout);
aboutClose.addEventListener('click', closeAbout);
// Click on the dim backdrop (not the card) closes it.
aboutDialog.addEventListener('click', (e) => {
  if (e.target === aboutDialog) closeAbout();
});
// Esc closes the About dialog (only when it is the topmost overlay).
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !aboutDialog.hidden) closeAbout();
});

// D7: the telemetry consent toggle (in the About dialog). Reflects the
// persisted choice on open; a change writes it immediately. Opt-in — the
// checkbox starts unchecked unless the user previously granted consent.
const telemetryConsentEl = document.getElementById('telemetry-consent') as HTMLInputElement;
telemetryConsentEl.checked = telemetry.consent() === 'granted';
telemetryConsentEl.addEventListener('change', () => {
  telemetry.setConsent(telemetryConsentEl.checked ? 'granted' : 'declined');
});

// --- Init ------------------------------------------------------------------

// D7: install the error/rejection capture NOW (before any init work) so a
// throw during scene build is caught, not just post-boot errors. Local-only
// until consent is granted.
telemetry.install();

// D9: detect the locale from navigator.language and stamp the control panel
// (data-i18n / data-i18n-attr) before it first paints. en is the default;
// fr is the proof locale. JS-set strings call t() directly.
initI18n();

// D9: on coarse-pointer (touch) devices the desktop hint is wrong — swap it
// for the touch hint. Done here (not the inline panel script) so it runs
// AFTER initI18n() and uses the active locale's string.
if (window.matchMedia('(pointer: coarse)').matches) {
  const hintEl = document.getElementById('hint');
  if (hintEl) hintEl.textContent = t('hintTouch');
}

// D6: pre-flight WebGL probe. If the browser can't create a WebGL context at
// all (WebGL disabled, very old browser, or a blocked GPU), `buildScene`'s
// `new THREE.WebGLRenderer` would throw and leave a blank page. Probe on a
// DETACHED canvas (not the app canvas) so we don't lock the app canvas to a
// WebGL1 context — three.js prefers WebGL2 and would be downgraded if the app
// canvas already had a WebGL1 context. On failure show the themed fallback and
// never start the frame loop.
let bootOk = true;
{
  const probeCanvas = document.createElement('canvas');
  const probe =
    probeCanvas.getContext('webgl2') ||
    probeCanvas.getContext('webgl') ||
    probeCanvas.getContext('experimental-webgl');
  if (!probe) {
    bootOk = false;
    const el = document.getElementById('gl-unavailable');
    if (el) el.classList.add('show');
  }
}
// D6: reload escape hatch for the WebGL-unavailable fallback (the app can't
// render without WebGL, so a reload is the only exit — e.g. after the user
// enables hardware acceleration). Wired unconditionally; it only matters when
// the fallback is shown.
{
  const btn = document.getElementById('gl-unavailable-reload');
  if (btn) btn.addEventListener('click', () => window.location.reload());
}

let fpsWatchdog: FpsWatchdog | null = null;
if (bootOk) {
  try {
    rebuildScene(scale);
  } catch (err) {
    // The pre-flight probe passed but context creation still failed (some
    // drivers / SwiftShader edge cases). Show the same fallback; the frame
    // loop is gated on bootOk so it never runs against a null renderer.
    console.error('[orrery] WebGL context creation failed:', err);
    bootOk = false;
    const el = document.getElementById('gl-unavailable');
    if (el) el.classList.add('show');
  }
}
// F1: honor a restored `?post=0` from the very first frame (the `p` key and
// the composer branch both read `postOn`; this just hides the corona sprite
// so a fallback device never flashes it). D6: the low tier has no composer
// (built.post === null), so the corona (a bloom-driven glow) is hidden there
// too — it would read as a flat billboard without the bloom pass.
if (bootOk) built.sunGlow.visible = postOn && built.post != null;
// D6: one-shot fps watchdog. Feed every ACTIVE frame's duration; if the device
// can't hold ~30 fps for two sustained windows, downgrade the tier ONCE and
// rebuild the scene at the lower profile. Never fires on a capable device.
if (bootOk) {
  fpsWatchdog = createFpsWatchdog({
    from: qualityTier,
    onDowngrade: (to) => {
      qualityTier = to;
      rebuildScene(scale);
      built.sunGlow.visible = postOn && built.post != null;
      fpsWatchdog = null; // one-shot — the watchdog only ever downgrades once
    },
  });
}
// Plan 044 B1: load the live ISS TLE. The static fallback is applied
// immediately (so the ISS is visible even offline / before the fetch lands),
// then a CelesTrak fetch upgrades it to the freshest elements. Both paths
// funnel through `applyIssTle`, which parses + attaches + reveals the body.
function applyIssTle(tle: { name: string; noradId: number; line1: string; line2: string }): void {
  try {
    issSatellite = parseTle(tle);
    setIssSatellite(built, issSatellite, clock.t, scale);
  } catch (err) {
    console.warn('[iss] TLE parse failed:', err);
  }
}
applyIssTle(FALLBACK_ISS_TLE);
void fetchIssTle()
  .then((tle) => {
    if (tle) applyIssTle(tle); // null = fetch failed; the fallback is already live
  })
  .catch((err) => console.warn('[iss] TLE fetch failed, using fallback:', err));

// Plan 044 B5: space weather. Fetch the live NOAA/SWPC planetary Kp index
// (CORS-open, unlike the JPL APIs) and drive the Earth aurora band + a small
// panel indicator. The endpoint is a 3-hour-sampled array, oldest→newest; we
// take the latest sample. On failure the aurora simply stays off (Kp < 4) and
// the indicator shows "—" — the app never blocks on this.
const KP_URL = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json';
async function fetchKp(): Promise<KpSample | null> {
  const res = await fetch(KP_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Kp HTTP ${res.status}`);
  const raw = (await res.json()) as unknown;
  return latestKp(parseKpJson(raw));
}
function applyKp(sample: KpSample | null): void {
  // Drive the aurora band (no-op below Kp 4 — invisible).
  built.aurora?.setKp(sample ? sample.Kp : 0);
  // Panel indicator: "Kp 5.3 · G1 · Minor storm" or "Kp —" when no data.
  if (spaceWeatherEl) {
    if (sample) {
      const g = gScale(sample.Kp);
      spaceWeatherEl.textContent = `Kp ${sample.Kp.toFixed(1)} · ${gScaleLabel(g)}`;
      spaceWeatherEl.dataset.kp = String(Math.round(sample.Kp));
    } else {
      spaceWeatherEl.textContent = 'Kp —';
      delete spaceWeatherEl.dataset.kp;
    }
  }
}
void fetchKp()
  .then(applyKp)
  .catch((err) => console.warn('[kp] fetch failed, aurora stays off:', err));
// Refresh every 15 min so a developing storm lights the aurora without a reload.
setInterval(
  () => {
    void fetchKp()
      .then(applyKp)
      .catch(() => {});
  },
  15 * 60 * 1000,
);
// B5 (plan 046): live NASA CNEOS near-Earth-object feed. CORS-open, DEMO_KEY
// (no key needed for the free tier). We fetch a 7-day window and show the
// SOONEST close approach in a small panel row — a real "news-worthy" data
// moment. On failure the row shows "—" and the app never blocks on it.
const NEO_URL =
  'https://api.nasa.gov/neo/rest/v1/feed?start_date={start}&end_date={end}&api_key=DEMO_KEY';
async function fetchNeo(): Promise<ReturnType<typeof parseNeoFeed> | null> {
  const d = (offsetDays: number) =>
    new Date(Date.now() + offsetDays * 86_400_000).toISOString().slice(0, 10);
  const url = NEO_URL.replace('{start}', d(0)).replace('{end}', d(6));
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`CNEOS HTTP ${res.status}`);
  return parseNeoFeed(await res.json());
}
function applyNeo(result: ReturnType<typeof parseNeoFeed> | null): void {
  if (!neoEl) return;
  if (result?.soonest) {
    neoEl.textContent = formatNeoLabel(result.soonest, Date.now());
    neoEl.title = `${result.soonest.name} — ${result.soonest.jplUrl}`;
    neoEl.dataset.hazard = result.soonest.hazardous ? '1' : '0';
  } else {
    neoEl.textContent = '—';
    neoEl.title = '';
    delete neoEl.dataset.hazard;
  }
}
void fetchNeo()
  .then(applyNeo)
  .catch((err) => console.warn('[neo] CNEOS fetch failed, row shows —:', err));
// Refresh hourly — close approaches don't change minute-to-minute.
setInterval(
  () => {
    void fetchNeo()
      .then(applyNeo)
      .catch(() => {});
  },
  60 * 60 * 1000,
);
// Plan 016 P1: constellation name labels live on a 2D screen-space overlay
// (not 3D sprites) — see render/constellationScreenLabels.ts. One layer for
// the page's lifetime: it anchors to the #app canvas, which persists across
// scene rebuilds (scale morphs).
labelLayer = createConstellationLabelLayer(canvas);
labelLayer.setVisible(labelsEl.checked);
// Plan 044 A5: planet/body name labels on their own 2D overlay (z-index 6,
// above the constellation overlay at 5). The 3D sprite labels are hidden —
// the 2D overlay replaces them.
planetLabelLayer = createPlanetLabelLayer(canvas);
planetLabelLayer.setVisible(labelsEl.checked);
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

// --- Plan 035 F5: `?cmd=` + cinematic intro ---------------------------------
// `?cmd=<id>` runs a single command on load (deep-linkable state, e.g.
// `?cmd=post` for HDR, `?cmd=earth` to fly to Earth). Digit params (`?cmd=1`…`?cmd=9`,
// `?cmd=0`) map to `jump-digit-<d>`. Runs BEFORE the intro so a pinned command
// that lands on a body suppresses it via urlPinsView.
const cmdParam = new URLSearchParams(window.location.search).get('cmd')?.toLowerCase() ?? null;
const cmdIds = new Set(COMMANDS.map((c) => c.id));
// `palette` is a dispatcher id (not in COMMANDS — the palette is the palette's
// launcher, not an entry inside it) but is still deep-linkable via ?cmd=palette.
cmdIds.add('palette');
const cmdIsDigit = cmdParam != null && /^[0-9]$/.test(cmdParam);
const cmdIsKnown = cmdParam != null && (cmdIsDigit || cmdIds.has(cmdParam));
if (cmdParam && cmdIsKnown) {
  runCommand(cmdIsDigit ? `jump-digit-${cmdParam}` : cmdParam);
}
// The intro plays once on a plain first load: no reduced-motion, no
// `?intro=0`, and the URL did NOT pin a view (follow/constellation/camera,
// or a known `?cmd=` that lands on a body). A pinned link must land exactly
// where the link says, so it never gets overridden by the dolly.
{
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const introParam = new URLSearchParams(window.location.search).get('intro');
  const urlPinsView =
    Boolean(urlState.follow) ||
    Boolean(urlState.constellation) ||
    Boolean(urlState.cam) ||
    Boolean(cmdParam && cmdIsKnown);
  // Plan 037: an intro that already finished in this session (sessionStorage)
  // must not replay on a plain reload.
  let introSeen = false;
  try {
    introSeen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    /* private mode / storage disabled — treat as unseen */
  }
  if (introShouldPlay(reduced, introParam, urlPinsView, introSeen)) {
    startIntro();
  }
}

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
  // Plan 016 P1: the 2D constellation name label overlay (CDP checks read
  // its canvas content + display state under the Labels toggle).
  get labelLayer() {
    return labelLayer;
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
  if (rearmBounce) return; // the F2 pinch re-arm bounce is not a pick
  if (suppressPickAfterScrub) {
    suppressPickAfterScrub = false;
    return; // a scrub release is never a pick
  }
  // A touch that lifts while other fingers are still down was part of a
  // pinch / 3-finger scrub, never a tap — never fly there. (This fires
  // BEFORE the window handler updates touchPointers, so the lifting
  // finger is still registered and size > 1 iff it was multi-touch.)
  if (ev.pointerType === 'touch' && touchPointers.size > 1) return;
  if (ev.button === 2) return; // right button never picks
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

// --- Time scrubbing (plan 022 F1 / plan 023 F1): right-drag = 2D pad -----
// Desktop: hold the RIGHT mouse button and drag. Horizontal travel moves
// through time (right = future, left = past) proportionally to the CURRENT
// speed (plan 023: span = 1 h of sim at the press speed, capped ±10 000 d),
// quadratic-saturation eased (zero slope at the press point) so it's
// slowest at the press point and maxes out at the gesture's starting speed
// at the drag edges; vertical travel moves the speed slider (up = faster,
// down = slower, log scale). While held, the clock is frozen at the scrubbed
// value and the #hud-mini sub-line + gauge show the live date, travel
// distance and speed; on release time resumes at the CURRENT slider speed.
//
// Both gesture slots are genuinely free (plan 021): OrbitControls maps the
// right button to PAN, which is gated off by enablePan=false, and its touch
// code only acts on 1-2 pointers, so the 3-finger twin (F2) has no
// interference either. A scrub must never be mistaken for a click-pick: a
// moved release arms suppressPickAfterScrub.
// (ScrubState / ThreeFingerScrub types now live in ./app/scrubTypes so the
//  whole init section can be wrapped in an IIFE — see that module's header.)
let scrub: null | ScrubState = null;
let suppressPickAfterScrub = false;

const touchPointers = new Map<number, { x: number; y: number }>();
let threeFinger: null | ThreeFingerScrub = null;
// Set while the synthetic re-arm bounce (survivor pointerup+down) is in
// flight, so the touch handlers below ignore exactly those two events and
// only OrbitControls sees them.
let rearmBounce = false;

// The scrub gesture + timeline HUD live in src/app/scrub.ts (plan 044 D2,
// step 3). The 5 shared lets + touchPointers stay here (the pick handler,
// tickIntroTail, frameLoop, and resampleMoonNow all read/write them) and are
// handed to the module as getter/setter accessors.
const scrubApi = createScrub({
  get scrub() {
    return scrub;
  },
  set scrub(v: ScrubState | null) {
    scrub = v;
  },
  get suppressPickAfterScrub() {
    return suppressPickAfterScrub;
  },
  set suppressPickAfterScrub(v: boolean) {
    suppressPickAfterScrub = v;
  },
  get threeFinger() {
    return threeFinger;
  },
  set threeFinger(v: ThreeFingerScrub | null) {
    threeFinger = v;
  },
  get rearmBounce() {
    return rearmBounce;
  },
  set rearmBounce(v: boolean) {
    rearmBounce = v;
  },
  get lastMoonResampleMs() {
    return lastMoonResampleMs;
  },
  set lastMoonResampleMs(v: number) {
    lastMoonResampleMs = v;
  },
  touchPointers,
  canvas,
  clock,
  hudMiniEl,
  hudDateEl,
  hudSpeedEl,
  hudTimelineEl,
  hudTimelineTrackEl,
  hudTimelineFillEl,
  hudTimelineCaretEl,
  hudTimelineDynEl,
  hudTimelineYearEl,
  hudTlLensEl,
  hudTlLensCanvasEl,
  hudTlLensDateEl,
  hudTlTipEl,
  applySliderSpeed,
  resampleMoonNow,
  syncUrl,
});
const { tlShow, tlRefresh, tlSetCaret, tlCurrentYear, tlFrame } = scrubApi;

// --- Animation loop ---------------------------------------------------------

/**
 * Plan 016 P1: render the screen-space constellation name labels for this
 * frame. Runs every frame (unthrottled): label position and opacity follow
 * the camera at display rate — exactly what the old 3D sprites could not do
 * (5 Hz opacity stepping + depth-test popping = the flicker; the fixed 3D
 * anchor = the "label through the figure" slicing). Zero cost while the
 * Labels toggle is off (the layer is hidden and this returns immediately).
 *
 * Occlusion (plan 008 S2, kept in spirit): a body sitting between the camera
 * and a name's anchor hides the name — one analytic ray vs the body meshes,
 * computed only for labels already above the draw threshold.
 */
function updateConstellationScreenLabelFrame(): void {
  if (!labelLayer || !labelsEl.checked) return;
  // Plan 047: constellation NAMES are Sky-view furniture — in the System view
  // they are a second, competing label system over the orbits. Show them only
  // in Sky mode (the sky tour) or when a constellation is explicitly picked.
  if (!skyTour && !selectedConstellation) {
    updateConstellationScreenLabels(labelLayer, built.camera, [], 0, window.innerWidth, window.innerHeight);
    return;
  }
  const camera = built.camera;
  const camPos = camera.position;
  const px = camPos.x,
    py = camPos.y,
    pz = camPos.z;
  const presence = constellationPresence(camPos.length());
  // Plan 016 P2: index of the picked constellation (−1 when none).
  const selIdx = selectedConstellation
    ? CONSTELLATIONS.findIndex((c) => c.name === selectedConstellation)
    : -1;
  const updates: ScreenLabelUpdate[] = [];
  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    const emph = CONSTELLATION_EMPHASES[i];
    if (constellationLabelOpacity(emph) * presence <= CONSTELLATION_LABEL_MIN_SCREEN_OPACITY)
      continue;
    const dir = LABEL_ANCHOR_DIRS[i];
    // Analytic occlusion: the anchor sits at dir * CONSTELLATION_RADIUS, so
    // its distance from the camera is the law-of-cosines expression below
    // (dir is a unit vector). A body hit closer than that hides the name.
    // NOTE the ray DIRECTION must be (dir*R − camPos).normalize() — the
    // anchor's actual bearing, NOT (dir − camPos): the anchor is 4800 units
    // out, so from a near-origin camera the two differ by up to the body's
    // angular radius, and the unscaled variant points every ray at the
    // system core (hiding every name behind the Sun).
    const dirDotCam = px * dir[0] + py * dir[1] + pz * dir[2];
    const anchorDist = Math.sqrt(
      CONSTELLATION_RADIUS * CONSTELLATION_RADIUS +
        (px * px + py * py + pz * pz) -
        2 * CONSTELLATION_RADIUS * dirDotCam,
    );
    LABEL_OCCL_RAY.set(
      camPos,
      LABEL_OCCL_DIR.set(
        dir[0] * CONSTELLATION_RADIUS - px,
        dir[1] * CONSTELLATION_RADIUS - py,
        dir[2] * CONSTELLATION_RADIUS - pz,
      ).normalize(),
    );
    // PERF: a full-mesh raycast per label per frame was the old code's
    // pointer-move cost paid 88× every frame. Pre-filter angularly first:
    // only a body whose disk could touch the anchor bearing needs the ray.
    // (Sun ~21 u at 34 u ≈ 36° still passes easily; planets/moons are far
    // tighter.) frameExtent covers Saturn's rings, sceneRadius the disk.
    let occluded = false;
    const rd = LABEL_OCCL_DIR;
    for (const entry of built.bodies.values()) {
      if (!entry.mesh.visible) continue;
      // World position: the mesh sits at local origin inside its tilt pivot
      // (scene.add(pivot)), so m.position is NOT the world position.
      const wp = entry.worldPos;
      const bx = wp.x - px,
        by = wp.y - py,
        bz = wp.z - pz;
      const blen = Math.sqrt(bx * bx + by * by + bz * bz);
      if (blen < 1e-6) continue;
      const inv = 1 / blen;
      const ux = bx * inv,
        uy = by * inv,
        uz = bz * inv;
      // sin(θ) between the body bearing and the anchor bearing:
      // occludable only if the body disk could touch the ray.
      const crossX = uy * rd.z - uz * rd.y;
      const crossY = uz * rd.x - ux * rd.z;
      const crossZ = ux * rd.y - uy * rd.x;
      const sinB = Math.sqrt(Math.min(1, crossX * crossX + crossY * crossY + crossZ * crossZ));
      const discRadius = Math.max(
        1,
        entry.frameExtent > 0 ? entry.frameExtent / 2 : entry.sceneRadius,
      );
      if (sinB > (discRadius + 2) / blen) continue; // well clear of the bearing
      // Passed the pre-filter: full raycast against this body only.
      LABEL_OCCL_RAY.far = blen * 2;
      const hits = LABEL_OCCL_RAY.intersectObject(entry.mesh, false);
      if (hits.length > 0 && hits[0].distance < anchorDist) {
        occluded = true;
        break;
      }
    }
    updates.push({
      name: CONSTELLATIONS[i].name,
      dir,
      emphasis: emph,
      // Plan 017 F1: only a picked constellation's name draws with the
      // green lettering variant — the nearest-figure auto-emphasis is gone,
      // so the label no longer hops green between figures on camera nudges.
      emphasized: selIdx >= 0 ? i === selIdx : false,
      occluded,
    });
  }
  updateConstellationScreenLabels(
    labelLayer,
    camera,
    updates,
    presence,
    window.innerWidth,
    window.innerHeight,
  );
}

// --- Plan 044 A5: screen-space planet/body name labels ---------------------
// The 3D sprite labels (now hidden) are replaced by a 2D overlay: each body's
// world position is projected to screen, the name is drawn with a thin leader
// line back to the disc, faded by camera distance, and de-collided (max 8,
// picked body always shown). Reuses the same architecture as the constellation
// overlay (render/planetScreenLabels.ts).
const _PL_W = new THREE.Vector3();
const _PL_EDGE = new THREE.Vector3();
function updatePlanetScreenLabelFrame(): void {
  if (!planetLabelLayer || !labelsEl.checked) return;
  const camera = built.camera;
  const camPos = camera.position;
  const wCss = window.innerWidth;
  const hCss = window.innerHeight;
  const inputs: PlanetLabelInput[] = [];
  for (const entry of built.bodies.values()) {
    if (!entry.mesh.visible) continue;
    const wp = entry.worldPos;
    const dist = camPos.distanceTo(wp);
    // On-screen disc radius (CSS px): project the body center and a point one
    // scene-radius toward the camera; the pixel gap is the disc's screen size.
    // (Compute the direction into _PL_EDGE first — _PL_W must stay the center.)
    _PL_EDGE.copy(wp).sub(camPos).normalize();
    _PL_W.copy(wp);
    const c = projectWorldToScreen(_PL_W, camera, wCss, hCss);
    if (!c.ok) continue;
    _PL_EDGE.copy(wp).addScaledVector(_PL_EDGE, -entry.sceneRadius);
    const e = projectWorldToScreen(_PL_EDGE, camera, wCss, hCss);
    const discR = e.ok ? Math.hypot(e.x - c.x, e.y - c.y) : 0;
    // Tier: 0 = picked (always shown), 1 = sun + planets, 2 = moons/dwarfs.
    const tier: 0 | 1 | 2 =
      entry.def.id === selectedBodyId
        ? 0
        : entry.def.kind === 'star' || entry.def.kind === 'planet'
          ? 1
          : 2;
    inputs.push({
      id: entry.def.id,
      name: entry.def.name,
      world: wp,
      dist,
      discRadiusPx: discR,
      tier,
    });
  }
  updatePlanetScreenLabels(planetLabelLayer, camera, inputs, wCss, hCss);
}

// --- Per-frame render/sim loop (plan 044 D2, step 2) ------------------------
// The loop body lives in src/app/frameLoop.ts (createFrameLoop). The mutable
// module-level `let`s below are wired as getter/setter accessors so the loop
// reads live values and writes land back here; stable values are plain refs.
const frameLoop = createFrameLoop({
  // stable values
  F6_LAST_CAM,
  F6_LAST_TARGET,
  FOV_DEG,
  MORPH_DUR,
  REDUCED_MOTION,
  clock,
  moonParent,
  // mutable state the loop reads AND writes (getter/setter)
  get calSelDay() {
    return calSelDay;
  },
  set calSelDay(v: typeof calSelDay) {
    calSelDay = v;
  },
  get f6CamInit() {
    return f6CamInit;
  },
  set f6CamInit(v: typeof f6CamInit) {
    f6CamInit = v;
  },
  get f6CameraMoving() {
    return f6CameraMoving;
  },
  set f6CameraMoving(v: typeof f6CameraMoving) {
    f6CameraMoving = v;
  },
  get flight() {
    return flight;
  },
  set flight(v: typeof flight) {
    flight = v;
  },
  get lastDays() {
    return lastDays;
  },
  set lastDays(v: typeof lastDays) {
    lastDays = v;
  },
  get lastMoonResampleMs() {
    return lastMoonResampleMs;
  },
  set lastMoonResampleMs(v: typeof lastMoonResampleMs) {
    lastMoonResampleMs = v;
  },
  get lastMs() {
    return lastMs;
  },
  set lastMs(v: typeof lastMs) {
    lastMs = v;
  },
  get hidden() {
    return hidden;
  },
  set hidden(v: typeof hidden) {
    hidden = v;
  },
  get pendingSkyTour() {
    return pendingSkyTour;
  },
  set pendingSkyTour(v: typeof pendingSkyTour) {
    pendingSkyTour = v;
  },
  get sceneDirty() {
    return sceneDirty;
  },
  set sceneDirty(v: typeof sceneDirty) {
    sceneDirty = v;
  },
  // mutable state the loop only reads (getter)
  get built() {
    return built;
  },
  get calMonth() {
    return calMonth;
  },
  get calOpen() {
    return calOpen;
  },
  get calYear() {
    return calYear;
  },
  get contextLost() {
    return contextLost;
  },
  get exoMode() {
    return exoMode;
  },
  get exoScene() {
    return exoScene;
  },
  get followId() {
    return followId;
  },
  get intro() {
    return intro;
  },
  get morph() {
    return morph;
  },
  get postOn() {
    return postOn;
  },
  get scale() {
    return scale;
  },
  get scrub() {
    return scrub;
  },
  get selectedBodyId() {
    return selectedBodyId;
  },
  get skyTour() {
    return skyTour;
  },
  get threeFinger() {
    return threeFinger;
  },
  // callbacks
  advanceSkyTour,
  camAnchorFor,
  computeConstellationEmphases,
  fmtDate,
  morphEnd,
  onIntroLegDone,
  renderCalendar,
  startSkyTour,
  syncUrl,
  tickIntroTitle,
  tlFrame,
  updateConstellationHighlightThrottled,
  updateConstellationScreenLabelFrame,
  updateInfo,
  updatePickedConstellationPulse,
  updatePlanetScreenLabelFrame,
  updateSunFlareAndDOF,
  // D6: feed the fps watchdog (one-shot). Null once it has fired / downgraded.
  // D7: also feed the telemetry fps histogram (active frames only — the
  // static-frame skip returns earlier, so parked frames never pollute it).
  sampleFrameMs: (frameMs: number) => {
    fpsWatchdog?.sample(frameMs);
    telemetry.sampleFrame(frameMs);
  },
});
if (bootOk) {
  frameLoop.start();
  createContextLoss({
    canvas,
    glLostEl,
    glReloadBtn,
    built,
    markSceneDirty,
    onContextLost: () => telemetry.count('context_loss'), // D7
    contextLost: {
      get: () => contextLost,
      set: (v) => {
        contextLost = v;
      },
    },
    lastMs: {
      get: () => lastMs,
      set: (v) => {
        lastMs = v;
      },
    },
  });
}

// D6: debug handle for E2E + headless checks. Exposes the selected quality
// tier (and the boot guard) so tests can read live state without coupling to
// internals. `qualityTier` is a getter so it reflects a watchdog downgrade.
(window as unknown as { __debug: Record<string, unknown> }).__debug = {
  get qualityTier() {
    return qualityTier;
  },
  get bootOk() {
    return bootOk;
  },
  // D7: telemetry consent state (unset|granted|declined) for E2E + checks.
  get telemetryConsent() {
    return telemetry.consent();
  },
  // D10: tab-hidden state (visibilitychange) for E2E + checks.
  get hidden() {
    return hidden;
  },
};
