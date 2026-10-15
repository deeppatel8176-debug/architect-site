"use client";

import { ShaderBackground } from "@/components/ui/mesh-portfolio";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Award, Globe, Users, Building2 } from "lucide-react";
import GlobalFooter from "@/components/ui/GlobalFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const STATS = [
  { icon: Building2, value: "147", label: "Estates Curated" },
  { icon: Globe,     value: "38",  label: "Countries" },
  { icon: Award,     value: "22",  label: "Architecture Awards" },
  { icon: Users,     value: "4.2K",label: "Private Members" },
];

const TIMELINE = [
  { year: "2018", title: "Founding Vision", body: "Villa Atelier was conceived in a Kyoto studio — a belief that architecture should be felt, not merely seen." },
  { year: "2020", title: "Digital Monograph", body: "We pioneered the interactive 3D architectural monograph, letting collectors orbit estates before setting foot inside." },
  { year: "2022", title: "Global Expansion", body: "Offices opened in Beverly Hills, St. Moritz and Stockholm to serve discerning clients across three continents." },
  { year: "2026", title: "AI-Powered Curation", body: "A bespoke recommendation engine now matches collectors to estates with unprecedented precision and taste alignment." },
];

const TEAM = [
  { name: "Hiroshi Mori", role: "Founder & Chief Curator", origin: "Kyoto · Tokyo" },
  { name: "Élise Vautrin",  role: "Head of European Collections", origin: "Paris · Geneva" },
  { name: "James Alderton", role: "Director of Digital Architecture", origin: "London · Aspen" },
  { name: "Anya Lindqvist", role: "Nordic & Scandinavian Specialist", origin: "Stockholm · Oslo" },
];

// Warm champagne and alabaster palette
const ABOUT_PALETTE: [[number,number,number],[number,number,number],[number,number,number]] = [
  [0.985, 0.970, 0.955],
  [0.960, 0.880, 0.720],
  [0.920, 0.780, 0.540],
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-neutral-900 overflow-x-hidden selection:bg-neutral-900 selection:text-white">
      {/* Shader background — subtle, warm gold gradient */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-40" palette={ABOUT_PALETTE} />

      {/* Light gradient overlay so text stays razor-sharp */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#faf8f5]/80 via-[#faf8f5]/40 to-[#faf8f5]/90 pointer-events-none" />

      <div className="relative z-10">
        {/* ── Top Nav ─────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif text-[#e5c28a] text-sm font-semibold tracking-wider">VA</span>
            </div>
            <span className="font-serif text-sm tracking-[0.2em] text-neutral-900 uppercase font-medium">
              Villa Atelier
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-neutral-700 hover:text-black font-medium transition-colors">
              <ArrowLeft size={14} />
              Back to Showcase
            </Link>
            <Link href="/contact" className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900 font-medium transition-colors">
              Contact
            </Link>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 max-w-5xl mx-auto">
          <motion.p
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[10px] tracking-[0.4em] uppercase text-[#9c7442] font-semibold mb-6"
          >
            Private Architectural Monographs · Est. 2018
          </motion.p>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] font-light leading-[0.92] tracking-tight text-neutral-900 mb-8"
          >
            About<br />
            <em className="italic text-[#9c7442]">Villa Atelier</em>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="max-w-xl text-neutral-600 text-sm md:text-base leading-relaxed tracking-wide font-light"
          >
            We are the world&apos;s most discerning architectural gallery — a private atelier where
            extraordinary estates meet the collectors who deserve them.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-20 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] tracking-[0.35em] uppercase text-neutral-400 font-medium">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#9c7442] to-transparent scroll-line" />
          </motion.div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="py-24 px-8 border-t border-black/[0.06]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-black/[0.08] rounded-3xl overflow-hidden shadow-sm">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white/90 p-10 flex flex-col items-center gap-4 group hover:bg-white transition-colors text-center"
              >
                <Icon size={22} className="text-[#9c7442] transition-colors" />
                <span className="font-serif text-4xl font-normal text-neutral-900">{value}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Philosophy ───────────────────────────────────────── */}
        <section className="py-28 px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#9c7442] font-semibold mb-6">Our Philosophy</p>
              <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight text-neutral-900 mb-8">
                Architecture is<br />
                <em className="italic text-[#9c7442]">autobiography</em>
              </h2>
              <p className="text-neutral-600 text-sm leading-loose font-light">
                Every estate in our monograph is a singular expression of its creator — a statement of material
                conviction, spatial intelligence, and cultural rooting. We do not simply list properties.
                We curate a canon.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-6"
            >
              {["Materiality over trend", "Permanence over novelty", "Provenance over prestige", "Space as emotional experience"].map((principle, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <span className="text-[#9c7442] font-mono text-xs mt-1 font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-neutral-800 text-sm tracking-wide border-b border-black/[0.06] pb-4 flex-1 font-normal">
                    {principle}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section className="py-24 px-8 border-t border-black/[0.06] bg-black/[0.01]">
          <div className="max-w-5xl mx-auto">
            <motion.p
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#9c7442] font-semibold mb-4 text-center"
            >
              The Evolution
            </motion.p>
            <motion.h2
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl font-light text-center text-neutral-900 mb-20"
            >
              Milestones of the Atelier
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {TIMELINE.map(({ year, title, body }, i) => (
                <motion.div
                  key={year}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="bg-white/90 p-8 rounded-3xl border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                >
                  <span className="font-serif text-3xl font-normal text-[#9c7442]">{year}</span>
                  <h3 className="font-serif text-lg text-neutral-900 font-medium">{title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ─────────────────────────────────────────────── */}
        <section className="py-28 px-8">
          <div className="max-w-5xl mx-auto">
            <motion.p
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#9c7442] font-semibold mb-4 text-center"
            >
              Leadership
            </motion.p>
            <motion.h2
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl font-light text-center text-neutral-900 mb-20"
            >
              The Curators
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map(({ name, role, origin }, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="bg-white/90 p-7 rounded-3xl border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 group text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-neutral-100 border border-black/10 mx-auto flex items-center justify-center font-serif text-lg text-[#9c7442] font-semibold mb-2">
                    {name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="font-serif text-lg text-neutral-900 font-medium">{name}</h3>
                  <p className="text-xs text-[#9c7442] font-medium">{role}</p>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-wider">{origin}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ──────────────────────────────────────── */}
        <section className="py-24 px-8 border-t border-black/[0.06] bg-neutral-900 text-white rounded-t-[3rem]">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#e5c28a] font-semibold">Begin Your Monograph</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
              Curate or Acquire with Villa Atelier
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed font-light">
              We welcome private collectors, family offices, and architectural estates. Inquiries are handled with utmost discretion.
            </p>
            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc49e] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-black/30"
              >
                Initiate Private Inquiry
              </Link>
              <Link
                href="/"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs uppercase tracking-widest transition-colors border border-white/20"
              >
                Explore 3D Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* ── Global Footer ──────────────────────────────────────────── */}
        <GlobalFooter />

      </div>
    </div>
  );
}
