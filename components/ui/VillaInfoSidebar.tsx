"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";

export default function VillaInfoSidebar() {
  const currentVilla = useStore((s) => s.currentVilla);
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-20 left-5 md:left-7 z-30 transition-all duration-500 ease-out pointer-events-none select-none ${
        isCollapsed ? "-translate-x-[calc(100%+32px)] opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      {/* ── Modern Bento Card (Matte Graphite & Clean Typography) ── */}
      <div className="relative w-[340px] md:w-[350px] p-5 md:p-6 rounded-2xl bg-[#111215] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-white pointer-events-auto overflow-hidden">
        {/* Subtle diagonal hatching pattern in top right */}
        <div
          className="absolute top-0 right-0 w-36 h-36 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 8px)",
          }}
        />

        {/* Collapse Toggle Tab */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="absolute top-5 right-5 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Minimize Monograph"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Top Bento Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider uppercase font-semibold bg-white/10 text-neutral-200 border border-white/10">
            Estate {currentVilla.number}
          </span>
          <span className="text-white/20 text-xs">•</span>
          <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium truncate max-w-[140px]">
            {currentVilla.location.split(",")[0]}
          </span>
        </div>

        {/* Villa Title in Modern Bold Typography */}
        <h2 className="text-2xl font-bold text-white tracking-tight leading-snug mb-1 font-sans">
          {currentVilla.name}
        </h2>

        {/* Architect & Style Byline */}
        <p className="text-xs text-[#c5a880] font-medium tracking-wide mb-3 flex items-center gap-1.5">
          <span>{currentVilla.style}</span>
          <span className="text-white/20">/</span>
          <span className="text-neutral-400 truncate">{currentVilla.architect}</span>
        </p>

        {/* Narrative Description */}
        <p className="text-xs text-neutral-400 font-normal leading-relaxed mb-4 line-clamp-2">
          {currentVilla.description}
        </p>

        {/* ── Bento Metrics Strip (Clean Sub-Tiles) ── */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 rounded-xl p-2.5 transition-colors text-center">
            <span className="block text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5 font-medium">
              Area
            </span>
            <span className="text-base font-bold text-white tracking-tight block font-sans">
              {currentVilla.area.split(" ")[0]}
            </span>
            <span className="text-[8px] text-neutral-400 font-mono block mt-0.5">sq.ft</span>
          </div>

          <div className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 rounded-xl p-2.5 transition-colors text-center">
            <span className="block text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5 font-medium">
              Levels
            </span>
            <span className="text-base font-bold text-white tracking-tight block font-sans">
              {currentVilla.levels.split(" ")[0]}
            </span>
            <span className="text-[8px] text-neutral-400 font-mono block mt-0.5">tiers</span>
          </div>

          <div className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 rounded-xl p-2.5 transition-colors text-center">
            <span className="block text-[8px] uppercase tracking-wider text-neutral-400 mb-0.5 font-medium">
              Suites
            </span>
            <span className="text-base font-bold text-white tracking-tight block font-sans">
              {currentVilla.bedrooms.split(" ")[0]}
            </span>
            <span className="text-[8px] text-neutral-400 font-mono block mt-0.5">private</span>
          </div>
        </div>

        {/* Primary Materials Swatches */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">
              Material Palette
            </span>
            <span className="text-[8px] font-mono text-neutral-500 uppercase">Natural Raw</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentVilla.primaryMaterials.map((mat, i) => (
              <span
                key={i}
                className="text-[9px] px-2.5 py-0.5 rounded-md bg-white/[0.05] text-neutral-300 border border-white/10"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* ── CTA Button: Clean High-Contrast Rectangular Button ── */}
        <button
          onClick={() => setDetailsModalOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
        >
          <span>Explore Architectural Dossier</span>
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-neutral-950"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* Expand Button when Collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-20 left-5 pointer-events-auto px-4 py-2 rounded-xl bg-[#111215] border border-white/15 text-white text-xs font-semibold tracking-wide flex items-center gap-2.5 shadow-xl hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-sm bg-[#c5a880]" />
          <span>{currentVilla.name}</span>
          <svg className="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </aside>
  );
}
