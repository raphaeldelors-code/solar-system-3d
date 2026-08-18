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
import { positionAtInto, sampleOrbit } from '../sim/kepler';
import { makeSurfaceTexture, makeLabelTexture } from './textures';
import { BELTS } from '../data/belts';
import { MOONS } from '../data/bodies';
import { buildBeltField, updateBeltField, type BeltField } from './belts';
import { CONSTELLATIONS, raDecToUnit } from '../data/constellations';
import {
  SUN_SHADOWS, configureSunShadows, setBodyShadowFlags,
} from './shadows';
import {
  SUN_R, planetRadiusKm, moonRadiusKm, planetDistance, moonDistance,
  baseMoonDistance, followDistanceKm,
} from './visibleScale';

export const AU = 1; // 1 scene unit per AU
const AU_TO_KM = 1.495978707e8;

export interface VisualScale {
  /** Scene radius for a planet / dwarf / (non-star) body of given km radius. */
  bodyRadiusKm: (km: number) => number;
  /** Scene radius for a moon of given km radius (much smaller than planets). */
  moonRadiusKm: (km: number) => number;
  /** Scene distance multiplier applied to heliocentric AU positions. */
  planetDistance: (au: number) => number;
  /**
   * Scene distance of a moon at real distance `km` from its parent.
   * `moonId` is the moon's own id (per-moon clamp lookup in visible mode);
   * `TRUE_SCALE` ignores it.
   */
  moonDistance: (km: number, moonId?: string) => number;
  /** Suggested camera distance when following a body of this km radius. */
  followDistanceKm: (km: number) => number;
}

/**
 * Compressed distances + exaggerated sizes: everything is visible.
 * The mappings live in `visibleScale.ts` (piecewise-linear orbit ramp,
 * separate moon radius, per-moon clamp) — see that module for the
 * derivation and the solved anchor/clamp constants.
 */
export const VISIBLE_SCALE: VisualScale = {
  bodyRadiusKm: planetRadiusKm,
  moonRadiusKm: moonRadiusKm,
  planetDistance,
  moonDistance: (km, moonId) =>
    (moonId ? moonDistance(moonId, km) : null) ?? baseMoonDistance(km),
  followDistanceKm,
};

/** True physical scale (distances and sizes to the same ratio). */
export const TRUE_SCALE: VisualScale = {
  bodyRadiusKm: (km) => (km / AU_TO_KM) * AU,
  moonRadiusKm: (km) => (km / AU_TO_KM) * AU,
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
  /**
   * Pulsing glow ring highlighting the selected satellite (child of the
   * pivot so it tilts with the body; hidden unless this body is the
   * selection). See `setSatelliteHighlight`.
   */
  orbitEmphasis: THREE.Mesh;
  /** Parent body entry; null for planets/Sun (Sun at origin). */
  parent: SceneBody | null;
  /** Spin angle accumulator [rad]. */
  spin: number;
  /** Current world position (scene units). */
  worldPos: THREE.Vector3;
  /** This body's rendered radius in scene units (for camera framing). */
  sceneRadius: number;
  /**
   * Full width (scene units) to frame when the camera flies to this body:
   * the diameter for a plain body, or the ring's OUTER diameter for a
   * ringed planet, so a fly-to lands with the whole body + rings in view.
   */
  frameExtent: number;
}

export interface BuiltScene {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  scene: THREE.Scene;
  bodies: Map<string, SceneBody>;
  /** Small-body fields (asteroid + Kuiper belts). */
  belts: BeltField[];
  sunLight: THREE.PointLight;
  starMat: THREE.PointsMaterial;
  /** Constellation figure lines + named-star markers (decorative sky). */
  constellations: THREE.Group;
  /** Per-frame scratch state (sorted body order for updatePositions). */
  userData: { updateOrder?: SceneBody[] };
  dispose: () => void;
}

function eclipticToScene(v: { x: number; y: number; z: number }): THREE.Vector3 {
  return new THREE.Vector3(-v.x, v.z, -v.y);
}

/**
 * Allocation-free ecliptic->scene map: writes into the caller-owned vector.
 * (ecliptic x -> -x, ecliptic y -> -z, ecliptic north z -> +y)
 */
function eclipticToSceneInto(v: { x: number; y: number; z: number }, out: THREE.Vector3): THREE.Vector3 {
  out.set(-v.x, v.z, -v.y);
  return out;
}

function makeOrbitLine(
  elements: OrbitalElements,
  /**
   * Maps a sample's heliocentric radius (AU for planets, km for moons) to
   * its scene distance. Must be the SAME per-point mapping the body
   * positions use in `updatePositions`, otherwise the drawn line drifts
   * off the actual path for any non-linear scale.
   */
  distMap: (r: number) => number,
): THREE.Line {
  const samples = sampleOrbit(elements, 0, 256);
  const pts = samples.map((s) => {
    const r = Math.hypot(s.x, s.y, s.z);
    return eclipticToScene(s).multiplyScalar(distMap(r) / Math.max(1e-9, r));
  });
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
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // Keep the frame buffer alive after present so canvas.toBlob() in
    // main.ts can export a PNG screenshot of the current view.
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Shadows: Sun point light casts shadow-cube maps so moons/planets
  // eclipse each other (Moon on Earth, Io on Jupiter, rings on Saturn).
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
  configureSunShadows(sunLight, SUN_SHADOWS.far);
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

  // Constellation figure lines + named-star markers on the celestial sphere.
  const constellations = buildConstellations();
  scene.add(constellations);

  const disposables: { dispose: () => void }[] = [starGeo, starMat];
  const map = new Map<string, SceneBody>();

  // Planets and Sun first so moons can resolve their parents.
  const ordered = [...bodies.filter((b) => b.kind !== 'moon'), ...bodies.filter((b) => b.kind === 'moon')];

  for (const def of ordered) {
    const isStar = def.kind === 'star';
    const isMoon = def.kind === 'moon';

    // Radius in scene units (stars get a special size; moons are much
    // smaller than planets so satellites read as satellites).
    const r = isStar
      ? (scale === TRUE_SCALE ? (def.radiusKm / AU_TO_KM) * 1.15 : SUN_R)
      : isMoon
        ? scale.moonRadiusKm(def.radiusKm)
        : scale.bodyRadiusKm(def.radiusKm);

    const geo = new THREE.SphereGeometry(r, 48, 32);
    const surfaceTex = makeSurfaceTexture(def);
    const mat = isStar
      ? new THREE.MeshBasicMaterial({ map: surfaceTex })
      : new THREE.MeshStandardMaterial({ map: surfaceTex, roughness: 0.92, metalness: 0 });
    disposables.push(geo, mat, surfaceTex);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = def.name;
    // Stable id for raycast picking (main.ts tooltip); name is display-only.
    mesh.userData.id = def.id;
    // Shadow flags: every body except the light source casts and receives.
    setBodyShadowFlags(mesh, isStar);

    // Axial tilt pivot; spin happens on the mesh around local Y.
    const pivot = new THREE.Group();
    pivot.name = `pivot:${def.name}`;
    pivot.rotation.z = THREE.MathUtils.degToRad(def.tiltDeg ?? 0);
    pivot.add(mesh);
    scene.add(pivot);

    // Selection highlight: a flat glow ring in the body's equatorial plane
    // (same plane its satellites orbit in). Child of the pivot so it tilts
    // with the body; invisible until `setSatelliteHighlight` marks this body
    // as the selected satellite.
    const hlGeo = new THREE.RingGeometry(1.55, 2.35, 64);
    const hlMat = new THREE.MeshBasicMaterial({
      color: 0x7fd8ff, side: THREE.DoubleSide, transparent: true,
      opacity: 0, depthWrite: false,
    });
    const orbitEmphasis = new THREE.Mesh(hlGeo, hlMat);
    orbitEmphasis.rotation.x = -Math.PI / 2;
    orbitEmphasis.scale.setScalar(Math.max(1e-3, r));
    orbitEmphasis.visible = false;
    pivot.add(orbitEmphasis);
    disposables.push(hlGeo, hlMat);

    // Rings.
    if (def.rings) {
      const inner = r * def.rings.inner, outer = r * def.rings.outer;
      const ringGeo = new THREE.RingGeometry(inner, outer, 96);
      // Standard (lit) material so the rings react to the sun AND receive
      // shadows (Saturn's shadow band across the rings). RingGeometry is a
      // true annulus (the hole is real geometry, not alpha), so casting is
      // safe: in the shadow pass it projects a band, not a solid disc.
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(...def.rings.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: def.rings.opacity,
        roughness: 0.9,
        metalness: 0,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.castShadow = true;
      ringMesh.receiveShadow = true;
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

    // Orbit line. Per-point radius mapping (same one the body positions
    // use) so eccentric ellipses stay on their drawn path.
    let orbit: THREE.Line | null = null;
    if (def.elements) {
      const distMap = (r: number): number => isMoon
        ? scale.moonDistance(r, def.id)
        : scale.planetDistance(r);
      orbit = makeOrbitLine(def.elements, distMap);
      if (!isMoon) {
        scene.add(orbit);
      }
      // Moon orbits are attached to the parent pivot after all bodies exist.
    }

    const parent = isMoon && def.parent ? (map.get(def.parent) ?? null) : null;
    // Framing extent: the ringed planet is framed to its OUTER ring so a
    // fly-to lands with the whole ring system in view; everything else to
    // its body diameter.
    const frameExtent = def.rings ? 2 * r * def.rings.outer : 2 * r;
    const entry: SceneBody = {
      def, pivot, mesh, label, orbit, orbitEmphasis, parent,
      spin: 0,
      worldPos: new THREE.Vector3(),
      sceneRadius: r,
      frameExtent,
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

  // Belt populations (asteroid + Kuiper). Built last so they never
  // interfere with body/parent resolution.
  const belts: BeltField[] = [];
  for (const def of BELTS) {
    const field = buildBeltField(def);
    belts.push(field);
    scene.add(field.mesh);
  }
  updateBeltFields({ belts } as Pick<BuiltScene, 'belts'>, 0, scale);

  function dispose() {
    for (const d of disposables) d.dispose();
    for (const b of belts) b.dispose();
    constellations.userData.dispose?.();
    controls.dispose();
    renderer.dispose();
  }

  return { renderer, camera, controls, scene, bodies: map, belts, sunLight, starMat, constellations, userData: {}, dispose };
}

/** Constellation sky radius: just inside the procedural starfield shell. */
export const CONSTELLATION_RADIUS = 4800;

/**
 * Build the decorative constellation lines + star markers. Pure three.js
 * construction over the data in `src/data/constellations.ts`.
 */
export function buildConstellations(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'constellations';

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x8fb0ff, transparent: true, opacity: 0.32,
    depthWrite: false,
  });
  const dotMat = new THREE.PointsMaterial({
    color: 0xcfe0ff, size: 3.2, sizeAttenuation: false,
    transparent: true, opacity: 0.9, depthWrite: false,
  });

  const lineVerts: number[] = [];
  const dotVerts: number[] = [];
  for (const c of CONSTELLATIONS) {
    const pos = c.stars.map((s) => {
      const [x, y, z] = raDecToUnit(s.raHours, s.decDeg);
      return [x * CONSTELLATION_RADIUS, y * CONSTELLATION_RADIUS, z * CONSTELLATION_RADIUS];
    });
    for (const [a, b] of c.lines) {
      lineVerts.push(...pos[a], ...pos[b]);
    }
    for (const p of pos) dotVerts.push(...p);
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  lines.name = 'constellation-lines';
  group.add(lines);

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotVerts, 3));
  const dots = new THREE.Points(dotGeo, dotMat);
  dots.name = 'constellation-stars';
  group.add(dots);

  // Expose for disposal.
  group.userData.dispose = () => {
    lineGeo.dispose(); lineMat.dispose();
    dotGeo.dispose(); dotMat.dispose();
  };
  return group;
}

/**
 * Advance all body positions to simulation time `tDays`.
 * Called once per frame from the animation loop.
 *
 * Allocation-free hot path: a single sorted entry list is cached per
 * `BuiltScene`, and one shared scratch vector replaces the per-body
 * `new THREE.Vector3` churn (~36/frame + belt instances).
 */
export function updatePositions(
  built: BuiltScene,
  tDays: number,
  scale: VisualScale,
): void {
  let order = built.userData.updateOrder as SceneBody[] | undefined;
  if (!order) {
    // Planets + Sun first (moons depend on parent world positions).
    order = [...built.bodies.values()].sort((a, b) => {
      const da = a.parent ? 1 : 0, db = b.parent ? 1 : 0;
      return da - db;
    });
    built.userData.updateOrder = order;
  }

  const scratch = UPDATE_POS_SCRATCH;
  const auScratch = UPDATE_AU_SCRATCH;

  for (const entry of order) {
    const { def, pivot } = entry;

    if (def.kind === 'star') {
      pivot.position.set(0, 0, 0);
      entry.worldPos.set(0, 0, 0);
    } else if ((def.kind === 'planet' || def.kind === 'dwarf') && def.elements) {
      const p = positionAtInto(def.elements, tDays, auScratch); // AU, ecliptic frame
      const s = eclipticToSceneInto(p, scratch);
      const d = Math.hypot(p.x, p.y, p.z);
      const factor = scale.planetDistance(d) / Math.max(1e-9, d);
      pivot.position.copy(s.multiplyScalar(factor));
      entry.worldPos.copy(pivot.position);
    } else if (def.kind === 'moon' && def.elements) {
      const p = positionAtInto(def.elements, tDays, auScratch); // km, parent-equatorial frame
      const s = eclipticToSceneInto(p, scratch);
      const d = Math.hypot(p.x, p.y, p.z);
      const factor = scale.moonDistance(d, def.id) / Math.max(1e-9, d);
      const local = s.multiplyScalar(factor);
      const parent = entry.parent;
      if (parent) {
        // The moon's orbit LINE is a child of parent.pivot, which carries the
        // parent's axial-tilt rotation (pivot.rotation.z = tiltDeg). The body
        // must receive the SAME rotation, otherwise an inclined satellite
        // drifts off its (angled) orbit line and instead appears to orbit in
        // the flat ecliptic plane. Applying the parent pivot's orientation
        // reproduces exactly the transform the line is rendered with, so the
        // body sits on its own line for any tilted/retrograde parent.
        local.applyQuaternion(parent.pivot.quaternion);
        pivot.position.copy(parent.worldPos).add(local);
      } else {
        pivot.position.copy(local);
      }
      entry.worldPos.copy(pivot.position);
    }
  }
}

// Module-level scratch for the render loop (single-threaded, never nested).
const UPDATE_POS_SCRATCH = new THREE.Vector3();
const UPDATE_AU_SCRATCH: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

/** Advance every belt field to simulation time `tDays` (per frame). */
export function updateBeltFields(
  built: Pick<BuiltScene, 'belts'>,
  tDays: number,
  scale: VisualScale,
): void {
  for (const field of built.belts) {
    updateBeltField(field, tDays, scale);
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

/**
 * Scene-space distance of a moon from its parent, using the active scale's
 * per-moon mapping (same one its positions use, so it matches the drawn
 * orbit line). Moon `elements.a` is in km.
 */
export function satelliteSceneDistance(moonDef: BodyDefinition, scale: VisualScale): number {
  const km = moonDef.elements ? moonDef.elements.a : 0;
  return scale.moonDistance(km, moonDef.id);
}

/**
 * Farthest satellite scene distance around a planet (0 if it has none).
 * Framing extent for "planet + all its satellite orbits": a diameter of
 * 2× this plus the planet's own radius keeps every orbit in the frame.
 */
export function satelliteExtentScene(planetId: string, scale: VisualScale): number {
  let max = 0;
  for (const m of MOONS) {
    if (m.parent !== planetId) continue;
    max = Math.max(max, satelliteSceneDistance(m, scale));
  }
  return max;
}

/**
 * Selection highlight for a satellite: a pulsing glow ring in the moon's
 * equatorial plane + its orbit line brightened. `id` '' clears the
 * selection. Call once per frame with a wall-clock `tSeconds` to drive
 * the pulse (phase is absolute, so the pulse never jumps).
 */
export function updateSatelliteHighlight(
  built: BuiltScene,
  id: string,
  tSeconds: number,
): void {
  const phase = 0.5 + 0.5 * Math.sin(tSeconds * 3.4); // 0..1, ~1.9 s period
  for (const entry of built.bodies.values()) {
    const isSel = id !== '' && entry.def.id === id;
    entry.orbitEmphasis.visible = isSel;
    if (isSel) {
      const m = entry.orbitEmphasis.material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 + 0.55 * phase;
      // gentle breathing so the ring reads as "the one you picked"
      const s = entry.sceneRadius * (1.0 + 0.12 * phase);
      entry.orbitEmphasis.scale.setScalar(s);
    }
    if (entry.orbit) {
      const om = entry.orbit.material as THREE.LineBasicMaterial;
      om.opacity = isSel ? 0.95 : 0.45;
      om.color.set(isSel ? 0x7fd8ff : 0x5570a0);
    }
  }
}
