"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";

interface TransitionState {
  active: boolean;
  key: number;
  direction: "ltr" | "rtl";
  number: string;
  name: string;
  location: string;
}

export default function ModelTransitionOverlay() {
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const currentVilla = useStore((s) => s.currentVilla);

  const prevIndexRef = useRef<number | null>(null);
  const [transition, setTransition] = useState<TransitionState>({
    active: false,
    key: 0,
    direction: "ltr",
    number: currentVilla.number,
    name: currentVilla.name,
    location: currentVilla.location,
  });

  useEffect(() => {
    if (prevIndexRef.current === null) {
      prevIndexRef.current = currentModelIndex;
      return;
    }

    if (prevIndexRef.current !== currentModelIndex) {
      const prev = prevIndexRef.current;
      // Determine if navigation is forward (next) or backward (prev)
      const isForward =
        (currentModelIndex > prev && !(prev === 0 && currentModelIndex === 3)) ||
        (prev === 3 && currentModelIndex === 0);

      prevIndexRef.current = currentModelIndex;

      setTransition({
        active: true,
        key: Date.now(),
        direction: isForward ? "ltr" : "rtl",
        number: currentVilla.number,
        name: currentVilla.name,
        location: currentVilla.location,
      });

      const timer = setTimeout(() => {
        setTransition((prev) => ({ ...prev, active: false }));
      }, 620);

      return () => clearTimeout(timer);
    }
  }, [currentModelIndex, currentVilla]);

  if (!transition.active) return null;

  const isLtr = transition.direction === "ltr";

  return (
    <div
      key={transition.key}
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Sweeping Architectural Curtain & Glowing Light Blade ── */}
      <div
        className={`absolute inset-0 w-full h-full will-change-transform ${
          isLtr ? "animate-sweep-ltr" : "animate-sweep-rtl"
        }`}
      >
        {/* Dark Obsidian Frosted Backdrop */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

        {/* Leading Edge: Radiant Champagne-Gold Light Blade */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] ${
            isLtr ? "right-0" : "left-0"
          } bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_50px_12px_rgba(212,175,55,0.5)]`}
        />

        {/* Secondary Shimmer Blade */}
        <div
          className={`absolute top-0 bottom-0 w-[1px] ${
            isLtr ? "right-2" : "left-2"
          } bg-gradient-to-b from-transparent via-white/80 to-transparent shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]`}
        />

        {/* Trailing Soft Vignette */}
        <div
          className={`absolute inset-y-0 w-32 ${
            isLtr
              ? "right-0 bg-gradient-to-l from-[#d4af37]/15 to-transparent"
              : "left-0 bg-gradient-to-r from-[#d4af37]/15 to-transparent"
          }`}
        />

        {/* Center Minimal Architectural Title Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#d4af37]">
              Atelier Showcase
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-xs font-mono font-bold tracking-widest text-white">
              {transition.number}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-serif font-light tracking-[0.12em] text-white uppercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
            {transition.name}
          </h2>

          <p className="mt-2 text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-400 font-sans">
            {transition.location}
          </p>

          <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>
      </div>
    </div>
  );
}