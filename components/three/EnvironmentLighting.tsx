"use client";

import { useStore } from "@/store/useStore";
import { ContactShadows, Environment } from "@react-three/drei";

export default function EnvironmentLighting() {
  const lightingMode = useStore((s) => s.lightingMode);

  return (
    <group>
      {/* Lighting Presets */}
      {lightingMode === "sunset" && (
        <>
          <Environment preset="sunset" />
          <ambientLight intensity={0.75} color="#ffe8d6" />
          <directionalLight
            position={[16, 22, 14]}
            intensity={2.5}
            color="#ffcca5"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={60}
            shadow-camera-left={-18}
            shadow-camera-right={18}
            shadow-camera-top={18}
            shadow-camera-bottom={-18}
            shadow-bias={-0.0004}
          />
          <directionalLight position={[-14, 12, -10]} intensity={0.9} color="#94b8d0" />
          <directionalLight position={[0, 8, -20]} intensity={1.5} color="#ffe0cc" />
        </>
      )}

      {lightingMode === "daylight" && (
        <>
          <Environment preset="city" />
          <ambientLight intensity={0.95} color="#ffffff" />
          <directionalLight
            position={[18, 30, 16]}
            intensity={2.8}
            color="#fffdf8"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={70}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0004}
          />
          <directionalLight position={[-12, 12, -14]} intensity={1.2} color="#c8ddf7" />
          <directionalLight position={[0, 6, -18]} intensity={0.8} color="#ffffff" />
        </>
      )}

      {lightingMode === "night" && (
        <>
          <Environment preset="night" />
          <ambientLight intensity={0.25} color="#151b2e" />
          {/* Cool Moonlight */}
          <directionalLight
            position={[-15, 25, -15]}
            intensity={1.2}
            color="#7ea6e0"
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Warm Architectural Uplights */}
          <pointLight position={[5, 2.0, 5]} intensity={3.5} color="#ffaa55" distance={16} />
          <pointLight position={[-5, 2.0, -5]} intensity={3.5} color="#ffaa55" distance={16} />
          <pointLight position={[0, 3.5, 0]} intensity={4.0} color="#ffc482" distance={22} />
        </>
      )}

      {lightingMode === "studio" && (
        <>
          <Environment preset="studio" />
          <ambientLight intensity={0.95} color="#ffffff" />
          <directionalLight position={[12, 22, 12]} intensity={2.2} color="#ffffff" castShadow />
          <directionalLight position={[-12, 15, -12]} intensity={1.4} color="#ffffff" />
          <directionalLight position={[0, -5, 12]} intensity={0.6} color="#ffffff" />
        </>
      )}

      {/* Invisible Seamless Ground Shadow Catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <shadowMaterial opacity={lightingMode === "night" ? 0.65 : 0.45} />
      </mesh>

      {/* Deep, Soft Ambient Contact Shadow Under the Villa Foundation */}
      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={lightingMode === "night" ? 0.85 : 0.7}
        scale={24}
        blur={2.4}
        far={12}
        color={lightingMode === "night" ? "#000000" : "#1a1510"}
      />
    </group>
  );
}
