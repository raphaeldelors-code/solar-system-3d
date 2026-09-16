/**
 * HDR post-processing stack + sun corona (plan 035 F1).
 *
 * The scene is rendered into a HalfFloat render target (real HDR headroom),
 * bright sources (the sun, specular rims) bloom through UnrealBloomPass,
 * SMAA re-antialiases (the composer's RT has no MSAA), and OutputPass applies
 * ACES filmic tone mapping + sRGB at the very end — the canonical three.js
 * bloom chain. OutputPass reads this renderer state:
 *   renderer.toneMapping        = ACESFilmicToneMapping
 *   renderer.toneMappingExposure ≈ 1.15
 *   renderer.outputColorSpace   = SRGBColorSpace
 * The WebGLRenderer keeps antialias:true so the `?post=0` direct-to-canvas
 * fallback path stays MSAA-smooth; the composer RT path is AA'd by SMAA.
 *
 * The sun corona is a SEPARATE additive billboard (buildSunGlow), not a
 * shader on the sun mesh, so it cannot perturb the star's shadow behaviour.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

export interface PostStack {
  composer: EffectComposer;
  /** Resize all passes to a new CSS pixel size (dpr applied internally). */
  setSize: (w: number, h: number) => void;
  dispose: () => void;
}

/** Build the HDR→bloom→SMAA→Output chain and set the renderer for it. */
export function buildPostStack(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  width: number,
  height: number,
): PostStack {
  // OutputPass reads these for the final tone-map/sRGB stage.
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // HalfFloat target = true HDR headroom so the sun's >1.0 brightness survives
  // into the bloom pass instead of being pre-clamped to 1.0 (no bloom).
  // Built at the real viewport size (× pixel ratio): the EffectComposer
  // caches _width/_height from the constructor target, and setSize()/
  // setPixelRatio() rescale FROM those cached values — a 1×1 seed would
  // silently keep every pass at 1×1 (see the EffectComposer ctor).
  const pr0 = renderer.getPixelRatio();
  const target = new THREE.WebGLRenderTarget(
    Math.max(1, Math.round(width * pr0)),
    Math.max(1, Math.round(height * pr0)),
    {
      type: THREE.HalfFloatType,
      colorSpace: THREE.NoColorSpace,
    },
  );
  const composer = new EffectComposer(renderer, target);
  composer.setPixelRatio(pr0);
  composer.setSize(width, height);
  composer.addPass(new RenderPass(scene, camera));

  // Conservative bloom: threshold high enough that only the sun's core and
  // the corona center exceed it, strength low enough that the wide blur
  // (radius) never lifts the black sky to a visible floor, radius kept
  // modest so the glow stays local. Tuned 2026-09-12 against the overview
  // + follow-sun views (whole-scene wash-out was the failure mode at
  // strength 0.55 / radius 0.7 / threshold 0.92; a second pass tightened
  // radius further after the 10x/7x corona still lit half the frame).
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.32, 0.3, 0.96);
  composer.addPass(bloom);

  // MSAA was disabled on the renderer, so re-antialias here.
  const smaa = new SMAAPass(width, height);
  composer.addPass(smaa);

  // Final ACES + sRGB. Must be the last pass.
  composer.addPass(new OutputPass());

  const setSize = (w: number, h: number): void => {
    const pr = renderer.getPixelRatio();
    bloom.resolution.set(w * pr, h * pr);
    composer.setPixelRatio(pr);
    composer.setSize(w, h);
  };

  const dispose = (): void => {
    composer.dispose();
    target.dispose();
  };

  return { composer, setSize, dispose };
}

// ---------------------------------------------------------------------------
// Sun corona / glow
// ---------------------------------------------------------------------------

let cachedGlowTex: THREE.Texture | null = null;

/** Build (once) the radial corona texture: white core → orange → transparent. */
function makeCoronaTexture(): THREE.Texture {
  if (cachedGlowTex) return cachedGlowTex;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const c = size / 2;
  const g = ctx.createRadialGradient(c, c, 0, c, c, c);
  // Steep falloff: the sprite extends ~4.5x the disc, and its outer half
  // must contribute almost nothing, otherwise the additive halo lifts the
  // whole viewport to a visible orange floor (measured 2026-09-12:
  // overview mean 180/255 at 10x scale + shallow falloff; still ~95/255
  // at 7x — hence the steeper curve + smaller sprite).
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.1, 'rgba(255,248,224,0.9)');
  g.addColorStop(0.2, 'rgba(255,214,140,0.5)');
  g.addColorStop(0.35, 'rgba(255,170,80,0.18)');
  g.addColorStop(0.55, 'rgba(230,80,20,0.04)');
  g.addColorStop(0.8, 'rgba(180,50,10,0.008)');
  g.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedGlowTex = tex;
  return tex;
}

export interface SunGlow {
  /** The corona sprite — position it (sun sits at the origin) and set visible. */
  sprite: THREE.Sprite;
  dispose: () => void;
}

/**
 * Create the sun glow sprite. `radius` is the visible disc radius; the sprite
 * is ~4.5x that so the halo reads at distance. Additive, always faces camera,
 * depth-test on (planets in front occlude it), depth-write off (no z-fight).
 */
export function buildSunGlow(radius: number): SunGlow {
  const tex = makeCoronaTexture();
  const mat = new THREE.SpriteMaterial({
    map: tex,
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
    transparent: true,
    // The sun shader (buildSunShaderMaterial) now carries the bright core +
    // granulation; the sprite is the wide halo only. 0.6 keeps the halo from
    // washing the sky (the shader's HDR core + bloom do the "bright" work).
    opacity: 0.6,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(radius * 4.5, radius * 4.5, 1);
  sprite.name = 'sun-glow';
  sprite.renderOrder = 2;
  return {
    sprite,
    dispose: () => {
      mat.dispose();
      if (cachedGlowTex === tex) {
        tex.dispose();
        cachedGlowTex = null;
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Sun surface shader (plan 044 A1)
// ---------------------------------------------------------------------------
//
// Replaces the flat MeshBasicMaterial sun disc with a real photosphere:
//   * animated FBM granulation (the churning surface),
//   * limb darkening (the disc is dimmer + redder at the edge, like the real
//     Sun — the single biggest "it's a flat disc" tell),
//   * an HDR-hot core (values > 1.0) that feeds the existing UnrealBloomPass,
//     so the limb glows through the post stack instead of a hard edge.
//
// The material is `toneMapped: false` (a ShaderMaterial is not auto-tonemapped
// by the renderer) and `fog: false`. It is NOT transparent — it is an opaque
// disc, so it occludes correctly and the additive corona sprite (renderOrder 2)
// paints over it. `uTime` is driven per-frame from main.ts (wall-clock seconds)
// so the granulation is smooth and independent of sim speed/direction.

const SUN_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const SUN_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  // --- value noise + FBM (cheap, no texture fetch) -------------------------
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float a = 0.5;
    float s = 0.0;
    for (int i = 0; i < 5; i++) {
      s += a * vnoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return s;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);
    float mu = clamp(dot(n, v), 0.0, 1.0); // 1 at disc centre, 0 at limb

    // Churning granulation: 3D noise over the surface, drifting slowly in
    // time. Two octaves of the FBM give the mottled cell structure.
    float g = fbm(n * 4.0 + vec3(0.0, uTime * 0.03, uTime * 0.02));
    g += 0.5 * fbm(n * 9.0 - vec3(uTime * 0.05, 0.0, uTime * 0.04));
    g = clamp(g, 0.0, 1.0);

    // Photosphere colour ramp: deep orange in the granulation troughs to a
    // near-white hot peak. Values exceed 1.0 so the core blooms.
    vec3 deep = vec3(1.0, 0.42, 0.06);
    vec3 mid  = vec3(1.0, 0.72, 0.28);
    vec3 hot  = vec3(1.0, 0.96, 0.82) * 1.7;
    vec3 col = mix(deep, mid, smoothstep(0.35, 0.65, g));
    col = mix(col, hot, smoothstep(0.65, 0.95, g));

    // Limb darkening: a real star is dimmest at the edge. mu^0.6 gives a
    // gentle falloff; the limb also shifts cooler (toward orange).
    float ld = pow(mu, 0.6);
    col *= mix(0.55, 1.0, ld);
    col = mix(col * vec3(1.0, 0.82, 0.6), col, ld);

    // Hot limb rim: a thin bright ring right at the edge (the chromosphere)
    // that blooms into the halo.
    float rim = smoothstep(0.0, 0.12, 1.0 - mu) * (1.0 - smoothstep(0.12, 0.3, 1.0 - mu));
    col += vec3(1.0, 0.55, 0.2) * rim * 1.3;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export interface SunShader {
  /** The opaque sun-surface material — assign it to the sun mesh. */
  material: THREE.ShaderMaterial;
  /** Advance the granulation animation (wall-clock seconds). */
  setTime: (tSeconds: number) => void;
  dispose: () => void;
}

/**
 * Build the animated sun-surface material. Assign the returned `material` to
 * the sun mesh (replacing the MeshBasicMaterial) and call `setTime` once per
 * frame. The bright core + limb feed the existing bloom pass.
 */
export function buildSunShaderMaterial(): SunShader {
  const material = new THREE.ShaderMaterial({
    vertexShader: SUN_VERT,
    fragmentShader: SUN_FRAG,
    uniforms: { uTime: { value: 0 } },
    fog: false,
    toneMapped: false,
  });
  return {
    material,
    setTime: (tSeconds: number) => {
      material.uniforms.uTime.value = tSeconds;
    },
    dispose: () => material.dispose(),
  };
}
