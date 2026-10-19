"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*";

const LINES = [
  "We design",
  "Buildings",
  "You can walk into",
  "Before they exist",
];

const FULL_TEXT = LINES.join("\n");

function getScrambled(target: string, progress: number): string {
  return target
    .split("")
    .map((char) => {
      if (char === "\n" || char === " ") return char;
      if (Math.random() < progress) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

// ── Hover-scramble on a single character ──────────────────────────────────
interface HoverLetterProps {
  original: string;
  display: string;
  isResolved: boolean;
}

function HoverLetter({ original, display, isResolved }: HoverLetterProps) {
  const [hoverChar, setHoverChar] = useState<string | null>(null);
  const hoverRaf = useRef<number | null>(null);
  const hoverStart = useRef<number>(0);
  const HOVER_SCRAMBLE = 500;
  const HOVER_RESOLVE  = 500;

  const handleEnter = useCallback(() => {
    if (original === " ") return;
    if (hoverRaf.current) cancelAnimationFrame(hoverRaf.current);
    hoverStart.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - hoverStart.current;
      if (elapsed < HOVER_SCRAMBLE) {
        setHoverChar(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]);
        hoverRaf.current = requestAnimationFrame(tick);
      } else if (elapsed < HOVER_SCRAMBLE + HOVER_RESOLVE) {
        const t = (elapsed - HOVER_SCRAMBLE) / HOVER_RESOLVE;
        setHoverChar(Math.random() < t ? original : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]);
        hoverRaf.current = requestAnimationFrame(tick);
      } else {
        setHoverChar(null);
      }
    };

    hoverRaf.current = requestAnimationFrame(tick);
  }, [original]);

  useEffect(() => () => { if (hoverRaf.current) cancelAnimationFrame(hoverRaf.current); }, []);

  const shown = hoverChar ?? display;
  const resolved = hoverChar === null && isResolved;

  return (
    <span
      onMouseEnter={handleEnter}
      style={{
        display: "inline-block",
        cursor: original !== " " ? "default" : undefined,
        color: resolved ? "#111111" : "#6b6b6b",
        fontFamily: resolved ? "inherit" : "monospace",
        transition: "color 0.05s",
        minWidth: original === " " ? "0.26em" : undefined,
      }}
    >
      {shown}
    </span>
  );
}

// ── Periodic full-text scramble ────────────────────────────────────────────
const SCRAMBLE_DURATION = 1600;
const RESOLVE_DURATION  = 1400;
const IDLE_DURATION     = 5000;
const CYCLE = SCRAMBLE_DURATION + RESOLVE_DURATION + IDLE_DURATION;

export default function HeroStatement() {
  const [display, setDisplay] = useState(FULL_TEXT);
  const rafRef   = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const runCycle = (startTime: number) => {
    startRef.current = startTime;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;

      if (elapsed < SCRAMBLE_DURATION) {
        const progress = (elapsed / SCRAMBLE_DURATION) * 0.12;
        setDisplay(getScrambled(FULL_TEXT, progress));
        rafRef.current = requestAnimationFrame(tick);
      } else if (elapsed < SCRAMBLE_DURATION + RESOLVE_DURATION) {
        const t = (elapsed - SCRAMBLE_DURATION) / RESOLVE_DURATION;
        const eased = 1 - Math.pow(1 - t, 2.5);
        setDisplay(getScrambled(FULL_TEXT, eased));
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(FULL_TEXT);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    runCycle(performance.now());
    const interval = setInterval(() => runCycle(performance.now()), CYCLE);
    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayLines = display.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex min-w-0 flex-col items-start w-full max-w-[580px]"
    >
      <h1
        id="hero-heading"
        aria-label={LINES.join(" ")}
        className="text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[62px] font-bold leading-[1.08] tracking-[-0.04em] text-[#111111] flex flex-col items-start gap-1 sm:gap-1.5"
      >
        {displayLines.map((line, i) => (
          <div key={i} className="flex whitespace-pre">
            {line.split("").map((char, j) => {
              const originalChar = LINES[i]?.[j] ?? char;
              const isResolved = char === originalChar;
              return (
                <HoverLetter
                  key={j}
                  original={originalChar}
                  display={char}
                  isResolved={isResolved}
                />
              );
            })}
          </div>
        ))}
      </h1>
    </motion.div>
  );
}
