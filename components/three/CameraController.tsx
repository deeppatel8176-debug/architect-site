"use client";

import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore, CameraPreset } from "@/store/useStore";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export const DEFAULT_CAMERA_POS: [number, number, number] = [12.8, 8.4, 12.8];
export const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 0.9, 0];

const PRESET_POSITIONS: Record<CameraPreset, [number, number, number]> = {
  iso: DEFAULT_CAMERA_POS,
  front: [0, 3.4, 14.8],
  top: [0.01, 18.0, 0.01],
  entrance: [7.2, 2.6, 9.2],
};

const STORAGE_KEY_POS = "villa_atelier_camera_pos_v4";
const STORAGE_KEY_TARGET = "villa_atelier_camera_target_v4";

export default function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraPreset = useStore((s) => s.cameraPreset);
  const { camera } = useThree();

  const targetPosRef = useRef<THREE.Vector3 | null>(null);

  // Restore camera position and target from localStorage on mount (preserves zoom on refresh)
  useEffect(() => {
    try {
      const savedPos = localStorage.getItem(STORAGE_KEY_POS);
      const savedTarget = localStorage.getItem(STORAGE_KEY_TARGET);

      if (savedPos) {
        const p = JSON.parse(savedPos);
        if (Array.isArray(p) && p.length === 3) {
          camera.position.set(p[0], p[1], p[2]);
        }
      } else {
        camera.position.set(...DEFAULT_CAMERA_POS);
      }

      if (controlsRef.current) {
        if (savedTarget) {
          const t = JSON.parse(savedTarget);
          if (Array.isArray(t) && t.length === 3) {
            controlsRef.current.target.set(t[0], t[1], t[2]);
          }
        } else {
          controlsRef.current.target.set(...DEFAULT_CAMERA_TARGET);
        }
        controlsRef.current.update();
      }
    } catch {
      camera.position.set(...DEFAULT_CAMERA_POS);
    }
  }, [camera]);

  // When camera preset changes, set target position for smooth lerp
  useEffect(() => {
    const target = PRESET_POSITIONS[cameraPreset];
    if (target) {
      targetPosRef.current = new THREE.Vector3(...target);
    }
  }, [cameraPreset]);

  // Smooth lerp when a preset button is clicked
  useFrame((_, delta) => {
    if (targetPosRef.current) {
      camera.position.lerp(targetPosRef.current, delta * 3.5);
      if (camera.position.distanceTo(targetPosRef.current) < 0.1) {
        targetPosRef.current = null;
      }
      if (controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(...DEFAULT_CAMERA_TARGET), delta * 4);
        controlsRef.current.update();
      }
    }
  });

  // Save camera position and zoom on interaction end
  const handleInteractionEnd = () => {
    try {
      const p = [camera.position.x, camera.position.y, camera.position.z];
      localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(p));

      if (controlsRef.current) {
        const t = [
          controlsRef.current.target.x,
          controlsRef.current.target.y,
          controlsRef.current.target.z,
        ];
        localStorage.setItem(STORAGE_KEY_TARGET, JSON.stringify(t));
      }
    } catch {
      // Storage unavailable or quota exceeded
    }
  };

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.07}
      enableZoom={false}
      enableRotate={true}
      enablePan={false}
      rotateSpeed={0.85}
      maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from dipping below the plinth/ground level
      minPolarAngle={0.15}
      target={DEFAULT_CAMERA_TARGET}
      onEnd={handleInteractionEnd}
      makeDefault
    />
  );
}
