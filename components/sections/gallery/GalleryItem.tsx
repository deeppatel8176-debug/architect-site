"use client";

import Image from "next/image";

interface GalleryItemProps {
  item: {
    id: number;
    image: string;
    title: string;
  };
}

export default function GalleryItem({ item }: GalleryItemProps) {
  return (
    <article className="group cursor-pointer overflow-hidden">

      <div className="relative aspect-[4/5] overflow-hidden">

        <Image
          src={item.image}
          alt={item.title}
          fill
          quality={100}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

      </div>

      <h3 className="mt-6 text-2xl font-light text-white">
        {item.title}
      </h3>

    </article>
  );
}