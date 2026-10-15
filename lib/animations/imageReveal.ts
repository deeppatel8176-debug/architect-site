import { gsap, ScrollTrigger } from "@/lib/gsap";

export function imageReveal(
  image: Element,
  trigger: Element
) {
  gsap.set(image, {
    clipPath: "inset(15% 15% 15% 15%)",
    scale: 1.15,
  });

  return gsap.to(image, {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}