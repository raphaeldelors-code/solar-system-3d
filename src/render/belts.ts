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
import { positionAt } from '../sim/kepler';
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

/**
 * Build the instanced field for one belt. Instance matrices are set on the
 * first `updateBeltField` call (buildScene does this immediately), so the
 * mesh starts at the origin for at most one frame.
 */
export function buildBeltField(def: BeltDefinition): BeltField {
  const objects = sampleBelt(def);

  const mat = new THREE.MeshStandardMaterial({
    color: def.color,
    roughness: 0.95,
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
 */
export function updateBeltField(field: BeltField, tDays: number, scale: VisualScale): void {
  const { objects, mesh, def } = field;
  const m = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const scl = new THREE.Vector3();
  const euler = new THREE.Euler();

  for (let i = 0; i < objects.length; i++) {
    const o = objects[i];
    const p = positionAt(o.elements, tDays); // AU, ecliptic frame
    // ecliptic x -> -x, y -> -z, z (north) -> +y (same map as scene.ts)
    pos.set(-p.x, p.z, -p.y);
    const d = Math.hypot(p.x, p.y, p.z);
    const factor = scale.planetDistance(d) / Math.max(1e-9, d);
    pos.multiplyScalar(factor);

    euler.set(o.spin[0] + tDays * 0.05, o.spin[1], o.spin[2]);
    quat.setFromEuler(euler);
    scl.setScalar(o.size);
    m.compose(pos, quat, scl);
    mesh.setMatrixAt(i, m);
  }
  mesh.instanceMatrix.needsUpdate = true;
  void def;
}
