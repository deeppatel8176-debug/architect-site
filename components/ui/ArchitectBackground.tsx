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
              "linear-gradient(to right, transparent 6%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.055) 50%, rgba(255,255,255,0.04) 75%, transparent 94%)",
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
            fontFamily: "Garamond, Georgia, serif",
            fontSize: "0.55rem",
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.13)",
            textTransform: "uppercase",
          }}
        >
          Location
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.07em",
            color: "rgba(255,255,255,0.21)",
            fontStyle: "italic",
            textAlign: "right",
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
          opacity: visible ? 0.22 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "Garamond, Georgia, serif",
            fontSize: "0.55rem",
            letterSpacing: "0.36em",
            color: "rgba(255,255,255,1)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Villa Atelier · {displayVilla.year}
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
          opacity: visible ? 0.22 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "Garamond, Georgia, serif",
            fontSize: "0.55rem",
            letterSpacing: "0.36em",
            color: "rgba(255,255,255,1)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {displayVilla.style} · {displayVilla.area}
        </span>
      </div>
    </div>
  );
}
