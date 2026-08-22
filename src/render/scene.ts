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
import {
  makeSurfaceTexture,
  makeLabelTexture,
  makeConstellationNameTexture,
  layoutConstellationName,
  CONSTELLATION_NAME_CANVAS_W,
} from './textures';
import { BELTS } from '../data/belts';
import { MOONS } from '../data/bodies';
import { buildBeltField, updateBeltField, type BeltField } from './belts';
import { CONSTELLATIONS, raDecToUnit, type Constellation } from '../data/constellations';
import { FIGURE_FITS, figurePlacement, unitToRaDec } from '../data/figures';
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
  /** Classic figure plates (plan 007); hidden until the Figures toggle. */
  constellationFigures: THREE.Group;
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
    size: 1.3,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.55,
  });
  scene.add(new THREE.Points(starGeo, starMat));

  // Constellation figure lines + named-star markers on the celestial sphere.
  const constellations = buildConstellations();
  scene.add(constellations);

  // Classic figure plates (plan 007): hidden until the Figures toggle.
  const constellationFigures = buildConstellationFigures();
  scene.add(constellationFigures);

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
    for (const child of constellationFigures.children) {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.MeshBasicMaterial).dispose();
      // Plate textures stay in the shared FIGURE_TEX_CACHE for rebuilds.
    }
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
    constellationFigures,
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
 * per constellation between the camera's view axis and this (88 total).
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
  /**
   * Figure angular half-extent (radians) along its long axis. After the
   * label-side flip below, the FAR TIP of the figure lies on the label side
   * (max signed projection on `axis` equals `halfExtent`), so "past the far
   * edge" means exactly `halfExtent` past the centroid.
   */
  halfExtent: number;
  /**
   * The (possibly sign-flipped) principal axis: the label side (+axis)
   * always carries the figure's far tip, so `halfExtent` is the distance to
   * the figure's far edge along this direction. Exposed for the
   * "name goes past the REAL far edge" invariant (plan 004 Q1).
   */
  axis: [number, number, number];
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
  let axis: [number, number, number] = [
    t1[0] * p1 + t2[0] * p2,
    t1[1] * p1 + t2[1] * p2,
    t1[2] * p1 + t2[2] * p2,
  ];
  // SIGNED extents: the eigenvector's sign is arbitrary, but the label side
  // (the +axis direction) must carry the figure's FAR TIP — otherwise the
  // name is pushed past the near edge and floats away from the figure
  // (plan 004 Q1: 5 of 13 figures were on the phantom side, Cygnus worst).
  let extPlus = 0;
  let extMinus = 0;
  for (const d of dirs) {
    const p = dot3(d, axis);
    if (p > extPlus) extPlus = p;
    if (-p > extMinus) extMinus = -p;
  }
  if (extMinus > extPlus) {
    axis = [-axis[0], -axis[1], -axis[2]];
  }
  // Half-extent = the far tip's projection (≈ radians); after the flip the
  // label side is the far side, so `halfExtent` IS the distance to the
  // figure's far edge.
  const halfExtent = Math.max(extPlus, extMinus);
  return {
    halfExtent,
    axis,
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
export const CONSTELLATION_HILITE_IN_DEG = 22;
export const CONSTELLATION_HILITE_OUT_DEG = 48;
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
export const CONSTELLATION_BASE_OPACITY = 0.28;
/** Peak line opacity when a constellation is dead center in the view (D4). */
export const CONSTELLATION_PEAK_OPACITY = 1.0;
/**
 * Name-label opacity curve (plan 006): labels get their OWN, steeper fade
 * than the lines — peripheral names drop to ~invisible (they clutter the
 * 120° sky view) while center names reach full opacity, so the view center
 * reads clearly against the dimmed background starfield.
 */
export const CONSTELLATION_LABEL_BASE_OPACITY = 0.05;
export const CONSTELLATION_LABEL_PEAK_OPACITY = 1.0;
export const CONSTELLATION_LABEL_GAMMA = 0.75;
/** Label opacity (0..1) at a given view emphasis — pure, unit-tested. */
export function constellationLabelOpacity(emph: number): number {
  return (
    CONSTELLATION_LABEL_BASE_OPACITY +
    (CONSTELLATION_LABEL_PEAK_OPACITY - CONSTELLATION_LABEL_BASE_OPACITY) *
      Math.pow(emph, CONSTELLATION_LABEL_GAMMA)
  );
}

/**
 * Name-label geometry (plan 003 P3, re-anchored plan 004 Q1, re-sized +
 * de-cluttered in plan 006). The distance is defined from what the USER
 * SEES — the ink's near edge, not an invisible sprite-padding edge:
 *
 * - the label BLOCK (sprite) center sits at `constellationLabelMargin(c)` =
 *   `halfExtent + EDGE_GAP + inkRad/2` (× the solver's marginScale), where
 *   `halfExtent` is the figure's far tip on the label side (the pose flips
 *   the principal axis to carry the far tip);
 * - so the INK's near edge lands exactly `CONSTELLATION_LABEL_EDGE_GAP_RAD`
 *   (~2°) past the figure's far tip.
 *
 * Plan 006: text size is now a CONSTANT angular cap height per tier (the
 * old span-following size made Hydra's name ~13× taller than Canis
 * Minor's), and the SIDE + margin of every label come from
 * {@link resolveConstellationLabels} — a static solver that keeps the 88
 * names from overlapping in crowded bands (winter sky: Orion/Taurus/
 * Auriga/Gemini/Cetus all at once).
 */
export const CONSTELLATION_LABEL_EDGE_GAP_RAD = 0.035; // ~2° from tip to ink edge

/**
 * Constellation text sizing (plan 006): every name has a CONSTANT angular
 * cap height — only TWO tiers, so the difference reads as deliberate
 * hierarchy (major vs. minor figures), not noise. Sprite width is derived
 * from the 4:1 canvas: the canvas holds `512/s` cap heights (128 px tall,
 * font s px caps), so the full block is `H × 512/s` wide.
 */
export const CONSTELLATION_LABEL_HEIGHT_RAD = 0.016; // major tier, ~0.9° cap height
export const CONSTELLATION_LABEL_MINOR_HEIGHT_RAD = 0.011; // minor tier, ~0.6°
export const CONSTELLATION_LABEL_MINOR_MAX_SPAN_RAD = 0.018; // ≤~1° figure → minor tier
/** Cap height (radians) of a constellation's name label — constant per tier. */
export function constellationLabelHeightRad(c: Constellation): number {
  return constellationLabelPose(c).halfExtent <= CONSTELLATION_LABEL_MINOR_MAX_SPAN_RAD
    ? CONSTELLATION_LABEL_MINOR_HEIGHT_RAD
    : CONSTELLATION_LABEL_HEIGHT_RAD;
}
/** Angular FULL width (radians) of a constellation's name sprite (4:1 block). */
export function constellationLabelWidth(c: Constellation): number {
  const h = constellationLabelHeightRad(c);
  const s = layoutConstellationName(c.name).fontSize;
  return h * (CONSTELLATION_NAME_CANVAS_W / s);
}

/**
 * Angular width (radians) of the ACTUAL letter ink: the ink's fraction of
 * the 512 px canvas × the sprite's angular width (the name is centered in
 * the canvas, so the ink spans the same FRACTION of the sprite as it does
 * of the texture). This is the width the eye sees — the placement math must
 * use it, not the sprite block (its padding differs per name length).
 */
export function constellationLabelInkWidthRad(c: Constellation): number {
  const ink = layoutConstellationName(c.name).inkWidthPx / CONSTELLATION_NAME_CANVAS_W;
  return ink * constellationLabelWidth(c);
}

/**
 * Label block-center margin (radians past the figure center): far tip +
 * constant edge gap + half the ink, so the visible lettering sits a
 * constant `CONSTELLATION_LABEL_EDGE_GAP_RAD` past the figure's far edge
 * for every name.
 */
export function constellationLabelMargin(c: Constellation): number {
  return (
    constellationLabelPose(c).halfExtent +
    CONSTELLATION_LABEL_EDGE_GAP_RAD +
    constellationLabelInkWidthRad(c) / 2
  );
}

/** One resolved label placement (plan 006 solver output). */
export interface ConstellationLabelPlacement {
  /** Pose-axis side used: +1 = far-tip side (default), −1 = near side. */
  side: 1 | -1;
  /** Multiplier on the default margin (1.0 or 1.5). */
  marginScale: number;
  /** Final unit direction of the label block center (scene frame). */
  dir: [number, number, number];
  /** Angular half-extents of the INK (overlap math uses ink, not padding). */
  inkHalf: number;
  /** Angular half-height of the name (tier cap height / 2 + a hair). */
  halfH: number;
  /** Angular distance of the label from the figure centroid (diagnostics). */
  offset: number;
}

/** Margin multipliers the solver may apply (default, pushed back ~50%). */
const LABEL_MARGIN_SCALES = [1.0, 1.5];
/** Side candidates: far-tip side first (default), then the near side. */
const LABEL_SIDE_CANDIDATES: Array<1 | -1> = [1, -1];
/** Extra clearance (radians) added around ink when measuring overlap. */
const LABEL_OVERLAP_PAD_RAD = 0.004;
/** Cost of taking the ×1.5 margin — a nudge, not a ban (crowded sky). */
const LABEL_FAR_MARGIN_COST = 0.25;

/**
 * Static anti-overlap solver for the 88 name labels (plan 006). The sky is
 * fixed, so this runs ONCE at build: each constellation gets a small
 * candidate set {side ±1} × {marginScale 1.0/1.5}; constellations are
 * placed greedily, BIGGEST FIGURES FIRST (their names have priority — the
 * small ones detour), and each picks the candidate minimizing the sum of
 * ellipse-overlap penalties against already-placed neighbors (labels
 * approximated as tangent-plane ellipses at the pair midpoint) plus a small
 * cost for the pushed-back margin. Pure and deterministic — unit-tested,
 * including a full-sky "no two of the 88 overlap" assertion.
 */
export function resolveConstellationLabels(list: Constellation[]): ConstellationLabelPlacement[] {
  const items = list.map((c, i) => {
    const pose = constellationLabelPose(c);
    const dir = constellationCenter(c);
    return {
      i,
      pose,
      dir,
      margin0: constellationLabelMargin(c),
      inkHalf: constellationLabelInkWidthRad(c) / 2,
      halfH: constellationLabelHeightRad(c) / 2 + LABEL_OVERLAP_PAD_RAD / 2,
    };
  });
  // Deterministic order: big figures first, name as tie-break.
  const order = items
    .map((it) => it.i)
    .sort((a, b) => {
      const d = items[b].pose.halfExtent - items[a].pose.halfExtent;
      return d !== 0 ? d : list[a].name.localeCompare(list[b].name);
    });

  const result: Array<ConstellationLabelPlacement | null> = new Array(list.length).fill(null);

  for (const i of order) {
    const it = items[i];
    let best: {
      score: number;
      side: 1 | -1;
      marginScale: number;
      dir: [number, number, number];
      offset: number;
    } | null = null;

    for (const side of LABEL_SIDE_CANDIDATES) {
      for (const marginScale of LABEL_MARGIN_SCALES) {
        const m = it.margin0 * marginScale;
        // Spherical offset from the centroid along ± the pose axis.
        const co = Math.cos(m);
        const so = side * Math.sin(m);
        const dir: [number, number, number] = [
          it.dir[0] * co + it.pose.axis[0] * so,
          it.dir[1] * co + it.pose.axis[1] * so,
          it.dir[2] * co + it.pose.axis[2] * so,
        ];
        let score = LABEL_FAR_MARGIN_COST * (marginScale - 1);
        for (const j of order) {
          const other = result[j];
          if (!other) continue;
          score += labelOverlapPenalty(it, dir, other);
        }
        if (!best || score < best.score) {
          best = {
            score,
            side,
            marginScale,
            dir,
            offset: m, // |angular offset| — the offset is exactly m by construction
          };
        }
      }
    }
    const b = best!;
    result[i] = {
      side: b.side,
      marginScale: b.marginScale,
      dir: b.dir,
      inkHalf: it.inkHalf + LABEL_OVERLAP_PAD_RAD / 2,
      halfH: it.halfH,
      offset: b.offset,
    };
  }
  return result as ConstellationLabelPlacement[];
}

/**
 * Ellipse overlap penalty between a candidate label (inkHalf/halfH around
 * `dir`) and an already-placed one: project both centers onto the tangent
 * plane at their midpoint and test the combined ellipse (conservative —
 * the per-label frames are only slightly rotated at these separations).
 * Returns 0 when clear, the (1 − normalized distance²) shortfall when not.
 */
function labelOverlapPenalty(
  it: { inkHalf: number; halfH: number },
  dir: [number, number, number],
  other: ConstellationLabelPlacement,
): number {
  const ox = it.inkHalf + other.inkHalf;
  const oy = it.halfH + other.halfH;
  // Midpoint tangent frame (fallback if the dirs are ~antipodal — they
  // never are in practice: labels stay within ~90° of their centroids).
  let mx = dir[0] + other.dir[0],
    my = dir[1] + other.dir[1],
    mz = dir[2] + other.dir[2];
  const ml = Math.hypot(mx, my, mz);
  if (ml < 1e-6) return 0;
  mx /= ml;
  my /= ml;
  mz /= ml;
  let ux = my * dir[2] - mz * dir[1],
    uy = mz * dir[0] - mx * dir[2],
    uz = mx * dir[1] - my * dir[0];
  const ul = Math.hypot(ux, uy, uz);
  if (ul < 1e-6) return 0;
  ux /= ul;
  uy /= ul;
  uz /= ul;
  const vx = my * uz - mz * uy,
    vy = mz * ux - mx * uz,
    vz = mx * uy - my * ux;
  const ax = ux * dir[0] + uy * dir[1] + uz * dir[2],
    ay = vx * dir[0] + vy * dir[1] + vz * dir[2];
  const bx = ux * other.dir[0] + uy * other.dir[1] + uz * other.dir[2],
    by = vx * other.dir[0] + vy * other.dir[1] + vz * other.dir[2];
  const nx = (ax - bx) / ox;
  const ny = (ay - by) / oy;
  const d2 = nx * nx + ny * ny;
  return d2 < 1 ? 1 - d2 : 0;
}

/**
 * Camera-distance presence for the constellation sky (plan 003 P4,
 * re-centered plan 004 Q2). The sky is a full-sphere wraparound, so when the
 * camera is CLOSE to a body (a planet close-up) the constellations sweep
 * across the whole frame behind the planet and dominate the view. Instead of
 * a constant multiplier the sky's opacity gets a MULTIPLICATIVE presence
 * factor: 0.5× close-up → 1.0× exactly at the Sky anchor (measured 2756 for
 * the 2026-08-21 data — frameConstellations(4800, 102.8, 50°); the camera
 * eases to a 120° FOV there, and the sky tour holds that radius). Because
 * FAR is so far out, every close-up and overview view (default camera 34,
 * System anchor 232) sits within a hair of the floor — plan 003's 0.25×
 * read as "almost not there anymore" (user, 2026-08-21), so the floor moved
 * to 0.5: the middle between the old over-presence (≈1.0) and the 0.25
 * floor. Never 0:
 * the sky stays visible in close-ups so the stars don't blink out, and the
 * smoothstep transition is symmetric — zoom in to fade it, zoom out to
 * restore it.
 */
export const CONSTELLATION_PRESENCE_NEAR = 2.0;
export const CONSTELLATION_PRESENCE_FAR = 2756.0;
export const CONSTELLATION_PRESENCE_FLOOR = 0.5;

/** Multiplicative opacity factor (0.5..1) for the constellation sky at the given camera distance. */
export function constellationPresence(cameraDist: number): number {
  if (cameraDist <= CONSTELLATION_PRESENCE_NEAR) return CONSTELLATION_PRESENCE_FLOOR;
  if (cameraDist >= CONSTELLATION_PRESENCE_FAR) return 1;
  const t =
    (cameraDist - CONSTELLATION_PRESENCE_NEAR) /
    (CONSTELLATION_PRESENCE_FAR - CONSTELLATION_PRESENCE_NEAR);
  return CONSTELLATION_PRESENCE_FLOOR + (1 - CONSTELLATION_PRESENCE_FLOOR) * t * t * (3 - 2 * t);
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

  // Plan 006: resolve every label's side/margin/direction ONCE so the 88
  // names never overlap (shared deterministic solver, same order as the
  // input list).
  const placements = resolveConstellationLabels(CONSTELLATIONS);

  const dotVerts: number[] = [];
  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    const c = CONSTELLATIONS[i];
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

    // Name label (D3/D7, plan 003 P3, re-anchored plan 004 Q1, plan 006):
    // elegant lettering BESIDE the figure with a CONSTANT visible gap
    // (CONSTELLATION_LABEL_EDGE_GAP_RAD, ~2°) from the figure's FAR TIP to
    // the ink's near edge — the margin includes half the actual letter ink,
    // so every name reads at the same distance from its figure. The SIDE +
    // margin come from the static anti-overlap solver (plan 006) and the
    // letter size is a constant per-tier cap height (see
    // constellationLabelHeightRad). depthTest off so the sky reads cleanly
    // in front of / behind planets alike.
    const placement = placements[i];
    const labelTex = makeConstellationNameTexture(c.name);
    const labelMat = new THREE.SpriteMaterial({
      map: labelTex,
      depthTest: false,
      transparent: true,
      opacity: CONSTELLATION_LABEL_BASE_OPACITY,
    });
    const label = new THREE.Sprite(labelMat);
    // Texture is 4:1; the width = constant cap height × canvas/font ratio
    // (see constellationLabelWidth) so the LETTER size never varies per
    // name — only the number of letters does.
    const fullW = constellationLabelWidth(c) * (CONSTELLATION_RADIUS - 90);
    label.scale.set(fullW, fullW / 4, 1);
    label.position.set(
      placement.dir[0] * (CONSTELLATION_RADIUS - 90),
      placement.dir[1] * (CONSTELLATION_RADIUS - 90),
      placement.dir[2] * (CONSTELLATION_RADIUS - 90),
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
 * Decoded-figure-texture cache: one THREE.Texture per plate URL for the
 * page's lifetime, so scene rebuilds (scale toggles) reuse the same
 * texture instead of re-fetching/re-decoding (same contract as the
 * real-texture cache in render/realTextures.ts).
 */
const FIGURE_TEX_CACHE = new Map<string, THREE.Texture>();

/** URL for a constellation's figure plate (served from Vite's `public/`). */
export function figureTextureUrl(name: string): string {
  return `constellation-figures/${name.toLowerCase().replace(/\s+/g, '_')}.png`;
}

/**
 * Build the classic constellation figure plates (plan 007): one
 * transparent, depth-tested plane per fitted constellation, lying on the
 * sky dome's tangent plane at the figure's centroid. RA-anchored — the
 * plate is a flat patch of sky, so it stays registered with the star
 * lines while the camera moves (no billboard snapping).
 *
 * The group is HIDDEN by default; main.ts shows it with the "Figures"
 * toggle and drives per-plate opacity through
 * `updateConstellationFigureHighlights` (mirrors the D4 emphasis + Q2
 * presence curves, capped so the plate stays a soft underlay).
 */
export function buildConstellationFigures(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'constellation-figures';
  group.visible = false;

  const loader = new THREE.TextureLoader();
  for (const fit of FIGURE_FITS) {
    const c = CONSTELLATIONS.find((cc) => cc.name === fit.constellation);
    if (!c) continue;

    // Load (cached) the plate; decode happens in the browser — the cache
    // keeps rebuilds from re-fetching.
    let tex = FIGURE_TEX_CACHE.get(fit.constellation);
    if (!tex) {
      tex = loader.load(figureTextureUrl(fit.constellation));
      FIGURE_TEX_CACHE.set(fit.constellation, tex);
    }
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;

    // Anchor direction = mean of the stars' unit directions, shifted by the
    // fit's optional RA/Dec offset (moves the art onto the figure's body
    // rather than the mean star position — 1801 art is loose, not
    // star-anchored, so the centroid alone misses the drawing).
    let ax = 0,
      ay = 0,
      az = 0;
    for (const s of c.stars) {
      const [x, y, z] = raDecToUnit(s.raHours, s.decDeg);
      ax += x;
      ay += y;
      az += z;
    }
    const m = Math.hypot(ax, ay, az) || 1;
    const centroid: [number, number, number] = [ax / m, ay / m, az / m];
    let placement: ReturnType<typeof figurePlacement>;
    if (fit.offsetRAHours || fit.offsetDecDeg) {
      const [raH, decD] = unitToRaDec(centroid);
      const shifted = raDecToUnit(raH + (fit.offsetRAHours ?? 0), decD + (fit.offsetDecDeg ?? 0));
      const sm = Math.hypot(shifted[0], shifted[1], shifted[2]) || 1;
      placement = figurePlacement(fit, [shifted[0] / sm, shifted[1] / sm, shifted[2] / sm]);
    } else {
      placement = figurePlacement(fit, centroid);
    }

    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    // Just inside the dome (labels sit at RADIUS-90; plates slightly further
    // out so the lines read in front of the plate).
    const r = CONSTELLATION_RADIUS * 0.998;
    mesh.position.set(
      placement.position[0] * r,
      placement.position[1] * r,
      placement.position[2] * r,
    );
    // +Z outward (lookAt the origin from outside), image-up along the
    // north-pole projection, then the per-plate in-plane rotation.
    mesh.up.set(placement.upHint[0], placement.upHint[1], placement.upHint[2]);
    mesh.lookAt(0, 0, 0);
    mesh.rotateZ(placement.rotationRad);
    mesh.scale.set(
      placement.planeSize[0] * CONSTELLATION_RADIUS,
      placement.planeSize[1] * CONSTELLATION_RADIUS,
      1,
    );
    mesh.name = `constellation-figure:${fit.constellation}`;
    group.add(mesh);
  }
  return group;
}

/**
 * Per-frame opacity for the figure plates: each plate breathes with its
 * constellation's D4 emphasis (view-center proximity) and the Q2
 * camera-presence floor, so the art brightens when the figure is centered
 * and recedes in close-ups. The cap keeps the plates a SOFT UNDERLAY —
 * the star lines and name labels stay primary (plan 007).
 */
export function updateConstellationFigureHighlights(
  group: THREE.Group,
  emphases: ArrayLike<number>,
  presence: number,
): void {
  for (const child of group.children) {
    const name = child.name ?? '';
    if (!name.startsWith('constellation-figure:')) continue;
    const idx = CONSTELLATION_NAME_INDEX.get(name.slice('constellation-figure:'.length));
    if (idx === undefined) continue;
    const emph = emphases[idx] ?? 0;
    // Plate opacity follows the LABEL curve (steeper, 0.28 base → 1.0
    // peak) but capped at 0.85 so the art never outshines the lines.
    // Opacity-only (no per-plate visible toggling): fading is smooth,
    // the group's own visibility is the toggle's job.
    const t = Math.min(0.85, constellationLabelOpacity(emph)) * presence;
    (child as THREE.Mesh).visible = t > 0.005;
    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = t;
  }
}

/**
 * D4: fade each constellation's lines + name label by how close its center
 * is to the camera's view axis. `emphases[i]` must be the per-constellation
 * `constellationEmphasis` output (view-center proximity, 0..1). Cheap: only
 * writes a float per material. Driven from the frame loop at ~5 Hz and
 * only when the camera actually moved.
 *
 * `presence` (plan 003 P4) multiplies everything — lines, name labels AND
 * the shared star dots — so the whole sky fades together when the camera
 * is close to a body and returns at sky-view distances (default 1).
 */
export function updateConstellationHighlight(
  group: THREE.Group,
  emphases: ArrayLike<number>,
  presence: number = 1,
): void {
  for (const child of group.children) {
    const name = child.name ?? '';
    if (name === 'constellation-stars') {
      // Shared star dots fade with the whole sky (plan 003 P4).
      ((child as THREE.Points).material as THREE.Material).opacity = presence;
      continue;
    }
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
      child instanceof THREE.Sprite
        ? constellationLabelOpacity(emph)
        : CONSTELLATION_BASE_OPACITY +
          (CONSTELLATION_PEAK_OPACITY - CONSTELLATION_BASE_OPACITY) * emph;
    ((child as THREE.LineSegments | THREE.Sprite).material as THREE.Material).opacity =
      t * presence;
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
