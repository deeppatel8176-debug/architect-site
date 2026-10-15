"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import ProjectCounter from "./ProjectCounter";
import { projects } from "@/data/projects";
import ProjectSlide from "./ProjectSlide";
import { projectsAnimation } from "./ProjectAnimation";
import ProjectNavigation from "./ProjectNavigation";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
const trackRef = useRef<HTMLDivElement>(null);

const [current, setCurrent] = useState(1);
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cleanup = projectsAnimation(
    sectionRef.current,
    trackRef.current,
    setCurrent
);

    return () => cleanup?.();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-[500vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Heading */}
        <div className="absolute left-12 top-10 z-30">

          <span className="block text-[11px] uppercase tracking-[0.55em] text-white/50">
            Selected Works
          </span>

          <h2 className="mt-5 text-[70px] md:text-[110px] xl:text-[140px] font-extralight leading-[0.9] tracking-[-0.05em] text-white">
            Projects
          </h2>

        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
        >
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Counter */}
        <ProjectCounter
    current={current}
    total={projects.length}
/>
<ProjectNavigation
  current={current}
  total={projects.length}
/>

      </div>
    </section>
  );
}