/**
 * Real-texture support tests: URL contract, HEAD-probe caching, and
 * attach/swap behaviour. All fetch/loader calls are injected fakes so the
 * tests run in plain Node (three.js Texture objects need no WebGL context).
 */
import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import {
  textureUrlFor, probeRealTexture, loadRealTexture, attachRealTextures,
  resetProbeCache, resetRealTextureCache,
} from '../src/render/realTextures';
import type { SceneBody } from '../src/render/scene';
import type { BodyDefinition } from '../src/sim/types';

type FakeFetch = (url: string, init?: { method?: string }) => Promise<{ ok: boolean }>;

function okFetch(existing: Set<string>): FakeFetch {
  return (url) =>
    Promise.resolve({ ok: existing.has(url) });
}

/** Minimal SceneBody stub: only def.id and mesh.material are read. */
function stubBody(id: string): { entry: SceneBody; mat: THREE.MeshStandardMaterial } {
  const def = { id, name: id.toUpperCase(), kind: 'planet' } as unknown as BodyDefinition;
  const mat = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), mat);
  const entry = {
    def,
    pivot: new THREE.Group(),
    mesh,
    label: new THREE.Sprite(),
    orbit: null,
    parent: null,
    spin: 0,
    worldPos: new THREE.Vector3(),
  } as unknown as SceneBody;
  return { entry, mat };
}

function fakeLoader(existing: Set<string>, calls: string[]) {
  const loader = {
    load(url: string, onLoad: (t: THREE.Texture) => void) {
      calls.push(url);
      if (existing.has(url)) {
        const tex = new THREE.Texture();
        tex.image = { width: 2, height: 1 };
        onLoad(tex);
      } else {
        throw new Error('fake decode failure');
      }
    },
  };
  return loader as unknown as THREE.TextureLoader;
}

beforeEach(() => {
  resetProbeCache();
  resetRealTextureCache();
});

describe('textureUrlFor', () => {
  it('builds the public/textures/<id>.jpg contract', () => {
    expect(textureUrlFor('earth')).toBe('textures/earth.jpg');
    expect(textureUrlFor('sun')).toBe('textures/sun.jpg');
  });
});

describe('probeRealTexture', () => {
  it('is true only for existing files', async () => {
    const f = okFetch(new Set(['textures/earth.jpg']));
    await expect(probeRealTexture('textures/earth.jpg', f)).resolves.toBe(true);
    await expect(probeRealTexture('textures/mars.jpg', f)).resolves.toBe(false);
  });

  it('treats network errors as "absent"', async () => {
    const f: FakeFetch = () => Promise.reject(new Error('offline'));
    await expect(probeRealTexture('textures/venus.jpg', f)).resolves.toBe(false);
  });

  it('dedupes concurrent probes to a single request', async () => {
    let n = 0;
    const f: FakeFetch = () => { n += 1; return Promise.resolve({ ok: true }); };
    const [a, b, c] = await Promise.all([
      probeRealTexture('textures/jupiter.jpg', f),
      probeRealTexture('textures/jupiter.jpg', f),
      probeRealTexture('textures/jupiter.jpg', f),
    ]);
    expect([a, b, c]).toEqual([true, true, true]);
    expect(n).toBe(1);
  });
});

describe('loadRealTexture', () => {
  it('returns null when no file exists (no decode attempted)', async () => {
    const calls: string[] = [];
    const tex = await loadRealTexture('mars', fakeLoader(new Set(), calls));
    expect(tex).toBeNull();
    expect(calls).toEqual([]);
  });

  it('applies sRGB + horizontal wrap and caches per id', async () => {
    const existing = new Set(['textures/earth.jpg']);
    const calls: string[] = [];
    const loader = fakeLoader(existing, calls);
    const f = okFetch(existing);
    const t1 = await loadRealTexture('earth', loader, f);
    expect(t1).not.toBeNull();
    expect(t1!.colorSpace).toBe(THREE.SRGBColorSpace);
    expect(t1!.wrapS).toBe(THREE.RepeatWrapping);
    // Second call: same texture instance, no re-decode.
    const t2 = await loadRealTexture('earth', loader, f);
    expect(t2).toBe(t1);
    expect(calls).toEqual(['textures/earth.jpg']);
  });

  it('returns null on decode failure without polluting the cache', async () => {
    // Probe succeeds (HEAD 200) but the loader rejects.
    const f = okFetch(new Set(['textures/moon.jpg']));
    const badLoader = {
      load(_url: string, _on: unknown, _prog: unknown, onError: (e: unknown) => void) {
        onError(new Error('corrupt image'));
      },
    } as unknown as THREE.TextureLoader;
    expect(await loadRealTexture('moon', badLoader, f)).toBeNull();
    // A working loader now succeeds and is actually consulted.
    const good = fakeLoader(new Set(['textures/moon.jpg']), []);
    expect(await loadRealTexture('moon', good, f)).not.toBeNull();
  });
});

describe('attachRealTextures', () => {
  it('swaps only bodies that have a real file; reports the count', async () => {
    const existing = new Set(['textures/earth.jpg']); // mars absent
    const f = okFetch(existing);
    const calls: string[] = [];
    const loader = fakeLoader(existing, calls);
    const earth = stubBody('earth');
    const mars = stubBody('mars');
    // needsUpdate is a setter-only accessor in this three.js version (no
    // getter), so intercept the set to assert it was marked for recompile.
    let markedForUpdate = false;
    Object.defineProperty(earth.mat, 'needsUpdate', {
      set(v: boolean) { markedForUpdate = v; },
      configurable: true,
    });
    const applied = await attachRealTextures([earth.entry, mars.entry], loader, f);
    expect(applied).toBe(1);
    expect(earth.mat.map).not.toBeNull();
    expect(markedForUpdate).toBe(true);
    expect(mars.mat.map).toBeNull();
    expect(calls).toEqual(['textures/earth.jpg']);
  });

  it('handles an empty body list', async () => {
    const f = okFetch(new Set());
    const loader = fakeLoader(new Set(), []);
    await expect(attachRealTextures([], loader, f)).resolves.toBe(0);
  });
});
