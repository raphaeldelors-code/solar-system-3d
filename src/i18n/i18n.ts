/**
 * D9: i18n foundation — DOM layer (plan 044).
 *
 * Detects the locale from `navigator.language`, sets `document.documentElement.lang`,
 * and stamps every `[data-i18n]` element's textContent (and
 * `[data-i18n-attr]` attributes like `aria-label`/`title`/`placeholder`) from
 * the active catalog. JS-set strings (pause/resume, speed units, info labels,
 * hints) call `t()` from `./strings` directly.
 */

import {
  detectLocale,
  setActiveLocale,
  getActiveLocale,
  t,
  type Locale,
  type Messages,
} from './strings';

// Re-export `t` so main.ts can import both the DOM init and the translator
// from one place.
export { t };

/**
 * Apply the active locale to the DOM. Elements carry `data-i18n="<key>"`
 * for textContent, or `data-i18n-attr="attr:key"` (repeatable, comma-
 * separated) for attributes. Runs at boot and is exported so a future
 * in-app language switch can re-run it.
 */
export function applyI18n(): void {
  const locale = getActiveLocale();
  document.documentElement.lang = locale;

  // textContent targets
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as keyof Messages | undefined;
    if (key) el.textContent = t(key);
  });

  // attribute targets: data-i18n-attr="aria-label:jumpToAria,title:skyTitle"
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const spec = el.dataset.i18nAttr ?? '';
    for (const part of spec.split(',')) {
      const [attr, key] = part.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key as keyof Messages));
    }
  });
}

/**
 * Boot the i18n layer: detect the locale from `navigator.language`, set it
 * as active, and apply it to the DOM. Call once at startup, before the
 * panel is first painted.
 */
export function initI18n(): Locale {
  const locale = detectLocale(navigator.language);
  setActiveLocale(locale);
  applyI18n();
  return locale;
}
