"use client";

import { useState } from "react";
import { ShaderBackground } from "@/components/ui/mesh-portfolio";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Building,
} from "lucide-react";
import GlobalFooter from "@/components/ui/GlobalFooter";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const ATELIER_OFFICES = [
  {
    city: "Kyoto",
    role: "Global Headquarters & Archives",
    address: "Higashiyama-ku, Kyoto 605-0862",
    contact: "+81 75 532 9000",
    timezone: "JST (UTC+9)",
  },
  {
    city: "Beverly Hills",
    role: "Americas Advisory & Private Client Desk",
    address: "N. Canon Drive, Beverly Hills, CA 90210",
    contact: "+1 310 882 1400",
    timezone: "PST (UTC-8)",
  },
  {
    city: "St. Moritz",
    role: "Alpine & European Estates Atelier",
    address: "Via Serlas, 7500 St. Moritz, Switzerland",
    contact: "+41 81 833 4200",
    timezone: "CET (UTC+1)",
  },
  {
    city: "Paris",
    role: "Architectural Curation & Publishing",
    address: "Place Vendôme, 75001 Paris, France",
    contact: "+33 1 42 68 7700",
    timezone: "CET (UTC+1)",
  },
];

const VILLAS_LIST = [
  "The Monolith Sanctuary (Kyoto, Japan)",
  "Travertine Ridge Manor (Beverly Hills, USA)",
  "The Geometric Haven (Zermatt, Switzerland)",
  "Nordic Obsidian Villa (Stockholm Archipelago, Sweden)",
  "The Elysian Palace (Aspen, Colorado)",
  "Bespoke Architectural Commission",
  "Private Estate Listing Inquiry",
];

const BUDGET_TIERS = [
  "$15,000,000 – $30,000,000",
  "$30,000,000 – $60,000,000",
  "$60,000,000 – $100,000,000",
  "$100,000,000+",
  "Private Advisory / Undisclosed",
];

// Rich warm amber & champagne palette for Contact
const CONTACT_PALETTE: [[number, number, number], [number, number, number], [number, number, number]] = [
  [0.985, 0.97, 0.95],
  [0.96, 0.88, 0.72],
  [0.90, 0.76, 0.52],
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: VILLAS_LIST[0],
    budget: BUDGET_TIERS[1],
    timeline: "Immediate (0-3 Months)",
    ndaRequired: true,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-neutral-900 overflow-x-hidden selection:bg-neutral-900 selection:text-white">
      {/* Shader background */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-40" palette={CONTACT_PALETTE} />

      {/* Light gradient overlay */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#faf8f5]/85 via-[#faf8f5]/50 to-[#faf8f5]/90 pointer-events-none" />

      <div className="relative z-10">
        {/* ── Top Navigation Bar ──────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif text-[#e5c28a] text-sm font-semibold tracking-wider">SD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-[0.2em] text-neutral-900 uppercase font-medium">
                Siddhatva Design
              </span>
              <span className="text-[8px] tracking-[0.25em] text-[#9c7442] uppercase font-semibold">
                Private Inquiries
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-neutral-700 hover:text-black font-medium transition-colors"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Back to</span> Showcase
            </Link>
            <Link
              href="/#what-we-do"
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
            >
              Standards
            </Link>
          </div>
        </nav>

        {/* ── Hero Header ─────────────────────────────────────── */}
        <header className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[10px] tracking-[0.45em] uppercase text-[#9c7442] font-semibold mb-5"
          >
            Discreet Acquisition & Advisory
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 mb-6"
          >
            Initiate a <em className="italic text-[#9c7442]">Dialogue</em>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-neutral-600 text-sm md:text-base leading-relaxed tracking-wide font-light"
          >
            Our monograph represents an extraordinary portfolio of confidential estates.
            Connect directly with our Principal Partners for private viewings, bespoke commissions,
            and acquisitions.
          </motion.p>
        </header>

        {/* ── Main Content Grid: Form & Atelier Info ───────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Inquiry Form (7 cols) */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 bg-white/90 backdrop-blur-2xl border border-black/[0.08] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/[0.06]">
                <div>
                  <h2 className="font-serif text-2xl font-light text-neutral-900 tracking-wide">
                    Private Dossier Request
                  </h2>
                  <p className="text-[11px] text-[#9c7442] tracking-wider uppercase mt-1 font-semibold">
                    Confidential · Direct Partner Response
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-600 uppercase tracking-widest bg-black/[0.03] border border-black/[0.08] px-3 py-1.5 rounded-full font-medium">
                  <ShieldCheck size={14} className="text-[#9c7442]" />
                  <span>Strict NDA</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl font-light text-neutral-900">
                        Dossier Request Received
                      </h3>
                      <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-medium text-neutral-900">{formData.name}</span>. A Private Client Partner will review your acquisition parameters and contact you within 12 hours under encrypted protocols.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs uppercase tracking-[0.25em] text-[#9c7442] hover:text-black font-semibold border-b border-[#9c7442]/40 pb-1 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Lord / Lady / Mr. / Ms."
                          className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                          Confidential Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@familyoffice.com"
                          className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                          Direct Phone / Signal / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                          Estate of Interest
                        </label>
                        <select
                          value={formData.property}
                          onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                          className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors cursor-pointer"
                        >
                          {VILLAS_LIST.map((villa) => (
                            <option key={villa} value={villa} className="bg-white text-neutral-900">
                              {villa}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                          Capital Allocation Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors cursor-pointer"
                        >
                          {BUDGET_TIERS.map((tier) => (
                            <option key={tier} value={tier} className="bg-white text-neutral-900">
                              {tier}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                          Acquisition Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors cursor-pointer"
                        >
                          <option value="Immediate (0-3 Months)" className="bg-white text-neutral-900">Immediate (0-3 Months)</option>
                          <option value="Within 6 Months" className="bg-white text-neutral-900">Within 6 Months</option>
                          <option value="Long Term / Horizon 2026-2027" className="bg-white text-neutral-900">Long Term / Horizon 2026-2027</option>
                          <option value="Private Research / Commission" className="bg-white text-neutral-900">Private Research / Commission</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold block">
                        Architectural Requirements & Special Directives
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please include specific requirements regarding privacy envelopes, helipads, subterranean galleries, or bespoke structural modifications..."
                        className="w-full bg-black/[0.03] border border-black/10 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9c7442] focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="nda"
                        checked={formData.ndaRequired}
                        onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                        className="rounded border-black/20 bg-black/[0.03] text-neutral-900 focus:ring-0 cursor-pointer w-4 h-4"
                      />
                      <label htmlFor="nda" className="text-xs text-neutral-600 cursor-pointer select-none">
                        Execute mutual bilateral Non-Disclosure Agreement (NDA) prior to releasing full architectural drawings & spatial coordinates.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-neutral-900 hover:bg-black text-white font-medium tracking-[0.2em] uppercase text-xs py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Encrypting & Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Private Inquiry</span>
                          <Send size={14} className="group-hover:translate-x-1 transition-transform text-[#e5c28a]" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column: Global Ateliers & Protocol (5 cols) */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 space-y-8"
            >
              {/* Direct Partner Desks */}
              <div className="bg-white/90 backdrop-blur-xl border border-black/[0.08] rounded-3xl p-8 space-y-6 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/[0.04] border border-black/10 flex items-center justify-center text-[#9c7442]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-neutral-900 font-medium">Direct Partner Desks</h3>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Always Available</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-black/[0.06]">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9c7442] font-semibold">Principal Acquisitions Desk</p>
                    <a
                      href="mailto:partner@villaatelier.luxury"
                      className="text-sm text-neutral-900 hover:text-black font-mono tracking-wide transition-colors font-medium"
                    >
                      partner@villaatelier.luxury
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9c7442] font-semibold">Private Family Offices & Trust</p>
                    <a
                      href="mailto:trust@villaatelier.luxury"
                      className="text-sm text-neutral-900 hover:text-black font-mono tracking-wide transition-colors font-medium"
                    >
                      trust@villaatelier.luxury
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9c7442] font-semibold">Encrypted Signal Concierge</p>
                    <p className="text-sm text-neutral-900 font-mono tracking-wide font-medium">
                      +81 90 7714 8820
                    </p>
                  </div>
                </div>
              </div>

              {/* Global Atelier Locations */}
              <div className="bg-white/90 backdrop-blur-xl border border-black/[0.08] rounded-3xl p-8 space-y-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/[0.04] border border-black/10 flex items-center justify-center text-[#9c7442]">
                      <Compass size={18} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-neutral-900 font-medium">Global Ateliers</h3>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Private Consultations</p>
                    </div>
                  </div>
                  <Building size={16} className="text-neutral-400" />
                </div>

                <div className="space-y-4 pt-2 border-t border-black/[0.06]">
                  {ATELIER_OFFICES.map((office) => (
                    <div key={office.city} className="group border-b border-black/[0.04] pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-neutral-900 group-hover:text-[#9c7442] transition-colors font-medium">
                          {office.city}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase">
                          {office.timezone}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600">{office.role}</p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-1">
                        <span>{office.address}</span>
                        <span className="text-[#9c7442] font-medium">{office.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protocols Alert */}
              <div className="border border-black/[0.08] bg-white/70 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <Clock size={18} className="text-[#9c7442] mt-0.5 shrink-0" />
                <div className="text-xs space-y-1">
                  <p className="text-neutral-900 font-medium">Bespoke Viewing Protocol</p>
                  <p className="text-neutral-600 leading-relaxed font-light">
                    Physical viewings are arranged via private helicopter or chartered transport with direct security clearance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Global Footer ──────────────────────────────────────────── */}
        <GlobalFooter />

      </div>
    </div>
  );
}
