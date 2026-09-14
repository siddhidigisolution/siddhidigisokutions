"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// small deterministic PRNG so particle layout generation stays a pure
// function of `count` (Math.random would be impure inside useMemo)
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// PointsMaterial with no map renders each point as a flat square sprite —
// this draws a soft glow + four-point sparkle onto a canvas instead, with a
// solid-ish core (not just a faint wisp) so it stays visible against both
// light and dark page backgrounds, not just dark ones
function createStarTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  glow.addColorStop(0, "rgba(255,255,255,1)");
  glow.addColorStop(0.3, "rgba(255,255,255,0.95)");
  glow.addColorStop(0.6, "rgba(255,255,255,0.4)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(cx, 2);
  ctx.lineTo(cx, size - 2);
  ctx.moveTo(2, cy);
  ctx.lineTo(size - 2, cy);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const BASE_COLOR = new THREE.Color("#9d8cf0");
const MIN_TWINKLE = 0.4;

export default function ParticleField({
  count = 140,
}: {
  count?: number;
}) {
  const points = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => createStarTexture(), []);
  useEffect(() => () => starTexture.dispose(), [starTexture]);

  const positions = useMemo(() => {
    const rand = mulberry32(count * 104729 + 17);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + rand() * 3.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(rand() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 1;
    }
    return arr;
  }, [count]);

  // each star twinkles independently — its own phase offset and speed, so
  // they never pulse in unison
  const { phases, speeds } = useMemo(() => {
    const rand = mulberry32(count * 65537 + 91);
    const ph = new Float32Array(count);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      ph[i] = rand() * Math.PI * 2;
      sp[i] = 0.5 + rand() * 1.6;
    }
    return { phases: ph, speeds: sp };
  }, [count]);

  // initial fill only — animated afterwards through the live Three.js
  // attribute (points.current.geometry...) inside useFrame, not by
  // mutating this binding directly
  const initialColors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    arr.fill(1);
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;

    const colorAttr = points.current.geometry.attributes.color as THREE.BufferAttribute | undefined;
    if (colorAttr) {
      const arr = colorAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const twinkle =
          MIN_TWINKLE + (1 - MIN_TWINKLE) * (0.5 + 0.5 * Math.sin(t * speeds[i] + phases[i]));
        arr[i * 3] = BASE_COLOR.r * twinkle;
        arr[i * 3 + 1] = BASE_COLOR.g * twinkle;
        arr[i * 3 + 2] = BASE_COLOR.b * twinkle;
      }
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[initialColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        vertexColors
        size={0.065}
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
