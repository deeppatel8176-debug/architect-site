"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface GalleryItemData {
  src: string;
  title?: string;
  category?: string;
}

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  title?: string;
  category?: string;
  onCardClick?: (index: number) => void;
}

// --- FlipCard Component (Original Dimensions: 76x104) ---
const IMG_WIDTH = 76;
const IMG_HEIGHT = 104;

function FlipCard({
  src,
  index,
  total,
  phase,
  target,
  title,
  category,
  onCardClick,
}: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 45,
        damping: 16,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
      onClick={() => onCardClick?.(index)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180, scale: 1.1 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-lg bg-neutral-200 border border-black/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={title || `gallery-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-2xl bg-[#111111] flex flex-col items-center justify-between p-2.5 border border-white/20 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-[7px] font-mono font-bold text-neutral-400 uppercase tracking-wider block truncate max-w-full">
            {category || `0${index + 1}`}
          </span>
          <p className="text-[9px] font-medium text-white line-clamp-2 leading-tight">
            {title || "View Details"}
          </p>
          <span className="text-[7px] font-mono text-emerald-400 flex items-center gap-0.5">
            Click to open ↗
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Default 20 High-Res Architecture Images ---
export const DEFAULT_GALLERY_IMAGES = [
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

export const MAX_SCROLL = 2000; // Virtual scroll distance for full, comfortable rotation

export interface IntroAnimationProps {
  images?: string[];
  items?: GalleryItemData[];
  initialScroll?: number;
  containerElementRef?: React.RefObject<HTMLElement | null>;
  title?: string;
  subtitle?: string;
  arcTitle?: string;
  arcSubtitle?: string;
  onScrollProgress?: (progress: number) => void;
  onComplete?: () => void;
  onSelectImage?: (index: number) => void;
  className?: string;
}

export default function IntroAnimation({
  images,
  items,
  initialScroll = 0,
  containerElementRef,
  title = "Spatial details & tactile craft.",
  subtitle = "SCROLL DOWN WHEEL TO ROTATE & ENTER GALLERY",
  arcTitle = "Curated Architectural Twin",
  arcSubtitle = "Rotate through our spatial studies — scroll completes directly into the complete photographic archive.",
  onScrollProgress,
  onComplete,
  onSelectImage,
  className = "",
}: IntroAnimationProps) {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("circle");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize image items (20 items for dense, full arc)
  const activeItems = useMemo<GalleryItemData[]>(() => {
    if (items && items.length > 0) return items;
    const imgList = images && images.length > 0 ? images : DEFAULT_GALLERY_IMAGES;
    return imgList.map((src, idx) => ({
      src,
      title: `Architectural Study ${idx + 1}`,
      category: "Commission",
    }));
  }, [items, images]);

  const totalCount = activeItems.length;

  // --- Container Size ---
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // --- Virtual Scroll Logic ---
  const virtualScroll = useMotionValue(initialScroll || 0);
  const scrollRef = useRef(initialScroll || 0);
  const hasCompletedRef = useRef(false);

  // Synchronize initialScroll changes (e.g. on reverse-scroll entry)
  useEffect(() => {
    if (initialScroll !== undefined) {
      scrollRef.current = initialScroll;
      virtualScroll.set(initialScroll);
      hasCompletedRef.current = false;
    }
  }, [initialScroll, virtualScroll]);

  // ── 100% STUCK / PINNED SCREEN WHEEL CONTROLLER ──
  // The screen stays solidly pinned under the navbar until the entire scroll effect finishes!
  useEffect(() => {
    const navOffset = 64;

    const getLenis = () => {
      return (window as unknown as { lenis?: { stop: () => void; start: () => void; scrollTo: (target: unknown, opts?: unknown) => void } }).lenis;
    };

    const handleWheel = (e: WheelEvent) => {
      const section = containerElementRef?.current || containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top <= navOffset + 80 && rect.bottom >= 200;
      if (!inView) {
        // If out of view, make sure Lenis is running
        getLenis()?.start();
        return;
      }

      const delta = e.deltaY;
      const current = scrollRef.current;

      // If at beginning (0) and user scrolls UP, unlock Lenis so user can naturally scroll up to previous section
      if (current <= 0 && delta < 0) {
        getLenis()?.start();
        return;
      }

      // ── SCREEN STAYS 100% STUCK: Stop Lenis & Lock Window Scroll ──
      const lenis = getLenis();
      lenis?.stop(); // Halts Lenis smooth scroll engine immediately!

      e.preventDefault();
      e.stopPropagation();

      // Pin viewport exactly below navbar
      const targetY = Math.max(0, Math.round(rect.top + window.scrollY - navOffset));
      if (Math.abs(rect.top - navOffset) > 2) {
        if (lenis) {
          lenis.scrollTo(section, { offset: -navOffset, immediate: true });
        } else {
          window.scrollTo({ top: targetY, behavior: "instant" });
        }
      }

      const scaledDelta = delta * 0.85;
      const targetScroll = Math.max(0, current + scaledDelta);

      if (targetScroll >= MAX_SCROLL) {
        scrollRef.current = MAX_SCROLL;
        virtualScroll.set(MAX_SCROLL);
        onScrollProgress?.(1);

        // Complete ONLY when entire rotation is 100% finished
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          lenis?.start(); // Resume Lenis for gallery grid
          onComplete?.();
        }
      } else {
        hasCompletedRef.current = false;
        scrollRef.current = targetScroll;
        virtualScroll.set(targetScroll);
        onScrollProgress?.(targetScroll / MAX_SCROLL);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const section = containerElementRef?.current || containerRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= navOffset + 80 && rect.bottom >= 200;
      if (!inView) {
        getLenis()?.start();
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      if (scrollRef.current <= 0 && deltaY < 0) {
        getLenis()?.start();
        return;
      }

      const lenis = getLenis();
      lenis?.stop();
      e.preventDefault();

      const newScroll = Math.max(0, Math.min(scrollRef.current + deltaY * 1.3, MAX_SCROLL));
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
      onScrollProgress?.(newScroll / MAX_SCROLL);

      if (newScroll >= MAX_SCROLL && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        lenis?.start();
        onComplete?.();
      }
    };

    // Attach in capture phase to intercept before Lenis or standard listeners
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });

    return () => {
      getLenis()?.start();
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, [virtualScroll, onScrollProgress, onComplete, containerElementRef]);

  // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
  // Happens between virtualScroll 0 and 400
  const morphProgress = useTransform(virtualScroll, [0, 400], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 22 });

  // 2. Scroll Rotation (Shuffling): Starts after morph (> 400 to MAX_SCROLL)
  // Rotates through cards so all 20 cards are viewed
  const scrollRotate = useTransform(virtualScroll, [400, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 45, damping: 22 });

  // --- Mouse Parallax ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // --- Random Scatter Positions ---
  const scatterPositions = useMemo(() => {
    return Array.from({ length: totalCount }).map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 900,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, [totalCount]);

  // --- Render Loop (Manual Calculation for Morph) ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Controlled text opacities so circle text and arc text never clash
  const circleTextOpacity = Math.max(0, Math.min(1 - morphValue * 2.2, 1));
  const arcTextOpacity = Math.max(0, Math.min((morphValue - 0.65) / 0.35, 1));
  const arcTextY = (1 - arcTextOpacity) * 16;

  // Scroll completion progress
  const progressPercent = Math.min(Math.round((rotateValue / 360) * 100), 100);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[620px] sm:h-[680px] lg:h-[720px] bg-[#f5f4f2] text-[#111111] overflow-hidden select-none ${className}`}
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Perspective Container */}
      <div className="flex h-full w-full flex-col items-center justify-center perspective-1000 relative">
        {/* Intro Circle Text (Centered, fades out when morphing to arc) */}
        {circleTextOpacity > 0.01 && (
          <div
            style={{ opacity: circleTextOpacity }}
            className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 py-1 px-3 text-[11px] font-mono uppercase tracking-widest text-neutral-600 mb-3 shadow-2xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-pulse" />
              Interactive 3D Wheel • 0%
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] max-w-2xl">
              {title}
            </h1>

            <p className="mt-4 text-xs font-mono font-medium tracking-[0.25em] text-neutral-500 uppercase flex items-center gap-2">
              <span>↓</span> {subtitle} <span>↓</span>
            </p>
          </div>
        )}

        {/* Arc Active Content (Top aligned, fades in when in bottom arc) */}
        {arcTextOpacity > 0.01 && (
          <div
            style={{ opacity: arcTextOpacity, transform: `translateY(${arcTextY}px)` }}
            className="absolute top-[4%] sm:top-[6%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 py-1 px-3.5 text-[11px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm mb-3">
              <span>Interactive 3D Wheel • {progressPercent}%</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] tracking-tight mb-2">
              {arcTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed">
              {arcSubtitle}
            </p>
          </div>
        )}

        {/* Main 3D Card Stage (Original Circle-to-Bottom-Arc Morph) */}
        <div className="relative flex items-center justify-center w-full h-full">
          {activeItems.map((item, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 };
            } else if (introPhase === "line") {
              const lineSpacing = 82;
              const lineTotalWidth = totalCount * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width || 1200, containerSize.height || 700);

              // 1. Circle Position
              const circleRadius = Math.min(minDimension * 0.35, 330);
              const circleAngle = (i / totalCount) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // 2. Bottom Arc Position — Positioned higher up so cards are never cut off
              const baseRadius = Math.min(containerSize.width || 1200, (containerSize.height || 700) * 1.4);
              const arcRadius = baseRadius * (isMobile ? 1.25 : 1.1);
              // Shift apex significantly upward (from 0.26 to -0.05) to keep cards well above bottom edge
              const arcApexY = (containerSize.height || 700) * (isMobile ? -0.02 : -0.06);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 95 : 120;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / Math.max(totalCount - 1, 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.85;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.25 : 1.5,
              };

              // Morph from circle to bottom arc
              target = {
                x: circlePos.x * (1 - morphValue) + arcPos.x * morphValue,
                y: circlePos.y * (1 - morphValue) + arcPos.y * morphValue,
                rotation: circlePos.rotation * (1 - morphValue) + arcPos.rotation * morphValue,
                scale: 1 * (1 - morphValue) + arcPos.scale * morphValue,
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                src={item.src}
                index={i}
                total={totalCount}
                phase={introPhase}
                target={target}
                title={item.title}
                category={item.category}
                onCardClick={onSelectImage}
              />
            );
          })}
        </div>

        {/* Scroll Cue Indicator */}
        <div className="absolute bottom-5 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-black/[0.08] shadow-sm text-xs text-neutral-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Rotate wheel down ({progressPercent}%) • merges into gallery grid at 100%</span>
          <svg className="w-3.5 h-3.5 text-neutral-400 animate-bounce ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export { IntroAnimation as ScrollMorphHero };
