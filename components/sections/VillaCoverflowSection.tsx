"use client";

import React, { useState } from "react";
import CoverflowCarousel, {
  type CoverflowCarouselItem,
} from "@/components/ui/coverflow-carousel";
import { useStore } from "@/store/useStore";
import { VILLAS } from "@/data/villas";
import { STUDIO_PROJECTS, StudioProject } from "@/data/projects-data";
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

// Carousel items derived from 3D villas
const villaCarouselItems: CoverflowCarouselItem[] = VILLAS.map((villa, idx) => ({
  id: villa.id,
  image: `/images/project-${(idx % 4) + 1}.jpg`,
  alt: `Estate ${villa.number}: ${villa.name} - ${villa.location}`,
  content: (
    <div className="flex flex-col items-center text-center">
      <span className="text-xs font-mono text-neutral-400">Estate {villa.number}</span>
      <span className="font-semibold text-neutral-900">{villa.name}</span>
      <span className="text-[11px] text-neutral-500 font-mono mt-0.5">{villa.location}</span>
    </div>
  ),
}));

export default function VillaCoverflowSection() {
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const setModelIndex = useStore((s) => s.setModelIndex);
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);
  const setSelectedProjectId = useStore((s) => s.setSelectedProjectId);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Residential Architecture",
    "Interior Design",
    "3D Architectural Visualization",
  ];

  const filteredProjects = activeCategory === "All"
    ? STUDIO_PROJECTS
    : STUDIO_PROJECTS.filter((p) => p.category === activeCategory);

  const handleIndexChange = (index: number) => {
    if (index >= 0 && index < VILLAS.length) {
      setModelIndex(index);
    }
  };

  const handleOpenProject = (project: StudioProject) => {
    setSelectedProjectId(project.id);
    if (project.villaModelIndex !== undefined) {
      setModelIndex(project.villaModelIndex);
    }
    setDetailsModalOpen(true);
  };

  const handleView3D = (villaIndex: number) => {
    setModelIndex(villaIndex);
    const heroElem = document.getElementById("hero-heading");
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="villas"
      aria-labelledby="estates-coverflow-heading"
      style={{
        paddingTop: "6rem",
        paddingBottom: "6.5rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07]"
    >
      <div id="projects" className="sr-only" />

      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
        className="w-full flex flex-col items-center"
      >
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full flex flex-col items-center text-center"
        >
          {/* Pill Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Curated Architectural Portfolio
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            id="estates-coverflow-heading"
            className="mt-5 text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111111]"
          >
            Featured Estates & Residences
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-3 max-w-[560px] text-[15px] text-neutral-600 leading-relaxed"
          >
            Explore our curated portfolio of bespoke villas, contemporary residences, and high-fidelity 3D spatial twins. Select any estate to synchronize the interactive 3D digital model above or inspect the complete architectural dossier.
          </motion.p>
        </motion.div>

        {/* 3D Coverflow Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 w-full max-w-4xl"
        >
          <CoverflowCarousel
            items={villaCarouselItems}
            index={currentModelIndex}
            onIndexChange={handleIndexChange}
            depth={200}
            rotation={42}
            spacing={240}
            loop
          />
        </motion.div>


        {/* ── Category Filter Tabs ── */}
        <div
          className="w-full flex flex-col items-center"
          style={{ marginTop: "2.75rem" }}
        >
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            style={{ marginBottom: "3rem" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#111111] text-white shadow-xs"
                    : "bg-white text-neutral-600 border border-black/[0.08] hover:border-black/25 hover:text-black hover:bg-neutral-50"
                }`}
                style={{
                  paddingLeft: "22px",
                  paddingRight: "22px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Architectural Projects Grid ── */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((proj, idx) => (
              <motion.article
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group flex flex-col rounded-3xl border border-black/[0.08] bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
              >
                {/* Project Cover Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  {/* Category & Status Overlay Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span
                      className="rounded-full text-[11px] font-mono uppercase bg-white/95 backdrop-blur-sm text-neutral-800 border border-black/10 font-semibold shadow-xs"
                      style={{
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      {proj.category}
                    </span>
                  </div>
                  <div className="absolute top-3.5 right-3.5">
                    <span
                      className={`rounded-full text-[10.5px] font-mono uppercase font-semibold shadow-xs ${
                        proj.status === "Completed"
                          ? "bg-emerald-600 text-white"
                          : proj.status === "In Progress"
                          ? "bg-amber-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                      style={{
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      {proj.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div
                  className="flex flex-col flex-1 justify-between bg-white"
                  style={{
                    paddingLeft: "28px",
                    paddingRight: "28px",
                    paddingTop: "24px",
                    paddingBottom: "24px",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2.5">
                      <span>{proj.location}</span>
                      <span>{proj.year}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#111111] tracking-tight mb-1.5 group-hover:text-neutral-700 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium mb-3">
                      {proj.subtitle}
                    </p>
                    <p className="text-xs leading-relaxed text-neutral-600 line-clamp-2 mb-4">
                      {proj.concept}
                    </p>

                    {/* Materials preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.materials.slice(0, 3).map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="text-[11px] rounded-md bg-neutral-100 text-neutral-700 font-mono"
                          style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="border-t border-black/[0.06] flex items-center justify-between"
                    style={{
                      paddingTop: "16px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenProject(proj)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:underline cursor-pointer"
                    >
                      <span>Explore Project</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>

                    {proj.has3DModel && proj.villaModelIndex !== undefined && (
                      <button
                        type="button"
                        onClick={() => handleView3D(proj.villaModelIndex!)}
                        className="text-[11px] font-mono text-neutral-500 hover:text-black flex items-center gap-1 cursor-pointer"
                        title="Load this estate into the 3D Viewer"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Interactive 3D</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
