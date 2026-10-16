"use client";

import React, { useState } from "react";
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
      className="relative w-full bg-black text-white font-sans overflow-hidden border-t border-white/10"
      style={{
        paddingTop: "5rem",
        paddingBottom: "4.5rem",
      }}
    >
      <Toaster />
      <footer
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
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-6 shrink-0 text-[#c9a96e]"
              >
                <rect x="3" y="3" width="8" height="8" transform="rotate(-6 7 7)" />
                <rect x="3" y="13" width="8" height="8" transform="rotate(5 7 17)" />
                <rect x="13" y="13" width="8" height="8" transform="rotate(-4 17 17)" />
                <rect x="13" y="3" width="8" height="8" transform="rotate(15 17 7)" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-white font-sans">Acme</span>
            </a>

            <h2 className="mt-5 text-xl font-bold tracking-tight text-white font-sans">
              Ship faster with our newsletter
            </h2>
            <p className="mt-2 text-sm text-neutral-400 font-sans tracking-tight leading-relaxed">
              Product updates, new blocks, and engineering notes. One email a week, no spam.
            </p>

            {/* Seamless, perfectly aligned email box capsule */}
            <form onSubmit={handleSubscribe} className="mt-6 w-full select-auto">
              <div className="relative flex items-center w-full rounded-xl bg-white/[0.05] border border-white/15 hover:border-white/25 focus-within:border-[#c9a96e] focus-within:ring-1 focus-within:ring-[#c9a96e]/30 transition-all p-1.5 backdrop-blur-sm">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@acme.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent border-0 px-3.5 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-0 font-sans"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="h-10 px-5 rounded-lg bg-[#c9a96e] hover:bg-[#d6b06a] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-md shrink-0 flex items-center justify-center gap-2 font-sans"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs text-neutral-500 font-sans transition-colors">
                {subscribed
                  ? "Thanks for subscribing. Check your inbox to confirm."
                  : "By subscribing you agree to our Privacy Policy."}
              </p>
            </form>
          </div>

          {/* Right Columns: Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white/90 font-sans">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3 font-sans">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-neutral-400 transition-colors hover:text-white font-sans tracking-tight"
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

        {/* Solid divider line with guaranteed clearance — no overlap */}
        <div
          className="w-full"
          style={{
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            marginTop: "3.5rem",
            marginBottom: "2.5rem",
          }}
        />

        {/* Bottom Row: Copyright + Optically Symmetrical Social Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-sans text-xs">
          <p className="text-neutral-500 tracking-tight text-center sm:text-left">
            &copy; 2026 Acme, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#c9a96e]/60 hover:bg-[#c9a96e]/10 transition-all duration-200 shrink-0"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
