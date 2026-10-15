"use client";

import Link from "next/link";
import Magnetic from "./Magnetic";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function MagneticButton({
  href,
  children,
}: Props) {
  return (
    <Magnetic className="inline-block">
      <Link
        href={href}
        className="
          group
          inline-flex
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          px-8
          py-4
          text-xs
          uppercase
          tracking-[0.35em]
          text-white
          transition-all
          duration-500
          hover:border-white
          hover:bg-white
          hover:text-black
        "
      >
        {children}
      </Link>
    </Magnetic>
  );
}