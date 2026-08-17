/**
 * Point-light shadow configuration for the Sun.
 *
 * Kept in its own module (and free of DOM/scene-graph dependencies) so the
 * invariants are unit-testable in Node: three.js lights/meshes construct
 * fine without a WebGL context.
 *
 * Shadow-cube coverage: `far` must reach the farthest shadow-casting body
 * in BOTH visual scales — in TRUE_SCALE the Kuiper belt extends to ~50 AU
 * (1 scene unit = 1 AU); in VISIBLE_SCALE the farthest body (Eris apoapsis)
 * is ~135 units, so the cube shadow camera must reach at least that far.
 * 140 covers both with margin.
 */
import * as THREE from 'three';

export const SUN_SHADOWS = {
  /** Shadow-cube resolution per face (6 faces for a point light). */
  mapSize: 2048,
  /** Near plane; well inside the smallest body (Sun in TRUE_SCALE ≈ 0.005). */
  near: 0.05,
  /** Default far plane; see module note. */
  far: 140,
  /** Negative bias lifts shadows off occluder surfaces (avoids acne). */
  bias: -0.0004,
  /** Pushes the shadow along the surface normal (scene units). */
  normalBias: 0.02,
};

/** Turn the Sun's point light into a shadow caster. */
export function configureSunShadows(
  sunLight: THREE.PointLight,
  maxDistance: number = SUN_SHADOWS.far,
): void {
  sunLight.castShadow = true;
  const sh = sunLight.shadow;
  sh.mapSize.set(SUN_SHADOWS.mapSize, SUN_SHADOWS.mapSize);
  sh.camera.near = SUN_SHADOWS.near;
  sh.camera.far = maxDistance;
  sh.bias = SUN_SHADOWS.bias;
  sh.normalBias = SUN_SHADOWS.normalBias;
}

/**
 * Shadow flags for a body mesh. The star is the light source itself: it
 * must NOT cast (a sphere centered on a point light occludes the whole
 * scene in the shadow pass) and never receives.
 */
export function setBodyShadowFlags(mesh: THREE.Mesh, isEmitter: boolean): void {
  mesh.castShadow = !isEmitter;
  mesh.receiveShadow = !isEmitter;
}
