"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { STUDIO_PROJECTS, StudioProject } from "@/data/projects-data";
import { VILLAS } from "@/data/villas";

export default function VillaDetailsModal() {
  const isDetailsModalOpen = useStore((s) => s.isDetailsModalOpen);
  const setDetailsModalOpen = useStore((s) => s.setDetailsModalOpen);
  const selectedProjectId = useStore((s) => s.selectedProjectId);
  const setSelectedProjectId = useStore((s) => s.setSelectedProjectId);
  const currentVilla = useStore((s) => s.currentVilla);
  const setModelIndex = useStore((s) => s.setModelIndex);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Determine active project: either selected studio project or synthesized from currentVilla
  const activeStudioProject: StudioProject | undefined = STUDIO_PROJECTS.find(
    (p) => p.id === selectedProjectId
  );

  const project: StudioProject = activeStudioProject || {
    id: currentVilla.id,
    title: currentVilla.name,
    subtitle: currentVilla.tagline,
    category: "Residential Architecture",
    status: "Completed",
    location: currentVilla.location,
    year: currentVilla.year,
    area: currentVilla.area,
    coverImage: `/images/project-${(currentVilla.index % 4) + 1}.jpg`,
    galleryImages: [
      `/images/project-${(currentVilla.index % 4) + 1}.jpg`,
      "/images/studio/project-interior-1.jpeg",
      "/images/studio/project-interior-4.jpeg",
      "/images/studio/project-interior-10.jpeg",
    ],
    concept:
      "A harmonious monolithic dialogue between structural mass, natural materials, and filtered ambient daylight. The plan organizes living pavilions around private exterior courtyards.",
    overview: currentVilla.description,
    materials: currentVilla.primaryMaterials,
    specifications: [
      { label: "Gross Area", value: currentVilla.area },
      { label: "Levels", value: currentVilla.levels },
      { label: "Bedrooms", value: currentVilla.bedrooms },
      { label: "Architectural Style", value: currentVilla.style },
      ...currentVilla.features,
    ],
    has3DModel: true,
    villaModelIndex: currentVilla.index,
  };

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDetailsModalOpen) {
        setDetailsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDetailsModalOpen, setDetailsModalOpen]);

  if (!isDetailsModalOpen) return null;

  const handleSelectRelated = (relatedId: string) => {
    const target = STUDIO_PROJECTS.find((p) => p.id === relatedId);
    if (target) {
      setSelectedProjectId(target.id);
      if (target.villaModelIndex !== undefined) {
        setModelIndex(target.villaModelIndex);
      }
    }
  };

  const handleInquireThisProject = () => {
    setDetailsModalOpen(false);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const relatedProjects = STUDIO_PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={() => setDetailsModalOpen(false)}
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white border border-black/10 rounded-2xl sm:rounded-3xl shadow-2xl text-[#111111] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Sticky Header Bar */}
        <div className="shrink-0 h-16 border-b border-black/[0.08] px-5 sm:px-8 flex items-center justify-between bg-[#faf9f6]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-wider bg-black/5 text-neutral-700 font-semibold border border-black/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              {project.category}
            </span>
            <span className="hidden sm:inline text-xs text-neutral-400">·</span>
            <span className="hidden sm:inline text-xs font-mono text-neutral-500">
              {project.location} · {project.year}
            </span>
          </div>

          <button
            id="close-dossier-modal-btn"
            type="button"
            onClick={() => setDetailsModalOpen(false)}
            aria-label="Close Project Dossier"
            className="w-8 h-8 rounded-full bg-neutral-200/80 hover:bg-neutral-300 border border-black/10 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 space-y-8">
          {/* Title & Status */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`rounded-md text-[11px] font-mono uppercase font-semibold ${
                  project.status === "Completed"
                    ? "bg-emerald-100 text-emerald-800"
                    : project.status === "In Progress"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                Status: {project.status}
              </span>
              <span className="text-xs text-neutral-400">·</span>
              <span className="text-xs font-mono text-neutral-500">{project.area}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
              {project.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-neutral-500 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Media Gallery Viewer */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-black/10">
              <img
                src={project.galleryImages[activeImageIndex] || project.coverImage}
                alt={`${project.title} photo view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono">
                {activeImageIndex + 1} / {project.galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {project.galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#111111] scale-102"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Narrative & Concept Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#faf9f6] p-5 sm:p-6 rounded-2xl border border-black/[0.07]">
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
                Architectural Concept
              </h3>
              <p className="text-sm leading-relaxed text-neutral-700">
                {project.concept}
              </p>
            </div>

            <div className="bg-[#faf9f6] p-5 sm:p-6 rounded-2xl border border-black/[0.07]">
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
                Project Overview & Spatial Program
              </h3>
              <p className="text-sm leading-relaxed text-neutral-700">
                {project.overview}
              </p>
            </div>
          </div>

          {/* Technical Specifications Bento */}
          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-3">
              Verified Project Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.specifications.map((spec, i) => (
                <div key={i} className="bg-neutral-50 p-3.5 rounded-xl border border-black/[0.06]">
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    {spec.label}
                  </span>
                  <span className="text-sm font-semibold text-[#111111]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials & Tactility */}
          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-3">
              Primary Materials & Finishes
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((mat, i) => (
                <span
                  key={i}
                  className="text-xs px-3.5 py-1.5 rounded-lg bg-white border border-black/10 text-neutral-800 font-medium shadow-2xs"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Floor Plan & Spatial Schematic Placeholder */}
          <div className="border border-dashed border-black/20 rounded-2xl p-5 bg-[#faf9f6] text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
              Architectural Drawing & Spatial Floor Plan
            </span>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              CAD & BIM floor plans, elevation profiles, and section cuts are available upon confidential commission consultation.
            </p>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-3">
                Related Studio Commissions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProjects.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => handleSelectRelated(rel.id)}
                    className="p-3 text-left rounded-xl bg-white border border-black/10 hover:border-black/30 transition-all cursor-pointer group"
                  >
                    <div className="aspect-[16/10] w-full rounded-lg overflow-hidden mb-2 bg-neutral-100">
                      <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                    </div>
                    <span className="block text-xs font-semibold text-[#111111] truncate">{rel.title}</span>
                    <span className="block text-[11px] text-neutral-500 font-mono">{rel.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="shrink-0 h-18 border-t border-black/[0.08] px-5 sm:px-8 bg-[#faf9f6] flex items-center justify-between gap-4">
          <div className="text-xs text-neutral-500 hidden sm:block">
            Inquiring about this project? Connect directly with Siddhatva Design directors.
          </div>
          <button
            type="button"
            onClick={handleInquireThisProject}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer ml-auto"
          >
            Inquire About {project.title}
          </button>
        </div>
      </div>
    </div>
  );
}
