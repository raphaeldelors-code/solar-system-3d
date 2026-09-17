/**
 * The per-frame render/sim loop (plan 044 D2, step 2 — extracted from main.ts).
 *
 * `createFrameLoop(deps)` owns the requestAnimationFrame chain. The loop body is
 * the former `frame()` in main.ts, moved verbatim; every reference to a
 * main.ts module-level binding goes through `deps`.
 *
 * The mutable main.ts `let`s are wired as getter/setter accessors by the caller,
 * so reads always see the live value (no stale capture) and writes land back in
 * main.ts's state. Stable values (consts, object refs, callbacks) are plain
 * properties. The 17 imported render/sim helpers are imported here directly.
 */
import {
  TRUE_SCALE,
  VISIBLE_SCALE,
  applyBeltLodOnly,
  applyScaleMorph,
  applySpin,
  lerpScale,
  reprojectOrbitLine,
  resampleIssOrbitLine,
  resampleMoonOrbitLine,
  updateBeltFields,
  updateBodyHighlight,
  updatePositions,
  type BuiltScene,
  type VisualScale,
} from '../render/scene';
import {
  easeInOutCubic,
  makeFlight,
  stepFlight,
  type CamAnchor,
  type Flight,
} from '../render/cameraFlight';
import { sceneIsStatic } from '../render/idle';
import type { SimClock } from '../sim/clock';
import type { ExoScene } from '../render/exoScene';
import type { ScaleMorph, ScrubState, ThreeFingerScrub } from '../main';

/**
 * The cinematic intro state (plan 035 F5 / 044 A6). Mirrors the `intro`
 * shape in main.ts; the frame loop only reads `leg`/`tail`/`tailT`/
 * `tailFromSpeed` and calls tickIntroTitle/onIntroLegDone.
 */
interface IntroState {
  leg: number;
  titleEl: HTMLDivElement | null;
  tail: boolean;
  tailT: number;
  tailFromSpeed: number;
}

export interface FrameLoopDeps {
  // --- stable values (read-only refs / constants) ---
  F6_LAST_CAM: { x: number; y: number; z: number };
  F6_LAST_TARGET: { x: number; y: number; z: number };
  FOV_DEG: number;
  MORPH_DUR: number;
  REDUCED_MOTION: boolean;
  clock: SimClock;
  moonParent: Map<string, string>;
  // --- mutable sim/UI state: getter+setter (the loop reads AND writes these) ---
  calSelDay: number;
  f6CamInit: boolean;
  f6CameraMoving: boolean;
  flight: Flight | null;
  lastDays: number;
  lastMoonResampleMs: number;
  lastMs: number;
  pendingSkyTour: boolean;
  sceneDirty: boolean;
  // --- mutable state: read-only from the loop's perspective ---
  built: BuiltScene;
  calMonth: number;
  calOpen: boolean;
  calYear: number;
  contextLost: boolean;
  exoMode: boolean;
  exoScene: ExoScene | null;
  followId: string;
  intro: IntroState | null;
  morph: ScaleMorph | null;
  postOn: boolean;
  scale: VisualScale;
  scrub: ScrubState | null;
  selectedBodyId: string;
  skyTour: { theta: number; phi: number; radius: number } | null;
  threeFinger: ThreeFingerScrub | null;
  // --- callbacks into main.ts ---
  advanceSkyTour: (dtSeconds: number) => void;
  camAnchorFor: (name: 'system' | 'constellations') => CamAnchor;
  computeConstellationEmphases: () => void;
  fmtDate: () => void;
  morphEnd: () => void;
  onIntroLegDone: () => void;
  renderCalendar: () => void;
  startSkyTour: () => void;
  syncUrl: () => void;
  tickIntroTitle: (dtReal: number) => void;
  tlFrame: () => void;
  updateConstellationHighlightThrottled: (nowMs: number) => void;
  updateConstellationScreenLabelFrame: () => void;
  updateInfo: () => void;
  updatePickedConstellationPulse: (nowMs: number) => void;
  updatePlanetScreenLabelFrame: () => void;
  updateSunFlareAndDOF: () => void;
}

export interface FrameLoop {
  /** Kick off the requestAnimationFrame chain (call once at boot). */
  start: () => void;
}

export function createFrameLoop(deps: FrameLoopDeps): FrameLoop {
  function frame(): void {
    requestAnimationFrame(frame);

    // GPU context is down (see the webglcontextlost/restored handlers at the
    // bottom): stop doing sim + GPU work while it's out. We deliberately keep
    // the rAF chain alive instead of tearing it down — on restore the next
    // frame just resumes, with zero re-init or forced reload.
    if (deps.contextLost) return;

    // Plan 044 B6: exoplanet mode runs on its OWN scene/renderer over the same
    // canvas. While active, drive the exo scene and skip the main solar-system
    // sim/render entirely (two renderers on one canvas would fight). The exo
    // scene advances on the same sim clock, so time keeps flowing.
    if (deps.exoMode && deps.exoScene) {
      deps.exoScene.tick(deps.clock.t, performance.now());
      return;
    }

    const nowMs = performance.now();
    const dtReal = Math.min(0.1, (nowMs - deps.lastMs) / 1000);
    deps.lastMs = nowMs;

    // F6: on the very first frame, seed the reference camera/target snapshot
    // that the render tail compares against. (The reference is only refreshed
    // in the tail, after a frame is actually rendered — see `f6CamInit`.)
    if (!deps.f6CamInit) {
      deps.F6_LAST_CAM.x = deps.built.camera.position.x;
      deps.F6_LAST_CAM.y = deps.built.camera.position.y;
      deps.F6_LAST_CAM.z = deps.built.camera.position.z;
      deps.F6_LAST_TARGET.x = deps.built.controls.target.x;
      deps.F6_LAST_TARGET.y = deps.built.controls.target.y;
      deps.F6_LAST_TARGET.z = deps.built.controls.target.z;
      deps.f6CamInit = true;
    }

    // F5: the cinematic intro's title fades in/out on its own real-time clock
    // (independent of the sim, so it reads the same at any speed / paused).
    if (deps.intro) deps.tickIntroTitle(dtReal);

    deps.clock.tick(dtReal);
    const dtDays = deps.clock.t - deps.lastDays;
    deps.lastDays = deps.clock.t;

    // --- Real-scale morph (B3): advance the toggle morph and derive this
    // frame's scale. `frameScale` is what positions/belts/orbits use; outside
    // a morph it is exactly the static `scale`. Body RADII are driven
    // separately by applyScaleMorph (the baked mesh is always the build-scale
    // geometry).
    let frameScale: VisualScale = deps.scale;
    if (deps.morph) {
      if (deps.morph.dir !== 0) {
        // Ease the 3 s leg. `morph.p` is the raw 0..1 position; the EASED
        // value drives both the layout blend and the body radii so everything
        // moves in lockstep.
        // Plan 044 C4: reduced-motion → snap to the end of the leg (no 3 s
        // eased scale sweep).
        if (deps.REDUCED_MOTION) {
          deps.morph.p = deps.morph.dir === 1 ? 1 : 0;
        } else {
          deps.morph.p = Math.min(
            1,
            Math.max(0, deps.morph.p + (deps.morph.dir * dtReal) / deps.MORPH_DUR),
          );
        }
        if (
          (deps.morph.dir === 1 && deps.morph.p >= 1) ||
          (deps.morph.dir === -1 && deps.morph.p <= 0)
        ) {
          deps.morphEnd();
        }
      }
      const e = deps.morph.dir === 0 ? 1 : easeInOutCubic(deps.morph.p);
      frameScale = lerpScale(VISIBLE_SCALE, TRUE_SCALE, e);
      applyScaleMorph(deps.built, e);
      // Re-project every orbit line through the blend so lines stay glued to
      // the bodies at any progress (cheap: 256 pts/line, no geometry alloc).
      // Only moons route through the moonDistance mapping — planets use
      // planetDistance (passing a planet id as moonId would mis-scale it).
      for (const entry of deps.built.bodies.values()) {
        if (entry.orbit)
          reprojectOrbitLine(entry.orbit, frameScale, entry.parent ? entry.def.id : null);
      }
      // On the last frame of a leg, reframe the camera: a fresh "System" fit
      // in the NEW layout (the old framing is meaningless across the scale
      // change), eased over 1.2 s so it lands as a graceful pull-in / push-out.
      // Reversing mid-leg cancels any in-flight reframe (user intent wins).
      if (deps.morph.dir === 0) {
        if (!deps.morph.reframed) {
          deps.morph.reframed = true;
          deps.flight = makeFlight(
            [
              deps.built.camera.position.x,
              deps.built.camera.position.y,
              deps.built.camera.position.z,
            ],
            [
              deps.built.controls.target.x,
              deps.built.controls.target.y,
              deps.built.controls.target.z,
            ],
            deps.camAnchorFor('system'),
            deps.REDUCED_MOTION ? 0 : 1.2,
            null,
            deps.built.camera.fov,
            deps.FOV_DEG,
          );
          deps.built.controls.enabled = false;
        }
      } else if (deps.flight && deps.morph.reframed) {
        deps.flight = null; // mid-leg reversal: drop the reframe, hand back to controls
        deps.built.controls.enabled = true;
        deps.built.controls.update();
      }
    }

    // Moon orbit line (moon-orbit fix): the drawn loop is sampled at a
    // placeholder epoch and re-sampled here, throttled to ~4 Hz, at the LIVE
    // sim time — so the line always matches the Moon's real, slowly-precessing
    // geocentric path (129 ephemeris samples ≈ 1 ms, negligible). It writes the
    // same position/unit-dir/km buffers `reprojectOrbitLine` uses, so it also
    // feeds the scale morph's per-frame re-projection correctly.
    {
      const now = performance.now();
      if (now - deps.lastMoonResampleMs > 250) {
        deps.lastMoonResampleMs = now;
        const moonEntry = deps.built.bodies.get('moon');
        if (moonEntry?.orbit) resampleMoonOrbitLine(moonEntry.orbit, deps.clock.t, frameScale);
        // Plan 044 B1: the ISS orbit line re-samples on the same throttle (the
        // ISS orbit precesses slowly; 97 SGP4 samples ≈ 1 ms, negligible).
        const issEntry = deps.built.bodies.get('iss');
        if (issEntry?.orbit && issEntry.satellite) {
          resampleIssOrbitLine(issEntry.orbit, issEntry.satellite, deps.clock.t, frameScale);
        }
      }
    }

    updatePositions(deps.built, deps.clock.t, frameScale);
    // The belt population (2,100 Kepler solves + matrix composes) is the
    // heaviest per-frame CPU cost. When the sim is paused nothing moves, so
    // skip the re-solve entirely (matrices already written on the last tick).
    // The F6 near/far LOD cross-fade, which depends on camera distance, is
    // applied in the render tail (after the camera branches) — see there.
    if (!deps.clock.isPaused) {
      updateBeltFields(deps.built, deps.clock.t, frameScale, deps.built.camera.position.length());
    }
    applySpin(deps.built, dtDays);

    if (deps.flight) {
      // Camera flight in progress. Drive the camera manually from the eased
      // (target + offset) path — do NOT call controls.update() here: with
      // damping on it would re-derive the camera from its internal spherical
      // state (and any residual drag delta) and fight/corrupt the flight. If
      // the flight tracks a picked body, hand its live world position to
      // stepFlight: the target is EASED from the flight-start target to the
      // body's current position (see stepFlight), so a follow SWAP — the
      // intro's Sun→Earth leg — glides instead of teleporting the camera to
      // the new body on the first frame.
      deps.built.controls.enabled = false;
      let liveTarget: [number, number, number] | undefined;
      if (deps.flight.followId) {
        const e = deps.built.bodies.get(deps.flight.followId);
        if (e) liveTarget = [e.worldPos.x, e.worldPos.y, e.worldPos.z];
      }
      const sample = stepFlight(deps.flight, dtReal, liveTarget);
      const target = sample.target;
      // camera = eased target + eased offset (glides onto a moving body).
      deps.built.controls.target.set(target[0], target[1], target[2]);
      deps.built.camera.position.set(
        target[0] + sample.offset[0],
        target[1] + sample.offset[1],
        target[2] + sample.offset[2],
      );
      // Ease the FOV too (sky anchor widens it; others ease back to 50°).
      // Only touch the projection matrix while it is actually changing.
      if (Math.abs(deps.built.camera.fov - sample.fov) > 1e-3) {
        deps.built.camera.fov = sample.fov;
        deps.built.camera.updateProjectionMatrix();
      }
      deps.built.camera.lookAt(target[0], target[1], target[2]);
      if (sample.done) {
        deps.flight = null;
        if (deps.intro) {
          // A leg of the cinematic intro just finished: advance to the next leg
          // (or end the intro on the last one). Do NOT hand back to the free
          // controls — the intro is still driving the camera.
          deps.onIntroLegDone();
          // onIntroLegDone either started the next leg's flight or ended the
          // intro (which started its own Earth flight). Either way a NEW flight
          // is now active (or we just re-enabled controls on finish), so let
          // this frame fall through to the render — no controls re-sync.
        } else if (deps.pendingSkyTour) {
          // Sky anchor landed: start the panoramic sweep from this pose. The
          // tour drives the camera directly (controls stay disabled) and runs
          // until the user grabs it (pointerdown/wheel/keydown, see above).
          deps.pendingSkyTour = false;
          deps.startSkyTour();
        } else {
          deps.built.controls.enabled = true;
          // Re-sync the control's internal state to the pose we just landed on
          // so user drag/wheel resumes smoothly from here.
          deps.built.controls.update();
          // Re-anchor the orbit pivot on the selected body (plan 017 F4: the
          // selection is the anchor — Sky/System landings leave this on the
          // Sun, whose worldPos IS the origin the anchors frame).
          if (deps.followId) {
            const e = deps.built.bodies.get(deps.followId);
            if (e) deps.built.controls.target.copy(e.worldPos);
          }
        }
        deps.syncUrl();
      }
    } else if (deps.skyTour) {
      // Panoramic sky sweep (post-Sky-anchor): pan around the origin so the
      // full sky of constellations comes into view in turn.
      deps.advanceSkyTour(dtReal);
    } else if (deps.followId) {
      // Free follow: keep the followed body centered at the orbit pivot.
      // When the followed body is a satellite, lock the CAMERA to its parent
      // planet (not the moon): the moon orbits the planet many times per sim
      // day, so chasing the moon made the whole view whirl/jitter at speed
      // (the "chaotic tracking"). The planet is the stable pivot; the selected
      // moon is instead marked by its pulsing highlight ring (see below), which
      // reads correctly at any speed. Planets are only a little faster than
      // the camera's lerp can track, so the view stays steady.
      const entry = deps.built.bodies.get(deps.followId);
      const lockEntry =
        entry && deps.moonParent.has(deps.followId)
          ? deps.built.bodies.get(deps.moonParent.get(deps.followId)!)
          : entry;
      if (lockEntry) deps.built.controls.target.lerp(lockEntry.worldPos, 0.2);
      deps.built.controls.update();
    } else {
      deps.built.controls.update();
    }

    // --- F6 idle-skip gate (computed AFTER the camera branches moved the camera) ---
    // When the sim is paused, the camera/target haven't moved this frame (no
    // drag, wheel, damping settle, follow-lerp, flight, or tour), nothing is
    // scrubbing / morphing / flying / in the intro, and no input has marked the
    // scene dirty since the last rendered frame — the on-screen frame is static,
    // so skip the (expensive) WebGL render AND the per-frame DOM/emphasis/pulse
    // passes. The rAF chain (scheduled at the top of `frame`) stays alive, so the
    // very next interaction re-renders immediately. This is the battery saving of
    // the F6 perf pass: a parked, paused view costs ~0 GPU.
    {
      const c = deps.built.camera.position;
      const t = deps.built.controls.target;
      deps.f6CameraMoving =
        Math.abs(c.x - deps.F6_LAST_CAM.x) +
          Math.abs(c.y - deps.F6_LAST_CAM.y) +
          Math.abs(c.z - deps.F6_LAST_CAM.z) +
          Math.abs(t.x - deps.F6_LAST_TARGET.x) +
          Math.abs(t.y - deps.F6_LAST_TARGET.y) +
          Math.abs(t.z - deps.F6_LAST_TARGET.z) >
        1e-4;
      // F6: when paused the belt re-solve is skipped above, but the near/far LOD
      // cross-fade depends on camera distance — re-apply it if the camera moved
      // (a zoom while paused), without re-solving the frozen belt positions.
      if (deps.clock.isPaused && deps.f6CameraMoving) {
        applyBeltLodOnly(deps.built, frameScale, c.length());
      }
      // NB: we do NOT gate on selectedBodyId/selectedConstellation here. The
      // picked-body / picked-constellation highlight is a wall-clock pulse that
      // is a pure function of `nowMs` (no accumulation), so if the frame is
      // static it freezes harmlessly and resumes seamlessly on the next input —
      // no visible jump. Gating on it would make the skip a no-op for the common
      // default view (which is always anchored on the Sun, a selected body).
      if (
        !deps.sceneDirty &&
        sceneIsStatic({
          paused: deps.clock.isPaused,
          cameraMoving: deps.f6CameraMoving,
          scrubbing: !!(deps.scrub?.movedX || deps.threeFinger?.live),
          flightActive: deps.flight !== null,
          morphActive: deps.morph !== null,
          skyTourActive: deps.skyTour !== null,
          introActive: deps.intro !== null,
        })
      ) {
        return; // static frame — skip render + DOM; rAF continues (scheduled above)
      }
      // We render this frame: refresh the reference camera/target (so the next
      // frame's motion test is measured from this rendered pose) and clear the
      // dirty flag. A frame that moved OR was dirty always renders.
      deps.F6_LAST_CAM.x = c.x;
      deps.F6_LAST_CAM.y = c.y;
      deps.F6_LAST_CAM.z = c.z;
      deps.F6_LAST_TARGET.x = t.x;
      deps.F6_LAST_TARGET.y = t.y;
      deps.F6_LAST_TARGET.z = t.z;
      deps.sceneDirty = false;
    }

    // Plan 016 P1: re-evaluate the 88 view emphases every frame — the
    // screen-space label overlay reads them at display rate (no stepping).
    deps.computeConstellationEmphases();
    // Constellation proximity highlight (D4): material writes only —
    // throttled + pose-gated, so idle frames cost little. Runs after the
    // camera pose for this frame is finalized.
    deps.updateConstellationHighlightThrottled(nowMs);
    // The picked constellation's gold lines pulse every frame (plan 010) — the
    // pose-gated pass above only refreshes when the camera moves, so without
    // this the pulse would freeze in a parked view. One material write.
    deps.updatePickedConstellationPulse(nowMs);

    // Pulsing highlight on the picked body — a planet or a moon (plan 015 P6) —
    // driven by wall-clock time so the pulse is smooth and independent of the
    // sim speed / direction.
    updateBodyHighlight(deps.built, deps.selectedBodyId, nowMs / 1000);

    // Sun surface shader (plan 044 A1): advance the granulation animation with
    // wall-clock time (smooth, independent of sim speed/direction). One uniform
    // write per frame.
    deps.built.sunShader.setTime(nowMs / 1000);

    // Aurora curtain (plan 044 B5): advance the animation with wall-clock time
    // (smooth, independent of sim speed). No-op when the band is invisible.
    deps.built.aurora?.setTime(nowMs / 1000);

    // Sun lens flare + subtle DOF (plan 044 A3). The flare is a camera-attached
    // screen-space overlay: project the sun to NDC, lay the ghost dots out along
    // the sun→centre line, and show it only while the sun is in-frame AND not
    // occluded by a planet. DOF focus tracks the selected body's distance.
    deps.updateSunFlareAndDOF();

    // Shadow culling: the Sun is a point light, so its shadow is a 6-face
    // cube map (2048² each) re-rendered every frame — the heaviest single GPU
    // cost. The shadow cube's far plane is 140 units (SUN_SHADOWS.far), so once
    // the camera is beyond that the planets are far enough apart that their
    // mutual shadows are sub-pixel / invisible anyway. Disable the whole shadow
    // pass out there; keep it for close/mid views where eclipses + ring shadows
    // are actually visible. Only toggle when the state actually changes.
    const SHADOW_CULL_DIST = 170;
    const camDist = deps.built.camera.position.length();
    const shadowsOn = camDist <= SHADOW_CULL_DIST;
    if (shadowsOn !== deps.built.sunLight.castShadow) deps.built.sunLight.castShadow = shadowsOn;

    // F2: the zodiacal-light afterglow stays pointed at the Sun as the camera
    // orbits — refresh its view direction from the (final) camera position.
    deps.built.skybox.update(deps.built.camera);

    // F1: HDR path. Default routes through the EffectComposer (HalfFloat RT →
    // UnrealBloom → SMAA → OutputPass = ACES + sRGB). The `?post=0` / `p`-key
    // fallback renders DIRECTLY to the canvas instead — no bloom/corona, the
    // pre-F1 look — so a device that chokes on the composer can still run.
    // D6: the low quality tier has NO composer (built.post === null), so it
    // always renders directly too.
    if (deps.postOn && deps.built.post) deps.built.post.composer.render();
    else deps.built.renderer.render(deps.built.scene, deps.built.camera);
    // Screen-space constellation name labels (plan 016 P1): the 2D overlay
    // pass after the 3D render, so the names sit crisp above the frame.
    deps.updateConstellationScreenLabelFrame();
    // Plan 044 A5: screen-space planet/body name labels (leader lines + fade +
    // de-collision) on their own 2D overlay.
    deps.updatePlanetScreenLabelFrame();
    deps.fmtDate();
    // Plan 026 F1: while the calendar popover is open, keep the selected-day
    // highlight tracking the running sim clock — but ONLY when the user is
    // viewing the clock's own month (browsing other months must not snap the
    // view back). Cheap: re-render only when the viewed day actually changes.
    if (deps.calOpen) {
      const d = deps.clock.toDate();
      if (d.getUTCFullYear() === deps.calYear && d.getUTCMonth() === deps.calMonth) {
        const day = d.getUTCDate();
        if (day !== deps.calSelDay) {
          deps.calSelDay = day;
          deps.renderCalendar();
        }
      }
    }
    deps.tlFrame(); // plan 023 F3: caret follows the clock while scrubbing
    deps.updateInfo();
  }

  return {
    start(): void {
      requestAnimationFrame(frame);
    },
  };
}
