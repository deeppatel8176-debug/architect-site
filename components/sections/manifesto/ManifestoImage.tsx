"use client";

import Image from "next/image";

export default function ManifestoImage() {
  return (
    <div className="manifesto-image mt-40 overflow-hidden rounded-sm">

      <Image
        src="/images/manifesto.jpg"
        alt="Manifesto"
        width={1800}
        height={1200}
        className="w-full object-cover"
      />

    </div>
  );
}