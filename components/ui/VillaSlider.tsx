"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { VILLAS } from "@/data/villas";

export default function VillaSlider() {
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const setModelIndex = useStore((s) => s.setModelIndex);
  const nextModel = useStore((s) => s.nextModel);
  const prevModel = useStore((s) => s.prevModel);

  const currentVilla = VILLAS[currentModelIndex] || VILLAS[0];
  const totalCount = String(VILLAS.length).padStart(2, "0");

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextModel();
      } else if (e.key === "ArrowLeft") {
        prevModel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextModel, prevModel]);

  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);

  return (
    <div id="villas" className="absolute bottom-6 md:bottom-10 left-0 right-0 z-30 px-4 sm:px-6 flex justify-center pointer-events-none select-none">
      {/* ── TasteSkill Floating White Elevation Dock ── */}
      <div className="w-full max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-between text-[#111111] pointer-events-auto transition-all duration-300 rounded-2xl bg-white/92 backdrop-blur-md border border-black/[0.08] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_24px_48px_-20px_rgba(10,10,10,0.14)]">
        {/* Left: Number + Title & Tagline */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="flex items-baseline shrink-0">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] font-sans leading-none">
              {currentVilla.number}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono font-medium ml-1.5">
              / {totalCount}
            </span>
          </div>

          <div className="h-5 w-px bg-black/10 hidden sm:block" />

          {/* Villa Name & Tagline */}
          <div className="flex flex-col min-w-0 truncate">
            <h3 className="text-[13.5px] sm:text-[14.5px] font-semibold tracking-tight text-[#111111] font-sans truncate leading-snug">
              {currentVilla.name}
            </h3>
            <p className="text-[11.5px] text-neutral-500 font-normal tracking-tight truncate">
              {currentVilla.style} · {currentVilla.location}
            </p>
          </div>
        </div>

        {/* Right: Quick Dossier Pill + Dots + Navigation Arrows */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dossier trigger pill */}
          <button
            onClick={() => setDetailsModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/[0.06] text-[12px] font-medium text-neutral-700 hover:text-black transition-all cursor-pointer"
          >
            Specs
          </button>

          {/* Dots */}
          <div className="hidden sm:flex items-center gap-1.5 px-1.5">
            {VILLAS.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setModelIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentModelIndex
                    ? "w-5 bg-[#111111]"
                    : "w-1.5 bg-black/15 hover:bg-black/40"
                }`}
                aria-label={`Go to ${v.name}`}
              />
            ))}
          </div>

          {/* Previous Villa */}
          <button
            onClick={prevModel}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/[0.08] text-[#111111] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
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
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/[0.08] text-[#111111] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
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
