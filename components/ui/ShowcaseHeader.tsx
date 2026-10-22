"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ShowcaseHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section scroll spy
      const sections = ["villas", "services", "studio", "gallery", "process", "faq", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#villas" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#studio" },
    { label: "Gallery", href: "#gallery" },
    { label: "Experience", href: "#exhibition" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] transition-[background-color,border-color,backdrop-filter] duration-200 ease-out pointer-events-auto ${
          scrolled
            ? "border-b border-black/[0.08] bg-[#f5f4f2]/90 backdrop-blur-md shadow-2xs"
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
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[8px] bg-[#111111] text-white shadow-2xs ring-1 ring-black/10">
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
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#111111]">
              siddhatva design
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {navLinks.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    paddingLeft: "18px",
                    paddingRight: "18px",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                  }}
                  className={`rounded-full text-[13.5px] font-medium outline-none transition-all duration-150 ease-out whitespace-nowrap ${
                    isActive
                      ? "text-[#111111] bg-black/[0.08] font-semibold"
                      : "text-neutral-600 hover:text-[#111111] hover:bg-black/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              style={{
                height: "42px",
                width: "42px",
              }}
              title="Open Atelier Admin Portal"
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80 hover:bg-neutral-100 text-[#111111] transition-all shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>

            <Link
              href="#contact"
              style={{
                paddingLeft: "34px",
                paddingRight: "34px",
                height: "42px",
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#111111] text-[13.5px] font-medium text-white outline-none transition-all duration-150 hover:bg-neutral-800 active:scale-[0.98] shadow-sm whitespace-nowrap"
            >
              <span>Start a Project</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-[190] bg-[#f5f4f2] border-b border-black/[0.08] shadow-lg lg:hidden px-6 py-6"
          >
            <ul className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-neutral-800 hover:text-black border-b border-black/[0.04]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-xs font-mono text-neutral-500 uppercase tracking-wider"
                >
                  Direct Studio Desk →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
