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
  VISIBLE_SCALE, TRUE_SCALE,
  type BuiltScene, type VisualScale,
} from './render/scene';
import { attachRealTextures } from './render/realTextures';
import { orbitReadout, formatPeriod, formatDistanceKm } from './sim/orbitInfo';
import { parseAppState, encodeAppState, type ViewState } from './state/urlState';

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

// --- Init ------------------------------------------------------------------

rebuildScene(scale);
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

  // Follow camera.
  if (followId) {
    const entry = built.bodies.get(followId);
    if (entry) {
      built.controls.target.lerp(entry.worldPos, 0.2);
    }
  }

  built.controls.update();
  built.renderer.render(built.scene, built.camera);
  fmtDate();
  updateInfo();
}
requestAnimationFrame(frame);
