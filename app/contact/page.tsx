"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Clock,
  Send,
  ShieldCheck,
  Building,
} from "lucide-react";
import GlobalFooter from "@/components/ui/GlobalFooter";
import ShowcaseHeader from "@/components/ui/ShowcaseHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const STUDIO_LOCATIONS = [
  {
    region: "Principal Studio Atelier",
    location: "Ahmedabad / Surat, Gujarat, India",
    focus: "Architectural Design, Concept Massing & Construction Documentation",
    consultation: "By prior private appointment",
    hours: "Monday – Friday: 10:00 AM – 7:00 PM IST",
  },
  {
    region: "Virtual & Global Commissions",
    location: "Online Video & Interactive 3D BIM Consultation",
    focus: "Worldwide private client advisory, 3D digital twins & spatial planning",
    consultation: "Scheduled across international time zones",
    hours: "Flexible client coordination",
  },
];

const COMMISSION_CATEGORIES = [
  "Bespoke Villa Architecture",
  "Luxury Residence Interior Architecture",
  "Interactive 3D Digital Twin Simulation",
  "Residential Renovation & Remodeling",
  "Plot Feasibility & Preliminary Advisory",
];

const BUDGET_TIERS = [
  "Select a budget tier (Optional)",
  "₹50 Lakhs – ₹1.5 Crore",
  "₹1.5 Crore – ₹3 Crore",
  "₹3 Crore – ₹7 Crore",
  "₹7 Crore+",
  "To be determined during consultation",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: COMMISSION_CATEGORIES[0],
    location: "",
    approxArea: "",
    budgetRange: "",
    timeline: "Immediate (Next 1–2 months)",
    brief: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    inquiryId?: string;
    message?: string;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.location.trim()) errs.location = "Project location is required.";
    if (!formData.brief.trim()) {
      errs.brief = "Please provide a brief description of your project.";
    } else if (formData.brief.trim().length < 10) {
      errs.brief = "Brief must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmissionResult({
          success: false,
          message: data.error || "Submission failed. Please email us directly.",
        });
      } else {
        setSubmissionResult({
          success: true,
          inquiryId: data.inquiryId,
          message: data.message,
        });
      }
    } catch {
      setSubmissionResult({
        success: false,
        message: "Network error. Please try again or reach out to the studio directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f5f4f2] text-[#111111]">
      <ShowcaseHeader />

      <main className="pt-28 pb-20">
        <div
          style={{
            maxWidth: "1280px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
          }}
          className="w-full"
        >
          {/* Back Navigation Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Portfolio</span>
          </Link>

          {/* Page Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              Private Client Consultation Desk
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-[#111111] leading-tight">
              Initiate your architectural commission.
            </h1>

            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              Every commission begins with a focused discussion between client and studio directors. We review plot constraints, lifestyle requirements, and aesthetic direction to determine how our practice can best realize your vision.
            </p>
          </div>

          {/* 2-Column Grid: Form on Left, Studio Presence on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              {submissionResult?.success ? (
                <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    Reference: {submissionResult.inquiryId}
                  </span>

                  <h2 className="text-2xl font-semibold text-[#111111]">
                    Inquiry Received
                  </h2>

                  <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
                    Thank you, <span className="font-semibold text-neutral-900">{formData.name}</span>. Our studio principals will review your brief and contact you via <span className="underline font-semibold text-neutral-900">{formData.email}</span> within two business days.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionResult(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        projectType: COMMISSION_CATEGORIES[0],
                        location: "",
                        approxArea: "",
                        budgetRange: "",
                        timeline: "Immediate (Next 1–2 months)",
                        brief: "",
                        honeypot: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-6"
                  style={{
                    paddingLeft: "clamp(24px, 5vw, 44px)",
                    paddingRight: "clamp(24px, 5vw, 44px)",
                    paddingTop: "clamp(28px, 5vw, 40px)",
                    paddingBottom: "clamp(28px, 5vw, 40px)",
                  }}
                >
                  {/* Honeypot field for spam prevention */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_contact">Leave empty</label>
                    <input
                      id="hp_contact"
                      type="text"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                    />
                  </div>

                  {submissionResult?.success === false && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                      {submissionResult.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111111] bg-[#faf9f6] focus:bg-white focus:outline-none transition-colors ${
                          errors.name ? "border-red-400" : "border-black/10 focus:border-black"
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="c-email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111111] bg-[#faf9f6] focus:bg-white focus:outline-none transition-colors ${
                          errors.email ? "border-red-400" : "border-black/10 focus:border-black"
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-phone" className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Phone Number <span className="text-neutral-400">(Optional)</span>
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        placeholder="+91..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="c-type" className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Commission Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="c-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                      >
                        {COMMISSION_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-loc" className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Project Location / City <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-loc"
                        type="text"
                        required
                        placeholder="e.g. Ahmedabad, Surat, Mumbai"
                        value={formData.location}
                        onChange={(e) => {
                          setFormData({ ...formData, location: e.target.value });
                          if (errors.location) setErrors({ ...errors, location: "" });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111111] bg-[#faf9f6] focus:bg-white focus:outline-none transition-colors ${
                          errors.location ? "border-red-400" : "border-black/10 focus:border-black"
                        }`}
                      />
                      {errors.location && <p className="text-[11px] text-red-600 mt-1">{errors.location}</p>}
                    </div>

                    <div>
                      <label htmlFor="c-budget" className="block text-xs font-medium text-neutral-700 mb-1.5">
                        Budget Range <span className="text-neutral-400">(Optional)</span>
                      </label>
                      <select
                        id="c-budget"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                      >
                        {BUDGET_TIERS.map((tier) => (
                          <option key={tier} value={tier}>
                            {tier}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-brief" className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Project Brief <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="c-brief"
                      rows={5}
                      required
                      placeholder="Describe your site, spatial needs, design goals, or specific materials..."
                      value={formData.brief}
                      onChange={(e) => {
                        setFormData({ ...formData, brief: e.target.value });
                        if (errors.brief) setErrors({ ...errors, brief: "" });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111111] bg-[#faf9f6] focus:bg-white focus:outline-none transition-colors ${
                        errors.brief ? "border-red-400" : "border-black/10 focus:border-black"
                      }`}
                    />
                    {errors.brief && <p className="text-[11px] text-red-600 mt-1">{errors.brief}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-3.5 rounded-full bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Sending Brief...</span>
                      ) : (
                        <>
                          <span>Submit Architectural Brief</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Studio Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {STUDIO_LOCATIONS.map((loc, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-black/[0.08] shadow-2xs space-y-3"
                  style={{
                    paddingLeft: "26px",
                    paddingRight: "26px",
                    paddingTop: "24px",
                    paddingBottom: "24px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-neutral-600" />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                      {loc.region}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#111111]">
                    {loc.location}
                  </h3>

                  <p className="text-xs leading-relaxed text-neutral-600">
                    {loc.focus}
                  </p>

                  <div className="pt-3 border-t border-black/[0.05] space-y-1 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="font-mono text-[11px] text-neutral-400">
                      {loc.consultation}
                    </div>
                  </div>
                </div>
              ))}

              {/* Consultation Note */}
              <div
                className="rounded-3xl bg-[#faf9f6] border border-black/[0.08] text-xs text-neutral-600 leading-relaxed space-y-2"
                style={{
                  paddingLeft: "26px",
                  paddingRight: "26px",
                  paddingTop: "24px",
                  paddingBottom: "24px",
                }}
              >
                <span className="font-semibold text-neutral-900 block">Confidentiality Commitment</span>
                <p>
                  All architectural drawings, site coordinates, and private patron briefs shared with Siddhatva Design are held in strict professional confidence under standard non-disclosure practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
