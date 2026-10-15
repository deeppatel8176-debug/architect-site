"use client";

import GalleryItem from "./GalleryItem";

const images = [
  {
    id: 1,
    image: "/images/gallery-1.jpg",
    title: "Modern Villa",
  },
  {
    id: 2,
    image: "/images/gallery-2.jpg",
    title: "Luxury Residence",
  },
  {
    id: 3,
    image: "/images/gallery-3.jpg",
    title: "Minimal Interior",
  },
  {
    id: 4,
    image: "/images/gallery-4.jpg",
    title: "Concrete House",
  },
];

export default function GalleryGrid() {
  return (
    <div className="gallery-grid mt-24 grid grid-cols-1 gap-8 md:grid-cols-2">
      {images.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
}