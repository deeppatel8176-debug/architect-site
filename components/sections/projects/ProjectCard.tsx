"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import type { Project } from "@/data/projects";
import { projectsAnimation } from "./ProjectAnimation";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({
  project,
  index,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    return () => {};
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Image */}
        <div className="project-image absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="project-content relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-24">

            <span className="text-xs uppercase tracking-[0.45em] text-white/60">
              {project.category}
            </span>

            <h2 className="mt-6 text-5xl font-extralight leading-none text-white md:text-7xl lg:text-8xl xl:text-9xl">
              {project.title}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              {project.location}
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}