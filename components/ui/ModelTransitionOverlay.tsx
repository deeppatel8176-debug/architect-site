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
        {/* TasteSkill Warm Paper Frosted Backdrop */}
        <div className="absolute inset-0 bg-[#f5f4f2]/95 backdrop-blur-md border-x border-black/[0.08]" />

        {/* Leading Edge: TasteSkill Crisp Ink Blade */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] ${
            isLtr ? "right-0" : "left-0"
          } bg-gradient-to-b from-transparent via-[#111111] to-transparent shadow-[0_0_24px_4px_rgba(17,17,17,0.2)]`}
        />

        {/* Trailing Soft Vignette */}
        <div
          className={`absolute inset-y-0 w-32 ${
            isLtr
              ? "right-0 bg-gradient-to-l from-black/5 to-transparent"
              : "left-0 bg-gradient-to-r from-black/5 to-transparent"
          }`}
        />

        {/* Center Minimal Architectural Title Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-500 font-semibold">
              Atelier Showcase
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#111111]">
              {transition.number}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#111111] font-sans">
            {transition.name}
          </h2>

          <p className="mt-2 text-xs md:text-sm tracking-[0.1em] uppercase text-neutral-500 font-sans">
            {transition.location}
          </p>

          <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}