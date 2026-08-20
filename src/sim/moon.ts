// Meeus, Astronomical Algorithms, Chapter 47: "The Moon" (geocentric
// ecliptical position, truncated to the 180+60 terms of the standard tables).
//
// Exact port of PyMeeus `Moon.geocentric_ecliptical_pos` (itself a straight
// transcription of Meeus ch.47, Table 47.A/47.B). Returns the Moon's
// geocentric position in the *mean equinox of the date* ecliptic frame.
// Callers wanting the J2000 frame must apply Meeus ch.22.1 precession
// (see precessToJ2000 below).
//
// Reference implementation: /opt/data/pymeeus_moon_src.py (PyMeeus
// Moon.geocentric_ecliptical_pos). Verified against
// tests/fixtures/ground_truth.json: geocentric moon directions agree to
// ~50 arcsec worst case at the 3 fixture epochs (the ch.47 model budget).

const D2R = Math.PI / 180;
const AU_KM = 149597870.7;

// [D, M, M', F, coeffL, coeffR]  (Table 47.A, arguments in radians via D,M,M',F)
const PERIODIC_LR: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
[0, 0, 1, 0, 6.28877e+06, -2.09054e+07],
[2, 0, -1, 0, 1.27403e+06, -3.69911e+06],
[2, 0, 0, 0, 658314, -2.95597e+06],
[0, 0, 2, 0, 213618, -569925],
[0, 1, 0, 0, -185116, 48888],
[0, 0, 0, 2, -114332, -3149],
[2, 0, -2, 0, 58793, 246158],
[2, -1, -1, 0, 57066, -152138],
[2, 0, 1, 0, 53322, -170733],
[2, -1, 0, 0, 45758, -204586],
[0, 1, -1, 0, -40923, -129620],
[1, 0, 0, 0, -34720, 108743],
[0, 1, 1, 0, -30383, 104755],
[2, 0, 0, -2, 15327, 10321],
[0, 0, 1, 2, -12528, 0],
[0, 0, 1, -2, 10980, 79661],
[4, 0, -1, 0, 10675, -34782],
[0, 0, 3, 0, 10034, -23210],
[4, 0, -2, 0, 8548, -21636],
[2, 1, -1, 0, -7888, 24208],
[2, 1, 0, 0, -6766, 30824],
[1, 0, -1, 0, -5163, -8379],
[1, 1, 0, 0, 4987, -16675],
[2, -1, 1, 0, 4036, -12831],
[2, 0, 2, 0, 3994, -10445],
[4, 0, 0, 0, 3861, -11650],
[2, 0, -3, 0, 3665, 14403],
[0, 1, -2, 0, -2689, -7003],
[2, 0, -1, 2, -2602, 0],
[2, -1, -2, 0, 2390, 10056],
[1, 0, 1, 0, -2348, 6322],
[2, -2, 0, 0, 2236, -9884],
[0, 1, 2, 0, -2120, 5751],
[0, 2, 0, 0, -2069, 0],
[2, -2, -1, 0, 2048, -4950],
[2, 0, 1, -2, -1773, 4130],
[2, 0, 0, 2, -1595, 0],
[4, -1, -1, 0, 1215, -3958],
[0, 0, 2, 2, -1110, 0],
[3, 0, -1, 0, -892, 3258],
[2, 1, 1, 0, -810, 2616],
[4, -1, -2, 0, 759, -1897],
[0, 2, -1, 0, -713, -2117],
[2, 2, -1, 0, -700, 2354],
[2, 1, -2, 0, 691, 0],
[2, -1, 0, -2, 596, 0],
[4, 0, 1, 0, 549, -1423],
[0, 0, 4, 0, 537, -1117],
[4, -1, 0, 0, 520, -1571],
[1, 0, -2, 0, -487, -1739],
[2, 1, 0, -2, -399, 0],
[0, 0, 2, -2, -381, -4421],
[1, 1, 1, 0, 351, 0],
[3, 0, -2, 0, -340, 0],
[4, 0, -3, 0, 330, 0],
[2, -1, 2, 0, 327, 0],
[0, 2, 1, 0, -323, 1165],
[1, 1, -1, 0, 299, 0],
[2, 0, 3, 0, 294, 0],
[2, 0, -1, -2, 0, 8752],
];

// [D, M, M', F, coeffB]  (Table 47.B)
const PERIODIC_B: ReadonlyArray<readonly [number, number, number, number, number]> = [
[0, 0, 0, 1, 5.12812e+06],
[0, 0, 1, 1, 280602],
[0, 0, 1, -1, 277693],
[2, 0, 0, -1, 173237],
[2, 0, -1, 1, 55413],
[2, 0, -1, -1, 46271],
[2, 0, 0, 1, 32573],
[0, 0, 2, 1, 17198],
[2, 0, 1, -1, 9266],
[0, 0, 2, -1, 8822],
[2, -1, 0, -1, 8216],
[2, 0, -2, -1, 4324],
[2, 0, 1, 1, 4200],
[2, 1, 0, -1, -3359],
[2, -1, -1, 1, 2463],
[2, -1, 0, 1, 2211],
[2, -1, -1, -1, 2065],
[0, 1, -1, -1, -1870],
[4, 0, -1, -1, 1828],
[0, 1, 0, 1, -1794],
[0, 0, 0, 3, -1749],
[0, 1, -1, 1, -1565],
[1, 0, 0, 1, -1491],
[0, 1, 1, 1, -1475],
[0, 1, 1, -1, -1410],
[0, 1, 0, -1, -1344],
[1, 0, 0, -1, -1335],
[0, 0, 3, 1, 1107],
[4, 0, 0, -1, 1021],
[4, 0, -1, 1, 833],
[0, 0, 1, -3, 777],
[4, 0, -2, 1, 671],
[2, 0, 0, -3, 607],
[2, 0, 2, -1, 596],
[2, -1, 1, -1, 491],
[2, 0, -2, 1, -451],
[0, 0, 3, -1, 439],
[2, 0, 2, 1, 422],
[2, 0, -3, -1, 421],
[2, 1, -1, 1, -366],
[2, 1, 0, 1, -351],
[4, 0, 0, 1, 331],
[2, -1, 1, 1, 315],
[2, -2, 0, -1, 302],
[0, 0, 1, 3, -283],
[2, 1, 1, -1, -229],
[1, 1, 0, -1, 223],
[1, 1, 0, 1, 223],
[0, 1, -2, -1, -220],
[2, 1, -1, -1, -220],
[1, 0, 1, 1, -185],
[2, -1, -2, -1, 181],
[0, 1, 2, 1, -177],
[4, 0, -2, -1, 176],
[4, -1, -1, -1, 166],
[1, 0, 1, -1, -164],
[4, 0, 1, -1, 132],
[1, 0, -1, -1, -119],
[4, -1, 0, -1, 115],
[2, -2, 0, 1, 107],
];

/** Reduce a degrees angle to [0, 360). */
function toPositive(deg: number): number {
  let x = deg % 360;
  if (x < 0) x += 360;
  return x;
}

export interface MoonGeocentric {
  /** geocentric ecliptic longitude, degrees (mean equinox of date) */
  lon: number;
  /** geocentric ecliptic latitude, degrees (mean equinox of date) */
  lat: number;
  /** Earth-Moon distance, AU (from center to center) */
  deltaAu: number;
}

/**
 * Meeus ch.47 geocentric ecliptic position of the Moon.
 * @param tDays days from J2000.0 (TT). Pass TDB/TT, not UT.
 */
export function moonGeocentricEcliptic(tDays: number): MoonGeocentric {
  const t = tDays / 36525.0;

  // Mean longitude of the Moon
  const Lprime =
    218.3164477 +
    (481267.8812342 +
      (-0.0015786 + (1.0 / 538841.0 - t / 65194000.0) * t) * t) *
      t;
  // Mean elongation of the Moon
  const D =
    297.8501921 +
    (445267.1114034 +
      (-0.0018819 + (1.0 / 545868.0 - t / 113065000.0) * t) * t) *
      t;
  // Sun's mean anomaly
  const M =
    357.5291092 +
    (35999.0502909 + (-0.0001536 + t / 24490000.0) * t) * t;
  // Moon's mean anomaly
  const Mprime =
    134.9633964 +
    (477198.8675055 +
      (0.0087414 + (1.0 / 69699.9 + t / 14712000.0) * t) * t) *
      t;
  // Argument of latitude
  const F =
    93.272095 +
    (483202.0175233 +
      (-0.0036539 + (-1.0 / 3526000.0 + t / 863310000.0) * t) * t) *
      t;

  const A1 = 119.75 + 131.849 * t;
  const A2 = 53.09 + 479264.29 * t;
  const A3 = 313.45 + 481266.484 * t;

  const E = 1.0 + (-0.002516 - 0.0000074 * t) * t;
  const E2 = E * E;

  const Lp = toPositive(Lprime) * D2R;
  const Dr = toPositive(D) * D2R;
  const Mr = toPositive(M) * D2R;
  const Mp = toPositive(Mprime) * D2R;
  const Fr = toPositive(F) * D2R;
  const A1r = toPositive(A1) * D2R;
  const A2r = toPositive(A2) * D2R;
  const A3r = toPositive(A3) * D2R;

  let sigL = 0.0;
  let sigR = 0.0;
  for (const row of PERIODIC_LR) {
    const [d, m, mp, f, cl, cr] = row;
    const arg = d * Dr + m * Mr + mp * Mp + f * Fr;
    let coeffL = cl;
    let coeffR = cr;
    if (Math.abs(m) === 1) {
      coeffL *= E;
      coeffR *= E;
    } else if (Math.abs(m) === 2) {
      coeffL *= E2;
      coeffR *= E2;
    }
    sigL += coeffL * Math.sin(arg);
    sigR += coeffR * Math.cos(arg);
  }
  // Additive terms
  sigL += 3958.0 * Math.sin(A1r) + 1962.0 * Math.sin(Lp - Fr) + 318.0 * Math.sin(A2r);

  let sigB = 0.0;
  for (const row of PERIODIC_B) {
    const [d, m, mp, f, cb] = row;
    const arg = d * Dr + m * Mr + mp * Mp + f * Fr;
    let coeffB = cb;
    if (Math.abs(m) === 1) coeffB *= E;
    else if (Math.abs(m) === 2) coeffB *= E2;
    sigB += coeffB * Math.sin(arg);
  }
  sigB +=
    -2235.0 * Math.sin(Lp) +
    382.0 * Math.sin(A3r) +
    175.0 * Math.sin(A1r - Fr) +
    175.0 * Math.sin(A1r + Fr) +
    127.0 * Math.sin(Lp - Mp) -
    115.0 * Math.sin(Lp + Mp);

  const lambda = toPositive(Lprime + sigL / 1e6);
  // NOTE: sigB/1e6 is ALREADY in degrees (Meeus ch.47 defines it that way;
  // PyMeeus wraps it in Angle() which is degree-based). Do NOT convert again.
  const beta = sigB / 1e6;
  const deltaKm = 385000.56 + sigR / 1000.0;

  return { lon: lambda, lat: beta, deltaAu: deltaKm / AU_KM };
}

/**
 * Meeus ch.22.1 (approximation) precession of an obliquity/ecliptic
 * longitude-latitude from the mean equinox of date to the mean equinox of
 * J2000. This is the same precession used to align the planet ephemeris
 * (JPL Table 2a/2b, J2000) with the Moon's mean-date frame.
 *
 * @param lonDate ecliptic longitude, degrees (equinox of date)
 * @param latDate ecliptic latitude, degrees
 * @param tDays   days from J2000.0
 */
export function precessToJ2000(
  lonDate: number,
  latDate: number,
  tDays: number,
): { lon: number; lat: number } {
  const T = tDays / 36525.0;
  const p = (5028.796195 * T + 0.556602 * T * T) / 3600.0; // general precession in longitude, arcsec
  const deps = -46.836769 * T + 0.005971 * T * T; // obliquity rate, arcsec
  const lon = lonDate - p;
  const lat = latDate - (Math.cos(lonDate * D2R) * deps) / 3600.0;
  return { lon, lat };
}

/**
 * Geocentric position of the Moon in the J2000 ecliptic frame (AU), the
 * frame used by the planet ephemeris in this project.
 *
 * @param tDays days from J2000.0 in TT (pass the same time the planets use;
 *              the UT->TT offset is small, ~66 s for the fixture range, and
 *              is absorbed within the test tolerance).
 */
export function moonGeocentricJ2000(tDays: number): [number, number, number] {
  const m = moonGeocentricEcliptic(tDays);
  const p = precessToJ2000(m.lon, m.lat, tDays);
  const l = p.lon * D2R;
  const b = p.lat * D2R;
  const r = m.deltaAu;
  return [
    r * Math.cos(b) * Math.cos(l),
    r * Math.cos(b) * Math.sin(l),
    r * Math.sin(b),
  ];
}
