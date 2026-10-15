"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function VillaDetailsModal() {
  const isDetailsModalOpen = useStore((s) => s.isDetailsModalOpen);
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);
  const currentVilla = useStore((s) => s.currentVilla);

  if (!isDetailsModalOpen) return null;

  return (
    <div
      onClick={() => setDetailsModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-2xl text-neutral-900 max-h-[85vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setDetailsModalOpen(false)}
          className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black transition-all cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Monograph Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200 uppercase font-semibold">
            Estate {currentVilla.number}
          </span>
          <span className="text-xs text-neutral-400">•</span>
          <span className="text-xs text-neutral-500 font-medium tracking-wide">
            {currentVilla.location} · {currentVilla.year}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-1.5 font-sans">
          {currentVilla.name}
        </h2>
        <p className="text-xs md:text-sm text-[#9c7442] font-medium tracking-wide mb-6">
          {currentVilla.style} · Curated by {currentVilla.architect}
        </p>

        {/* Narrative Section */}
        <div className="mb-6 bg-neutral-50 p-5 rounded-xl border border-neutral-200/80">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
            Architectural Philosophy & Form
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-normal">
            {currentVilla.description}
          </p>
        </div>

        {/* Technical Specifications Bento Grid */}
        <div className="mb-6">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5 font-bold">
            Structural & Spatial Dimensions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {currentVilla.features.map((feat, i) => (
              <div key={i} className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80">
                <span className="block text-[8px] text-neutral-500 uppercase tracking-wider mb-1 font-semibold">
                  {feat.label}
                </span>
                <span className="text-sm font-bold text-neutral-900 font-sans">{feat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Materials & Tactility */}
        <div className="mb-6">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5 font-bold">
            Material Specification Dossier
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {currentVilla.primaryMaterials.map((mat, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights & Hotspots */}
        <div className="mb-6">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5 font-bold">
            Signature Engineering Features
          </h3>
          <div className="space-y-2">
            {currentVilla.hotspots.map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-md bg-neutral-900 text-white flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">
                  ✦
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 mb-0.5 tracking-tight font-sans">
                    {h.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            Private dossier reserved for accredited collectors and institutions.
          </p>
          <Link
            href="/contact"
            onClick={() => setDetailsModalOpen(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs tracking-wider uppercase transition-all text-center shadow-sm"
          >
            Inquire About {currentVilla.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
