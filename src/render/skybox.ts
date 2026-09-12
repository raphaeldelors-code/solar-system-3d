/**
 * Deep-sky background (plan 035 F2).
 *
 * Three independent layers, all cheap (a few draw calls total):
 *   (a) Milky-Way equirect skybox — one large inward `SphereGeometry` with the
 *       procedural all-sky bake (`public/textures/milkyway_equirect.png`,
 *       generated in the scene frame's `equirectUV` convention — see the
 *       README note in `public/textures/`). (A mesh rather than
 *       `scene.background` so it is trivially sized, render-ordered, and
 *       disposed on scene rebuild.)
 *   (b) a denser COLORED near-starfield — thousands of points with per-point
 *       color (from a stellar blackbody palette) + a per-point "size" channel
 *       driven through a tiny `Points` shader, for parallax depth against the
 *       infinitely-far skybox.
 *   (c) zodiacal light — a faint additive glow in the ecliptic plane (the
 *       scene's XZ plane), brightest TOWARD the Sun and toward the ecliptic
 *       plane, via a per-pixel shader on a large inward hemisphere: the real
 *       interplanetary-dust scattering seen after sunset.
 *
 * The old 4000-point monochrome `THREE.Points` shell is replaced by (a)+(b);
 * `buildSkybox()` returns the combined group plus a disposer.
 *
 * The heavy data generation (star table) and the zodiacal intensity model are
 * split into pure functions (`makeStarAttributes`, `zodiacalPeakOpacity`) that
 * run in Node and are unit-tested in `tests/skybox.test.ts`.
 */
import * as THREE from 'three';

/** Radius of the Milky-Way skybox shell (well inside the camera far plane 20000). */
export const SKYBOX_RADIUS = 9000;
/**
 * Inner/outer radius of the colored near-starfield shell. It sits OUTSIDE the
 * constellation dome (CONSTELLATION_RADIUS = 4800, scene.ts) so constellation
 * lines/dots always draw in front of the stars, and well inside the skybox
 * (SKYBOX_RADIUS) so it reads as a parallax layer in front of the Milky Way.
 */
export const STAR_SHELL_MIN = 5000;
export const STAR_SHELL_MAX = 5600;
/** Number of colored near-stars. */
export const STAR_COUNT = 9000;
/** Inward-sphere segment count — a 2:1 equirect wants horizontal tessellation. */
export const SKYBOX_SEGMENTS = 96;
/**
 * Radius of the zodiacal-light dome. It encloses the whole system and the
 * camera (which stays far closer), and sits inside the starfield so the dust
 * glow tints the stars behind it rather than covering them.
 */
export const ZODIACAL_RADIUS = 4000;
/**
 * Uniform brightness tint applied to the Milky-Way skybox (0..1, 1 = as
 * authored). The shipped equirect bake is full-strength galaxy art and reads
 * as the single brightest thing in the frame at the overview — dimmed so the
 * band sets the mood without stealing focus from the system.
 * 2026-09-12: 0.5 → 0.3 — at oblique mid-zoom views the band still crossed
 * the upper half of the frame brighter than the planets; trim further while
 * keeping individual stars (rendered separately) untouched.
 */
export const MILKYWAY_TINT = 0.3;

/**
 * Stellar blackbody color palette (approximate hues), by class:
 *   0=B blue, 1=A white-blue, 2=F white, 3=G yellow (Sun), 4=K orange, 5=M red.
 */
export const STAR_COLORS: [number, number, number][] = [
  [0.6, 0.72, 1.0],
  [0.79, 0.85, 1.0],
  [0.95, 0.97, 1.0],
  [1.0, 0.96, 0.86],
  [1.0, 0.85, 0.62],
  [1.0, 0.62, 0.42],
];
// Relative frequency: common late-A/G/K stars dominate; blue giants rare.
export const STAR_WEIGHTS = [0.04, 0.09, 0.18, 0.34, 0.24, 0.11];

/** Deterministic PRNG (mulberry32) so the starfield is stable across reloads. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeightedClass(rng: () => number): number {
  let r = rng();
  for (let i = 0; i < STAR_WEIGHTS.length; i++) {
    r -= STAR_WEIGHTS[i];
    if (r <= 0) return i;
  }
  return 3;
}

/**
 * Pure star-table generator (no THREE). Returns positions on a uniform shell
 * in [min,max], per-star color (palette class × brightness scatter), and a
 * per-point pixel size (a few bright stars, mostly small).
 */
export function makeStarAttributes(
  count: number,
  rMin: number,
  rMax: number,
  seed = 0x5eed2026,
): { position: Float32Array; color: Float32Array; size: Float32Array } {
  const rng = mulberry32(seed);
  const position = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const size = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // Uniform point on a spherical shell (cosine-distributed polar angle).
    const u = rng();
    const v = rng();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = rMin + rng() * (rMax - rMin);
    position[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    position[i * 3 + 1] = r * Math.cos(phi);
    position[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const [cr, cg, cb] = STAR_COLORS[pickWeightedClass(rng)];
    const b = 0.45 + rng() * 0.55; // per-star brightness scatter
    color[i * 3] = cr * b;
    color[i * 3 + 1] = cg * b;
    color[i * 3 + 2] = cb * b;

    // Pixel size: power-law tail => a handful of bright stars, mostly dim.
    size[i] = 0.8 + Math.pow(rng(), 3.0) * 2.6;
  }
  return { position, color, size };
}

/**
 * Pure zodiacal-light intensity model (no THREE): brightness at a sky
 * direction. `altDeg` = elevation above the ecliptic plane (°); `sepDeg` =
 * angular separation from the Sun as seen from the origin (°). Peak (both
 * zero) = `peak`; falls off sharply toward the anti-Sun and gently toward the
 * ecliptic horizon — the classic triangular afterglow shape.
 */
export function zodiacalPeakOpacity(altDeg: number, sepDeg: number, peak = 0.08): number {
  // Away from the Sun: cosine^3 falls to 0 at 90° (anti-solar direction = 0).
  const t = Math.max(0, Math.cos((sepDeg * Math.PI) / 180));
  // Toward the ecliptic plane: rises from the horizon, never fully dark.
  const a = Math.max(0, Math.cos((altDeg * Math.PI) / 180));
  return peak * t * t * t * (0.25 + 0.75 * a * a);
}

export interface Skybox {
  /** The combined deep-sky group (skybox + stars + zodiacal light). */
  group: THREE.Group;
  /**
   * Per-frame: recompute the zodiacal shader's view direction toward the Sun
   * (the camera orbits, so the afterglow must stay pointed at the Sun).
   */
  update: (camera: THREE.Camera) => void;
  /** Disposes every GPU resource the group owns. */
  dispose: () => void;
}

/**
 * Build the deep-sky background. `milkywayUrl` is the equirect texture served
 * from Vite's `public/` (e.g. `textures/milkyway_equirect.png`). Loading is
 * fire-and-forget: the skybox sphere references the texture immediately and
 * fills in when the image decodes — no "black until loaded" flash to handle.
 */
export function buildSkybox(loader: THREE.TextureLoader, milkywayUrl: string): Skybox {
  const group = new THREE.Group();
  group.name = 'deep-sky';
  const disposables: { dispose: () => void }[] = [];

  // ------------------------------------------------------------- (a) skybox
  const skyTex = loader.load(milkywayUrl);
  skyTex.colorSpace = THREE.SRGBColorSpace;
  skyTex.wrapS = THREE.RepeatWrapping;
  // Equirectangular: three.js maps u = atan2(z, x)/2π + 0.5, v = asin(y)/π + 0.5,
  // exactly the convention milkyway_equirect.png was authored in (galactic
  // centre at u≈0.7226, v≈0.5; autumnal equinox at the texture centre).
  const skyGeo = new THREE.SphereGeometry(SKYBOX_RADIUS, SKYBOX_SEGMENTS, 48);
  const skyMat = new THREE.MeshBasicMaterial({
    map: skyTex,
    // The bake is authored BRIGHT (full-scale galaxy art); at full intensity
    // the Milky-Way band competed with the Sun for attention, so it is tinted
    // down ~half (2026-09-12 user feedback: "the huge one … I think it's the
    // milky way"). toneMapped off keeps the tint a plain linear multiply.
    color: new THREE.Color(MILKYWAY_TINT, MILKYWAY_TINT, MILKYWAY_TINT),
    side: THREE.BackSide,
    depthWrite: false, // never occlude in the depth buffer
    toneMapped: false, // keep authored brightness (no ACES dip)
  });
  const skyMesh = new THREE.Mesh(skyGeo, skyMat);
  skyMesh.name = 'milkyway-skybox';
  skyMesh.renderOrder = -10; // first, so everything else draws over it
  group.add(skyMesh);
  disposables.push(skyGeo, skyMat, skyTex);

  // ------------------------------------------ (b) colored near-starfield
  const { position, color, size } = makeStarAttributes(STAR_COUNT, STAR_SHELL_MIN, STAR_SHELL_MAX);
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(position, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(color, 3));
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));

  // Per-point-size `Points` shader (PointsMaterial has no per-vertex size).
  // toneMapped off so star brightness is exactly what the table says.
  const starMat = new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: { value: 1.0 } },
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSize;
      varying vec3 vColor;
      uniform float uPixelRatio;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      void main() {
        // Soft round point: 0 at centre -> 1 at edge.
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = smoothstep(1.0, 0.15, d);
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });
  starMat.toneMapped = false;
  const stars = new THREE.Points(starGeo, starMat);
  stars.name = 'starfield';
  stars.renderOrder = -9;
  group.add(stars);
  disposables.push(starGeo, starMat);

  // ---------------------------------------------- (c) zodiacal light
  // Large upward hemisphere in the ecliptic plane (scene XZ; north = +Y),
  // rendered from the INSIDE (BackSide). The per-pixel model (mirrored from
  // the pure `zodiacalPeakOpacity`): brightness ∝ cos³(sun-separation) ×
  // (0.25 + 0.75·cos²(ecliptic-altitude)). Both angles are computed in world
  // space per fragment, so the afterglow stays correctly pointed at the Sun
  // as the camera orbits (uCamPos is refreshed every frame by update()).
  const zodiGeo = new THREE.SphereGeometry(ZODIACAL_RADIUS, 64, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const zodiMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(1.0, 0.85, 0.62) }, // warm dust
      // Peak alpha on the Sun in the ecliptic plane — keep in sync with the
      // pure zodiacalPeakOpacity default (0.08 after the 2026-09-12 dimming).
      uPeak: { value: 0.08 },
      uR: { value: ZODIACAL_RADIUS },
      uCamPos: { value: new THREE.Vector3(0, 16, 30) },
    },
    transparent: true,
    side: THREE.BackSide, // the camera is INSIDE the dome
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      void main() {
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uPeak;
      uniform float uR;
      uniform vec3 uCamPos;
      varying vec3 vWorldPos;
      void main() {
        vec3 toView = normalize(uCamPos - vWorldPos);
        // Elevation above the ecliptic plane (+Y) at this sky direction.
        float alt = asin(clamp(toView.y, -1.0, 1.0));
        // Separation from the Sun (at the world origin).
        vec3 toSun = normalize(-vWorldPos);
        float sep = acos(clamp(dot(toView, toSun), -1.0, 1.0));
        float t = max(0.0, cos(sep));
        float a = max(0.0, cos(alt));
        // Mirror of the pure JS model: peak * t^3 * (0.25 + 0.75*a^2).
        float alpha = uPeak * t * t * t * (0.25 + 0.75 * a * a);
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
  zodiMat.toneMapped = false;
  const zodi = new THREE.Mesh(zodiGeo, zodiMat);
  zodi.name = 'zodiacal-light';
  zodi.renderOrder = -8;
  group.add(zodi);
  disposables.push(zodiGeo, zodiMat);

  // Scratch (single-threaded frame loop; never nested).
  const camPos = new THREE.Vector3();

  return {
    group,
    update(camera) {
      camera.getWorldPosition(camPos);
      zodiMat.uniforms.uCamPos.value.copy(camPos);
    },
    dispose: () => {
      for (const d of disposables) d.dispose();
    },
  };
}
