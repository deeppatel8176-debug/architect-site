"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useScroll,
    MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export interface TunnelImageItem {
    src: string;
    title: string;
    subtitle?: string;
    id?: string;
}

const DEFAULT_IMAGES: TunnelImageItem[] = [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", title: "The Monolith Sanctuary", subtitle: "Kyoto Foothills, Japan" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", title: "Cantilever Glass Pavilion", subtitle: "Alibaug Coast, India" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", title: "Kyoto Zen Courtyard", subtitle: "Lonavala Valley, MH" },
    { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop", title: "Woodie Haven", subtitle: "Goa Estate, GA" },
    { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop", title: "Obsidian Private Residence", subtitle: "Ahmedabad, Gujarat" },
    { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=800&auto=format&fit=crop", title: "Cascading Water Atrium", subtitle: "Udaipur Lakes, RJ" },
    { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop", title: "Terracotta Horizon Villa", subtitle: "Jaipur Ridge, RJ" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop", title: "Minimalist Stone Sanctuary", subtitle: "Surat Riverside, GJ" },
];

export interface TunnelCardData {
    item: TunnelImageItem;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
    onSelect?: (item: TunnelImageItem, index: number) => void;
}

function TunnelCard({ card, progress, pointer, total, stage, onSelect }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1300 : -1800;
    const nearZ = stage.isMobile ? 380 : 540;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.16, 0.84, 0.99], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(140, Math.min(190, stage.width * 0.40))
        : Math.max(220, Math.min(310, stage.width * 0.22));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 22 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = baseX - px * panStrength;
            const offsetY = baseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                transform,
                opacity,
                zIndex: card.index + 1,
            }}
            onClick={() => onSelect?.(card.item, card.index)}
            className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
        >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/10 ring-1 ring-black/[0.08] transition-all duration-500 hover:ring-black/40 hover:shadow-2xl">
                <img
                    src={card.item.src}
                    alt={card.item.title}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5">
                    <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white drop-shadow-md font-semibold">
                        {card.item.title}
                    </span>
                    {card.item.subtitle && (
                        <span className="text-[11.5px] font-mono text-neutral-200 line-clamp-1 mt-0.5">
                            {card.item.subtitle}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    images?: TunnelImageItem[];
    eyebrow?: string;
    title?: string;
    description?: string;
    trackHeight?: string; // Total scroll height for pinning, defaults to 280vh
    sticky?: boolean;     // Pins to screen until the entire tunnel effect completes!
    height?: string;
    className?: string;
    onSelect?: (item: TunnelImageItem, index: number) => void;
}

export default function PerspectiveTunnelHero({
    images = DEFAULT_IMAGES,
    eyebrow = "Curated Architectural Portfolio",
    title = "Featured Estates\n& Residences",
    description = "Explore our curated portfolio of bespoke villas, contemporary residences, and high-fidelity 3D spatial twins.",
    trackHeight = "280vh",
    sticky = true,
    height = "100svh",
    className = "",
    onSelect,
}: PerspectiveTunnelHeroProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    const tunnelCards = useMemo<TunnelCardData[]>(() => {
        return images.map((item, i) => {
            const goldenAngle = i * 137.5 * (Math.PI / 180);
            const radiusFactorX = 0.28 + (i % 3) * 0.08;
            const radiusFactorY = 0.26 + (i % 2) * 0.09;

            return {
                item,
                angleCos: Math.cos(goldenAngle),
                angleSin: Math.sin(goldenAngle),
                radiusFactorX,
                radiusFactorY,
                rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
                index: i,
            };
        });
    }, [images]);

    useEffect(() => {
        const updateDimensions = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // ── STICKY SCROLL DRIVER ──
    // Scroll progress driven directly by page scroll as user moves through the track
    const { scrollYProgress } = useScroll({
        target: sticky ? trackRef : undefined,
        offset: ["start start", "end end"],
    });

    // Fallback motion value for non-sticky wheel control
    const rawProgress = useMotionValue(0);

    const activeProgress = sticky ? scrollYProgress : rawProgress;

    const smoothProgress = useSpring(activeProgress, {
        stiffness: 90,
        damping: 28,
        restDelta: 0.0005,
    });

    // Wheel event handler for standalone/non-sticky mode
    useEffect(() => {
        if (sticky) return;
        const el = containerRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            const current = rawProgress.get();
            const delta = e.deltaY * 0.0008;
            const next = Math.min(1, Math.max(0, current + delta));
            if ((delta > 0 && current < 0.99) || (delta < 0 && current > 0.01)) {
                e.preventDefault();
                rawProgress.set(next);
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [sticky, rawProgress]);

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(smoothProgress, [0, 0.45, 1], [0.85, 1, 1.25]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.82, 0.98], [0.4, 1, 1, 0.15]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

    const tunnelStageJSX = (
        <div
            ref={containerRef}
            className={`relative w-full h-[100svh] overflow-hidden bg-[#f5f4f2] text-[#111111] select-none flex items-center justify-center ${className}`}
            style={{
                perspective: stage.isMobile ? "900px" : "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            {/* Architectural Light Grid & Ambient Glow (Always White/Light Theme) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(17,17,17,0.07)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_65%,transparent_100%)] opacity-85" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.04)_0%,transparent_70%)]" />

            {/* Depth Ring Guides */}
            <div className="pointer-events-none absolute h-[50vmin] w-[50vmin] rounded-full border border-black/[0.08]" />
            <div className="pointer-events-none absolute h-[78vmin] w-[78vmin] rounded-full border border-dashed border-black/[0.07]" />

            {/* Central Anchor Typography */}
            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/85 py-1 px-3 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    {eyebrow}
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-[#111111] whitespace-pre-line">
                    {title}
                </h2>
                <p className="mt-4 max-w-[42ch] text-[15px] sm:text-base font-normal text-neutral-600 leading-relaxed">
                    {description}
                </p>
            </motion.div>

            {/* Scroll Indicator Prompt */}
            <motion.div
                style={{ opacity: promptOpacity }}
                className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-1.5 text-xs font-mono uppercase tracking-[0.25em] text-neutral-500"
            >
                <span>Scroll To Fly Through Estates</span>
                <div className="h-5 w-px bg-gradient-to-b from-neutral-800 to-transparent" />
            </motion.div>

            {/* 3D Z-Space Plane */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
            >
                {tunnelCards.map((card, i) => (
                    <TunnelCard
                        key={i}
                        card={card}
                        progress={smoothProgress}
                        pointer={pointer}
                        total={tunnelCards.length}
                        stage={stage}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );

    // If sticky is enabled, wrap in an extended height track so the screen is stuck until effect finishes
    if (sticky) {
        return (
            <div
                ref={trackRef}
                className="relative w-full"
                style={{ height: trackHeight }}
            >
                <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                    {tunnelStageJSX}
                </div>
            </div>
        );
    }

    return (
        <div style={{ height }}>
            {tunnelStageJSX}
        </div>
    );
}
