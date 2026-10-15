"use client";

import React, { useState } from "react";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/#villas" },
  { label: "Services", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full text-white font-sans" style={{ background: "transparent" }}>
      {/* ── Completely transparent container seamlessly merged with site background ── */}
      <div style={{ width: "100%", background: "transparent" }}>
        <div
          style={{
            maxWidth: "1240px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            paddingTop: "7rem",
            paddingBottom: "4rem",
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16"
        >

          {/* Col 1: Stay Connected + Newsletter */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tighter leading-tight bg-gradient-to-br from-white via-white/95 to-white/50 bg-clip-text text-transparent">
                Stay Connected
              </h2>
              <p className="mt-4 text-sm text-neutral-400 font-sans tracking-tight leading-relaxed max-w-sm">
                Join our curated newsletter for the latest architectural monographs and exclusive estate previews.
              </p>
            </div>
            <form
              className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-white/5 focus-within:border-white/30 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 px-4 py-3 outline-none font-sans tracking-tight"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 py-3 bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90 font-sans">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group tracking-tight"
                  >
                    <span className="w-3 h-px bg-[#c9a96e] group-hover:w-5 transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90 font-sans">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-sm">
              <li className="text-neutral-300 tracking-tight">1 Mayfair Gardens, London W1K</li>
              <li className="text-neutral-300 tracking-tight">Beverly Hills, CA 90210</li>
              <li>
                <a href="tel:+442012345678" className="text-[#c9a96e] hover:text-white transition-colors tracking-tight font-medium">
                  +44 (0) 20 1234 5678
                </a>
              </li>
              <li>
                <a href="mailto:hello@villaatelier.com" className="text-[#c9a96e] hover:text-white transition-colors tracking-tight font-medium">
                  hello@villaatelier.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90 font-sans">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-neutral-400 mt-1 font-sans tracking-tight">Find our monographs across all platforms.</p>
          </div>

        </div>
      </div>

      {/* ── Thin luxury divider ── */}
      <div style={{ maxWidth: "1240px", marginLeft: "auto", marginRight: "auto", paddingLeft: "3rem", paddingRight: "3rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }} />
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ width: "100%", background: "transparent" }}>
        <div
          style={{
            maxWidth: "1240px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            paddingTop: "1.5rem",
            paddingBottom: "3rem",
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs"
        >
          <p className="text-neutral-500 tracking-tight">
            &copy; {new Date().getFullYear()} Villa Atelier. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-neutral-500 hover:text-white transition-colors tracking-tight">Privacy Policy</Link>
            <Link href="#" className="text-neutral-500 hover:text-white transition-colors tracking-tight">Terms of Service</Link>
            <Link href="#" className="text-neutral-500 hover:text-white transition-colors tracking-tight">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
