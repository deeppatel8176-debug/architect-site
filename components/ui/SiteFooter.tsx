"use client";

import React, { useState } from "react";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Estates", href: "/#villas" },
  { label: "Standards", href: "/#what-we-do" },
  { label: "Exhibition", href: "/#exhibition" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
  };

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
              <p className="mt-3 text-sm text-neutral-400 font-sans tracking-tight leading-relaxed max-w-sm">
                Join our curated newsletter for the latest architectural monographs and exclusive estate previews.
              </p>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-2.5 py-3 px-4 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#c9a96e] text-xs font-sans tracking-wide animate-in fade-in duration-300 max-w-sm">
                <svg className="w-4 h-4 text-[#c9a96e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Thank you. You are on the invitation list.</span>
              </div>
            ) : (
              <form
                className="relative flex items-center w-full max-w-sm rounded-full bg-white/[0.04] border border-white/15 hover:border-white/25 focus-within:border-[#c9a96e] focus-within:bg-white/[0.07] focus-within:shadow-[0_0_24px_rgba(201,169,110,0.18)] transition-all duration-300 p-1.5 pl-4"
                onSubmit={handleSubmit}
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none font-sans tracking-tight pr-2"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="shrink-0 h-9 px-4 rounded-full bg-gradient-to-r from-[#e6caa4] to-[#c9a96e] text-black hover:brightness-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 font-medium text-xs tracking-wider uppercase shadow-[0_2px_12px_rgba(201,169,110,0.3)] cursor-pointer group"
                >
                  <span>Join</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
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
            &copy; {new Date().getFullYear()} siddhatva design. All rights reserved.
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
