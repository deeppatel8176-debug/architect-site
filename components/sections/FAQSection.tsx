"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What core services does Siddhatva Design provide?",
    answer:
      "Siddhatva Design specializes in contemporary residential architecture, bespoke luxury villas, tailored interior design, photorealistic 3D visualization, and residential renovation. We guide projects from initial concept and municipal coordination through to construction documentation.",
  },
  {
    question: "Can I explore my project in interactive 3D before construction?",
    answer:
      "Yes. A cornerstone of our studio practice is high-fidelity 3D spatial simulation. Clients can walk through digital twins of their proposed residence on desktop or mobile, examining daylight orientation, scale, and material finishes before breaking ground.",
  },
  {
    question: "Can I engage Siddhatva Design for interior architecture separately?",
    answer:
      "Yes. While we often direct both architecture and interior design for full spatial continuity, we also accept standalone interior architecture commissions for apartments, penthouses, and private estates.",
  },
  {
    question: "What information should I have ready before our initial consultation?",
    answer:
      "Helpful starting information includes your plot location and dimensions, any existing survey drawings or photographs, an approximate desired built-up area (or room requirements), and your anticipated timeline and budget framework.",
  },
  {
    question: "Does the studio provide construction coordination or site supervision?",
    answer:
      "Yes, we provide periodic architectural site supervision and contractor coordination to verify that structural tolerances, material joinery, and architectural intent are faithfully executed on site. This scope is tailored within the client agreement.",
  },
  {
    question: "How long does a typical villa design and documentation phase take?",
    answer:
      "Design timelines vary based on project scale and complexity. Typically, concept development takes 4 to 8 weeks, followed by 3D visualization and detailed construction documentation over 6 to 12 weeks. An exact project schedule is established during initial consultation.",
  },
  {
    question: "How do we arrange an initial consultation?",
    answer:
      "You can submit your project brief through the inquiry form below or reach out via our contact page. Our studio principals review every brief and reply within two business days to arrange an in-person or virtual consultation.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{
        paddingTop: "6.5rem",
        paddingBottom: "7rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07]"
    >
      <div
        style={{
          maxWidth: "880px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)",
        }}
        className="w-full flex flex-col items-center"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Frequently Asked Questions
          </div>

          <h2
            id="faq-heading"
            className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111111]"
          >
            Clarity on our process & collaboration.
          </h2>

          <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed max-w-lg">
            Answers to common questions about commissioning architecture, 3D visualization, and collaborating with our studio.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="w-full space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/50 transition-colors"
                  style={{
                    paddingLeft: "26px",
                    paddingRight: "26px",
                    paddingTop: "22px",
                    paddingBottom: "22px",
                  }}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#111111] tracking-tight">
                    {faq.question}
                  </span>

                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-[#111111] text-white" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 border-t border-black/[0.05]"
                        style={{
                          paddingLeft: "26px",
                          paddingRight: "26px",
                          paddingTop: "16px",
                          paddingBottom: "24px",
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Have more questions footer */}
        <div className="mt-8 text-center text-xs text-neutral-500">
          Have a specific project question not listed here?{" "}
          <a href="#contact" className="text-[#111111] font-semibold underline underline-offset-2">
            Ask our architectural directors directly
          </a>
        </div>
      </div>
    </section>
  );
}
