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
      className="relative w-full bg-black text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-white/10 font-sans"
    >
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-6 h-[1.5px] bg-[#c9a96e]" />
          <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold font-sans">
            04 — START A PROJECT
          </span>
        </div>

        {/* Heading in navbar font (font-sans) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight font-sans">
          Tell us what you&apos;re building.
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans tracking-tight leading-relaxed">
          A short note is enough. We&apos;ll reply within two business days with next steps — usually a 30-minute call.
        </p>

        {/* Form */}
        {isSubmitted ? (
          <div className="mt-10 p-8 rounded-xl bg-white/[0.04] border border-[#c9a96e]/30 flex flex-col gap-3 animate-in fade-in duration-300 font-sans">
            <div className="flex items-center gap-2.5 text-[#c9a96e]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm uppercase tracking-widest font-semibold font-sans">Inquiry Received</span>
            </div>
            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              Thank you, {formData.name}. Our architectural design team will review your project brief and get in touch via <span className="text-white underline">{formData.email}</span> within two business days.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", project: "" });
              }}
              className="mt-4 w-fit text-xs tracking-widest uppercase text-[#c9a96e] hover:text-white transition-colors cursor-pointer font-semibold font-sans"
            >
              ← Send another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 font-sans select-auto">
            {/* NAME */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full bg-[#121212] border border-white/15 focus:border-[#c9a96e] focus:bg-[#181818] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 font-sans tracking-tight"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@domain.com"
                className="w-full bg-[#121212] border border-white/15 focus:border-[#c9a96e] focus:bg-[#181818] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 font-sans tracking-tight"
              />
            </div>

            {/* PROJECT */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                PROJECT
              </label>
              <textarea
                rows={4}
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="Tell us about your property location, architectural vision, or requirements..."
                className="w-full bg-[#121212] border border-white/15 focus:border-[#c9a96e] focus:bg-[#181818] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 resize-none h-32 font-sans tracking-tight"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#c9a96e] hover:bg-[#d6b06a] text-black font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-lg rounded-full"
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
