"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PROJECT_TYPES = [
  "Residential Architecture",
  "Commercial Architecture",
  "Interior Design",
  "3D Visualization",
  "Renovation & Remodeling",
  "Other Architectural Scope",
];

const BUDGET_RANGES = [
  "Select a budget tier (Optional)",
  "₹50 Lakhs – ₹1.5 Crore",
  "₹1.5 Crore – ₹3 Crore",
  "₹3 Crore – ₹7 Crore",
  "₹7 Crore+",
  "To be determined during consultation",
];

const TIMELINE_OPTIONS = [
  "Select anticipated timeline (Optional)",
  "Immediate (Next 1–2 months)",
  "Within 3–6 months",
  "Within 6–12 months",
  "Exploratory / Feasibility phase",
];

export default function StartProjectSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: PROJECT_TYPES[0],
    location: "",
    approxArea: "",
    budgetRange: "",
    timeline: "",
    brief: "",
    honeypot: "", // hidden spam field
    consent: true,
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
      errs.brief = "Project brief must be at least 10 characters.";
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
          message: data.error || "Submission failed. Please verify your details or email the studio directly.",
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
        message: "Network error. Please verify your connection or reach out to the studio directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#f5f4f2] text-[#111111] font-sans overflow-hidden border-t border-black/[0.07]"
      style={{
        paddingTop: "7rem",
        paddingBottom: "8rem",
      }}
    >
      {/* Background Architectural Ambient Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "960px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 px-3.5 text-[12px] font-mono uppercase tracking-widest text-neutral-600 shadow-2xs backdrop-blur-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            Private Commission & Consultation
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111111] tracking-[-0.04em] leading-tight"
          >
            Start your project with Siddhatva Design.
          </h2>

          <p className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed max-w-xl">
            Whether you are commissioning a new luxury residence, interior transformation, or 3D spatial simulation, share your brief below to initiate a private consultation with our principals.
          </p>
        </div>

        {/* Form Container */}
        {submissionResult?.success ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="p-8 sm:p-14 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Inquiry Ref
              </span>
              <span className="text-xs font-mono font-semibold bg-neutral-100 px-2.5 py-0.5 rounded text-neutral-800">
                {submissionResult.inquiryId}
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-[#111111] tracking-tight">
              Inquiry Successfully Received
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
              Thank you, <span className="font-semibold text-neutral-900">{formData.name}</span>. Our architectural design directors will review your project brief for <span className="font-semibold text-neutral-900">{formData.location}</span> and reach out via <span className="underline font-semibold text-neutral-900">{formData.email}</span> within two business days.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmissionResult(null);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  projectType: PROJECT_TYPES[0],
                  location: "",
                  approxArea: "",
                  budgetRange: "",
                  timeline: "",
                  brief: "",
                  honeypot: "",
                  consent: true,
                });
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-6"
            style={{
              paddingLeft: "clamp(24px, 5vw, 48px)",
              paddingRight: "clamp(24px, 5vw, 48px)",
              paddingTop: "clamp(28px, 5vw, 44px)",
              paddingBottom: "clamp(28px, 5vw, 44px)",
            }}
          >
            {/* Honeypot field (hidden from real users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp_field">Do not fill this field</label>
              <input
                id="hp_field"
                type="text"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Error Banner */}
            {submissionResult?.success === false && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{submissionResult.message}</span>
              </div>
            )}

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inquiry-name" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  placeholder="e.g. Aarav Mehta"
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
                <label htmlFor="inquiry-email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-email"
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

            {/* Row 2: Phone & Project Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inquiry-phone" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Phone Number <span className="text-neutral-400">(Optional)</span>
                </label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inquiry-type" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="inquiry-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Location & Approx Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inquiry-location" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Project Location / City <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-location"
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
                <label htmlFor="inquiry-area" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Approximate Built-up Area <span className="text-neutral-400">(Optional)</span>
                </label>
                <input
                  id="inquiry-area"
                  type="text"
                  placeholder="e.g. 8,500 sq.ft or 3-BHK"
                  value={formData.approxArea}
                  onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                />
              </div>
            </div>

            {/* Row 4: Budget Range & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inquiry-budget" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Budget Expectation <span className="text-neutral-400">(Optional)</span>
                </label>
                <select
                  id="inquiry-budget"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="inquiry-timeline" className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Anticipated Start Timeline <span className="text-neutral-400">(Optional)</span>
                </label>
                <select
                  id="inquiry-timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#faf9f6] focus:bg-white focus:border-black focus:outline-none text-sm text-[#111111] transition-colors"
                >
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Brief */}
            <div>
              <label htmlFor="inquiry-brief" className="block text-xs font-medium text-neutral-700 mb-1.5">
                Project Brief & Aspirations <span className="text-red-500">*</span>
              </label>
              <textarea
                id="inquiry-brief"
                rows={4}
                required
                placeholder="Share your vision, spatial requirements, plot characteristics, or specific architectural features you envision..."
                value={formData.brief}
                onChange={(e) => {
                  setFormData({ ...formData, brief: e.target.value });
                  if (errors.brief) setErrors({ ...errors, brief: "" });
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111111] bg-[#faf9f6] focus:bg-white focus:outline-none transition-colors resize-y ${
                  errors.brief ? "border-red-400" : "border-black/10 focus:border-black"
                }`}
              />
              {errors.brief && <p className="text-[11px] text-red-600 mt-1">{errors.brief}</p>}
            </div>

            {/* Consent & Privacy Notice */}
            <div className="pt-2 text-xs text-neutral-500 leading-relaxed">
              We respect your privacy. Project briefs and personal information are treated confidentially and never shared with third parties.
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto rounded-full bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                style={{
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  paddingTop: "14px",
                  paddingBottom: "14px",
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Submitting Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Discuss Your Project</span>
                    <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <Link
                href="/contact"
                className="text-xs font-medium text-neutral-600 hover:text-black transition-colors"
              >
                Or visit the Contact Studio page →
              </Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
