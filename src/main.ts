/**
 * App entry: builds the Three.js scene, wires the control panel, and runs
 * the animation loop. The sim layer (src/sim) stays pure and is tested in
 * Node; everything DOM/WebGL lives here and in src/render.
 */
import * as THREE from 'three';
import { SimClock } from './sim/clock';
import { ALL_BODIES } from './data/bodies';
import { searchBodies, groupedBodyMenu, type SearchHit } from './data/searchIndex';
import {
  buildScene,
  updatePositions,
  applySpin,
  updateBeltFields,
  satelliteExtentScene,
  updateSatelliteHighlight,
  VISIBLE_SCALE,
  TRUE_SCALE,
  CONSTELLATION_RADIUS,
  type BuiltScene,
  type VisualScale,
} from './render/scene';
import {
  frameBody,
  frameSystem,
  frameConstellations,
  stepFlight,
  makeFlight,
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
const reverseBtn = document.getElementById('reverse') as HTMLButtonElement;
const nowBtn = document.getElementById('now') as HTMLButtonElement;
const findInputEl = document.getElementById('find') as HTMLInputElement;
const findListEl = document.getElementById('find-list') as HTMLDivElement;
const scaleEl = document.getElementById('scale') as HTMLSelectElement;
const orbitsEl = document.getElementById('orbits') as HTMLInputElement;
const labelsEl = document.getElementById('labels') as HTMLInputElement;
const beltsEl = document.getElementById('belts') as HTMLInputElement;
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
const eventsToggleBtn = document.getElementById('events-toggle') as HTMLButtonElement;
const eventsRangeEl = document.getElementById('events-range') as HTMLSelectElement;
const eventsRowEl = document.getElementById('events-row') as HTMLDivElement;
const eventsListEl = document.getElementById('events-list') as HTMLDivElement;

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
 * Currently highlighted satellite (a selected moon). The follow/camera can
 * be on the parent planet while the selected satellite stays lit — this is
 * how "pick a satellite" works: planet+all-orbits view + highlighted moon.
 */
let selectedSatelliteId = '';
let lastDays = clock.t;
let lastMs = performance.now();
// True while the WebGL context is down (driver reset / tab reclaimed). The
// render loop keeps ticking its rAF chain but skips all sim + GPU work until
// the browser fires `webglcontextrestored`, so a lost context costs nothing
// and the view comes back on its own (no forced reload).
let contextLost = false;
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
  return frameBody([planet.worldPos.x, planet.worldPos.y, planet.worldPos.z], extent, FOV_DEG);
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
  selectedSatelliteId = bodyId && moonParent.has(bodyId) ? bodyId : '';
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
}

/** Orbit period / live distance / peri-apoapsis for the followed body. */
function updateInfo(): void {
  if (!followId) {
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
});

eventsRangeEl.addEventListener('change', () => {
  refreshEvents();
});

// --- Body search combobox (B2) --------------------------------------------
// Replaces the old native `#follow` select: a typeahead input with a
// grouped dropdown (planet → its moons), keyboard nav (↑/↓/Enter/Esc) and
// click-to-select. Selecting a body flies the camera exactly like a pick;
// the empty query / "Free camera" row drops the follow. The `f` URL param
// is unchanged — `followId` remains the single source of truth.

const findMenu = groupedBodyMenu(ALL_BODIES); // display order, unfiltered
let findActiveIdx = -1; // highlighted row in the open dropdown
let findHits: SearchHit[] = []; // current dropdown rows (hits only)

function findLabel(id: string): string {
  return id === '' ? 'Free camera' : (byId.get(id)?.name ?? id);
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
  findHits = searchBodies(ALL_BODIES, query);
  findListEl.replaceChildren();
  const frag = document.createDocumentFragment();
  if (!query.trim()) {
    // Unfiltered: the full grouped menu (Sun → planets → moons → dwarfs).
    const free = document.createElement('div');
    free.className = 'fr fr-free';
    free.innerHTML =
      '<span class="fr-name">Free camera</span><span class="fr-sub">orbit wherever</span>';
    free.addEventListener('click', () => findPick(''));
    frag.appendChild(free);
    for (const e of findMenu) {
      const row = document.createElement('div');
      row.className = 'fr';
      row.innerHTML = `<span class="fr-name">${e.name}</span><span class="fr-sub">${e.sub}</span>`;
      row.addEventListener('click', () => findPick(e.id));
      frag.appendChild(row);
    }
  } else if (findHits.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'fr-empty';
    empty.textContent = 'No bodies match';
    frag.appendChild(empty);
  } else {
    for (const h of findHits) {
      const row = document.createElement('div');
      row.className = 'fr';
      const sub = h.parentName ? `moon of ${h.parentName}` : h.kind;
      row.innerHTML = `<span class="fr-name">${h.name}</span><span class="fr-sub">${sub}</span>`;
      row.addEventListener('click', () => findPick(h.id));
      frag.appendChild(row);
    }
  }
  findListEl.appendChild(frag);
  findActiveIdx = 0;
  findMarkActive();
  findListEl.hidden = false;
}

/** Select a body from the dropdown (or '' = free camera) and fly to it. */
function findPick(id: string): void {
  findInputEl.value = findLabel(id);
  findClose();
  findInputEl.blur();
  if (id) {
    const dest = camAnchorForBody(id);
    if (dest) {
      flyTo(dest, 1.4, id);
      return;
    }
  }
  // "Free camera" (or a body with no frame): just drop the follow.
  followId = '';
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

scaleEl.addEventListener('change', () => {
  scale = scaleEl.value === 'true' ? TRUE_SCALE : VISIBLE_SCALE;
  rebuildScene(scale);
  syncUrl();
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

window.addEventListener('resize', () => {
  built.camera.aspect = window.innerWidth / window.innerHeight;
  built.camera.updateProjectionMatrix();
  built.renderer.setSize(window.innerWidth, window.innerHeight);
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
  setFindValue(urlState.follow);
  followId = urlState.follow;
  // Restoring a satellite selection re-arms its highlight ring too.
  selectedSatelliteId = moonParent.has(urlState.follow) ? urlState.follow : '';
}

/** Snapshot the current UI + camera into a shareable ViewState. */
function captureState(): ViewState {
  return {
    timeMs: clock.toDate().getTime(),
    speedLog: parseFloat(speedEl.value),
    reversed: clock.isReversed,
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
  get renderer() {
    return built.renderer;
  },
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
    if (lockEntry) built.controls.target.lerp(lockEntry.worldPos, 0.2);
    built.controls.update();
  } else {
    built.controls.update();
  }

  // Pulsing highlight on the selected satellite (driven by wall-clock time so
  // the pulse is smooth and independent of the sim speed / direction).
  updateSatelliteHighlight(built, selectedSatelliteId, nowMs / 1000);

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
