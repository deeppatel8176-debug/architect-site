"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useStore } from "@/store/useStore";
import EnvironmentLighting from "./EnvironmentLighting";
import CameraController from "./CameraController";
import VillaModel from "./VillaModel";

export default function Scene() {
  const currentVilla = useStore((s) => s.currentVilla);

  return (
    <div
      className="absolute inset-0 w-full h-full transition-all duration-700 select-none overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <Canvas
        shadows
        camera={{ position: [12.8, 8.4, 12.8], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <EnvironmentLighting />
          <VillaModel key={currentVilla.id} villa={currentVilla} />
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
}
