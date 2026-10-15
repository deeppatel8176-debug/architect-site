"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

const navItems = [
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Manifesto",
    href: "#manifesto",
  },
  {
    label: "Gallery",
    href: "#gallery",
  },
  {
    label: "Contact",
    href: "#footer",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "bg-black/35 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-[1700px] items-center justify-between px-8 md:px-12 xl:px-20">

        <Logo />

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-16">

            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-sm uppercase tracking-[0.35em] text-white transition-colors duration-300 hover:text-white/60"
                >
                  <RandomLetterSwap
                    label={item.label}
                    staggerDuration={0.025}
                    transition={{ duration: 0.6, type: "spring" }}
                  />

                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                </Link>
              </li>
            ))}

          </ul>
        </nav>

        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white lg:hidden">
          ☰
        </button>

      </div>
    </header>
  );
}