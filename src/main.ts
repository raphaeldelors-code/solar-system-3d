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
  frameBody, frameSystem, frameConstellations, stepFlight,
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

/** Farthest heliocentric scene extent in the current scale (outermost aphelion). */
function systemRadius(): number {
  let maxR = 0;
  for (const entry of built.bodies.values()) {
    const el = entry.def.elements;
    if (!el) continue;
    // Planets/dwarfs: a is in AU -> map through the scale's distance ramp at
    // aphelion (a(1+e)). The ramp's linear extension past the last anchor
    // keeps Eris's far reach inside the frame.
    if (entry.def.kind === 'planet' || entry.def.kind === 'dwarf') {
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
  return frameSystem(systemRadius(), FOV_DEG);
}

function camAnchorForBody(id: string): CamAnchor | null {
  const entry = built.bodies.get(id);
  if (!entry) return null;
  return frameBody(
    [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    [entry.worldPos.x, entry.worldPos.y, entry.worldPos.z],
    entry.sceneRadius,
    FOV_DEG,
  );
}

/**
 * Start an eased flight from the current camera pose to `dest`.
 * `bodyId` (optional) is the picked body being tracked — the orbit-target
 * follows its live position each frame so a fast-moving planet isn't landed
 * behind; leave `null` for the global Sun / constellations anchors.
 */
function flyTo(dest: CamAnchor, duration = 1.4, bodyId: string | null = null): void {
  // Picking a body arms the follow so after landing the camera keeps it
  // centered (the existing follow behavior). Global anchors clear it.
  followId = bodyId ?? '';
  followEl.value = followId;
  updateInfo();
  flight = {
    fromPos: [built.camera.position.x, built.camera.position.y, built.camera.position.z],
    fromTarget: [built.controls.target.x, built.controls.target.y, built.controls.target.z],
    toPos: dest.pos,
    toTarget: dest.target,
    duration,
    t: 0,
    followId: bodyId,
  };
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
    else if (fly === 'constellations') flyTo(camAnchorFor('constellations'), 1.8);
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
  const text = s >= 10 ? s.toFixed(0) + ' d/s' : s >= 0.01 ? s.toFixed(2) + ' d/s' : s.toFixed(4) + ' d/s';
  speedValueEl.textContent = text;
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
  followId = followEl.value;
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

// Populate the follow dropdown.
for (const b of ALL_BODIES) {
  const opt = document.createElement('option');
  opt.value = b.id;
  opt.textContent = b.kind === 'moon' ? `  ${b.name} (${b.parent})` : b.name;
  followEl.appendChild(opt);
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
  updateBeltFields(built, clock.t, scale);
  applySpin(built, dtDays);

  if (flight) {
    // Camera flight in progress: drive the camera manually with the eased
    // path and hold user input until the landing. If the flight targets a
    // picked body, track its live position so a fast-moving planet isn't
    // landed behind; global anchors stay locked to the origin.
    built.controls.enabled = false;
    const sample = stepFlight(flight, dtReal);
    built.camera.position.set(sample.pos[0], sample.pos[1], sample.pos[2]);
    if (flight.followId) {
      const e = built.bodies.get(flight.followId);
      if (e) sample.target = [e.worldPos.x, e.worldPos.y, e.worldPos.z];
    }
    built.controls.target.set(sample.target[0], sample.target[1], sample.target[2]);
    built.controls.update();
    if (sample.done) {
      flight = null;
      built.controls.enabled = true;
      // the user can break free any time via the Free-camera option.
      if (followId) {
        const e = built.bodies.get(followId);
        if (e) built.controls.target.copy(e.worldPos);
      }
      syncUrl();
    }
  } else if (followId) {
    // Free follow: keep the followed body centered at the orbit pivot.
    const entry = built.bodies.get(followId);
    if (entry) built.controls.target.lerp(entry.worldPos, 0.2);
    built.controls.update();
  } else {
    built.controls.update();
  }

  built.renderer.render(built.scene, built.camera);
  fmtDate();
  updateInfo();
}
requestAnimationFrame(frame);
