"use client";

import React, { useState } from "react";
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

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "architectural-design",
    number: "01",
    title: "Architectural Design",
    tagline: "Concept to structural realization",
    description:
      "Comprehensive architectural development for luxury villas, private family compounds, and contemporary residences. We handle site evaluation, zoning analysis, conceptual massing, spatial layouts, structural coordination, and detailed architectural documentation.",
    deliverables: [
      "Site & Topographical Analysis",
      "Concept Sketches & 3D Massing",
      "Floor Plans, Elevations & Sections",
      "Structural & MEP Coordination",
    ],
    image: "/images/project-1.jpg",
  },
  {
    id: "interior-design",
    number: "02",
    title: "Interior Architecture & Design",
    tagline: "Tactile harmony & bespoke living environments",
    description:
      "Holistic interior architecture tailored to your daily rituals. From bespoke flush millwork and material curation to circadian lighting architecture, custom furniture procurement, and acoustic refinement.",
    deliverables: [
      "Spatial Layout & Joinery Details",
      "Material, Stone & Timber Palettes",
      "Architectural Lighting Design",
      "Furniture, Art & Fixture Coordination",
    ],
    image: "/images/studio/project-interior-1.jpeg",
  },
  {
    id: "3d-visualization",
    number: "03",
    title: "3D Architectural Visualization",
    tagline: "Immersive digital twins before groundbreaking",
    description:
      "Photorealistic architectural rendering and interactive real-time WebGL walkthroughs. We simulate solar azimuth, seasonal lighting, material reflectivity, and spatial proportions so you experience every corner of your residence before construction starts.",
    deliverables: [
      "High-Fidelity Photorealistic Renders",
      "Interactive 360° Digital Twins",
      "Daylight & Solar Azimuth Simulation",
      "Virtual Client Presentations",
    ],
    image: "/images/project-4.jpg",
  },
  {
    id: "renovation",
    number: "04",
    title: "Renovation & Remodeling",
    tagline: "Elevating existing architectural fabric",
    description:
      "Sensitive spatial re-planning and modern architectural upgrades for existing residences. We reconfigure circulation, expand natural daylight penetration, and upgrade envelopes with contemporary high-efficiency systems.",
    deliverables: [
      "Structural Reconfiguration Assessment",
      "Facade Modernization & Envelope Upgrades",
      "Open-Plan Spatial Re-engineering",
      "Interior Material Overhauls",
    ],
    image: "/images/studio/project-interior-10.jpeg",
  },
  {
    id: "consultation",
    number: "05",
    title: "Project Consultation & Advisory",
    tagline: "Clarity on feasibility, budget, and design direction",
    description:
      "Strategic early-stage architectural counsel. We help prospective clients evaluate plot potential, define architectural briefs, explore spatial requirements, and align project aspirations with realistic schedules.",
    deliverables: [
      "Plot & Site Feasibility Reviews",
      "Program & Space Needs Formulation",
      "Design Direction Alignment",
      "Preliminary Phase Planning",
    ],
    image: "/images/gallery-2.jpg",
  },
];

export default function ArchitecturalStandardsSection() {
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICES[0]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07]"
    >
      {/* Anchor for backward compatibility with #what-we-do and #standards */}
      <div id="what-we-do" className="sr-only" />
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
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start mb-12 sm:mb-16"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Architecture & Design Services
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            id="services-heading"
            className="mt-5 text-[34px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#111111] max-w-[24ch]"
          >
            Disciplines practiced with rigorous architectural craft.
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-4 text-[15px] sm:text-base leading-relaxed text-neutral-600 max-w-[52ch]"
          >
            From raw topographical concept to furnished interior sanctuary and interactive 3D twins, we provide unified architectural services that protect the integrity of your vision throughout every stage.
          </motion.p>
        </motion.div>

        {/* Editorial Services Layout: Left Service Selector List, Right Interactive Focus Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Editorial Accordion/List of Services */}
          <div className="lg:col-span-7 space-y-4">
            {SERVICES.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-black/15 shadow-sm"
                      : "bg-[#faf9f6] border-black/[0.06] hover:bg-white hover:border-black/10"
                  }`}
                  style={{
                    padding: "26px",
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-neutral-400">
                        {service.number}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#111111] tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <span className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? "bg-[#111111]" : "bg-black/10"
                    }`} />
                  </div>

                  <p className="mt-3 text-xs sm:text-[13.5px] leading-relaxed text-neutral-600">
                    {service.description}
                  </p>

                  {/* Expandable Deliverables when active */}
                  {isActive && (
                    <div className="mt-5 pt-4 border-t border-black/[0.06] animate-in fade-in duration-200">
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                        Key Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                            <span className="w-1 h-1 rounded-full bg-neutral-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#111111] hover:underline"
                        >
                          <span>Discuss this service for your project</span>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase Plate */}
          <div className="lg:col-span-5 sticky top-24">
            <div
              className="relative rounded-3xl overflow-hidden bg-white border border-black/10 shadow-sm"
              style={{ padding: "18px" }}
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-400"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-mono text-neutral-800 border border-black/10 font-semibold">
                  Service {activeService.number}
                </div>
              </div>

              <div className="p-4 mt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  {activeService.tagline}
                </span>
                <h4 className="text-base font-semibold text-[#111111]">
                  {activeService.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  Direct engagement with our studio principals ensures your specifications, budget constraints, and aesthetic goals remain uncompromised.
                </p>

                <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[#111111] px-5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
                  >
                    Discuss Your Project
                  </a>
                  <a
                    href="#process"
                    className="text-xs font-mono text-neutral-500 hover:text-black"
                  >
                    View Process →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
