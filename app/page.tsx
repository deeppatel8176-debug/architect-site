"use client";

import dynamic from "next/dynamic";
import Overlay from "@/components/ui/Overlay";
import ModelTransitionOverlay from "@/components/ui/ModelTransitionOverlay";
import ModelLoader from "@/components/ui/ModelLoader";
import GlobalFooter from "@/components/ui/GlobalFooter";
import ArchitectBackground from "@/components/ui/ArchitectBackground";
import StartProjectSection from "@/components/sections/StartProjectSection";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 3D Showcase Hero Section — full viewport with Hero-1 Horizon Background */}
      <section className="relative w-full h-screen overflow-hidden hero-1-bg">
        {/* Background layer: Glowing Horizon Curved Arc */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Hero-1 Curved Planet / Horizon Glow */}
          <div className="hero-1-arc" />
        </div>

        {/* Architectural ghost text layer — z-8, behind 3D Canvas (z-10) */}
        <div className="absolute inset-0 z-[8]">
          <ArchitectBackground />
        </div>

        {/* 3D Model Interactive Stage */}
        <div className="relative z-10 w-full h-full">
          <Scene />
        </div>

        {/* Model Loading Indicator */}
        <ModelLoader />

        {/* Noise-dissolve shader wipe on model changes */}
        <ModelTransitionOverlay />

        {/* UI overlay — top layer */}
        <Overlay />
      </section>

      {/* ── 04 — START A PROJECT: Tell us what you're building ── */}
      <StartProjectSection />

      {/* Global Footer — transparent top blends with hero arc */}
      <div className="relative z-30">
        <GlobalFooter />
      </div>
    </div>
  );
}