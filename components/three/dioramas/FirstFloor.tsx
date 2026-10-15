"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FirstFloor({ active }: { active: boolean }) {
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

      {/* Central Fireplace / Stone column */}
      <mesh position={[0, 4, -1]}>
        <boxGeometry args={[4, 8, 1.5]} />
        <meshStandardMaterial color="#b0a596" roughness={0.9} />
      </mesh>
      {/* Fireplace cutout */}
      <mesh position={[0, 2, -0.2]}>
        <boxGeometry args={[3, 1.5, 0.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Left Wall (Kitchen) */}
      <mesh position={[-6, 3, -4]}>
        <boxGeometry args={[4, 6, 0.5]} />
        <meshStandardMaterial color="#e0d8cc" />
      </mesh>
      {/* Kitchen Island */}
      <mesh position={[-5, 1.5, 2]}>
        <boxGeometry args={[2, 1.5, 6]} />
        <meshStandardMaterial color="#d3c8b8" />
      </mesh>
      <mesh position={[-5, 2.3, 2]}>
        <boxGeometry args={[2.2, 0.1, 6.2]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>

      {/* L-shaped Sofa */}
      <group position={[0, 0.5, 3]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 1, 1.5]} />
          <meshStandardMaterial color="#e8e1d7" />
        </mesh>
        <mesh position={[-1.25, 0, 1.5]}>
          <boxGeometry args={[1.5, 1, 2]} />
          <meshStandardMaterial color="#e8e1d7" />
        </mesh>
      </group>

      {/* Billiard Table */}
      <group position={[5, 1.5, 2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 0.5, 5]} />
          <meshStandardMaterial color="#c8bead" />
        </mesh>
        {/* Legs */}
        <mesh position={[-1, -0.75, -2]}>
           <boxGeometry args={[0.4, 1.5, 0.4]} />
           <meshStandardMaterial color="#a09586" />
        </mesh>
        <mesh position={[1, -0.75, -2]}>
           <boxGeometry args={[0.4, 1.5, 0.4]} />
           <meshStandardMaterial color="#a09586" />
        </mesh>
        <mesh position={[-1, -0.75, 2]}>
           <boxGeometry args={[0.4, 1.5, 0.4]} />
           <meshStandardMaterial color="#a09586" />
        </mesh>
        <mesh position={[1, -0.75, 2]}>
           <boxGeometry args={[0.4, 1.5, 0.4]} />
           <meshStandardMaterial color="#a09586" />
        </mesh>
      </group>

      {/* Staircase (back) */}
      <group position={[-2, 0, -6]}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <mesh key={`stair-${i}`} position={[0, i * 0.4 + 0.2, i * 0.6]}>
            <boxGeometry args={[3, 0.4, 0.6]} />
            <meshStandardMaterial color="#d3c8b8" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
