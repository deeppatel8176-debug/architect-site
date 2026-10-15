"use client";

import { useEffect, useRef, useState } from "react";
import { preloaderAnimation } from "./PreloaderAnimation";

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!loaderRef.current) return;

    preloaderAnimation(loaderRef.current, () => {
      setVisible(false);
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <h1 className="loader-title text-5xl font-extralight tracking-[0.35em] text-white md:text-7xl">
          LUXURY
        </h1>

        <p className="loader-subtitle mt-4 text-sm uppercase tracking-[0.5em] text-white/50">
          Architecture Studio
        </p>
      </div>
    </div>
  );
}