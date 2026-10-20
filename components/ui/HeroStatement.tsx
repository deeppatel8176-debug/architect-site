"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*";
const ARCHITECTURAL_CREED = "We design buildings you can walk into before they exist.";

function getScrambled(target: string, progress: number): string {
  return target
    .split("")
    .map((char) => {
      if (char === "\n" || char === " ") return char;
      if (Math.random() < progress) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

export default function HeroStatement() {
  const [scrambledText, setScrambledText] = useState(ARCHITECTURAL_CREED);
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);
  const currentVilla = useStore((s) => s.currentVilla);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const runCycle = useCallback((startTime: number) => {
    startRef.current = startTime;
    const SCRAMBLE_DURATION = 1400;
    const RESOLVE_DURATION = 1200;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      if (elapsed < SCRAMBLE_DURATION) {
        const progress = (elapsed / SCRAMBLE_DURATION) * 0.15;
        setScrambledText(getScrambled(ARCHITECTURAL_CREED, progress));
        rafRef.current = requestAnimationFrame(tick);
      } else if (elapsed < SCRAMBLE_DURATION + RESOLVE_DURATION) {
        const t = (elapsed - SCRAMBLE_DURATION) / RESOLVE_DURATION;
        const eased = 1 - Math.pow(1 - t, 2.5);
        setScrambledText(getScrambled(ARCHITECTURAL_CREED, eased));
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setScrambledText(ARCHITECTURAL_CREED);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    runCycle(performance.now());
    const interval = setInterval(() => runCycle(performance.now()), 9000);
    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [runCycle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex min-w-0 flex-col items-start w-full max-w-[640px]"
    >
      {/* Editorial Studio Eyebrow Badge with Generous Padding */}
      <div
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
        className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.09] bg-white/90 text-[11.5px] font-mono uppercase tracking-[0.14em] text-neutral-700 shadow-2xs backdrop-blur-sm mb-7"
      >
        <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
        <span>Siddhatva Design · Architecture Atelier</span>
      </div>

      {/* Primary Headline with Comfortable Line Height and Margin */}
      <h1
        id="hero-heading"
        className="text-[40px] sm:text-[50px] lg:text-[54px] xl:text-[60px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#111111] mb-6"
      >
        Architecture, <br />
        <span className="text-neutral-500 font-normal">Experienced Differently.</span>
      </h1>

      {/* Kinetic Architectural Creed / Subheading with Generous Top/Bottom Margins */}
      <div className="font-mono text-[13.5px] text-neutral-500 tracking-tight leading-relaxed mb-6 flex flex-wrap items-center">
        <span className="text-[#111111] font-semibold mr-2">Concept:</span>
        <span className="transition-colors duration-150">{scrambledText}</span>
      </div>

      {/* Concise Architectural Value Proposition with Airy Leading */}
      <p className="text-[15.5px] sm:text-[16.5px] leading-[1.75] text-neutral-600 max-w-[50ch] mb-10">
        Thoughtfully designed spaces. Immersive visualizations. Architecture shaped around the way you live. We conceive, simulate in 3D, and realize bespoke contemporary residences with uncompromising craftsmanship.
      </p>

      {/* Primary and Secondary CTAs with Generous Spacing Above and Below */}
      <div
        style={{
          marginTop: "1.75rem",
          marginBottom: "2.5rem",
        }}
        className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
      >
        {/* Primary CTA: Explore the Residence */}
        <button
          id="hero-explore-residence-btn"
          type="button"
          onClick={() => setDetailsModalOpen(true)}
          style={{
            paddingLeft: "32px",
            paddingRight: "30px",
            height: "52px",
          }}
          className="inline-flex select-none items-center justify-center gap-3 rounded-full bg-[#111111] text-[14px] font-medium text-white shadow-sm transition-all duration-150 hover:bg-neutral-800 hover:scale-[1.01] active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <span>Explore the Residence</span>
          <svg className="w-4 h-4 text-white/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </button>

        {/* Secondary CTA: Start a Project */}
        <a
          id="hero-start-project-btn"
          href="#contact"
          style={{
            paddingLeft: "30px",
            paddingRight: "28px",
            height: "52px",
          }}
          className="inline-flex select-none items-center justify-center gap-2.5 rounded-full border border-black/15 bg-white text-[14px] font-medium text-[#111111] shadow-2xs transition-all duration-150 hover:bg-neutral-50 hover:border-black/30 hover:scale-[1.01] active:scale-[0.98] whitespace-nowrap"
        >
          <span>Start a Project</span>
          <svg className="w-4 h-4 text-neutral-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Meta Features & Active Selection Indicator with Spacious Margins */}
      <div
        style={{
          marginTop: "1.25rem",
          paddingTop: "1.75rem",
        }}
        className="border-t border-black/[0.08] w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 text-[12.5px] text-neutral-500"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-medium text-neutral-800">Active 3D Model:</span>
          <span>Estate {currentVilla.number} — {currentVilla.name}</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11.5px] text-neutral-400">
          <span>360° Drag Interaction</span>
          <span>·</span>
          <span>Lighting Simulation</span>
        </div>
      </div>
    </motion.div>
  );
}
