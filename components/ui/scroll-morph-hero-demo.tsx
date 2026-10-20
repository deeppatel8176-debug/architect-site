"use client";

import IntroAnimation from "@/components/ui/scroll-morph-hero";

export default function ScrollMorphDemo() {
  return (
    <div className="w-full h-[800px] border border-black/10 rounded-2xl overflow-hidden relative shadow-sm">
      <IntroAnimation />
    </div>
  );
}
