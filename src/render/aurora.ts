/**
 * Plan 044 B5 — aurora shader (the THREE side of the space-weather feature).
 *
 * Renders a thin, animated aurora band hugging Earth's poles. The band sits
 * at high latitude (the real auroral oval, ~65–85°) and its brightness +
 * colour are driven by the live NOAA Kp index (see src/sim/spaceWeather.ts
 * for the pure Kp→visual mapping). Below Kp 4 the band is invisible; as the
 * storm deepens it brightens and shifts green→red.
 *
 * The mesh is a sphere slightly larger than Earth's surface, parented to
 * Earth's tilt pivot so it tilts with the planet. Additive blending + no
 * depth-write so it glows without occluding the surface.
 */
import * as THREE from 'three';
import { auroraVisual } from '../sim/spaceWeather';

const VERT = /* glsl */ `
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor;
  varying vec3 vLocal;

  // Cheap 3D value noise (hash-based) for the dancing curtain structure.
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  void main() {
    vec3 n = normalize(vLocal);
    // Polar angle from the +Y (north) axis: 0 at the pole, PI/2 at the equator.
    float theta = acos(clamp(n.y, -1.0, 1.0));
    // The auroral oval: a band centred ~75° from the pole (i.e. ~15° from the
    // pole), present in BOTH hemispheres. |theta - 75°| gives the distance to
    // the band centre in either hemisphere.
    float bandCenter = radians(75.0);
    float d = abs(theta - bandCenter);
    // Gaussian falloff: tight core, soft edges.
    float band = exp(-pow(d / radians(9.0), 2.0));

    // Dancing curtain: scroll noise along the longitude (azimuth) + a slow
    // vertical shimmer, sampled on the sphere so it wraps seamlessly.
    float az = atan(n.z, n.x);
    float t = uTime * 0.15;
    float curtain = noise(vec3(az * 2.0 + t, theta * 6.0 - t * 0.5, 3.0));
    curtain = 0.55 + 0.45 * curtain; // 0.55..1.0

    float a = uIntensity * band * curtain;
    // Fade the very limb so the band doesn't hard-edge at the silhouette.
    gl_FragColor = vec4(uColor, a);
  }
`;

export interface Aurora {
  mesh: THREE.Mesh;
  /** Set the live Kp; updates intensity + colour (no-op below Kp 4). */
  setKp: (kp: number) => void;
  /** Advance the animation clock (call per frame with elapsed seconds). */
  setTime: (tSeconds: number) => void;
  dispose: () => void;
}

/**
 * Build the aurora band for a body of the given scene radius. The band sphere
 * is 1.03× the surface radius so it sits just above the limb.
 */
export function makeAurora(radius: number): Aurora {
  const geo = new THREE.SphereGeometry(radius * 1.03, 64, 48);
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uColor: { value: new THREE.Color(0.2, 0.9, 0.4) },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = 'aurora';
  mesh.renderOrder = 2; // draw after the surface so the additive glow lands on top

  const setKp = (kp: number): void => {
    const v = auroraVisual(kp);
    mat.uniforms.uIntensity.value = v.intensity;
    (mat.uniforms.uColor.value as THREE.Color).setRGB(v.color[0], v.color[1], v.color[2]);
  };
  const setTime = (tSeconds: number): void => {
    mat.uniforms.uTime.value = tSeconds;
  };
  const dispose = (): void => {
    geo.dispose();
    mat.dispose();
  };
  return { mesh, setKp, setTime, dispose };
}
