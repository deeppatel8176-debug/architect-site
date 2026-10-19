"use client";

import CoverflowCarousel from "@/components/ui/coverflow-carousel";

const items = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "The Monolith Sanctuary - Kyoto Brutalism",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "The Alpine Crest - St. Moritz Minimalist",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    alt: "The Geometric Haven - Aspen Pavilions",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    alt: "The Elysian Palace - Parametric Monument",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    alt: "Modernist Cantilever Villa",
  },
];

export default function CoverflowCarouselDemo() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <CoverflowCarousel items={items} loop />
    </div>
  );
}
