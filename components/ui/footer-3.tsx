"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const columns = [
  {
    title: "Product",
    links: ["Blocks", "Templates", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "API Reference", "Support"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];

/* Normalized optical SVG marks for balanced visual symmetry */
const socials = [
  {
    label: "GitHub",
    icon: () => (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    label: "X",
    icon: () => (
      <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: () => (
      <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: () => (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function FooterBlock() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("You're subscribed", {
      description: `Confirmation sent to ${email}.`,
    });
  }

  return (
    <section
      className="relative w-full bg-[#f5f4f2] text-[#111111] font-sans overflow-hidden border-t border-black/[0.07]"
      style={{
        paddingTop: "5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <Toaster />
      <motion.footer
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full"
        style={{
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        {/* Top Grid: Newsletter on Left (5 cols) & Links on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 max-w-md">
            {/* Logo */}
            <a href="#" className="inline-flex items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[8px] bg-[#111111] text-white shadow-xs ring-1 ring-black/10">
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
              <span className="text-xl font-bold tracking-tight text-[#111111] font-sans">
                siddhatva design
              </span>
            </a>

            <h2 className="mt-5 text-xl font-bold tracking-tight text-[#111111] font-sans">
              Architectural Journal &amp; Monographs
            </h2>
            <p className="mt-2 text-sm text-neutral-600 font-sans tracking-tight leading-relaxed">
              New estate releases, physical walkthrough invites, and engineering documentation. Sent quarterly.
            </p>

            {/* TasteSkill Capsule Input Form */}
            <form onSubmit={handleSubscribe} className="mt-6 w-full select-auto">
              <div
                className="relative flex items-center w-full max-w-[440px] rounded-full bg-white border border-black/[0.1] hover:border-black/25 focus-within:border-black focus-within:ring-2 focus-within:ring-black/5 transition-all shadow-[0_1px_3px_rgba(10,10,10,0.04)]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "440px",
                  backgroundColor: "#ffffff",
                  borderRadius: "9999px",
                  padding: "5px 6px 5px 6px",
                  boxSizing: "border-box",
                }}
              >
                <input
                  id="footer-email"
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: "1 1 0%",
                    minWidth: 0,
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    paddingLeft: "16px",
                    paddingRight: "10px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize: "14px",
                    color: "#111111",
                    fontFamily: "inherit",
                  }}
                  className="placeholder:text-neutral-400 font-sans"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  style={{
                    flexShrink: 0,
                    height: "36px",
                    paddingLeft: "18px",
                    paddingRight: "18px",
                    borderRadius: "9999px",
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    transition: "all 0.2s ease",
                  }}
                  className="hover:bg-neutral-800 active:scale-95 font-sans"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs text-neutral-500 font-sans transition-colors">
                {subscribed
                  ? "Thanks for subscribing. Check your inbox to confirm."
                  : "By subscribing you agree to our confidential collector policy."}
              </p>
            </form>
          </div>

          {/* Right Columns: Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: "Collection",
                links: ["Monolith Sanctuary", "Kyoto Pavilion", "Obsidian Cliff", "Alpine Glasshouse", "Desert Minimal"],
              },
              {
                title: "Standards",
                links: ["BIM Tolerances", "Passive Daylight", "Quarry Curation", "Acoustic Isolation"],
              },
              {
                title: "Studio",
                links: ["Architectural Philosophy", "Selected Works", "Private Commissions", "Contact"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#111111] font-sans">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3 font-sans">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-neutral-600 transition-colors hover:text-[#111111] font-sans tracking-tight"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Solid divider line */}
        <div
          className="w-full"
          style={{
            height: "1px",
            backgroundColor: "rgba(10, 10, 10, 0.08)",
            marginTop: "3.5rem",
            marginBottom: "2.5rem",
          }}
        />

        {/* Bottom Row: Copyright + Optically Symmetrical Social Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-sans text-xs">
          <p className="text-neutral-500 tracking-tight text-center sm:text-left">
            &copy; 2026 siddhatva design, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-black/[0.08] bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:border-black/20 hover:bg-neutral-50 transition-all duration-200 shrink-0 shadow-xs"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
