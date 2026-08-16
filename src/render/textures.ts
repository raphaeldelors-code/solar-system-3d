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
    a |= 0; a = (a + 0x6d2b79f5) | 0;
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
  const W = 512, H = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const rand = mulberry32(hashId(body.id));
  const c1 = body.color, c2 = body.color2 ?? body.color;

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
      const x = rand() * W, y = rand() * H, r = 1 + rand() * 5;
      ctx.fillStyle = rand() > 0.5
        ? `rgba(255,220,140,${0.05 + rand() * 0.1})`
        : `rgba(255,140,40,${0.05 + rand() * 0.08})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
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
      const x = rand() * W, y = rand() * H;
      const len = 20 + rand() * 90, h = 2 + rand() * 6;
      ctx.fillStyle = `rgba(255,255,255,${0.02 + rand() * 0.05})`;
      ctx.fillRect(x, y, len, h);
    }
    // a big storm oval for Jupiter-like bodies
    if (rand() > 0.4) {
      const sx = rand() * W, sy = H * (0.3 + rand() * 0.4);
      const rx = 26 + rand() * 20, ry = 10 + rand() * 8;
      ctx.fillStyle = lerpColor(c2, [1, 0.95, 0.9], 0.55);
      ctx.beginPath(); ctx.ellipse(sx, sy, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
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
      const cx = rand() * W, cy = H * (0.15 + rand() * 0.7);
      ctx.fillStyle = rand() > 0.25 ? land : lerpColor(c1, [0.4, 0.35, 0.25], 0.5);
      const blobs = 6 + Math.floor(rand() * 8);
      for (let j = 0; j < blobs; j++) {
        const x = cx + (rand() - 0.5) * 90, y = cy + (rand() - 0.5) * 44;
        ctx.beginPath(); ctx.arc(x, y, 6 + rand() * 18, 0, Math.PI * 2); ctx.fill();
      }
    }
    // polar caps
    ctx.fillStyle = 'rgba(245,248,252,0.9)';
    ctx.fillRect(0, 0, W, 14);
    ctx.fillRect(0, H - 14, W, 14);
    // clouds
    for (let i = 0; i < 120; i++) {
      const x = rand() * W, y = rand() * H;
      ctx.fillStyle = `rgba(255,255,255,${0.06 + rand() * 0.12})`;
      ctx.beginPath(); ctx.ellipse(x, y, 8 + rand() * 26, 2 + rand() * 5, 0, 0, Math.PI * 2); ctx.fill();
    }
  } else if (style === 'volcanic') {
    ctx.fillStyle = lerpColor(c1, c2, 0.4);
    ctx.fillRect(0, 0, W, H);
    // lava spots + dark patches
    for (let i = 0; i < 300; i++) {
      const x = rand() * W, y = rand() * H, r = 1 + rand() * 4;
      ctx.fillStyle = rand() > 0.7
        ? `rgba(255,90,20,${0.25 + rand() * 0.4})`
        : `rgba(60,40,30,${0.1 + rand() * 0.2})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    // 'rock': mottled surface with craters
    ctx.fillStyle = lerpColor(c1, c2, 0.3);
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 700; i++) {
      const x = rand() * W, y = rand() * H, r = 0.5 + rand() * 3;
      const shade = rand() > 0.5 ? '255,255,255' : '0,0,0';
      ctx.fillStyle = `rgba(${shade},${0.03 + rand() * 0.08})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    // craters: dark disc + bright rim
    for (let i = 0; i < 90; i++) {
      const x = rand() * W, y = rand() * H, r = 2 + rand() * 9;
      ctx.fillStyle = `rgba(0,0,0,${0.12 + rand() * 0.12})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + rand() * 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x, y, r, -0.4 * Math.PI, 0.6 * Math.PI); ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/** Sprite texture with the body name, for labels. */
export function makeLabelTexture(name: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 64;
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
