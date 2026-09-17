// WebGL context loss / restore (plan 044 D2, step 5).
//
// three.js registers its OWN webglcontextlost/restored listeners on the
// canvas: it preventDefaults the loss (so the browser keeps the context alive
// for recovery), flags its internal _isContextLost (making render() a no-op
// while down), and on restore re-initializes GPU state. These app-level
// listeners layer the UX on top: pause the render loop + show the overlay
// while the context is out, and hide the overlay and resume when it comes
// back. We do NOT touch the renderer here — three.js owns that path.
//
// `contextLost` and `lastMs` are shared with the scrub getter + frame loop
// (they live in main.ts), so they are passed in as get/set accessors. The
// rest are stable values declared before the call site.
import { type BuiltScene } from '../render/scene';

export interface ContextLossDeps {
  canvas: HTMLCanvasElement;
  glLostEl: HTMLDivElement;
  glReloadBtn: HTMLButtonElement;
  built: BuiltScene;
  markSceneDirty: () => void;
  contextLost: { get(): boolean; set(v: boolean): void };
  lastMs: { get(): number; set(v: number): void };
  /** D7: optional hook fired on each context-loss event (for the telemetry
   *  counter). Not called on restore. */
  onContextLost?: () => void;
}

export function createContextLoss(deps: ContextLossDeps): void {
  deps.canvas.addEventListener('webglcontextlost', (ev: Event) => {
    // Three.js preventDefaults its own listener; we just observe the loss.
    ev.preventDefault();
    deps.contextLost.set(true);
    deps.onContextLost?.(); // D7: telemetry counter
    deps.glLostEl.hidden = false;
    deps.glLostEl.classList.add('show');
  });

  deps.canvas.addEventListener('webglcontextrestored', () => {
    deps.contextLost.set(false);
    deps.markSceneDirty(); // F6: repaint after context restore
    deps.glLostEl.hidden = true;
    deps.glLostEl.classList.remove('show');
    // Resync the renderer to the (possibly) current viewport after the browser
    // recreates the underlying context, so the first resumed frame isn't stale.
    deps.built.renderer.setSize(window.innerWidth, window.innerHeight);
    deps.lastMs.set(performance.now()); // don't apply a huge dt to the sim on resume
  });

  // Escape hatch in case the browser never fires a restore (rare, but e.g. some
  // mobile drivers). A manual reload always works and is what a user would do
  // by hand anyway.
  deps.glReloadBtn.addEventListener('click', () => window.location.reload());
}
