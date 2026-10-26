"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent, SiteContentType, WheelImageItem } from "@/lib/useSiteContent";
import defaultContent from "@/data/site-content.json";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  Inbox,
  Sparkles,
  ExternalLink,
  Save,
  Plus,
  Trash2,
  Search,
  Building2,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Compass,
  ArrowRight,
  Filter,
  Check,
  RefreshCw,
  FolderOpen,
  UploadCloud,
} from "lucide-react";

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  location: string;
  approxArea?: string;
  budgetRange?: string;
  timeline?: string;
  brief: string;
  status: "New" | "In Review" | "Contacted" | "Archived";
  createdAt: string;
  notes?: string;
}

const PRESET_VILLA_IMAGES = [
  {
    name: "Modern Monolith Villa",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Brutalist Concrete Pavilion",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Zen Teak & Glass Courtyard",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Cantilever Cliffside Estate",
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Subterranean Stone Haven",
    url: "/images/project-1.jpg",
  },
  {
    name: "Solaria Glass Villa",
    url: "/images/project-2.jpg",
  },
];

function DeviceImagePicker({
  value,
  onChange,
  label = "Upload Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
        }
      }
    } catch (err) {
      console.error("Device image upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
          }
        }}
        className={`group border-2 border-dashed rounded-xl p-2.5 flex items-center justify-between gap-3 transition-all ${
          dragActive
            ? "border-amber-500 bg-amber-50/70"
            : "border-black/[0.12] bg-neutral-50/80 hover:bg-neutral-100 hover:border-black/30"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-10 rounded-lg overflow-hidden bg-neutral-200 border border-black/[0.08] shrink-0 relative flex items-center justify-center">
            {value ? (
              <img src={value} alt="" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-4 h-4 text-neutral-400" />
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-neutral-800 block truncate">
              {isUploading ? "Uploading file from device..." : label}
            </span>
            <span className="text-[10.5px] font-mono text-neutral-400 truncate block">
              {value ? value : "No image selected"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
        >
          {isUploading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <UploadCloud className="w-3.5 h-3.5 text-amber-300" />
          )}
          <span>{isUploading ? "Uploading..." : "Browse Device"}</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setShowUrl(!showUrl)}
          className="text-[10.5px] text-neutral-500 hover:text-neutral-800 underline font-mono cursor-pointer"
        >
          {showUrl ? "Hide URL input" : "Or paste image URL"}
        </button>
      </div>

      {showUrl && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /images/..."
          className="w-full px-3 py-1.5 rounded-lg border border-black/[0.1] text-xs font-mono"
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  const { content, saveContent } = useSiteContent();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "entrance-card" | "estates" | "studio-images" | "gallery" | "wheel-images" | "inquiries"
  >("dashboard");

  // Local form states
  const [formData, setFormData] = useState<SiteContentType>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  // Sync content into formData on load, ensuring 17 wheelImages are populated
  useEffect(() => {
    if (content) {
      const merged = { ...content };
      if (!merged.wheelImages || merged.wheelImages.length < 17) {
        const source = (merged.galleryItems && merged.galleryItems.length > 0)
          ? merged.galleryItems
          : defaultContent.galleryItems;
        merged.wheelImages = Array.from({ length: 17 }).map((_, idx) => {
          const existing = merged.wheelImages?.[idx];
          if (existing) return existing;
          const gal = source[idx % source.length];
          return {
            id: `wheel-${idx + 1}`,
            src: gal?.src || defaultContent.wheelImages[idx % defaultContent.wheelImages.length].src,
            title: gal?.title || defaultContent.wheelImages[idx % defaultContent.wheelImages.length].title,
            category: gal?.category || defaultContent.wheelImages[idx % defaultContent.wheelImages.length].category,
          };
        });
      }
      setFormData(merged);
    }
  }, [content]);

  // Fetch Inquiries
  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleGlobalSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const ok = await saveContent(formData);
      if (ok) {
        setSaveMessage("All changes saved successfully! Live site updated.");
        setTimeout(() => setSaveMessage(null), 4000);
      } else {
        setSaveMessage("Error saving changes. Please check server.");
      }
    } catch (err) {
      setSaveMessage("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createMockInquiry = async () => {
    try {
      const mock = {
        name: "Devendra Singhania",
        email: "dsinghania@monarch-villas.com",
        phone: "+91 98201 11223",
        projectType: "Residential Architecture",
        location: "Khandala Escarpment, Maharashtra",
        approxArea: "12,000 sq.ft",
        budgetRange: "₹7 Crore+",
        timeline: "Immediate (Next 1–2 months)",
        brief: "Looking to commission a bespoke 4-bedroom cliffside estate with cantilevered basalt infinity pool, underground wine cellar, and integrated diurnal light automation.",
      };
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mock),
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.location.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.projectType.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus =
      inquiryStatusFilter === "All" || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#f3f2ee] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-white">
      {/* ── Left Sidebar Navigation ── */}
      <aside className="w-64 border-r border-black/[0.08] bg-white/95 flex flex-col justify-between p-6 shrink-0 z-20 backdrop-blur-md">
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-black/[0.08]">
            <div className="w-9 h-9 rounded-xl bg-[#111111] flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
              SD
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-[#111111]">
                Siddhatva Design
              </h1>
              <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Atelier CMS Portal
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "entrance-card", label: "First 3D Card", icon: Sparkles },
              { id: "estates", label: "Featured Estates", icon: Layers },
              { id: "studio-images", label: "Curated Space", icon: FolderOpen },
              { id: "gallery", label: "Gallery Archive", icon: ImageIcon },
              { id: "wheel-images", label: "3D Wheel (17 Photos)", icon: Compass },
              { id: "inquiries", label: "Inquiry Box (Leads)", icon: Inbox, badge: inquiries.filter((i) => i.status === "New").length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-neutral-500"}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-400 text-neutral-900">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Direct Live Site Link */}
        <div className="pt-6 border-t border-black/[0.08] flex flex-col gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </span>
            <span className="text-[10px] text-neutral-400">/</span>
          </Link>
          <div className="px-1 text-[11px] font-mono text-neutral-400">
            Director Access • v2.6
          </div>
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Floating App Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-black/[0.08]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold tracking-tight capitalize text-[#111111]">
              {activeTab === "entrance-card"
                ? "First 3D Entrance Card Management"
                : activeTab === "estates"
                ? "Featured Estates (Coverflow) Management"
                : activeTab === "studio-images"
                ? "Curated Space (Panoramic Studio) Images"
                : activeTab === "gallery"
                ? "Interior & Visual Gallery Management"
                : activeTab === "wheel-images"
                ? "Interactive 3D Wheel (17 Selected Photos)"
                : activeTab === "inquiries"
                ? "Client Inquiries & Project Briefs"
                : "Studio Executive Overview"}
            </h2>
            {saveMessage && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                {saveMessage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGlobalSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
            </button>
          </div>
        </header>

        {/* Tab Contents */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* ═════════ TAB 1: DASHBOARD OVERVIEW ═════════ */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider">New Inquiries</span>
                    <Inbox className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111111]">
                    {inquiries.filter((i) => i.status === "New").length}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {inquiries.length} total client inquiries
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider">Featured Estates</span>
                    <Layers className="w-4 h-4 text-neutral-700" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111111]">
                    {formData.featuredEstates?.length || 0}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    Active on 3D Coverflow
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider">Studio Spaces</span>
                    <FolderOpen className="w-4 h-4 text-neutral-700" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111111]">
                    {formData.studioImages?.length || 0}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    Curated Space collection
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider">Gallery Archive</span>
                    <ImageIcon className="w-4 h-4 text-neutral-700" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111111]">
                    {formData.galleryItems?.length || 0}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    High-res spatial studies
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider">3D Wheel Showcase</span>
                    <Compass className="w-4 h-4 text-neutral-700" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111111]">
                    17 / 17
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    Curated rotating studies
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 cols: Recent Inquiries */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-base font-semibold text-[#111111]">
                        Latest Client Inquiries
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Recent lead submissions from the website
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="text-xs font-medium text-neutral-800 hover:underline flex items-center gap-1"
                    >
                      View All Leads <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-[#111111] truncate">
                              {inq.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                                inq.status === "New"
                                  ? "bg-amber-100 text-amber-800"
                                  : inq.status === "In Review"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <div className="text-xs text-neutral-500 truncate mt-0.5">
                            {inq.projectType} • {inq.location}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-mono font-medium text-neutral-800">
                            {inq.budgetRange}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right col: Quick Shortcuts */}
                <div className="bg-white rounded-2xl border border-black/[0.08] p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-[#111111] mb-1">
                      Quick Shortcuts
                    </h3>
                    <p className="text-xs text-neutral-500 mb-5">
                      Direct management tools
                    </p>

                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={() => setActiveTab("entrance-card")}
                        className="flex items-center justify-between p-3 rounded-xl border border-black/[0.06] hover:bg-neutral-50 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-medium text-neutral-800">
                            Change Entrance 3D Card
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab("estates")}
                        className="flex items-center justify-between p-3 rounded-xl border border-black/[0.06] hover:bg-neutral-50 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Layers className="w-4 h-4 text-neutral-700" />
                          <span className="text-xs font-medium text-neutral-800">
                            Update Coverflow Estates
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab("studio-images")}
                        className="flex items-center justify-between p-3 rounded-xl border border-black/[0.06] hover:bg-neutral-50 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-neutral-700" />
                          <span className="text-xs font-medium text-neutral-800">
                            Manage Curated Space
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab("wheel-images")}
                        className="flex items-center justify-between p-3 rounded-xl border border-black/[0.06] hover:bg-neutral-50 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Compass className="w-4 h-4 text-amber-700" />
                          <span className="text-xs font-medium text-neutral-800">
                            Set 17 Images for 3D Wheel
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-black/[0.06]">
                    <button
                      onClick={createMockInquiry}
                      className="w-full py-2.5 rounded-xl border border-dashed border-black/20 text-xs font-mono text-neutral-600 hover:text-black hover:border-black/40 transition-colors"
                    >
                      + Generate Test Client Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 2: FIRST 3D TILT CARD MANAGER ═════════ */}
          {activeTab === "entrance-card" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Controls (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-[#111111]">
                    First Card Configuration
                  </h3>
                  <p className="text-xs text-neutral-500">
                    This is the interactive 3D Tilt Card shown before visitors enter the site.
                  </p>
                </div>

                {/* Hero Image Section */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                    Card Hero Image (Browse from Device or Pick Preset)
                  </label>
                  <DeviceImagePicker
                    value={formData.entranceCard.image}
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        entranceCard: { ...formData.entranceCard, image: url },
                      })
                    }
                    label="Entrance Card Cover"
                  />

                  {/* Preset Villa Photo Pickers */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-neutral-500 block mb-2">
                      Choose from Curated Architectural Presets:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PRESET_VILLA_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              entranceCard: { ...formData.entranceCard, image: preset.url },
                            })
                          }
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                            formData.entranceCard.image === preset.url
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-black/[0.08] bg-neutral-50 hover:bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />
                          <span className="text-[11px] font-medium leading-tight truncate">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Text & Meta Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Photo Tag / Estate Name
                    </label>
                    <input
                      type="text"
                      value={formData.entranceCard.estateName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceCard: { ...formData.entranceCard, estateName: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Top Badge Chip
                    </label>
                    <input
                      type="text"
                      value={formData.entranceCard.badge}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceCard: { ...formData.entranceCard, badge: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Main Card Title
                    </label>
                    <input
                      type="text"
                      value={formData.entranceCard.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceCard: { ...formData.entranceCard, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Button Action Text
                    </label>
                    <input
                      type="text"
                      value={formData.entranceCard.buttonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceCard: { ...formData.entranceCard, buttonText: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Location Spec
                    </label>
                    <input
                      type="text"
                      value={formData.entranceCard.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceCard: { ...formData.entranceCard, location: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Category Spec
                    </label>
                    <input
                      type="text"
                      value={formData.entranceCard.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceCard: { ...formData.entranceCard, category: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                    Card Description / Creed
                  </label>
                  <textarea
                    rows={3}
                    value={formData.entranceCard.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        entranceCard: { ...formData.entranceCard, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleGlobalSave}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
                  >
                    <Save className="w-3.5 h-3.5 text-amber-300" />
                    <span>Save Entrance Card</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Interactive 3D Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="mb-3 flex items-center justify-between w-full px-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                    Live 3D Tilt Preview
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Move cursor to tilt
                  </span>
                </div>

                {/* 3D Tilt Card Preview Container */}
                <div className="w-full max-w-[420px] rounded-3xl p-6 bg-[#f5f4f2] border border-black/[0.08] shadow-inner flex items-center justify-center">
                  <TiltCard
                    tiltLimit={14}
                    scale={1.03}
                    perspective={1400}
                    effect="evade"
                    spotlight={true}
                    className="group relative w-full rounded-3xl border border-black/[0.09] bg-white/95 p-6 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.12)] transition-all duration-300"
                  >
                    <div className="relative z-20 flex flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#111111]/[0.04] px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-neutral-800">
                          <Sparkles className="h-3 w-3 text-amber-700" />
                          {formData.entranceCard.badge}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">
                          {formData.entranceCard.year}
                        </span>
                      </div>

                      <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-neutral-100 shadow-sm">
                        <img
                          src={formData.entranceCard.image}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/90 px-2 py-0.5 text-[10px] font-mono text-neutral-900 shadow-xs">
                          <Building2 className="h-3 w-3 text-neutral-800" />
                          <span>{formData.entranceCard.estateName}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-semibold tracking-tight text-[#111111]">
                        {formData.entranceCard.title}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                        {formData.entranceCard.description}
                      </p>

                      <div className="my-4 grid grid-cols-2 gap-2 border-y border-black/[0.08] py-2.5 text-[11px] font-mono text-neutral-700">
                        <div className="flex items-center gap-1.5 truncate">
                          <Compass className="h-3 w-3 text-neutral-900 shrink-0" />
                          <span className="truncate">{formData.entranceCard.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Layers className="h-3 w-3 text-neutral-900 shrink-0" />
                          <span className="truncate">{formData.entranceCard.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-[#111111] px-4 py-3 text-white">
                        <span className="text-xs font-medium">
                          {formData.entranceCard.buttonText}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 3: FEATURED ESTATES (COVERFLOW) ═════════ */}
          {activeTab === "estates" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[#111111]">
                    Featured Estates & Coverflow Carousel
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Change images and details for the estates shown in the 3D coverflow carousel.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newEstate = {
                      id: `estate-${Date.now()}`,
                      villaId: `villa-${formData.featuredEstates.length + 1}`,
                      number: `0${formData.featuredEstates.length + 1}`,
                      name: "New Architectural Estate",
                      location: "Mumbai, MH",
                      category: "Residential Architecture",
                      image: "/images/project-1.jpg",
                    };
                    setFormData({
                      ...formData,
                      featuredEstates: [...formData.featuredEstates, newEstate],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Estate</span>
                </button>
              </div>

              {/* Estates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.featuredEstates.map((estate, idx) => (
                  <div
                    key={estate.id || idx}
                    className="bg-white rounded-2xl border border-black/[0.08] p-5 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      {/* Image Thumbnail */}
                      <div className="w-32 h-24 rounded-xl overflow-hidden bg-neutral-100 border border-black/[0.08] shrink-0">
                        <img
                          src={estate.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Fields */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-neutral-500">
                            Estate #{estate.number}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.featuredEstates.filter(
                                (_, i) => i !== idx
                              );
                              setFormData({ ...formData, featuredEstates: updated });
                            }}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                            title="Remove Estate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={estate.name}
                          onChange={(e) => {
                            const updated = [...formData.featuredEstates];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, featuredEstates: updated });
                          }}
                          placeholder="Estate Name"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs font-semibold"
                        />

                        <input
                          type="text"
                          value={estate.location}
                          onChange={(e) => {
                            const updated = [...formData.featuredEstates];
                            updated[idx].location = e.target.value;
                            setFormData({ ...formData, featuredEstates: updated });
                          }}
                          placeholder="Location (e.g. Alibaug Coast)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs font-mono text-neutral-600"
                        />
                      </div>
                    </div>

                    {/* Device Image Picker */}
                    <div className="pt-1">
                      <DeviceImagePicker
                        value={estate.image}
                        onChange={(url) => {
                          const updated = [...formData.featuredEstates];
                          updated[idx].image = url;
                          setFormData({ ...formData, featuredEstates: updated });
                        }}
                        label={`Estate #${estate.number} Photo`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════ TAB 4: CURATED SPACE (STUDIO IMAGES) ═════════ */}
          {activeTab === "studio-images" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[#111111]">
                    Curated Space (Panoramic Studio Gallery)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Manage photography displayed across the panoramic 3D unspooling collection.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newStudio = {
                      id: `studio-${Date.now()}`,
                      src: "/images/studio/project-interior-1.jpeg",
                      title: "New Studio Interior Space",
                      room: "Living Lounge",
                      subtitle: "Bespoke spatial design",
                    };
                    setFormData({
                      ...formData,
                      studioImages: [...formData.studioImages, newStudio],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Studio Photo</span>
                </button>
              </div>

              {/* Studio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {formData.studioImages.map((studio, idx) => (
                  <div
                    key={studio.id || idx}
                    className="bg-white rounded-2xl border border-black/[0.08] p-4 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-100 border border-black/[0.08]">
                      <img
                        src={studio.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                        {studio.room || "Room"}
                      </span>
                      <button
                        onClick={() => {
                          const updated = formData.studioImages.filter((_, i) => i !== idx);
                          setFormData({ ...formData, studioImages: updated });
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-neutral-700 hover:text-red-600 transition-colors shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={studio.title}
                        onChange={(e) => {
                          const updated = [...formData.studioImages];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, studioImages: updated });
                        }}
                        placeholder="Space Title"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs font-semibold"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={studio.room}
                          onChange={(e) => {
                            const updated = [...formData.studioImages];
                            updated[idx].room = e.target.value;
                            setFormData({ ...formData, studioImages: updated });
                          }}
                          placeholder="Room type"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-[11px] font-mono"
                        />
                        <input
                          type="text"
                          value={studio.subtitle || ""}
                          onChange={(e) => {
                            const updated = [...formData.studioImages];
                            updated[idx].subtitle = e.target.value;
                            setFormData({ ...formData, studioImages: updated });
                          }}
                          placeholder="Subtitle"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-[11px]"
                        />
                      </div>

                      <div className="pt-1">
                        <DeviceImagePicker
                          value={studio.src}
                          onChange={(url) => {
                            const updated = [...formData.studioImages];
                            updated[idx].src = url;
                            setFormData({ ...formData, studioImages: updated });
                          }}
                          label="Studio Space Photo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════ TAB 5: GALLERY ARCHIVE ═════════ */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[#111111]">
                    Visual Archive & Interior Gallery
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Manage the main visual archive images, categories, and architectural notes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newItem = {
                      id: `gal-${Date.now()}`,
                      src: "/images/studio/project-interior-1.jpeg",
                      title: "New Architectural Study",
                      category: "Living Spaces",
                      description: "Custom architectural details and natural material craftsmanship.",
                    };
                    setFormData({
                      ...formData,
                      galleryItems: [...formData.galleryItems, newItem as any],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Gallery Photo</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-amber-800" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900">
                      Interactive 3D Wheel: Exactly 17 Images Configured
                    </h4>
                    <p className="text-[11.5px] text-neutral-600">
                      The rotating 3D circular wheel displays 17 curated images from your gallery. You can customize the exact 17 slots directly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("wheel-images")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-300" />
                  <span>Configure 17 Wheel Photos</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.galleryItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-2xl border border-black/[0.08] p-4 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="relative h-48 rounded-xl overflow-hidden bg-neutral-100 border border-black/[0.08]">
                      <img
                        src={item.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.galleryItems.filter((_, i) => i !== idx);
                          setFormData({ ...formData, galleryItems: updated });
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-neutral-700 hover:text-red-600 transition-colors shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formData.galleryItems];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, galleryItems: updated });
                        }}
                        placeholder="Image Title"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs font-semibold"
                      />

                      <div>
                        <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                          Category
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...formData.galleryItems];
                            (updated[idx] as any).category = e.target.value;
                            setFormData({ ...formData, galleryItems: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-[11px] font-mono bg-white"
                        >
                          <option value="Living Spaces">Living Spaces</option>
                          <option value="Bedrooms">Bedrooms</option>
                          <option value="Kitchens & Dining">Kitchens & Dining</option>
                          <option value="Bathrooms">Bathrooms</option>
                          <option value="Exterior Architecture">Exterior Architecture</option>
                          <option value="3D Visualizations">3D Visualizations</option>
                        </select>
                      </div>

                      <div className="pt-1">
                        <DeviceImagePicker
                          value={item.src}
                          onChange={(url) => {
                            const updated = [...formData.galleryItems];
                            updated[idx].src = url;
                            setFormData({ ...formData, galleryItems: updated });
                          }}
                          label="Gallery Image Photo"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...formData.galleryItems];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, galleryItems: updated });
                        }}
                        placeholder="Architectural note / description"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs text-neutral-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════ TAB 6: 3D WHEEL IMAGES (17 IMAGES ONLY) ═════════ */}
          {activeTab === "wheel-images" && (() => {
            const wheelList: WheelImageItem[] = (formData.wheelImages && formData.wheelImages.length === 17)
              ? (formData.wheelImages as WheelImageItem[])
              : Array.from({ length: 17 }).map((_, idx) => {
                  const existing = formData.wheelImages?.[idx];
                  if (existing) return existing;
                  const gal = formData.galleryItems?.[idx % (formData.galleryItems?.length || 1)];
                  return {
                    id: `wheel-${idx + 1}`,
                    src: gal?.src || defaultContent.wheelImages[idx % defaultContent.wheelImages.length].src,
                    title: gal?.title || defaultContent.wheelImages[idx % defaultContent.wheelImages.length].title,
                    category: gal?.category || defaultContent.wheelImages[idx % defaultContent.wheelImages.length].category,
                  };
                });

            const updateSlot = (idx: number, updates: Partial<WheelImageItem>) => {
              const updated = [...wheelList];
              updated[idx] = { ...updated[idx], ...updates };
              setFormData({ ...formData, wheelImages: updated });
            };

            const syncFromGallery = () => {
              if (!formData.galleryItems || formData.galleryItems.length === 0) return;
              const synced: WheelImageItem[] = Array.from({ length: 17 }).map((_, idx) => {
                const item = formData.galleryItems[idx % formData.galleryItems.length];
                return {
                  id: `wheel-${idx + 1}`,
                  src: item.src,
                  title: item.title,
                  category: item.category,
                };
              });
              setFormData({ ...formData, wheelImages: synced });
              setSaveMessage("Populated all 17 3D wheel slots from current Gallery Archive photos!");
              setTimeout(() => setSaveMessage(null), 4000);
            };

            const resetToCurated = () => {
              setFormData({ ...formData, wheelImages: defaultContent.wheelImages });
              setSaveMessage("Reset 17 3D wheel photos to the default curated set.");
              setTimeout(() => setSaveMessage(null), 4000);
            };

            return (
              <div className="space-y-6">
                {/* Header Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-neutral-100 py-1 px-3 text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Strictly 17 Images Active in 3D Wheel
                    </div>
                    <h3 className="text-lg font-semibold text-[#111111]">
                      Interactive 3D Wheel Showcase (17 Spatial Studies)
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
                      The 3D rotating wheel before entering the gallery grid showcases exactly 17 images.
                      Select from your Gallery Archive or customize each slot with your own images and titles below.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={syncFromGallery}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#111111] text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                      <span>Auto-Fill 17 from Gallery</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetToCurated}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono border border-black/[0.1] bg-white text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <span>Reset to Curated 17</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Quick-Thumb Strip */}
                <div className="bg-white p-4 rounded-2xl border border-black/[0.08] shadow-xs overflow-x-auto">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>17 Active Wheel Slots Preview Strip</span>
                    <span className="text-emerald-700 font-semibold">17 / 17 Filled</span>
                  </div>
                  <div className="flex items-center gap-2.5 min-w-max pb-1">
                    {wheelList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-1 p-1.5 rounded-xl border border-black/[0.08] bg-neutral-50 hover:bg-neutral-100 transition-colors"
                      >
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-neutral-200 border border-black/10 relative">
                          <img
                            src={item.src}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] font-mono text-white text-center py-0.5">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 17 Detailed Slot Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wheelList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-white rounded-2xl border border-black/[0.08] p-4 shadow-xs flex flex-col justify-between space-y-3.5 hover:border-black/20 transition-all"
                    >
                      {/* Slot Header */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#111111] text-white">
                          Slot #{String(idx + 1).padStart(2, '0')} / 17
                        </span>
                        <span className="text-[10.5px] font-mono text-neutral-400">
                          Interactive 3D Wheel
                        </span>
                      </div>

                      {/* Image Thumbnail Preview */}
                      <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-100 border border-black/[0.08]">
                        <img
                          src={item.src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono truncate max-w-[85%]">
                          {item.category}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="space-y-2.5">
                        {/* Pick from Gallery Dropdown */}
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-600 font-medium mb-1">
                            Choose from Gallery Photos:
                          </label>
                          <select
                            value={item.src}
                            onChange={(e) => {
                              const chosen = formData.galleryItems?.find((g) => g.src === e.target.value);
                              if (chosen) {
                                updateSlot(idx, {
                                  src: chosen.src,
                                  title: chosen.title,
                                  category: chosen.category,
                                });
                              } else if (e.target.value) {
                                updateSlot(idx, { src: e.target.value });
                              }
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.1] text-xs font-mono bg-neutral-50 hover:bg-white transition-colors"
                          >
                            <option value="">-- Or choose from Gallery --</option>
                            {formData.galleryItems?.map((gal, gIdx) => (
                              <option key={gal.id || gIdx} value={gal.src}>
                                #{gIdx + 1}: {gal.title} ({gal.category})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Title input */}
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-600 font-medium mb-1">
                            Card Title:
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateSlot(idx, { title: e.target.value })}
                            placeholder="Architectural Study Title"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-xs font-semibold"
                          />
                        </div>

                        {/* Category Selector */}
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-600 font-medium mb-1">
                            Category:
                          </label>
                          <select
                            value={item.category}
                            onChange={(e) => updateSlot(idx, { category: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.08] text-[11px] font-mono bg-white"
                          >
                            <option value="Living Spaces">Living Spaces</option>
                            <option value="Bedrooms">Bedrooms</option>
                            <option value="Kitchens & Dining">Kitchens & Dining</option>
                            <option value="Bathrooms">Bathrooms</option>
                            <option value="Exterior Architecture">Exterior Architecture</option>
                            <option value="3D Visualizations">3D Visualizations</option>
                          </select>
                        </div>

                        {/* Device Image Picker */}
                        <div className="pt-1">
                          <DeviceImagePicker
                            value={item.src}
                            onChange={(url) => updateSlot(idx, { src: url })}
                            label={`Slot #${idx + 1} Image`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ═════════ TAB 6: INQUIRY BOX (LEADS CRM) ═════════ */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-[#111111]">
                    Client Inquiries &amp; Lead Management
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Review and update client project briefs received through the Start a Project form.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={createMockInquiry}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border border-black/[0.1] bg-white hover:bg-neutral-50 text-neutral-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-600" />
                    <span>+ New Sample Lead</span>
                  </button>
                  <button
                    onClick={fetchInquiries}
                    className="p-2 rounded-xl border border-black/[0.1] bg-white hover:bg-neutral-50 text-neutral-700 transition-colors"
                    title="Refresh Inquiries"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInquiries ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-2xl border border-black/[0.08] shadow-xs flex flex-wrap items-center justify-between gap-4">
                {/* Search */}
                <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by client name, email, location..."
                    className="w-full text-xs bg-transparent focus:outline-none"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5">
                  {["All", "New", "In Review", "Contacted", "Archived"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setInquiryStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        inquiryStatusFilter === status
                          ? "bg-[#111111] text-white"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table / List */}
              <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/70 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Project Scope</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Budget / Timeline</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-xs">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono">
                            No client inquiries found matching current filters.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            className="hover:bg-neutral-50/80 transition-colors cursor-pointer"
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-[#111111]">{inq.name}</div>
                              <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5 mt-0.5">
                                <Mail className="w-3 h-3" />
                                {inq.email}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-medium text-neutral-800">{inq.projectType}</div>
                              {inq.approxArea && (
                                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                                  {inq.approxArea}
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-neutral-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-neutral-400" />
                                {inq.location}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-mono font-medium text-neutral-800">
                                {inq.budgetRange || "Not specified"}
                              </div>
                              <div className="text-[11px] text-neutral-500 mt-0.5">
                                {inq.timeline || "Exploratory"}
                              </div>
                            </td>

                            <td
                              className="py-3.5 px-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <select
                                value={inq.status}
                                onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border cursor-pointer ${
                                  inq.status === "New"
                                    ? "bg-amber-100 border-amber-200 text-amber-800"
                                    : inq.status === "In Review"
                                    ? "bg-blue-100 border-blue-200 text-blue-800"
                                    : inq.status === "Contacted"
                                    ? "bg-emerald-100 border-emerald-200 text-emerald-800"
                                    : "bg-neutral-100 border-neutral-200 text-neutral-700"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="In Review">In Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>

                            <td
                              className="py-3.5 px-4 text-right"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="px-2.5 py-1 rounded-lg border border-black/[0.08] text-[11px] font-medium hover:bg-neutral-100 transition-colors"
                                >
                                  Inspect Brief
                                </button>
                                <button
                                  onClick={() => deleteInquiry(inq.id)}
                                  className="p-1 rounded-lg text-neutral-400 hover:text-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiry Brief Details Modal */}
              <AnimatePresence>
                {selectedInquiry && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl border border-black/[0.1] max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6"
                    >
                      <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-[#111111]">
                              {selectedInquiry.name}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-neutral-100 text-neutral-700">
                              {selectedInquiry.status}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-neutral-500 mt-0.5">
                            ID: {selectedInquiry.id} • {new Date(selectedInquiry.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="text-neutral-400 hover:text-neutral-800 text-sm font-mono p-1"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Contact metadata */}
                      <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-3.5 rounded-xl border border-black/[0.05]">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-neutral-400 block">Email</span>
                          <span className="font-mono text-neutral-800 select-all">{selectedInquiry.email}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-neutral-400 block">Phone</span>
                          <span className="font-mono text-neutral-800">{selectedInquiry.phone || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-neutral-400 block">Location</span>
                          <span className="font-mono text-neutral-800">{selectedInquiry.location}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-neutral-400 block">Budget Tier</span>
                          <span className="font-mono text-neutral-800">{selectedInquiry.budgetRange || "N/A"}</span>
                        </div>
                      </div>

                      {/* Client Brief */}
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                          Architectural Brief
                        </span>
                        <div className="p-4 rounded-xl bg-neutral-100/70 border border-neutral-200 text-xs leading-relaxed text-neutral-800">
                          {selectedInquiry.brief}
                        </div>
                      </div>

                      {/* Status changer & Close */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neutral-500">Status:</span>
                          <select
                            value={selectedInquiry.status}
                            onChange={(e) => updateInquiryStatus(selectedInquiry.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-black/[0.1] text-xs font-mono bg-white cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>

                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="px-5 py-2 rounded-xl bg-[#111111] text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                        >
                          Close Dossier
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
