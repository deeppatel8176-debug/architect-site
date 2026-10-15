"use client";

import ShowcaseHeader from "./ShowcaseHeader";
import VillaSlider from "./VillaSlider";
import VillaDetailsModal from "./VillaDetailsModal";

export default function Overlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Top Header Navigation */}
      <ShowcaseHeader />

      {/* Bottom 8-Model Carousel & Slider */}
      <VillaSlider />

      {/* Architectural Specifications Modal */}
      <VillaDetailsModal />
    </div>
  );
}
