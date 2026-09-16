/**
 * Optional real-surface textures (plan 035 F3).
 *
 * Real planet maps live in `public/textures/planets/`:
 *   <id>_day.jpg        diffuse map (sRGB)
 *   <id>_normal.jpg     normal map (linear)
 *   <id>_roughness.jpg  roughness map (linear) — Earth only
 *   <id>_clouds.png     animated cloud shell (sRGB alpha) — Earth only
 *   <id>_night.png      night-lights map (sRGB) — Earth only (plan 044 A2)
 *
 * At startup the app probes each channel with a HEAD request; any that
 * exist are loaded and swap over the matching material's procedural
 * texture. Bodies without a day map keep their procedural look — nothing
 * to configure per body. The Earth also gets a second transparent cloud
 * sphere that rotates ~5 % faster than the surface (the "living Earth").
 *
 * The probing logic is pure (injectable `fetch`) and unit-tested in Node;
 * only the final `TextureLoader` call touches the browser.
 */
import * as THREE from 'three';
import type { SceneBody } from './scene';

/** URL prefix for real texture files (served from Vite's `public/`). */
export const REAL_TEXTURE_BASE = 'textures/planets';

/** File suffix per texture channel. */
const CHANNEL_SUFFIX: Record<string, string> = {
  day: '_day.jpg',
  normal: '_normal.jpg',
  roughness: '_roughness.jpg',
  clouds: '_clouds.png',
  night: '_night.png',
};

export type TextureChannel = 'day' | 'normal' | 'roughness' | 'clouds' | 'night';

/** Deterministic URL for a body's texture channel. */
export function textureUrlFor(id: string, channel: TextureChannel = 'day'): string {
  return `${REAL_TEXTURE_BASE}/${id}${CHANNEL_SUFFIX[channel]}`;
}

type FetchLike = (url: string, init?: { method?: string }) => Promise<{ ok: boolean }>;

/** Probe cache: one in-flight or settled request per URL. */
const probeCache = new Map<string, Promise<boolean>>();

/**
 * Does a real texture exist at `url`? HEAD request; true only on 2xx.
 * Concurrent/late calls share one probe (deduped via `probeCache`).
 */
export function probeRealTexture(url: string, fetchImpl: FetchLike = fetch): Promise<boolean> {
  let cached = probeCache.get(url);
  if (!cached) {
    cached = fetchImpl(url, { method: 'HEAD' })
      .then((res) => res.ok)
      .catch(() => false);
    probeCache.set(url, cached);
  }
  return cached;
}

/** Clear the probe cache (tests). */
export function resetProbeCache(): void {
  probeCache.clear();
}

/** Decoded-texture cache: one `Texture` per (id, channel). */
const textureCache = new Map<string, THREE.Texture>();

/** Clear the decoded-texture cache (tests). */
export function resetRealTextureCache(): void {
  textureCache.clear();
}

/**
 * Load a single texture channel for a body, or null if absent / fails.
 * Results are cached per (id, channel) so scene rebuilds (scale toggles)
 * re-attach the same `Texture` instead of re-fetching and re-decoding.
 */
export async function loadChannel(
  id: string,
  channel: TextureChannel,
  loader: THREE.TextureLoader,
  fetchImpl: FetchLike = fetch,
): Promise<THREE.Texture | null> {
  const key = `${id}:${channel}`;
  const cached = textureCache.get(key);
  if (cached) return cached;
  const url = textureUrlFor(id, channel);
  if (!(await probeRealTexture(url, fetchImpl))) return null;
  const tex = await new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  }).catch(() => null);
  if (!tex) return null;
  // sRGB for color channels; linear (no colour-space conversion) for data
  // channels so the GPU reads them as raw values.
  tex.colorSpace =
    channel === 'normal' || channel === 'roughness' ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  textureCache.set(key, tex);
  return tex;
}

/** All texture channels for a body. */
export interface BodyTextures {
  day: THREE.Texture | null;
  normal: THREE.Texture | null;
  roughness: THREE.Texture | null;
  clouds: THREE.Texture | null;
  night: THREE.Texture | null;
}

/**
 * Load all available texture channels for a body.
 * Returns null if no day map exists (the anchor — without a day map the
 * other channels are useless). After day succeeds, normal/roughness/clouds
 * are loaded in parallel so a single body costs one round-trip.
 */
export async function loadBodyTextures(
  id: string,
  loader: THREE.TextureLoader,
  fetchImpl: FetchLike = fetch,
): Promise<BodyTextures | null> {
  const day = await loadChannel(id, 'day', loader, fetchImpl);
  if (!day) return null;
  const [normal, roughness, clouds, night] = await Promise.all([
    loadChannel(id, 'normal', loader, fetchImpl),
    loadChannel(id, 'roughness', loader, fetchImpl),
    loadChannel(id, 'clouds', loader, fetchImpl),
    loadChannel(id, 'night', loader, fetchImpl),
  ]);
  return { day, normal, roughness, clouds, night };
}

/**
 * Create an animated cloud shell: a transparent sphere at radius +1.5 %
 * with the cloud map. Added as a child of the body's pivot so it tilts
 * with the body. The mesh is NOT rotated here — `applySpin` drives it at
 * ~5 % of the surface rate (differential rotation).
 * Returns the mesh + its geometry/material for disposal.
 */
export function createCloudShell(
  entry: SceneBody,
  cloudTex: THREE.Texture,
  bodyRadius: number,
): { mesh: THREE.Mesh; geo: THREE.SphereGeometry; mat: THREE.MeshStandardMaterial } {
  const r = bodyRadius * 1.015;
  const geo = new THREE.SphereGeometry(r, 48, 32);
  const mat = new THREE.MeshStandardMaterial({
    map: cloudTex,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    roughness: 1,
    metalness: 0,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = `clouds:${entry.def.name}`;
  // Clouds are a visual overlay, not solid geometry: no shadow interaction.
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  entry.pivot.add(mesh);
  return { mesh, geo, mat };
}

/**
 * Attach real textures (when present) to the given scene bodies, swapping
 * each body's procedural maps in place. Also creates the Earth cloud shell
 * (first time only — idempotent on scene rebuilds). Resolves to the number
 * of bodies that received a real day map. Fire-and-forget from the app loop.
 */
export async function attachRealTextures(
  entries: Iterable<SceneBody>,
  loader: THREE.TextureLoader,
  fetchImpl: FetchLike = fetch,
): Promise<number> {
  let applied = 0;
  for (const entry of entries) {
    const id = entry.def.id;
    const texs = await loadBodyTextures(id, loader, fetchImpl);
    if (!texs) continue;
    const mat = entry.mesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
    // Day map (all bodies).
    mat.map = texs.day;
    // Normal + roughness maps (Standard materials only — the Sun is Basic).
    if (mat instanceof THREE.MeshStandardMaterial) {
      if (texs.normal) {
        mat.normalMap = texs.normal;
        mat.normalScale = new THREE.Vector2(0.8, 0.8);
      }
      if (texs.roughness) {
        mat.roughnessMap = texs.roughness;
        mat.roughness = 1.0; // let the map drive per-pixel roughness
      }
      // Night-lights terminator (Earth only, plan 044 A2): inject a day/night
      // blend + city-lights emissive into the standard material. Needs the day
      // map (texs.day, set above) so the vMapUv varying exists for the night UV.
      if (texs.night) {
        applyNightLights(mat, texs.night);
      }
    }
    mat.needsUpdate = true;
    applied += 1;
    // Cloud shell (Earth only; idempotent — skip if already created).
    if (texs.clouds && !entry.cloudsMesh) {
      const { mesh } = createCloudShell(entry, texs.clouds, entry.builtRadius);
      entry.cloudsMesh = mesh;
    }
  }
  return applied;
}

/**
 * Inject a day/night terminator + night-lights emissive into a body's
 * MeshStandardMaterial (plan 044 A2).
 *
 * The sun is a PointLight at the scene origin, so for any surface point the
 * sun direction is `normalize(-worldPos)` and the world normal is
 * `mat3(modelMatrix) * objectNormal`. Both are derived from `modelMatrix`,
 * which three.js updates every frame as the body orbits and spins — so the
 * terminator costs ZERO per-frame CPU work (no uniform updates, no JS).
 *
 * Night-lights are gated by the surface's facing to the sun via a soft
 * terminator (`smoothstep`), so city lights glow on the dark side and fade
 * out across the terminator into the lit side. The night map shares the day
 * map's equirect UV (`vMapUv`), so it is always registered to the same
 * longitude/latitude as the surface beneath it.
 *
 * @param mat   The body's MeshStandardMaterial. Must already have a day map
 *              (`mat.map`) so the `vMapUv` varying exists for the night UV.
 * @param night The night-lights texture (sRGB, same equirect UV as the day map).
 */
export function applyNightLights(mat: THREE.MeshStandardMaterial, night: THREE.Texture): void {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uNightMap = { value: night };
    shader.uniforms.uNightIntensity = { value: 1.8 };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
varying vec3 vNLWorldPos;
varying vec3 vNLWorldNormal;`,
      )
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
vNLWorldPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
vNLWorldNormal = normalize( mat3( modelMatrix ) * objectNormal );`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
varying vec3 vNLWorldPos;
varying vec3 vNLWorldNormal;
uniform sampler2D uNightMap;
uniform float uNightIntensity;`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
{
  vec3 nlNormal = normalize( vNLWorldNormal );
  vec3 nlSunDir = normalize( -vNLWorldPos );
  float nlDay = smoothstep( -0.15, 0.15, dot( nlNormal, nlSunDir ) );
  vec4 nlNight = texture2D( uNightMap, vMapUv );
  totalEmissiveRadiance += nlNight.rgb * ( 1.0 - nlDay ) * uNightIntensity;
}`,
      );
  };
  // Distinct program so this material's injected shader never collides with
  // the plain standard materials of the other bodies.
  mat.customProgramCacheKey = () => 'earth-night-lights';
}

/**
 * Backward-compat: load a single day-map texture for a body (old API).
 * Delegates to `loadChannel(id, 'day', …)`.
 */
export async function loadRealTexture(
  id: string,
  loader: THREE.TextureLoader,
  fetchImpl: FetchLike = fetch,
): Promise<THREE.Texture | null> {
  return loadChannel(id, 'day', loader, fetchImpl);
}
