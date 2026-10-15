"use client";

import Image from "next/image";

export default function HeroBackground() {
  return (
    <>
      {/* Background Image */}
      <div className="hero-image absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Luxury Architecture"
          fill
          priority
          quality={100}
          className="object-cover scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/60" />

      {/* Side Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20" />
    </>
  );
}