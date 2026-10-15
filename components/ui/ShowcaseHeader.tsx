"use client";

import Link from "next/link";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

export default function ShowcaseHeader() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "#villas" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="absolute top-8 left-0 right-0 z-40 px-6 flex items-center justify-center pointer-events-none select-none">
      {/* ── Borderless Floating Nav Links ── */}
      <nav className="pointer-events-auto flex items-center gap-6 md:gap-10">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/80 hover:text-white px-2 py-1 transition-colors duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            <RandomLetterSwap
              className="cursor-pointer"
              label={item.label}
              staggerDuration={0.035}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 24,
              }}
            />
          </Link>
        ))}
      </nav>
    </header>
  );
}
