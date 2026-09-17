/**
 * Celestial events panel (plan 044 B1; extracted from main.ts in plan 044 D2).
 *
 * Scans a window around "now" for eclipses, transits, conjunctions,
 * oppositions and Saturn ring edge-ings; renders them as a clickable list.
 * Clicking an event jumps the sim clock to that instant and flies to the
 * relevant body.
 *
 * Owns the panel's DOM listeners (toggle, range, date-pick change) and
 * exposes `eventsVisible` / `refreshEvents` for the rest of the app (the
 * calendar popover and the URL-state restore both re-scan on a date jump).
 * The element handles are passed in as deps — main.ts keeps them because the
 * calendar section shares `datePickEl` and the URL-state section reads
 * `eventsRowEl`.
 */
import { findEvents, type Event as SimEvent } from '../sim/events';
import { J2000_UTC } from '../sim/types';
import type { SimClock } from '../sim/clock';
import type { CamAnchor } from '../render/cameraFlight';

export interface EventsPanelDeps {
  clock: SimClock;
  dateEl: HTMLSpanElement;
  eventsToggleBtn: HTMLButtonElement;
  eventsRangeEl: HTMLSelectElement;
  eventsRowEl: HTMLDivElement;
  eventsListEl: HTMLDivElement;
  datePickEl: HTMLInputElement;
  /** Re-sample the Moon orbit line after an epoch jump. */
  resampleMoonNow: () => void;
  /** Persist the new state to the shareable URL. */
  syncUrl: () => void;
  /** Camera anchor for a body id (null if not frameable). */
  camAnchorForBody: (id: string) => CamAnchor | null;
  /** Fly the camera to an anchor. */
  flyTo: (dest: CamAnchor, duration?: number, bodyId?: string | null) => void;
  /** Commit a #date-pick change to the sim clock (calendar section). */
  applyDatePick: () => void;
}

export interface EventsPanel {
  eventsVisible: () => boolean;
  refreshEvents: () => void;
}

export function createEventsPanel(deps: EventsPanelDeps): EventsPanel {
  const {
    clock,
    dateEl,
    eventsToggleBtn,
    eventsRangeEl,
    eventsRowEl,
    eventsListEl,
    datePickEl,
    resampleMoonNow,
    syncUrl,
    camAnchorForBody,
    flyTo,
    applyDatePick,
  } = deps;

  function eventsVisible(): boolean {
    return !eventsRowEl.hidden;
  }

  function setComputing(msg: string): void {
    eventsListEl.textContent = msg;
    eventsListEl.classList.add('computing');
  }

  function clearComputing(): void {
    eventsListEl.classList.remove('computing');
  }

  /** Scan the sim around the current date and fill the events list. */
  function refreshEvents(): void {
    if (!eventsVisible()) return;
    const years = parseInt(eventsRangeEl.value, 10) || 5;
    setComputing('Computing events…');
    // Defer the (up to ~1 s) scan one frame so "Computing events…" paints first.
    requestAnimationFrame(() => {
      const nowMs = clock.toDate().getTime();
      const spanMs = years * 365.25 * 86_400_000;
      const t0Days = (nowMs - spanMs - J2000_UTC) / 86_400_000;
      const t1Days = (nowMs + spanMs - J2000_UTC) / 86_400_000;
      const evs = findEvents(t0Days, t1Days, { coarseStepDays: 0.2 });
      renderEvents(evs);
    });
  }

  function renderEvents(evs: SimEvent[]): void {
    clearComputing();
    eventsListEl.replaceChildren();
    if (evs.length === 0) {
      const p = document.createElement('p');
      p.className = 'ev-note';
      p.textContent = 'No events in this window.';
      eventsListEl.appendChild(p);
      return;
    }
    const frag = document.createDocumentFragment();
    for (const ev of evs) {
      const row = document.createElement('div');
      row.className = 'ev ' + evClass(ev);
      const d = new Date(ev.dateMs);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(d.getUTCDate()).padStart(2, '0');
      const dateSpan = document.createElement('span');
      dateSpan.className = 'ev-date';
      dateSpan.textContent = `${y}-${m}-${dd}`;
      const what = document.createElement('span');
      what.className = 'ev-what';
      what.textContent = ev.title;
      what.title = ev.detail;
      const det = document.createElement('span');
      det.className = 'ev-detail';
      det.textContent = ev.detail;
      what.appendChild(det);
      row.append(dateSpan, what);
      row.addEventListener('click', () => {
        clock.setDate(new Date(ev.dateMs));
        resampleMoonNow(); // Moon orbit line jumps with the epoch
        syncUrl();
        // Flash the date readout so the jump is obvious.
        dateEl.classList.remove('flash');
        void dateEl.offsetWidth;
        dateEl.classList.add('flash');
        // Fly to the event's primary body if it has a frameable anchor.
        const id = ev.bodyId;
        if (id) {
          const dest = camAnchorForBody(id);
          if (dest) flyTo(dest, 1.4, id);
        }
      });
      frag.appendChild(row);
    }
    eventsListEl.appendChild(frag);
  }

  /** Colour class per event type (drives the date accent in the list). */
  function evClass(ev: SimEvent): string {
    switch (ev.type) {
      case 'solar-eclipse':
        return 'ecl-solar';
      case 'lunar-eclipse':
        return 'ecl-lunar';
      case 'transit':
        return 'transit';
      case 'saturn-edge-on':
        return 'saturn';
      default:
        return '';
    }
  }

  eventsToggleBtn.addEventListener('click', () => {
    eventsRowEl.hidden = !eventsRowEl.hidden;
    eventsToggleBtn.classList.toggle('active', !eventsRowEl.hidden);
    if (!eventsRowEl.hidden) refreshEvents();
    syncUrl();
  });

  eventsRangeEl.addEventListener('change', () => {
    refreshEvents();
  });

  datePickEl.addEventListener('change', () => {
    applyDatePick();
  });

  return { eventsVisible, refreshEvents };
}
