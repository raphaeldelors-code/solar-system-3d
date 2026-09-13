# 037 — Skip-intro button: appears with no intro, impossible to dismiss (pinned-URL reload)

## Ask

> "When refreshing this page directly — the button skip intro comes even when no
> intro and impossible to make it disappear."
>
> Repro URL (pinned view):
> `?t=1791741060951&sp=0&f=earth&sc=v&o=1&l=1&b=1&fig=0&p=0&rv=0&ev=0&cam=-15.87702,4.005934,22.671036,-14.283637,-0.000425,-4.638819`

ONE feature (intro-overlay visibility + no-replay), ONE commit.

## Root cause (confirmed in source)

The repro URL has BOTH `f=earth` and `cam=...`. In `src/main.ts:2179-2186`:

```ts
const urlPinsView =
  Boolean(urlState.follow) || // f=earth → true
  Boolean(urlState.constellation) ||
  Boolean(urlState.cam) || // cam=... → true
  Boolean(cmdParam && cmdIsKnown);
if (introShouldPlay(reduced, introParam, urlPinsView)) {
  startIntro(); // ← NEVER CALLED (urlPinsView is true)
}
```

So **no intro plays** (correct — a pinned link must land exactly where the link
says). But the button still renders, for two compounding reasons:

1. **CSS (the "impossible to dismiss" part):** `index.html:1068` declares
   `#intro { display: flex }` — an **id** selector, specificity **1-0-0**, which
   **outranks** the UA `[hidden] { display: none }` (**0-1-0**). The DOM starts as
   `<div id="intro" hidden>` (`index.html:1239`), so `hidden` is set — yet
   `display:flex` wins and the full-screen wrapper is laid out.
   - `#intro-title` is invisible because its CSS sets `opacity: 0`
     (`index.html:1081`).
   - `#intro-skip` has **NO** `opacity:0` and is **not** `hidden` in the initial
     DOM (`index.html:1244`) → **it renders**.
   - Clicking it calls `finishIntro(true)` (`main.ts:1808`), which early-returns
     because `intro` is null (`main.ts:1737`) → nothing happens → "impossible to
     make it disappear."

   The codebase already solves this exact problem for the command palette:
   `#palette[hidden] { display: none }` (`index.html:1144`). `#intro` was simply
   never given the equivalent override.

2. **Replay (the "comes back on refresh" part, plain non-pinned reloads):** there
   is **no persistence** of any kind — `localStorage`/`sessionStorage` appear
   **0 times** in `src/`. A bare reload replays the whole 5.8 s dolly + title +
   button every time.

After a _real_ intro finishes, `finishIntro()` explicitly sets
`introSkipEl.hidden = true` (`main.ts:1769,1784`) and the button has no display
override → it hides correctly. So the stuck button is **only** in the
never-played (pinned) case — which is exactly the repro. This confirms fix #1 is
necessary and sufficient for the reported symptom.

## Change

### (a) CSS — make `#intro[hidden]` actually hide (core fix)

Add the same override `#palette` already has, right after `#intro { ... }`:

```css
#intro[hidden] {
  display: none;
}
```

This hides the whole wrapper (title **and** button) whenever the `hidden`
attribute is present — which is the initial state and the post-intro state.

### (b) Defensive: hide the skip button in the initial DOM too

Give `<button id="intro-skip">` a `hidden` attribute in `index.html:1244`.
`startIntro()` unhides it (it already unhides the title); `finishIntro()`
re-hides it. This makes the "never played" state robust even if the wrapper were
ever shown without an active intro.

### (c) No replay within a session (sessionStorage seen-flag)

In `src/render/intro.ts`, add a pure predicate so the gate stays unit-testable:

```ts
export function introShouldPlay(
  reducedMotion: boolean,
  introParam: string | null,
  urlPinsView: boolean,
  alreadySeen: boolean, // NEW — a prior intro finished in this session
): boolean {
  if (reducedMotion) return false;
  if (introParam === '0') return false;
  if (urlPinsView) return false;
  if (alreadySeen) return false;
  return true;
}
```

`INTRO_SEEN_KEY = 'solar_intro_seen'`. In `src/main.ts`:

- Read `sessionStorage.getItem(INTRO_SEEN_KEY) === '1'` and pass it as the 4th
  arg to `introShouldPlay(...)`.
- In `finishIntro()`, `sessionStorage.setItem(INTRO_SEEN_KEY, '1')` (so both the
  natural end and a skip mark it seen).

A pinned link never replays regardless (urlPinsView already short-circuits), so
the seen-flag only affects **plain** reloads — which is exactly the "comes back
on refresh" complaint. `sessionStorage` (not `localStorage`) = once per browser
session/tab, the standard "don't replay this intro" semantics.

## Test plan

1. `tests/f5Commands.test.ts` — extend the `introShouldPlay` case with the new
   4th arg: `introShouldPlay(false, null, false, true)` → false; and the
   existing "plays" case becomes `introShouldPlay(false, null, false, false)` →
   true. (The pure function keeps the test DOM-free.)
2. Live (headless Chrome, `?`-pinned repro URL): confirm `#intro` computed
   `display` is `none`, `#intro-skip` is NOT visible, and no intro dolly runs
   (camera stays at the pinned pose). This is the user's exact symptom.
3. Live (plain URL, first load): intro plays; on a **reload** it does NOT
   replay (seen-flag). Verify by reading `sessionStorage` + `#intro` state.
4. Gates: `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run format:check`,
   `npm run build`.
5. Commit (feature) → push → docs commit (record hash) → deploy to gh-pages
   (rolling-dist pattern) → verify the live bundle + `#intro[hidden]` rule.
