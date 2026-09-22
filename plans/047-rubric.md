# Plan 047 — Acceptance rubric (judge contract)

Score 0–10 per criterion, multiply by weight, sum → **normalize to /100**:
`score = (weighted_sum / 90) × 100` (the weights sum to 90, not 100 — the
original "sum → /100" made the max 90 and the ≥95 bar unreachable; this
normalization keeps the relative weights and makes perfect = 100).
**PASS = ≥95 AND all 12 checklist items true.** Baseline (current app):
**79/100 FAIL** (raw weighted sum 712/90).

| #   | Criterion             | Measure                                                                                                        | Weight |
| --- | --------------------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| C1  | Scene is the hero     | % of frame that is pure scene (no UI ink, no line ink). ≥85%=10; 70–85=7; 55–70=4; <55=1                       | 15     |
| C2  | One subject per frame | Clear focal subject (Sun or picked planet)? Yes=10; ambiguous=5; none=0                                        | 10     |
| C3  | Orbit legibility      | Wide view: can you trace ≥5 distinct orbits? 5+=10; 3–4=6; 1–2=3; mesh=0. No unpicked orbit >0.2 alpha else −2 | 15     |
| C4  | Label discipline      | Body labels legible + de-collided (no overlap, no soup)? Clean=10; minor overlap=6; soup=1. Two label systems at once = −3 (user-mandated: labels for every planet + satellite are RESTORED, so a handful of clean labels is correct, not a fail) | 15     |
| C5  | Palette coherence     | Distinct hues (excl. planet textures): ≤2=10; 3=7; 4=4; ≥5=1. Neon green/gold in scene = −2                    | 10     |
| C6  | No "wireframe tells"  | No "+" spikes, no lens streak, no label boxes, no emoji in chrome: all clean=10; 1 tell=6; ≥2=2                | 10     |
| C7  | Material consistency  | All glass surfaces share blur/radius/border/shadow tokens? All=10; mostly=6; mixed=2                           | 8      |
| C8  | Type & motion polish  | Tabular nums, single easing family, ≤1 concurrent animation at rest, no strobe. All=10; 2 fails=5; ≥3=2        | 7      |

## 12-item pass checklist (all must be true)

1. Default frame: ≤6 visible UI elements, panel collapsed to a pill.
2. No ISS / NEO / asteroid / comet / DSO / DOF / APOD / exo-Systems UI or
   labels anywhere. Only the 8 planets + Sun + Moon + real satellites may be
   shown/labeled (user-mandated: "planets, satellites, moon — no other unknown
   objects with weird names, no stuff we built like ISS").
3. Wide view: no orbit tangle — far orbits fade to ~0.03 alpha.
4. No "+" star spikes visible at any zoom.
5. Sun: round, hot, no anamorphic streak.
6. Body labels (every planet + satellite) legible and de-collided in the
   default view; constellation names only in Sky mode.
7. One accent hue (#7aa2ff) + warm Sun only; no neon green/gold in scene.
8. All glass surfaces identical material (blur 20px, 16px radius, hairline).
9. No emoji in UI chrome (line icons only).
10. Single easing curve; no competing pulses.
11. Mobile 390×844: same calm composition, no overflow, no overlap.
12. `npm test` + `npm run build` green; bundle < 1.3 MB.

## Scoring protocol (anti-inflation)

- Score from FRESH headless-Chrome screenshots (boot, wide, mobile) + code
  inspection — never from memory of the last iteration.
- Each criterion score must cite the screenshot region or code line that justifies it.
- If a criterion is ambiguous, score it DOWN, not up.
- Record: date, commit hash, per-criterion scores, total, PASS/FAIL, and the
  single highest-ROI gap for the next iteration.
