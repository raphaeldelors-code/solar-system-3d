/**
 * Scene graph: builds Three.js objects for every body from the data layer
 * and exposes per-frame position updates.
 *
 * Coordinate mapping (ecliptic frame -> three.js):
 *   ecliptic x -> three.js -x,  ecliptic y -> three.js -z,
 *   ecliptic z (north) -> three.js +y
 * (so "up" is ecliptic north; default view is from the north pole).
 *
 * Units: 1 scene unit = 1 AU for planet distances. Moon offsets are in km
 * converted by the active VisualScale.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { BodyDefinition, OrbitalElements } from '../sim/types';
import { positionAt, sampleOrbit } from '../sim/kepler';
import { makeSurfaceTexture, makeLabelTexture } from './textures';

export const AU = 1; // 1 scene unit per AU
const AU_TO_KM = 1.495978707e8;

export interface VisualScale {
  /** Scene radius for a body of given km radius. */
  bodyRadiusKm: (km: number) => number;
  /** Scene distance multiplier applied to heliocentric AU positions. */
  planetDistance: (au: number) => number;
  /** Scene distance multiplier for moon offsets (input km). */
  moonDistance: (km: number) => number;
  /** Suggested camera distance when following a body of this km radius. */
  followDistanceKm: (km: number) => number;
}

/** Compressed distances + exaggerated sizes: everything is visible. */
export const VISIBLE_SCALE: VisualScale = {
  bodyRadiusKm: (km) => 0.5 + Math.log10(km / 100 + 1) * 0.9,
  planetDistance: (au) => 4 + Math.log10(au / 0.38) * 11,
  moonDistance: (km) => 1.6 + Math.log10(km / 3000 + 1) * 1.4,
  followDistanceKm: (km) => 4 + Math.log10(km / 100 + 1) * 6,
};

/** True physical scale (distances and sizes to the same ratio). */
export const TRUE_SCALE: VisualScale = {
  bodyRadiusKm: (km) => (km / AU_TO_KM) * AU,
  planetDistance: (au) => au,
  moonDistance: (km) => (km / AU_TO_KM) * AU,
  followDistanceKm: (km) => Math.max(1.5, (km / AU_TO_KM) * 8),
};

export interface SceneBody {
  def: BodyDefinition;
  /** Tilt pivot (axial tilt) containing the mesh, rings and label. */
  pivot: THREE.Group;
  /** Body mesh (spins around local Y). */
  mesh: THREE.Mesh;
  /** Label sprite. */
  label: THREE.Sprite;
  /** Orbit line (planets in scene frame; moons in parent local frame). */
  orbit: THREE.Line | null;
  /** Parent body entry; null for planets/Sun (Sun at origin). */
  parent: SceneBody | null;
  /** Spin angle accumulator [rad]. */
  spin: number;
  /** Current world position (scene units). */
  worldPos: THREE.Vector3;
}

export interface BuiltScene {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  scene: THREE.Scene;
  bodies: Map<string, SceneBody>;
  sunLight: THREE.PointLight;
  starMat: THREE.PointsMaterial;
  dispose: () => void;
}

function eclipticToScene(v: { x: number; y: number; z: number }): THREE.Vector3 {
  return new THREE.Vector3(-v.x, v.z, -v.y);
}

function makeOrbitLine(
  elements: OrbitalElements,
  scaleFactor: number,
): THREE.Line {
  const samples = sampleOrbit(elements, 0, 256);
  const pts = samples.map((s) => eclipticToScene(s).multiplyScalar(scaleFactor));
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color: 0x5570a0, transparent: true, opacity: 0.45,
  });
  const line = new THREE.Line(geo, mat);
  line.userData.geo = geo;
  line.userData.mat = mat;
  return line;
}

export function buildScene(
  canvas: HTMLCanvasElement,
  bodies: BodyDefinition[],
  scale: VisualScale,
): BuiltScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000005);

  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth / window.innerHeight, 0.0005, 20000,
  );
  camera.position.set(0, 16, 30);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  // Lighting: Sun point light at origin + faint ambient.
  const sunLight = new THREE.PointLight(0xfff2d8, 3.5, 0, 0);
  scene.add(sunLight);
  scene.add(new THREE.AmbientLight(0x223044, 0.4));

  // Starfield.
  const starCount = 4000;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const u = Math.random(), v = Math.random();
    const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1);
    const r = 5000 + Math.random() * 3000;
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.cos(phi);
    starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xdde6f5, size: 1.6, sizeAttenuation: false,
    transparent: true, opacity: 0.8,
  });
  scene.add(new THREE.Points(starGeo, starMat));

  const disposables: { dispose: () => void }[] = [starGeo, starMat];
  const map = new Map<string, SceneBody>();

  // Planets and Sun first so moons can resolve their parents.
  const ordered = [...bodies.filter((b) => b.kind !== 'moon'), ...bodies.filter((b) => b.kind === 'moon')];

  for (const def of ordered) {
    const isStar = def.kind === 'star';
    const isMoon = def.kind === 'moon';

    // Radius in scene units (stars get a special size).
    const r = isStar
      ? (scale === TRUE_SCALE ? (def.radiusKm / AU_TO_KM) * 1.15 : 1.35)
      : scale.bodyRadiusKm(def.radiusKm);

    const geo = new THREE.SphereGeometry(r, 48, 32);
    const surfaceTex = makeSurfaceTexture(def);
    const mat = isStar
      ? new THREE.MeshBasicMaterial({ map: surfaceTex })
      : new THREE.MeshStandardMaterial({ map: surfaceTex, roughness: 0.92, metalness: 0 });
    disposables.push(geo, mat, surfaceTex);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = def.name;

    // Axial tilt pivot; spin happens on the mesh around local Y.
    const pivot = new THREE.Group();
    pivot.name = `pivot:${def.name}`;
    pivot.rotation.z = THREE.MathUtils.degToRad(def.tiltDeg ?? 0);
    pivot.add(mesh);
    scene.add(pivot);

    // Rings.
    if (def.rings) {
      const inner = r * def.rings.inner, outer = r * def.rings.outer;
      const ringGeo = new THREE.RingGeometry(inner, outer, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(...def.rings.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: def.rings.opacity,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      pivot.add(ringMesh);
      disposables.push(ringGeo, ringMat);
    }

    // Label sprite above the body.
    const labelTex = makeLabelTexture(def.name);
    const labelMat = new THREE.SpriteMaterial({ map: labelTex, depthTest: false });
    const label = new THREE.Sprite(labelMat);
    const ls = isStar ? 3.4 : Math.max(1.3, r * 2.4);
    label.scale.set(ls, ls * 0.25, 1);
    label.position.y = r + ls * 0.35;
    pivot.add(label);
    disposables.push(labelTex, labelMat);

    // Orbit line.
    let orbit: THREE.Line | null = null;
    if (def.elements) {
      const scaleFactor = isMoon
        ? scale.moonDistance(def.elements.a) / def.elements.a
        : scale.planetDistance(def.elements.a) / def.elements.a;
      orbit = makeOrbitLine(def.elements, scaleFactor);
      if (!isMoon) {
        scene.add(orbit);
      }
      // Moon orbits are attached to the parent pivot after all bodies exist.
    }

    const parent = isMoon && def.parent ? (map.get(def.parent) ?? null) : null;
    const entry: SceneBody = {
      def, pivot, mesh, label, orbit, parent,
      spin: 0,
      worldPos: new THREE.Vector3(),
    };
    map.set(def.id, entry);
  }

  // Fix moon orbit double-add: remove duplicates from pivots.
  for (const e of map.values()) {
    if (e.orbit && e.parent) {
      // ensure single parent
      e.orbit.removeFromParent();
      e.parent.pivot.add(e.orbit);
    }
  }

  function dispose() {
    for (const d of disposables) d.dispose();
    controls.dispose();
    renderer.dispose();
  }

  return { renderer, camera, controls, scene, bodies: map, sunLight, starMat, dispose };
}

/**
 * Advance all body positions to simulation time `tDays`.
 * Called once per frame from the animation loop.
 */
export function updatePositions(
  built: BuiltScene,
  tDays: number,
  scale: VisualScale,
): void {
  const { bodies } = built;

  // Planets + Sun first (moons depend on parent world positions).
  const entries = [...bodies.values()].sort((a, b) => {
    const da = a.parent ? 1 : 0, db = b.parent ? 1 : 0;
    return da - db;
  });

  for (const entry of entries) {
    const { def, pivot } = entry;

    if (def.kind === 'star') {
      pivot.position.set(0, 0, 0);
      entry.worldPos.set(0, 0, 0);
    } else if (def.kind === 'planet' && def.elements) {
      const p = positionAt(def.elements, tDays); // AU, ecliptic frame
      const s = eclipticToScene(p);
      const d = Math.hypot(p.x, p.y, p.z);
      const factor = scale.planetDistance(d) / Math.max(1e-9, d);
      pivot.position.copy(s.multiplyScalar(factor));
      entry.worldPos.copy(pivot.position);
    } else if (def.kind === 'moon' && def.elements) {
      const p = positionAt(def.elements, tDays); // km, ecliptic frame
      const s = eclipticToScene(p);
      const d = Math.hypot(p.x, p.y, p.z);
      const factor = scale.moonDistance(d) / Math.max(1e-9, d);
      const local = s.multiplyScalar(factor);
      const parentWorld = entry.parent ? entry.parent.worldPos : new THREE.Vector3();
      pivot.position.copy(parentWorld).add(local);
      entry.worldPos.copy(pivot.position);
    }
  }
}

/** Per-frame spin advance; call with dt in sim days. */
export function applySpin(built: BuiltScene, dtDays: number): void {
  for (const entry of built.bodies.values()) {
    if (!entry.def.rotationHours) continue;
    const daysPerSpin = entry.def.rotationHours / 24;
    entry.spin += (dtDays / Math.abs(daysPerSpin)) * Math.PI * 2 * Math.sign(daysPerSpin);
    entry.mesh.rotation.y = entry.spin;
  }
}
