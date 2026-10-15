"use client";

import { useEffect, useRef } from "react";

import ManifestoContent from "./ManifestoContent";
import ManifestoImage from "./ManifestoImage";
import { manifestoAnimation } from "./ManifestoAnimation";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = manifestoAnimation(sectionRef.current);

    return () => cleanup?.();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative bg-[#0b0b0b]"
    >
      <div className="mx-auto max-w-[1700px] px-8 py-32 md:px-12 xl:px-20">

        <ManifestoContent />

        <ManifestoImage />

      </div>
    </section>
  );
}