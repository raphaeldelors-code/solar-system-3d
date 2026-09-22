/**
 * Screen-space planet/body name labels (plan 044 A5).
 *
 * The old design hung one `THREE.Sprite` per body just above the disc
 * (depthTest:false, always fully opaque). Two visible failure modes:
 *   1. "LABEL ON THE SUN" — Mercury's sprite floats over the Sun's disc when
 *      the two are close on screen; the translucent box reads as a bug.
 *   2. NO DE-COLLISION — a phone's small FOV stacks 8+ planet labels into an
 *      unreadable smear in the frame center (the constellation names already
 *      solved this with a max-8 + de-collision rule; the planet labels never
 *      got it).
 *
 * Fix: project each body's world position to SCREEN space every frame and
 * draw the name on a 2D canvas overlay (the same architecture as
 * `constellationScreenLabels.ts`). A 2D label can never intersect the body
 * geometry, and its position/opacity is recomputed at display rate. Each
 * label is offset from the body with a thin LEADER LINE back to the disc,
 * fades by camera distance (near bodies = full, far bodies = faint), and is
 * de-collided (max 8, picked body always shown).
 *
 * A 2D canvas (rather than DOM divs) is deliberate: "Save screenshot" exports
 * the WebGL canvas via `canvas.toBlob()` — main.ts composites this overlay
 * into the export so saved PNGs still contain the names (same as the
 * constellation overlay).
 */
import * as THREE from 'three';

/** Constant on-screen cap height (CSS px) for every body name. */
export const PLANET_LABEL_SCREEN_PX = 13; // plan 047: 22 -> 13px
/** Skip drawing below this opacity (invisible either way). */
export const PLANET_LABEL_MIN_OPACITY = 0.04;
/**
 * Hard cap on how many body names a single frame may draw (the same rule the
 * constellation names use). The picked body always counts as one of the slots.
 */
export const PLANET_LABEL_MAX_VISIBLE = 10; // plan 047 R5: 4 -> 10 (8 planets + Sun + Moon; de-collision drops overlaps)
/** Extra margin (CSS px) around each ink box for the de-collision test. */
export const PLANET_LABEL_BOX_PAD_PX = 5;
/**
 * Distance fade: at `near` the label is fully opaque; at `far` it reaches the
 * legibility floor (NOT zero — the old 3D sprites were "legible at every
 * scale", and in a System view the camera is 200+ units from the planets, so
 * a fade-to-zero would blank every label). The fade is a subtle depth cue,
 * not a visibility gate. The picked body + the Sun bypass the fade (they are
 * what the user is looking at / the system's anchor).
 */
export const PLANET_LABEL_FADE_NEAR = 18;
export const PLANET_LABEL_FADE_FAR = 120;
/**
 * The minimum opacity a faded label reaches (the legibility floor). Kept well
 * above the draw-skip threshold so distant labels stay readable, just dimmer.
 */
export const PLANET_LABEL_FADE_FLOOR = 0.55;
/** Leader-line length (CSS px) from the body disc edge to the label. */
export const PLANET_LABEL_LEADER_PX = 26; // plan 047 R4: 14 -> 26px (label clears the bright Sun core)

export interface ProjectedPoint {
  /** CSS px from the viewport left. */
  x: number;
  /** CSS px from the viewport top. */
  y: number;
  /** False when the point is behind the camera (or non-finite). */
  ok: boolean;
}

/** Scratch for {@link projectWorldToScreen} — keeps the hot path allocation-free. */
const _scratch = new THREE.Vector3();

/**
 * Project a world position to screen pixels for a perspective camera.
 * PURE (no DOM): `world` is the body's world position, `camera` supplies the
 * pose + projection, `wCss`/`hCss` the CSS viewport size.
 */
export function projectWorldToScreen(
  world: THREE.Vector3,
  camera: THREE.PerspectiveCamera,
  wCss: number,
  hCss: number,
): ProjectedPoint {
  _scratch.copy(world);
  _scratch.applyMatrix4(camera.matrixWorldInverse);
  if (_scratch.z >= -camera.near) return { x: 0, y: 0, ok: false }; // behind (or at) the camera
  const ndcX = _scratch.x / -_scratch.z;
  const ndcY = _scratch.y / -_scratch.z;
  const x = (ndcX * 0.5 + 0.5) * wCss;
  const y = (-ndcY * 0.5 + 0.5) * hCss;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { x: 0, y: 0, ok: false };
  return { x, y, ok: true };
}

/**
 * Distance fade: 1 at `near`, {@link PLANET_LABEL_MIN_OPACITY} at `far`,
 * linear in between. PURE.
 */
export function planetLabelFade(dist: number): number {
  if (dist <= PLANET_LABEL_FADE_NEAR) return 1;
  if (dist >= PLANET_LABEL_FADE_FAR) return PLANET_LABEL_FADE_FLOOR;
  const t = (dist - PLANET_LABEL_FADE_NEAR) / (PLANET_LABEL_FADE_FAR - PLANET_LABEL_FADE_NEAR);
  return 1 - t * (1 - PLANET_LABEL_FADE_FLOOR);
}

/** A body the caller wants to label this frame. */
export interface PlanetLabelInput {
  id: string;
  name: string;
  /** The body's world position (the mesh's world position, not the pivot's). */
  world: THREE.Vector3;
  /** Camera→body distance (drives the fade). */
  dist: number;
  /** The body's on-screen disc radius (CSS px) — the leader line starts here. */
  discRadiusPx: number;
  /** Tier: 0 = picked (always shown), 1 = sun + planets, 2 = moons/dwarfs. */
  tier: 0 | 1 | 2;
}

/** A label the selector decided to draw this frame. */
export interface SelectedPlanetLabel {
  id: string;
  name: string;
  /** Body disc center (CSS px) — the leader line's anchor. */
  bx: number;
  by: number;
  /** The body's on-screen disc radius (CSS px) — the leader line starts here. */
  discR: number;
  /** Label box center (CSS px) — offset from the body by the leader. */
  x: number;
  y: number;
  /** Full label box size (CSS px). */
  w: number;
  h: number;
  /** Final on-screen opacity (0..1). */
  opacity: number;
  /** The picked body (drawn with the green emphasis variant). */
  emphasized: boolean;
}

/**
 * Plan 044 A5 — the planet-label selector. Replaces "draw every sprite" with
 * three simple, testable rules:
 *
 *   1. PROJECT + CULL — each body's world position is projected to screen;
 *      bodies behind the camera or whose disc is fully off-viewport are
 *      dropped (plan 047 R9: disc-based cull — every label is pinned to a
 *      body that is actually on the screen).
 *   2. RANK — picked body first (tier 0), then sun + planets (tier 1) by
 *      distance ascending (nearest = most important), then moons/dwarfs
 *      (tier 2). The picked body is ALWAYS a candidate.
 *   3. DE-COLLISION + CAP — candidates are walked in rank order. A candidate
 *      is dropped if its ink box (name width × cap height, + pad) intersects
 *      any already-accepted box, and no more than {@link PLANET_LABEL_MAX_VISIBLE}
 *      are drawn. Each accepted label is offset from its body by a leader
 *      line (up-right by default; flipped if that would push it off-screen).
 *
 * PURE (no DOM): `projectWorldToScreen` is allocation-light math, so this
 * runs in Node and is unit-tested. The renderer just paints the returned list.
 */
export function selectPlanetLabels(
  inputs: PlanetLabelInput[],
  camera: THREE.PerspectiveCamera,
  wCss: number,
  hCss: number,
  maxVisible: number = PLANET_LABEL_MAX_VISIBLE,
): SelectedPlanetLabel[] {
  const boxPad = PLANET_LABEL_BOX_PAD_PX;
  // Approximate ink width: ~0.55× the cap height per character (system-ui
  // 600 weight). Good enough for the collision box; the renderer draws the
  // real text.
  const estInkW = (name: string): number => name.length * PLANET_LABEL_SCREEN_PX * 0.55;

  interface Cand {
    id: string;
    name: string;
    tier: number;
    dist: number;
    bx: number;
    by: number;
    discR: number;
    inkW: number;
    h: number;
    w: number;
    opacity: number;
    emphasized: boolean;
  }
  const cands: Cand[] = [];
  for (const inp of inputs) {
    const p = projectWorldToScreen(inp.world, camera, wCss, hCss);
    if (!p.ok) continue;
    // Plan 047 R9: DISC-BASED on-screen cull — a body only earns a label if its
    // disc (center ± discRadiusPx) actually touches the viewport. The R8 220px
    // pad let bodies up to 220px OFF-SCREEN through, and the on-screen clamp
    // below then pinned their labels to the frame edge with no visible body —
    // the "labels too present / not pinned properly" report. Now every label is
    // pinned to a body that is genuinely on (or touching) the screen. No pad,
    // no min-disc gate, no focus cull: in the wide System view every on-screen
    // planet + moon still labels (the premium look), but nothing floats at the
    // edge for an off-screen body.
    const r = inp.discRadiusPx;
    if (p.x + r < 0 || p.x - r > wCss || p.y + r < 0 || p.y - r > hCss) continue;
    // The picked body + the Sun bypass the distance fade (they are what the
    // user is looking at / the system's anchor).
    const noFade = inp.tier === 0 || inp.id === 'sun';
    const op = noFade ? 1 : planetLabelFade(inp.dist);
    if (op <= PLANET_LABEL_MIN_OPACITY) continue;
    const h = PLANET_LABEL_SCREEN_PX;
    const inkW = estInkW(inp.name);
    const w = inkW + 16; // ink + horizontal padding
    cands.push({
      id: inp.id,
      name: inp.name,
      tier: inp.tier,
      dist: inp.dist,
      bx: p.x,
      by: p.y,
      discR: inp.discRadiusPx,
      inkW,
      h,
      w,
      opacity: Math.min(1, op),
      emphasized: inp.tier === 0,
    });
  }
  // Rank: tier ascending (0 picked, 1 sun+planets, 2 moons/dwarfs), then
  // distance ascending (nearest first within a tier).
  cands.sort((a, b) => a.tier - b.tier || a.dist - b.dist);

  const accepted: SelectedPlanetLabel[] = [];
  const boxes: { x1: number; x2: number; y1: number; y2: number }[] = [];
  for (const c of cands) {
    if (accepted.length >= maxVisible) break;
    // Offset the label up-right from the body by the leader length. Flip the
    // vertical direction if the body is in the top half (so the label stays
    // on-screen). The leader line connects (bx,by) → (x,y).
    const up = c.by > hCss / 2; // body in bottom half → label goes up
    // Plan 047 R4: scale the leader with disc size so big discs (the Sun)
    // get a proportionally longer throw — the label never sits on the core.
    const throwPx = PLANET_LABEL_LEADER_PX + c.discR * 0.6;
    const dy = (up ? -1 : 1) * (c.discR + throwPx + c.h / 2);
    const dx = c.discR + throwPx * 0.5;
    let x = c.bx + dx;
    let y = c.by + dy;
    // Clamp to the viewport (keep the label box fully on-screen).
    x = Math.max(c.w / 2 + 2, Math.min(wCss - c.w / 2 - 2, x));
    y = Math.max(c.h / 2 + 2, Math.min(hCss - c.h / 2 - 2, y));
    // De-collision: the ink box (name width × cap height, + pad).
    const x1 = x - c.inkW / 2 - boxPad;
    const x2 = x + c.inkW / 2 + boxPad;
    const y1 = y - c.h / 2 - boxPad;
    const y2 = y + c.h / 2 + boxPad;
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
      id: c.id,
      name: c.name,
      bx: c.bx,
      by: c.by,
      discR: c.discR,
      x,
      y,
      w: c.w,
      h: c.h,
      opacity: c.opacity,
      emphasized: c.emphasized,
    });
  }
  return accepted;
}

/**
 * Render one frame of the planet-label overlay. Paints each accepted label:
 * a thin leader line from the body disc to the label, then the name text
 * (base white, or green for the picked body). The caller owns the canvas
 * (sized + dpr-scaled the same way as the constellation overlay).
 */
export function drawPlanetLabels(
  ctx: CanvasRenderingContext2D,
  selected: SelectedPlanetLabel[],
): void {
  for (const s of selected) {
    ctx.globalAlpha = s.opacity;
    // Leader line: from the body disc edge toward the label.
    const dx = s.x - s.bx;
    const dy = s.y - s.by;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    // Start at the disc edge (not the center) so the line doesn't cross the body.
    const sx = s.bx + ux * s.discR;
    const sy = s.by + uy * s.discR;
    const ex = s.x - ux * (s.w / 2);
    const ey = s.y - uy * (s.h / 2);
    // Plan 047 R5: premium label language — a hairline leader that fades out
    // toward the text, a small anchor dot on the body, and tracked type with
    // a soft two-layer shadow. No boxes, no neon.
    const accent = s.emphasized;
    const lineCol = accent ? '122,162,255' : '255,255,255';
    const grad = ctx.createLinearGradient(sx, sy, ex, ey);
    grad.addColorStop(0, `rgba(${lineCol},${accent ? 0.55 : 0.35})`);
    grad.addColorStop(1, `rgba(${lineCol},0.05)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    // Anchor dot on the body disc edge — the "pin" that ties label to object.
    ctx.fillStyle = `rgba(${lineCol},${accent ? 0.9 : 0.6})`;
    ctx.beginPath();
    ctx.arc(sx, sy, accent ? 2.5 : 2, 0, Math.PI * 2);
    ctx.fill();
    // Name text: tracked, near-white (accent for the picked body), soft
    // two-layer shadow for legibility over bright and dark regions alike.
    ctx.font = (accent ? '600 ' : '500 ') + '13px system-ui, -apple-system, sans-serif';
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0.03em';
    } catch {
      /* letterSpacing unsupported — fine without tracking */
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = accent ? '#bcd2ff' : 'rgba(245,247,250,0.96)';
    ctx.fillText(s.name, s.x, s.y);
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 0;
    ctx.fillText(s.name, s.x, s.y);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
    } catch {
      /* noop */
    }
  }
  ctx.globalAlpha = 1;
}

/**
 * The planet-label overlay canvas (composited into screenshots by main.ts).
 * A separate canvas from the constellation overlay so the two systems stay
 * independent (each clears + draws its own labels every frame).
 */
export interface PlanetLabelLayer {
  canvas: HTMLCanvasElement;
  setVisible: (v: boolean) => void;
  dispose: () => void;
}

/**
 * Create the `#planet-labels` overlay layered over the WebGL canvas
 * (`pointer-events: none`, z-index 6 — above the constellation overlay at 5,
 * below the control panel at 10).
 */
export function createPlanetLabelLayer(webglCanvas: HTMLCanvasElement): PlanetLabelLayer {
  const canvas = document.createElement('canvas');
  canvas.id = 'planet-labels';
  canvas.style.cssText =
    'position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:6;';
  webglCanvas.insertAdjacentElement('afterend', canvas);
  return {
    canvas,
    setVisible: (v: boolean): void => {
      canvas.style.display = v ? 'block' : 'none';
    },
    dispose: (): void => {
      canvas.remove();
    },
  };
}

/**
 * Render one frame of the planet-label overlay: size the backing store to the
 * CSS viewport (×dpr, capped at 2 to match the renderer), scale the context,
 * clear, select the visible labels, and paint them. The caller passes the
 * per-frame body inputs (world pos, distance, disc radius, tier).
 */
export function updatePlanetScreenLabels(
  layer: PlanetLabelLayer,
  camera: THREE.PerspectiveCamera,
  inputs: PlanetLabelInput[],
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
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, wCss, hCss);
  const selected = selectPlanetLabels(inputs, camera, wCss, hCss);
  drawPlanetLabels(ctx, selected);
}
