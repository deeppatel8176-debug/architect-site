"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { projectParallax } from "./ProjectParallax";
import type { Project } from "@/data/projects";

interface ProjectSlideProps {
  project: Project;
  index: number;
}

export default function ProjectSlide({
  project,
  index,
}: ProjectSlideProps) {

  // ✅ Hooks MUST be inside the component
  const slideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!slideRef.current) return;

    const cleanup = projectParallax(slideRef.current);

    return () => cleanup?.();
  }, []);

  return (
    <article
      ref={slideRef}
      className="project-slide relative h-screen w-screen flex-shrink-0 overflow-hidden"
    >
      {/* your JSX */}
    </article>
  );
}