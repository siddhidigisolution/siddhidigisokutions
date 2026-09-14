"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import Robot, { type DirOverride, type PointerState, type Ref } from "./Robot";
import ParticleField from "./ParticleField";
import type { Expression } from "./expressions";

export default function Scene3D({
  pointerRef,
  dirOverrideRef,
  expression,
}: {
  pointerRef: Ref<PointerState>;
  dirOverrideRef: Ref<DirOverride>;
  expression: Expression;
}) {
  const isSmall = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
      }}
    >
      <AdaptiveDpr pixelated={false} />
      {/* key — the sun, doing most of the shaping work */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={3.4}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
      />
      {/* rim — cool edge light angled to skim the visible left silhouette */}
      <directionalLight position={[-5, 1.5, -1.5]} intensity={1.8} color="#b9c6ff" />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.45} />
        <Robot
          pointerRef={pointerRef}
          dirOverrideRef={dirOverrideRef}
          expression={expression}
        />
        <ParticleField count={isSmall ? 70 : 140} />
      </Suspense>
    </Canvas>
  );
}
