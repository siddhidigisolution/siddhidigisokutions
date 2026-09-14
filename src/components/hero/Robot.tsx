"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import RobotFace from "./RobotFace";
import type { Expression } from "./expressions";

export interface PointerState {
  x: number;
  y: number;
}
export interface DirOverride {
  x: number;
  y: number;
  active: boolean;
}
export type Ref<T> = { current: T };

const MODEL_PATH = "/models/robot-head.glb";

// model's raw bounding box (measured): size ~3.1 x 2.43 x 1.97, center ~(0, 0.21, -0.02)
const MODEL_CENTER = new THREE.Vector3(0, 0.21, -0.02);
const MODEL_SCALE = 2.1 / 3.1;

// mesh names come from the GLB's node names — head shell stays white/glossy,
// the face panel becomes a black screen, antenna + ears get the lavender accent
const SCREEN_MESH_NAME = "Cube001";
const ACCENT_MESH_NAMES = new Set(["Cube002", "Cylinder", "Cylinder001", "Cylinder002"]);

const SHELL_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#fdfdfe",
  roughness: 0.12,
  metalness: 0.03,
  clearcoat: 1,
  clearcoatRoughness: 0.06,
  envMapIntensity: 1.05,
});

const ACCENT_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#a692f0",
  roughness: 0.28,
  metalness: 0.05,
  clearcoat: 0.8,
  clearcoatRoughness: 0.18,
  envMapIntensity: 0.75,
  emissive: "#7c5ce0",
  emissiveIntensity: 0.1,
});

const SCREEN_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#08080d",
  roughness: 0.4,
  metalness: 0.1,
  clearcoat: 0.4,
  clearcoatRoughness: 0.5,
  envMapIntensity: 0.12,
});

export default function Robot({
  pointerRef,
  dirOverrideRef,
  expression,
}: {
  pointerRef: Ref<PointerState>;
  dirOverrideRef: Ref<DirOverride>;
  expression: Expression;
}) {
  const { scene } = useGLTF(MODEL_PATH);
  const { model, screenCenter, screenSize } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // the GLB's geometry is flat-shaded (faceted); re-derive smooth
        // normals so curved surfaces don't look low-poly/rough
        child.geometry = toCreasedNormals(child.geometry, Math.PI / 4);
        if (child.name === SCREEN_MESH_NAME) {
          child.material = SCREEN_MATERIAL;
        } else {
          child.material = ACCENT_MESH_NAMES.has(child.name)
            ? ACCENT_MATERIAL
            : SHELL_MATERIAL;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const screenMesh = clone.getObjectByName(SCREEN_MESH_NAME);
    const box = new THREE.Box3();
    if (screenMesh) box.setFromObject(screenMesh);
    const center = box.isEmpty() ? new THREE.Vector3() : box.getCenter(new THREE.Vector3());
    const size = box.isEmpty() ? new THREE.Vector3(1, 1, 1) : box.getSize(new THREE.Vector3());

    return { model: clone, screenCenter: center, screenSize: size };
  }, [scene]);

  const headGroup = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);
  const yaw = useRef(0);
  const pitch = useRef(0);
  const t0 = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - t0.current;

    // idle float: vertical drift, gentle rotation, breathing scale
    if (floatGroup.current) {
      floatGroup.current.position.y = Math.sin(t * 0.7) * 0.06;
      floatGroup.current.rotation.z = Math.sin(t * 0.5) * 0.025;
      const breathe = 1 + Math.sin(t * 0.9) * 0.012;
      floatGroup.current.scale.setScalar(breathe);
    }

    // determine look target: hover override or pointer
    const dir = dirOverrideRef.current;
    const targetX = dir.active ? dir.x : pointerRef.current.x;
    const targetY = dir.active ? dir.y : pointerRef.current.y;

    const headDamp = 1 - Math.pow(0.001, delta);

    yaw.current += (targetX * 0.34 - yaw.current) * headDamp;
    pitch.current += (-targetY * 0.2 - pitch.current) * headDamp;

    if (headGroup.current) {
      headGroup.current.rotation.y = yaw.current;
      headGroup.current.rotation.x = pitch.current;
    }
  });

  const facePosition: [number, number, number] = [
    screenCenter.x - MODEL_CENTER.x,
    screenCenter.y - MODEL_CENTER.y,
    screenCenter.z - MODEL_CENTER.z + screenSize.z * 0.6,
  ];

  return (
    <group ref={floatGroup}>
      <group ref={headGroup} scale={MODEL_SCALE}>
        <primitive
          object={model}
          position={[-MODEL_CENTER.x, -MODEL_CENTER.y, -MODEL_CENTER.z]}
        />
        <group position={facePosition}>
          <RobotFace expression={expression} screenSize={screenSize} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
