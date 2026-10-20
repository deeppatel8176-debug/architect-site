"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

const NAVIGATION_COLUMNS = [
  {
    title: "Portfolio & Studio",
    links: [
      { label: "Featured Estates", href: "#villas" },
      { label: "Architecture Services", href: "#services" },
      { label: "Studio Manifesto", href: "#studio" },
      { label: "Visual Archive", href: "#gallery" },
      { label: "3D Space Exhibition", href: "#exhibition" },
      { label: "Design Process", href: "#process" },
    ],
  },
  {
    title: "Disciplines",
    links: [
      { label: "Residential Architecture", href: "#services" },
      { label: "Interior Architecture", href: "#services" },
      { label: "3D Spatial Visualization", href: "#services" },
      { label: "Renovation & Remodeling", href: "#services" },
      { label: "Site & Plot Consultation", href: "#services" },
    ],
  },
  {
    title: "Inquiries & Studio",
    links: [
      { label: "Start a Commission", href: "#contact" },
      { label: "Studio FAQ", href: "#faq" },
      { label: "Contact Atelier", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export default function FooterBlock() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("Newsletter Subscription Confirmed", {
      description: `Updates from Siddhatva Design will be sent to ${email}.`,
    });
    setEmail("");
  }

  return (
    <footer
      className="relative w-full bg-[#f5f4f2] text-[#111111] font-sans overflow-hidden border-t border-black/[0.08]"
      style={{
        paddingTop: "5.5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full"
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
      >
        {/* Main Grid: Studio Statement & Newsletter on Left, Links on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-black/[0.08]">
          {/* Left Column (5 cols): Logo, Statement & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[8px] bg-[#111111] text-white shadow-2xs">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M9 10.5C9 9.67 9.67 9 10.5 9H22C22.55 9 23 9.45 23 10V11C23 11.55 22.55 12 22 12H13C12.45 12 12 12.45 12 13V14.5C12 15.05 12.45 15.5 13 15.5H19.5C21.43 15.5 23 17.07 23 19V21.5C23 22.33 22.33 23 21.5 23H10C9.45 23 9 22.55 9 22V21C9 20.45 9.45 20 10 20H19C19.55 20 20 19.55 20 19V17.5C20 16.95 19.55 16.5 19 16.5H12.5C10.57 16.5 9 14.93 9 13V10.5Z"
                      fill="#F5F4F2"
                    />
                    <circle cx="21" cy="10.5" r="1.2" fill="#C5A880" />
                    <circle cx="11" cy="21.5" r="1.2" fill="#C5A880" />
                  </svg>
                </span>
                <span className="text-lg font-semibold tracking-[-0.03em] text-[#111111]">
                  siddhatva design
                </span>
              </Link>

              <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 max-w-md">
                Contemporary architecture and spatial design studio specializing in bespoke luxury villas, residential interiors, and interactive 3D digital twins.
              </p>
            </div>

            {/* Studio Bulletin / Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-medium">
                Studio Journal & Architectural Releases
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border border-black/10 bg-white text-xs text-[#111111] focus:outline-none focus:border-black transition-colors"
                  style={{
                    paddingLeft: "18px",
                    paddingRight: "18px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
                  style={{
                    paddingLeft: "22px",
                    paddingRight: "22px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10.5px] text-neutral-400 mt-1.5 font-mono">
                Curated quarterly updates. No promotional spam.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAVIGATION_COLUMNS.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
                  {col.title}
                </span>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-neutral-600 hover:text-black transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Legal, Studio Location & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Siddhatva Design. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Based in Gujarat, India · Engaging Private Clients Worldwide</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="#villas" className="hover:text-black transition-colors">
              Estates
            </a>
            <a href="#contact" className="hover:text-black transition-colors">
              Inquire
            </a>
            <a href="#studio" className="hover:text-black transition-colors">
              Philosophy
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
