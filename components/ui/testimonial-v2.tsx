"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  projectName: string;
  projectCategory: string;
  location: string;
  initials: string;
}

// Exactly 3 distinct, authentic editorial reviews with clear demonstration labeling
const DEMO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote:
      "Siddhatva Design completely transformed our private residence vision. Experiencing our home as an interactive 3D digital twin prior to groundbreaking gave our family total confidence in every spatial volume and daylight angle.",
    clientName: "Private Villa Patron",
    clientRole: "Commission Client",
    projectName: "The Monolith Sanctuary",
    projectCategory: "Residential Architecture",
    location: "Ahmedabad, Gujarat",
    initials: "PV",
  },
  {
    id: "test-2",
    quote:
      "Their mastery of minimal joinery, indirect cove lighting, and tactile materials elevated our living space into a calm, museum-grade sanctuary. The precision of execution exceeded every expectation.",
    clientName: "Apartment Principal",
    clientRole: "Interior Architecture Patron",
    projectName: "Atelier Minimalist Living",
    projectCategory: "Interior Design",
    location: "Vadodara, Gujarat",
    initials: "AP",
  },
  {
    id: "test-3",
    quote:
      "A rare architectural practice that balances courageous structural cantilevers with deep thermal comfort. Every room connects intentionally to natural light and the private landscaped courtyards.",
    clientName: "Estate Commission Patron",
    clientRole: "Residential Client",
    projectName: "Sky Pavilion Residence",
    projectCategory: "Residential Architecture",
    location: "Surat, Gujarat",
    initials: "EC",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % DEMO_TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + DEMO_TESTIMONIALS.length) % DEMO_TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const active = DEMO_TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      style={{
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07] overflow-hidden"
    >
      <div
        style={{
          maxWidth: "1080px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
        className="w-full flex flex-col items-center"
      >
        {/* Eyebrow with authenticity disclaimer */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Patron Impressions
          </div>

          <h2
            id="testimonials-heading"
            className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111111]"
          >
            Reflections on living in our spaces.
          </h2>

          <p className="mt-2 text-xs font-mono text-neutral-400">
            [Demonstration reviews based on representative studio client experiences]
          </p>
        </div>

        {/* Testimonial Stage Card */}
        <div
          className="relative w-full min-h-[340px] sm:min-h-[300px] flex flex-col justify-between rounded-3xl bg-white border border-black/[0.08] shadow-sm"
          style={{
            paddingLeft: "clamp(24px, 5vw, 48px)",
            paddingRight: "clamp(24px, 5vw, 48px)",
            paddingTop: "clamp(28px, 5vw, 44px)",
            paddingBottom: "clamp(28px, 5vw, 44px)",
          }}
        >
          {/* Subtle Decorative Quote Icon */}
          <div className="absolute top-8 left-8 text-black/[0.05] font-serif text-7xl select-none pointer-events-none">
            “
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 flex flex-col justify-between h-full"
            >
              {/* Large Quotation */}
              <blockquote className="text-xl sm:text-2xl md:text-[26px] font-normal leading-[1.35] tracking-[-0.02em] text-[#111111] max-w-3xl mb-8">
                “{active.quote}”
              </blockquote>

              {/* Patron & Commission Attribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-black/[0.06]">
                <div className="flex items-center gap-3.5">
                  {/* Initials Avatar */}
                  <div className="w-11 h-11 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                    {active.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">
                      {active.clientName}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {active.clientRole} · {active.location}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Commission
                  </span>
                  <span className="text-xs font-semibold text-[#111111]">
                    {active.projectName}
                  </span>
                  <span className="text-[11px] text-neutral-500 block">
                    {active.projectCategory}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-black/[0.05] flex items-center justify-between">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {DEMO_TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-8 bg-[#111111]" : "w-2 bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-full border border-black/10 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-[#111111] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-full bg-[#111111] hover:bg-neutral-800 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
