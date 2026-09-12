/**
 * Belt rendering: one THREE.InstancedMesh per belt population, plus a
 * cheap THREE.Points cloud used as the FAR LOD (F6).
 *
 * All three.js / DOM code lives here (src/render invariants). The object
 * *data* (deterministic elements) comes from `src/data/belts.ts`; the
 * positions come from the same Kepler solver as planets.
 *
 * Per-frame cost: N Kepler solves + N matrix/position writes per belt.
 * ~2k instances total is comfortably 60 fps on ordinary hardware; the LOD
 * blend (see `beltLod.ts`) switches the far view to a single point-cloud
 * draw so the belt stops dominating fill rate when zoomed out.
 */
import * as THREE from 'three';
import type { BeltDefinition, BeltObject } from '../data/belts';
import { sampleBelt } from '../data/belts';
import { positionAtInto } from '../sim/kepler';
import type { Vec3 } from '../sim/kepler';
import type { VisualScale } from './scene';
import { beltLod } from './beltLod';
import type { BeltLodMode } from './beltLod';

export interface BeltField {
  def: BeltDefinition;
  /** Instanced mesh added to the scene (near LOD). */
  mesh: THREE.InstancedMesh;
  /** Point cloud added to the scene (far LOD, F6). */
  points: THREE.Points;
  /** Deterministic object table (same order as instance indices). */
  objects: BeltObject[];
  /** Release GPU resources. */
  dispose: () => void;
}

/** Shared low-poly shape for all belt rocks (unit radius). */
const ROCK_GEOMETRY = new THREE.IcosahedronGeometry(1, 0);

// Module-level scratch for the render loop (single-threaded, never nested).
const BELT_MATRIX = new THREE.Matrix4();
const BELT_POS = new THREE.Vector3();
const BELT_QUAT = new THREE.Quaternion();
const BELT_SCL = new THREE.Vector3();
const BELT_EULER = new THREE.Euler();
const BELT_AU: Vec3 = { x: 0, y: 0, z: 0 };

/**
 * Build the instanced field for one belt. Instance matrices are set on the
 * first `updateBeltField` call (buildScene does this immediately), so the
 * mesh starts at the origin for at most one frame. Also builds the far-LOD
 * point cloud (F6): same N positions, one draw call, no per-rock transform.
 */
export function buildBeltField(def: BeltDefinition): BeltField {
  const objects = sampleBelt(def);
  const n = objects.length;

  const mat = new THREE.MeshStandardMaterial({
    color: def.color,
    // A touch of emissive keeps the far side of each rock (and the whole
    // belt at long camera distances) readable against the dark space, so the
    // field reads as a belt rather than a scattering of near-black dots.
    // Kept LOW (0.05): the rocks are lit by the Sun lamp anyway — a higher
    // floor made the whole belt glow like it was self-illuminated.
    emissive: new THREE.Color(def.color).multiplyScalar(0.05),
    roughness: 0.85,
    metalness: 0,
    // The near representation cross-fades against the far point cloud, so the
    // rocks must be able to go translucent (F6 LOD).
    transparent: true,
  });
  const mesh = new THREE.InstancedMesh(ROCK_GEOMETRY, mat, n);
  mesh.name = def.name;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.frustumCulled = false; // instances span the whole belt

  // Per-instance brightness jitter around the base color.
  const base = new THREE.Color(def.color);
  const tmpColor = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const shade = 0.65 + 0.5 * objects[i].shade;
    tmpColor.copy(base).multiplyScalar(shade);
    mesh.setColorAt(i, tmpColor);
  }
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  // Far LOD: one point per object. Additive blending reads as glowing dust at
  // long range; size attenuation keeps the cloud's apparent extent honest.
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const shade = 0.65 + 0.5 * objects[i].shade;
    tmpColor.copy(base).multiplyScalar(shade);
    colors[i * 3] = tmpColor.r;
    colors[i * 3 + 1] = tmpColor.g;
    colors[i * 3 + 2] = tmpColor.b;
  }
  geo.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
  );
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pmat = new THREE.PointsMaterial({
    size: 1.5,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, pmat);
  points.name = def.name + ' (far)';
  points.frustumCulled = false;
  points.visible = false; // enabled by the LOD loop once a far view is requested

  return {
    def,
    mesh,
    points,
    objects,
    dispose: () => {
      mat.dispose();
      pmat.dispose();
      geo.dispose();
    },
  };
}

/**
 * Advance all instances of one belt to simulation time `tDays`.
 * Mirrors the planet path in scene.updatePositions: positionAt (AU) ->
 * ecliptic->scene mapping -> radial scale compression.
 *
 * Allocation-free: reuses module-level scratch (single-threaded loop).
 * Writes BOTH the instanced-rock matrices (near LOD) and the point-cloud
 * positions (far LOD) from the same solved positions — one Kepler pass
 * feeds both representations.
 */
export function updateBeltField(
  field: BeltField,
  tDays: number,
  scale: VisualScale,
  /** Rock size multiplier (visible-mode dots → sub-pixel at true scale). */
  sizeFactor = 1,
): void {
  const { objects, mesh } = field;
  const m = BELT_MATRIX;
  const pos = BELT_POS;
  const quat = BELT_QUAT;
  const scl = BELT_SCL;
  const euler = BELT_EULER;
  const p = BELT_AU;
  const pattr = field.points.geometry.getAttribute('position') as THREE.BufferAttribute;
  const parr = pattr.array as Float32Array;

  for (let i = 0; i < objects.length; i++) {
    const o = objects[i];
    positionAtInto(o.elements, tDays, p); // AU, ecliptic frame
    // ecliptic x -> -x, y -> -z, z (north) -> +y (same map as scene.ts)
    pos.set(-p.x, p.z, -p.y);
    const d = Math.hypot(p.x, p.y, p.z);
    const factor = scale.planetDistance(d) / Math.max(1e-9, d);
    pos.multiplyScalar(factor);

    euler.set(o.spin[0] + tDays * 0.05, o.spin[1], o.spin[2]);
    quat.setFromEuler(euler);
    scl.setScalar(Math.max(1e-6, o.size * sizeFactor));
    m.compose(pos, quat, scl);
    mesh.setMatrixAt(i, m);

    // Far LOD point cloud (same position, no transform).
    parr[i * 3] = pos.x;
    parr[i * 3 + 1] = pos.y;
    parr[i * 3 + 2] = pos.z;
  }
  mesh.instanceMatrix.needsUpdate = true;
  pattr.needsUpdate = true;
}

/**
 * F6 belt LOD: pick the near (rocks) vs far (points) representation for this
 * frame and cross-fade the two. `camDist` = camera distance from the origin,
 * `beltDist` = this belt's mean scene radius, `beltSizeFactor` folds in the
 * true-scale morph (at true scale the belt is sub-pixel → force far mode so
 * we don't render thousands of invisible rocks).
 *
 * Returns the active mode (for profiling/logging).
 */
export function applyBeltLod(
  field: BeltField,
  camDist: number,
  beltDist: number,
  beltSizeFactor: number,
): BeltLodMode {
  let decision = beltLod(camDist, beltDist);
  // At true scale the rocks are sub-pixel; the point cloud carries the belt.
  if (beltSizeFactor < 0.25) decision = { mode: 'far', blend: 0 };

  const { mesh, points } = field;
  const mat = mesh.material as THREE.MeshStandardMaterial;
  const pmat = points.material as THREE.PointsMaterial;

  mesh.visible = decision.blend > 0.02;
  points.visible = decision.blend < 0.98;
  mat.opacity = decision.blend;
  // The additive far cloud would double-brighten the belt at mid cross-fade;
  // the old 1.4× "compensation" actually PUSHED it past full brightness and
  // made the zoomed-out belt glow. At most ~half strength now, so the far
  // cloud reads as faint dust and the cross-fade dips slightly rather than
  // flaring.
  pmat.opacity = (1 - decision.blend) * 0.55;
  return decision.mode;
}
