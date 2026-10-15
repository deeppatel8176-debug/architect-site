"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { showcaseAnimation } from "./ShowcaseAnimation";

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = showcaseAnimation(sectionRef.current);

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Image */}
        <div className="showcase-image absolute inset-0">
          <Image
            src="/images/projects/project-1.jpg"
            alt="Luxury Architecture"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Text */}
        <div className="showcase-content relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <span className="block text-xs uppercase tracking-[0.45em] text-white/70">
              Signature Collection
            </span>

            <h2 className="mt-8 text-5xl font-extralight leading-[0.9] text-white md:text-7xl lg:text-8xl xl:text-9xl">
              Every Surface
              <br />
              Has Emotion
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
}