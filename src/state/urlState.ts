/**
 * Shareable URL state. Pure and Node-testable: encodes the app's UI + view
 * state to/from a URL's query string (no DOM, only the WHATWG `URL` API).
 *
 * Query parameters (all optional — a link may carry any subset):
 *   t   = sim time as UTC milliseconds            (e.g. 1758000000000)
 *   sp  = speed slider value, log10 days/sec      (e.g. 0 => 1 d/s)
 *   f   = followed body id                        (""/absent = free camera)
 *   sc  = "v" (visible scale) | "t" (true scale)
 *   o   = orbits  on/off (1/0)
 *   l   = labels  on/off (1/0)
 *   b   = belts   on/off (1/0)
 *   p   = paused  on/off (1/0)
 *   cam = "px,py,pz,tx,ty,tz" camera pos + target (6 finite numbers)
 */

export type ScaleChoice = 'visible' | 'true';

export interface ViewState {
  /** Sim time as UTC milliseconds (Date.now() domain). */
  timeMs?: number;
  /** Speed slider value (log10 days per second). */
  speedLog?: number;
  /** Followed body id; '' or undefined = free camera. */
  follow?: string;
  scale?: ScaleChoice;
  orbits?: boolean;
  labels?: boolean;
  belts?: boolean;
  paused?: boolean;
  /** Optional camera: position + orbit target, each a finite [x,y,z]. */
  cam?: { pos: [number, number, number]; target: [number, number, number] };
}

const NUM = Number.isFinite;

function finiteNum(s: string | null): number | undefined {
  if (s == null || s === '') return undefined;
  const n = Number(s);
  return NUM(n) ? n : undefined;
}

function finiteTriple(s: string | null): [number, number, number] | undefined {
  if (!s) return undefined;
  const parts = s.split(',').map((x) => Number(x));
  if (parts.length !== 3 || !parts.every(NUM)) return undefined;
  return [parts[0], parts[1], parts[2]];
}

function flag(s: string | null): boolean | undefined {
  if (s == null || s === '') return undefined;
  return s === '1' || s === 'true';
}

/** Parse a ViewState from a URL string. Tolerates missing / malformed parts. */
export function parseAppState(href: string): ViewState {
  const u = new URL(href, 'http://localhost');
  const q = u.searchParams;
  const state: ViewState = {};

  const timeMs = finiteNum(q.get('t'));
  if (timeMs !== undefined) state.timeMs = timeMs;

  const speedLog = finiteNum(q.get('sp'));
  if (speedLog !== undefined) state.speedLog = speedLog;

  const follow = q.get('f');
  if (follow != null) state.follow = follow;

  const sc = q.get('sc');
  if (sc === 't') state.scale = 'true';
  else if (sc === 'v') state.scale = 'visible';

  const orbits = flag(q.get('o'));
  if (orbits !== undefined) state.orbits = orbits;
  const labels = flag(q.get('l'));
  if (labels !== undefined) state.labels = labels;
  const belts = flag(q.get('b'));
  if (belts !== undefined) state.belts = belts;
  const paused = flag(q.get('p'));
  if (paused !== undefined) state.paused = paused;

  const camRaw = q.get('cam');
  if (camRaw) {
    const parts = camRaw.split(',').map(Number);
    if (parts.length === 6 && parts.every(NUM)) {
      state.cam = {
        pos: [parts[0], parts[1], parts[2]],
        target: [parts[3], parts[4], parts[5]],
      };
    }
  }

  return state;
}

/** Append/overwrite state params on a URL string, preserving the path + hash. */
export function encodeAppState(href: string, s: ViewState): string {
  const u = new URL(href, 'http://localhost');
  const q = u.searchParams;

  const setOrDel = (key: string, val: string | undefined): void => {
    if (val === undefined) q.delete(key);
    else q.set(key, val);
  };

  setOrDel('t', s.timeMs !== undefined ? String(Math.round(s.timeMs)) : undefined);
  setOrDel('sp', s.speedLog !== undefined ? String(round3(s.speedLog)) : undefined);
  setOrDel('f', s.follow === undefined ? undefined : s.follow);
  setOrDel('sc', s.scale === undefined ? undefined : (s.scale === 'true' ? 't' : 'v'));
  setOrDel('o', s.orbits === undefined ? undefined : (s.orbits ? '1' : '0'));
  setOrDel('l', s.labels === undefined ? undefined : (s.labels ? '1' : '0'));
  setOrDel('b', s.belts === undefined ? undefined : (s.belts ? '1' : '0'));
  setOrDel('p', s.paused === undefined ? undefined : (s.paused ? '1' : '0'));

  if (s.cam) {
    const [px, py, pz, tx, ty, tz] = [...s.cam.pos, ...s.cam.target].map(round3);
    setOrDel('cam', `${px},${py},${pz},${tx},${ty},${tz}`);
  } else {
    q.delete('cam');
  }

  const search = q.toString();
  // Rebuild preserving origin + path (absolute input) or path (relative input).
  const prefix = u.origin.startsWith('http') && href.includes('://') ? `${u.origin}${u.pathname}` : u.pathname;
  return `${prefix}${search ? `?${search}` : ''}${u.hash}`;
}

function round3(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

export { finiteNum, finiteTriple, flag as parseFlag };
