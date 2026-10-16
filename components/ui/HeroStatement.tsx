"use client";

import React from "react";

export default function HeroStatement() {
  return (
    <div className="absolute left-6 sm:left-10 lg:left-16 top-24 sm:top-28 lg:top-32 z-20 max-w-[90vw] sm:max-w-lg lg:max-w-xl xl:max-w-2xl pointer-events-none select-none">
      {/* ── Eyebrow ── */}
      <div className="flex items-center gap-2 mb-3 sm:mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] shadow-[0_0_8px_#c9a96e]" />
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#c9a96e] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          MERIDIAN STUDIO — ARCHITECTURE &amp; INTERIORS
        </span>
      </div>

      {/* ── Editorial Headline Matching Reference ── */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-serif font-light text-white leading-[1.03] tracking-[-0.015em] drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)]">
        We design <br />
        buildings <br />
        you can{" "}
        <span
          className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ecd5b5] via-[#d4af37] to-[#c9a96e] drop-shadow-[0_0_24px_rgba(212,175,55,0.45)]"
          style={{ fontStyle: "italic" }}
        >
          walk into
        </span>{" "}
        <br />
        before they exist.
      </h1>

      {/* ── Subtitle / Paragraph ── */}
      <p className="mt-5 sm:mt-7 text-xs sm:text-sm md:text-base text-neutral-400 font-sans tracking-tight leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
        Interactive 3D models, real-time walkthroughs, and construction-grade documentation — built on the same precision that shapes tomorrow&apos;s architectural landmarks.
      </p>

      {/* ── Subtle Interactive Hint ── */}
      <div className="mt-6 sm:mt-8 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-300 shadow-lg">
          <svg
            className="w-3.5 h-3.5 text-[#c9a96e] animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          DRAG TO EXPLORE 3D
        </span>
      </div>
    </div>
  );
}
