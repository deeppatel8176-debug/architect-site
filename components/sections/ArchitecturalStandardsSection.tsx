"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

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

const bentoCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.1 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const whatWeDoItems = [
  {
    tag: "01 / Private Estates",
    title: "Monolithic Residential Architecture",
    description:
      "Bespoke private sanctuaries designed for challenging topographies — from alpine ridges in St. Moritz to Kyoto bamboo foothills and Mediterranean coastal cliffs.",
    specs: ["Private Compounds", "Cliffside Villas", "Custom Estates"],
  },
  {
    tag: "02 / Spatial Simulation",
    title: "Digital BIM & Real-Time 3D Twins",
    description:
      "Before ground breaks, clients explore sub-millimeter 3D digital twins with precise seasonal daylight simulation, solar azimuth mapping, and interior acoustics.",
    specs: ["WebGL Walkthroughs", "LOD 400 BIM", "Solar Simulation"],
  },
  {
    tag: "03 / Material Curation",
    title: "Artisan Quarry & Monolithic Craft",
    description:
      "Direct European quarry sourcing of Roman travertine, charred yakisugi cypress, micro-cement, and raw bronze elements hand-finished by master artisans.",
    specs: ["Quarry Direct", "Raw Bronze", "Yakisugi Cedar"],
  },
  {
    tag: "04 / Turnkey Execution",
    title: "Century-Grade Structural Engineering",
    description:
      "Complete site supervision, seismic post-tensioned floor slabs, integrated geothermal heating, and structural envelopes engineered to endure for 100+ years.",
    specs: ["Seismic Zone 4", "Geothermal Core", "Turnkey Delivery"],
  },
];

export default function ArchitecturalStandardsSection() {
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      style={{
        paddingTop: "7.5rem",
        paddingBottom: "7.5rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07]"
    >
      {/* Anchor for backward compatibility with #standards */}
      <div id="standards" className="sr-only" />

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
        {/* Section Header Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Left Column: Heading, Statement & CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col items-start"
          >
            {/* Pill Eyebrow with comfortable space */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-xs backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              What We Do
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              id="what-we-do-heading"
              className="mt-6 text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#111111]"
            >
              What we do. <br />
              <span className="text-neutral-400">From concept to monolithic reality.</span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 max-w-[46ch]"
            >
              We reject generic architecture. We conceive, simulate, and construct bespoke monolithic sanctuaries — directing every phase from real-time 3D spatial twins to European quarry extraction and ground engineering.
            </motion.p>

            {/* Buttons with generous padding to prevent text touching borders */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3.5"
            >
              <a
                href="#contact"
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
                className="inline-flex h-12 shrink-0 select-none items-center justify-center gap-2.5 rounded-full text-[14.5px] font-medium tracking-[-0.01em] outline-none transition-all duration-150 ease-out bg-[#111111] text-white hover:bg-neutral-800 active:scale-[0.97] shadow-sm"
              >
                <span>Inquire commission</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/80"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(true)}
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
                className="inline-flex h-12 shrink-0 select-none items-center justify-center gap-2 rounded-full text-[14.5px] font-medium tracking-[-0.01em] outline-none transition-all duration-150 ease-out border border-black/10 bg-white text-[#111111] hover:border-black/20 hover:bg-neutral-50 active:scale-[0.97] shadow-sm cursor-pointer"
              >
                Explore specifications
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: 4 Bento Cards with generous inner padding & staggered scroll reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whatWeDoItems.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={bentoCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                style={{
                  padding: "2rem 2.25rem",
                }}
                className="group relative rounded-3xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,10,0.04)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-black/15 hover:shadow-[0_6px_20px_rgba(10,10,10,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-medium tracking-wider text-neutral-400 uppercase">
                      {item.tag}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-black/10 group-hover:bg-[#111111] transition-colors" />
                  </div>

                  <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#111111] mb-2.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[14px] leading-relaxed text-neutral-600 mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.05]">
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      style={{ padding: "0.35rem 0.75rem" }}
                      className="inline-block text-[11px] rounded-lg bg-[#f5f4f2] text-neutral-700 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
