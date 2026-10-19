"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

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
      className="relative w-full bg-[#f5f4f2] text-[#111111] font-sans overflow-hidden border-t border-black/[0.07]"
      style={{
        paddingTop: "6.5rem",
        paddingBottom: "8rem",
      }}
    >
      {/* Background Architectural Ambient Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ── Wider, Perfectly Centered Container with Generous Margins ── */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "880px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Header Block — Centered with scroll reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center text-center"
        >
          {/* Heading */}
          <motion.h2
            custom={0}
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111111] tracking-[-0.04em] leading-tight"
          >
            Tell us what you&apos;re building.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            custom={1}
            variants={fadeUp}
            className="mt-4 text-[15px] sm:text-base text-neutral-600 font-sans tracking-tight leading-relaxed max-w-xl"
          >
            A short note is enough. We&apos;ll reply within two business days with next steps — usually a 30-minute private consultation.
          </motion.p>
        </motion.div>

        {/* Form Container — Spacious TasteSkill White Elevation Card with Generous Inset Padding & scroll reveal */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 p-10 sm:p-14 md:p-16 rounded-3xl bg-white border border-black/[0.08] shadow-[0_1px_3px_rgba(10,10,10,0.04),0_28px_56px_-24px_rgba(10,10,10,0.12)] flex flex-col items-center text-center gap-4 font-sans"
          >
            <div className="w-14 h-14 rounded-full bg-neutral-100 border border-black/[0.08] flex items-center justify-center text-[#111111]">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-lg uppercase tracking-wider font-semibold font-sans text-[#111111]">
              Inquiry Received
            </span>
            <p className="text-[15px] text-neutral-600 font-sans leading-relaxed max-w-md">
              Thank you, {formData.name}. Our architectural design directors will review your project brief and get in touch via <span className="text-[#111111] font-semibold underline">{formData.email}</span> within two business days.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", project: "" });
              }}
              className="mt-6 px-7 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/[0.08] text-xs tracking-wider uppercase text-[#111111] transition-colors cursor-pointer font-semibold font-sans"
            >
              ← Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            style={{
              padding: "clamp(2.5rem, 5vw, 4rem)",
            }}
            className="mt-12 rounded-3xl bg-white border border-black/[0.08] shadow-[0_1px_3px_rgba(10,10,10,0.04),0_28px_56px_-24px_rgba(10,10,10,0.12)] flex flex-col gap-7 sm:gap-8 font-sans select-auto"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[12.5px] uppercase tracking-wider text-neutral-700 font-semibold font-sans pl-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                style={{
                  paddingLeft: "1.75rem",
                  paddingRight: "1.75rem",
                }}
                className="w-full h-14 bg-[#faf9f6] border border-black/[0.1] focus:border-[#111111] focus:bg-white rounded-2xl text-[15px] text-[#111111] placeholder:text-neutral-400 outline-none transition-all duration-200 font-sans tracking-tight shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[12.5px] uppercase tracking-wider text-neutral-700 font-semibold font-sans pl-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@domain.com"
                style={{
                  paddingLeft: "1.75rem",
                  paddingRight: "1.75rem",
                }}
                className="w-full h-14 bg-[#faf9f6] border border-black/[0.1] focus:border-[#111111] focus:bg-white rounded-2xl text-[15px] text-[#111111] placeholder:text-neutral-400 outline-none transition-all duration-200 font-sans tracking-tight shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* PROJECT */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[12.5px] uppercase tracking-wider text-neutral-700 font-semibold font-sans pl-1">
                Project Vision &amp; Location
              </label>
              <textarea
                rows={5}
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="Tell us about your property location, architectural vision, or requirements..."
                style={{
                  padding: "1.35rem 1.75rem",
                }}
                className="w-full h-44 bg-[#faf9f6] border border-black/[0.1] focus:border-[#111111] focus:bg-white rounded-2xl text-[15px] text-[#111111] placeholder:text-neutral-400 outline-none transition-all duration-200 resize-none font-sans tracking-tight shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Submit Button — Centered TasteSkill Black Pill */}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto min-w-[200px] h-13 px-10 bg-[#111111] hover:bg-neutral-800 text-white font-sans font-medium text-[15px] tracking-[-0.01em] transition-all duration-200 active:scale-97 cursor-pointer shadow-sm rounded-full flex items-center justify-center gap-2"
              >
                <span>Send inquiry</span>
                <span>→</span>
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
