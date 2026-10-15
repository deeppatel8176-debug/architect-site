"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroContent() {
  return (
    <div className="hero-content absolute inset-0 z-20">
      <div className="mx-auto flex h-full max-w-[1700px] flex-col justify-between px-8 pb-28 pt-32 md:px-12 xl:px-20">

        {/* Top Spacer */}
        <div />

        {/* Main Content */}
        <div className="max-w-[1200px]">

          <span className="mb-8 block text-[11px] uppercase tracking-[0.6em] text-white/60">
            Luxury Architecture Studio
          </span>

          <h1 className="font-extralight uppercase tracking-[-0.05em] leading-[0.82] text-white">

            <span className="block text-[72px] md:text-[110px] xl:text-[150px]">
              Luxury
            </span>

            <span className="block text-[72px] md:text-[110px] xl:text-[150px]">
              Architecture
            </span>

            <span className="block text-[72px] md:text-[110px] xl:text-[150px]">
              Studio
            </span>

          </h1>

          <p className="mt-16 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            Timeless architecture inspired by light, materials,
            proportion and emotion. We create refined spaces that
            combine contemporary design with lasting elegance.
          </p>

          <div className="mt-14">
            <MagneticButton href="#projects">
              Explore Projects
            </MagneticButton>
          </div>

        </div>

        {/* Bottom Info */}
        <div className="flex items-end justify-between">

          <div>

            <span className="block text-[10px] uppercase tracking-[0.45em] text-white/50">
              Location
            </span>

            <p className="mt-2 text-sm tracking-[0.15em] text-white">
              Ahmedabad · Gujarat · India
            </p>

          </div>

          <div className="hidden md:block max-w-sm">

            <p className="text-sm leading-7 text-white/55">
              Creating premium residential, commercial and hospitality
              environments with a focus on simplicity, craftsmanship
              and timeless aesthetics.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}