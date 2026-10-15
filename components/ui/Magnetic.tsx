"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Magnetic({
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const move = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1,0.35)",
      });
    };

    element.addEventListener("mousemove", move);
    element.addEventListener("mouseleave", leave);

    return () => {
      element.removeEventListener("mousemove", move);
      element.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}