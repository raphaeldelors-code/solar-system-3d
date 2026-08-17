/**
 * App entry: builds the Three.js scene, wires the control panel, and runs
 * the animation loop. The sim layer (src/sim) stays pure and is tested in
 * Node; everything DOM/WebGL lives here and in src/render.
 */
import * as THREE from 'three';
import { SimClock } from './sim/clock';
import { ALL_BODIES } from './data/bodies';
import {
  buildScene, updatePositions, applySpin, updateBeltFields,
  VISIBLE_SCALE, TRUE_SCALE, CONSTELLATION_RADIUS,
  type BuiltScene, type VisualScale,
} from './render/scene';
import {
  frameBody, frameSystem, frameConstellations, stepFlight, makeFlight,
  type CamAnchor, type Flight,
} from './render/cameraFlight';
import { attachRealTextures } from './render/realTextures';
import { orbitReadout, formatPeriod, formatDistanceKm } from './sim/orbitInfo';
import { parseAppState, encodeAppState, type ViewState } from './state/urlState';

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
// show all 13 constellations — they cover the whole celestial sphere (decl
// −43°…+89°, RA 0h…21h), and the tightest bounding cone has a ~106° half-angle
// (a ~212° FOV would be needed to fit them in one frame, which is impossible).
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

const canvas = document.getElementById('app') as HTMLCanvasElement;
const dateEl = document.getElementById('date') as HTMLSpanElement;
const speedEl = document.getElementById('speed') as HTMLInputElement;
const speedValueEl = document.getElementById('speed-value') as HTMLSpanElement;
const pauseBtn = document.getElementById('pause') as HTMLButtonElement;
const nowBtn = document.getElementById('now') as HTMLButtonElement;
const followEl = document.getElementById('follow') as HTMLSelectElement;
const scaleEl = document.getElementById('scale') as HTMLSelectElement;
const orbitsEl = document.getElementById('orbits') as HTMLInputElement;
const labelsEl = document.getElementById('labels') as HTMLInputElement;
const beltsEl = document.getElementById('belts') as HTMLInputElement;
const shareBtn = document.getElementById('share') as HTMLButtonElement;
const screenshotBtn = document.getElementById('screenshot') as HTMLButtonElement;
const tooltipEl = document.getElementById('tooltip') as HTMLDivElement;
const infoEl = document.getElementById('info') as HTMLDivElement;
const infoNameEl = document.getElementById('info-name') as HTMLDivElement;
const infoPeriodEl = document.getElementById('info-period') as HTMLSpanElement;
const infoDistanceEl = document.getElementById('info-distance') as HTMLSpanElement;
const infoRangeEl = document.getElementById('info-range') as HTMLSpanElement;

const byId = new Map(ALL_BODIES.map((b) => [b.id, b]));

const clock = new SimClock(Date.now());
// `!`: definitely assigned by the initial rebuildScene(scale) call below;
// TS can't see the assignment through the function boundary.
let built!: BuiltScene;
let scale: VisualScale = VISIBLE_SCALE;
let followId = '';
let lastDays = clock.t;
let lastMs = performance.now();
// Active camera flight (anchor / picked-body). `null` when no flight is in
// progress; the render loop advances it and hands control back to the free
// OrbitControls when it lands.
let flight: Flight | null = null;

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
  return frameBody(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [entry.worldPos.x, entry.worldPos.y, entry.worldPos.z],
    entry.frameExtent,
    FOV_DEG,
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
  followId = bodyId ?? '';
  followEl.value = followId;
  // A Sky landing kicks off the panoramic tour; any other flight cancels it.
  stopSkyTour();
  pendingSkyTour = sky;
  updateInfo();
  // Build the flight from the live camera pose (pos + orbit target). The
  // offset-lerp form keeps a moving picked body rigidly framed; global
  // anchors have a static origin target so they reduce to an eased move.
  // The FOV eases to the anchor's requested value (sky anchor widens it)
  // or back to the default so a wide sky view is never retained.
  flight = makeFlight(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    dest,
    duration,
    bodyId,
    built.camera.fov,
    FOV_DEG,
  );
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
}

function applyToggles(): void {
  for (const entry of built.bodies.values()) {
    if (entry.orbit) (entry.orbit.material as THREE.Material).visible = orbitsEl.checked;
    entry.label.visible = labelsEl.checked;
  }
  for (const field of built.belts) {
    field.mesh.visible = beltsEl.checked;
  }
}

function fmtSpeed(): void {
  const s = clock.getSpeed();
  // Signed: negative speed means the calendar runs backwards — show the
  // direction explicitly so the user knows time is flowing the other way.
  const sign = s < 0 ? '−' : '';
  const a = Math.abs(s);
  const mag = a >= 100 ? a.toFixed(0) : a >= 1 ? a.toFixed(1) : a.toFixed(2);
  speedValueEl.textContent = `${sign}${mag} d/s`;
}

function fmtDate(): void {
  const d = clock.toDate();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  dateEl.textContent = `${y}-${m}-${day} ${h}:${min} UTC`;
}

/** Orbit period / live distance / peri-apoapsis for the followed body. */
function updateInfo(): void {
  if (!followId) { infoEl.hidden = true; return; }
  const def = byId.get(followId);
  const r = def ? orbitReadout(def, clock.t) : null;
  if (!def || !r) { infoEl.hidden = true; return; }
  infoEl.hidden = false;
  infoNameEl.textContent = def.name;
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

nowBtn.addEventListener('click', () => {
  clock.setDate(new Date());
  syncUrl();
});

followEl.addEventListener('change', () => {
  const id = followEl.value;
  if (id) {
    // Picking a body in the list flies the camera to it with the same eased
    // travel (accelerate → cruise → decelerate + FOV ease) as a click-pick
    // and the Sky/System anchors, then follows it. No instant jump.
    const dest = camAnchorForBody(id);
    if (dest) { flyTo(dest, 1.4, id); return; }
  }
  // "Free camera" (or a body with no frame): just drop the follow.
  followId = '';
  updateInfo();
  syncUrl();
});

scaleEl.addEventListener('change', () => {
  scale = scaleEl.value === 'true' ? TRUE_SCALE : VISIBLE_SCALE;
  rebuildScene(scale);
  syncUrl();
});

orbitsEl.addEventListener('change', () => { applyToggles(); syncUrl(); });
labelsEl.addEventListener('change', () => { applyToggles(); syncUrl(); });
beltsEl.addEventListener('change', () => { applyToggles(); syncUrl(); });

window.addEventListener('resize', () => {
  built.camera.aspect = window.innerWidth / window.innerHeight;
  built.camera.updateProjectionMatrix();
  built.renderer.setSize(window.innerWidth, window.innerHeight);
});

// Populate the follow dropdown, grouping each satellite directly under its
// planet (indented) instead of dumping all 22 moons at the bottom: ALL_BODIES
// lists moons last, but the menu reads better as planet → its satellites.
{
  const moonsByParent = new Map<string, (typeof ALL_BODIES)[number][]>();
  for (const b of ALL_BODIES) {
    if (b.kind === 'moon' && b.parent) {
      const list = moonsByParent.get(b.parent) ?? [];
      list.push(b);
      moonsByParent.set(b.parent, list);
    }
  }
  for (const b of ALL_BODIES) {
    if (b.kind === 'moon') continue; // emitted under its planet below
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = b.name;
    followEl.appendChild(opt);
    for (const m of moonsByParent.get(b.id) ?? []) {
      const mo = document.createElement('option');
      mo.value = m.id;
      mo.textContent = `    · ${m.name}`;
      followEl.appendChild(mo);
    }
  }
}

// --- Shareable URL state ----------------------------------------------------
// Restore state from the query string (time, speed, follow, scale, toggles,
// camera) before building the scene; keep the address bar in sync afterward.

const urlState = parseAppState(window.location.href);
if (urlState.timeMs != null) clock.setDate(new Date(urlState.timeMs));
if (urlState.speedLog != null) {
  speedEl.value = String(urlState.speedLog);
  clock.setLogSpeed(urlState.speedLog);
}
if (urlState.scale) {
  scaleEl.value = urlState.scale;
  scale = scaleEl.value === 'true' ? TRUE_SCALE : VISIBLE_SCALE;
}
if (urlState.orbits != null) orbitsEl.checked = urlState.orbits;
if (urlState.labels != null) labelsEl.checked = urlState.labels;
if (urlState.belts != null) beltsEl.checked = urlState.belts;
if (urlState.paused != null) {
  clock.setPaused(urlState.paused);
  pauseBtn.textContent = urlState.paused ? 'Resume' : 'Pause';
}
if (urlState.follow && byId.has(urlState.follow)) {
  followEl.value = urlState.follow;
  followId = urlState.follow;
}

/** Snapshot the current UI + camera into a shareable ViewState. */
function captureState(): ViewState {
  return {
    timeMs: clock.toDate().getTime(),
    speedLog: parseFloat(speedEl.value),
    follow: followId || undefined,
    scale: scale === TRUE_SCALE ? 'true' : 'visible',
    orbits: orbitsEl.checked,
    labels: labelsEl.checked,
    belts: beltsEl.checked,
    paused: clock.isPaused,
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
  setTimeout(() => { shareBtn.textContent = 'Copy share link'; }, 1500);
});

// --- Screenshot ------------------------------------------------------------
// Export the current WebGL frame as a PNG. The renderer is built with
// preserveDrawingBuffer so canvas.toBlob() sees the last present.
screenshotBtn.addEventListener('click', async () => {
  const canvas = built.renderer.domElement;
  const d = clock.toDate();
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
    + `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}Z`;
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/png'));
  if (!blob) { screenshotBtn.textContent = 'Export failed'; return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `solar-system-${stamp}.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  screenshotBtn.textContent = 'Saved ✓';
  setTimeout(() => { screenshotBtn.textContent = 'Save screenshot'; }, 1500);
});

// --- Init ------------------------------------------------------------------

rebuildScene(scale);
wireAnchorButtons();
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
  get scene() { return built.scene; },
  get camera() { return built.camera; },
  get renderer() { return built.renderer; },
  clock,
};

// --- Hover tooltip ----------------------------------------------------------
// Raycast body meshes on pointer-move and show a name tooltip near the
// cursor. Throttled so it never fights the render loop, and suppressed
// while the pointer is down (orbiting/panning).
const raycaster = new THREE.Raycaster();
const pointerNdc = new THREE.Vector2();
let pointerPx = 0, pointerPy = 0;
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
  if (!pointerOnCanvas || picking) { hideTooltip(); return; }
  raycaster.setFromCamera(pointerNdc, built.camera);
  const hits = raycaster.intersectObjects(bodyMeshes(), false);
  if (hits.length > 0) {
    const id = hits[0].object.userData.id as string | undefined;
    const def = id ? byId.get(id) : undefined;
    if (def) {
      const sub = def.kind === 'moon'
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
  pointerPx = ev.clientX; pointerPy = ev.clientY;
  pointerNdc.set(
    (ev.clientX / window.innerWidth) * 2 - 1,
    -(ev.clientY / window.innerHeight) * 2 + 1,
  );
  const now = performance.now();
  if (now - lastPickMs < 50) return; // throttle
  lastPickMs = now;
  doPick();
});
canvas.addEventListener('pointerleave', () => { pointerOnCanvas = false; hideTooltip(); });
canvas.addEventListener('pointerdown', () => { picking = true; hideTooltip(); });
window.addEventListener('pointerup', () => { picking = false; });

// --- Click-to-pick: fly to a clicked body ---------------------------------
// A genuine click (press + release with no meaningful drag) on a body starts
// an eased flight to it and arms the follow so it stays centered on landing.
// Dragging to orbit / panning never triggers it (distance threshold).
let pressX = 0, pressY = 0;
canvas.addEventListener('pointerdown', (ev) => {
  pressX = ev.clientX; pressY = ev.clientY;
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

  const nowMs = performance.now();
  const dtReal = Math.min(0.1, (nowMs - lastMs) / 1000);
  lastMs = nowMs;

  clock.tick(dtReal);
  const dtDays = clock.t - lastDays;
  lastDays = clock.t;

  updatePositions(built, clock.t, scale);
  // The belt population (2,100 Kepler solves + matrix composes) is the
  // heaviest per-frame CPU cost. When the sim is paused nothing moves, so
  // skip it entirely — belt matrices were already written on the last tick.
  if (!clock.isPaused) updateBeltFields(built, clock.t, scale);
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
        // Re-sync OrbitControls' internal spherical state to the pose we just
        // landed on so user drag/wheel/pan resumes smoothly from here.
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
    const entry = built.bodies.get(followId);
    if (entry) built.controls.target.lerp(entry.worldPos, 0.2);
    built.controls.update();
  } else {
    built.controls.update();
  }

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
