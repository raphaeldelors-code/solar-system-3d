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
import { positionAtInto, sampleOrbit, type Vec3 } from '../sim/kepler';
import { moonGeocentricJ2000 } from '../sim/moon';
import { AU_KM } from '../sim/types';
import { makeSurfaceTexture, makeLabelTexture, makeConstellationNameTexture } from './textures';
import { BELTS } from '../data/belts';
import { MOONS } from '../data/bodies';
import { buildBeltField, updateBeltField, type BeltField } from './belts';
import { CONSTELLATIONS, raDecToUnit, type Constellation } from '../data/constellations';
import { SUN_SHADOWS, configureSunShadows, setBodyShadowFlags } from './shadows';
import {
  SUN_R,
  planetRadiusKm,
  moonRadiusKm,
  planetDistance,
  moonDistance,
  baseMoonDistance,
  followDistanceKm,
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
  /**
   * Multiplier applied to belt rock instance sizes (1 = visible-mode dots,
   * ~0 at true scale where km-sized asteroids are sub-pixel). Used by the
   * true-scale tour (B3) to morph belt visibility with the rest of the scene.
   */
  beltSizeFactor?: number;
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
  moonDistance: (km, moonId) => (moonId ? moonDistance(moonId, km) : null) ?? baseMoonDistance(km),
  followDistanceKm,
  beltSizeFactor: 1,
};

/** True physical scale (distances and sizes to the same ratio). */
export const TRUE_SCALE: VisualScale = {
  bodyRadiusKm: (km) => (km / AU_TO_KM) * AU,
  moonRadiusKm: (km) => (km / AU_TO_KM) * AU,
  planetDistance: (au) => au,
  moonDistance: (km) => (km / AU_TO_KM) * AU,
  followDistanceKm: (km) => Math.max(1.5, (km / AU_TO_KM) * 8),
  // km-sized belt rocks are far below a pixel at AU distances — vanish them
  // at true scale (the B3 tour morphs this factor toward 0).
  beltSizeFactor: 0,
};

/**
 * True-scale tour (B3) blend: linearly interpolate every mapping of one
 * `VisualScale` toward another at progress `p` (0 → exactly `from`,
 * 1 → exactly `to`). Pure (no DOM, no three) and unit-tested — see
 * `tests/scaleBlend.test.ts`. The tour builds this fresh each frame as
 * `lerpScale(baseScale, TRUE_SCALE, p)` and hands it to `updatePositions` /
 * `updateBeltFields` / `reprojectOrbitLine` so bodies, belts and orbit lines
 * all move in lockstep with the eased progress.
 */
export function lerpScale(from: VisualScale, to: VisualScale, p: number): VisualScale {
  const L = (a: number, b: number): number => a + (b - a) * p;
  return {
    bodyRadiusKm: (km) => L(from.bodyRadiusKm(km), to.bodyRadiusKm(km)),
    moonRadiusKm: (km) => L(from.moonRadiusKm(km), to.moonRadiusKm(km)),
    planetDistance: (au) => L(from.planetDistance(au), to.planetDistance(au)),
    moonDistance: (km, moonId) => L(from.moonDistance(km, moonId), to.moonDistance(km, moonId)),
    followDistanceKm: (km) => L(from.followDistanceKm(km), to.followDistanceKm(km)),
    beltSizeFactor: L(from.beltSizeFactor ?? 1, to.beltSizeFactor ?? 0),
  };
}

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
   * Ring mesh (Saturn/…), a child of the pivot. Stored so the true-scale
   * tour (B3) can morph the rings with the body (both scale from the
   * built-in visible-mode radius).
   */
  ringsMesh: THREE.Mesh | null;
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
   * This body's scene radius at VISIBLE_SCALE, independent of the build
   * scale. Together with `trueRadius` it lets the true-scale tour (B3)
   * reproduce the EXACT radius under the blended scale at any progress.
   */
  visibleRadius: number;
  /**
   * This body's scene radius at TRUE_SCALE, independent of the build scale.
   */
  trueRadius: number;
  /** This body's rendered radius at build time (the mesh's baked radius). */
  builtRadius: number;
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
function eclipticToSceneInto(
  v: { x: number; y: number; z: number },
  out: THREE.Vector3,
): THREE.Vector3 {
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
    color: 0x5570a0,
    transparent: true,
    opacity: 0.45,
  });
  const line = new THREE.Line(geo, mat);
  // True-scale tour (B3) morphs orbit lines live: store each sample's
  // heliocentric radius + unit direction so `updateOrbitLines` can
  // re-project the line through ANY scale without rebuilding geometry.
  const n = samples.length;
  const radii = new Float32Array(n);
  const unitDirs = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const s = samples[i];
    radii[i] = Math.hypot(s.x, s.y, s.z);
    const d = eclipticToScene(s).normalize();
    unitDirs[i * 3] = d.x;
    unitDirs[i * 3 + 1] = d.y;
    unitDirs[i * 3 + 2] = d.z;
  }
  line.userData.radii = radii;
  line.userData.unitDirs = unitDirs;
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
    50,
    window.innerWidth / window.innerHeight,
    0.0005,
    20000,
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
    const u = Math.random(),
      v = Math.random();
    const theta = 2 * Math.PI * u,
      phi = Math.acos(2 * v - 1);
    const r = 5000 + Math.random() * 3000;
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.cos(phi);
    starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xdde6f5,
    size: 1.6,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.8,
  });
  scene.add(new THREE.Points(starGeo, starMat));

  // Constellation figure lines + named-star markers on the celestial sphere.
  const constellations = buildConstellations();
  scene.add(constellations);

  const disposables: { dispose: () => void }[] = [starGeo, starMat];
  const map = new Map<string, SceneBody>();

  // Planets and Sun first so moons can resolve their parents.
  const ordered = [
    ...bodies.filter((b) => b.kind !== 'moon'),
    ...bodies.filter((b) => b.kind === 'moon'),
  ];

  for (const def of ordered) {
    const isStar = def.kind === 'star';
    const isMoon = def.kind === 'moon';

    // Radius in scene units (stars get a special size; moons are much
    // smaller than planets so satellites read as satellites).
    const r = isStar
      ? scale === TRUE_SCALE
        ? (def.radiusKm / AU_TO_KM) * 1.15
        : SUN_R
      : isMoon
        ? scale.moonRadiusKm(def.radiusKm)
        : scale.bodyRadiusKm(def.radiusKm);
    // Scale-independent radii for the true-scale tour (B3): the tour blends
    // between the visible-mode and true-mode layouts live, so each body
    // needs BOTH radii (the baked mesh radius is `r`, the build scale).
    const trueRadius = isStar
      ? (def.radiusKm / AU_TO_KM) * 1.15
      : isMoon
        ? TRUE_SCALE.moonRadiusKm(def.radiusKm)
        : TRUE_SCALE.bodyRadiusKm(def.radiusKm);
    const visibleRadius = isStar
      ? SUN_R
      : isMoon
        ? VISIBLE_SCALE.moonRadiusKm(def.radiusKm)
        : VISIBLE_SCALE.bodyRadiusKm(def.radiusKm);

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
      color: 0x7fd8ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const orbitEmphasis = new THREE.Mesh(hlGeo, hlMat);
    orbitEmphasis.rotation.x = -Math.PI / 2;
    orbitEmphasis.scale.setScalar(Math.max(1e-3, r));
    orbitEmphasis.visible = false;
    pivot.add(orbitEmphasis);
    disposables.push(hlGeo, hlMat);

    // Rings.
    let ringsMesh: THREE.Mesh | null = null;
    if (def.rings) {
      const inner = r * def.rings.inner,
        outer = r * def.rings.outer;
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
      const rm = new THREE.Mesh(ringGeo, ringMat);
      rm.rotation.x = -Math.PI / 2;
      rm.castShadow = true;
      rm.receiveShadow = true;
      pivot.add(rm);
      ringsMesh = rm;
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
      const distMap = (r: number): number =>
        isMoon ? scale.moonDistance(r, def.id) : scale.planetDistance(r);
      if (def.id === 'moon') {
        // The Moon's orbit line is one revolution of its REAL Meeus ch.47
        // geocentric path (sampled once at build time; the path shape is
        // slow-moving), mapped with the same per-point distance the body
        // positions use. The line is attached to the parent pivot below,
        // which carries the same tilt rotation the body position receives
        // in updatePositions - so both share the exact transform and the
        // body stays glued to the drawn line.
        // Placeholder epoch — the frame loop resamples this line at the LIVE
        // sim time every ~250 ms (resampleMoonOrbitLine) so the drawn loop
        // always matches the Moon's real, slowly-precessing geocentric path.
        // (An earlier version baked the epoch at `5000 * (Date.now()-J2000)`,
        // sampling the path ~132,000 y in the future — the "Moon not on its
        // orbit line" bug.)
        const t0 = 0;
        const pts: THREE.Vector3[] = [];
        const radii = new Float32Array(129);
        const unitDirs = new Float32Array(129 * 3);
        for (let k = 0; k <= 128; k++) {
          const p = moonGeocentricJ2000(t0 + (k / 128) * 27.55455);
          const d = Math.hypot(p[0], p[1], p[2]); // AU (geocentric)
          const km = d * AU_KM;
          const s = eclipticToScene({ x: p[0], y: p[1], z: p[2] });
          // Same per-point factor the body uses in updatePositions
          // (moonDistance(km) / d, d in AU) so the body sits ON the line.
          // NOTE: dividing by km (not d) would collapse the line to
          // sub-pixel size (off by AU_KM) — the "missing moon orbit" bug.
          pts.push(s.clone().multiplyScalar(scale.moonDistance(km, 'moon') / Math.max(1e-9, d)));
          // True-scale tour (B3): keep the parent-distance in km (the
          // moonDistance domain) + unit direction so the line can be
          // re-projected through the blend scale without resampling.
          radii[k] = km;
          const u = s.normalize();
          unitDirs[k * 3] = u.x;
          unitDirs[k * 3 + 1] = u.y;
          unitDirs[k * 3 + 2] = u.z;
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({
          color: 0x5570a0,
          transparent: true,
          opacity: 0.45,
        });
        orbit = new THREE.Line(geo, mat);
        orbit.userData.geo = geo;
        orbit.userData.mat = mat;
        orbit.userData.radii = radii;
        orbit.userData.unitDirs = unitDirs;
        disposables.push(geo, mat);
      } else {
        orbit = makeOrbitLine(def.elements, distMap);
        if (!isMoon) {
          scene.add(orbit);
        }
        // Other moons' orbits are attached to the parent pivot after all
        // bodies exist.
      }
    }

    const parent = isMoon && def.parent ? (map.get(def.parent) ?? null) : null;
    // Framing extent: the ringed planet is framed to its OUTER ring so a
    // fly-to lands with the whole ring system in view; everything else to
    // its body diameter.
    const frameExtent = def.rings ? 2 * r * def.rings.outer : 2 * r;
    const entry: SceneBody = {
      def,
      pivot,
      mesh,
      label,
      orbit,
      orbitEmphasis,
      ringsMesh,
      parent,
      spin: 0,
      worldPos: new THREE.Vector3(),
      sceneRadius: r,
      visibleRadius,
      trueRadius,
      builtRadius: r,
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

  return {
    renderer,
    camera,
    controls,
    scene,
    bodies: map,
    belts,
    sunLight,
    starMat,
    constellations,
    userData: {},
    dispose,
  };
}

/** Constellation sky radius: just inside the procedural starfield shell. */
export const CONSTELLATION_RADIUS = 4800;

/**
 * Unit direction of a constellation's center (mean of its stars' scene-space
 * unit vectors). The dome is static and the CAMERA moves, so this direction
 * is precomputable once: per-frame highlight work is then one dot-product
 * per constellation between the camera's view axis and this (13 total).
 */
export function constellationCenter(c: Constellation): [number, number, number] {
  let x = 0,
    y = 0,
    z = 0;
  for (const s of c.stars) {
    const [sx, sy, sz] = raDecToUnit(s.raHours, s.decDeg);
    x += sx;
    y += sy;
    z += sz;
  }
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len];
}

function dot3(a: number[], b: number[]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross3(a: number[], b: number[]): [number, number, number] {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function norm3(a: number[]): [number, number, number] {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
}

export interface ConstellationLabelPose {
  /** Figure angular half-extent (radians) along its longest axis. */
  halfExtent: number;
  /**
   * Unit sky direction for the name label: `marginRad` past the centroid
   * along the figure's long axis, so the name sits BESIDE the figure (at
   * its end) rather than on top of its stars. Exact spherical offset.
   */
  labelDir: (marginRad: number) => [number, number, number];
}

/**
 * Pure geometry for placing a constellation's name beside its figure:
 * the star cloud's principal axis (direction of maximal spread in the
 * tangent plane at the centroid) + the half-extent along it. Used to size
 * the label and push it clear of the figure. Unit-tested.
 */
export function constellationLabelPose(c: Constellation): ConstellationLabelPose {
  const dir = constellationCenter(c);
  const dirs = c.stars.map((s) => raDecToUnit(s.raHours, s.decDeg));
  // Tangent basis at the centroid (any stable reference axis works).
  const ref = Math.abs(dir[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const t1 = norm3(cross3(dir, ref));
  const t2 = cross3(dir, t1);
  // 2×2 second moments of the star cloud in the tangent plane.
  let xx = 0,
    yy = 0,
    xy = 0;
  for (const d of dirs) {
    const u = dot3(d, t1);
    const v = dot3(d, t2);
    xx += u * u;
    xy += u * v;
    yy += v * v;
  }
  // Eigenvector of [[xx,xy],[xy,yy]] — the principal (long) axis.
  const theta = 0.5 * Math.atan2(2 * xy, xx - yy);
  const p1 = Math.cos(theta);
  const p2 = Math.sin(theta);
  const axis: [number, number, number] = [
    t1[0] * p1 + t2[0] * p2,
    t1[1] * p1 + t2[1] * p2,
    t1[2] * p1 + t2[2] * p2,
  ];
  // Half-extent: farthest star's projection on the long axis (≈ radians).
  let halfExtent = 0;
  for (const d of dirs) halfExtent = Math.max(halfExtent, Math.abs(dot3(d, axis)));
  return {
    halfExtent,
    labelDir: (marginRad: number): [number, number, number] => {
      const co = Math.cos(marginRad);
      const so = Math.sin(marginRad);
      return [dir[0] * co + axis[0] * so, dir[1] * co + axis[1] * so, dir[2] * co + axis[2] * so];
    },
  };
}

/**
 * View emphasis for the proximity highlight (D4): how close a constellation
 * is to the "central view", from 0 (at/behind the fade ring) to 1 (dead
 * center). `viewDir` is the camera's forward unit vector, `center` the
 * figure's precomputed unit direction. The falloff is a FIXED angular band
 * — independent of the camera's zoom — so the highlight reads the same at
 * any FOV: full emphasis within {@link CONSTELLATION_HILITE_IN_DEG} of the
 * view center, linearly fading to zero by
 * {@link CONSTELLATION_HILITE_OUT_DEG}. Pure — unit-tested in Node.
 */
export const CONSTELLATION_HILITE_IN_DEG = 15;
export const CONSTELLATION_HILITE_OUT_DEG = 40;
export function constellationEmphasis(
  center: readonly [number, number, number],
  viewDir: readonly [number, number, number],
): number {
  const dot = center[0] * viewDir[0] + center[1] * viewDir[1] + center[2] * viewDir[2];
  const d2r = Math.PI / 180;
  // Angular distance from the view axis (0 at center, 180 behind).
  const deg = Math.acos(Math.min(1, Math.max(-1, dot))) / d2r;
  if (deg <= CONSTELLATION_HILITE_IN_DEG) return 1;
  if (deg >= CONSTELLATION_HILITE_OUT_DEG) return 0;
  return (
    (CONSTELLATION_HILITE_OUT_DEG - deg) /
    (CONSTELLATION_HILITE_OUT_DEG - CONSTELLATION_HILITE_IN_DEG)
  );
}

/** Baseline line opacity when a constellation is at the view edge (D4). */
export const CONSTELLATION_BASE_OPACITY = 0.32;
/** Peak line opacity when a constellation is dead center in the view (D4). */
export const CONSTELLATION_PEAK_OPACITY = 0.95;

/**
 * Name-label geometry (plan 003 P3). The label position is a CONSTANT
 * angular gap past the figure's far edge (margin = halfExtent +
 * CONSTELLATION_LABEL_GAP_RAD) — the old 0.35 rad floor ignored figure
 * size, so compact figures (Aquila, Lyra, Aries) had their names floating
 * ~11° away while the largest figures (Leo, Scorpius) were overlapped.
 * The sprite is sized ~the figure's own angular span (floor 0.2 rad ⇒
 * ~3° tall text at the sky anchor) instead of the old 0.5 rad full width
 * (7.2° tall — a label that filled 15% of the 50° close-up FOV).
 */
export const CONSTELLATION_LABEL_GAP_RAD = 0.12; // 6.9° past the far edge
export const CONSTELLATION_LABEL_MIN_WIDTH_RAD = 0.2; // sprite floor (≈3° text)
export const CONSTELLATION_LABEL_SPAN = 0.8; // fullW as fraction of halfExtent

/** Angular FULL width (radians) of a constellation's name sprite. */
export function constellationLabelWidth(c: Constellation): number {
  return Math.max(
    CONSTELLATION_LABEL_MIN_WIDTH_RAD,
    constellationLabelPose(c).halfExtent * CONSTELLATION_LABEL_SPAN,
  );
}

/**
 * Build the decorative constellation sky: ONE `THREE.LineSegments` per
 * constellation (so each figure can fade independently in the D4 highlight),
 * the shared star-dot `THREE.Points`, and one name-label sprite per figure
 * (D3) sitting just inside the dome at the figure's center. Static dome —
 * the camera moves, the sky does not.
 */
export function buildConstellations(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'constellations';

  const dotMat = new THREE.PointsMaterial({
    color: 0xcfe0ff,
    size: 3.2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });

  const dotVerts: number[] = [];
  for (const c of CONSTELLATIONS) {
    const pos = c.stars.map((s) => {
      const [x, y, z] = raDecToUnit(s.raHours, s.decDeg);
      return [x * CONSTELLATION_RADIUS, y * CONSTELLATION_RADIUS, z * CONSTELLATION_RADIUS];
    });
    // Each figure gets its own geometry + material so the proximity
    // highlight (D4) can fade it without touching the other 12.
    const lineVerts: number[] = [];
    for (const [a, b] of c.lines) lineVerts.push(...pos[a], ...pos[b]);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8fb0ff,
      transparent: true,
      opacity: CONSTELLATION_BASE_OPACITY,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.name = `constellation-lines:${c.name}`;
    group.add(lines);

    // Name label (D3/D7, plan 003 P3): elegant lettering placed BESIDE
    // the figure — a CONSTANT angular gap past the figure's far edge along
    // its long axis, so the name hugs the figure instead of floating in
    // empty sky (the old 0.35 rad floor) or overlapping it (big figures).
    // The sprite is ~the figure's own angular span (see
    // constellationLabelWidth). depthTest off so the sky reads cleanly in
    // front of / behind planets alike.
    const pose = constellationLabelPose(c);
    const [lx, ly, lz] = pose.labelDir(pose.halfExtent + CONSTELLATION_LABEL_GAP_RAD);
    const labelTex = makeConstellationNameTexture(c.name);
    const labelMat = new THREE.SpriteMaterial({
      map: labelTex,
      depthTest: false,
      transparent: true,
      opacity: CONSTELLATION_BASE_OPACITY,
    });
    const label = new THREE.Sprite(labelMat);
    // Texture is 4:1; the sprite's world width spans the figure's angular
    // extent (so the name fits the figure) at the dome radius.
    const fullW = constellationLabelWidth(c) * (CONSTELLATION_RADIUS - 90);
    label.scale.set(fullW, fullW / 4, 1);
    label.position.set(
      lx * (CONSTELLATION_RADIUS - 90),
      ly * (CONSTELLATION_RADIUS - 90),
      lz * (CONSTELLATION_RADIUS - 90),
    );
    label.name = `constellation-label:${c.name}`;
    group.add(label);

    for (const p of pos) dotVerts.push(...p);
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotVerts, 3));
  const dots = new THREE.Points(dotGeo, dotMat);
  dots.name = 'constellation-stars';
  group.add(dots);

  // Expose for disposal.
  group.userData.dispose = () => {
    for (const child of group.children) {
      const o = child as THREE.Object3D;
      if (o instanceof THREE.LineSegments) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      } else if (o instanceof THREE.Sprite) {
        (o.material as THREE.SpriteMaterial).map?.dispose();
        o.material.dispose();
      }
    }
    dotGeo.dispose();
    dotMat.dispose();
  };
  return group;
}

/** name ("Lyra") -> constellation index, for highlight lookups by child name. */
const CONSTELLATION_NAME_INDEX = new Map(CONSTELLATIONS.map((c, i) => [c.name, i]));

/**
 * D4: fade each constellation's lines + name label by how close its center
 * is to the camera's view axis. `emphases[i]` must be the per-constellation
 * `constellationEmphasis` output (view-center proximity, 0..1). Cheap: only
 * writes a float per material. Driven from the frame loop at ~5 Hz and
 * only when the camera actually moved.
 */
export function updateConstellationHighlight(
  group: THREE.Group,
  emphases: ArrayLike<number>,
): void {
  for (const child of group.children) {
    const name = child.name ?? '';
    // Resolve the constellation index from the child's NAME rather than its
    // position in the group: labels interleave after their line meshes
    // (lines0, label0, lines1, label1, …), so a running counter would fade
    // label k with constellation k+1's emphasis — and the last label would
    // never brighten at all.
    const idx = name.startsWith('constellation-')
      ? CONSTELLATION_NAME_INDEX.get(name.slice('constellation-'.length).split(':')[1])
      : undefined;
    if (idx === undefined) continue;
    const emph = emphases[idx] ?? 0;
    const t =
      CONSTELLATION_BASE_OPACITY + (CONSTELLATION_PEAK_OPACITY - CONSTELLATION_BASE_OPACITY) * emph;
    ((child as THREE.LineSegments | THREE.Sprite).material as THREE.Material).opacity = t;
  }
}

/**
 * Advance all body positions to simulation time `tDays`.
 * Called once per frame from the animation loop.
 *
 * Allocation-free hot path: a single sorted entry list is cached per
 * `BuiltScene`, and one shared scratch vector replaces the per-body
 * `new THREE.Vector3` churn (~36/frame + belt instances).
 */
export function updatePositions(built: BuiltScene, tDays: number, scale: VisualScale): void {
  let order = built.userData.updateOrder as SceneBody[] | undefined;
  if (!order) {
    // Planets + Sun first (moons depend on parent world positions).
    order = [...built.bodies.values()].sort((a, b) => {
      const da = a.parent ? 1 : 0,
        db = b.parent ? 1 : 0;
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
      let p: Vec3;
      if (def.id === 'moon') {
        // Real ephemeris: Meeus ch.47 geocentric position (J2000 ecliptic,
        // AU), not the nominal two-body orbit. The distance display still
        // goes through the shared moon scale, fed with the true km distance.
        const m = moonGeocentricJ2000(tDays);
        p = { x: m[0], y: m[1], z: m[2] };
      } else {
        p = positionAtInto(def.elements, tDays, auScratch); // km, parent-equatorial frame
      }
      const s = eclipticToSceneInto(p, scratch);
      const d = Math.hypot(p.x, p.y, p.z);
      const km = def.id === 'moon' ? d * AU_KM : d; // Moon: AU -> km; others: already km
      const factor = scale.moonDistance(km, def.id) / Math.max(1e-9, d);
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
    updateBeltField(field, tDays, scale, scale.beltSizeFactor);
  }
}

/**
 * True-scale tour (B3): set every body's rendered size to the radius it has
 * under the blended layout at progress `p` (0 = VISIBLE_SCALE radii,
 * 1 = TRUE_SCALE radii), and keep the per-body bookkeeping
 * (`sceneRadius`, orbit highlight, label position/opacity) in sync so
 * framing + highlighting stay correct mid-morph. `p` is the tour's eased
 * "how true" value — the same value that drives `lerpScale` for positions.
 * Pure three.js, no DOM.
 *
 * The radius is blended `visibleRadius ↔ trueRadius` by `p` directly (NOT
 * scaled from the baked mesh), so the morphed size is exactly what the
 * blended scale layout dictates at every progress — including when the scene
 * was built at TRUE_SCALE (p=1 at start) and the return leg blends it back
 * down to the visible radii (p=0).
 */
export function applyScaleMorph(built: BuiltScene, p: number): void {
  for (const entry of built.bodies.values()) {
    const r = entry.visibleRadius + (entry.trueRadius - entry.visibleRadius) * p;
    const s = Math.max(1e-7, r / entry.builtRadius);
    entry.mesh.scale.setScalar(s);
    if (entry.ringsMesh) entry.ringsMesh.scale.setScalar(s);
    entry.orbitEmphasis.scale.setScalar(Math.max(1e-3, r));
    // Label floats just above the (morphing) body; its size tracks the disc
    // with the same rule the build uses (stars keep their fixed 3.4 base).
    const ls = entry.def.kind === 'star' ? 3.4 : Math.max(1.3, r * 2.4);
    entry.label.scale.set(ls, ls * 0.25, 1);
    entry.label.position.y = r + ls * 0.35;
    // Labels stay fully legible at EVERY scale. At true scale the planets
    // are sub-pixel dots and the (floor-sized) labels are the only way to
    // tell them apart, so we never fade them out here — the Labels toggle in
    // main.ts (applyToggles) is the single on/off.
    (entry.label.material as THREE.SpriteMaterial).opacity = 1;
    entry.sceneRadius = r;
  }
}

/**
 * Re-project one orbit line through an intermediate scale (true-scale tour,
 * B3). The line was built from `sampleOrbit` with each sample's radius
 * (AU for planets, km for moons — the distMap's domain) + unit scene
 * direction stored in `userData`; re-mapping every point to
 * `unitDir * distMap(r)` reproduces exactly what `makeOrbitLine` would
 * draw, so the body (whose positions use the same per-point mapping)
 * stays glued to the line at any morph progress.
 */
export function reprojectOrbitLine(
  orbit: THREE.Line,
  scale: VisualScale,
  moonId: string | null,
): void {
  const radii = orbit.userData.radii as Float32Array | undefined;
  const dirs = orbit.userData.unitDirs as Float32Array | undefined;
  const geo = orbit.userData.geo as THREE.BufferGeometry | undefined;
  if (!radii || !dirs || !geo) return;
  const pos = geo.getAttribute('position') as THREE.BufferAttribute;
  const n = radii.length;
  for (let i = 0; i < n; i++) {
    const r = radii[i];
    // Point magnitude is the MAPPED distance in scene units (no /r — the
    // stored dirs are already unit vectors, and dividing by r would shrink
    // outer orbits and grow inner ones).
    const mapped = moonId ? scale.moonDistance(r, moonId) : scale.planetDistance(r);
    pos.setXYZ(i, dirs[i * 3] * mapped, dirs[i * 3 + 1] * mapped, dirs[i * 3 + 2] * mapped);
  }
  pos.needsUpdate = true;
  geo.computeBoundingSphere();
}

/**
 * Resample the Moon's geocentric orbit line at the CURRENT simulation time so
 * the drawn loop always matches the Moon's real path. The Meeus ch.47 orbit
 * is not a fixed ellipse — its node line regresses (~18.6 y) and its apse
 * precesses (~8.85 y) — so a line sampled once at build time drifts off the
 * Moon as the user scrubs time (the "Moon not following its orbit line" bug).
 * The k=0 vertex is the Moon's live position, so it sits exactly on the line.
 *
 * In-place: writes into the line's existing position attribute and its stored
 * per-sample km radii / unit dirs (no geometry allocation), then re-projects
 * through `scale` so it stays glued mid-tour too.
 */
export function resampleMoonOrbitLine(orbit: THREE.Line, tDays: number, scale: VisualScale): void {
  const radii = orbit.userData.radii as Float32Array | undefined;
  const dirs = orbit.userData.unitDirs as Float32Array | undefined;
  const geo = orbit.userData.geo as THREE.BufferGeometry | undefined;
  if (!radii || !dirs || !geo) return;
  const pos = geo.getAttribute('position') as THREE.BufferAttribute;
  const period = 27.55455; // sidereal month, days
  for (let k = 0; k <= 128; k++) {
    const p = moonGeocentricJ2000(tDays + (k / 128) * period);
    const d = Math.hypot(p[0], p[1], p[2]); // AU (geocentric)
    const km = d * AU_KM;
    const s = eclipticToScene({ x: p[0], y: p[1], z: p[2] });
    const u = s.normalize();
    // Same per-point factor the body uses in updatePositions
    // (moonDistance(km) / d, d in AU) so the Moon sits ON the line.
    radii[k] = km;
    dirs[k * 3] = u.x;
    dirs[k * 3 + 1] = u.y;
    dirs[k * 3 + 2] = u.z;
    const mapped = scale.moonDistance(km, 'moon');
    pos.setXYZ(k, u.x * mapped, u.y * mapped, u.z * mapped);
  }
  pos.needsUpdate = true;
  geo.computeBoundingSphere();
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
export function updateSatelliteHighlight(built: BuiltScene, id: string, tSeconds: number): void {
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
