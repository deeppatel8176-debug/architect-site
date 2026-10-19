"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function ShowcaseHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Estates", href: "#villas" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Exhibition", href: "#exhibition" },
    { label: "Dossier", href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-[background-color,border-color,backdrop-filter] duration-200 ease-out pointer-events-auto ${
        scrolled
          ? "border-b border-black/[0.07] bg-[#f5f4f2]/85 backdrop-blur-md shadow-[0_1px_2px_rgba(10,10,10,0.02)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
        className="flex h-16 w-full items-center justify-between gap-4"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="-ml-1 flex items-center gap-2.5 rounded-lg px-1 py-1 outline-none transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[8px] bg-[#111111] text-white shadow-sm ring-1 ring-black/10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 10.5C9 9.67 9.67 9 10.5 9H22C22.55 9 23 9.45 23 10V11C23 11.55 22.55 12 22 12H13C12.45 12 12 12.45 12 13V14.5C12 15.05 12.45 15.5 13 15.5H19.5C21.43 15.5 23 17.07 23 19V21.5C23 22.33 22.33 23 21.5 23H10C9.45 23 9 22.55 9 22V21C9 20.45 9.45 20 10 20H19C19.55 20 20 19.55 20 19V17.5C20 16.95 19.55 16.5 19 16.5H12.5C10.57 16.5 9 14.93 9 13V10.5Z"
                fill="#F5F4F2"
              />
              <circle cx="21" cy="10.5" r="1.2" fill="#C5A880" />
              <circle cx="11" cy="21.5" r="1.2" fill="#C5A880" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#111111] tracking-tight">
            siddhatva design
          </span>
        </Link>

        {/* Center / Right Links */}
        <div className="flex items-center" style={{ gap: "8px" }}>
          <ul className="hidden items-center sm:flex" style={{ gap: "4px" }}>
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-full py-2 text-[14px] font-medium text-neutral-600 outline-none transition-colors duration-150 ease-out hover:text-[#111111]"
                  style={{ padding: "8px 20px" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* TasteSkill Signature Black Pill Action Button */}
          <Link
            href="#contact"
            className="inline-flex h-9 items-center rounded-full bg-[#111111] text-[13px] font-medium text-white outline-none transition-[background-color,scale] duration-150 ease-out hover:bg-neutral-800 active:scale-[0.97] shadow-sm whitespace-nowrap"
            style={{
              marginLeft: "24px",
              paddingLeft: "20px",
              paddingRight: "18px",
              gap: "8px",
            }}
          >
            <span>Start a Project</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-300 shrink-0"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
