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
    <section
      id="contact"
      className="relative w-full bg-black text-white font-sans overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        paddingTop: "6rem",
        paddingBottom: "7rem",
      }}
    >
      {/* Background Architectural Subtle Ambient Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c9a96e]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* ── Perfectly Centered Container with proper margin ── */}
      <div
        className="relative z-10 w-full px-6 sm:px-8"
        style={{
          maxWidth: "760px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Header Block — Centered */}
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-[#c9a96e]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-semibold font-sans">
              04 — START A PROJECT
            </span>
            <span className="w-8 h-[1.5px] bg-[#c9a96e]" />
          </div>

          {/* Heading in navbar font (font-sans) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight font-sans">
            Tell us what you&apos;re building.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans tracking-tight leading-relaxed max-w-lg">
            A short note is enough. We&apos;ll reply within two business days with next steps — usually a 30-minute call.
          </p>
        </div>

        {/* Form Container */}
        {isSubmitted ? (
          <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-white/[0.04] border border-[#c9a96e]/30 flex flex-col items-center text-center gap-4 animate-in fade-in duration-300 font-sans backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 flex items-center justify-center text-[#c9a96e]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-base uppercase tracking-widest font-semibold font-sans text-white">Inquiry Received</span>
            <p className="text-sm text-neutral-300 font-sans leading-relaxed max-w-md">
              Thank you, {formData.name}. Our architectural design directors will review your project brief and get in touch via <span className="text-white underline">{formData.email}</span> within two business days.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", project: "" });
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs tracking-widest uppercase text-[#c9a96e] hover:text-white transition-colors cursor-pointer font-semibold font-sans"
            >
              ← Send another inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-6 font-sans select-auto"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full bg-[#121212] border border-white/15 focus:border-[#c9a96e] focus:bg-[#181818] rounded-xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 font-sans tracking-tight"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@domain.com"
                className="w-full bg-[#121212] border border-white/15 focus:border-[#c9a96e] focus:bg-[#181818] rounded-xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 font-sans tracking-tight"
              />
            </div>

            {/* PROJECT */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                PROJECT
              </label>
              <textarea
                rows={4}
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="Tell us about your property location, architectural vision, or requirements..."
                className="w-full bg-[#121212] border border-white/15 focus:border-[#c9a96e] focus:bg-[#181818] rounded-xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 resize-none h-36 font-sans tracking-tight"
              />
            </div>

            {/* Submit Button — Centered */}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-12 py-4 bg-[#c9a96e] hover:bg-[#d6b06a] text-black font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-[0_4px_24px_rgba(201,169,110,0.25)] rounded-full hover:shadow-[0_6px_28px_rgba(201,169,110,0.4)]"
              >
                Send inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
