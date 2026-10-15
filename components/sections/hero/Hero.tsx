"use client";

import { useEffect, useRef } from "react";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";
import { heroAnimation } from "./HeroAnimation";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = heroAnimation(sectionRef.current);

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[200vh] overflow-hidden bg-black"
    >
      {/* Sticky Hero */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <HeroBackground />

        {/* Content */}
        <HeroContent />

        {/* Bottom Scroll Indicator */}
        <ScrollIndicator />

      </div>
    </section>
  );
}