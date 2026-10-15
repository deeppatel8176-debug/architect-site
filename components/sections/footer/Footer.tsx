"use client";

import { useEffect, useRef } from "react";
import { footerAnimation } from "./FooterAnimation";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = footerAnimation(sectionRef.current);

    return () => cleanup?.();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative bg-[#070707] border-t border-white/10"
    >
      <div className="mx-auto max-w-[1700px] px-8 py-32 md:px-12 xl:px-20">

        <span className="block text-[11px] uppercase tracking-[0.6em] text-white/50">
          Contact
        </span>

        <h2 className="footer-title mt-10 text-[56px] md:text-[90px] xl:text-[130px] leading-[0.9] tracking-[-0.05em] font-extralight text-white">
          Let's Create
          <br />
          Something
          <br />
          Timeless.
        </h2>

        <div className="mt-24 grid grid-cols-1 gap-20 md:grid-cols-3">

          <div>
            <p className="text-white/50 uppercase tracking-[0.35em] text-xs">
              Email
            </p>

            <a
              href="mailto:hello@luxury.com"
              className="mt-4 block text-xl text-white hover:text-white/60 transition"
            >
              hello@luxury.com
            </a>
          </div>

          <div>
            <p className="text-white/50 uppercase tracking-[0.35em] text-xs">
              Phone
            </p>

            <a
              href="tel:+919999999999"
              className="mt-4 block text-xl text-white hover:text-white/60 transition"
            >
              +91 99999 99999
            </a>
          </div>

          <div>
            <p className="text-white/50 uppercase tracking-[0.35em] text-xs">
              Address
            </p>

            <p className="mt-4 text-xl text-white">
              Ahmedabad,
              <br />
              Gujarat, India
            </p>
          </div>

        </div>

        <div className="mt-28 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8">

          <p className="text-sm text-white/40">
            © 2026 Luxury Architecture Studio
          </p>

          <div className="flex gap-10 mt-6 md:mt-0">

            <a
              href="#"
              className="text-sm uppercase tracking-[0.3em] text-white/50 hover:text-white"
            >
              Instagram
            </a>

            <a
              href="#"
              className="text-sm uppercase tracking-[0.3em] text-white/50 hover:text-white"
            >
              Behance
            </a>

            <a
              href="#"
              className="text-sm uppercase tracking-[0.3em] text-white/50 hover:text-white"
            >
              LinkedIn
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}