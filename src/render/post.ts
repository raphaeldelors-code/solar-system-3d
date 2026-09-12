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
    opacity: 1.0,
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
