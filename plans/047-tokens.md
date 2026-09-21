# Plan 047 — Apple design tokens (index.html :root)

One cool near-monochrome space palette. Warmth ONLY from the Sun.
Max 2 hues in any frame (cool blue + warm sun).

| Token | Value | Use |
|---|---|---|
| --bg | #000000 | true black space |
| --bg-deep | #02040a | vignette / far space |
| --surface | rgba(18,22,32,0.55) | floating glass card |
| --surface-2 | rgba(28,34,48,0.6) | raised rows / popovers |
| --hairline | rgba(255,255,255,0.10) | 1px borders (white, not blue) |
| --hairline-strong | rgba(255,255,255,0.22) | focus / active border |
| --text-1 | #f5f7fa | primary text |
| --text-2 | #a8b2c4 | secondary text |
| --text-3 | #5f6b80 | faint / captions |
| --accent | #7aa2ff | the ONE interactive blue |
| --accent-2 | #a9c4ff | accent hover / heading |
| --sun | #ffd9a0 | the only warm color |
| --ok | #6fd39a | success (replaces neon 0x7cfc5a) |
| --danger | #ff6b6b | error |

Glass material (apply to ALL surfaces):
  backdrop-filter: blur(20px) saturate(1.4);
  background: var(--surface);
  border: 1px solid var(--hairline);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08),
              0 8px 32px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.3);
  border-radius: 16px;   /* cards; 10px inner rows; 999px pills */

Motion: --ease: cubic-bezier(0.22,1,0.36,1); 200-320ms. One easing family.

Type:
  title 16px/600 ls .12em --text-1
  section head 11px/600 ls .16em --text-3
  body 13.5px/1.55 --text-2 ; values 13px/600 --text-1 tabular-nums
  planet label 13px/500 ls .04em --text-1 (no box, soft shadow)
  constellation 12px/400 ls .28em caps --text-2 op .7 (Sky view only)
  picked label 14px/600 --text-1 + 2px accent underline

Scene colors:
  orbit base rgba(122,162,255,0.10) ; near 0.14 -> far 0.03 ; picked 0.55
  constellation line 0.15 alpha (Sky only)
  star spike alpha 0.12 width 2.2x (only ~20 brightest)
  sun corona 3.2x op 0.45, NO anamorphic streak
