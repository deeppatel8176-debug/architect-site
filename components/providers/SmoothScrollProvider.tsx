"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let reqId: number;
    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }

    reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}