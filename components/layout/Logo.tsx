"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex flex-col leading-none"
    >
      <span className="text-sm font-light uppercase tracking-[0.6em] text-white transition-opacity duration-500 group-hover:opacity-70">
        LUXURY
      </span>

      <span className="mt-3 text-[11px] uppercase tracking-[0.45em] text-white/60">
        Luxury Architecture Studio
      </span>
    </Link>
  );
}