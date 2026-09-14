"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EXPRESSIONS, type Expression, type EyeShape, type MouthShape } from "./expressions";

// All eyes/mouths are flat 2D icon shapes (ShapeGeometry) with unlit
// material — deliberately simple, no 3D shading, matching a clean screen icon.

function buildStarShape(outerR = 1, innerR = 0.42, points = 5): THREE.Shape {
  const shape = new THREE.Shape();
  const step = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = i * step - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function buildHeartShape(): THREE.Shape {
  const pts: THREE.Vector2[] = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    pts.push(new THREE.Vector2(x, y));
  }
  let maxAbs = 0;
  pts.forEach((p) => {
    maxAbs = Math.max(maxAbs, Math.abs(p.x), Math.abs(p.y));
  });
  const shape = new THREE.Shape();
  pts.forEach((p, i) => {
    const nx = p.x / maxAbs;
    const ny = p.y / maxAbs;
    if (i === 0) shape.moveTo(nx, ny);
    else shape.lineTo(nx, ny);
  });
  return shape;
}

function buildCaretShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-1, -0.15);
  s.lineTo(0, 0.6);
  s.lineTo(1, -0.15);
  s.lineTo(1, -0.42);
  s.lineTo(0, 0.28);
  s.lineTo(-1, -0.42);
  s.closePath();
  return s;
}

function buildSmileShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-1, 0.05);
  s.quadraticCurveTo(0, -0.15, 1, 0.05);
  s.quadraticCurveTo(0, -0.55, -1, 0.05);
  return s;
}

function buildOpenMouthShape(): THREE.Shape {
  // a plain ellipse — simplest reliable "open mouth" silhouette
  const s = new THREE.Shape();
  s.absellipse(0, 0, 0.85, 0.75, 0, Math.PI * 2, false, 0);
  return s;
}

function buildTongueShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.35, 0.25);
  s.quadraticCurveTo(0, 0.5, 0.35, 0.25);
  s.quadraticCurveTo(0.35, -0.15, 0, -0.35);
  s.quadraticCurveTo(-0.35, -0.15, -0.35, 0.25);
  return s;
}

const DOT_GEOMETRY = new THREE.CircleGeometry(1, 28);
const STAR_GEOMETRY = new THREE.ShapeGeometry(buildStarShape(), 1);
const HEART_GEOMETRY = new THREE.ShapeGeometry(buildHeartShape(), 1);
const CARET_GEOMETRY = new THREE.ShapeGeometry(buildCaretShape(), 1);
const SMILE_GEOMETRY = new THREE.ShapeGeometry(buildSmileShape(), 24);
const OPEN_MOUTH_GEOMETRY = new THREE.ShapeGeometry(buildOpenMouthShape(), 24);
const TONGUE_GEOMETRY = new THREE.ShapeGeometry(buildTongueShape(), 16);

const EYE_GEOMETRIES: Record<EyeShape, THREE.BufferGeometry> = {
  dot: DOT_GEOMETRY,
  star: STAR_GEOMETRY,
  heart: HEART_GEOMETRY,
  caret: CARET_GEOMETRY,
  arc: SMILE_GEOMETRY,
  squint: CARET_GEOMETRY,
};

// per-shape tuning: these differ enough in silhouette that one scale/rotation
// doesn't read consistently across all of them
const EYE_ROTATION: Partial<Record<EyeShape, number>> = {
  squint: Math.PI / 2,
};
const EYE_BASE_SCALE: Record<EyeShape, number> = {
  dot: 0.8,
  star: 1.1,
  heart: 1,
  caret: 0.95,
  arc: 0.75,
  squint: 0.7,
};

const MOUTH_GEOMETRIES: Record<MouthShape, THREE.BufferGeometry> = {
  smile: SMILE_GEOMETRY,
  open: OPEN_MOUTH_GEOMETRY,
  tongue: SMILE_GEOMETRY,
};
const MOUTH_BASE_SCALE: Record<MouthShape, number> = {
  smile: 1,
  open: 0.85,
  tongue: 1,
};

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const p = t - 1;
  return 1 + c3 * p * p * p + c1 * p * p;
}

export default function RobotFace({
  expression,
  screenSize,
}: {
  expression: Expression;
  screenSize: THREE.Vector3;
}) {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const tongue = useRef<THREE.Mesh>(null);
  const blink = useRef(0);
  const popStart = useRef(0);

  const config = EXPRESSIONS[expression];

  useEffect(() => {
    popStart.current = performance.now();
  }, [expression]);

  const eyeOffsetX = screenSize.x * 0.22;
  const eyeOffsetY = screenSize.y * 0.1;
  const eyeUnit = screenSize.y * 0.13;
  const mouthBaseOffsetY = -screenSize.y * 0.24;
  const mouthHalfWidth = screenSize.x * 0.1;
  const mouthDepth = screenSize.y * 0.22;
  const tongueUnit = screenSize.y * 0.09;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // gentle periodic blink, layered on top of whatever expression is active
    const cycle = t % 3.4;
    blink.current = cycle > 3.25 ? 1 - Math.abs(cycle - 3.325) / 0.075 : 0;
    const blinkScale = 1 - Math.min(1, Math.max(0, blink.current)) * 0.85;

    const pop = easeOutBack(
      Math.min(1, (performance.now() - popStart.current) / 300)
    );

    if (left.current) {
      const s = EYE_BASE_SCALE[config.leftEye] * eyeUnit * pop;
      left.current.scale.set(s, s * blinkScale, 1);
      left.current.position.set(-eyeOffsetX, eyeOffsetY, 0);
      left.current.rotation.z = EYE_ROTATION[config.leftEye] ?? 0;
    }
    if (right.current) {
      const s = EYE_BASE_SCALE[config.rightEye] * eyeUnit * pop;
      right.current.scale.set(s, s * blinkScale, 1);
      right.current.position.set(eyeOffsetX, eyeOffsetY, 0);
      right.current.rotation.z = EYE_ROTATION[config.rightEye] ?? 0;
    }
    if (mouth.current) {
      const sx = MOUTH_BASE_SCALE[config.mouth] * mouthHalfWidth * pop;
      const sy = MOUTH_BASE_SCALE[config.mouth] * mouthDepth * pop;
      mouth.current.scale.set(sx, sy, 1);
      mouth.current.position.y = mouthBaseOffsetY;
    }
    if (tongue.current) {
      const visible = config.mouth === "tongue";
      const s = visible ? tongueUnit * pop : 0;
      tongue.current.scale.set(s, s, 1);
      tongue.current.position.set(
        mouthHalfWidth * 0.4,
        mouthBaseOffsetY - mouthDepth * 0.42,
        0.001
      );
    }
  });

  return (
    <group>
      <mesh ref={left} geometry={EYE_GEOMETRIES[config.leftEye]}>
        <meshBasicMaterial color="#8b7cf6" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={right} geometry={EYE_GEOMETRIES[config.rightEye]}>
        <meshBasicMaterial color="#8b7cf6" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={mouth} geometry={MOUTH_GEOMETRIES[config.mouth]}>
        <meshBasicMaterial color="#6d8bff" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={tongue} geometry={TONGUE_GEOMETRY}>
        <meshBasicMaterial color="#ff9ec7" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
