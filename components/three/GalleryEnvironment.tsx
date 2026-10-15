"use client";

import { useStore } from "@/store/useStore";
import { Environment, ContactShadows, useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Underground from "./dioramas/Underground";
import GroundFloor from "./dioramas/GroundFloor";
import FirstFloor from "./dioramas/FirstFloor";
import Popup from "./dioramas/Popup";

export const DIORAMA_POSITIONS: Record<string, number> = {
  underground: -40,
  ground: 0,
  first: 40,
  popup: 80,
};

export default function GalleryEnvironment() {
  const currentFloor = useStore((state) => state.currentFloor);

  return (
    <group>
      <Environment preset="sunset" />
      <ambientLight intensity={0.6} color="#ffe8d6" />
      
      {/* Key light */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={2} 
        color="#fff1e6" 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      {/* Fill light */}
      <directionalLight position={[-10, 10, -10]} intensity={0.8} color="#dbe7eb" />
      {/* Rim light */}
      <directionalLight position={[0, 5, -20]} intensity={1.5} color="#fff" />
      
      {/* Soft contact shadows beneath all models */}
      <ContactShadows 
        position={[0, -0.15, 0]} 
        opacity={0.6} 
        scale={250} 
        blur={2} 
        far={10} 
        color="#8c7d6b" 
      />

      <group position={[0, 0, 0]}>
        <Underground active={currentFloor === "underground"} />
      </group>
      
      <group position={[0, 0, 0]}>
        <GroundFloor active={currentFloor === "ground"} />
      </group>
      
      <group position={[0, 0, 0]}>
        <FirstFloor active={currentFloor === "first"} />
      </group>
      
      <group position={[0, 0, 0]}>
        <Popup active={currentFloor === "popup"} />
      </group>
    </group>
  );
}
