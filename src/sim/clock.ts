import { J2000_UTC } from './types';

/**
 * Simulation clock. Time is tracked as days since J2000; speed is
 * "simulated days per real second". The slider is SIGNED and symmetric:
 * 0 is the middle (real-time, 1 day/s) and negative values run the
 * simulation BACKWARDS (negative days/second), so the calendar follows the
 * reversed motion.
 */
export class SimClock {
  private days: number;
  private speed: number; // days per second (may be negative = reverse time)
  private paused = false;

  constructor(startMs: number = Date.now()) {
    this.days = (startMs - J2000_UTC) / 86_400_000;
    this.speed = 1; // 1 day per second at log speed 0
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
    return this.speed;
  }

  /** Set speed from the signed log10 slider.
   *  `v` is the slider position with 0 = middle = 1 day/s (real time):
   *    magnitude  = 10^|v|   days/second
   *    direction  = v < 0 ? -1 : +1   (negative = reverse time)
   *  So the slider is symmetric: +2 => +100 d/s, -2 => -100 d/s, 0 => 1 d/s.
   *  Stopping the sim is the Pause button's job, not the slider's. */
  setLogSpeed(v: number): void {
    this.speed = (v < 0 ? -1 : 1) * 10 ** Math.abs(v);
  }

  get isPaused(): boolean {
    return this.paused;
  }

  setPaused(p: boolean): void {
    this.paused = p;
  }

  /** Advance by a real-time delta in seconds. */
  tick(dtSeconds: number): void {
    if (!this.paused) this.days += this.speed * dtSeconds;
  }

  /** Convert current sim time back to a Date. */
  toDate(): Date {
    return new Date(J2000_UTC + this.days * 86_400_000);
  }
}
