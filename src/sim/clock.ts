import { J2000_UTC } from './types';

/**
 * Simulation clock. Time is tracked as days since J2000; speed is
 * "simulated days per real second".
 */
export class SimClock {
  private days: number;
  private speed: number; // days per second
  private paused = false;

  constructor(startMs: number = Date.now()) {
    this.days = (startMs - J2000_UTC) / 86_400_000;
    this.speed = 1; // 1 day per second at speed 10^0
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

  /** Current speed as days/second. */
  getSpeed(): number {
    return this.speed;
  }

  /** Set speed from a log10 slider value (10^v days per second). */
  setLogSpeed(v: number): void {
    this.speed = 10 ** v;
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
