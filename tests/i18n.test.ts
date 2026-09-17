import { describe, it, expect } from 'vitest';
import {
  en,
  fr,
  CATALOGS,
  detectLocale,
  translate,
  format,
  setActiveLocale,
  getActiveLocale,
  t,
  type Messages,
} from '../src/i18n/strings';

describe('i18n catalogs', () => {
  it('ships exactly two locales (en + fr)', () => {
    expect(Object.keys(CATALOGS).sort()).toEqual(['en', 'fr']);
  });

  it('fr is a complete translation (every en key present, non-empty)', () => {
    // The Messages interface enforces this at compile time; this test guards
    // against a key being present-but-empty in fr (a real i18n bug).
    for (const key of Object.keys(en) as (keyof Messages)[]) {
      expect(fr[key], `fr.${key} is empty`).toBeTruthy();
      expect(fr[key].trim().length, `fr.${key} is blank`).toBeGreaterThan(0);
    }
  });

  it('en and fr have the same key set', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort());
  });
});

describe('detectLocale', () => {
  it('maps French variants to fr', () => {
    expect(detectLocale('fr')).toBe('fr');
    expect(detectLocale('fr-FR')).toBe('fr');
    expect(detectLocale('fr-CA')).toBe('fr');
    expect(detectLocale('FR-BE')).toBe('fr');
  });

  it('falls back to en for everything else', () => {
    expect(detectLocale('en')).toBe('en');
    expect(detectLocale('en-US')).toBe('en');
    expect(detectLocale('de-DE')).toBe('en');
    expect(detectLocale('')).toBe('en');
    expect(detectLocale('zh-CN')).toBe('en');
  });
});

describe('translate', () => {
  it('returns the locale string', () => {
    expect(translate('en', 'pause')).toBe('Pause');
    expect(translate('fr', 'pause')).toBe('Pause');
    expect(translate('fr', 'now')).toBe('Maintenant');
  });

  it('falls back to the key for a missing key', () => {
    // @ts-expect-error — deliberately passing a non-existent key
    expect(translate('en', 'nope')).toBe('nope');
  });
});

describe('format', () => {
  it('interpolates {name} placeholders', () => {
    expect(format('Hello {name}', { name: 'World' })).toBe('Hello World');
    expect(format('{a} + {b} = {c}', { a: 1, b: 2, c: 3 })).toBe('1 + 2 = 3');
  });

  it('leaves unknown placeholders intact', () => {
    expect(format('Hi {name}', {})).toBe('Hi {name}');
  });
});

describe('t() (active-locale translate)', () => {
  it('translates in the active locale', () => {
    setActiveLocale('en');
    expect(t('now')).toBe('Now');
    setActiveLocale('fr');
    expect(t('now')).toBe('Maintenant');
    setActiveLocale('en'); // reset
  });

  it('interpolates params', () => {
    setActiveLocale('en');
    expect(t('unitDaysPerSec')).toBe('d/s');
  });

  it('getActiveLocale reflects setActiveLocale', () => {
    setActiveLocale('fr');
    expect(getActiveLocale()).toBe('fr');
    setActiveLocale('en');
  });
});
