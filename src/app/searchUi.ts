// The "Find" combobox (body + constellation search, plan 010 S4 / B2) lives
// here, out of main.ts (plan 044 D2). One dropdown, one keyboard-nav path and
// one `findPick` handle both bodies (bare ids) and constellations
// (`const:<Name>` namespaced ids). Selecting a body flies the camera exactly
// like a pick; selecting a constellation flies to a sky-dome view that centres
// it and lights its lines gold. Plan 017 F4: the "Free camera" row is GONE —
// the anchor is the selection, always; an empty/unknown pick falls back to the
// Sun anchor.

import { ALL_BODIES } from '../data/bodies';
import {
  searchConstellations,
  constellationMenu,
  CONSTELLATION_ID_PREFIX,
} from '../data/constellationSearch';
import { searchBodies, groupedBodyMenu } from '../data/searchIndex';
import { type CamAnchor } from '../render/cameraFlight';

export interface SearchUiDeps {
  byId: Map<string, { name: string }>;
  camAnchorForBody: (id: string) => CamAnchor | null;
  findInputEl: HTMLInputElement;
  findListEl: HTMLDivElement;
  flyTo: (dest: CamAnchor, duration?: number, bodyId?: string | null) => void;
  flyToConstellation: (name: string) => void;
}

export interface SearchUiApi {
  /** Reflect the current follow into the input (called by flyTo + URL restore). */
  setFindValue: (id: string) => void;
}

export function createSearchUi(deps: SearchUiDeps): SearchUiApi {
  const findMenu = groupedBodyMenu(ALL_BODIES); // body display order, unfiltered
  const constellationMenuAll = constellationMenu(); // 88, IAU order (ids `const:Name`)
  const FIND_MENU_CONST_CAP = 15; // empty-query menu: bodies + a slice of consts
  let findActiveIdx = -1; // highlighted row in the open dropdown

  /**
   * A single dropdown row: a body (`c: false`) or a constellation (`c: true`).
   * `id` is the pick id — the bare body id for bodies, or the `const:<Name>`
   * namespaced id for constellations (so one `findPick` handles both kinds).
   */
  interface FindRow {
    c: boolean;
    id: string;
    name: string;
    sub: string;
  }

  function findRowsFor(query: string): FindRow[] {
    const rows: FindRow[] = [];
    if (!query.trim()) {
      for (const e of findMenu) rows.push({ c: false, id: e.id, name: e.name, sub: e.sub });
      for (const e of constellationMenuAll.slice(0, FIND_MENU_CONST_CAP)) {
        rows.push({ c: true, id: e.id, name: e.name, sub: e.sub });
      }
      return rows;
    }
    const bodies = searchBodies(ALL_BODIES, query);
    for (const h of bodies) {
      rows.push({
        c: false,
        id: h.id,
        name: h.name,
        sub: h.parentName ? `moon of ${h.parentName}` : h.kind,
      });
    }
    const consts = searchConstellations(query);
    for (const c of consts) rows.push({ c: true, id: c.id, name: c.name, sub: c.sub });
    return rows;
  }

  function findLabel(id: string): string {
    if (id.startsWith(CONSTELLATION_ID_PREFIX)) return id.slice(CONSTELLATION_ID_PREFIX.length);
    return deps.byId.get(id)?.name ?? id;
  }

  /** Reflect the current follow into the input (called by flyTo + URL restore). */
  function setFindValue(id: string): void {
    deps.findInputEl.value = findLabel(id);
  }

  function findClose(): void {
    deps.findListEl.hidden = true;
    findActiveIdx = -1;
  }

  function findMarkActive(): void {
    const rows = deps.findListEl.querySelectorAll<HTMLElement>('.fr');
    rows.forEach((r, i) => r.classList.toggle('active', i === findActiveIdx));
    rows[findActiveIdx]?.scrollIntoView({ block: 'nearest' });
  }

  function findRender(query: string): void {
    const rows = findRowsFor(query);
    deps.findListEl.replaceChildren();
    const frag = document.createDocumentFragment();
    if (rows.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'fr-empty';
      empty.textContent = 'No matches';
      frag.appendChild(empty);
    } else {
      for (const r of rows) {
        const row = document.createElement('div');
        row.className = r.c ? 'fr fr-const' : 'fr';
        row.innerHTML = `<span class="fr-name">${r.name}</span><span class="fr-sub">${r.sub}</span>`;
        row.addEventListener('click', () => findPick(r.id));
        frag.appendChild(row);
      }
    }
    deps.findListEl.appendChild(frag);
    findActiveIdx = 0;
    findMarkActive();
    deps.findListEl.hidden = false;
  }

  /**
   * Select a body (or `const:<Name>` constellation) from the dropdown and fly
   * to it. Constellations fly to a sky-dome view that centres the figure and
   * lights its lines gold (plan 010, S4); the body/constellation pick clears
   * the other's selection so only one target is ever emphasized.
   * Plan 017 F4: there is no "free camera" pick — an empty or unknown id
   * (e.g. Esc with the list closed) falls back to the Sun anchor, keeping the
   * selection the single source of the view anchor.
   */
  function findPick(id: string): void {
    deps.findInputEl.value = findLabel(id);
    findClose();
    deps.findInputEl.blur();
    if (id.startsWith(CONSTELLATION_ID_PREFIX)) {
      deps.flyToConstellation(id.slice(CONSTELLATION_ID_PREFIX.length));
      return;
    }
    const destId = id && deps.camAnchorForBody(id) ? id : 'sun';
    const dest = deps.camAnchorForBody(destId);
    if (dest) deps.flyTo(dest, 1.4, destId);
  }

  deps.findInputEl.addEventListener('focus', () => findRender(deps.findInputEl.value));
  deps.findInputEl.addEventListener('input', () => {
    // Any edit breaks "exactly one body" — re-open as a search from the
    // typed text so the user can pick what they mean.
    findRender(deps.findInputEl.value);
  });
  deps.findInputEl.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      // Esc closes the list; pressed again (list closed), it re-anchors on the
      // Sun (plan 017 F4: there is no free-camera state to drop back to).
      if (!deps.findListEl.hidden) findClose();
      else findPick('');
      return;
    }
    if (deps.findListEl.hidden) return;
    const rows = deps.findListEl.querySelectorAll<HTMLElement>('.fr');
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      findActiveIdx = Math.min(rows.length - 1, findActiveIdx + 1);
      findMarkActive();
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      findActiveIdx = Math.max(0, findActiveIdx - 1);
      findMarkActive();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      const active = rows[findActiveIdx];
      if (active) active.click();
    }
  });
  document.addEventListener('pointerdown', (ev) => {
    if (!deps.findListEl.hidden && !(ev.target as Element | null)?.closest('#find-wrap'))
      findClose();
  });

  return { setFindValue };
}
