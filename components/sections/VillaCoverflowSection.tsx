"use client";

import React from "react";
import CoverflowCarousel, {
  type CoverflowCarouselItem,
} from "@/components/ui/coverflow-carousel";
import { useStore } from "@/store/useStore";
import { VILLAS } from "@/data/villas";

const villaCarouselItems: CoverflowCarouselItem[] = [
  {
    id: "estate-01",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Estate 01: The Monolith Sanctuary - Kyoto Foothills",
    content: (
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-mono text-neutral-400">Estate 01</span>
        <span className="font-semibold text-neutral-900">The Monolith Sanctuary</span>
      </div>
    ),
  },
  {
    id: "estate-02",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "Estate 02: The Alpine Crest - St. Moritz",
    content: (
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-mono text-neutral-400">Estate 02</span>
        <span className="font-semibold text-neutral-900">The Alpine Crest</span>
      </div>
    ),
  },
  {
    id: "estate-03",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    alt: "Estate 03: The Geometric Haven - Aspen",
    content: (
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-mono text-neutral-400">Estate 03</span>
        <span className="font-semibold text-neutral-900">The Geometric Haven</span>
      </div>
    ),
  },
  {
    id: "estate-04",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    alt: "Estate 04: The Elysian Palace - Mediterranean",
    content: (
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-mono text-neutral-400">Estate 04</span>
        <span className="font-semibold text-neutral-900">The Elysian Palace</span>
      </div>
    ),
  },
];

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

export default function VillaCoverflowSection() {
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const setModelIndex = useStore((s) => s.setModelIndex);
  const currentVilla = useStore((s) => s.currentVilla);

  const handleIndexChange = (index: number) => {
    if (index >= 0 && index < VILLAS.length) {
      setModelIndex(index);
    }
  };

  return (
    <section
      id="villas"
      aria-labelledby="estates-coverflow-heading"
      style={{
        paddingTop: "5.5rem",
        paddingBottom: "6.5rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07]"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
        className="w-full flex flex-col items-center text-center"
      >
        {/* Pill Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-xs backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          Monograph Gallery
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          id="estates-coverflow-heading"
          className="mt-5 text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111111]"
        >
          Curated Estates Monograph
        </motion.h2>
        <motion.p
          custom={2}
          variants={fadeUp}
          className="mt-3 max-w-[500px] text-[15px] text-neutral-600 leading-relaxed"
        >
          Swipe or navigate through our 2026 monolithic portfolio. Selecting an estate synchronizes the interactive 3D digital twin above.
        </motion.p>

        {/* 3D Coverflow Carousel */}
        <motion.div
          custom={3}
          variants={fadeUp}
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

        {/* Current Villa Caption */}
        <motion.div
          custom={4}
          variants={fadeUp}
          className="mt-6 flex flex-col items-center gap-1"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Current Selection
          </span>
          <span className="text-base font-semibold text-[#111111]">
            Estate {currentVilla.number}: {currentVilla.name}
          </span>
          <span className="text-xs text-neutral-500">
            {currentVilla.location} · {currentVilla.style} · {currentVilla.area}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
