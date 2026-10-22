"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroAnimation, { MAX_SCROLL } from "@/components/ui/scroll-morph-hero";
import { useSiteContent } from "@/lib/useSiteContent";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: "Living Spaces" | "Bedrooms" | "Kitchens & Dining" | "Bathrooms" | "Exterior Architecture" | "3D Visualizations";
  aspect?: string;
  description: string;
}

const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: "gal-1",
    src: "/images/studio/project-interior-1.jpeg",
    title: "Minimalist Lounge with Fluted Oak & Indirect Coves",
    category: "Living Spaces",
    description: "Concealed 2700K LED coves wash warm light across vertical white oak paneling.",
  },
  {
    id: "gal-2",
    src: "/images/project-1.jpg",
    title: "Cast Concrete Facade & Shaded Entrance Loggia",
    category: "Exterior Architecture",
    description: "Deep overhangs and board-formed architectural concrete shielding against intense solar exposure.",
  },
  {
    id: "gal-3",
    src: "/images/studio/project-interior-2.jpeg",
    title: "Master Bedroom Suite with Textured Wall Architecture",
    category: "Bedrooms",
    description: "Bespoke upholstered floating headboard paired with integrated nightstands and directional reading lights.",
  },
  {
    id: "gal-4",
    src: "/images/studio/project-interior-4.jpeg",
    title: "Private Dining Pavilion & Sculptural Lighting",
    category: "Kitchens & Dining",
    description: "Natural Italian marble dining table anchored beneath custom linear brass architectural fixtures.",
  },
  {
    id: "gal-5",
    src: "/images/project-4.jpg",
    title: "Parametric Fluid Villa — Real-Time 3D Digital Twin",
    category: "3D Visualizations",
    description: "Sub-millimeter BIM model rendering with accurate diurnal light refraction and glass dispersion.",
  },
  {
    id: "gal-6",
    src: "/images/studio/project-interior-5.jpeg",
    title: "Sleek Modular Kitchen with Bronze Metal Accents",
    category: "Kitchens & Dining",
    description: "Flush integrated handleless cabinetry with brushed bronze metal detailing and hidden task lighting.",
  },
  {
    id: "gal-7",
    src: "/images/project-2.jpg",
    title: "Cantilevered Upper Terrace & Horizon Framing",
    category: "Exterior Architecture",
    description: "Post-tensioned cantilever creates deep outdoor living decks protected from weather.",
  },
  {
    id: "gal-8",
    src: "/images/studio/project-interior-7.jpeg",
    title: "Monolithic Stone & Terrazzo Ensuite Sanctuary",
    category: "Bathrooms",
    description: "Seamless wet-room detailing with recessed drain channels and matte black architectural tapware.",
  },
  {
    id: "gal-9",
    src: "/images/studio/project-interior-10.jpeg",
    title: "Double-Height Open Living & Landscaped Courtyard View",
    category: "Living Spaces",
    description: "Floor-to-ceiling ultra-clear glass dissolving the boundary between interior lounge and exterior garden.",
  },
  {
    id: "gal-10",
    src: "/images/studio/project-interior-8.jpeg",
    title: "Private Guest Suite with Architectural Recesses",
    category: "Bedrooms",
    description: "Minimalist geometry softened by textured linen wall coverings and natural oak flooring.",
  },
];

// Pool of 20 high-res gallery images for the dense 3D scroll morph
const GALLERY_MORPH_IMAGES = [
  "/images/studio/project-interior-1.jpeg",
  "/images/project-1.jpg",
  "/images/studio/project-interior-2.jpeg",
  "/images/studio/project-interior-4.jpeg",
  "/images/project-4.jpg",
  "/images/studio/project-interior-5.jpeg",
  "/images/project-2.jpg",
  "/images/studio/project-interior-7.jpeg",
  "/images/studio/project-interior-10.jpeg",
  "/images/studio/project-interior-8.jpeg",
  "/images/studio/project-interior-3.jpeg",
  "/images/studio/project-interior-6.jpeg",
  "/images/studio/project-interior-9.jpeg",
  "/images/project-3.jpg",
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/manifesto.jpg",
  "/images/hero.png",
];

export default function InteriorGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [initialWheelScroll, setInitialWheelScroll] = useState<number>(0);

  const categories = [
    "All",
    "Living Spaces",
    "Bedrooms",
    "Kitchens & Dining",
    "Bathrooms",
    "Exterior Architecture",
    "3D Visualizations",
  ];

  const { content } = useSiteContent();
  const allGalleryItems = (content?.galleryItems && content.galleryItems.length > 0)
    ? (content.galleryItems as GalleryImage[])
    : GALLERY_ITEMS;

  const filteredItems = selectedCategory === "All"
    ? allGalleryItems
    : allGalleryItems.filter((item) => item.category === selectedCategory);

  // 20 high-res images for the dense 3D scroll-morph arc
  const galleryMorphItemsData = GALLERY_MORPH_IMAGES.map((src, i) => {
    const item = allGalleryItems[i % allGalleryItems.length];
    return {
      src,
      title: item ? item.title : `Spatial Study ${i + 1}`,
      category: item ? item.category : "Architecture",
    };
  });

  const getLenis = () => {
    return (window as unknown as { lenis?: { stop: () => void; start: () => void; scrollTo: (target: unknown, opts?: unknown) => void } }).lenis;
  };

  const handleMorphComplete = () => {
    const lenis = getLenis();
    setIsMerged(true);

    const alignSectionTop = () => {
      if (sectionRef.current) {
        if (lenis) {
          lenis.scrollTo(sectionRef.current, { offset: -64, immediate: true });
        } else {
          const navOffset = 64;
          const targetY = sectionRef.current.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "instant" });
        }
      }
    };

    alignSectionTop();
    requestAnimationFrame(alignSectionTop);
    setTimeout(() => {
      alignSectionTop();
      lenis?.start();
    }, 400);
  };

  const handleCardClick = (index: number) => {
    const item = GALLERY_ITEMS[index % GALLERY_ITEMS.length];
    if (item) setLightboxImage(item);
  };

  // ── REVERSE SCROLL HANDLER: When at top of gallery grid, scrolling UP returns to the 3D wheel effect ──
  useEffect(() => {
    if (!isMerged) return;

    let isThrottled = false;
    const handleReverseWheel = (e: WheelEvent) => {
      if (isThrottled) return;
      // User is scrolling UP
      if (e.deltaY < -15) {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // If the top of the gallery section is at the top of the viewport (near navbar 64px)
        if (rect.top >= 40 && rect.top <= 100) {
          isThrottled = true;
          const lenis = getLenis();
          lenis?.stop();
          if (lenis) {
            lenis.scrollTo(section, { offset: -64, immediate: true });
          }
          setInitialWheelScroll(MAX_SCROLL - 150); // Resume near 92% of rotation
          setIsMerged(false);
          setTimeout(() => {
            isThrottled = false;
          }, 700);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      // Negative deltaY means swiping downwards (scrolling UP towards previous section)
      if (deltaY < -25) {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top >= 40 && rect.top <= 100) {
          const lenis = getLenis();
          lenis?.stop();
          if (lenis) {
            lenis.scrollTo(section, { offset: -64, immediate: true });
          }
          setInitialWheelScroll(MAX_SCROLL - 150);
          setIsMerged(false);
        }
      }
    };

    window.addEventListener("wheel", handleReverseWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleReverseWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMerged]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="interior-gallery-heading"
      style={{
        paddingTop: isMerged ? "4.5rem" : "1.5rem",
        paddingBottom: isMerged ? "7rem" : "1.5rem",
      }}
      className="relative w-full bg-[#f5f4f2] text-[#111111] border-t border-black/[0.07] scroll-mt-16"
    >
      <div
        style={{
          maxWidth: "1320px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
        className="w-full"
      >
        {/* ── UNIFIED GALLERY STAGE: 3D Morph Arc First, Then Masonry Gallery Grid ── */}
        <AnimatePresence mode="wait">
          {!isMerged ? (
            /* ── FIRST: 3D SCROLL-MORPH ARC STAGE (Screen is 100% stuck until complete) ── */
            <motion.div
              key="morph-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="relative w-full rounded-3xl overflow-hidden shadow-2xs"
            >
              <IntroAnimation
                items={galleryMorphItemsData}
                containerElementRef={sectionRef}
                initialScroll={initialWheelScroll}
                title="Spatial details & tactile craft."
                subtitle="SCROLL DOWN WHEEL TO ROTATE & ENTER GALLERY"
                arcTitle="Curated Architectural Twin"
                arcSubtitle="Rotate through our spatial studies — scroll completes directly into the complete photographic archive."
                onComplete={handleMorphComplete}
                onSelectImage={handleCardClick}
              />
            </motion.div>
          ) : (
            /* ── AFTER: SETTLED MASONRY GALLERY GRID ("images as it is") ── */
            <motion.div
              key="grid-stage"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
            >
              {/* Section Header for Gallery Grid */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    Curated Visual Archive
                  </div>

                  {/* Button to quickly replay 3D Wheel if desired */}
                  <button
                    type="button"
                    onClick={() => {
                      setInitialWheelScroll(0);
                      setIsMerged(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3 text-[11px] font-mono uppercase tracking-wider text-neutral-500 hover:text-black hover:border-black/30 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>↺ Replay 3D Wheel</span>
                  </button>
                </div>

                <h2
                  id="interior-gallery-heading"
                  className="text-[32px] sm:text-[44px] lg:text-[50px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#111111]"
                >
                  Spatial details & tactile craft.
                </h2>

                <p className="mt-3 max-w-[560px] text-[15px] text-neutral-600 leading-relaxed">
                  All works in their natural architectural aspect ratios. Click any image to examine finishes and details.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-4 border-b border-black/[0.08]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full text-xs font-medium transition-all cursor-pointer px-4 py-2 ${
                      selectedCategory === cat
                        ? "bg-[#111111] text-white shadow-xs"
                        : "bg-white text-neutral-600 border border-black/[0.08] hover:border-black/25 hover:text-black hover:bg-neutral-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Responsive Masonry Gallery — cards tightly wrap images at natural size */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {filteredItems.map((item, idx) => (
                  <div key={item.id} className="break-inside-avoid mb-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      onClick={() => setLightboxImage(item)}
                      className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-black/10 cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300 w-full h-fit"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-sm font-semibold leading-snug">
                          {item.title}
                        </h3>
                        <span className="text-[11px] text-neutral-300 mt-2 font-mono flex items-center gap-1">
                          <span>Click to expand</span>
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                          </svg>
                        </span>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImage.title}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[350] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#111111] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Image Stage */}
              <div className="relative flex-1 max-h-[72vh] flex items-center justify-center bg-black/60 p-2 sm:p-4">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              {/* Details Footer */}
              <div className="p-6 bg-[#161616] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                    {lightboxImage.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    {lightboxImage.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                    {lightboxImage.description}
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={() => setLightboxImage(null)}
                  className="shrink-0 px-5 py-2.5 rounded-full bg-white text-[#111111] font-medium text-xs hover:bg-neutral-200 transition-colors"
                >
                  Discuss Similar Space
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
