"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useStore, CameraPreset, RenderMode } from "@/store/useStore";
import { VILLAS } from "@/data/villas";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf9f6] text-[#111111] p-6 text-center">
      <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin mb-3" />
      <span className="text-[12px] font-mono uppercase tracking-wider text-neutral-500">
        Initializing 3D Architectural Canvas...
      </span>
    </div>
  ),
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
  const renderMode = useStore((s) => s.renderMode);
  const setRenderMode = useStore((s) => s.setRenderMode);
  const cameraPreset = useStore((s) => s.cameraPreset);
  const setCameraPreset = useStore((s) => s.setCameraPreset);
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);
  const isLoadingModel = useStore((s) => s.isLoadingModel);
  const modelProgress = useStore((s) => s.modelProgress);
  const modelError = useStore((s) => s.modelError);

  const shouldReduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevIndexRef = useRef(currentModelIndex);
  const cardContainerRef = useRef<HTMLDivElement>(null);

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

  const handleResetCamera = () => {
    setCameraPreset("iso");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && cardContainerRef.current) {
      cardContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  return (
    <div
      ref={cardContainerRef}
      className={`relative w-full select-none ${
        isFullscreen ? "fixed inset-0 z-50 bg-[#f5f4f2] p-4 flex items-center justify-center" : ""
      }`}
      style={{ perspective: shouldReduceMotion ? undefined : 1200 }}
    >
      {/* ── Background Stacked Card 2 (Deepest) ── */}
      {!isFullscreen && (
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
          transition={{ type: "spring", bounce: 0.08, duration: 0.7 }}
          className="hidden sm:block absolute inset-x-0 bottom-0 aspect-[16/11.5] origin-top rounded-2xl sm:rounded-3xl border border-black/[0.06] bg-[#eae7df] shadow-[0_1px_2px_rgba(10,10,10,0.03)] -translate-y-6 opacity-70 pointer-events-none"
        >
          <div className="h-10 border-b border-black/[0.05] px-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 opacity-40">
              <span className="w-2 h-2 rounded-full bg-black/20" />
              <span className="w-2 h-2 rounded-full bg-black/20" />
              <span className="w-2 h-2 rounded-full bg-black/20" />
            </div>
            <span className="text-[11px] font-mono text-neutral-400">Estate Monograph · 3D Twin</span>
          </div>
        </motion.div>
      )}

      {/* ── Background Stacked Card 1 (Middle) ── */}
      {!isFullscreen && (
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
          transition={{ type: "spring", bounce: 0.08, duration: 0.7 }}
          className="hidden sm:block absolute inset-x-0 bottom-0 aspect-[16/11.5] origin-top rounded-2xl sm:rounded-3xl border border-black/[0.07] bg-[#f2efe9] shadow-[0_4px_20px_-10px_rgba(10,10,10,0.15)] -translate-y-3 opacity-85 pointer-events-none"
        >
          <div className="h-10 border-b border-black/[0.05] px-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 opacity-50">
              <span className="w-2 h-2 rounded-full bg-black/30" />
              <span className="w-2 h-2 rounded-full bg-black/30" />
              <span className="w-2 h-2 rounded-full bg-black/30" />
            </div>
            <span className="text-[11px] font-mono text-neutral-500">Siddhatva Design · Spatial Lab</span>
          </div>
        </motion.div>
      )}

      {/* ── Foreground Main 3D Card ── */}
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
        className={`relative w-full rounded-2xl sm:rounded-3xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,10,0.05),0_28px_56px_-28px_rgba(10,10,10,0.35)] overflow-hidden flex flex-col z-10 ${
          isFullscreen ? "h-full max-h-[92vh] max-w-6xl" : "aspect-[16/12] sm:aspect-[16/11.2]"
        }`}
      >
        {/* Card Header (Window Bar) */}
        <div className="h-12 shrink-0 border-b border-black/[0.07] bg-[#faf9f6] flex items-center justify-between gap-2 px-3 sm:px-5 select-none">
          {/* Left: Window Dots + Estate Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
            </div>

            <span className="h-3.5 w-px bg-black/10 shrink-0" />

            <div className="flex items-center gap-2 truncate">
              <span className="text-[12.5px] font-semibold text-[#111111] tracking-tight truncate">
                Estate {currentVilla.number}: {currentVilla.name}
              </span>
              <span className="hidden md:inline-block text-[11px] font-mono text-neutral-400">
                ({currentModelIndex + 1}/{totalCount})
              </span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View Presets Dropdown / Toggle */}
            <div className="hidden sm:flex items-center bg-neutral-100/90 border border-black/[0.08] p-1 rounded-xl gap-1 text-[11px]">
              {(["iso", "front", "top"] as CameraPreset[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCameraPreset(preset)}
                  className={`rounded-lg capitalize font-medium transition-all cursor-pointer ${
                    cameraPreset === preset
                      ? "bg-[#111111] text-white shadow-xs"
                      : "text-neutral-600 hover:text-black hover:bg-black/5"
                  }`}
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  title={`View from ${preset}`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Auto rotate toggle */}
            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`inline-flex items-center gap-1.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                isAutoRotating
                  ? "bg-[#111111] text-white border-black shadow-xs"
                  : "bg-white text-neutral-700 border-black/[0.08] hover:text-[#111111] hover:bg-neutral-50"
              }`}
              style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
              title="Toggle 360° Auto-Rotation"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span className="hidden xs:inline">Auto-spin</span>
            </button>


            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="rounded-xl border border-black/[0.08] bg-white text-neutral-600 hover:text-black hover:bg-neutral-50 cursor-pointer transition-colors flex items-center justify-center"
              style={{
                padding: "8px",
              }}
              title="Toggle Fullscreen"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isFullscreen ? (
                  <>
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                  </>
                ) : (
                  <>
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Card Body: Interactive 3D Canvas Stage */}
        <div className="relative flex-1 w-full bg-gradient-to-b from-[#faf9f6] via-[#f5f4f2] to-[#edeae2] overflow-hidden">
          {/* Model Loading Overlay */}
          {isLoadingModel && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs transition-opacity duration-300">
              <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin mb-2" />
              <span className="text-[11px] font-mono text-neutral-700">
                Loading 3D Twin ({modelProgress}%)
              </span>
            </div>
          )}

          {/* Model Error Fallback */}
          {modelError ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#f5f4f2]">
              <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#111111] mb-1">
                WebGL Fallback Mode
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mb-4">
                High-fidelity 3D model could not be rendered on this device. Explore the high-resolution architectural dossier instead.
              </p>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(true)}
                className="px-4 py-2 rounded-full bg-[#111111] text-white text-xs font-medium cursor-pointer"
              >
                Open Project Dossier
              </button>
            </div>
          ) : (
            <Scene />
          )}

          {/* Interactive Hint Pill in Corner */}
          <div className="absolute left-3.5 bottom-3.5 pointer-events-none z-20">
            <span
              className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] text-[11px] font-mono text-neutral-700 shadow-xs"
              style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              <svg className="w-3.5 h-3.5 text-[#111111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              Drag to explore 360° · Scroll to zoom
            </span>
          </div>

          {/* Top-Right Lighting Mode Switcher & Material Switcher */}
          <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
            <div className="flex items-center bg-white/95 backdrop-blur-md border border-black/[0.08] p-1 rounded-xl shadow-xs gap-1.5">
              {(["daylight", "sunset", "studio"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLightingMode(mode)}
                  className={`rounded-lg text-[11px] font-medium capitalize transition-all cursor-pointer ${
                    lightingMode === mode
                      ? "bg-[#111111] text-white shadow-xs"
                      : "text-neutral-600 hover:text-black hover:bg-black/5"
                  }`}
                  style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Material Render Mode (Realistic / Clay / Wireframe) */}
            <div className="hidden xs:flex items-center bg-white/95 backdrop-blur-md border border-black/[0.08] p-1 rounded-xl shadow-xs gap-1.5">
              {(["realistic", "clay", "wireframe"] as RenderMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setRenderMode(mode)}
                  className={`rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    renderMode === mode
                      ? "bg-[#111111] text-white shadow-xs"
                      : "text-neutral-500 hover:text-black hover:bg-black/5"
                  }`}
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                  title={`Render mode: ${mode}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Camera Button */}
          <div className="absolute right-3.5 bottom-3.5 z-20">
            <button
              type="button"
              onClick={handleResetCamera}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] text-[11px] font-medium text-neutral-700 hover:text-black hover:bg-white shadow-xs cursor-pointer transition-colors"
              style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
              title="Reset to default isometric camera view"
            >
              <svg className="w-3.5 h-3.5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Reset View</span>
            </button>
          </div>
        </div>

        {/* Card Footer: Navigation & Dossier Direct Action */}
        <div className="h-14 shrink-0 border-t border-black/[0.07] bg-white px-4 sm:px-5 flex items-center justify-between select-none">
          {/* Villa Details Button */}
          <button
            id="tastevilla-dossier-btn"
            type="button"
            onClick={() => setDetailsModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-neutral-700 hover:text-black cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Dossier & Specifications</span>
          </button>

          {/* Prev and Next Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Villa"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/[0.08] text-[#111111] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Villa"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111111] hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
