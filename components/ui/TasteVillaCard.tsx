"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useStore } from "@/store/useStore";
import { VILLAS } from "@/data/villas";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export default function TasteVillaCard() {
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const setModelIndex = useStore((s) => s.setModelIndex);
  const nextModel = useStore((s) => s.nextModel);
  const prevModel = useStore((s) => s.prevModel);
  const currentVilla = useStore((s) => s.currentVilla);
  const isAutoRotating = useStore((s) => s.isAutoRotating);
  const toggleAutoRotate = useStore((s) => s.toggleAutoRotate);
  const lightingMode = useStore((s) => s.lightingMode);
  const setLightingMode = useStore((s) => s.setLightingMode);

  const shouldReduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const prevIndexRef = useRef(currentModelIndex);

  useEffect(() => {
    if (prevIndexRef.current !== currentModelIndex) {
      setDirection(currentModelIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = currentModelIndex;
    }
  }, [currentModelIndex]);

  const totalCount = String(VILLAS.length).padStart(2, "0");

  const handleNext = () => {
    setDirection(1);
    nextModel();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevModel();
  };

  const handleSelect = (idx: number) => {
    if (idx === currentModelIndex) return;
    setDirection(idx > currentModelIndex ? 1 : -1);
    setModelIndex(idx);
  };

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: shouldReduceMotion ? undefined : 1200 }}
    >
      {/* ── Background Stacked Card 2 (Deepest) ── */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateY: direction * -5,
                x: direction * -8,
                scale: 0.89,
              }
        }
        transition={{ type: "spring", bounce: 0.08, duration: 0.70 }}
        className="hidden sm:block absolute inset-x-0 bottom-0 aspect-[16/11.5] origin-top rounded-2xl sm:rounded-3xl border border-black/[0.06] bg-[#eae7df] shadow-[0_1px_2px_rgba(10,10,10,0.03)] -translate-y-6 opacity-70 pointer-events-none"
      >
        <div className="h-10 border-b border-black/[0.05] px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-40">
            <span className="w-2 h-2 rounded-full bg-black/20" />
            <span className="w-2 h-2 rounded-full bg-black/20" />
            <span className="w-2 h-2 rounded-full bg-black/20" />
          </div>
          <span className="text-[11px] font-mono text-neutral-400">Verdant Room · Botanical</span>
        </div>
      </motion.div>

      {/* ── Background Stacked Card 1 (Middle) ── */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateY: direction * -3,
                x: direction * -4,
                scale: 0.945,
              }
        }
        transition={{ type: "spring", bounce: 0.08, duration: 0.70 }}
        className="hidden sm:block absolute inset-x-0 bottom-0 aspect-[16/11.5] origin-top rounded-2xl sm:rounded-3xl border border-black/[0.07] bg-[#f2efe9] shadow-[0_4px_20px_-10px_rgba(10,10,10,0.15)] -translate-y-3 opacity-85 pointer-events-none"
      >
        <div className="h-10 border-b border-black/[0.05] px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-50">
            <span className="w-2 h-2 rounded-full bg-black/30" />
            <span className="w-2 h-2 rounded-full bg-black/30" />
            <span className="w-2 h-2 rounded-full bg-black/30" />
          </div>
          <span className="text-[11px] font-mono text-neutral-500">Northstar AI · Studio</span>
        </div>
      </motion.div>

      {/* ── Foreground Main 3D Card (with 3D Coverflow Transition Effect on Change) ── */}
      <motion.div
        key={currentVilla.id}
        initial={
          shouldReduceMotion
            ? { opacity: 0.85 }
            : {
                opacity: 0.85,
                rotateY: direction * 16,
                scale: 0.95,
                x: direction * 35,
                z: -70,
              }
        }
        animate={{
          opacity: 1,
          rotateY: 0,
          scale: 1,
          x: 0,
          z: 0,
        }}
        transition={{
          type: "spring",
          bounce: 0.09,
          duration: 0.76,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative aspect-[16/12] sm:aspect-[16/11.2] w-full rounded-2xl sm:rounded-3xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,10,0.05),0_28px_56px_-28px_rgba(10,10,10,0.35)] overflow-hidden flex flex-col z-10 transition-shadow duration-300 hover:shadow-[0_1px_3px_rgba(10,10,10,0.06),0_32px_64px_-28px_rgba(10,10,10,0.4)]"
      >
        {/* Card Header (Window Bar) */}
        <div className="h-12 shrink-0 border-b border-black/[0.07] bg-[#faf9f6] flex items-center justify-between gap-3 select-none" style={{ paddingLeft: "16px", paddingRight: "20px" }}>
          {/* Left: Window Dots + Estate Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
            </div>

            <span className="h-3.5 w-px bg-black/10 shrink-0" />

            <div className="flex items-center gap-2 truncate">
              <span className="text-[12.5px] font-semibold text-[#111111] tracking-tight truncate">
                Estate {currentVilla.number}: {currentVilla.name}
              </span>
            </div>
          </div>

          {/* Right: Auto-spin Control Only */}
          <div className="flex items-center gap-2 shrink-0" style={{ marginRight: "4px" }}>
            {/* Auto rotate toggle */}
            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-[11.5px] font-medium transition-colors cursor-pointer ${
                isAutoRotating
                  ? "bg-[#111111] text-white border-black"
                  : "bg-white text-neutral-600 border-black/[0.08] hover:text-[#111111] hover:bg-neutral-50"
              }`}
              title="Toggle 360° Auto-Rotation"
            >
              <span>Auto-spin</span>
            </button>
          </div>
        </div>

        {/* Card Body: Interactive 3D Canvas Stage */}
        <div className="relative flex-1 w-full bg-gradient-to-b from-[#faf9f6] via-[#f5f4f2] to-[#edeae2] overflow-hidden">
          <Scene />

          {/* Interactive Hint Pill in Corner */}
          <div className="absolute left-3.5 bottom-3.5 pointer-events-none z-20">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.08] text-[10.5px] font-mono text-neutral-600 shadow-xs">
              <svg className="w-3 h-3 text-[#111111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              Drag to explore 360°
            </span>
          </div>

          {/* Top-Right Lighting Mode Switcher */}
          <div className="absolute top-3 right-3 z-20 flex items-center bg-white/85 backdrop-blur-md border border-black/[0.08] p-1 rounded-lg shadow-xs" style={{ margin: "6px", gap: "4px" }}>
            {(["daylight", "sunset", "studio"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setLightingMode(mode)}
                className={`rounded text-[10.5px] font-medium capitalize transition-colors ${
                  lightingMode === mode
                    ? "bg-[#111111] text-white"
                    : "text-neutral-600 hover:text-black"
                }`}
                style={{ padding: "2px 8px" }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Card Footer: Only Prev and Next Arrow Navigation Buttons */}
        <div className="h-14 shrink-0 border-t border-black/[0.07] bg-white px-5 flex items-center justify-center gap-3 select-none">
          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Villa"
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/[0.08] text-[#111111] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Villa"
            className="w-9 h-9 rounded-full bg-[#111111] hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
