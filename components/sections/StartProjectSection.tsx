"use client";

import React, { useState } from "react";

export default function StartProjectSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full bg-black text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 select-none">
      {/* Background Architectural Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* ── Left Column: Form & Header ── */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1.5px] bg-[#c9a96e]" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c9a96e] font-medium">
              04 — START A PROJECT
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
            Tell us what you&apos;re building.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans tracking-tight leading-relaxed max-w-lg">
            A short note is enough. We&apos;ll reply within two business days with next steps — usually a 30-minute call.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <div className="mt-10 p-8 rounded-sm bg-neutral-900/60 border border-[#c9a96e]/40 flex flex-col gap-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-[#c9a96e]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-mono text-sm uppercase tracking-wider font-semibold">Inquiry Received</span>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                Thank you, {formData.name}. Our architectural design directors will review your project brief and get in touch via <span className="text-white underline">{formData.email}</span> within two business days.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", project: "" });
                }}
                className="mt-4 w-fit text-xs font-mono tracking-widest uppercase text-[#c9a96e] hover:text-white transition-colors cursor-pointer"
              >
                ← Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 max-w-lg select-auto">
              {/* NAME */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#141414] border border-white/15 focus:border-[#c9a96e] focus:bg-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200"
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#141414] border border-white/15 focus:border-[#c9a96e] focus:bg-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200"
                />
              </div>

              {/* PROJECT */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  PROJECT
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-[#141414] border border-white/15 focus:border-[#c9a96e] focus:bg-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 resize-none h-28"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-fit px-8 py-3.5 bg-[#c9a96e] hover:bg-[#d6b06a] text-black font-sans font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-md rounded-none sm:rounded-sm"
              >
                Send inquiry
              </button>
            </form>
          )}
        </div>

        {/* ── Right Column: Architectural CAD / Map Wireframe Box ── */}
        <div className="lg:col-span-6 w-full h-full min-h-[460px] lg:min-h-[520px] rounded-sm border border-white/15 bg-neutral-950/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Top Bar: CAD Coordinates & Status */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest text-neutral-400 border-b border-white/10 pb-4">
            <span className="text-white/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-ping" />
              CAD VIEWPORT
            </span>
            <div className="flex items-center gap-4 sm:gap-6">
              <span>X 00.00 &nbsp; Y 00.00 &nbsp; Z 00.00</span>
              <span className="text-[#c9a96e] font-semibold">BUILT 100%</span>
            </div>
          </div>

          {/* Center Blueprint Crosshair & Map Prompt matching screenshot */}
          <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center">
            {/* Architectural Crosshair Target */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#c9a96e]/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-16 h-16 rounded-full border border-white/15" />
              <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
              {/* Crosshair lines */}
              <div className="absolute top-0 bottom-0 w-px bg-white/20" />
              <div className="absolute left-0 right-0 h-px bg-white/20" />
            </div>

            <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-300 uppercase max-w-xs font-medium">
              MAP — EMBED GOOGLE MAPS OR MAPBOX HERE
            </p>

            <p className="mt-3 text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
              COORDINATES: 51.5074° N, 0.1278° W · MAYFAIR HQ
            </p>
          </div>

          {/* Bottom Bar: Architectural Specifications */}
          <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
            <span className="text-neutral-500">
              SCALE: 1:100 BIM COMPLIANT
            </span>
            <span className="text-[#c9a96e]">
              STATUS: ACCEPTING PRIVATE COMMISSIONS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
