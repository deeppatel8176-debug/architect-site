"use client";

import { useEffect, useRef } from "react";
import GalleryGrid from "./GalleryGrid";
import { galleryAnimation } from "./GalleryAnimation";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = galleryAnimation(sectionRef.current);

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-black py-40"
    >
      <div className="mx-auto max-w-[1700px] px-8 md:px-12 xl:px-20">

        <span className="block text-[11px] uppercase tracking-[0.6em] text-white/50">
          Gallery
        </span>

        <h2 className="mt-8 text-[60px] md:text-[90px] xl:text-[120px] font-extralight leading-[0.9] tracking-[-0.04em] text-white">
          Selected
          <br />
          Works
        </h2>

        <GalleryGrid />

      </div>
    </section>
  );
}