/**
 * Plan 035 F5 — command registry (pure; no DOM side effects).
 *
 * Defines every keyboard command + palette entry in ONE place so the keyboard
 * handler, the `?cmd=` URL param, the on-screen help, and the command palette
 * all read from the same list (no drift). This module only describes commands
 * (key → id → label); the ACTUAL side effect for each id lives in main.ts
 * behind a single `runCommand(id)` switch, so the registry stays testable.
 *
 * Keyboard guards (also enforced in main.ts): a command fires only when the
 * user is not typing in a text/number input (the Find field and date picker
 * consume their own keys), and multi-key chords (Ctrl/Cmd+K) bypass it.
 */

/** A single command. `keys` are the display keys; `key` is the primary key the handler dispatches on. */
export interface CommandDef {
  /** Stable id main.ts switches on (also the `?cmd=` value). */
  id: string;
  /** Primary `ev.key` value (or a chord like `ctrl+k`). */
  key: string;
  /** Human key label for the palette/help (may differ from `key`, e.g. `Space`). */
  keys: string[];
  /** Short label shown in the palette. */
  label: string;
  /** One-line description. */
  hint: string;
  /** Grouping in the palette. */
  group: 'time' | 'view' | 'sky' | 'camera' | 'system';
}

/** The full command set (plan 035 F5). Order = palette order within a group. */
export const COMMANDS: CommandDef[] = [
  // --- time ---
  {
    id: 'pause',
    key: 'Space',
    keys: ['Space'],
    label: 'Play / pause',
    hint: 'Toggle the clock',
    group: 'time',
  },
  {
    id: 'speed-up',
    key: 'ArrowUp',
    keys: ['↑'],
    label: 'Speed up',
    hint: 'Raise sim speed',
    group: 'time',
  },
  {
    id: 'speed-down',
    key: 'ArrowDown',
    keys: ['↓'],
    label: 'Slow down',
    hint: 'Lower sim speed',
    group: 'time',
  },
  {
    id: 'now',
    key: 'n',
    keys: ['N'],
    label: 'Jump to now',
    hint: 'Reset the clock to today',
    group: 'time',
  },
  {
    id: 'reverse',
    key: 'r',
    keys: ['R'],
    label: 'Reverse time',
    hint: 'Run the clock backwards',
    group: 'time',
  },
  {
    id: 'time-step-back',
    key: ',',
    keys: [','],
    label: 'Step back in time',
    hint: 'Jump the clock back (proportional to speed)',
    group: 'time',
  },
  {
    id: 'time-step-fwd',
    key: '.',
    keys: ['.'],
    label: 'Step forward in time',
    hint: 'Jump the clock ahead (proportional to speed)',
    group: 'time',
  },
  // --- view ---
  {
    id: 'orbits',
    key: 'o',
    keys: ['O'],
    label: 'Toggle orbits',
    hint: 'Show / hide orbit lines',
    group: 'view',
  },
  {
    id: 'labels',
    key: 'l',
    keys: ['L'],
    label: 'Toggle labels',
    hint: 'Show / hide body labels',
    group: 'view',
  },
  {
    id: 'belts',
    key: 'b',
    keys: ['B'],
    label: 'Toggle belts',
    hint: 'Show / hide the asteroid belts',
    group: 'view',
  },
  {
    id: 'figures',
    key: 'f',
    keys: ['F'],
    label: 'Toggle figures',
    hint: 'Show / hide constellation figures',
    group: 'view',
  },
  // --- sky ---
  {
    id: 'milkyway',
    key: 'm',
    keys: ['M'],
    label: 'Toggle Milky Way',
    hint: 'Show / hide the deep-sky background',
    group: 'sky',
  },
  {
    id: 'zodiacal',
    key: 'z',
    keys: ['Z'],
    label: 'Toggle zodiacal light',
    hint: 'Show / hide the sunlit dust glow',
    group: 'sky',
  },
  {
    id: 'atmospheres',
    key: 'a',
    keys: ['A'],
    label: 'Toggle atmospheres',
    hint: 'Show / hide the fresnel rims',
    group: 'sky',
  },
  {
    id: 'post',
    key: 'p',
    keys: ['P'],
    label: 'Toggle bloom / HDR',
    hint: 'Post-processing on / off (F2)',
    group: 'sky',
  },
  // --- camera ---
  {
    id: 'scale',
    key: 't',
    keys: ['T'],
    label: 'True / visible scale',
    hint: 'Swap the scale mode',
    group: 'camera',
  },
  {
    id: 'camera-preset',
    key: 'c',
    keys: ['C'],
    label: 'Camera preset',
    hint: 'Cycle top / side view',
    group: 'camera',
  },
  {
    id: 'release',
    key: 'Escape',
    keys: ['Esc'],
    label: 'Release follow',
    hint: 'Stop tracking the picked body',
    group: 'camera',
  },
  {
    id: 'screenshot',
    key: 's',
    keys: ['S'],
    label: 'Save screenshot',
    hint: 'Download a PNG of the view',
    group: 'system',
  },
];

/** Palette entry = a command, plus the jump-to-body entries appended. */
export interface PaletteEntry {
  id: string;
  keys: string[];
  label: string;
  hint: string;
  group: string;
}

/** Jump-to-body palette entries (`jump-<id>`), generated from the planet list. */
export function jumpEntries(planets: { id: string; name: string }[]): PaletteEntry[] {
  return planets.map((p) => ({
    id: `jump-${p.id}`,
    keys: [],
    label: `Go to ${p.name}`,
    hint: 'Fly the camera to this body',
    group: 'jump',
  }));
}

/**
 * All palette entries: the fixed commands first, then the jump-to-body list.
 * `planets` is the ordered planet (non-sun, non-dwarf, non-moon) list.
 */
export function paletteEntries(planets: { id: string; name: string }[]): PaletteEntry[] {
  const base: PaletteEntry[] = COMMANDS.map((c) => ({
    id: c.id,
    keys: c.keys,
    label: c.label,
    hint: c.hint,
    group: c.group,
  }));
  return [...base, ...jumpEntries(planets)];
}

/**
 * Resolve a keyboard `ev.key` to a command id, or null. Case-insensitive for
 * letter keys (so a Caps-Locked `a` still works). The palette-open chord
 * (Ctrl/Cmd+K) is matched by the caller separately because it needs `ev.ctrlKey`.
 */
export function commandForKey(key: string): string | null {
  const lower = key.length === 1 ? key.toLowerCase() : key;
  for (const c of COMMANDS) {
    const ck = c.key.length === 1 ? c.key.toLowerCase() : c.key;
    if (ck === lower) return c.id;
  }
  // Digit keys 1..9,0 jump to that planet (1-indexed: 1=Mercury … 8=Neptune,
  // 0=Sun). The digit itself is the id suffix; main.ts maps index → planet.
  if (/^[1-9]$/.test(key)) return `jump-digit-${key}`;
  if (key === '0') return 'jump-digit-0';
  return null;
}

/**
 * Map a digit key (1..9 / 0) to a planet id for the jump command. The planets
 * list is the display order (Mercury first, Sun via `0`). Returns null for an
 * out-of-range digit.
 */
export function digitToPlanet(
  key: string,
  planets: { id: string }[],
  sunId: string,
): string | null {
  if (key === '0') return sunId;
  const idx = parseInt(key, 10) - 1; // 1 -> 0th planet
  if (idx < 0 || idx >= planets.length) return null;
  return planets[idx].id;
}
