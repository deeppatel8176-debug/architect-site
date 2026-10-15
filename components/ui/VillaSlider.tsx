"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { VILLAS } from "@/data/villas";

export default function VillaSlider() {
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const setModelIndex = useStore((s) => s.setModelIndex);
  const nextModel = useStore((s) => s.nextModel);
  const prevModel = useStore((s) => s.prevModel);
  const toggleAutoRotate = useStore((s) => s.toggleAutoRotate);

  const currentVilla = VILLAS[currentModelIndex] || VILLAS[0];
  const totalCount = String(VILLAS.length).padStart(2, "0");

  // Keyboard navigation (Arrow keys + Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextModel();
      } else if (e.key === "ArrowLeft") {
        prevModel();
      } else if (e.key === " ") {
        e.preventDefault();
        toggleAutoRotate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextModel, prevModel, toggleAutoRotate]);

  return (
    <div className="absolute bottom-10 md:bottom-12 left-0 right-0 z-30 px-6 flex justify-center pointer-events-none select-none">
      {/* ── Completely Transparent Floating Nav Dock (Matching Top Nav Bar) ── */}
      <div className="w-full max-w-3xl px-4 py-2 flex items-center justify-between text-white pointer-events-auto transition-all duration-300 bg-transparent border-none shadow-none">
        {/* Left: Number + Title & Tagline */}
        <div className="flex items-center gap-4 min-w-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          <div className="flex items-baseline shrink-0">
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans leading-none">
              {currentVilla.number}
            </span>
            <span className="text-xs text-neutral-400 font-mono font-medium ml-2">
              / {totalCount}
            </span>
          </div>

          <div className="h-6 w-px bg-white/30 hidden sm:block" />

          {/* Villa Name & Tagline */}
          <div className="flex flex-col min-w-0 truncate">
            <h3 className="text-sm md:text-base font-bold tracking-tight text-white font-sans truncate leading-snug">
              {currentVilla.name}
            </h3>
            <p className="text-[11px] text-neutral-400 font-normal tracking-tight truncate">
              {currentVilla.tagline || currentVilla.style}
            </p>
          </div>
        </div>

        {/* Right: Dots + Navigation Arrows */}
        <div className="flex items-center gap-3 shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {/* Dots */}
          <div className="hidden sm:flex items-center gap-1.5 px-2">
            {VILLAS.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setModelIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentModelIndex
                    ? "w-5 bg-white shadow-sm"
                    : "w-1.5 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to ${v.name}`}
              />
            ))}
          </div>

          {/* Previous Villa */}
          <button
            onClick={prevModel}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm shadow-sm"
            title="Previous Villa (Left Arrow)"
            aria-label="Previous Villa"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next Villa */}
          <button
            onClick={nextModel}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm shadow-sm"
            title="Next Villa (Right Arrow)"
            aria-label="Next Villa"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
