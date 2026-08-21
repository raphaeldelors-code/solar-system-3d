/**
 * Belt rendering: one THREE.InstancedMesh per belt population.
 *
 * All three.js / DOM code lives here (src/render invariants). The object
 * *data* (deterministic elements) comes from `src/data/belts.ts`; the
 * positions come from the same Kepler solver as planets.
 *
 * Per-frame cost: N Kepler solves + N matrix compositions per belt.
 * ~2k instances total is comfortably 60 fps on ordinary hardware.
 */
import * as THREE from 'three';
import type { BeltDefinition, BeltObject } from '../data/belts';
import { sampleBelt } from '../data/belts';
import { positionAtInto } from '../sim/kepler';
import type { Vec3 } from '../sim/kepler';
import type { VisualScale } from './scene';

export interface BeltField {
  def: BeltDefinition;
  /** Instanced mesh added to the scene. */
  mesh: THREE.InstancedMesh;
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
 * mesh starts at the origin for at most one frame.
 */
export function buildBeltField(def: BeltDefinition): BeltField {
  const objects = sampleBelt(def);

  const mat = new THREE.MeshStandardMaterial({
    color: def.color,
    // A touch of emissive keeps the far side of each rock (and the whole
    // belt at long camera distances) readable against the dark space, so the
    // field reads as a belt rather than a scattering of near-black dots.
    emissive: new THREE.Color(def.color).multiplyScalar(0.12),
    roughness: 0.85,
    metalness: 0,
  });
  const mesh = new THREE.InstancedMesh(ROCK_GEOMETRY, mat, objects.length);
  mesh.name = def.name;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.frustumCulled = false; // instances span the whole belt

  // Per-instance brightness jitter around the base color.
  const base = new THREE.Color(def.color);
  const tmpColor = new THREE.Color();
  for (let i = 0; i < objects.length; i++) {
    const shade = 0.65 + 0.5 * objects[i].shade;
    tmpColor.copy(base).multiplyScalar(shade);
    mesh.setColorAt(i, tmpColor);
  }
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  return { def, mesh, objects, dispose: () => mat.dispose() };
}

/**
 * Advance all instances of one belt to simulation time `tDays`.
 * Mirrors the planet path in scene.updatePositions: positionAt (AU) ->
 * ecliptic->scene mapping -> radial scale compression.
 *
 * Allocation-free: reuses module-level scratch (single-threaded loop).
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
  }
  mesh.instanceMatrix.needsUpdate = true;
}
