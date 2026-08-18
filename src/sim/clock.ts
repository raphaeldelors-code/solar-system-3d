import { J2000_UTC } from './types';

/**
 * Simulation clock. Time is tracked as days since J2000; speed is
 * "simulated days per real second".
 *
 * The speed slider is a pure MAGNITUDE (log10 days/second): it can go
 * below 0 for sub-day speeds (10^-3 d/s ≈ real time ×10^-3), which is what
 * lets you watch satellites move slowly instead of in day-jumps. Direction
 * (forward / reverse) is a SEPARATE toggle (SimClock.setReversed), not part
 * of the slider — so the slowest setting is always available regardless of
 * which way time is flowing.
 */
export class SimClock {
  private days: number;
  private logMag = 0; // log10 of the speed magnitude in days/second
  private reversed = false;
  private paused = false;

  constructor(startMs: number = Date.now()) {
    this.days = (startMs - J2000_UTC) / 86_400_000;
  }

  /** Days elapsed since J2000. */
  get t(): number {
    return this.days;
  }

  /** Set time to a specific Date. */
  setDate(d: Date | number): void {
    const ms = d instanceof Date ? d.getTime() : d;
    this.days = (ms - J2000_UTC) / 86_400_000;
  }

  /** Current speed as days/second (negative when running backwards). */
  getSpeed(): number {
    return (this.reversed ? -1 : 1) * 10 ** this.logMag;
  }

  /**
   * Set the speed magnitude from the slider: `v` is log10(days/second).
   * v = 0 → 1 d/s, v = 2 → 100 d/s, v = -1 → 0.1 d/s, v = -3 → 0.001 d/s.
   * Direction is independent — see `setReversed`.
   */
  setLogSpeed(v: number): void {
    this.logMag = v;
  }

  /** True while time runs backwards. */
  get isReversed(): boolean {
    return this.reversed;
  }

  /** Flip / set the flow direction (forward vs backwards). */
  setReversed(r: boolean): void {
    this.reversed = r;
  }

  get isPaused(): boolean {
    return this.paused;
  }

  setPaused(p: boolean): void {
    this.paused = p;
  }

  /** Advance by a real-time delta in seconds. */
  tick(dtSeconds: number): void {
    if (!this.paused) this.days += this.getSpeed() * dtSeconds;
  }

  /** Convert current sim time back to a Date. */
  toDate(): Date {
    return new Date(J2000_UTC + this.days * 86_400_000);
  }
}
