/**
 * Screen-space constellation name labels (plan 016 P1).
 *
 * The old design hung one `THREE.Sprite` per name at a fixed point on the
 * sky dome. Two visible failure modes followed:
 *   1. FLICKER — the sprite is a 3D plane sitting 90 units in front of the
 *      figure plane; as the camera orbits, its plane crosses in front of and
 *      behind the figure/star-line geometry and depth-testing pops it
 *      in/out. Opacity additionally stepped at the 5 Hz highlight throttle.
 *   2. "LABEL THROUGH THE FIGURE" — the label anchor is a fixed sky
 *      direction, so a 360° trackball camera can park between the figure and
 *      its name; the name then slices across the figure art.
 * Both are intrinsic to 3D-anchored labels. Fix: project each name's anchor
 * direction to SCREEN space every frame and draw it on a 2D canvas overlay.
 * A 2D label can never intersect the figure geometry (it is always on top),
 * and its position/opacity is recomputed at display rate (no stepping).
 *
 * A 2D canvas (rather than DOM divs) is deliberate: "Save screenshot" exports
 * the WebGL canvas via `canvas.toBlob()` — main.ts composites this overlay
 * into the export so saved PNGs still contain the names.
 *
 * The anchor DIRECTIONS are the plan-006 static anti-overlap solver output
 * (unchanged, still unit-tested): each name sits beside its figure with the
 * usual constant edge gap. Only the *rendering* moves to screen space; the
 * "which side / how far" math is identical.
 */
import * as THREE from 'three';
import { CONSTELLATION_RADIUS, constellationLabelOpacity } from './scene';
import {
  CONSTELLATION_NAME_CANVAS_H,
  CONSTELLATION_NAME_CANVAS_W,
  drawConstellationName,
} from './textures';

/**
 * Constant on-screen cap height (CSS px) for every name, every tier.
 * Screen-space means the size no longer depends on angular extent: one
 * elegant size for all 88 names (the old per-tier caps existed only because
 * a constant sprite scale gives a constant ANGULAR size, which is wrong for
 * a screen-space label).
 */
export const CONSTELLATION_LABEL_SCREEN_PX = 30;
/** Skip drawing below this opacity (invisible either way). */
export const CONSTELLATION_LABEL_MIN_SCREEN_OPACITY = 0.02;
/** Skip labels whose anchor projects this far (CSS px) outside the viewport. */
export const CONSTELLATION_LABEL_SCREEN_PAD_PX = 260;

export interface ProjectedPoint {
  /** CSS px from the viewport left. */
  x: number;
  /** CSS px from the viewport top. */
  y: number;
  /** False when the point is behind the camera (or non-finite). */
  ok: boolean;
}

/** Scratch for {@link projectSkyDir} — keeps the hot path allocation-free. */
const _scratch = new THREE.Vector3();

/**
 * Project a sky direction to screen pixels for a perspective camera.
 * PURE (no DOM): `dir` is the unit anchor direction, `camera` supplies the
 * pose + projection, `wCss`/`hCss` the CSS viewport size. World point is
 * `dir * CONSTELLATION_RADIUS` (the anchor ring the old sprites sat on).
 */
export function projectSkyDir(
  dir: [number, number, number],
  camera: THREE.PerspectiveCamera,
  wCss: number,
  hCss: number,
): ProjectedPoint {
  _scratch.set(
    dir[0] * CONSTELLATION_RADIUS,
    dir[1] * CONSTELLATION_RADIUS,
    dir[2] * CONSTELLATION_RADIUS,
  );
  _scratch.applyMatrix4(camera.matrixWorldInverse);
  if (_scratch.z >= -camera.near) return { x: 0, y: 0, ok: false }; // behind (or at) the camera
  const ndcX = _scratch.x / -_scratch.z;
  const ndcY = _scratch.y / -_scratch.z;
  const x = (ndcX * 0.5 + 0.5) * wCss;
  const y = (-ndcY * 0.5 + 0.5) * hCss;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { x: 0, y: 0, ok: false };
  return { x, y, ok: true };
}

/** Per-name cached offscreen canvases (one per name × variant). */
const NAME_CANVAS_CACHE = new Map<string, HTMLCanvasElement>();

/** Cached 512×128 name canvas (lettering baked once; drawn many times). */
export function nameCanvas(name: string, variant: 'base' | 'green' = 'base'): HTMLCanvasElement {
  const key = `${variant}:${name}`;
  let c = NAME_CANVAS_CACHE.get(key);
  if (!c) {
    c = document.createElement('canvas');
    c.width = CONSTELLATION_NAME_CANVAS_W;
    c.height = CONSTELLATION_NAME_CANVAS_H;
    drawConstellationName(c.getContext('2d')!, name, variant);
    NAME_CANVAS_CACHE.set(key, c);
  }
  return c;
}

export interface ScreenLabelLayer {
  /** The overlay canvas (composited into screenshots by main.ts). */
  canvas: HTMLCanvasElement;
  setVisible: (v: boolean) => void;
  dispose: () => void;
}

/**
 * Create the `#cst-labels` overlay layered over the WebGL canvas
 * (`pointer-events: none`, below the control panel's z-index 10).
 */
export function createConstellationLabelLayer(webglCanvas: HTMLCanvasElement): ScreenLabelLayer {
  const canvas = document.createElement('canvas');
  canvas.id = 'cst-labels';
  canvas.style.cssText =
    'position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:5;';
  const parent = webglCanvas.parentElement;
  if (parent) {
    // #app is the WebGL canvas itself in this app; layer over its parent.
    parent.style.position = parent.style.position || 'relative';
  }
  // Append right after the WebGL canvas so the panel (later in DOM, z 10)
  // still covers both.
  webglCanvas.insertAdjacentElement('afterend', canvas);
  return {
    canvas,
    setVisible: (v: boolean): void => {
      canvas.style.display = v ? 'block' : 'none';
    },
    dispose: (): void => {
      canvas.remove();
      NAME_CANVAS_CACHE.clear();
    },
  };
}

export interface ScreenLabelUpdate {
  name: string;
  dir: [number, number, number];
  emphasis: number;
  /** Draw the emphasis (green) variant — picked or nearest figure. */
  emphasized: boolean;
  /** A body sits between the camera and this anchor (occlusion, plan 008 S2). */
  occluded: boolean;
}

/**
 * Render one frame of the overlay. `presence` is the camera-distance sky
 * factor (plan 003 P4); per-label opacity is the same D4 label curve as the
 * old sprites (`constellationLabelOpacity(emph) * presence`). Labels are
 * drawn at a constant screen cap height, centered on their projected anchor.
 */
export function updateConstellationScreenLabels(
  layer: ScreenLabelLayer,
  camera: THREE.PerspectiveCamera,
  updates: ScreenLabelUpdate[],
  presence: number,
  wCss: number,
  hCss: number,
): void {
  const canvas = layer.canvas;
  const dpr = Math.min(window.devicePixelRatio, 2); // match the renderer
  const wPx = Math.max(1, Math.round(wCss * dpr));
  const hPx = Math.max(1, Math.round(hCss * dpr));
  if (canvas.width !== wPx) canvas.width = wPx;
  if (canvas.height !== hPx) canvas.height = hPx;
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, wPx, hPx);
  if (presence <= 0.01) return;

  const pad = CONSTELLATION_LABEL_SCREEN_PAD_PX;
  for (const u of updates) {
    const op = constellationLabelOpacity(u.emphasis) * presence;
    if (op <= CONSTELLATION_LABEL_MIN_SCREEN_OPACITY) continue;
    if (u.occluded) continue;
    const p = projectSkyDir(u.dir, camera, wCss, hCss);
    if (!p.ok) continue;
    if (p.x < -pad || p.x > wCss + pad || p.y < -pad || p.y > hCss + pad) continue;
    const src = nameCanvas(u.name, u.emphasized ? 'green' : 'base');
    // Constant cap height; the 512×128 canvas aspect gives the width.
    const h = CONSTELLATION_LABEL_SCREEN_PX * (u.emphasized ? 1.12 : 1);
    const w = (src.width / src.height) * h;
    ctx.globalAlpha = Math.min(1, op);
    // Anchor = the far edge past the figure (solver margin) — center the
    // text on it, the same way the old sprite centered on its anchor point.
    ctx.drawImage(src, p.x - w / 2, p.y - h / 2, w, h);
  }
  ctx.globalAlpha = 1;
}
