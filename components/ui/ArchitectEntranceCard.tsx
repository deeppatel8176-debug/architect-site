"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, Sparkles, Building2, Compass, Layers } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

interface ArchitectEntranceCardProps {
  onEnter?: () => void;
  isOpen?: boolean;
}

export function ArchitectEntranceCard({
  onEnter,
  isOpen = true,
}: ArchitectEntranceCardProps) {
  const [visible, setVisible] = useState(isOpen);
  const { content } = useSiteContent();
  const entrance = content?.entranceCard;

  const handleEnter = () => {
    setVisible(false);
    if (onEnter) onEnter();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="architect-entrance-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(14px)",
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-[#f5f4f2]/95 p-4 sm:p-6 backdrop-blur-xl selection:bg-[#111111] selection:text-[#f5f4f2]"
        >
          {/* Organic Stone Texture Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
          >
            <img
              alt=""
              src="/textures/cleanstone.jpg"
              className="-scale-x-100 object-cover w-full h-full opacity-35 mix-blend-multiply"
            />
          </div>

          {/* Subtle Warm Ambient Radial & Architectural Grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(215,200,180,0.3),transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-30 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:36px_36px]"
          />

          {/* Top Atelier Eyebrow Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-6 flex items-center gap-2.5 rounded-full border border-black/[0.09] bg-white/90 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-neutral-800 shadow-2xs backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-[#111111] animate-pulse" />
            <span>Siddhatva Architecture • 2026 Portfolio</span>
          </motion.div>

          {/* Central 3D Tilt Card (White Theme) — Click to Enter */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[460px] cursor-pointer"
            onClick={handleEnter}
          >
            <TiltCard
              tiltLimit={14}
              scale={1.03}
              perspective={1400}
              effect="evade"
              spotlight={true}
              className="group relative w-full rounded-3xl border border-black/[0.09] bg-white/95 p-6 sm:p-8 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/25 hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.18)]"
            >
              <div className="relative z-20 flex flex-col">
                {/* Header Metadata Chips */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#111111]/[0.04] px-3 py-1 text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-800 backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-amber-700" />
                    {entrance?.badge || "3D Digital Twin"}
                  </span>
                  <span className="text-[12px] font-mono tracking-wider text-neutral-500">
                    {entrance?.year || "Est. 2026"}
                  </span>
                </div>

                {/* Hero Architecture Visual Preview */}
                <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-neutral-100 shadow-sm">
                  <img
                    src={entrance?.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"}
                    alt={entrance?.estateName || "Luxury Villa Architecture Preview"}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  
                  {/* Floating Tag inside photo */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-black/10 bg-white/90 px-2.5 py-1 text-[11px] font-mono text-neutral-900 shadow-xs backdrop-blur-md">
                    <Building2 className="h-3.5 w-3.5 text-neutral-800" />
                    <span>{entrance?.estateName || "The Glass Monolith Estate"}</span>
                  </div>
                </div>

                {/* Card Title & Architectural Creed */}
                <h2 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-[#111111] transition-colors">
                  {entrance?.title || "The Architectural Dossier"}
                </h2>
                
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-neutral-600">
                  {entrance?.description || "Step into an interactive showcase of monumental residences, sculpted private estates, and real-time digital scale models."}
                </p>

                {/* Micro Specs Grid */}
                <div className="my-5 grid grid-cols-2 gap-2.5 border-y border-black/[0.08] py-3.5 text-[12px] font-mono text-neutral-700">
                  <div className="flex items-center gap-2">
                    <Compass className="h-3.5 w-3.5 text-neutral-900" />
                    <span>{entrance?.location || "Mumbai & Ahmedabad"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5 text-neutral-900" />
                    <span>{entrance?.category || "Curated Estates"}</span>
                  </div>
                </div>

                {/* Interactive Action Prompt Button */}
                <div className="mt-1 flex items-center justify-between rounded-2xl bg-[#111111] px-5 py-3.5 text-white transition-all duration-200 group-hover:bg-neutral-800 shadow-sm">
                  <span className="text-[13px] font-medium tracking-wide">
                    {entrance?.buttonText || "Click to Enter Studio"}
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Hint / Instruction below Card */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-5 text-center text-xs font-mono text-neutral-600 tracking-wider"
          >
            Interact &amp; move cursor to tilt • Click card to reveal full website
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ArchitectEntranceCard;
