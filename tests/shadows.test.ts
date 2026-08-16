/**
 * Shadow-config tests. three.js PointLight/Mesh objects construct without a
 * WebGL context, so these run in plain Node via vitest.
 */
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  SUN_SHADOWS, configureSunShadows, setBodyShadowFlags,
} from '../src/render/shadows';

describe('SUN_SHADOWS constants', () => {
  it('covers the farthest shadow-caster in both scales', () => {
    // TRUE_SCALE: Kuiper belt out to ~50 AU = 50 scene units.
    // VISIBLE_SCALE: farthest body ≈ 4 + log10(50/0.38)*11 ≈ 36 units.
    expect(SUN_SHADOWS.far).toBeGreaterThanOrEqual(50);
    expect(SUN_SHADOWS.far).toBeLessThanOrEqual(200); // 2048px budget
    expect(SUN_SHADOWS.near).toBeGreaterThan(0);
    expect(SUN_SHADOWS.near).toBeLessThan(0.5);
    expect(SUN_SHADOWS.mapSize).toBeGreaterThanOrEqual(1024);
  });
});

describe('configureSunShadows', () => {
  it('enables shadow casting with the configured camera range', () => {
    const light = new THREE.PointLight(0xffffff, 1, 0, 0);
    configureSunShadows(light);
    expect(light.castShadow).toBe(true);
    expect(light.shadow.mapSize.x).toBe(SUN_SHADOWS.mapSize);
    expect(light.shadow.mapSize.y).toBe(SUN_SHADOWS.mapSize);
    expect(light.shadow.camera.near).toBe(SUN_SHADOWS.near);
    expect(light.shadow.camera.far).toBe(SUN_SHADOWS.far);
    expect(light.shadow.bias).toBe(SUN_SHADOWS.bias);
    expect(light.shadow.normalBias).toBe(SUN_SHADOWS.normalBias);
  });

  it('honors a custom max distance', () => {
    const light = new THREE.PointLight(0xffffff, 1, 0, 0);
    configureSunShadows(light, 123.4);
    expect(light.shadow.camera.far).toBe(123.4);
    expect(light.castShadow).toBe(true);
  });
});

describe('setBodyShadowFlags', () => {
  it('ordinary bodies cast and receive', () => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8));
    setBodyShadowFlags(mesh, false);
    expect(mesh.castShadow).toBe(true);
    expect(mesh.receiveShadow).toBe(true);
  });

  it('the star (light source) casts neither — a sphere around a point light would shadow the whole scene', () => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8));
    setBodyShadowFlags(mesh, true);
    expect(mesh.castShadow).toBe(false);
    expect(mesh.receiveShadow).toBe(false);
  });
});
