"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = progressRef.current;
    if (!element) return;

    gsap.set(element, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      gsap.set(element, {
        scaleX: progress,
      });
    };

    update();

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9998] h-[2px] w-full bg-white/10">
      <div
        ref={progressRef}
        className="h-full w-full bg-white"
      />
    </div>
  );
}