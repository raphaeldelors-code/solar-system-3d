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
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import type { BodyDefinition, OrbitalElements } from '../sim/types';
import { positionAtInto, sampleOrbit, type Vec3 } from '../sim/kepler';
import { moonGeocentricJ2000 } from '../sim/moon';
import { propagateEcliptic, ISS_ORBIT_PERIOD_DAYS, type Satellite } from '../sim/sgp4';
import { AU_KM } from '../sim/types';
import {
  makeSurfaceTexture,
  makeLabelTexture,
  layoutConstellationName,
  CONSTELLATION_NAME_CANVAS_W,
} from './textures';
import { BELTS } from '../data/belts';
import { MOONS } from '../data/bodies';
import { buildBeltField, updateBeltField, applyBeltLod, type BeltField } from './belts';
import { scaledBeltCount, QUALITY_PROFILES, type QualityTier } from './quality';
import { CONSTELLATIONS, raDecToUnit, type Constellation } from '../data/constellations';
import { FIGURE_FITS, figurePlacement } from '../data/figures';
import { SUN_SHADOWS, configureSunShadows, setBodyShadowFlags } from './shadows';
import {
  SUN_R,
  planetRadiusKm,
  dwarfRadiusKm,
  moonRadiusKm,
  smallRadiusKm,
  planetDistance,
  moonDistance,
  baseMoonDistance,
  followDistanceKm,
} from './visibleScale';
import {
  buildPostStack,
  buildSunGlow,
  buildSunShaderMaterial,
  type PostStack,
  type SunShader,
} from './post';
import { buildSkybox, type Skybox } from './skybox';
import { atmosphereConfigFor, buildShell, type AtmosphereShell } from './atmosphere';
import { makeAurora, type Aurora } from './aurora';
import { makeRingTexture, remapRingUVRadial } from './rings';

export const AU = 1; // 1 scene unit per AU
const AU_TO_KM = 1.495978707e8;

/**
 * Ring-band textures (plan 035 F4), cached per body id so rebuilds (scale
 * tour, dev reload) reuse the CanvasTexture instead of re-baking.
 */
const RING_TEX_CACHE = new Map<string, THREE.Texture>();
function ringTextureFor(id: string, color: [number, number, number]): THREE.Texture {
  let t = RING_TEX_CACHE.get(id);
  if (!t) {
    // Pass the body id so Saturn gets the real data-driven ring profile
    // (plan 044 A4); other ringed bodies use the simple procedural profile.
    t = makeRingTexture(color, id);
    RING_TEX_CACHE.set(id, t);
  }
  return t;
}

export interface VisualScale {
  /** Scene radius for a planet (non-star, non-dwarf, non-moon) body of given km radius. */
  bodyRadiusKm: (km: number) => number;
  /**
   * Scene radius for a dwarf planet of given km radius (plan 038).
   * `VISIBLE_SCALE` compresses dwarfs below the planets; `TRUE_SCALE` keeps
   * them physical, so dwarfs morph correctly during the true-scale tour.
   */
  dwarfRadiusKm: (km: number) => number;
  /** Scene radius for a moon of given km radius (much smaller than planets). */
  moonRadiusKm: (km: number) => number;
  /**
   * Scene radius for a named small body (asteroid/comet, plan 044 B7).
   * `VISIBLE_SCALE` gives them a small dot floor (below the dwarf tier);
   * `TRUE_SCALE` keeps them physical so the true-scale tour morphs them.
   */
  smallRadiusKm: (km: number) => number;
  /** Scene distance multiplier applied to heliocentric AU positions. */
  planetDistance: (au: number) => number;
  /**
   * Scene distance of a moon at real distance `km` from its parent.
   * `moonId` is the moon's own id (per-moon clamp lookup in visible mode);
   * `TRUE_SCALE` ignores it.
   */
  moonDistance: (km: number, moonId?: string) => number;
  /**
   * Suggested camera distance when following a body of this km radius.
   * `dwarf` selects the dwarf tier (plan 038) so a dwarf's follow frame
   * matches its smaller disc; ignored by `TRUE_SCALE`.
   */
  followDistanceKm: (km: number, dwarf?: boolean, small?: boolean) => number;
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
  dwarfRadiusKm,
  moonRadiusKm,
  smallRadiusKm,
  planetDistance,
  moonDistance: (km, moonId) => (moonId ? moonDistance(moonId, km) : null) ?? baseMoonDistance(km),
  followDistanceKm,
  beltSizeFactor: 1,
};

/** True physical scale (distances and sizes to the same ratio). */
export const TRUE_SCALE: VisualScale = {
  bodyRadiusKm: (km) => (km / AU_TO_KM) * AU,
  dwarfRadiusKm: (km) => (km / AU_TO_KM) * AU,
  moonRadiusKm: (km) => (km / AU_TO_KM) * AU,
  smallRadiusKm: (km) => (km / AU_TO_KM) * AU,
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
    dwarfRadiusKm: (km) => L(from.dwarfRadiusKm(km), to.dwarfRadiusKm(km)),
    moonRadiusKm: (km) => L(from.moonRadiusKm(km), to.moonRadiusKm(km)),
    smallRadiusKm: (km) => L(from.smallRadiusKm(km), to.smallRadiusKm(km)),
    planetDistance: (au) => L(from.planetDistance(au), to.planetDistance(au)),
    moonDistance: (km, moonId) => L(from.moonDistance(km, moonId), to.moonDistance(km, moonId)),
    followDistanceKm: (km, dwarf, small) =>
      L(from.followDistanceKm(km, dwarf, small), to.followDistanceKm(km, dwarf, small)),
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
   * Fresnel atmosphere shell (Earth/Venus/etc, plan 035 F4), a child of the
   * pivot. Scaled with the body in the true-scale tour (mirrors `ringsMesh`).
   */
  atmosphereMesh: import('./atmosphere').AtmosphereShell | null;
  /**
   * Aurora band (Earth only, plan 044 B5), a child of the pivot. Driven by the
   * live NOAA Kp index; null for every body except Earth.
   */
  aurora: import('./aurora').Aurora | null;
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
   * Animated cloud shell (Earth only, plan 035 F3): a transparent sphere
   * that rotates ~5 % of the surface spin rate ("living Earth"). Created
   * lazily by `attachRealTextures` when a real cloud map loads; null until
   * then and for every non-cloud body.
   */
  cloudsMesh: THREE.Mesh | null;
  /**
   * Full width (scene units) to frame when the camera flies to this body:
   * the diameter for a plain body, or the ring's OUTER diameter for a
   * ringed planet, so a fly-to lands with the whole body + rings in view.
   */
  frameExtent: number;
  /**
   * SGP4 satellite record (ISS only, plan 044 B1): set by `setIssSatellite`
   * once a TLE is loaded. When present, `updatePositions` drives this body's
   * position from SGP4 propagation instead of the mean-element ephemeris, and
   * the orbit line is resampled from the live satellite. Null for every other
   * body and for the ISS until a TLE loads (the ISS is hidden until then).
   */
  satellite: Satellite | null;
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
  /** Deep-sky background group (plan 035 F2): Milky-Way skybox + stars + zodiacal. */
  skybox: Skybox;
  /** Constellation figure lines + named-star markers (decorative sky). */
  constellations: THREE.Group;
  /** Classic figure plates (plan 007); hidden until the Figures toggle. */
  constellationFigures: THREE.Group;
  /** HDR→bloom→SMAA→Output post stack (plan 035 F1). `null` on the low
   *  quality tier (D6) — the frame loop then renders directly to the canvas. */
  post: PostStack | null;
  /** Sun corona sprite (plan 035 F1); positioned at the sun, ~10× its radius. */
  sunGlow: THREE.Sprite;
  /** Animated sun-surface shader (plan 044 A1); setTime() per frame. */
  sunShader: SunShader;
  /**
   * Aurora band (plan 044 B5), Earth only. setKp() feeds the live NOAA Kp;
   * setTime() advances the curtain animation per frame.
   */
  aurora: import('./aurora').Aurora | null;
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
  quality: QualityTier = 'high',
): BuiltScene {
  const profile = QUALITY_PROFILES[quality];
  const renderer = new THREE.WebGLRenderer({
    canvas,
    // Keep canvas MSAA on: the default path renders through the EffectComposer
    // (whose RT uses SMAA), but the `?post=0` fallback renders DIRECTLY to this
    // canvas, where MSAA is the only AA. Both paths stay smooth.
    antialias: true,
    // Keep the frame buffer alive after present so canvas.toBlob() in
    // main.ts can export a PNG screenshot of the current view.
    preserveDrawingBuffer: true,
  });
  // D6: the quality tier caps the pixel ratio (DPR 2 → 1 on low-tier devices)
  // so fill-rate + composer RT size stay bounded on weak GPUs.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.pixelRatioCap));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Shadows: Sun point light casts shadow-cube maps so moons/planets
  // eclipse each other (Moon on Earth, Io on Jupiter, rings on Saturn).
  // D6: the low tier disables the whole shadow pass (the heaviest single GPU
  // cost — a 6-face 2048² cube map re-rendered every frame).
  renderer.shadowMap.enabled = profile.shadows;
  if (profile.shadows) renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000005);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.0005,
    20000,
  );
  camera.position.set(0, 16, 30);
  // The camera must be a scene child for camera-attached overlays (the sun
  // lens-flare group, plan 044 A3) to render. OrbitControls repositions the
  // camera object in place, so adding it to the scene is safe and has no
  // effect on the orbit/zoom behaviour.
  scene.add(camera);

  // OrbitControls (restored by plan 021 — the plan-015 "360° trackball" and
  // plan-017 Z-roll were reverted: they made the view roll up / cross poles
  // and fought the flight+framing code). Orbit keeps camera.up = +Y and
  // clamps the polar angle to [0, π] — rotation stops at the poles and
  // never rolls, which is the stable feel the user wants back.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  // The ONE thing kept from the plan-015 era (plan 017 F3): free-view PANNING
  // is off. The view centre is the selection, always — panning (right-drag /
  // 2-finger / A-S-D keys) used to drift it off. enablePan=false kills every
  // pan path; 2-finger PINCH still dollies (zoom) — Orbit's pinch handler
  // runs its zoom part independently of enablePan.
  controls.enablePan = false;

  // Lighting: Sun point light at origin + faint ambient.
  const sunLight = new THREE.PointLight(0xfff2d8, 3.5, 0, 0);
  configureSunShadows(sunLight, SUN_SHADOWS.far);
  scene.add(sunLight);
  scene.add(new THREE.AmbientLight(0x223044, 0.4));

  // Deep sky (plan 035 F2): real Milky-Way equirect skybox + colored
  // near-starfield + zodiacal light, replacing the old 4000-point
  // monochrome shell. One group, a few draw calls total.
  const skybox = buildSkybox(new THREE.TextureLoader(), 'textures/milkyway_equirect.png');
  // Track pixel ratio so the per-point star size stays constant in CSS px.
  skybox.group.traverse((o) => {
    if (o instanceof THREE.Points && o.material instanceof THREE.ShaderMaterial) {
      o.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    }
  });
  scene.add(skybox.group);

  // Constellation figure lines + named-star markers on the celestial sphere.
  const constellations = buildConstellations();
  scene.add(constellations);

  // Classic figure plates (plan 007): hidden until the Figures toggle.
  const constellationFigures = buildConstellationFigures();
  scene.add(constellationFigures);

  // D6: the low tier skips the HDR→bloom→SMAA post stack entirely (the
  // composer's HalfFloat RT + bloom + SMAA are a large GPU cost) and renders
  // directly to the canvas — the same path the `?post=0` fallback uses.
  const post: PostStack | null = profile.post
    ? buildPostStack(renderer, scene, camera, window.innerWidth, window.innerHeight)
    : null;

  // Sun corona: a separate additive billboard that gives the unlit sun disc a
  // real glow/halo (the plan-016 flat "teal ring" replaced by a radial corona).
  const sunGlow = buildSunGlow(SUN_R * 4.5);
  scene.add(sunGlow.sprite);

  // Sun surface shader (plan 044 A1): animated FBM granulation + limb
  // darkening + HDR core. Replaces the flat MeshBasicMaterial disc; the bright
  // core/limb feed the bloom pass. Built once, assigned to the star in the
  // loop below; setTime() is driven per-frame from main.ts.
  const sunShader = buildSunShaderMaterial();

  const disposables: { dispose: () => void }[] = [skybox, sunGlow, sunShader];
  if (post) disposables.push(post);
  const map = new Map<string, SceneBody>();

  // Planets and Sun first so moons can resolve their parents.
  const ordered = [
    ...bodies.filter((b) => b.kind !== 'moon'),
    ...bodies.filter((b) => b.kind === 'moon'),
  ];

  for (const def of ordered) {
    const isStar = def.kind === 'star';
    const isMoon = def.kind === 'moon';
    const isDwarf = def.kind === 'dwarf';
    const isSmall = def.kind === 'small';

    // Radius in scene units (stars get a special size; moons are much
    // smaller than planets so satellites read as satellites; dwarfs get
    // their own compressed tier — plan 038 — so Ceres & co stop reading as
    // planet-sized discs; named small bodies (B7) get a smaller dot tier).
    const r = isStar
      ? scale === TRUE_SCALE
        ? (def.radiusKm / AU_TO_KM) * 1.15
        : SUN_R
      : isMoon
        ? scale.moonRadiusKm(def.radiusKm)
        : isDwarf
          ? scale.dwarfRadiusKm(def.radiusKm)
          : isSmall
            ? scale.smallRadiusKm(def.radiusKm)
            : scale.bodyRadiusKm(def.radiusKm);
    // Scale-independent radii for the true-scale tour (B3): the tour blends
    // between the visible-mode and true-mode layouts live, so each body
    // needs BOTH radii (the baked mesh radius is `r`, the build scale).
    const trueRadius = isStar
      ? (def.radiusKm / AU_TO_KM) * 1.15
      : isMoon
        ? TRUE_SCALE.moonRadiusKm(def.radiusKm)
        : isDwarf
          ? TRUE_SCALE.dwarfRadiusKm(def.radiusKm)
          : isSmall
            ? TRUE_SCALE.smallRadiusKm(def.radiusKm)
            : TRUE_SCALE.bodyRadiusKm(def.radiusKm);
    const visibleRadius = isStar
      ? SUN_R
      : isMoon
        ? VISIBLE_SCALE.moonRadiusKm(def.radiusKm)
        : isDwarf
          ? VISIBLE_SCALE.dwarfRadiusKm(def.radiusKm)
          : isSmall
            ? VISIBLE_SCALE.smallRadiusKm(def.radiusKm)
            : VISIBLE_SCALE.bodyRadiusKm(def.radiusKm);

    const geo = new THREE.SphereGeometry(r, 48, 32);
    // The sun's surface is a shader (plan 044 A1), not a texture — skip the
    // canvas bake entirely (saves a 512×256 texture + upload).
    const surfaceTex = isStar ? null : makeSurfaceTexture(def);
    const mat = isStar
      ? sunShader.material
      : new THREE.MeshStandardMaterial({ map: surfaceTex, roughness: 0.92, metalness: 0 });
    disposables.push(geo, mat, ...(surfaceTex ? [surfaceTex] : []));
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

    // Selection highlight: a thin hugging collar in the body's equatorial
    // plane (the same plane its satellites orbit in). Child of the pivot so it
    // tilts with the body; invisible until `setSatelliteHighlight` marks this
    // body as the selected satellite.
    //
    // Plan 039: was a broad annulus (1.55–2.35×) that sat *inside* Saturn's
    // natural ring band (1.24–2.27×) and reached the Moon/Amalthea orbits on
    // Earth/Jupiter, so satellites read as sitting on the disc. Now a 0.05×-wide
    // collar hugging the limb: inner 1.03, outer 1.08, and at the breathing peak
    // (×1.12 in bodyHighlightTargets) the outer edge is 1.2096× — just inside
    // the two binding constraints, Jupiter/Amalthea (floor 1.242×) and Saturn's
    // natural-ring inner edge (1.24×), so it clears every moon orbit.
    const hlGeo = new THREE.RingGeometry(1.03, 1.08, 64);
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

    // Rings (plan 035 F4): a radial band texture with the Cassini division +
    // translucent concentric bands replaces the flat single-opacity disc. The
    // geometry's UVs are remapped so `u` runs across the annulus (radial); the
    // baked 1-D strip gives bright B/A bands, the dark Cassini gap, and a thin
    // Encke gap. Still a lit Standard material so the sun lights the rings and
    // shadows keep working (Saturn's shadow band across the rings, the planet's
    // shadow on the rings). depthWrite:false lets the translucent gaps show the
    // sky/planet behind without occluding; castShadow/receiveShadow are
    // independent of depthWrite (the shadow pass uses its own depth material).
    let ringsMesh: THREE.Mesh | null = null;
    if (def.rings) {
      const inner = r * def.rings.inner,
        outer = r * def.rings.outer;
      // 96 around, 16 radial rings: keeps triangles small so the per-fragment
      // UV interpolation stays near-linear in radius (resolves the narrow gaps).
      const ringGeo = new THREE.RingGeometry(inner, outer, 96, 16);
      remapRingUVRadial(ringGeo);
      const ringTex = ringTextureFor(def.id, def.rings.color);
      // color is white: the (sRGB) band texture already carries the ring colour
      // + per-radial brightness; its alpha channel carries the band transparency.
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTex,
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: def.rings.opacity,
        roughness: 0.85,
        metalness: 0,
        depthWrite: false,
      });
      const rm = new THREE.Mesh(ringGeo, ringMat);
      rm.rotation.x = -Math.PI / 2;
      rm.castShadow = true;
      rm.receiveShadow = true;
      rm.renderOrder = 1; // after the planet, so translucent gaps layer cleanly
      pivot.add(rm);
      ringsMesh = rm;
      disposables.push(ringGeo, ringMat);
      // ringTex is cached (shared across rebuilds) — not disposed here.
    }

    // Atmosphere (plan 035 F4): a fresnel rim shell for bodies with air
    // (Earth/Venus/Mars + gas & ice giants). View-dependent (view-space), so
    // it never needs to spin; it's a child of the pivot (not the spinning mesh).
    let atmosphereMesh: AtmosphereShell | null = null;
    const atm = atmosphereConfigFor(def.id);
    if (atm && !isStar && !isMoon) {
      atmosphereMesh = buildShell(r, atm.tint, { power: atm.power, intensity: atm.intensity });
      pivot.add(atmosphereMesh);
      // disposed in dispose() below (geo+mat), like the cloud shell.
    }

    // Aurora (plan 044 B5): a polar band around Earth, driven by the live NOAA
    // Kp index. Earth only. Child of the pivot so it tilts with the planet.
    // Invisible until main.ts feeds it a Kp (setKp), and only visible when
    // Kp >= 4 (see auroraVisual).
    let aurora: Aurora | null = null;
    if (def.id === 'earth') {
      aurora = makeAurora(r);
      pivot.add(aurora.mesh);
    }

    // Label sprite above the body. Plan 044 A5: the 3D sprite is now HIDDEN —
    // planet/body names moved to a 2D screen-space overlay (main.ts +
    // render/planetScreenLabels.ts) with leader lines + distance fade +
    // de-collision. The sprite is kept (and still sized in applyScaleMorph)
    // so the scene graph is unchanged, but it never renders.
    const labelTex = makeLabelTexture(def.name);
    const labelMat = new THREE.SpriteMaterial({ map: labelTex, depthTest: false });
    const label = new THREE.Sprite(labelMat);
    const ls = isStar ? 3.4 : Math.max(1.3, r * 2.4);
    label.scale.set(ls, ls * 0.25, 1);
    label.position.y = r + ls * 0.35;
    label.visible = false; // A5: the 2D overlay draws the name instead.
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
      atmosphereMesh,
      aurora,
      parent,
      spin: 0,
      worldPos: new THREE.Vector3(),
      sceneRadius: r,
      visibleRadius,
      trueRadius,
      builtRadius: r,
      cloudsMesh: null,
      frameExtent,
      satellite: null,
    };
    // The ISS is hidden until a TLE loads (setIssSatellite reveals it). Without
    // a satellite record its position is undefined, so it must not render.
    if (def.id === 'iss') entry.mesh.visible = false;
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

  // ISS orbit line (plan 044 B1): the ISS has no Keplerian `elements`, so its
  // orbit line is built here (not in the per-body loop) as a static circle in
  // the ecliptic frame, attached to Earth's pivot (like the Moon's). The
  // circle's radius is the clamped scene distance (see MOON_CLAMPS.iss); the
  // body position (updatePositions) is clamped to the SAME radius, so the ISS
  // dot rides on the drawn line. `setIssSatellite` re-samples the line's
  // inclination/node from the live TLE and reveals the body.
  {
    const iss = map.get('iss');
    const earth = map.get('earth');
    if (iss && earth) {
      const N = 96;
      const pts: THREE.Vector3[] = [];
      const radii = new Float32Array(N + 1);
      const unitDirs = new Float32Array((N + 1) * 3);
      const rScene = scale.moonDistance(420, 'iss') ?? 2.0; // clamped scene radius
      for (let k = 0; k <= N; k++) {
        const u = (k / N) * Math.PI * 2;
        // Placeholder circle in the ecliptic frame (i=0, node=0); setIssSatellite
        // re-samples it with the live TLE's inclination/node.
        const x = rScene * Math.cos(u);
        const y = rScene * Math.sin(u);
        const z = 0;
        pts.push(new THREE.Vector3(x, y, z));
        radii[k] = 420; // km (the moonDistance domain)
        const d = Math.hypot(x, y, z) || 1;
        unitDirs[k * 3] = x / d;
        unitDirs[k * 3 + 1] = y / d;
        unitDirs[k * 3 + 2] = z / d;
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: 0x88aacc,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(geo, mat);
      line.userData.geo = geo;
      line.userData.mat = mat;
      line.userData.radii = radii;
      line.userData.unitDirs = unitDirs;
      line.visible = false; // hidden until a TLE loads
      earth.pivot.add(line);
      iss.orbit = line;
      disposables.push(geo, mat);
    }
  }

  // Belt populations (asteroid + Kuiper). Built last so they never
  // interfere with body/parent resolution.
  const belts: BeltField[] = [];
  for (const def of BELTS) {
    // D6: scale the belt population by the quality tier (a prefix of the same
    // seeded sequence — see scaledBeltCount).
    const field = buildBeltField(def, scaledBeltCount(def.count, quality));
    belts.push(field);
    scene.add(field.mesh);
    scene.add(field.points); // F6 far-LOD cloud (hidden until a far view)
  }
  updateBeltFields({ belts } as Pick<BuiltScene, 'belts'>, 0, scale, 0);

  function dispose() {
    for (const d of disposables) d.dispose();
    for (const b of belts) b.dispose();
    // Cloud shells (plan 035 F3): per-body geo+mat. The cloud texture itself
    // lives in the shared realTextureCache (persisted across rebuilds), so we
    // only dispose the geometry and material the shell owns.
    for (const entry of map.values()) {
      if (entry.cloudsMesh) {
        entry.cloudsMesh.geometry.dispose();
        (entry.cloudsMesh.material as THREE.Material).dispose();
      }
      // Atmosphere shells (plan 035 F4): per-body geo+mat (shader uniform
      // tint is a plain Vector3 — no texture to release).
      if (entry.atmosphereMesh) entry.atmosphereMesh.disposeAtmosphere();
      // Aurora band (plan 044 B5): per-body geo+mat (Earth only).
      if (entry.aurora) entry.aurora.dispose();
    }
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
    skybox,
    constellations,
    constellationFigures,
    post,
    sunGlow: sunGlow.sprite,
    sunShader,
    aurora: map.get('earth')?.aurora ?? null,
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
 * Maximum opacity of the constellation FIGURE plates (plan 007 / 040). The
 * plates are a SOFT UNDERLAY: they must never outshine the star lines or the
 * name labels, which stay primary. The dense Stellarium art reads as a solid
 * wash at high opacity, so the cap is kept well below the line peak (1.0) —
 * 0.5 — so the thin edge lines stay clearly traceable even when a figure
 * plate overlaps them. (Plan 040: was a magic 0.85, only 15% under the line
 * peak, so the art still swamped the edges.)
 */
export const FIGURE_PLATE_MAX_OPACITY = 0.5;
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
 * Pick emphasis (plan 010, S4): when the user picks a constellation from
 * the find box, ITS figure stands out from the 87 others with a distinct
 * light apple-green line color (max contrast against the 0x8fb0ff sky blue)
 * and a gentle breathing pulse. Pure — unit-tested.
 *
 * Plan 016 P2: the accent moved from warm gold (0xffc46b) to light apple
 * green (0x7cfc5a, 124/252/90) — the user's explicit request. One constant:
 * picked lines, the proximity lerp, the emphasis stars, and the label
 * variant all follow it (the green label is a distinct 'green' texture
 * variant with the same hue).
 */
/** Base sky-blue line color for every (unpicked) constellation. */
export const CONSTELLATION_BASE_LINE_COLOR = 0x8fb0ff;
/** Light apple green: the picked figure's line/star/label color (vs base 0x8fb0ff blue). */
export const CONSTELLATION_EMPHASIS_COLOR = 0x7cfc5a;
/**
 * Plan 042: the dark UNDER-STROKE behind the blue constellation lines. WebGL
 * `LineBasicMaterial` lines are a fixed 1 device px, so on the bright cream
 * figure plates (plan 007 art) the 1px blue line loses contrast and the
 * asterism "disappears" where it crosses its own figure. A fat-line
 * (`LineSegments2`/`LineMaterial`) black stroke, a few world units WIDER than
 * the visible blue line, cuts a dark groove through the art: blue line /
 * black halo / cream fill → high contrast on the cream plates.
 *
 * `LineSegments2` (NOT `Line2`): `c.lines` are DISCONNECTED [a,b] pairs, so
 * the segments variant must be used — `Line2`/`LineGeometry` would treat the
 * flat vertex list as one connected polyline and stitch a spurious line
 * between every unrelated segment (the "extra connections" bug).
 *
 * The halo is PURE black (0x000000), not a dark blue-grey: over the (near-)
 * black sky, black-on-black is invisible, so the halo produces NO "fat grey
 * line" side effect on open sky (A/B-verified). It only appears where there
 * is a lighter fill (the cream plates) — exactly where contrast is needed.
 * The blue line itself is also re-drawn as a fat line
 * (CONSTELLATION_LINE_FAT_WIDTH) so the edges are no longer a hairline 1px
 * stroke.
 */
/** Pure black halo — invisible on the black sky, a dark rim on the cream plates. */
export const CONSTELLATION_LINE_HALO_COLOR = 0x000000;
/** Halo opacity at the view edge (D4 base). */
export const CONSTELLATION_LINE_HALO_BASE_OPACITY = 0.45;
/** Halo opacity dead center (D4 peak). */
export const CONSTELLATION_LINE_HALO_PEAK_OPACITY = 0.7;
/**
 * Line widths in WORLD units (three's LineMaterial with `worldUnits: true`
 * projects the width at the line's depth, so it scales with zoom exactly
 * like everything else in the scene). At the default sky view (camera at
 * (0,16,30) → ~4834 units from the dome, 50° vertical FOV, 800 CSS px tall
 * viewport → 1 world unit ≈ 0.18 CSS px):
 *   fat blue line  8 units ≈ 1.4 CSS px,
 *   black halo    11 units ≈ 2.0 CSS px  (~0.3 px rim each side).
 * The halo must be strictly wider than the fat blue line so a dark rim
 * remains on both sides, but only just — a wide halo reads as a fat grey
 * line on the sky (A/B feedback).
 */
export const CONSTELLATION_LINE_FAT_WIDTH = 8;
export const CONSTELLATION_LINE_HALO_WIDTH = 11;
/** Pulse amplitude: the selected line's opacity swings 1.0 ± this. */
export const CONSTELLATION_EMPHASIS_PULSE = 0.15;
/** Pulse period (seconds) — a slow, calm breathe, not a strobe. */
export const CONSTELLATION_EMPHASIS_PERIOD = 2.5;

/**
 * The selected figure's line opacity at wall-clock time `tSec`: a sine
 * breathing between 1 and 1 − PULSE (always fully opaque at the peak, so the
 * figure is never lost).
 */
export function constellationEmphasisOpacity(tSec: number): number {
  const phase = 2 * Math.PI * (tSec / CONSTELLATION_EMPHASIS_PERIOD);
  return 1 - (CONSTELLATION_EMPHASIS_PULSE * (1 - Math.sin(phase))) / 2;
}

/**
 * Plan 017 F1: the "proximity gold / green nearest-figure" auto-emphasis is
 * GONE. Only a figure the user explicitly PICKS gets the accent (green line
 * color + breathing pulse + emphasis stars + green label). The per-figure
 * view-center D4 emphasis curve still drives every figure's line/label
 * OPACITY fade (smooth, no jumping), but it no longer tints a "nearest"
 * figure green — that was the unwanted highlight hopping between figures as
 * the camera nudged (especially intrusive in planet close-ups).
 */

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
export const CONSTELLATION_LABEL_EDGE_GAP_RAD = 0.02; // ~1.2° from far edge to ink edge (plan 015 P4)
/**
 * Plan 015 P4: cap on the FAR-side label extent (radians past the figure
 * center). A figure's principal-axis `halfExtent` is dominated by a few
 * far-out stars — for long, faint-tailed figures (Taurus's horns, Hydra's
 * head) the far tip is a faint tail well beyond the dense star body the
 * user reads as "the figure", so an uncapped margin let the name float
 * detached (measured: Taurus name 8–12° from its dense stars). Capping the
 * far extent at ~20° pulls those names back to the body.
 *
 * This is a uniform rule (one constant, applied identically to all 88),
 * NOT a per-figure hand-tune. The safety net is the resolver's self-clear
 * guard (see {@link labelCoversOwnFigure}): a figure whose dense body
 * genuinely extends past the cap would have its name land on its own star
 * path at the capped position, so that candidate is rejected and the
 * original (clearing) far-tip margin is kept instead. A name therefore
 * NEVER lands on its own figure — plan 006's visibility guardrail holds,
 * and this change can only ever move a label CLOSER, never worse.
 */
export const CONSTELLATION_LABEL_FAR_CAP_RAD = 0.35; // ~20°

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
 * Label block-center margin (radians past the figure center): far extent +
 * constant edge gap + half the ink, so the visible lettering sits a
 * constant `CONSTELLATION_LABEL_EDGE_GAP_RAD` past the figure's far edge
 * for every name.
 *
 * Plan 015 P4: the far extent is capped at
 * `CONSTELLATION_LABEL_FAR_CAP_RAD` — long figures' far tip is often a faint
 * tail far from the dense star path, so an uncapped margin let the name
 * float beyond it. Figures whose star path would then sit under the name
 * are handled by the resolver's self-clear fallback (see
 * {@link labelCoversOwnFigure} / `resolveConstellationLabels`): they keep
 * the original far-tip margin, so a name never lands on its own figure.
 */
export function constellationLabelMargin(c: Constellation): number {
  const pose = constellationLabelPose(c);
  const farExtent = Math.min(pose.halfExtent, CONSTELLATION_LABEL_FAR_CAP_RAD);
  return farExtent + CONSTELLATION_LABEL_EDGE_GAP_RAD + constellationLabelInkWidthRad(c) / 2;
}

/** Extra clearance (radians) kept around the text by the self-clear check. */
const LABEL_SELF_CLEAR_PAD_RAD = 0.006; // ~0.35°
/**
 * Plan 015 P4: does the label block centered on unit direction `dir`
 * overlap the figure's OWN star path — its line segments or (unconnected)
 * star dots? The text is approximated as a tangent-plane rectangle (ink
 * half-width × height half, plus a small clearance pad). Pure — the
 * resolver uses it so a capped name never covers its figure (the plan 006
 * visibility guardrail).
 */
export function labelCoversOwnFigure(c: Constellation, dir: [number, number, number]): boolean {
  const p = norm3(dir);
  const inkHalf = constellationLabelInkWidthRad(c) / 2;
  const halfH = constellationLabelHeightRad(c) / 2;
  const ref = Math.abs(p[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const ex = norm3(cross3(p, ref));
  const ey = norm3(cross3(p, ex));
  const units = c.stars.map((s) => raDecToUnit(s.raHours, s.decDeg));
  const inRect = (q: [number, number, number]) =>
    Math.abs(dot3(q, ex)) < inkHalf + LABEL_SELF_CLEAR_PAD_RAD &&
    Math.abs(dot3(q, ey)) < halfH + LABEL_SELF_CLEAR_PAD_RAD;
  // Star path = the line segments (sampled) plus the star dots themselves
  // (covers stars no segment touches).
  for (const [i, j] of c.lines) {
    for (let t = 0; t <= 1.0001; t += 0.05) {
      const q: [number, number, number] = [
        units[i][0] + (units[j][0] - units[i][0]) * t,
        units[i][1] + (units[j][1] - units[i][1]) * t,
        units[i][2] + (units[j][2] - units[i][2]) * t,
      ];
      if (inRect(q)) return true;
    }
  }
  for (const q of units) if (inRect(q)) return true;
  return false;
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
 * Plan 015 P4: cost of a candidate placement that would put the name on
 * the figure's OWN star path. Much larger than any overlap penalty, so a
 * self-covering position is only ever chosen when NO clear candidate
 * exists — and one always does (the far-tip side at ×1.0 is the original
 * plan 006 margin, which clears by construction), so a name in practice
 * NEVER covers its own figure.
 */
const LABEL_SELF_COVER_COST = 10;

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
        // Plan 015 P4: never sit the name on the figure's own star path.
        // This is the guardrail that makes the far-extent cap safe — a
        // capped position that would cover the figure costs far more than
        // any neighbor overlap, so the solver falls back to the original
        // (clearing) far-tip margin whenever they conflict.
        if (labelCoversOwnFigure(list[i], dir)) score += LABEL_SELF_COVER_COST;
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

  // Plan 016 P1: name labels moved to the screen-space overlay
  // (`constellationScreenLabels.ts`) — the 3D sprites caused depth-test
  // flicker and "label through the figure" under the 360° trackball.
  // The solver's per-figure anchor directions are exposed on the group so
  // main.ts can feed the overlay every frame (same math, 2D rendering).
  const labelDirs: [number, number, number][] = [];
  const dotVerts: number[] = [];
  // Plan 016 P2: per-constellation emphasis stars (kept for disposal).
  const emphGeos: THREE.BufferGeometry[] = [];
  const emphMats: THREE.PointsMaterial[] = [];
  // Plan 042: the fat blue line + dark halo are `LineSegments2` objects (a
  // plain LineBasicMaterial line is fixed at 1 device px and loses contrast
  // on the cream figure plates). Kept for disposal + the per-frame picked
  // pulse. `LineSegments2` (not `Line2`): the asterism links are DISCONNECTED
  // [a,b] pairs, so the segments variant draws each link independently — a
  // `Line2`/`LineGeometry` would read the flat vertex list as one connected
  // polyline and stitch a spurious line between unrelated segments.
  const fatLineGeos: THREE.BufferGeometry[] = [];
  const fatLineMats: LineMaterial[] = [];
  const haloGeos: THREE.BufferGeometry[] = [];
  const haloMats: LineMaterial[] = [];
  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    labelDirs.push(placements[i].dir);
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
      color: CONSTELLATION_BASE_LINE_COLOR,
      transparent: true,
      opacity: CONSTELLATION_BASE_OPACITY,
      depthWrite: false,
    });
    // Base color remembered so a pick-emphasis (plan 010) can restore it
    // exactly when the selection is cleared.
    lineMat.userData.baseColor = CONSTELLATION_BASE_LINE_COLOR;
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.name = `constellation-lines-core:${c.name}`;
    // Plan 040: draw ABOVE the figure plates (renderOrder 0). The plates are
    // added to the scene after the line group, so in three.js's transparent
    // pass they would otherwise paint over these thin edges wherever they
    // overlap, burying the asterism. Plan 042: the fat blue line (LineSegments2)
    // is the primary visible stroke at renderOrder 2; this crisp 1px core stays
    // just above it (renderOrder 3) so the line's center is always a clean
    // hairline over the fat body. The star DOTS render on top of all of these
    // (renderOrder 4) so the asterism's vertices read as crisp points.
    lines.renderOrder = 3;
    group.add(lines);

    // Plan 042: a fat blue line as the PRIMARY visible stroke — a 1px WebGL
    // line is a hairline on the cream plates. Same vertex PAIRS as the core,
    // a true world-unit width (scales with zoom like everything else in the
    // scene), renderOrder 2: above the dark halo (renderOrder 1, inserted
    // before it) and below the crisp 1px core (renderOrder 3) so the line's
    // center stays a clean hairline over the fat body.
    //
    // IMPORTANT: `LineSegments2` + `LineSegmentsGeometry`, NOT `Line2` +
    // `LineGeometry`. `c.lines` is a list of DISCONNECTED [a,b] pairs; the
    // flat array below is [A0,B0, A1,B1, A2,B2, …]. `LineSegmentsGeometry`
    // reads it as independent segments (matching the original 1px core
    // topology). `LineGeometry` would read it as ONE connected polyline
    // (A0→B0→A1→B1→…), stitching a spurious line from each segment's end to
    // the next segment's start — the "extra connections" the user saw.
    const fatGeo = new LineSegmentsGeometry();
    fatGeo.setPositions(lineVerts);
    const fatMat = new LineMaterial({
      color: CONSTELLATION_BASE_LINE_COLOR,
      transparent: true,
      opacity: CONSTELLATION_BASE_OPACITY,
      depthWrite: false,
      linewidth: CONSTELLATION_LINE_FAT_WIDTH,
      worldUnits: true,
    });
    // worldUnits: true → width is in world units; the resolution uniform is
    // ignored (only used in screen-pixel mode). A placeholder keeps the
    // node-env unit tests happy (no window in the vitest environment).
    fatMat.resolution.set(1, 1);
    const fatLine = new LineSegments2(fatGeo, fatMat);
    fatLine.name = `constellation-lines:${c.name}`;
    fatLine.renderOrder = 2;
    fatLine.computeLineDistances();
    group.add(fatLine);
    fatLineGeos.push(fatGeo);
    fatLineMats.push(fatMat);

    // Plan 042: the dark under-stroke — same vertex PAIRS, WIDER than the
    // fat blue line, pure black. renderOrder 1 puts it in the pass ABOVE the
    // figure plates (renderOrder 0, separate group added after this one) so
    // the groove is never painted over by the art, but BELOW the blue lines
    // (renderOrder 2) so the stroke stays the primary visible layer. Over
    // cream art it cuts a dark groove the blue line sits in; over the black
    // sky the pure-black stroke is invisible (black-on-black).
    const haloGeo = new LineSegmentsGeometry();
    haloGeo.setPositions(lineVerts);
    const haloMat = new LineMaterial({
      color: CONSTELLATION_LINE_HALO_COLOR,
      transparent: true,
      opacity: CONSTELLATION_LINE_HALO_BASE_OPACITY,
      depthWrite: false,
      linewidth: CONSTELLATION_LINE_HALO_WIDTH,
      worldUnits: true,
    });
    haloMat.resolution.set(1, 1); // worldUnits: true → resolution is unused
    const halo = new LineSegments2(haloGeo, haloMat);
    halo.name = `constellation-lines-halo:${c.name}`;
    halo.renderOrder = 1;
    halo.computeLineDistances();
    group.add(halo);
    haloGeos.push(haloGeo);
    haloMats.push(haloMat);

    // Plan 016 P2: the shared `dots` Points carries ONE opacity for all 88
    // figures, so it cannot highlight one. Each figure therefore gets its
    // own overlay Points of the SAME star positions in the emphasis green,
    // a touch larger, sitting at R+4 (in front of the line plane, no
    // z-fight) — invisible unless the figure is picked or nearest.
    const emphScale = (CONSTELLATION_RADIUS + 4) / CONSTELLATION_RADIUS;
    const emphVerts: number[] = [];
    for (const p of pos) emphVerts.push(p[0] * emphScale, p[1] * emphScale, p[2] * emphScale);
    const emphGeo = new THREE.BufferGeometry();
    emphGeo.setAttribute('position', new THREE.Float32BufferAttribute(emphVerts, 3));
    const emphMat = new THREE.PointsMaterial({
      color: CONSTELLATION_EMPHASIS_COLOR,
      size: 5.2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const emphDots = new THREE.Points(emphGeo, emphMat);
    emphDots.name = `constellation-stars-emph:${c.name}`;
    emphDots.visible = false;
    emphDots.renderOrder = 4; // plan 042: the picked figure's stars sit on top of the lines
    group.add(emphDots);
    emphGeos.push(emphGeo);
    emphMats.push(emphMat);

    for (const p of pos) dotVerts.push(...p);
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotVerts, 3));
  const dots = new THREE.Points(dotGeo, dotMat);
  dots.name = 'constellation-stars';
  dots.renderOrder = 4; // plan 042: crisp star points on top of the lines/halo
  group.add(dots);

  // Plan 016 P1: expose the solver anchor directions so main.ts can feed
  // the screen-space label layer every frame (the 3D name sprites are gone).
  group.userData.labelDirs = labelDirs;

  // Expose for disposal.
  group.userData.dispose = () => {
    for (const child of group.children) {
      const o = child as THREE.Object3D;
      if (o instanceof THREE.LineSegments || o instanceof LineSegments2) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    }
    for (const g of emphGeos) g.dispose();
    for (const m of emphMats) m.dispose();
    for (const g of fatLineGeos) g.dispose();
    for (const m of fatLineMats) m.dispose();
    for (const g of haloGeos) g.dispose();
    for (const m of haloMats) m.dispose();
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
  // Diacritics have no filesystem-friendly slug (Boötes → bootes.png).
  return `constellation-figures/${name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '_')}.png`;
}

/**
 * Build the constellation figures (plan 012): one transparent,
 * depth-tested plane per constellation, lying on the sky dome's tangent
 * plane at the fit's SOLVED sky center. The art is a Stellarium
 * "western" sky-culture illustration registered to the real stars via
 * three Hipparcos anchors (see data/figures.ts), so the plane is
 * RA-anchored — a flat patch of sky that stays registered with the star
 * lines while the camera moves (no billboard snapping).
 *
 * The group is HIDDEN by default; main.ts shows it with the "Figures"
 * toggle and drives per-plane opacity through
 * `updateConstellationFigureHighlights` (mirrors the D4 emphasis + Q2
 * presence curves, capped so the art stays a soft underlay).
 */
export function buildConstellationFigures(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'constellation-figures';
  group.visible = false;

  const loader = new THREE.TextureLoader();
  for (const fit of FIGURE_FITS) {
    if (!CONSTELLATION_NAME_INDEX.has(fit.constellation)) continue;

    // Load (cached) the art; decode happens in the browser — the cache
    // keeps rebuilds from re-fetching.
    let tex = FIGURE_TEX_CACHE.get(fit.constellation);
    if (!tex) {
      tex = loader.load(figureTextureUrl(fit.constellation));
      FIGURE_TEX_CACHE.set(fit.constellation, tex);
    }
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;

    // Anchor direction = the fit's solved sky center (anchor-registered
    // for 85 figures, star-cloud-centered for the 3 specials) — no
    // centroid/offset computation anymore.
    const placement = figurePlacement(fit);

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
    // peak) but is capped at FIGURE_PLATE_MAX_OPACITY (0.5, plan 040) so the
    // dense art stays a soft underlay — the star lines and name labels remain
    // the primary layer and the thin edges stay traceable. Opacity-only (no
    // per-plate visible toggling): fading is smooth, the group's own
    // visibility is the toggle's job.
    const t = Math.min(FIGURE_PLATE_MAX_OPACITY, constellationLabelOpacity(emph)) * presence;
    (child as THREE.Mesh).visible = t > 0.005;
    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = t;
  }
}

/**
 * D4: fade each constellation's lines by how close its center is to the
 * camera's view axis. `emphases[i]` must be the per-constellation
 * `constellationEmphasis` output (view-center proximity, 0..1). Cheap: only
 * writes a float per material. Driven from the frame loop at ~5 Hz and
 * only when the camera actually moved.
 *
 * The name LABELS no longer live here (plan 016 P1): they are rendered on
 * the 2D screen-space overlay (`render/constellationScreenLabels.ts`), which
 * consumes the same emphasis values at display rate. This pass only writes
 * the line materials + the shared star dots + the per-figure emphasis stars.
 *
 * Plan 017 F1: the per-figure emphasis stars bloom in the emphasis green ONLY
 * when the figure is picked (breathing pulse, same phase as its lines);
 * every other figure's stars are invisible. The old "nearest figure" tint is
 * gone (the highlight no longer jumps between figures as the camera moves).
 *
 * `presence` (plan 003 P4) multiplies everything — lines, the shared star
 * dots, and the emphasis stars — so the whole sky fades together when the
 * camera is close to a body and returns at sky-view distances (default 1).
 * A PICKED figure's emphasis stars ignore presence (like its lines — the
 * user asked to see it).
 */
export function updateConstellationHighlight(
  group: THREE.Group,
  emphases: ArrayLike<number>,
  presence: number = 1,
  selectedName?: string | null,
  tSec = 0,
): void {
  for (const child of group.children) {
    const name = child.name ?? '';
    if (name === 'constellation-stars') {
      // Shared star dots fade with the whole sky (plan 003 P4).
      ((child as THREE.Points).material as THREE.Material).opacity = presence;
      continue;
    }
    // Plan 016 P2: per-figure emphasis stars. The shared `dots` Points
    // carries one opacity for all 88 figures, so it cannot highlight one.
    if (name.startsWith('constellation-stars-emph:')) {
      const idx = CONSTELLATION_NAME_INDEX.get(name.slice('constellation-stars-emph:'.length));
      if (idx === undefined) continue;
      const isPicked =
        selectedName != null &&
        selectedName !== '' &&
        name === `constellation-stars-emph:${selectedName}`;
      const emphMat = (child as THREE.Points).material as THREE.PointsMaterial;
      if (isPicked) {
        // Same breathing pulse as the picked figure's lines (in phase).
        emphMat.opacity = constellationEmphasisOpacity(tSec);
      } else {
        // Not picked: invisible (plan 017 F1 — no nearest-figure tint).
        emphMat.opacity = 0;
      }
      child.visible = emphMat.opacity > 0.005;
      continue;
    }
    // Plan 042: three line objects per constellation, all driven by the SAME
    // D4/pick math (the per-figure index is resolved from the name below and
    // the math computed once):
    //   constellation-lines-core:<n>  — 1px LineBasicMaterial hairline (on top)
    //   constellation-lines:<n>       — fat blue LineSegments2 (primary stroke)
    //   constellation-lines-halo:<n>  — wider pure-black LineSegments2 under-stroke
    // The core + fat share color/opacity (LO is always ≤ the fat line's);
    // the halo runs its OWN curve (base 0.5 → peak 0.85, plan 042) so a dark
    // groove is always present on the cream plates, and takes the picked
    // figure's full emphasis pulse (no ×0.8 — the picked halo must stay as
    // prominent as the line, or the groove vanishes exactly where it is
    // needed most: over the brightest art).
    //
    // NOTE on classification: 'constellation-lines-halo:<n>' ALSO starts with
    // 'constellation-lines:', so the halo must be tested FIRST and short-
    // circuited — otherwise the fat branch (which does a `continue`) would
    // swallow it and the halo would never get its own curve.
    const haloName = name.startsWith('constellation-lines-halo:')
      ? name.slice('constellation-lines-halo:'.length)
      : null;
    if (haloName !== null) {
      const idx = CONSTELLATION_NAME_INDEX.get(haloName);
      if (idx === undefined) continue;
      const emph = emphases[idx] ?? 0;
      const isPicked = selectedName != null && selectedName !== '' && haloName === selectedName;
      const haloMat = (child as LineSegments2).material as LineMaterial;
      if (isPicked) {
        haloMat.opacity = constellationEmphasisOpacity(tSec);
      } else {
        haloMat.opacity =
          (CONSTELLATION_LINE_HALO_BASE_OPACITY +
            (CONSTELLATION_LINE_HALO_PEAK_OPACITY - CONSTELLATION_LINE_HALO_BASE_OPACITY) * emph) *
          presence;
      }
      continue;
    }
    const coreName = name.startsWith('constellation-lines-core:')
      ? name.slice('constellation-lines-core:'.length)
      : null;
    const fatName =
      coreName === null && name.startsWith('constellation-lines:')
        ? name.slice('constellation-lines:'.length)
        : null;
    const figName = coreName ?? fatName;
    if (figName === null) continue;
    const idx = CONSTELLATION_NAME_INDEX.get(figName);
    if (idx === undefined) continue;
    const emph = emphases[idx] ?? 0;
    const isPicked = selectedName != null && selectedName !== '' && figName === selectedName;
    if (coreName !== null) {
      const mat = (child as THREE.LineSegments).material as THREE.LineBasicMaterial;
      if (isPicked) {
        mat.color.setHex(CONSTELLATION_EMPHASIS_COLOR);
        mat.opacity = constellationEmphasisOpacity(tSec);
      } else {
        mat.color.setHex(CONSTELLATION_BASE_LINE_COLOR);
        mat.opacity =
          (CONSTELLATION_BASE_OPACITY +
            (CONSTELLATION_PEAK_OPACITY - CONSTELLATION_BASE_OPACITY) * emph) *
          presence;
      }
      continue;
    }
    // fatName !== null
    {
      const mat = (child as LineSegments2).material as LineMaterial;
      if (isPicked) {
        mat.color.setHex(CONSTELLATION_EMPHASIS_COLOR);
        // Full-opacity pulse: the picked figure ignores the sky presence — it
        // is what the user asked to see (the S4 sky-dome view sits at ~600
        // units where presence ≈ 0.55 and would half-dim the emphasis).
        mat.opacity = constellationEmphasisOpacity(tSec);
      } else {
        mat.color.setHex(CONSTELLATION_BASE_LINE_COLOR);
        mat.opacity =
          (CONSTELLATION_BASE_OPACITY +
            (CONSTELLATION_PEAK_OPACITY - CONSTELLATION_BASE_OPACITY) * emph) *
          presence;
      }
    }
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
    } else if (
      (def.kind === 'planet' || def.kind === 'dwarf' || def.kind === 'small') &&
      def.elements
    ) {
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
    } else if (def.id === 'iss' && entry.satellite) {
      // ISS (plan 044 B1): position from SGP4 propagation (J2000 ecliptic, AU),
      // the same frame the Moon's Meeus ephemeris uses. The distance display
      // goes through the shared moon scale (clamped to a thin ring just outside
      // Earth — see MOON_CLAMPS.iss). The orbit line is a child of Earth's
      // pivot, so the body receives the SAME pivot rotation to stay on it.
      const res = propagateEcliptic(entry.satellite, tDays);
      if (res) {
        const [px, py, pz] = res.posAu;
        const s = eclipticToSceneInto({ x: px, y: py, z: pz }, scratch);
        const d = Math.hypot(px, py, pz);
        const km = d * AU_KM;
        const factor = scale.moonDistance(km, 'iss') / Math.max(1e-9, d);
        const local = s.multiplyScalar(factor);
        const parent = entry.parent;
        if (parent) {
          local.applyQuaternion(parent.pivot.quaternion);
          pivot.position.copy(parent.worldPos).add(local);
        } else {
          pivot.position.copy(local);
        }
        entry.worldPos.copy(pivot.position);
      }
    }
  }
}

// Module-level scratch for the render loop (single-threaded, never nested).
const UPDATE_POS_SCRATCH = new THREE.Vector3();
const UPDATE_AU_SCRATCH: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

/** Per-belt mean scene radius (computed once; the belt is a ring at ~fixed radius). */
const BELT_MEAN_RADIUS: Map<string, number> = new Map();
function beltMeanRadius(field: BeltField): number {
  let cached = BELT_MEAN_RADIUS.get(field.def.id);
  if (cached === undefined) {
    // Mean of the (constant) semi-major axis mapped through the VISIBLE ramp —
    // true scale collapses the outer belt but the LOD is a visual-distance
    // decision, so use the visible-mode radius as the reference.
    const a = (field.def.a[0] + field.def.a[1]) / 2;
    cached = planetDistance(a);
    BELT_MEAN_RADIUS.set(field.def.id, cached);
  }
  return cached;
}

/**
 * Advance every belt field to simulation time `tDays` (per frame) and apply
 * the F6 LOD (near rocks vs far point cloud) for the current camera distance.
 * `camDist` = camera distance from origin; `0` at build time (near view).
 */
export function updateBeltFields(
  built: Pick<BuiltScene, 'belts'>,
  tDays: number,
  scale: VisualScale,
  camDist: number,
): void {
  for (const field of built.belts) {
    updateBeltField(field, tDays, scale, scale.beltSizeFactor);
    applyBeltLod(field, camDist, beltMeanRadius(field), scale.beltSizeFactor ?? 1);
  }
}

/**
 * F6: re-apply ONLY the LOD choice (near rocks vs far point cloud) for the
 * current camera distance, without re-solving the belt Kepler positions.
 * Called when the camera moves while the sim is paused — the belt positions
 * are frozen but the near/far cross-fade depends on how far the camera is.
 */
export function applyBeltLodOnly(
  built: Pick<BuiltScene, 'belts'>,
  scale: VisualScale,
  camDist: number,
): void {
  for (const field of built.belts) {
    applyBeltLod(field, camDist, beltMeanRadius(field), scale.beltSizeFactor ?? 1);
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
    if (entry.atmosphereMesh) entry.atmosphereMesh.scale.setScalar(s);
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
  // Sun corona: the sun sits at the origin and never moves; its sprite is a
  // scene child, so track the (just-updated) sun radius here (4.5x the disc).
  const sun = built.bodies.get('sun');
  if (sun) built.sunGlow.scale.set(sun.sceneRadius * 4.5, sun.sceneRadius * 4.5, 1);
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

/**
 * Attach a live SGP4 satellite to the ISS body (plan 044 B1). Called from
 * main.ts once a TLE is loaded (CelesTrak fetch or the static fallback).
 * Reveals the ISS mesh/label/orbit line (all hidden until a TLE loads) and
 * resamples the orbit line at the current sim time so the first frame already
 * shows the correct loop.
 */
export function setIssSatellite(
  built: BuiltScene,
  satellite: Satellite,
  tDays: number,
  scale: VisualScale,
): void {
  const iss = built.bodies.get('iss');
  if (!iss) return;
  iss.satellite = satellite;
  iss.mesh.visible = true;
  iss.label.visible = true;
  if (iss.orbit) {
    iss.orbit.visible = true;
    resampleIssOrbitLine(iss.orbit, satellite, tDays, scale);
  }
}

/**
 * Resample the ISS orbit line from the live SGP4 satellite at the current sim
 * time (mirrors `resampleMoonOrbitLine`). The ISS orbit is near-circular, so
 * one revolution of the propagated path is a stable loop; the k=0 vertex is
 * the ISS's live position, so the dot sits exactly on the line. In-place:
 * writes into the line's existing position attribute (no allocation).
 */
export function resampleIssOrbitLine(
  orbit: THREE.Line,
  satellite: Satellite,
  tDays: number,
  scale: VisualScale,
): void {
  const geo = orbit.userData.geo as THREE.BufferGeometry | undefined;
  if (!geo) return;
  const pos = geo.getAttribute('position') as THREE.BufferAttribute;
  const n = pos.count;
  const period = ISS_ORBIT_PERIOD_DAYS;
  for (let k = 0; k < n; k++) {
    const res = propagateEcliptic(satellite, tDays + (k / (n - 1)) * period);
    if (!res) continue;
    const [x, y, z] = res.posAu;
    const d = Math.hypot(x, y, z);
    const km = d * AU_KM;
    const s = eclipticToScene({ x, y, z });
    const u = s.normalize();
    const mapped = scale.moonDistance(km, 'iss') ?? 2.0;
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
    // Earth clouds (plan 035 F3): rotate at ~5 % of the surface rate so the
    // weather layer drifts over the (static, sun-fixed) real day map — the
    // classic "living Earth" parallax.
    if (entry.cloudsMesh) {
      entry.cloudsMesh.rotation.y = entry.spin * 0.05;
    }
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
 * Pure highlight targets for one body (plan 015 P6): given the picked
 * body's id, what should THIS body's glow ring and orbit line look like?
 * The satellite behavior is the special case `hasOrbit && id===moon` and
 * stays pixel-identical: pulsing blue ring (`0.35 + 0.55·phase` opacity,
 * `1 + 0.12·phase` breathing) + orbit line brightened to 0.95 /
 * `0x7fd8ff`. A planet picks the SAME ring + its own heliocentric orbit
 * line lit; the Sun (no orbit line) gets just the ring. `orbitOpacity` /
 * `orbitColor` are `null` when the body has no orbit line to touch. Pure —
 * unit-tested.
 */
export function bodyHighlightTargets(
  bodyId: string,
  pickedId: string,
  hasOrbit: boolean,
  tSeconds: number,
): {
  ringVisible: boolean;
  ringOpacity: number;
  ringBreath: number; // ring scale factor applied to sceneRadius
  orbitOpacity: number | null;
  orbitColor: number | null;
} {
  const isSel = pickedId !== '' && bodyId === pickedId;
  const phase = 0.5 + 0.5 * Math.sin(tSeconds * 3.4); // 0..1, ~1.9 s period
  return {
    ringVisible: isSel,
    ringOpacity: isSel ? 0.35 + 0.55 * phase : 0,
    ringBreath: 1 + 0.12 * phase,
    orbitOpacity: hasOrbit ? (isSel ? 0.95 : 0.45) : null,
    orbitColor: hasOrbit ? (isSel ? 0x7fd8ff : 0x5570a0) : null,
  };
}

/**
 * Selection highlight for a picked BODY (planet OR satellite, plan 015 P6):
 * a pulsing glow ring in the body's equatorial plane + its orbit line
 * brightened. `pickedId` '' clears the selection. Call once per frame with
 * a wall-clock `tSeconds` to drive the pulse (phase is absolute, so the
 * pulse never jumps). State per body comes from `bodyHighlightTargets`.
 */
export function updateBodyHighlight(built: BuiltScene, pickedId: string, tSeconds: number): void {
  for (const entry of built.bodies.values()) {
    const t = bodyHighlightTargets(entry.def.id, pickedId, entry.orbit !== null, tSeconds);
    entry.orbitEmphasis.visible = t.ringVisible;
    if (t.ringVisible) {
      const m = entry.orbitEmphasis.material as THREE.MeshBasicMaterial;
      m.opacity = t.ringOpacity;
      // gentle breathing so the ring reads as "the one you picked"
      entry.orbitEmphasis.scale.setScalar(entry.sceneRadius * t.ringBreath);
    }
    if (entry.orbit && t.orbitOpacity !== null && t.orbitColor !== null) {
      const om = entry.orbit.material as THREE.LineBasicMaterial;
      om.opacity = t.orbitOpacity;
      om.color.set(t.orbitColor);
    }
  }
}
