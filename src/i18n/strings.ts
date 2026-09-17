/**
 * D9: i18n foundation — pure message catalog (plan 044).
 *
 * No three.js / DOM dependencies, mirroring the `quality.ts` and
 * `telemetry.ts` patterns so it runs in Node under vitest. The DOM-facing
 * layer (detecting the locale from `navigator`, stamping `data-i18n`
 * attributes) lives in `./i18n.ts`.
 *
 * Two locales ship as proof the catalog is complete: **en** (default) and
 * **fr**. Every key MUST exist in both — the `Messages` interface enforces
 * it at compile time, so a missing French string is a type error, not a
 * runtime fallback surprise.
 */

export type Locale = 'en' | 'fr';

/**
 * The full set of user-facing strings extracted from the control panel.
 * Both `en` and `fr` must satisfy this interface (exhaustive by type).
 */
export interface Messages {
  // Section heads
  sectionTime: string;
  sectionView: string;
  sectionDisplay: string;
  sectionShare: string;

  // Time
  now: string;
  spaceWeather: string;
  speed: string;
  jumpTo: string;
  pause: string;
  resume: string;
  reverse: string;
  unitDaysPerSec: string;
  unitHoursPerSec: string;
  speedAria: string;
  jumpToAria: string;

  // View
  sky: string;
  system: string;
  systems: string;
  events: string;
  skyTitle: string;
  systemTitle: string;
  systemsTitle: string;
  eventsTitle: string;
  eventsRange1: string;
  eventsRange5: string;
  eventsRange10: string;
  eventsNote: string;
  find: string;
  findPlaceholder: string;

  // Display
  scale: string;
  scaleVisible: string;
  scaleReal: string;
  scaleVisibleTitle: string;
  scaleRealTitle: string;
  orbits: string;
  labels: string;
  belts: string;
  figures: string;
  dso: string;
  dof: string;

  // Share
  share: string;
  screenshot: string;
  apod: string;
  about: string;

  // Info card labels
  infoOrbitPeriod: string;
  infoDistance: string;
  infoPeriApo: string;
  // Constellation info card (reuses the same 3 label slots)
  infoCenterRa: string;
  infoCenterDec: string;
  infoStars: string;

  // Hints
  hint: string;
  hintTouch: string;
}

export const en: Messages = {
  sectionTime: 'Time',
  sectionView: 'View',
  sectionDisplay: 'Display',
  sectionShare: 'Share',

  now: 'Now',
  spaceWeather: 'Space weather',
  speed: 'Speed',
  jumpTo: 'Jump to',
  pause: 'Pause',
  resume: 'Resume',
  reverse: 'Reverse →',
  unitDaysPerSec: 'd/s',
  unitHoursPerSec: 'h/s',
  speedAria:
    'Simulation speed magnitude (log scale). Left = slower (0.001 d/s ≈ a year in 30 minutes), middle = 1 day/s, right ≈ 316 days/s. Use the Reverse button to run time backwards.',
  jumpToAria: 'Jump the simulation to this calendar date (keeps the current time of day)',

  sky: '🌌 Sky',
  system: '🪐 System',
  systems: '✨ Systems',
  events: '✨ Events',
  skyTitle: 'Zoom out until only the constellations fill the view',
  systemTitle: 'Fit the whole solar system in frame',
  systemsTitle: 'View confirmed exoplanet systems (NASA Exoplanet Archive)',
  eventsTitle: 'Eclipses, transits, conjunctions, oppositions, Saturn ring edge-on',
  eventsRange1: '±1 yr',
  eventsRange5: '±5 yr',
  eventsRange10: '±10 yr',
  eventsNote: 'Click an event to jump there. Model: Kepler + geocentric Moon.',
  find: 'Find',
  findPlaceholder: 'Sun — type to search',

  scale: 'Scale',
  scaleVisible: 'Visible scale',
  scaleReal: 'Real scale',
  scaleVisibleTitle:
    'The default view — distances compressed and sizes exaggerated so everything fits on screen',
  scaleRealTitle: 'True physical scale — sizes and distances to the same ratio',
  orbits: 'Orbits',
  labels: 'Labels',
  belts: 'Belts',
  figures: 'Figures',
  dso: 'DSO',
  dof: 'DOF',

  share: 'Copy share link',
  screenshot: 'Save screenshot',
  apod: 'Today in space (APOD)',
  about: 'About & credits',

  infoOrbitPeriod: 'Orbit period',
  infoDistance: 'Distance',
  infoPeriApo: 'Peri / Apo',
  infoCenterRa: 'Center RA',
  infoCenterDec: 'Center Dec',
  infoStars: 'Stars',

  hint: 'Drag: rotate · Wheel: zoom · Click a body to fly to it · /: commands (keys: space n r o l b f a p t c s 1-9 0)',
  hintTouch: 'Drag: rotate · Pinch: zoom · 3 fingers: time & speed',
};

export const fr: Messages = {
  sectionTime: 'Temps',
  sectionView: 'Vue',
  sectionDisplay: 'Affichage',
  sectionShare: 'Partager',

  now: 'Maintenant',
  spaceWeather: 'Météo spatiale',
  speed: 'Vitesse',
  jumpTo: 'Aller à',
  pause: 'Pause',
  resume: 'Reprendre',
  reverse: 'Inverser →',
  unitDaysPerSec: 'j/s',
  unitHoursPerSec: 'h/s',
  speedAria:
    'Amplitude de la vitesse de simulation (échelle log). Gauche = plus lent (0,001 j/s ≈ une année en 30 minutes), milieu = 1 jour/s, droite ≈ 316 jours/s. Utilisez le bouton Inverser pour faire reculer le temps.',
  jumpToAria: "Faire avancer la simulation à cette date du calendrier (conserve l'heure actuelle)",

  sky: '🌌 Ciel',
  system: '🪐 Système',
  systems: '✨ Systèmes',
  events: '✨ Événements',
  skyTitle: "Zoom arrière jusqu'à ce que seules les constellations remplissent l'écran",
  systemTitle: 'Ajuster tout le système solaire dans le cadre',
  systemsTitle: 'Voir les systèmes d’exoplanètes confirmés (NASA Exoplanet Archive)',
  eventsTitle: 'Éclipses, transits, conjonctions, oppositions, anneau de Saturne de profil',
  eventsRange1: '±1 an',
  eventsRange5: '±5 ans',
  eventsRange10: '±10 ans',
  eventsNote: 'Cliquez sur un événement pour y aller. Modèle : Kepler + Lune géocentrique.',
  find: 'Rechercher',
  findPlaceholder: 'Soleil — tapez pour chercher',

  scale: 'Échelle',
  scaleVisible: 'Échelle visible',
  scaleReal: 'Échelle réelle',
  scaleVisibleTitle:
    "La vue par défaut — distances compressées et tailles exagérées pour que tout tienne à l'écran",
  scaleRealTitle: 'Échelle physique réelle — tailles et distances au même ratio',
  orbits: 'Orbites',
  labels: 'Étiquettes',
  belts: 'Ceintures',
  figures: 'Figures',
  dso: 'Objets profonds',
  dof: 'Profondeur',

  share: 'Copier le lien',
  screenshot: 'Enregistrer une capture',
  apod: 'Astronaute du jour (APOD)',
  about: 'À propos & crédits',

  infoOrbitPeriod: 'Période orbitale',
  infoDistance: 'Distance',
  infoPeriApo: 'Péri / Apo',
  infoCenterRa: 'RA centre',
  infoCenterDec: 'Décl. centre',
  infoStars: 'Étoiles',

  hint: 'Glisser : pivoter · Molette : zoom · Cliquer un corps pour s’y rendre · / : commandes (touches : espace n r o l b f a p t c s 1-9 0)',
  hintTouch: 'Glisser : pivoter · Pincer : zoom · 3 doigts : temps & vitesse',
};

export const CATALOGS: Record<Locale, Messages> = { en, fr };

/**
 * Map a `navigator.language` string to a supported locale. Any French variant
 * (`fr-FR`, `fr-CA`, `fr-BE`, …) → `fr`; everything else falls back to the
 * default `en`. Pure + testable (the DOM layer passes `navigator.language`).
 */
export function detectLocale(navigatorLanguage: string): Locale {
  const lang = (navigatorLanguage || '').toLowerCase();
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

/**
 * Look up a key in a specific locale, falling back to English, then to the
 * key itself (so a missing key is visible rather than blank).
 */
export function translate(locale: Locale, key: keyof Messages): string {
  return CATALOGS[locale][key] ?? CATALOGS.en[key] ?? String(key);
}

/**
 * Minimal `{name}` interpolation for parameterized strings. Unknown
 * placeholders are left intact (a visible bug, not a silent blank).
 */
export function format(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in params ? String(params[name]) : whole,
  );
}

// --- Active-locale state (module-level; set by the DOM layer) ---------------

let activeLocale: Locale = 'en';

export function setActiveLocale(locale: Locale): void {
  activeLocale = locale;
}

export function getActiveLocale(): Locale {
  return activeLocale;
}

/**
 * Translate a key in the ACTIVE locale, with optional `{name}` interpolation.
 * This is the function the app calls for JS-set strings (pause/resume, speed
 * units, info labels, hints).
 */
export function t(key: keyof Messages, params?: Record<string, string | number>): string {
  const msg = translate(activeLocale, key);
  return params ? format(msg, params) : msg;
}
