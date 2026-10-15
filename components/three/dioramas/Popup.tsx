"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Popup({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const materialsRef = useRef<THREE.Material[]>([]);
  const prevActive = useRef(active);

  useEffect(() => {
    if (groupRef.current) {
      const mats: THREE.Material[] = [];
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = 0;
            mats.push(child.material);
          }
        }
      });
      materialsRef.current = mats;
    }
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (active && !prevActive.current) {
        groupRef.current.position.set(15, 15, -15);
        materialsRef.current.forEach((mat) => (mat.opacity = 0));
      }
      
      if (active) {
        groupRef.current.visible = true;
        groupRef.current.position.lerp(new THREE.Vector3(0, -1, 0), delta * 5);
        materialsRef.current.forEach((mat) => {
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, delta * 8);
        });
      } else {
        groupRef.current.visible = false;
      }
      
      prevActive.current = active;
    }
  });

  return (
    <group ref={groupRef} visible={false} position={[0, -10, 0]}>
      {/* Base plane */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[16, 0.2, 16]} />
        <meshStandardMaterial color="#d3c8b8" roughness={0.8} />
      </mesh>

      {/* Floating abstract elements */}
      <mesh position={[0, 4, 0]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} wireframe />
      </mesh>
      
      {/* Pedestal */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[1.5, 2, 2, 32]} />
        <meshStandardMaterial color="#b0a596" />
      </mesh>
    </group>
  );
}
