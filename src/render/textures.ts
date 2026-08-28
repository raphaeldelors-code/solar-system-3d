/**
 * Procedural textures generated on a 2D canvas (no external assets).
 * Each body gets a 512x256 equirectangular canvas with a style based on
 * its `texture` field. Deterministic per body id (seeded RNG).
 */
import * as THREE from 'three';
import type { BodyDefinition } from '../sim/types';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashId(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): string {
  const m = (i: number) => Math.round(255 * (a[i] + (b[i] - a[i]) * t));
  return `rgb(${m(0)},${m(1)},${m(2)})`;
}

/** Build an equirectangular surface texture for a body. */
export function makeSurfaceTexture(body: BodyDefinition): THREE.CanvasTexture {
  const W = 512,
    H = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const rand = mulberry32(hashId(body.id));
  const c1 = body.color,
    c2 = body.color2 ?? body.color;

  const style = body.texture ?? 'rock';

  if (style === 'sun') {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, lerpColor(c1, c2, 0.6));
    g.addColorStop(0.5, lerpColor(c1, c2, 0.2));
    g.addColorStop(1, lerpColor(c1, c2, 0.6));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // granulation spots
    for (let i = 0; i < 900; i++) {
      const x = rand() * W,
        y = rand() * H,
        r = 1 + rand() * 5;
      ctx.fillStyle =
        rand() > 0.5
          ? `rgba(255,220,140,${0.05 + rand() * 0.1})`
          : `rgba(255,140,40,${0.05 + rand() * 0.08})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (style === 'gas') {
    // horizontal bands with slight wobble
    const bands = 14 + Math.floor(rand() * 8);
    for (let b = 0; b < bands; b++) {
      const y0 = (b / bands) * H;
      const hgt = H / bands;
      const t = 0.5 + 0.5 * Math.sin((b / bands) * Math.PI * (2 + rand() * 2));
      ctx.fillStyle = lerpColor(c1, c2, t);
      ctx.fillRect(0, y0, W, hgt + 1);
    }
    // soft turbulence: overlay translucent streaks
    for (let i = 0; i < 260; i++) {
      const x = rand() * W,
        y = rand() * H;
      const len = 20 + rand() * 90,
        h = 2 + rand() * 6;
      ctx.fillStyle = `rgba(255,255,255,${0.02 + rand() * 0.05})`;
      ctx.fillRect(x, y, len, h);
    }
    // a big storm oval for Jupiter-like bodies
    if (rand() > 0.4) {
      const sx = rand() * W,
        sy = H * (0.3 + rand() * 0.4);
      const rx = 26 + rand() * 20,
        ry = 10 + rand() * 8;
      ctx.fillStyle = lerpColor(c2, [1, 0.95, 0.9], 0.55);
      ctx.beginPath();
      ctx.ellipse(sx, sy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (style === 'ice') {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, lerpColor(c1, [1, 1, 1], 0.25));
    g.addColorStop(0.5, lerpColor(c1, c2, 0.3));
    g.addColorStop(1, lerpColor(c1, [1, 1, 1], 0.25));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // faint horizontal banding
    for (let i = 0; i < 40; i++) {
      const y = rand() * H;
      ctx.fillStyle = `rgba(255,255,255,${0.03 + rand() * 0.05})`;
      ctx.fillRect(0, y, W, 1 + rand() * 3);
    }
  } else if (style === 'earth') {
    // oceans base
    ctx.fillStyle = lerpColor(c1, [0, 0.1, 0.35], 0.3);
    ctx.fillRect(0, 0, W, H);
    // continents: random blobs of land color
    const land = lerpColor(body.color2 ?? c1, [0.3, 0.5, 0.25], 0.5);
    for (let i = 0; i < 26; i++) {
      const cx = rand() * W,
        cy = H * (0.15 + rand() * 0.7);
      ctx.fillStyle = rand() > 0.25 ? land : lerpColor(c1, [0.4, 0.35, 0.25], 0.5);
      const blobs = 6 + Math.floor(rand() * 8);
      for (let j = 0; j < blobs; j++) {
        const x = cx + (rand() - 0.5) * 90,
          y = cy + (rand() - 0.5) * 44;
        ctx.beginPath();
        ctx.arc(x, y, 6 + rand() * 18, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // polar caps
    ctx.fillStyle = 'rgba(245,248,252,0.9)';
    ctx.fillRect(0, 0, W, 14);
    ctx.fillRect(0, H - 14, W, 14);
    // clouds
    for (let i = 0; i < 120; i++) {
      const x = rand() * W,
        y = rand() * H;
      ctx.fillStyle = `rgba(255,255,255,${0.06 + rand() * 0.12})`;
      ctx.beginPath();
      ctx.ellipse(x, y, 8 + rand() * 26, 2 + rand() * 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (style === 'volcanic') {
    ctx.fillStyle = lerpColor(c1, c2, 0.4);
    ctx.fillRect(0, 0, W, H);
    // lava spots + dark patches
    for (let i = 0; i < 300; i++) {
      const x = rand() * W,
        y = rand() * H,
        r = 1 + rand() * 4;
      ctx.fillStyle =
        rand() > 0.7
          ? `rgba(255,90,20,${0.25 + rand() * 0.4})`
          : `rgba(60,40,30,${0.1 + rand() * 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // 'rock': mottled surface with craters
    ctx.fillStyle = lerpColor(c1, c2, 0.3);
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 700; i++) {
      const x = rand() * W,
        y = rand() * H,
        r = 0.5 + rand() * 3;
      const shade = rand() > 0.5 ? '255,255,255' : '0,0,0';
      ctx.fillStyle = `rgba(${shade},${0.03 + rand() * 0.08})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // craters: dark disc + bright rim
    for (let i = 0; i < 90; i++) {
      const x = rand() * W,
        y = rand() * H,
        r = 2 + rand() * 9;
      ctx.fillStyle = `rgba(0,0,0,${0.12 + rand() * 0.12})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + rand() * 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r, -0.4 * Math.PI, 0.6 * Math.PI);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/**
 * Georgia uppercase advances, in thousandths of an em (approximated from
 * Georgia's hmtx metrics). Single source of truth for constellation-name
 * layout: the texture draws from this table AND the scene measures the ink
 * width from it, so the lettering and the label-distance math can never
 * drift apart (canvas `measureText` varies by platform — it must not feed
 * the 3D placement).
 */
const GEORGIA_ADV: Record<string, number> = {
  A: 690,
  B: 665,
  C: 725,
  D: 725,
  E: 620,
  F: 580,
  G: 770,
  H: 755,
  I: 350,
  J: 430,
  K: 720,
  L: 565,
  M: 945,
  N: 760,
  O: 775,
  P: 635,
  Q: 775,
  R: 695,
  S: 610,
  T: 630,
  U: 730,
  V: 680,
  W: 1020,
  X: 680,
  Y: 670,
  Z: 600,
};

/** Canvas geometry shared by the name texture + ink measurement. */
export const CONSTELLATION_NAME_CANVAS_W = 512;
export const CONSTELLATION_NAME_CANVAS_H = 128;
const NAME_FONT_CAP_PX = 60; // never scale the font above this
const NAME_INK_MAX_PX = 464; // keep a margin inside the 512 canvas
const NAME_LETTER_SPACING_EM = 0.24;

export interface ConstellationNameLayout {
  /** Chosen font size (px) — capped so long and short names share one scale. */
  fontSize: number;
  /** Canvas x of the FIRST glyph's left edge (centered in the canvas). */
  inkStartX: number;
  /** Ink extent across the canvas (px) — the actual letter span. */
  inkWidthPx: number;
  /** Per-glyph advance (px), in order. */
  charWidths: number[];
}

/**
 * Pure layout for a constellation name on the 512×128 canvas (plan 004 Q1):
 * fit the name to `NAME_INK_MAX_PX` (capped at `NAME_FONT_CAP_PX`) and
 * center it. Used by `makeConstellationNameTexture` (drawing) and
 * `constellationLabelInkWidthRad` (placement) so the ink the user sees is
 * exactly the ink the 3D math positions.
 */
export function layoutConstellationName(name: string): ConstellationNameLayout {
  const text = name.toUpperCase();
  const advances = text.split('').map((ch) => GEORGIA_ADV[ch] ?? 600); // em/1000
  // Fit: total em at font size s = (Σadv + spacing·(n−1))·s/1000 ≤ MAX_PX
  // and s ≤ CAP_PX.
  const totalEm = advances.reduce((a, b) => a + b, 0) / 1000;
  const spacingEm = NAME_LETTER_SPACING_EM;
  const fontSize = Math.min(
    NAME_FONT_CAP_PX,
    NAME_INK_MAX_PX / (totalEm + spacingEm * (text.length - 1)),
  );
  const charWidths = advances.map((a) => (a / 1000) * fontSize);
  const sp = fontSize * spacingEm;
  const inkWidthPx = charWidths.reduce((a, b) => a + b, 0) + sp * (text.length - 1);
  const inkStartX = CONSTELLATION_NAME_CANVAS_W / 2 - inkWidthPx / 2;
  return { fontSize, inkStartX, inkWidthPx, charWidths };
}

/**
 * Draw the constellation name lettering (elegant spaced serif capitals, soft
 * starlight glow, hairline flourish) into `ctx` on the 512×128 canvas.
 * `variant` selects the palette: `'base'` (blue-white, the sky default) or
 * `'green'` (apple-green, the emphasis color for the picked / nearest
 * figure — plan 016 P2). Used by `makeConstellationNameTexture` (3D sprite)
 * and the screen-space label layer (plan 016 P1).
 */
export function drawConstellationName(
  ctx: CanvasRenderingContext2D,
  name: string,
  variant: 'base' | 'green' = 'base',
): void {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const text = name.toUpperCase();
  const { fontSize, inkStartX, inkWidthPx, charWidths } = layoutConstellationName(name);
  const sp = fontSize * NAME_LETTER_SPACING_EM;
  ctx.font = `${fontSize}px Georgia, "Times New Roman", serif`;
  const drawText = (): void => {
    let x = inkStartX;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], x + charWidths[i] / 2, 50);
      x += charWidths[i] + sp;
    }
  };
  const base =
    variant === 'green'
      ? {
          glow: 'rgba(124, 252, 90, 0.9)',
          halo: 'rgba(150, 255, 120, 0.85)',
          core: '#eaffe8',
          flourish: 'rgba(124, 252, 90, 0.5)',
          diamond: 'rgba(190, 255, 160, 0.85)',
        }
      : {
          glow: 'rgba(143, 176, 255, 0.9)',
          halo: 'rgba(190, 210, 250, 0.9)',
          core: '#eef4ff',
          flourish: 'rgba(160, 185, 235, 0.5)',
          diamond: 'rgba(205, 224, 255, 0.85)',
        };
  // Two glow passes (wide soft halo), then a crisp shadow-free core so the
  // letterforms stay sharp on top of the halo.
  ctx.shadowColor = base.glow;
  ctx.shadowBlur = 14;
  ctx.fillStyle = base.halo;
  drawText();
  drawText();
  ctx.shadowBlur = 0;
  ctx.fillStyle = base.core;
  drawText();
  // Hairline flourish: two strokes broken by a small diamond under the name.
  const y = 90;
  ctx.strokeStyle = base.flourish;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(inkStartX - 16, y);
  ctx.lineTo(CONSTELLATION_NAME_CANVAS_W / 2 - 10, y);
  ctx.moveTo(CONSTELLATION_NAME_CANVAS_W / 2 + 10, y);
  ctx.lineTo(inkStartX + inkWidthPx + 16, y);
  ctx.stroke();
  ctx.fillStyle = base.diamond;
  ctx.beginPath();
  ctx.moveTo(CONSTELLATION_NAME_CANVAS_W / 2, y - 5);
  ctx.lineTo(CONSTELLATION_NAME_CANVAS_W / 2 + 5, y);
  ctx.lineTo(CONSTELLATION_NAME_CANVAS_W / 2, y + 5);
  ctx.lineTo(CONSTELLATION_NAME_CANVAS_W / 2 - 5, y);
  ctx.closePath();
  ctx.fill();
}

/**
 * Constellation name texture: wraps {@link drawConstellationName} in a
 * canvas. The 3D-sprite path is gone (plan 016 P1 moved names to the
 * screen-space label layer); this stays for any 3D consumer + tests.
 */
export function makeConstellationNameTexture(
  name: string,
  variant: 'base' | 'green' = 'base',
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = CONSTELLATION_NAME_CANVAS_W;
  canvas.height = CONSTELLATION_NAME_CANVAS_H;
  drawConstellationName(canvas.getContext('2d')!, name, variant);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Sprite texture with the body name, for labels. */
export function makeLabelTexture(name: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.font = '600 30px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(10,14,24,0.45)';
  const w = ctx.measureText(name).width;
  ctx.fillRect(128 - w / 2 - 10, 12, w + 20, 40);
  ctx.fillStyle = '#dbe6f5';
  ctx.fillText(name, 128, 33);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
