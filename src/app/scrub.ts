// The time-scrub gesture + the full-width timeline HUD (plan 044 D2, step 3).
//
// Extracted from main.ts. Owns the right-drag (F1) and 3-finger (F2) scrub
// gestures, the per-year timeline strip (ticks, month labels, event markers,
// the magnifier lens, the "you-are-here" caret), and the hover/tooltip
// affordance. The 5 shared mutable lets (scrub, suppressPickAfterScrub,
// threeFinger, rearmBounce, lastMoonResampleMs) and the touchPointers Map
// stay in main.ts (the pick handler, tickIntroTail, frameLoop, and
// resampleMoonNow all read/write them) and are passed in as getter/setter
// accessors — reads always see the live value, writes land back in main.ts.
//
// Returns the 5 functions external code calls: tlShow, tlRefresh, tlSetCaret,
// tlCurrentYear, tlFrame.

import {
  fmtMonthDayUtc,
  monthSeparators,
  nearestEventX,
  scrubClampToYear,
  scrubSpeedLog,
  timelineLayout,
  type BarEvent,
  yearSpanDays,
} from '../render/scrubMath';
import { LENS_R, lensClampX, lensDisplace } from '../render/lensMath';
import { yearEvents, yearSpan, hasYearEvents } from '../render/yearEvents';
import { J2000_UTC } from '../sim/types';
import type { SimClock } from '../sim/clock';
import type { ScrubState, ThreeFingerScrub } from './scrubTypes';

export interface ScrubDeps {
  // 5 shared mutable lets (getter/setter — reads see the live value, writes
  // land back in main.ts).
  scrub: ScrubState | null;
  suppressPickAfterScrub: boolean;
  threeFinger: ThreeFingerScrub | null;
  rearmBounce: boolean;
  lastMoonResampleMs: number;
  // 19 plain values (const Map, canvas, clock, 13 HUD els, 3 functions).
  touchPointers: Map<number, { x: number; y: number }>;
  canvas: HTMLCanvasElement;
  clock: SimClock;
  hudMiniEl: HTMLElement;
  hudDateEl: HTMLElement;
  hudSpeedEl: HTMLElement;
  hudTimelineEl: HTMLElement;
  hudTimelineTrackEl: HTMLElement;
  hudTimelineFillEl: HTMLElement;
  hudTimelineCaretEl: HTMLElement;
  hudTimelineDynEl: HTMLElement;
  hudTimelineYearEl: HTMLElement;
  hudTlLensEl: HTMLElement;
  hudTlLensCanvasEl: HTMLCanvasElement;
  hudTlLensDateEl: HTMLElement;
  hudTlTipEl: HTMLElement;
  applySliderSpeed: (v: number) => void;
  resampleMoonNow: () => void;
  syncUrl: () => void;
}

export function createScrub(deps: ScrubDeps) {
  /**
   * Clear the deps.scrub feedback on release (plan 023 F2): drop the emphasis
   * class so the mini pane returns to its resting look. (Plan 025 F2 removed
   * the sub-line and gauge, so there is nothing else to blank.)
   */
  function clearScrubHud(): void {
    deps.hudMiniEl.classList.remove('scrubbing');
    // Plan 025 F2: drop the per-value magnify emphasis too (date and/or
    // speed were .hot while the deps.scrub was live).
    deps.hudDateEl.classList.remove('hot');
    deps.hudSpeedEl.classList.remove('hot');
    // Plan 024 F2 → 025 F3 (v2): clear the SCRUB layer (fill, caret, event
    // chapters) — the strip itself (line + month axis + year label) is
    // PERMANENT (plan 025 F3 v2), so only .visible (which shows the deps.scrub
    // layer) is dropped.
    tlActiveYear = null;
    tlSweeping.clear();
    tlBarEvents = [];
    deps.hudTimelineDynEl.replaceChildren();
    deps.hudTimelineFillEl.style.width = '0%';
    deps.hudTimelineCaretEl.style.left = '0%';
    // Plan 025 F3/F4: the hover tooltip + magnifier lens die with the deps.scrub
    // layer.
    tlHideTip();
    tlHideLens();
    deps.hudTimelineEl.classList.remove('visible');
  }

  // --- Plan 023 F3 (redesigned plan 024 F2, moved to the TOP in 025 F3) -------
  // The full-width TOP strip (#hud-timeline) is PERMANENT (plan 025 F3 v2):
  // a calm 5px line, 12 month-start ticks with 45° labels (Jan…Dec), and the
  // current year label centered on the line — all always visible (the year is
  // driven per frame by fmtDate). While a deps.scrub is live, .visible adds the
  // SCRUB layer: that year's events as body-emoji "chapters" on the track
  // (timelineLayout), a green fill Jan 1→caret, the "you are here" caret at
  // deps.clock.t, and a one-line hover tooltip (nearest event within 24 px →
  // "MMM D · emoji Title" below the strip). The event scan is expensive
  // (~0.1–0.3 s per year, measured), so a newly entered year paints its
  // chapters immediately and defers the sweep to a rAF — the markers appear
  // the next frame(s), never blocking a pointermove. Each year is swept once
  // and cached (yearEvents), so re-scrubbing the same span is free.

  let tlActiveYear: number | null = null; // year the bar currently shows
  const tlSweeping = new Set<number>(); // years with a deferred sweep in flight
  let tlSpan0 = 0; // Jan 1 of tlActiveYear, days since J2000 (cached per year)
  let tlSpanLen = 365; // that year's length in days
  // The bar-space events for the ACTIVE year (x in px from the track's left
  // edge), consumed by the hover tooltip. Rebuilt in tlPaint (once per year)
  // — a px recompute is trivial, so the per-event day is derived from frac
  // when the track width is known.
  let tlBarEvents: BarEvent[] = [];

  function tlCurrentYear(): number {
    return new Date(J2000_UTC + deps.clock.t * 86_400_000).getUTCFullYear();
  }

  /** Show the bar (once the first committed move crosses a dead zone). */
  function tlShow(): void {
    if (!deps.hudTimelineEl.classList.contains('visible'))
      deps.hudTimelineEl.classList.add('visible');
  }

  function tlSetCaret(frac: number): void {
    deps.hudTimelineCaretEl.style.left = `${frac * 100}%`;
    deps.hudTimelineFillEl.style.width = `${frac * 100}%`;
  }

  function tlPaint(year: number): void {
    const { span0Days, spanLenDays } = yearSpan(year);
    tlSpan0 = span0Days;
    tlSpanLen = spanLenDays;
    const events = hasYearEvents(year) ? yearEvents(year).events : [];
    const { markers, overflow, caretFrac } = timelineLayout(
      span0Days,
      spanLenDays,
      events,
      deps.clock.t,
    );
    // The bar is the persistent container; the month axis is STATIC DOM
    // (plan 025 F3) — only the event markers + overflow chip are rebuilt here,
    // so a year with markers never accumulates stale ones from a prior paint.
    deps.hudTimelineYearEl.textContent = String(year);
    deps.hudTimelineDynEl.replaceChildren();
    const width = deps.hudTimelineTrackEl.clientWidth || window.innerWidth;
    const BAR_L = 12; // #hud-timeline-bar side inset (px, CSS)
    const barW = Math.max(1, width - 2 * BAR_L);
    const frag = document.createDocumentFragment();
    tlBarEvents = [];
    for (const mk of markers) {
      const el = document.createElement('span');
      el.className = 'tl-event';
      el.style.left = `${mk.frac * 100}%`;
      el.textContent = mk.emoji;
      el.title = mk.title;
      frag.appendChild(el);
      // Bar-space copy for the lens + tooltip: the month ticks and the caret
      // both sit at `frac·barW` (the bar is inset 12px from the track), so an
      // event at the caret must too — that's what makes the in-disc dx = 0.
      tlBarEvents.push({
        day: mk.frac * spanLenDays,
        x: mk.frac * barW,
        emoji: mk.emoji,
        title: mk.title,
      });
    }
    if (overflow > 0) {
      const chip = document.createElement('span');
      chip.className = 'tl-overflow';
      chip.textContent = `+${overflow}`;
      frag.appendChild(chip);
    }
    deps.hudTimelineDynEl.appendChild(frag);
    tlSetCaret(caretFrac);
  }

  // --- Plan 025 F3: hover tooltip + Plan 029: true circular magnifier lens ----
  // The lens is a transparent circular glass disc centered on the pointer. Its
  // focal point is the point on the timeline line directly under the cursor, and
  // everything inside the disc is magnified by a RADIAL profile — maximum at the
  // focal point, falling off to exactly 1× at the rim — so the glass blends
  // seamlessly into the real strip and "what's near the center is bigger". The
  // strip sits at the TOP of the screen, so the disc is CENTERED ON the line
  // (half of it hangs below the viewport top — clipped, exactly like a real glass
  // held at the window edge). Packed events fan out around the focal point, so a
  // dense cluster is spread across the disc and the exact one can be picked.
  //
  // Position-driven (no enter/leave): while the pointer is inside the strip's
  // vertical band (the line + the lens overhang below it) the pointer's position
  // drives both the F3 tooltip and the lens. Plan 027: a plain mouse-over
  // (no button) works, not only during a right-drag deps.scrub. Entering the band
  // paints the current year's events (tlRefresh, idempotent + cache-aware) and
  // adds .hover (which shows the events layer); leaving the band hides the lens
  // + tooltip and drops .hover. The green fill + caret stay deps.scrub-only (CSS
  // .visible). Enter/leave were a dead-end: the track starts pointer-events:none
  // and only a hover may re-enable it, so pointerenter could never fire the first
  // time (chicken-and-egg) and the tooltip stayed dead. A band check on
  // pointermove is immune to that. Touch never sees this (the deps.scrub drag is a
  // deps.canvas gesture; the track is inert to touch).
  const TL_HOVER_BAND_TOP = 0; // the pointer is over/inside the line itself
  const TL_HOVER_BAND_BOTTOM = 120; // the lens disc hangs ~64px below the line
  const TL_TOOLTIP_RADIUS_PX = 24;
  // The 12 month starts (Jan 1 … Dec 1) — the same fixed fractions the static
  // DOM axis uses (365-day basis; a leap year drifts <0.2%, invisible).
  const TL_MONTHS = monthSeparators(365);

  function tlHideTip(): void {
    deps.hudTlTipEl.classList.remove('show');
  }

  function tlHideLens(): void {
    deps.hudTlLensEl.classList.remove('show');
    deps.hudTlLensCanvasEl
      .getContext('2d')
      ?.clearRect(0, 0, deps.hudTlLensCanvasEl.width, deps.hudTlLensCanvasEl.height);
  }

  /**
   * Draw the magnifier glass at strip-x `x`. The disc is a 2D deps.canvas: each strip
   * element (line, month ticks, that year's events, the caret) is re-drawn into
   * the disc with a PER-ELEMENT radial transform — displaced to (offset · local
   * zoom) and scaled by the local zoom, which varies with the element's distance
   * from the focal point. Near the center it's big, near the rim ~1×, and the
   * rim is seamless (lensDisplace → null at/beyond it = the real strip shows).
   * The line, ticks and events straddle the line (their dy = elementY − lineY);
   * the caret hangs below. Cheap: a few dozen draw ops/frame.
   */
  function tlDrawLens(x: number): void {
    const lensCanvas = deps.hudTlLensCanvasEl;
    const dpr = window.devicePixelRatio || 1;
    const size = LENS_R * 2;
    if (lensCanvas.width !== size * dpr || lensCanvas.height !== size * dpr) {
      lensCanvas.width = Math.round(size * dpr);
      lensCanvas.height = Math.round(size * dpr);
    }
    const ctx = lensCanvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const width = deps.hudTimelineTrackEl.clientWidth || window.innerWidth;
    const BAR_L = 12; // #hud-timeline-bar side inset (px, CSS)
    const barW = Math.max(1, width - 2 * BAR_L);
    const caretFrac = timelineLayout(tlSpan0, tlSpanLen, [], deps.clock.t).caretFrac;

    // Plan 033: `x` (the focal) is in TRACK space (0..width); the strip content
    // positions below (caretFrac·barW, m.frac·barW, b.x) are in BAR space
    // (0..barW). Convert the focal to bar space so every dx is consistent —
    // the caret lands at dx=0 (disc center) when the disc is on the caret.
    const xBar = x - BAR_L;

    ctx.lineCap = 'round';
    // 1 — the 5px line, full disc width, at the focal point (dy 0 → 4× thick).
    ctx.strokeStyle = 'rgba(160, 190, 220, 0.5)';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(2, LENS_R);
    ctx.lineTo(size - 2, LENS_R);
    ctx.stroke();
    // 2 — month ticks (a 9px bar straddling the line) + the 45° label.
    for (const m of TL_MONTHS) {
      const dx = m.frac * barW - xBar;
      const d = lensDisplace(dx, 0);
      if (!d) continue;
      const cx = LENS_R + d.x;
      ctx.strokeStyle = 'rgba(120, 150, 200, 0.55)';
      ctx.lineWidth = Math.max(1, d.scale);
      ctx.beginPath();
      ctx.moveTo(cx, LENS_R - 4.5 * d.scale);
      ctx.lineTo(cx, LENS_R + 4.5 * d.scale);
      ctx.stroke();
      // The 45° label anchored under its tick (rotated about the anchor).
      const ld = lensDisplace(dx, 9); // the label's top-left, ~9px below the line
      if (ld) {
        ctx.save();
        ctx.translate(LENS_R + ld.x, LENS_R + ld.y);
        ctx.rotate(Math.PI / 4);
        ctx.scale(ld.scale, ld.scale);
        ctx.fillStyle = '#7d90ad';
        ctx.font = `${10}px system-ui, sans-serif`;
        ctx.fillText(m.abbr, 0, 9);
        ctx.restore();
      }
    }
    // 3 — that year's event emojis (straddling the line) at their local zoom —
    //  this is where a packed cluster FANS OUT around the focal point.
    for (const b of tlBarEvents) {
      // b.x is stored in BAR space (frac·barW, plan 034) to match the month
      // ticks and the caret — so an event at the caret has dx = 0 (center).
      const dx = b.x - xBar;
      const d = lensDisplace(dx, 0);
      if (!d) continue;
      ctx.save();
      ctx.translate(LENS_R + d.x, LENS_R + d.y);
      ctx.scale(d.scale, d.scale);
      ctx.font = `${13}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.emoji, 0, 0);
      ctx.restore();
    }
    // 4 — the "you are here" caret (a 15px bar straddling the line), only when a
    //  deps.scrub is live (the fill stays hidden, matching the CSS deps.scrub-only rule).
    if (deps.hudTimelineEl.classList.contains('visible')) {
      const dx = caretFrac * barW - xBar;
      const d = lensDisplace(dx, 0);
      if (d) {
        const cx = LENS_R + d.x;
        ctx.fillStyle = '#57c785';
        ctx.shadowColor = 'rgba(87, 199, 133, 0.7)';
        ctx.shadowBlur = 6 * d.scale;
        const cw = Math.max(2, 3 * d.scale);
        ctx.fillRect(cx - cw / 2, LENS_R - 7.5 * d.scale, cw, 15 * d.scale);
        ctx.shadowBlur = 0;
      }
    }
  }

  /**
   * The caret ("you are here" selector) center x in TRACK space — the same space
   * the disc's `left` and the pointer use. The bar is inset 12px from the track
   * (see #hud-timeline-bar), and the caret sits at `caretFrac · barWidth` in bar
   * space, so in track space it's `12 + caretFrac · (width − 24)`. `caretFrac` is
   * derived from `deps.clock.t` — the SAME value that drives the top-right `#hud-date`
   * box — so centering the disc here makes the magnified center, the caret, and
   * the date pane all show one date (plan 032: "the lens zoom should be where the
   * selector is").
   */
  function tlCaretX(): number {
    const width = deps.hudTimelineTrackEl.clientWidth || window.innerWidth;
    const BAR_L = 12; // #hud-timeline-bar side inset (px, CSS)
    const barW = Math.max(1, width - 2 * BAR_L);
    const caretFrac = timelineLayout(tlSpan0, tlSpanLen, [], deps.clock.t).caretFrac;
    return BAR_L + caretFrac * barW;
  }

  function tlTooltipAndLens(clientX: number): void {
    if (tlActiveYear === null) return;
    const rect = deps.hudTimelineTrackEl.getBoundingClientRect();
    if (rect.width < 2) return;
    const width = rect.width;
    // Plan 032: the FOCAL POINT (disc center) is the SELECTOR — the green
    // "you-are-here" caret — while a deps.scrub is live, and the pointer on a plain
    // hover. The caret is deps.clock-derived (the SAME source as the top-right
    // #hud-date box), so centering the disc on it makes the magnified center,
    // the caret, the focal-date chip, and the date pane all show ONE date:
    // "the lens zoom should be where the selector is … date of the lens align
    // with date of the top right square at all time." On hover there is no
    // visible selector, so the disc follows the pointer to inspect that day.
    const scrubbing = !!(deps.scrub?.movedX || deps.threeFinger?.live);
    const x = Math.max(0, Math.min(width, clientX - rect.left)); // pointer, track space
    const focal = scrubbing ? lensClampX(tlCaretX(), width) : lensClampX(x, width);
    // Plan 033: tlBarEvents x-positions are in BAR space (12px inset); probe in
    // the same space the events live in.
    const focalBar = focal - 12;
    // F3: nearest event within the probe radius about the focal (magnified
    // center) → the chip docked under the top-right pane (plan 030).
    const ev = nearestEventX(tlBarEvents, focalBar, TL_TOOLTIP_RADIUS_PX);
    if (ev) {
      const date = fmtMonthDayUtc(tlActiveYear, ev.day);
      deps.hudTlTipEl.innerHTML = `<span class="tl-tip-date">${date}</span>${ev.emoji} ${ev.title}`;
      // Plan 030 F1: dock the chip at the top-right, directly UNDER the
      // date/speed pane (#hud-mini). Measure the pane's rect — getBoundingClientRect
      // bakes in safe-area insets, the desktop 44px / phone 112px top, the pane's
      // height, and its .scrubbing padding growth — then place the chip 6px below
      // it, right-aligned to the pane's right edge. Same spot every frame, so the
      // chip never sits under the magnifier glass and never overflows off the
      // right edge (width-capped in CSS). offsetWidth is measurable while .show
      // is applied (opacity 0 is still laid out).
      const pane = deps.hudMiniEl.getBoundingClientRect();
      const tipW = deps.hudTlTipEl.offsetWidth;
      const tipRight = pane.right - 4;
      const tipLeft = Math.max(12, tipRight - tipW);
      deps.hudTlTipEl.style.left = `${tipLeft}px`;
      deps.hudTlTipEl.style.top = `${pane.bottom + 6}px`;
      deps.hudTlTipEl.classList.add('show');
    } else {
      tlHideTip();
    }
    // The disc is a child of #hud-timeline-track, so `left` is track-relative —
    // the same space the focal point is in — and the disc center sits EXACTLY on
    // the focal (the caret while scrubbing, the pointer on hover). The glass may
    // extend past the strip edge; it's clipped by the viewport, like a real glass
    // held at the window edge.
    deps.hudTlLensEl.style.left = `${focal - LENS_R}px`;
    tlDrawLens(focal);
    // The focal-point date readout. While scrubbing, the focal IS the caret = the
    // deps.clock date, so the chip reads deps.clock.t (matching the pane exactly). On hover
    // it inspects the day under the pointer. (plan 031: never read the pointer's
    // own position while scrubbing — it was offset from the deps.clock.)
    const chipDay = scrubbing ? Math.max(0, deps.clock.t - tlSpan0) : (focal / width) * tlSpanLen;
    deps.hudTlLensDateEl.textContent = fmtMonthDayUtc(tlActiveYear, chipDay);
    deps.hudTlLensEl.classList.add('show');
  }

  /**
   * Plan 028 F1: the 3-finger touch deps.scrub has no hover, so the lens + tooltip
   * (mouse-only, see the pointermove band handler below) never appear on a
   * phone — the user sees the event markers but not the magnifier that makes
   * packed events readable. This shows the lens + tooltip while the deps.scrub is
   * live. Plan 032: the focal point is the SELECTOR (caret), computed from the
   * deps.clock internally — so it takes no x argument. The 3-finger move handler
   * still reports the centroid x (unused here) purely to gate on committed
   * moves.
   */
  function tlScrubLens(): void {
    if (tlActiveYear === null) return;
    tlRefresh(); // idempotent + cache-aware — paints the press year's events
    tlShow(); // ensure the deps.scrub layer (.visible) is shown for the markers
    // Pass the (ignored-on-deps.scrub) centroid; the focal comes from tlCaretX().
    tlTooltipAndLens(Number.POSITIVE_INFINITY);
  }

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = deps.hudTimelineTrackEl.getBoundingClientRect();
    const inBand =
      e.clientY >= rect.top - TL_HOVER_BAND_TOP && e.clientY <= rect.bottom + TL_HOVER_BAND_BOTTOM;
    if (inBand) {
      // Plan 027: hover is a real affordance — paint the current year's events
      // (idempotent + cache-aware) and show the events layer, then drive the
      // lens + tooltip by pointer position.
      tlRefresh();
      if (!deps.hudTimelineEl.classList.contains('hover'))
        deps.hudTimelineEl.classList.add('hover');
      tlTooltipAndLens(e.clientX);
    } else {
      tlHideTip();
      tlHideLens();
      deps.hudTimelineEl.classList.remove('hover');
    }
  });

  /** Rebuild the strip when the deps.scrub enters a new year; defer the (expensive)
   *  event sweep of a not-yet-cached year to a rAF so the gesture's own frame
   *  paints first. Called from both deps.scrub move paths on committed moves. */
  function tlRefresh(): void {
    const year = tlCurrentYear();
    if (year === tlActiveYear && !tlSweeping.has(year)) return;
    tlActiveYear = year;
    if (hasYearEvents(year)) {
      tlPaint(year); // cache hit — free
      return;
    }
    if (tlSweeping.has(year)) return; // a sweep is already in flight
    tlSweeping.add(year);
    tlPaint(year); // ticks + caret now, no markers yet
    requestAnimationFrame(() => {
      tlSweeping.delete(year);
      yearEvents(year); // pay the ~0.1–0.3 s sweep (cached for the session)
      if (tlActiveYear === year) tlPaint(year); // only if we're still on it
    });
  }

  /** Per frame while a deps.scrub is active: keep the caret glued to deps.clock.t. */
  function tlFrame(): void {
    if (tlActiveYear === null) return;
    const { caretFrac } = timelineLayout(tlSpan0, tlSpanLen, [], deps.clock.t);
    tlSetCaret(caretFrac);
  }

  /**
   * Apply a deps.scrub move (px deltas from the press point) to deps.clock + slider.
   * Shared by the mouse path (F1) and the 3-finger path (F2). Commits an axis
   * only past its dead zone (6 px X / 4 px Y) so jitter never nudges time or
   * speed. Returns true when the move was committed (URL/moon/HUD work).
   */
  function applyScrubMove(s: ScrubState, dx: number, dy: number): boolean {
    let committed = false;
    const firstX = !s.movedX && Math.abs(dx) > 6;
    const firstY = !s.movedY && Math.abs(dy) > 4;
    if (firstX) s.movedX = true;
    if (firstY) s.movedY = true;
    // The emphasis appears only once a real move crosses a dead zone — a
    // 4 px jitter must never light the strip up (and never read back as one).
    // Plan 025 F2: the PANES-level pulse stays, and the per-value magnify
    // (.hot) follows the axis actually moving: horizontal → the date number,
    // vertical → the speed number; a diagonal drag lights both.
    if (firstX || firstY) deps.hudMiniEl.classList.add('scrubbing');
    if (s.movedX) {
      deps.hudDateEl.classList.add('hot');
      // Plan 024 F1: LINEAR and speed-independent — 1 px = 1 sim day — clamped
      // to the PRESS year (Jan 1 → Dec 31). A ~365 px drag sweeps a full year;
      // the gesture can never leave it (year hopping is out of scope for the
      // minimal pane, plan 025 F2).
      deps.clock.setDate(
        new Date(
          J2000_UTC + scrubClampToYear(s.startDays, s.span0Days, s.spanLenDays, dx) * 86_400_000,
        ),
      );
      committed = true;
    }
    if (s.movedY) {
      deps.hudSpeedEl.classList.add('hot');
      deps.applySliderSpeed(scrubSpeedLog(s.startLog, dy));
      committed = true;
    }
    return committed;
  }

  // The right button has no other use on this deps.canvas — kill the native menu
  // (it would otherwise pop up on the release, mid- or post-gesture).
  deps.canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());

  deps.canvas.addEventListener('pointerdown', (ev) => {
    deps.suppressPickAfterScrub = false; // a new press clears any leftover suppression
    if (ev.pointerType !== 'mouse' || ev.button !== 2) return;
    // Plan 024 F1: capture the PRESS year — the gesture is clamped to Jan 1 →
    // Dec 31 of it ("zero" is Jan 1 of the current year, never the press
    // epoch; a deps.scrub can never leave that year).
    const pressYear = new Date(J2000_UTC + deps.clock.t * 86_400_000).getUTCFullYear();
    const span = yearSpanDays(pressYear);
    deps.scrub = {
      startX: ev.clientX,
      startY: ev.clientY,
      startDays: deps.clock.t,
      startLog: deps.clock.getLogSpeed(),
      movedX: false,
      movedY: false,
      span0Days: span.span0Days,
      spanLenDays: span.spanLenDays,
    };
    deps.clock.beginScrub();
    // The overlay stays hidden until a move crosses the dead zone.
  });

  // On WINDOW so a drag that leaves the deps.canvas keeps scrubbing (and the deps.clock
  // can never be left frozen by the pointer escaping).
  window.addEventListener('pointermove', (ev) => {
    // `buttons` is a bitmask: 1 = left, 2 = middle, 4 = RIGHT. The gesture
    // only tracks while the right button is held.
    if (!deps.scrub || ev.pointerType !== 'mouse' || (ev.buttons & 4) === 0) return;
    const dx = ev.clientX - deps.scrub.startX;
    const dy = ev.clientY - deps.scrub.startY;
    if (applyScrubMove(deps.scrub, dx, dy)) {
      deps.lastMoonResampleMs = performance.now(); // moon line follows the deps.scrub live
      deps.syncUrl();
    }
    if (deps.scrub.movedX || deps.scrub.movedY) {
      tlShow(); // plan 024 F2: the full-width bar is a deps.scrub-only affordance
      tlRefresh(); // plan 023 F3: rebuild/paint the per-year timeline
    }
  });

  window.addEventListener('pointerup', (ev) => {
    if (!deps.scrub || ev.pointerType !== 'mouse' || ev.button !== 2) return;
    const s = deps.scrub;
    deps.scrub = null;
    deps.clock.endScrub();
    if (s.movedX || s.movedY) {
      deps.resampleMoonNow(); // settle the moon line at the final epoch
      deps.suppressPickAfterScrub = true;
    }
    // Release the emphasis: the strip returns to its calm state the moment
    // the gesture ends (the user's ask: animation "released" on release).
    clearScrubHud();
  });

  // A cancelled gesture must restore the deps.clock exactly as it was before the
  // press — never leave `paused` dangling (the one real failure mode).
  window.addEventListener('pointercancel', (ev) => {
    if (!deps.scrub || ev.pointerType !== 'mouse') return;
    deps.scrub = null;
    deps.clock.endScrub();
    clearScrubHud();
  });

  // --- Time scrubbing (plan 022 F2): 3-finger drag = the same 2D pad --------
  // Touch twin of F1: while >= 3 fingers are down on the deps.canvas, the centroid
  // is the "press point" — horizontal centroid travel moves through time
  // (right = future), vertical travel moves the speed slider (up = faster).
  // The shared applyScrubMove() commits axes past the same dead zones, so the
  // two gestures are behaviourally identical. OrbitControls never reacts to a
  // 3rd pointer (its touch switch only handles 1-2), so the deps.scrub owns the
  // extra finger cleanly.
  //
  // ONE correction to the plan's handoff assumption (verified against the
  // vendored r168 source, OrbitControls.onPointerUp): it re-seeds its
  // multi-touch state only when a lift leaves EXACTLY ONE pointer (`case 1`)
  // — a 3→2 lift falls through and the surviving pinch stays dead. So when a
  // deps.scrub ends by dropping to 2 fingers we bounce one surviving finger
  // (pointerup + immediate pointerdown at its current position): OrbitControls
  // removes then re-adds it and re-runs _onTouchStart at length 2, re-arming
  // the pinch/dolly from the live positions — no jump.
  function endThreeFingerScrub(active: boolean): void {
    const s = deps.threeFinger;
    if (!s || s.ended) return;
    s.ended = true;
    deps.clock.endScrub();
    if (active) {
      deps.resampleMoonNow(); // settle the moon line at the final epoch
      deps.suppressPickAfterScrub = true; // a deps.scrub release is never a pick
    }
    // Release the emphasis on the mini strip (same as the mouse path).
    clearScrubHud();
  }

  deps.canvas.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType !== 'touch') return;
    if (deps.touchPointers.size >= 4) return; // the 4th finger is dead weight
    deps.touchPointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (deps.touchPointers.size !== 3) return;
    // Third finger down: the gesture takes over (OrbitControls is inert at
    // 3 pointers) and the deps.clock freezes at the centroid press point.
    const pts = [...deps.touchPointers.values()];
    const avgX = (pts[0].x + pts[1].x + pts[2].x) / 3;
    const avgY = (pts[0].y + pts[1].y + pts[2].y) / 3;
    // Plan 024 F1: the 3-finger gesture is clamped to the PRESS year, too.
    const pressYear = new Date(J2000_UTC + deps.clock.t * 86_400_000).getUTCFullYear();
    const span = yearSpanDays(pressYear);
    deps.threeFinger = {
      startX: avgX,
      startY: avgY,
      startDays: deps.clock.t,
      startLog: deps.clock.getLogSpeed(),
      movedX: false,
      movedY: false,
      live: false,
      ended: false,
      span0Days: span.span0Days,
      spanLenDays: span.spanLenDays,
    };
    deps.clock.beginScrub();
  });

  deps.canvas.addEventListener('pointermove', (ev) => {
    if (ev.pointerType !== 'touch' || !deps.touchPointers.has(ev.pointerId)) return;
    deps.touchPointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    const s = deps.threeFinger;
    if (!s || s.ended || deps.touchPointers.size < 3) return;
    const pts = [...deps.touchPointers.values()];
    const avgX = (pts[0].x + pts[1].x + pts[2].x) / 3;
    const avgY = (pts[0].y + pts[1].y + pts[2].y) / 3;
    if (applyScrubMove(s, avgX - s.startX, avgY - s.startY)) {
      s.live = true;
      deps.lastMoonResampleMs = performance.now(); // moon line follows the deps.scrub live
      deps.syncUrl();
    }
    if (s.movedX || s.movedY) {
      tlShow(); // plan 024 F2: the full-width bar is a deps.scrub-only affordance
      tlRefresh(); // plan 023 F3: per-year timeline
      tlScrubLens(); // plan 028 F1 + 032: lens on the SELECTOR (caret), phone
    }
  });

  // On WINDOW so a lift / cancel outside the deps.canvas still ends the gesture and
  // the deps.clock can never be left frozen.
  window.addEventListener('pointerup', (ev) => {
    if (ev.pointerType !== 'touch' || deps.rearmBounce) return;
    if (deps.touchPointers.size === 0) return;
    const wasThree = deps.touchPointers.size >= 3;
    deps.touchPointers.delete(ev.pointerId);
    const s = deps.threeFinger;
    if (!s) return;
    if (!wasThree) return; // the deps.scrub was already over (or never moved)
    if (s.ended) return;
    deps.suppressPickAfterScrub = true; // a 3-finger lift is never a pick, even idle
    endThreeFingerScrub(s.live);
    deps.threeFinger = null;
    if (deps.touchPointers.size === 2) {
      // Re-arm the surviving pinch: OrbitControls' own onPointerUp does not
      // re-seed at 2 pointers (see block comment), so bounce one survivor —
      // remove + re-add it and it re-runs _onTouchStart at the live positions.
      const id = [...deps.touchPointers.keys()][0];
      const p = deps.touchPointers.get(id)!;
      // The synthetic pair bubbles back into these own handlers (window +
      // deps.canvas); the deps.rearmBounce flag makes them ignore exactly this bounce.
      deps.rearmBounce = true;
      // pageX/pageY are computed from clientX/Y + scroll (the app never
      // scrolls), so clientX/Y alone re-seeds OrbitControls' pinch correctly.
      deps.canvas.dispatchEvent(
        new PointerEvent('pointerup', {
          pointerId: id,
          pointerType: 'touch',
          clientX: p.x,
          clientY: p.y,
        }),
      );
      deps.canvas.dispatchEvent(
        new PointerEvent('pointerdown', {
          pointerId: id,
          pointerType: 'touch',
          clientX: p.x,
          clientY: p.y,
        }),
      );
      deps.rearmBounce = false;
    }
  });

  window.addEventListener('pointercancel', (ev) => {
    if (ev.pointerType !== 'touch') return;
    deps.touchPointers.delete(ev.pointerId);
    const s = deps.threeFinger;
    if (s && !s.ended && deps.touchPointers.size < 3) endThreeFingerScrub(s.live);
    if (s && deps.touchPointers.size < 3) deps.threeFinger = null;
  });

  return {
    tlShow,
    tlRefresh,
    tlSetCaret,
    tlCurrentYear,
    tlFrame,
  };
}
