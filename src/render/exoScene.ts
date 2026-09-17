/**
 * Plan 044 B6 — exoplanet scene.
 *
 * Renders a selected exoplanet system as a mini solar system: a host star at
 * the origin, each planet on its real Keplerian orbit (solved with the same
 * `positionAt` the main scene uses), orbit lines, and labels. A self-contained
 * scene with its own camera + OrbitControls, so it can share the app's canvas
 * with the main solar-system scene and be swapped in/out without touching the
 * main scene's state.
 *
 * Distances use a log-compressed ramp so a system spanning 0.01–6 AU stays in
 * frame; planet sizes are exaggerated (real exoplanets are sub-pixel at any
 * honest scale) and coloured by mass class.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { positionAt } from '../sim/kepler';
import {
  EXO_SYSTEMS,
  EXO_EPOCH_DAYS,
  exoElements,
  type ExoSystem,
  type ExoPlanet,
} from '../sim/exoplanets';

/** Log-compressed orbit distance: maps AU → scene units, keeping 0.01–6 AU in frame. */
function exoDistance(au: number): number {
  const t = Math.log10(Math.max(au, 0.005) / 0.005) / Math.log10(6 / 0.005);
  return 4 + t * 40; // 4..44 scene units
}

/** Exaggerated planet radius from Earth radii (real ones are sub-pixel). */
function exoRadius(rEarth: number | null): number {
  const r = rEarth ?? 1;
  return 0.35 + Math.min(1.6, 0.35 * Math.sqrt(r));
}

/** Colour by mass class (Earth masses): rocky → ice → gas → super-Jupiter. */
function exoColor(mEarth: number | null): number {
  const m = mEarth ?? 1;
  if (m < 2) return 0x6fa8dc; // rocky (blue-grey)
  if (m < 15) return 0x8fd0a0; // super-Earth / ice (green)
  if (m < 120) return 0xe0b060; // gas giant (amber)
  return 0xd07050; // super-Jupiter / brown dwarf (red)
}

interface ExoBody {
  planet: ExoPlanet;
  mesh: THREE.Mesh;
  orbit: THREE.Line;
  label: { el: HTMLDivElement; worldPos: THREE.Vector3 };
}

export interface ExoScene {
  systems: ExoSystem[];
  selectSystem: (index: number) => void;
  systemIndex: () => number;
  /** Advance the sim (tDays since J2000) and render one frame. */
  tick: (tDays: number, nowMs: number) => void;
  /** Resize the renderer to the canvas. */
  resize: () => void;
  /** Hide the exoplanet overlay (labels) — call when leaving the mode. */
  hide: () => void;
  /** Tear down the scene, controls, and label DOM. */
  dispose: () => void;
}

export function buildExoScene(renderer: THREE.WebGLRenderer, labelLayer: HTMLDivElement): ExoScene {
  // Reuse the app's renderer (a canvas has only ONE WebGL context; a second
  // WebGLRenderer on the same canvas would share the context and clobber the
  // main scene's GL state). We own the Scene/Camera/controls; the renderer is
  // shared and driven by the app's frame loop (which renders ONLY the exo
  // scene while this mode is active).
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060c);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 26, 40);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 160;

  // Lighting: a point light at the host star + a faint ambient.
  const starLight = new THREE.PointLight(0xfff2d0, 3.2, 0, 1.4);
  scene.add(starLight);
  scene.add(new THREE.AmbientLight(0x223044, 0.5));

  // Host star (rebuilt per system).
  let starMesh: THREE.Mesh | null = null;
  let starGlow: THREE.Sprite | null = null;

  const group = new THREE.Group();
  scene.add(group);
  const bodies: ExoBody[] = [];

  // --- label DOM (one div per planet, repositioned per frame) ---
  const labelEls: HTMLDivElement[] = [];

  function clearSystem(): void {
    for (const b of bodies) {
      group.remove(b.mesh);
      group.remove(b.orbit);
      b.mesh.geometry.dispose();
      (b.mesh.material as THREE.Material).dispose();
      b.orbit.geometry.dispose();
      (b.orbit.material as THREE.Material).dispose();
      b.label.el.remove();
    }
    bodies.length = 0;
    labelEls.length = 0;
    if (starMesh) {
      group.remove(starMesh);
      starMesh.geometry.dispose();
      (starMesh.material as THREE.Material).dispose();
      starMesh = null;
    }
    if (starGlow) {
      group.remove(starGlow);
      starGlow.material.dispose();
      (starGlow.material.map as THREE.Texture | null)?.dispose();
      starGlow = null;
    }
  }

  function makeStarGlow(): THREE.Sprite {
    const size = 64;
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,244,214,1)');
    g.addColorStop(0.25, 'rgba(255,220,150,0.55)');
    g.addColorStop(1, 'rgba(255,200,120,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(cv);
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(mat);
    sp.scale.setScalar(6);
    return sp;
  }

  function buildSystem(sys: ExoSystem): void {
    clearSystem();
    // Host star.
    const starGeo = new THREE.SphereGeometry(1.6, 48, 32);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffe6b0 });
    starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.name = 'exo-star';
    group.add(starMesh);
    starGlow = makeStarGlow();
    group.add(starGlow);

    for (const p of sys.planets) {
      const el = exoElements(p);
      // Orbit line: sample the full orbit, map AU → scene distance.
      const samples = 256;
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= samples; k++) {
        const t = EXO_EPOCH_DAYS + (k / samples) * p.P;
        const pos = positionAt(el, t);
        const r = Math.hypot(pos.x, pos.y, pos.z);
        const f = exoDistance(r) / Math.max(1e-9, r);
        pts.push(new THREE.Vector3(pos.x * f, pos.z * f, -pos.y * f));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x4a6a9a,
        transparent: true,
        opacity: 0.5,
      });
      const orbit = new THREE.Line(orbitGeo, orbitMat);
      group.add(orbit);

      // Planet mesh.
      const rad = exoRadius(p.R);
      const meshGeo = new THREE.SphereGeometry(rad, 32, 20);
      const meshMat = new THREE.MeshStandardMaterial({
        color: exoColor(p.M),
        roughness: 0.7,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(meshGeo, meshMat);
      group.add(mesh);

      // Label.
      const div = document.createElement('div');
      div.className = 'exo-label';
      div.textContent = p.name.replace(/"/g, '');
      labelLayer.appendChild(div);
      labelEls.push(div);

      bodies.push({
        planet: p,
        mesh,
        orbit,
        label: { el: div, worldPos: new THREE.Vector3() },
      });
    }
  }

  let idx = 0;

  function selectSystem(i: number): void {
    idx = Math.max(0, Math.min(EXO_SYSTEMS.length - 1, i));
    buildSystem(EXO_SYSTEMS[idx]);
    // Frame the system: distance from the outermost orbit.
    const sys = EXO_SYSTEMS[idx];
    const maxA = Math.max(...sys.planets.map((p) => p.a * (1 + p.e)));
    const d = exoDistance(maxA);
    camera.position.set(0, d * 0.7, d * 1.1);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  const _v = new THREE.Vector3();
  function tick(tDays: number, nowMs: number): void {
    for (const b of bodies) {
      const el = exoElements(b.planet);
      const pos = positionAt(el, tDays);
      const r = Math.hypot(pos.x, pos.y, pos.z);
      const f = exoDistance(r) / Math.max(1e-9, r);
      b.mesh.position.set(pos.x * f, pos.z * f, -pos.y * f);
      b.label.worldPos.copy(b.mesh.position);
    }
    controls.update();
    renderer.render(scene, camera);
    // Project labels to screen.
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (const b of bodies) {
      _v.copy(b.label.worldPos).project(camera);
      const behind = _v.z > 1;
      const x = (_v.x * 0.5 + 0.5) * w;
      const y = (-_v.y * 0.5 + 0.5) * h;
      const el = b.label.el;
      if (behind || x < -20 || x > w + 20 || y < -20 || y > h + 20) {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -140%)`;
      }
    }
    void nowMs;
  }

  function resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function hide(): void {
    for (const el of labelEls) el.style.display = 'none';
  }

  function dispose(): void {
    clearSystem();
    controls.dispose();
    // The renderer is SHARED with the main scene — do NOT dispose it here.
  }

  // Start on the richest system.
  selectSystem(0);

  return {
    systems: EXO_SYSTEMS,
    selectSystem,
    systemIndex: () => idx,
    tick,
    resize,
    hide,
    dispose,
  };
}
