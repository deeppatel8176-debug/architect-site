"use client";

import { motion } from "framer-motion";
import ShowcaseHeader from "@/components/ui/ShowcaseHeader";
import HeroStatement from "@/components/ui/HeroStatement";
import TasteVillaCard from "@/components/ui/TasteVillaCard";
import VillaCoverflowSection from "@/components/sections/VillaCoverflowSection";
import AboutStudioSection from "@/components/sections/AboutStudioSection";
import ArchitecturalStandardsSection from "@/components/sections/ArchitecturalStandardsSection";
import DesignProcessSection from "@/components/sections/DesignProcessSection";
import PanoramicSpreadHero from "@/components/ui/panoramic-spread-hero";
import InteriorGallerySection from "@/components/sections/InteriorGallerySection";
import { TestimonialsSection } from "@/components/ui/testimonial-v2";
import FAQSection from "@/components/sections/FAQSection";
import StartProjectSection from "@/components/sections/StartProjectSection";
import GlobalFooter from "@/components/ui/GlobalFooter";
import VillaDetailsModal from "@/components/ui/VillaDetailsModal";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#f5f4f2] text-[#111111] selection:bg-[#111111] selection:text-[#f5f4f2]">
      {/* ── Fixed Top Header Navigation ── */}
      <ShowcaseHeader />

      {/* ── 01 — HERO SECTION: 2-Column Grid with Interactive 3D Digital Twin ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate w-full overflow-x-clip min-h-[min(100svh,960px)] flex flex-col justify-center"
      >
        {/* Organic Stone Texture Background */}
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

        {/* Subtle Architectural Grid */}
        <div className="taste-grid -z-10" />

        {/* 2-Column Hero Grid: Left Copy, Right 3D Card Stack */}
        <div
          style={{
            maxWidth: "1360px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
            paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          }}
          className="w-full grid grid-cols-1 items-center gap-12 pb-20 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-20"
        >
          {/* Left Column: Architectural Creed & Value Proposition */}
          <HeroStatement />

          {/* Right Column: Interactive 3D Model Card */}
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

      {/* ── 02 — CURATED ESTATES & ARCHITECTURAL PORTFOLIO ── */}
      <VillaCoverflowSection />

      {/* ── 03 — ABOUT SIDDHATVA DESIGN & MANIFESTO ── */}
      <AboutStudioSection />

      {/* ── 04 — ARCHITECTURE & INTERIOR SERVICES ── */}
      <ArchitecturalStandardsSection />

      {/* ── 05 — ARCHITECTURAL DESIGN METHODOLOGY & PROCESS ── */}
      <DesignProcessSection />

      {/* ── 06 — PANORAMIC SPREAD: 3D Curated Space Exhibition ── */}
      <PanoramicSpreadHero />

      {/* ── 07 — VISUAL ARCHIVE & INTERIOR GALLERY (With Lightbox) ── */}
      <InteriorGallerySection />

      {/* ── 08 — PATRON IMPRESSIONS & TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── 09 — FREQUENTLY ASKED QUESTIONS ACCORDION ── */}
      <FAQSection />

      {/* ── 10 — START A PROJECT: Detailed Lead Generation Form ── */}
      <StartProjectSection />

      {/* ── 11 — GLOBAL REFINED FOOTER ── */}
      <div className="relative z-30">
        <GlobalFooter />
      </div>

      {/* ── GLOBAL ARCHITECTURAL DOSSIER MODAL ── */}
      <VillaDetailsModal />
    </div>
  );
}