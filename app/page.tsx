"use client";

import { motion } from "framer-motion";
import ShowcaseHeader from "@/components/ui/ShowcaseHeader";
import HeroStatement from "@/components/ui/HeroStatement";
import TasteVillaCard from "@/components/ui/TasteVillaCard";
import VillaCoverflowSection from "@/components/sections/VillaCoverflowSection";
import VillaDetailsModal from "@/components/ui/VillaDetailsModal";
import ArchitecturalStandardsSection from "@/components/sections/ArchitecturalStandardsSection";
import PanoramicSpreadHero from "@/components/ui/panoramic-spread-hero";
import { TestimonialsSection } from "@/components/ui/testimonial-v2";
import StartProjectSection from "@/components/sections/StartProjectSection";
import GlobalFooter from "@/components/ui/GlobalFooter";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#f5f4f2] text-[#111111] selection:bg-[#111111] selection:text-[#f5f4f2]">
      {/* ── Fixed Top Header Navigation ── */}
      <ShowcaseHeader />

      {/* ── 01 — HERO SECTION: TasteSkill 2-Column Grid with 3D Model in Card ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate w-full overflow-x-clip min-h-[min(100svh,960px)] flex flex-col justify-center"
      >
        {/* TasteSkill Organic Stone Texture Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)]"
        >
          <img
            alt=""
            src="/textures/cleanstone.jpg"
            className="-scale-x-100 object-cover w-full h-full opacity-40 mix-blend-multiply"
          />
        </div>

        {/* Subtle TasteSkill Grid Lines */}
        <div className="taste-grid -z-10" />

        {/* 2-Column Hero Grid: Left Copy, Right 3D Card Stack */}
        <div
          style={{
            maxWidth: "1280px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
          }}
          className="w-full grid grid-cols-1 items-center gap-10 pb-16 pt-24 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] lg:gap-12 xl:gap-16"
        >
          {/* Left Column */}
          <HeroStatement />

          {/* Right Column: 3D Model Card */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full min-w-0 lg:pt-3"
          >
            <TasteVillaCard />
          </motion.div>
        </div>
      </section>

      {/* ── 02 — ESTATES MONOGRAPH 3D COVERFLOW CAROUSEL ── */}
      <VillaCoverflowSection />

      {/* ── 03 — ARCHITECTURAL STANDARDS (What We Do Bento Grid) ── */}
      <ArchitecturalStandardsSection />

      {/* ── 04 — PANORAMIC SPREAD HERO: 3D Curated Space Exhibition ── */}
      <PanoramicSpreadHero />

      {/* ── 05 — PATRON TESTIMONIALS (3D Infinite Smooth Marquee) ── */}
      <TestimonialsSection />

      {/* ── 06 — START A PROJECT: Inquiry Form ── */}
      <StartProjectSection />

      {/* ── 04 — GLOBAL FOOTER ── */}
      <div className="relative z-30">
        <GlobalFooter />
      </div>

      {/* ── GLOBAL ARCHITECTURAL DOSSIER MODAL ── */}
      <VillaDetailsModal />
    </div>
  );
}