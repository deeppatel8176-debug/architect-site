"use client";

import { useFrame } from "@react-three/fiber";
import { useStore, FloorType } from "@/store/useStore";
import * as THREE from "three";

export default function CameraRig() {
  useFrame((state, delta) => {
    // Keep camera at fixed isometric angle [20, 14, 20]
    const fixedPos = new THREE.Vector3(20, 14, 20);
    state.camera.position.lerp(fixedPos, delta * 2.5);
    
    // Look directly at center [0, -1, 0]
    const targetLookAt = new THREE.Vector3(0, -1, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    currentLookAt.lerp(targetLookAt, delta * 2.5);
    state.camera.lookAt(currentLookAt);
  });

  return null;
}
