import { gsap } from "@/lib/gsap";

export function projectParallax(slide: HTMLElement) {
  const image = slide.querySelector(".project-image");

  if (!image) return;

  const move = (event: MouseEvent) => {
    const rect = slide.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(image, {
      x: x * 30,
      y: y * 30,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const leave = () => {
    gsap.to(image, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  slide.addEventListener("mousemove", move);
  slide.addEventListener("mouseleave", leave);

  return () => {
    slide.removeEventListener("mousemove", move);
    slide.removeEventListener("mouseleave", leave);
  };
}