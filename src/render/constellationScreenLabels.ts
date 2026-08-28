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
  layoutConstellationName,
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
/**
 * Plan 017 F2: hard cap on how many names a single frame may draw. The old
 * "draw everything above the opacity floor" strategy projected 40+ names
 * into a phone's small FOV and stacked them into an unreadable smear in
 * the frame center. A handful of the MOST central names — never more than
 * this many — is the simple, legible rule: on a phone screen the eye gets
 * a few big names, not a wall of them. The picked figure always counts as
 * one of the slots (it is what the user asked to see).
 */
export const CONSTELLATION_LABEL_MAX_VISIBLE = 8;

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
  /** Draw the emphasis (green) variant — the picked figure (plan 017 F1). */
  emphasized: boolean;
  /** A body sits between the camera and this anchor (occlusion, plan 008 S2). */
  occluded: boolean;
}

/** A label the selector decided to draw this frame (plan 017 F2). */
export interface SelectedLabel {
  name: string;
  emphasized: boolean;
  /** Screen-space center (CSS px). */
  x: number;
  y: number;
  /** Full 512×128 canvas draw size (CSS px) — the renderer draws this box. */
  w: number;
  h: number;
  /** Final on-screen opacity (0..1). */
  opacity: number;
}

/** Extra margin (CSS px) around each ink box for the de-collision test. */
export const CONSTELLATION_LABEL_BOX_PAD_PX = 4;

/**
 * Plan 017 F2 — the phone-legible label selector. The old strategy drew
 * EVERY label whose opacity exceeded the floor, so a phone's small FOV
 * projected 40+ names that stacked into an unreadable smear. This replaces
 * "draw them all" with two simple, testable rules:
 *
 *   1. VIEW CONE — only figures with D4 emphasis > 0 (inside the 48°
 *      out-band of the view axis) are candidates at all. The picked figure
 *      is ALWAYS a candidate (it is what the user asked to see, even if it
 *      is currently off-center / low-emphasis).
 *   2. DE-COLLISION + CAP — candidates are ranked (picked first, then by
 *      emphasis descending) and walked in order. A candidate is dropped if
 *      its ink box (name width × cap height, + pad) intersects any already
 *      accepted box, and no more than {@link CONSTELLATION_LABEL_MAX_VISIBLE}
 *      are drawn. The result is a handful of the most central, readable
 *      names — never a wall of them.
 *
 * PURE (no DOM): `layoutConstellationName` / `projectSkyDir` /
 * `constellationLabelOpacity` are all allocation-light math, so this runs in
 * Node and is unit-tested. The renderer just paints the returned list.
 */
export function selectVisibleLabels(
  updates: ScreenLabelUpdate[],
  camera: THREE.PerspectiveCamera,
  wCss: number,
  hCss: number,
  presence: number,
  maxVisible: number = CONSTELLATION_LABEL_MAX_VISIBLE,
): SelectedLabel[] {
  if (presence <= CONSTELLATION_LABEL_MIN_SCREEN_OPACITY) return [];
  const pad = CONSTELLATION_LABEL_SCREEN_PAD_PX;
  const boxPad = CONSTELLATION_LABEL_BOX_PAD_PX;
  const canvasAspect = CONSTELLATION_NAME_CANVAS_W / CONSTELLATION_NAME_CANVAS_H;

  interface Cand {
    name: string;
    emphasized: boolean;
    emphasis: number;
    rank: number;
    x: number;
    y: number;
    inkW: number;
    h: number;
    w: number;
    opacity: number;
  }
  const cands: Cand[] = [];
  for (const u of updates) {
    if (u.occluded) continue;
    // Rule 1 — view cone. Picked figures bypass the cone (always a
    // candidate); the rest must be inside the 48° emphasis band.
    if (!u.emphasized && u.emphasis <= 0) continue;
    const op = constellationLabelOpacity(u.emphasis) * presence;
    if (op <= CONSTELLATION_LABEL_MIN_SCREEN_OPACITY) continue;
    const p = projectSkyDir(u.dir, camera, wCss, hCss);
    if (!p.ok) continue;
    if (p.x < -pad || p.x > wCss + pad || p.y < -pad || p.y > hCss + pad) continue;
    const h = CONSTELLATION_LABEL_SCREEN_PX * (u.emphasized ? 1.12 : 1);
    const w = canvasAspect * h;
    // Ink width (tighter than the full canvas) drives the collision box so
    // short names don't reserve a full-width row of dead space.
    const inkFrac = layoutConstellationName(u.name).inkWidthPx / CONSTELLATION_NAME_CANVAS_W;
    cands.push({
      name: u.name,
      emphasized: u.emphasized,
      emphasis: u.emphasis,
      rank: u.emphasized ? 1 : 0,
      x: p.x,
      y: p.y,
      inkW: w * inkFrac,
      h,
      w,
      opacity: Math.min(1, op),
    });
  }
  // Rule 2 — rank: picked first, then most-central (highest emphasis).
  cands.sort((a, b) => b.rank - a.rank || b.emphasis - a.emphasis);

  const accepted: SelectedLabel[] = [];
  const boxes: { x1: number; x2: number; y1: number; y2: number }[] = [];
  for (const c of cands) {
    if (accepted.length >= maxVisible) break;
    const x1 = c.x - c.inkW / 2 - boxPad;
    const x2 = c.x + c.inkW / 2 + boxPad;
    const y1 = c.y - c.h / 2 - boxPad;
    const y2 = c.y + c.h / 2 + boxPad;
    let hit = false;
    for (const b of boxes) {
      if (x1 < b.x2 && x2 > b.x1 && y1 < b.y2 && y2 > b.y1) {
        hit = true;
        break;
      }
    }
    if (hit) continue;
    boxes.push({ x1, x2, y1, y2 });
    accepted.push({
      name: c.name,
      emphasized: c.emphasized,
      x: c.x,
      y: c.y,
      w: c.w,
      h: c.h,
      opacity: c.opacity,
    });
  }
  return accepted;
}

/**
 * Render one frame of the overlay. Plan 017 F2: the DECISION of which names
 * to show (view cone + screen de-collision + max-8 cap) lives in the pure
 * {@link selectVisibleLabels}; this function only paints that list — one
 * cached name canvas per accepted label, at a constant screen cap height.
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

  const selected = selectVisibleLabels(updates, camera, wCss, hCss, presence);
  for (const s of selected) {
    const src = nameCanvas(s.name, s.emphasized ? 'green' : 'base');
    ctx.globalAlpha = s.opacity;
    // Draw the full 512×128 canvas centered on the anchor (the ink sits
    // centered inside it); the de-collision already ran on the ink box.
    ctx.drawImage(src, s.x - s.w / 2, s.y - s.h / 2, s.w, s.h);
  }
  ctx.globalAlpha = 1;
}
