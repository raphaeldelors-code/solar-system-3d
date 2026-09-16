/**
 * Real-texture support tests (plan 035 F3): URL contract, HEAD-probe caching,
 * multi-channel load, attach/swap + cloud shell. All fetch/loader calls are
 * injected fakes so the tests run in plain Node (three.js Texture objects
 * need no WebGL context).
 */
import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import {
  textureUrlFor,
  probeRealTexture,
  loadChannel,
  loadBodyTextures,
  loadRealTexture,
  attachRealTextures,
  createCloudShell,
  applyNightLights,
  resetProbeCache,
  resetRealTextureCache,
} from '../src/render/realTextures';
import type { SceneBody } from '../src/render/scene';
import type { BodyDefinition } from '../src/sim/types';

type FakeFetch = (url: string, init?: { method?: string }) => Promise<{ ok: boolean }>;

function okFetch(existing: Set<string>): FakeFetch {
  return (url) => Promise.resolve({ ok: existing.has(url) });
}

/** Minimal SceneBody stub: def, pivot, mesh, material are what attach reads. */
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
    orbitEmphasis: new THREE.Mesh(),
    ringsMesh: null,
    parent: null,
    spin: 0,
    worldPos: new THREE.Vector3(),
    sceneRadius: 1,
    visibleRadius: 1,
    trueRadius: 1,
    builtRadius: 1,
    cloudsMesh: null,
    frameExtent: 2,
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
  it('builds the public/textures/planets/<id>_<channel> contract', () => {
    expect(textureUrlFor('earth')).toBe('textures/planets/earth_day.jpg');
    expect(textureUrlFor('earth', 'normal')).toBe('textures/planets/earth_normal.jpg');
    expect(textureUrlFor('earth', 'roughness')).toBe('textures/planets/earth_roughness.jpg');
    expect(textureUrlFor('earth', 'clouds')).toBe('textures/planets/earth_clouds.png');
    expect(textureUrlFor('earth', 'night')).toBe('textures/planets/earth_night.png');
    expect(textureUrlFor('sun')).toBe('textures/planets/sun_day.jpg');
  });
});

describe('probeRealTexture', () => {
  it('is true only for existing files', async () => {
    const f = okFetch(new Set(['textures/planets/earth_day.jpg']));
    await expect(probeRealTexture('textures/planets/earth_day.jpg', f)).resolves.toBe(true);
    await expect(probeRealTexture('textures/planets/mars_day.jpg', f)).resolves.toBe(false);
  });

  it('treats network errors as "absent"', async () => {
    const f: FakeFetch = () => Promise.reject(new Error('offline'));
    await expect(probeRealTexture('textures/planets/venus_day.jpg', f)).resolves.toBe(false);
  });

  it('dedupes concurrent probes to a single request', async () => {
    let n = 0;
    const f: FakeFetch = () => {
      n += 1;
      return Promise.resolve({ ok: true });
    };
    const [a, b, c] = await Promise.all([
      probeRealTexture('textures/planets/jupiter_day.jpg', f),
      probeRealTexture('textures/planets/jupiter_day.jpg', f),
      probeRealTexture('textures/planets/jupiter_day.jpg', f),
    ]);
    expect([a, b, c]).toEqual([true, true, true]);
    expect(n).toBe(1);
  });
});

describe('loadChannel', () => {
  it('returns null when no file exists (no decode attempted)', async () => {
    const calls: string[] = [];
    const tex = await loadChannel('mars', 'day', fakeLoader(new Set(), calls));
    expect(tex).toBeNull();
    expect(calls).toEqual([]);
  });

  it('applies sRGB + horizontal wrap to day, NoColorSpace to normal', async () => {
    const existing = new Set([
      'textures/planets/earth_day.jpg',
      'textures/planets/earth_normal.jpg',
    ]);
    const calls: string[] = [];
    const loader = fakeLoader(existing, calls);
    const f = okFetch(existing);
    const day = await loadChannel('earth', 'day', loader, f);
    expect(day).not.toBeNull();
    expect(day!.colorSpace).toBe(THREE.SRGBColorSpace);
    expect(day!.wrapS).toBe(THREE.RepeatWrapping);
    const normal = await loadChannel('earth', 'normal', loader, f);
    expect(normal).not.toBeNull();
    expect(normal!.colorSpace).toBe(THREE.NoColorSpace);
    // Cache per (id, channel): second call returns the same instance.
    const day2 = await loadChannel('earth', 'day', loader, f);
    expect(day2).toBe(day);
    expect(calls).toEqual(['textures/planets/earth_day.jpg', 'textures/planets/earth_normal.jpg']);
  });

  it('returns null on decode failure without polluting the cache', async () => {
    const f = okFetch(new Set(['textures/planets/moon_day.jpg']));
    const badLoader = {
      load(_url: string, _on: unknown, _prog: unknown, onError: (e: unknown) => void) {
        onError(new Error('corrupt image'));
      },
    } as unknown as THREE.TextureLoader;
    expect(await loadChannel('moon', 'day', badLoader, f)).toBeNull();
    const good = fakeLoader(new Set(['textures/planets/moon_day.jpg']), []);
    expect(await loadChannel('moon', 'day', good, f)).not.toBeNull();
  });
});

describe('loadBodyTextures', () => {
  it('returns null when no day map exists', async () => {
    const f = okFetch(new Set());
    const loader = fakeLoader(new Set(), []);
    await expect(loadBodyTextures('venus', loader, f)).resolves.toBeNull();
  });

  it('loads day + normal + roughness + clouds in parallel when present', async () => {
    const existing = new Set([
      'textures/planets/earth_day.jpg',
      'textures/planets/earth_normal.jpg',
      'textures/planets/earth_roughness.jpg',
      'textures/planets/earth_clouds.png',
    ]);
    const calls: string[] = [];
    const loader = fakeLoader(existing, calls);
    const f = okFetch(existing);
    const t = await loadBodyTextures('earth', loader, f);
    expect(t).not.toBeNull();
    expect(t!.day).not.toBeNull();
    expect(t!.normal).not.toBeNull();
    expect(t!.roughness).not.toBeNull();
    expect(t!.clouds).not.toBeNull();
    // All four channels loaded.
    expect(calls.length).toBe(4);
  });

  it('loads the night channel when present (plan 044 A2)', async () => {
    const existing = new Set([
      'textures/planets/earth_day.jpg',
      'textures/planets/earth_night.png',
    ]);
    const loader = fakeLoader(existing, []);
    const f = okFetch(existing);
    const t = await loadBodyTextures('earth', loader, f);
    expect(t).not.toBeNull();
    expect(t!.night).not.toBeNull();
    // Night is a colour channel → sRGB (like the day map), not linear.
    expect(t!.night!.colorSpace).toBe(THREE.SRGBColorSpace);
  });
});

describe('applyNightLights', () => {
  it('injects a day/night terminator + night-lights emissive into the shader', () => {
    const mat = new THREE.MeshStandardMaterial();
    const night = new THREE.Texture();
    applyNightLights(mat, night);

    // A distinct program cache key so this material never collides with the
    // plain standard materials of the other bodies.
    expect(mat.customProgramCacheKey()).toBe('earth-night-lights');
    expect(typeof mat.onBeforeCompile).toBe('function');

    // Drive the callback with a fake shader and assert the injection landed.
    const shader = {
      uniforms: {} as Record<string, { value: unknown }>,
      vertexShader:
        '#include <common>\n#include <beginnormal_vertex>\n#include <begin_vertex>\n#include <worldpos_vertex>',
      fragmentShader: '#include <common>\n#include <emissivemap_fragment>',
    };
    mat.onBeforeCompile!(shader as never, {} as never);

    // Uniforms registered.
    expect(shader.uniforms.uNightMap.value).toBe(night);
    expect(shader.uniforms.uNightIntensity.value).toBeGreaterThan(0);

    // Vertex: world pos + world normal varyings computed from modelMatrix.
    expect(shader.vertexShader).toContain('varying vec3 vNLWorldPos;');
    expect(shader.vertexShader).toContain('varying vec3 vNLWorldNormal;');
    expect(shader.vertexShader).toContain('mat3( modelMatrix ) * objectNormal');

    // Fragment: night-lights gated by the sun-facing terminator.
    expect(shader.fragmentShader).toContain('uniform sampler2D uNightMap;');
    expect(shader.fragmentShader).toContain('normalize( -vNLWorldPos )');
    expect(shader.fragmentShader).toContain('smoothstep( -0.15, 0.15, dot( nlNormal, nlSunDir ) )');
    expect(shader.fragmentShader).toContain('totalEmissiveRadiance += nlNight.rgb');
  });
});

describe('createCloudShell', () => {
  it('creates a transparent sphere at radius +1.5 % as a child of the pivot', () => {
    const { entry } = stubBody('earth');
    const tex = new THREE.Texture();
    const { mesh, geo, mat } = createCloudShell(entry, tex, 1.0);
    expect(entry.pivot.children).toContain(mesh);
    expect(geo.parameters.radius).toBeCloseTo(1.015, 3);
    expect(mat.transparent).toBe(true);
    expect(mesh.castShadow).toBe(false);
    expect(mesh.receiveShadow).toBe(false);
  });
});

describe('attachRealTextures', () => {
  it('swaps only bodies that have a real day file; reports the count', async () => {
    const existing = new Set(['textures/planets/earth_day.jpg']); // mars absent
    const f = okFetch(existing);
    const calls: string[] = [];
    const loader = fakeLoader(existing, calls);
    const earth = stubBody('earth');
    const mars = stubBody('mars');
    let markedForUpdate = false;
    Object.defineProperty(earth.mat, 'needsUpdate', {
      set(v: boolean) {
        markedForUpdate = v;
      },
      configurable: true,
    });
    const applied = await attachRealTextures([earth.entry, mars.entry], loader, f);
    expect(applied).toBe(1);
    expect(earth.mat.map).not.toBeNull();
    expect(markedForUpdate).toBe(true);
    expect(mars.mat.map).toBeNull();
    // earth: only day channel exists → only one probe+load.
    expect(calls).toEqual(['textures/planets/earth_day.jpg']);
  });

  it('applies normal + roughness maps to a Standard material', async () => {
    const existing = new Set([
      'textures/planets/earth_day.jpg',
      'textures/planets/earth_normal.jpg',
      'textures/planets/earth_roughness.jpg',
    ]);
    const f = okFetch(existing);
    const loader = fakeLoader(existing, []);
    const { entry, mat } = stubBody('earth');
    await attachRealTextures([entry], loader, f);
    expect(mat.map).not.toBeNull();
    expect(mat.normalMap).not.toBeNull();
    expect(mat.roughnessMap).not.toBeNull();
    expect(mat.roughness).toBe(1.0);
  });

  it('wires the night-lights terminator when a night map is present (plan 044 A2)', async () => {
    const existing = new Set([
      'textures/planets/earth_day.jpg',
      'textures/planets/earth_night.png',
    ]);
    const f = okFetch(existing);
    const loader = fakeLoader(existing, []);
    const { entry, mat } = stubBody('earth');
    await attachRealTextures([entry], loader, f);
    // The night map is attached and the terminator shader is injected.
    expect(mat.onBeforeCompile).not.toBeNull();
    expect(mat.customProgramCacheKey()).toBe('earth-night-lights');
  });

  it('creates the Earth cloud shell once (idempotent on rebuild)', async () => {
    const existing = new Set([
      'textures/planets/earth_day.jpg',
      'textures/planets/earth_clouds.png',
    ]);
    const f = okFetch(existing);
    const loader = fakeLoader(existing, []);
    const { entry } = stubBody('earth');
    await attachRealTextures([entry], loader, f);
    expect(entry.cloudsMesh).not.toBeNull();
    const first = entry.cloudsMesh;
    // Second pass (scene rebuild): the cached cloud texture is re-attached,
    // but the shell is NOT re-created (same mesh instance).
    await attachRealTextures([entry], loader, f);
    expect(entry.cloudsMesh).toBe(first);
    expect(
      entry.pivot.children.filter((c) => (c as THREE.Mesh).name === `clouds:${entry.def.name}`),
    ).toHaveLength(1);
  });

  it('handles an empty body list', async () => {
    const f = okFetch(new Set());
    const loader = fakeLoader(new Set(), []);
    await expect(attachRealTextures([], loader, f)).resolves.toBe(0);
  });
});

describe('loadRealTexture (back-compat)', () => {
  it('delegates to the day channel', async () => {
    const existing = new Set(['textures/planets/earth_day.jpg']);
    const calls: string[] = [];
    const loader = fakeLoader(existing, calls);
    const f = okFetch(existing);
    const t = await loadRealTexture('earth', loader, f);
    expect(t).not.toBeNull();
    expect(calls).toEqual(['textures/planets/earth_day.jpg']);
  });
});
