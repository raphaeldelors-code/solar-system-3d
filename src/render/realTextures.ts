/**
 * Optional real-surface textures.
 *
 * Drop public-domain images (e.g. from NASA) into `public/textures/` named
 * `<bodyId>.jpg` (e.g. `earth.jpg`, `moon.jpg`). At startup the app probes
 * each body's URL with a HEAD request; any that exist are loaded and swap
 * over the matching material's procedural texture. Bodies without a file
 * keep their procedural look — nothing to configure per body.
 *
 * The probing logic is pure (injectable `fetch`) and unit-tested in Node;
 * only the final `TextureLoader` call touches the browser.
 */
import * as THREE from 'three';
import type { SceneBody } from './scene';

/** URL prefix for real texture files (served from Vite's `public/`). */
export const REAL_TEXTURE_BASE = 'textures';

/** Deterministic URL for a body's real texture file. */
export function textureUrlFor(id: string): string {
  return `${REAL_TEXTURE_BASE}/${id}.jpg`;
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

/** Decoded-texture cache: one `Texture` per body id for the page's lifetime. */
const textureCache = new Map<string, THREE.Texture>();

/** Clear the decoded-texture cache (tests). */
export function resetRealTextureCache(): void {
  textureCache.clear();
}

/**
 * Load the real texture for a body, or null if none exists / it fails.
 * Results are cached per id so scene rebuilds (scale toggles) re-attach the
 * same `Texture` instead of re-fetching and re-decoding. sRGB + horizontal
 * wrap, matching the procedural textures' setup.
 */
export async function loadRealTexture(
  id: string,
  loader: THREE.TextureLoader,
  fetchImpl: FetchLike = fetch,
): Promise<THREE.Texture | null> {
  const cached = textureCache.get(id);
  if (cached) return cached;
  const url = textureUrlFor(id);
  if (!(await probeRealTexture(url, fetchImpl))) return null;
  const tex = await new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  }).catch(() => null);
  if (!tex) return null;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  textureCache.set(id, tex);
  return tex;
}

/**
 * Attach real textures (when present) to the given scene bodies, swapping
 * each body's procedural map in place. Resolves to the number of bodies
 * that received a real texture. Fire-and-forget from the app loop.
 */
export async function attachRealTextures(
  entries: Iterable<SceneBody>,
  loader: THREE.TextureLoader,
  fetchImpl: FetchLike = fetch,
): Promise<number> {
  let applied = 0;
  for (const entry of entries) {
    const tex = await loadRealTexture(entry.def.id, loader, fetchImpl);
    if (!tex) continue;
    const mat = entry.mesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
    mat.map = tex;
    mat.needsUpdate = true;
    applied += 1;
  }
  return applied;
}
