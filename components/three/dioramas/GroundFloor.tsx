"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox, Line } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import * as THREE from "three";

function GroundFloorGeometry({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Load textures
  const portraitTexture = useTexture("/textures/portrait.png");
  const marbleTexture = useTexture("/textures/marble.png");
  
  // Basic colors
  const baseColor = "#dfd5c8";
  const wallColor = "#e6ddd3";
  const darkBeige = "#d3c8b8";
  const woodColor = "#c5bba8";

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
      // Transition triggered: became active
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
      <RoundedBox args={[16, 0.4, 16]} radius={0.05} smoothness={4} position={[0, -0.2, 0]}>
        <meshStandardMaterial color={baseColor} roughness={1} />
      </RoundedBox>

      {/* Wireframe Outline */}
      <Line
        points={[
          [-5, 0, -5], [5, 0, -5], [5, 6, -5], [-5, 6, -5], [-5, 0, -5],
          [-5, 0, 5], [5, 0, 5], [5, 6, 5], [-5, 6, 5], [-5, 0, 5],
          [-5, 6, -5], [-5, 6, 5],
          [5, 6, -5], [5, 6, 5]
        ]}
        color="#a09586"
        lineWidth={0.5}
        dashed={false}
      />

      {/* Main Front Wall with Cutouts */}
      <group position={[-2, 3, 4]}>
        <RoundedBox args={[10, 5, 0.4]} radius={0.05} smoothness={4} position={[0, -0.5, 0]}>
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </RoundedBox>
        {/* Ledge */}
        <RoundedBox args={[9.5, 0.2, 0.6]} radius={0.05} smoothness={4} position={[0, -1.5, 0.4]}>
          <meshStandardMaterial color={darkBeige} roughness={0.8} />
        </RoundedBox>
        {/* Plates (tilted to lean on the wall) */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`plate-${i}`} position={[-3.5 + i * 2, -1.1, 0.4]} rotation={[-Math.PI / 16, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
            <meshStandardMaterial color={wallColor} />
            <mesh position={[0, 0, 0.03]}>
               <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
               <meshStandardMaterial color={baseColor} />
            </mesh>
          </mesh>
        ))}
        {/* Circular cutouts in wall (deepened and darkened to simulate holes) */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`cutout-${i}`} position={[-3.5 + i * 2, 0.5, 0.15]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial color="#c2b4a3" />
          </mesh>
        ))}
      </group>

      {/* Slatted Wall Element */}
      <group position={[-1, 3, -1]}>
        {/* Solid back part of the L-shape */}
        <RoundedBox args={[3, 6, 0.4]} radius={0.02} smoothness={2} position={[1.5, 0, -2]}>
           <meshStandardMaterial color={woodColor} roughness={0.7} />
        </RoundedBox>
        {/* Vertical wooden slats running along the Z axis */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <RoundedBox key={`slat-${i}`} args={[0.4, 6, 0.15]} radius={0.02} smoothness={2} position={[0, 0, -1.8 + i * 0.35]}>
             <meshStandardMaterial color={woodColor} roughness={0.7} />
          </RoundedBox>
        ))}
      </group>

      {/* Marble Slabs Standing */}
      <group position={[-3, 3, -5]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2.5, 6, 0.1]} />
          <meshStandardMaterial map={marbleTexture} roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[2, 0, 1]}>
          <boxGeometry args={[2, 5, 0.1]} />
          <meshStandardMaterial map={marbleTexture} roughness={0.2} metalness={0.1} color="#e0d8cc" />
        </mesh>
        <mesh position={[4, 0.5, 2]}>
          <boxGeometry args={[2, 5, 0.1]} />
          <meshStandardMaterial map={marbleTexture} roughness={0.2} metalness={0.1} color="#d3c8b8" />
        </mesh>
      </group>

      {/* Back Wall with Artwork */}
      <group position={[4, 3, 0]}>
        {/* Wall */}
        <RoundedBox args={[5, 6, 0.4]} radius={0.05} smoothness={4} position={[-1.5, 0, -3]}>
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </RoundedBox>
        {/* Canvas Frame */}
        <mesh position={[-1, -0.5, -2]}>
          <boxGeometry args={[4, 6, 0.2]} />
          <meshStandardMaterial color={darkBeige} />
        </mesh>
        {/* Canvas Painting */}
        <mesh position={[-1, -0.5, -1.89]}>
          <planeGeometry args={[3.8, 5.8]} />
          <meshStandardMaterial map={portraitTexture} roughness={0.6} />
        </mesh>
      </group>

      {/* Solid Staircase (attached to right wall, sloping up to the left, positioned behind the wall) */}
      <group position={[4.4, 0, -4.0]}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const stepHeight = (i + 1) * 0.45;
          const stepDepth = 1.6;
          const stepWidth = 0.6;
          // Lowest step on the far right (i=0), highest step near wall (i=6)
          const posX = 3.6 - i * stepWidth;
          return (
            <RoundedBox 
              key={`stair-${i}`} 
              args={[stepWidth, stepHeight, stepDepth]} 
              radius={0.05} 
              smoothness={2} 
              position={[posX, stepHeight / 2 - 0.2, 0]}
            >
              <meshStandardMaterial color={wallColor} roughness={0.8} />
            </RoundedBox>
          );
        })}
      </group>

      {/* Small seating, rug and table */}
      <group position={[2, 0, 2]}>
        {/* Floor Rug */}
        <RoundedBox args={[6, 0.05, 4]} radius={0.01} smoothness={2} position={[-1, 0.02, 1.5]}>
          <meshStandardMaterial color="#ebe2d7" roughness={1} />
        </RoundedBox>

        {/* Ottomans */}
        {[[-1, 0.4, 1], [-2, 0.4, 0.5], [-1.5, 0.4, 2], [-2.5, 0.4, 1.5], [-3, 0.4, 2.5], [-2, 0.4, 3]].map((pos, i) => (
          <mesh key={`otto-${i}`} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
            <meshStandardMaterial color={wallColor} />
            {/* Soft cushion top */}
            <mesh position={[0, 0.2, 0]}>
               <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
               <meshStandardMaterial color={wallColor} roughness={0.9} />
            </mesh>
          </mesh>
        ))}
        {/* Small Table */}
        <mesh position={[1, 0.8, -1]}>
          <cylinderGeometry args={[0.6, 0.6, 1.6, 32]} />
          <meshStandardMaterial color={darkBeige} />
        </mesh>
        {/* Curved chair */}
        <mesh position={[2.5, 0.6, -1]}>
           <cylinderGeometry args={[0.8, 0.8, 1.2, 32]} />
           <meshStandardMaterial color={wallColor} />
        </mesh>
        <mesh position={[2.5, 1.4, -1]} rotation={[Math.PI/2, 0, 0]}>
           <torusGeometry args={[0.8, 0.2, 16, 32, Math.PI]} />
           <meshStandardMaterial color={wallColor} />
        </mesh>
      </group>
    </group>
  );
}

export default function GroundFloor({ active }: { active: boolean }) {
  return (
    <Suspense fallback={null}>
      <GroundFloorGeometry active={active} />
    </Suspense>
  );
}
