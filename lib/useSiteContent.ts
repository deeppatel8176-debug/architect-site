"use client";

import { useState, useEffect } from "react";
import defaultContent from "@/data/site-content.json";

export type SiteContentType = typeof defaultContent;

const STORAGE_KEY = "siddhatva_site_content_v1";
const UPDATE_EVENT = "siddhatva_content_updated";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContentType>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return defaultContent;
  });

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch latest from API
    fetch("/api/admin/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && isMounted) {
          setContent(data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch (e) {}
        }
      })
      .catch(() => {});

    // 2. Listen for cross-tab or in-app updates
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setContent(e.detail);
      } else {
        // Read local storage
        try {
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached) setContent(JSON.parse(cached));
        } catch (e) {}
      }
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setContent(JSON.parse(e.newValue));
        } catch (err) {}
      }
    });

    return () => {
      isMounted = false;
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
    };
  }, []);

  const saveContent = async (newContent: SiteContentType) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: newContent }));
    } catch (e) {}

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContent),
    });
    return res.ok;
  };

  return { content, saveContent };
}
