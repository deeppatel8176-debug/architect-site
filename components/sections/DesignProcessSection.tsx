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

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation",
    phase: "Discovery & Alignment",
    description:
      "A preliminary dialogue to understand your lifestyle aspirations, aesthetic sensibilities, plot location, spatial requirements, and realistic budget expectations.",
    deliverable: "Project Brief & Consultation Summary",
  },
  {
    step: "02",
    title: "Site Analysis & Brief Definition",
    phase: "Investigation & Context",
    description:
      "Comprehensive assessment of site conditions: solar paths, prevailing wind corridors, views, access points, and local zoning bylaws to inform responsive design.",
    deliverable: "Site Opportunity & Constraints Dossier",
  },
  {
    step: "03",
    title: "Concept & Spatial Planning",
    phase: "Form & Geometry",
    description:
      "Translating the brief into volumetric massing and spatial circulation. We test multiple floor plan options, internal courtyards, and relationships between indoor and outdoor zones.",
    deliverable: "Conceptual Floor Plans & Volumetric Sketches",
  },
  {
    step: "04",
    title: "3D Visualization & Spatial Twin",
    phase: "Immersive Simulation",
    description:
      "Creation of high-fidelity 3D renders and interactive WebGL spatial twins. Clients walk through digital spaces to evaluate scale, daylight penetration, and material textures before groundbreaking.",
    deliverable: "Interactive 3D Walkthrough & Render Suite",
  },
  {
    step: "05",
    title: "Design Development & Documentation",
    phase: "Precision & Detailing",
    description:
      "Refining structural systems, custom joinery, electrical layouts, HVAC integration, plumbing schematics, and compiling comprehensive material specification schedules.",
    deliverable: "GFC (Good for Construction) Working Drawings",
  },
  {
    step: "06",
    title: "Execution Coordination & Handover",
    phase: "Realization",
    description:
      "Periodic architectural site review, contractor design coordination, and mock-up approvals to verify that craftsmanship and material tolerances faithfully reflect the approved design.",
    deliverable: "Site Review Reports & Final Project Handover",
  },
];

export default function DesignProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      style={{
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07]"
    >
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
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start mb-14 sm:mb-16"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Methodology & Progression
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            id="process-heading"
            className="mt-5 text-[34px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#111111] max-w-[24ch]"
          >
            From first conversation to completed architecture.
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-4 text-[15px] sm:text-base leading-relaxed text-neutral-600 max-w-[50ch]"
          >
            A disciplined, transparent progression designed to eliminate uncertainty and keep clients informed and inspired at every milestone.
          </motion.p>
        </motion.div>

        {/* 6-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-3xl bg-white border border-black/[0.08] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                paddingLeft: "28px",
                paddingRight: "28px",
                paddingTop: "26px",
                paddingBottom: "26px",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-mono font-semibold text-neutral-400 group-hover:text-[#111111] transition-colors">
                    {step.step}
                  </span>
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 rounded-md"
                    style={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#111111] tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 mb-6">
                  {step.description}
                </p>
              </div>

              <div
                className="border-t border-black/[0.06]"
                style={{
                  paddingTop: "16px",
                  marginTop: "8px",
                }}
              >
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Key Deliverable
                </span>
                <span className="text-xs font-medium text-neutral-800">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scope Note and CTA Bar */}
        <div
          className="rounded-3xl bg-[#faf9f6] border border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            paddingLeft: "32px",
            paddingRight: "32px",
            paddingTop: "28px",
            paddingBottom: "28px",
            marginTop: "3rem",
          }}
        >
          <div className="text-xs leading-relaxed text-neutral-500 max-w-xl">
            <span className="font-semibold text-neutral-800 block mb-0.5">Scope Transparency:</span>
            Every commission is customized. Services such as interactive 3D digital twins, municipal sanction coordination, and periodic site reviews are clearly defined within the formal project agreement.
          </div>

          <a
            href="#contact"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#111111] text-xs font-medium text-white hover:bg-neutral-800 transition-colors shadow-2xs"
            style={{
              paddingLeft: "26px",
              paddingRight: "26px",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            Start Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
