"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

// --- Types ---
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Curated Architectural Patron Data ---
const testimonials: Testimonial[] = [
  {
    text: "Siddhatva Design completely transformed our estate vision. The monolithic volumes and light integration created a sanctuary beyond expectation.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    name: "Briana Patton",
    role: "Private Collector · Zurich",
  },
  {
    text: "The architectural fidelity and 3D walkthrough precision made commissioning our Kyoto pavilion an effortless and inspiring journey.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    name: "Bilal Ahmed",
    role: "Estate Principal · Dubai",
  },
  {
    text: "The engineering rigor coupled with monolithic restraint is unmatched. Every cantilever and material tolerance was executed flawlessly.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
    name: "Saman Malik",
    role: "Design Director · London",
  },
  {
    text: "Their spatial curation elevated our cliffside residence into a museum-grade architectural masterpiece. Truly extraordinary atelier.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    name: "Omar Raza",
    role: "Principal Collector · Aspen",
  },
  {
    text: "From geological quarry selection to acoustic isolation, Siddhatva Design embodies the pinnacle of ultra-luxury monolithic craft.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    name: "Zainab Hussain",
    role: "Architectural Trustee · Milan",
  },
  {
    text: "Experiencing the residence prior to groundbreaking through their real-time spatial models eliminated all uncertainty. Perfection.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces",
    name: "Aliza Khan",
    role: "Family Office Principal · Geneva",
  },
  {
    text: "Uncompromising discipline in raw concrete, glass, and shadow. Siddhatva Design defines the future of private estate architecture.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=faces",
    name: "Farhan Siddiqui",
    role: "Managing Partner · Singapore",
  },
  {
    text: "They delivered an architectural wonder that honors the landscape while providing complete subterranean security and privacy.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
    name: "Sana Sheikh",
    role: "Client Advisory · Beverly Hills",
  },
  {
    text: "A masterclass in modern brutalism and warm minimalism. Living in a home sculpted by this studio is a profound daily revelation.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces",
    name: "Hassan Ali",
    role: "Private Client · Tokyo",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 14,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.025,
                    y: -6,
                    boxShadow: "0 20px 40px -15px rgba(10, 10, 10, 0.12), 0 0 0 1px rgba(10, 10, 10, 0.1)",
                    transition: { type: "spring", stiffness: 350, damping: 20 },
                  }}
                  whileFocus={{
                    scale: 1.025,
                    y: -6,
                    boxShadow: "0 20px 40px -15px rgba(10, 10, 10, 0.12), 0 0 0 1px rgba(10, 10, 10, 0.1)",
                    transition: { type: "spring", stiffness: 350, damping: 20 },
                  }}
                  style={{
                    width: "320px",
                    maxWidth: "100%",
                    padding: "26px 24px 22px 24px",
                    boxSizing: "border-box",
                    backgroundColor: "#ffffff",
                    borderRadius: "22px",
                    border: "1px solid rgba(17, 17, 17, 0.08)",
                    boxShadow: "0 2px 14px rgba(10, 10, 10, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  className="transition-shadow duration-300 cursor-default select-none group focus:outline-none"
                >
                  <blockquote
                    style={{
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13.5px",
                        lineHeight: "1.65",
                        color: "#374151",
                        fontWeight: 350,
                      }}
                    >
                      &ldquo;{text}&rdquo;
                    </p>
                    <footer
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginTop: "20px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(17, 17, 17, 0.06)",
                      }}
                    >
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Portrait of ${name}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "9999px",
                          objectFit: "cover",
                          flexShrink: 0,
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: 0,
                        }}
                      >
                        <cite
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "13.5px",
                            fontWeight: 600,
                            fontStyle: "normal",
                            color: "#111111",
                            lineHeight: "1.25",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {name}
                        </cite>
                        <span
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "11.5px",
                            color: "#6b7280",
                            marginTop: "3px",
                            lineHeight: "1.2",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  // Ensure white light theme is enforced
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-[#f5f4f2] text-[#111111] py-28 relative overflow-hidden border-t border-black/[0.07]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          width: "100%",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Editorial Heading Section — Centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            maxWidth: "760px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "1.25rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 18px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontFamily: "var(--font-inter), monospace",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#525252",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(17, 17, 17, 0.08)",
                boxShadow: "0 1px 2px rgba(10, 10, 10, 0.03)",
              }}
            >
              Collector Testimonials
            </span>
          </div>

          <h2
            id="testimonials-heading"
            style={{
              fontFamily: "var(--font-serif), Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              textAlign: "center",
              color: "#111111",
              margin: "0 0 1rem 0",
              width: "100%",
            }}
          >
            Voices of Discerning Patrons
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(15px, 1.25vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.6,
              textAlign: "center",
              color: "#525252",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              margin: "0 auto",
            }}
          >
            Insights from international collectors and estates sculpted by Siddhatva Design.
          </p>
        </div>

        {/* 3D Vertical Infinite Carousel Grid */}
        <div
          className="flex justify-center gap-6 mt-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={24}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={20}
          />
        </div>
      </motion.div>
    </section>
  );
};

// --- Default Export for Standalone Demo Usage ---
export default function App() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f4f2] text-[#111111] flex flex-col justify-center relative selection:bg-[#111111] selection:text-white">
      <TestimonialsSection />
    </div>
  );
}
