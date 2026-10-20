"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function AboutStudioSection() {
  return (
    <section
      id="studio"
      aria-labelledby="about-studio-heading"
      style={{
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07] overflow-hidden"
    >
      <div id="about" className="sr-only" />

      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
        className="w-full"
      >
        {/* Editorial Top Eyebrow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start"
          style={{ marginBottom: "5rem" }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Studio Manifesto & Identity
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            id="about-studio-heading"
            className="text-[34px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#111111] max-w-[22ch]"
            style={{ marginTop: "24px" }}
          >
            Shaping spaces around how people truly live.
          </motion.h2>
        </motion.div>

        {/* 2-Column Architectural Editorial Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          style={{ marginTop: "1rem" }}
        >
          {/* Left Column: Studio Imagery & Tactility Plate */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-neutral-200 border border-black/10 shadow-sm">
              <img
                src="/images/manifesto.jpg"
                alt="Siddhatva Design Architectural Studio & Materials"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 block mb-1">
                  Atelier Philosophy
                </span>
                <p className="text-sm font-medium leading-snug">
                  Precision in raw materiality, honesty in structural volume, and reverence for natural daylight.
                </p>
              </div>
            </div>

            {/* Studio Key Attributes Card */}
            <div
              className="bg-white rounded-2xl border border-black/[0.08] shadow-xs"
              style={{
                paddingLeft: "28px",
                paddingRight: "28px",
                paddingTop: "24px",
                paddingBottom: "24px",
                marginTop: "16px",
              }}
            >
              <div
                className="text-xs font-mono uppercase tracking-wider text-neutral-400"
                style={{ marginBottom: "14px" }}
              >
                Core Architectural Tenets
              </div>
              <ul
                className="text-xs text-neutral-700"
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  <span>Site-responsive orientation and climate analysis</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  <span>Immersive 3D BIM walkthroughs before groundbreaking</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  <span>Honest structural expression and tactile material palettes</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Narrative Principles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            {/* Principle 01: Introduction & Identity */}
            <motion.div custom={0} variants={fadeUp} className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                01 / Studio Introduction
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                An architecture and design studio built on spatial clarity.
              </h3>
              <p className="text-[15px] sm:text-base leading-relaxed text-neutral-600">
                Siddhatva Design is a dedicated architecture and spatial design atelier focusing on contemporary luxury villas, bespoke private residences, thoughtful interiors, and real-time 3D architectural visualization. We believe true luxury lies not in ornamentation, but in proportion, tactile honesty, and a seamless relationship between built form and natural surroundings.
              </p>
            </motion.div>

            {/* Principle 02: Spatial Planning & Light */}
            <motion.div custom={1} variants={fadeUp} className="space-y-3 pt-6 border-t border-black/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                02 / Spatial Planning & Light
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                Sculpting with shadow, airflow, and diurnal rhythms.
              </h3>
              <p className="text-[15px] sm:text-base leading-relaxed text-neutral-600">
                Every project begins with a deep study of site topography, solar azimuth, and wind patterns. By aligning internal courtyards, deep verandas, and high-performance glazing, we create spaces that naturally modulate temperature and harness seasonal daylight, eliminating harsh solar heat while fostering tranquil living rituals.
              </p>
            </motion.div>

            {/* Principle 03: Aesthetics & Functional Rigor */}
            <motion.div custom={2} variants={fadeUp} className="space-y-3 pt-6 border-t border-black/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                03 / Materials & Enduring Craft
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                Materials that age with dignity.
              </h3>
              <p className="text-[15px] sm:text-base leading-relaxed text-neutral-600">
                We reject superficial finishes. Our palettes prioritize cast concrete, natural stone, locally sourced timber, hand-applied lime plaster, and patinated metals. Coupled with our digital 3D visualization capabilities, clients can walk through their spaces and examine every material texture and lighting condition long before construction commences.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4"
              style={{
                paddingTop: "32px",
                marginTop: "8px",
              }}
            >
              <a
                href="#process"
                className="inline-flex select-none items-center justify-center gap-2.5 rounded-full bg-[#111111] text-white shadow-xs transition-all hover:bg-neutral-800 active:scale-[0.98] cursor-pointer"
                style={{
                  height: "52px",
                  paddingLeft: "32px",
                  paddingRight: "28px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                <span>Discover Our Approach</span>
                <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href="#contact"
                className="inline-flex select-none items-center justify-center rounded-full border border-black/15 bg-white text-[#111111] shadow-xs transition-all hover:border-black/30 hover:bg-neutral-50 active:scale-[0.98] cursor-pointer"
                style={{
                  height: "52px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                <span>Consult With Us</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
