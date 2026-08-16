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

const clock = new SimClock(Date.now());
let built: BuiltScene;
let scale: VisualScale = VISIBLE_SCALE;
let followId = '';
let lastDays = clock.t;
let lastMs = performance.now();

function rebuildScene(newScale: VisualScale): void {
  if (built) built.dispose();
  built = buildScene(canvas, ALL_BODIES, newScale);
  // re-attach moon orbits to parent pivots
  for (const entry of built.bodies.values()) {
    if (entry.orbit && entry.parent) {
      entry.parent.pivot.add(entry.orbit);
    }
  }
  applyToggles();
  updatePositions(built, clock.t, scale);
  // re-frame camera on follow target
  if (followId) {
    const entry = built.bodies.get(followId);
    if (entry) {
      const d = scale.followDistanceKm(entry.def.radiusKm);
      built.controls.target.copy(entry.worldPos);
      built.camera.position.copy(entry.worldPos).add(new THREE.Vector3(d, d * 0.6, d));
    }
  }
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

// --- UI wiring -------------------------------------------------------------

speedEl.addEventListener('input', () => {
  clock.setLogSpeed(parseFloat(speedEl.value));
  fmtSpeed();
});

pauseBtn.addEventListener('click', () => {
  clock.setPaused(!clock.isPaused);
  pauseBtn.textContent = clock.isPaused ? 'Resume' : 'Pause';
});

nowBtn.addEventListener('click', () => {
  clock.setDate(new Date());
});

followEl.addEventListener('change', () => {
  followId = followEl.value;
});

scaleEl.addEventListener('change', () => {
  scale = scaleEl.value === 'true' ? TRUE_SCALE : VISIBLE_SCALE;
  rebuildScene(scale);
});

orbitsEl.addEventListener('change', applyToggles);
labelsEl.addEventListener('change', applyToggles);
beltsEl.addEventListener('change', applyToggles);

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

// --- Init ------------------------------------------------------------------

rebuildScene(scale);
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
}
requestAnimationFrame(frame);
