"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export default function ArchitectBackground() {
  const currentVilla = useStore((s) => s.currentVilla);
  const [visible, setVisible] = useState(true);
  const [displayVilla, setDisplayVilla] = useState(currentVilla);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayVilla(currentVilla);
      setVisible(true);
    }, 350);
    return () => clearTimeout(t);
  }, [currentVilla]);

  const words = displayVilla.name.toUpperCase().split(" ");

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {/*
       * Safe zones:
       * Top   90px — clears fixed nav (top-8 = 32px + text ~24px + margin)
       * Bottom 90px — clears VillaSlider (bottom-8 = 32px + bar ~40px + margin)
       */}

      {/* Horizontal rule lines inside safe zone */}
      {[0.3, 0.5, 0.7].map((pct, i) => (
        <div
          key={i}
          className="absolute w-full"
          style={{
            top: `calc(90px + (100vh - 180px) * ${pct})`,
            height: "1px",
            background:
              "linear-gradient(to right, transparent 6%, rgba(17,17,17,0.06) 25%, rgba(17,17,17,0.09) 50%, rgba(17,17,17,0.06) 75%, transparent 94%)",
          }}
        />
      ))}

      {/* Location — upper-right, below nav */}
      <div
        className="absolute right-10 flex flex-col items-end gap-1"
        style={{
          top: 108,
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
          opacity: visible ? 1 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(17,17,17,0.4)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Location
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.82rem",
            letterSpacing: "0.02em",
            color: "rgba(17,17,17,0.75)",
            textAlign: "right",
            fontWeight: 500,
          }}
        >
          {displayVilla.location}
        </span>
      </div>

      {/* Vertical text — right edge, centered safely in middle */}
      <div
        className="absolute right-6 md:right-8"
        style={{
          top: 140,
          bottom: 140,
          display: "flex",
          alignItems: "center",
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
          opacity: visible ? 0.35 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(17,17,17,0.8)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            fontWeight: 500,
          }}
        >
          siddhatva design · {displayVilla.year}
        </span>
      </div>

      {/* Vertical text — left edge, centered safely in middle */}
      <div
        className="absolute left-6 md:left-8"
        style={{
          top: 140,
          bottom: 140,
          display: "flex",
          alignItems: "center",
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
          opacity: visible ? 0.35 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(17,17,17,0.8)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontWeight: 500,
          }}
        >
          {displayVilla.style} · {displayVilla.area}
        </span>
      </div>
    </div>
  );
}
