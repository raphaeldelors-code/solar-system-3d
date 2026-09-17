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
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

export interface PostStack {
  composer: EffectComposer;
  /** The sun lens-flare (plan 044 A3). `group` is added to the scene; call
   *  `update(camera, sunNdc)` per frame while the sun is in-frame. */
  flare: LensFlare;
  /** Enable/disable the subtle DOF (bokeh) pass. Off by default. */
  setDOF: (on: boolean) => void;
  /** Whether the DOF pass is currently enabled. */
  dofEnabled: () => boolean;
  /** Set the DOF focus distance (world units from the camera). */
  setDOFFocus: (dist: number) => void;
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
  const output = new OutputPass();
  composer.addPass(output);

  // --- Subtle DOF (plan 044 A3) -------------------------------------------
  // A BokehPass inserted BEFORE the final OutputPass. Off by default (enabled
  // = false) so the default view is crisp; the "DOF" toggle flips it on. The
  // depth material is a MeshDepthMaterial, so it re-renders the scene for
  // depth — a real (if modest) GPU cost, hence the off-by-default toggle.
  // Kept subtle: tiny aperture + small maxblur so it reads as "cinematic
  // focus" rather than a smeared blur.
  const bokeh = new BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.00005,
    maxblur: 0.008,
  });
  bokeh.enabled = false;
  // Insert before the OutputPass (which must stay last).
  composer.insertPass(bokeh, composer.passes.indexOf(output));

  // --- Sun lens flare (plan 044 A3) ---------------------------------------
  // A screen-space sprite overlay attached to the camera. The caller (main.ts)
  // positions it via flare.update(camera, sunNdc) each frame and gates
  // flare.group.visible on the sun being in-frame AND not occluded (see
  // isSunOccluded). Attached to the camera so it tracks the view; the caller
  // must `scene.add(camera)` (it already does) for the overlay to render.
  const flare = buildLensFlare();
  camera.add(flare.group);
  flare.group.visible = false; // off until the first update() proves the sun is in-frame

  const setSize = (w: number, h: number): void => {
    const pr = renderer.getPixelRatio();
    bloom.resolution.set(w * pr, h * pr);
    composer.setPixelRatio(pr);
    composer.setSize(w, h);
  };

  const dispose = (): void => {
    composer.dispose();
    target.dispose();
    camera.remove(flare.group);
    flare.dispose();
  };

  return {
    composer,
    flare,
    setDOF: (on: boolean) => {
      bokeh.enabled = on;
    },
    dofEnabled: () => bokeh.enabled,
    setDOFFocus: (dist: number) => {
      (bokeh.uniforms as Record<string, { value: number }>).focus.value = dist;
    },
    setSize,
    dispose,
  };
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

// ---------------------------------------------------------------------------
// Sun lens flare (plan 044 A3)
// ---------------------------------------------------------------------------
//
// A screen-space "ghost" flare: a chain of small additive sprites laid out
// along the line from the sun's screen position through the frame centre
// (the classic anamorphic streak + ghost-dot look). It is a THREE.Group of
// Sprites anchored at the sun's world position; each sprite is offset in
// screen space by projecting the sun and the frame centre.
//
// Occlusion: the sprites use depthTest:true, so any planet between the camera
// and the sun writes depth and hides the flare behind it — no manual raycast.
// The caller (main.ts) toggles `group.visible` when the sun is off-screen or
// behind the camera (the flare would otherwise smear across the wrong side).

let cachedFlareTex: THREE.Texture | null = null;
let cachedStreakTex: THREE.Texture | null = null;

/** A soft radial dot for the flare ghosts (white core → transparent). */
function makeFlareDotTexture(): THREE.Texture {
  if (cachedFlareTex) return cachedFlareTex;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const c = size / 2;
  const g = ctx.createRadialGradient(c, c, 0, c, c, c);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,240,210,0.55)');
  g.addColorStop(0.5, 'rgba(255,200,120,0.18)');
  g.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedFlareTex = tex;
  return tex;
}

/**
 * A horizontal anamorphic streak: bright in the centre, fading to the left and
 * right edges. Rendered as a wide, thin sprite centred on the sun — the
 * signature "cinematic" lens-flare line that reads even when the sun is
 * frame-centred (where the ghost dots collapse onto the core).
 */
function makeStreakTexture(): THREE.Texture {
  if (cachedStreakTex) return cachedStreakTex;
  const w = 256;
  const h = 32;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  // Horizontal gradient: transparent → bright centre → transparent.
  const g = ctx.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0.0, 'rgba(255,255,255,0)');
  g.addColorStop(0.35, 'rgba(255,245,225,0.35)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.65, 'rgba(255,245,225,0.35)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // Vertical falloff so the streak is a thin line, not a bar.
  const vg = ctx.createLinearGradient(0, 0, 0, h);
  vg.addColorStop(0.0, 'rgba(0,0,0,0)');
  vg.addColorStop(0.5, 'rgba(0,0,0,1)');
  vg.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedStreakTex = tex;
  return tex;
}

export interface LensFlare {
  /** The flare sprite group — attach it to the camera (`camera.add(group)`). */
  group: THREE.Group;
  /**
   * Lay the ghost dots out for the current sun screen position. `sunNdc` is
   * the sun's projected NDC (x,y in [-1,1]); ghosts run along the line from
   * the sun through the frame centre. Call once per frame while visible.
   */
  update: (camera: THREE.Camera, sunNdc: THREE.Vector3) => void;
  dispose: () => void;
}

/**
 * Build the sun lens-flare group. The caller attaches `group` to the camera
 * (`camera.add(group)`) so it is a screen-space overlay, calls
 * `update(camera, sunNdc)` each frame, and gates `group.visible` on the sun
 * being in-frame AND not occluded (see `isSunOccluded`). Ghosts are subtle:
 * low opacity, small, warm/cool-tinted.
 */
export function buildLensFlare(): LensFlare {
  const tex = makeFlareDotTexture();
  const streakTex = makeStreakTexture();
  const group = new THREE.Group();
  group.name = 'sun-flare';
  group.renderOrder = 3; // above the corona sprite (renderOrder 2)

  // The anamorphic streak: a wide, thin horizontal line centred on the sun.
  // This is the dominant, always-visible element (reads even when the sun is
  // frame-centred, where the ghost dots collapse onto the bright core).
  const streak = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: streakTex,
      color: 0xfff4e0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
      opacity: 0.55,
    }),
  );
  streak.renderOrder = 3;
  streak.userData.isStreak = true;
  group.add(streak);

  // Ghost specs: fraction along the sun→centre line (t>1 = past the centre),
  // relative size, opacity, and a warm/cool tint. The first is the bright
  // "core" halo that sits on the sun itself.
  const ghosts: { t: number; size: number; opacity: number; color: number }[] = [
    { t: 0.0, size: 1.0, opacity: 0.5, color: 0xfff2d8 },
    { t: 0.35, size: 0.28, opacity: 0.22, color: 0xffd9a0 },
    { t: 0.7, size: 0.16, opacity: 0.16, color: 0xcfe0ff },
    { t: 1.15, size: 0.34, opacity: 0.12, color: 0xffe0b0 },
    { t: 1.6, size: 0.12, opacity: 0.1, color: 0xbcd0ff },
  ];

  const sprites: THREE.Sprite[] = [];
  for (const g of ghosts) {
    const mat = new THREE.SpriteMaterial({
      map: tex,
      color: g.color,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false, // camera-space overlay; occlusion is handled manually
      transparent: true,
      opacity: g.opacity,
    });
    const s = new THREE.Sprite(mat);
    s.renderOrder = 3;
    s.userData.flareT = g.t;
    s.userData.flareSize = g.size;
    group.add(s);
    sprites.push(s);
  }

  // Ghosts are laid out in CAMERA space (the group is a child of the camera):
  // a ghost at parameter t sits at NDC = sunNdc * (1 - t) — t=0 on the sun,
  // t=1 at the frame centre, t>1 past the centre. We place every sprite at a
  // fixed distance FLARE_DIST in front of the camera and scale it so its
  // apparent size matches the intended NDC fraction of the half-height.
  const FLARE_DIST = 1.0; // well inside [near=0.0005, far=20000]
  const update = (camera: THREE.Camera, sunNdc: THREE.Vector3): void => {
    const cam = camera as THREE.PerspectiveCamera;
    const halfH = Math.tan(THREE.MathUtils.degToRad((cam.fov ?? 45) / 2)) * FLARE_DIST;
    const halfW = halfH * (cam.aspect ?? 1);
    // Streak: centred on the sun, wide (≈70% of frame width) and thin.
    streak.position.set(sunNdc.x * halfW, sunNdc.y * halfH, -FLARE_DIST);
    streak.scale.set(halfW * 1.4, halfH * 0.06, 1);
    for (const s of sprites) {
      const t = s.userData.flareT as number;
      const size = s.userData.flareSize as number;
      const k = 1 - t;
      s.position.set(sunNdc.x * k * halfW, sunNdc.y * k * halfH, -FLARE_DIST);
      s.scale.setScalar(size * halfH);
    }
  };

  const dispose = (): void => {
    for (const s of sprites) s.material.dispose();
    streak.material.dispose();
    if (cachedFlareTex === tex) {
      tex.dispose();
      cachedFlareTex = null;
    }
    if (cachedStreakTex === streakTex) {
      streakTex.dispose();
      cachedStreakTex = null;
    }
  };

  return { group, update, dispose };
}

/**
 * Is the sun occluded by any of `occluders` (planet meshes) from `camera`?
 * Used to hide the lens flare when a planet sits between the camera and the
 * sun (a screen-space overlay can't depth-test against the scene). Returns
 * true if any occluder's bounding sphere intersects the camera→sun ray closer
 * than the sun. Cheap: one bounding-sphere test per body.
 */
export function isSunOccluded(
  camera: THREE.Camera,
  sunWorld: THREE.Vector3,
  occluders: THREE.Object3D[],
): boolean {
  const origin = camera.getWorldPosition(_occlOrigin);
  const toSun = _occlDir.subVectors(sunWorld, origin);
  const sunDist = toSun.length();
  if (sunDist < 1e-6) return false;
  toSun.divideScalar(sunDist);
  for (const o of occluders) {
    if (!o.visible) continue;
    o.getWorldPosition(_occlObj);
    const toObj = _occlToObj.subVectors(_occlObj, origin);
    const along = toObj.dot(toSun); // distance along the ray to the object
    if (along <= 0 || along >= sunDist) continue; // behind camera or past sun
    // Perpendicular distance from the ray to the object centre.
    _occlPerp.copy(toObj).addScaledVector(toSun, -along);
    const perp = _occlPerp.length();
    const r = _occlRadius(o);
    if (perp < r) return true;
  }
  return false;
}

const _occlOrigin = new THREE.Vector3();
const _occlDir = new THREE.Vector3();
const _occlObj = new THREE.Vector3();
const _occlToObj = new THREE.Vector3();
const _occlPerp = new THREE.Vector3();

/** Approximate world radius of an occluder (bounding-sphere fallback). */
function _occlRadius(o: THREE.Object3D): number {
  const geo = (o as THREE.Mesh).geometry;
  if (geo) {
    if (!geo.boundingSphere) geo.computeBoundingSphere();
    const s = o.getWorldScale(_occlScale);
    const maxS = Math.max(s.x, s.y, s.z) || 1;
    return (geo.boundingSphere?.radius ?? 0) * maxS;
  }
  return 0;
}
const _occlScale = new THREE.Vector3();
