/**
 * Fresnel atmosphere glow (plan 035 F4).
 *
 * A slightly-larger sphere shell around a body, using a custom additive
 * shader that is bright at the rim (view-tangent) and fades to transparent
 * toward the disc centre - the classic "scattering rim" that makes planets
 * read as 3D + atmospheric rather than flat balls.
 *
 * Pure helpers (`atmosphereStrength`, `buildShell`) are exported so the math
 * is unit-testable without a WebGL context. The shader is `toneMapped:false`
 * so it stays crisp through F1's ACES pipeline, and `AdditiveBlending` +
 * `depthWrite:false` so the rim never occludes the planet or each other.
 */
import * as THREE from 'three';

/**
 * Rim strength as a function of the view-angle cosine at a surface point.
 * `nDotView` is the dot of the surface normal with the (toward-camera) view
 * direction, in [-1,1]. Strength peaks as the point turns to the rim
 * (nDotView -> 0) and vanishes head-on (nDotView -> 1) and behind (-> -1).
 * Pure + deterministic for tests.
 */
export function atmosphereStrength(nDotView: number, power: number, base: number): number {
  // Front-face domain only (BackSide is culled by FrontSide). rim = 1 - nDotView
  // is 1 at the silhouette (normal perpendicular to view) and 0 head-on; pow()
  // concentrates it into a thin bright limb. The back face never renders, so
  // nDotView < 0 is irrelevant on screen (clamped to 0 here for a defined value).
  const rim = Math.max(0, 1 - Math.max(0, nDotView));
  const shaped = Math.pow(rim, power);
  // A small floor so the whole front disc has a faint haze, strongest at rim.
  return base + shaped * (1 - base);
}

const VERT = /* glsl */ `
  varying float vNdotView;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(-mvPosition.xyz);
    vec3 nrm = normalize(normalMatrix * normal);
    vNdotView = dot(nrm, viewDir);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uBase;
  uniform float uPower;
  uniform float uIntensity;
  varying float vNdotView;
  void main() {
    // Front-limb rim: 1 - nDotView is 1 at the silhouette, 0 head-on. BackSide
    // is culled (FrontSide), so the back face never renders. pow concentrates
    // it into a thin bright limb hugging the planet's edge.
    float rim = max(0.0, 1.0 - max(0.0, vNdotView));
    float shaped = pow(rim, uPower);
    float a = (uBase + shaped * (1.0 - uBase)) * uIntensity;
    // Slight lift of the colour toward white at the brightest rim for a
    // "scattering" hot edge (like real planetary limb brightening).
    vec3 col = mix(uColor, vec3(1.0), shaped * 0.35);
    gl_FragColor = vec4(col, a);
  }
`;

export interface AtmosphereShell extends THREE.Mesh {
  disposeAtmosphere(): void;
}

/**
 * Per-body atmosphere tint + tuning (plan 035 F4). Only bodies with a real
 * atmosphere get a shell; the tint is the scattering colour, `power` sets rim
 * thickness (higher = thinner rim), `intensity` the overall brightness.
 * Earth = vivid blue, Venus = thick yellowish, Mars = thin red, gas/ice
 * giants = their characteristic haze. Sun/Moon have none.
 */
export const ATMOSPHERE_TINTS: Record<
  string,
  { tint: [number, number, number]; power: number; intensity: number }
> = {
  earth: { tint: [0.35, 0.6, 1.0], power: 3.0, intensity: 1.0 },
  venus: { tint: [1.0, 0.82, 0.55], power: 2.6, intensity: 0.95 },
  mars: { tint: [1.0, 0.55, 0.35], power: 4.0, intensity: 0.4 }, // thin
  jupiter: { tint: [0.95, 0.8, 0.6], power: 3.2, intensity: 0.55 },
  saturn: { tint: [1.0, 0.9, 0.65], power: 3.2, intensity: 0.5 },
  uranus: { tint: [0.6, 0.85, 0.95], power: 3.2, intensity: 0.6 },
  neptune: { tint: [0.35, 0.5, 0.95], power: 3.2, intensity: 0.6 },
};

/** True if a body should have an atmosphere shell; returns its tint config. */
export function atmosphereConfigFor(id: string) {
  return ATMOSPHERE_TINTS[id] ?? null;
}

/**
 * Build an atmosphere shell for a body of radius `radius`. `tint` is the
 * atmosphere colour (e.g. Earth blue, Venus yellowish). Returns a `Mesh`
 * (sphere, radius*1.06) with an additive fresnel ShaderMaterial.
 * `power` sharper => thinner rim; `intensity` overall brightness.
 */
export function buildShell(
  radius: number,
  tint: [number, number, number],
  opts?: { power?: number; intensity?: number; base?: number },
): AtmosphereShell {
  const power = opts?.power ?? 3.2;
  const intensity = opts?.intensity ?? 0.9;
  const base = opts?.base ?? 0.08;
  const geo = new THREE.SphereGeometry(radius * 1.06, 48, 32);
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uColor: { value: new THREE.Color(...tint) },
      uBase: { value: base },
      uPower: { value: power },
      uIntensity: { value: intensity },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    depthWrite: false,
  });
  // toneMapped is not a ShaderMaterial property; ensure it renders through
  // the HDR pipeline without being re-toned.
  (mat as unknown as { toneMapped?: boolean }).toneMapped = false;
  const mesh = new THREE.Mesh(geo, mat) as unknown as AtmosphereShell;
  mesh.renderOrder = 2;
  mesh.frustumCulled = false;
  mesh.name = 'atmosphere';
  mesh.disposeAtmosphere = () => {
    geo.dispose();
    mat.dispose();
  };
  return mesh;
}
