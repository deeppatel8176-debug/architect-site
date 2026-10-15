import { gsap, ScrollTrigger } from "@/lib/gsap";

export function parallax(
  image: Element,
  trigger: Element
) {
  return gsap.fromTo(
    image,
    {
      y: -80,
    },
    {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger,
        scrub: true,
      },
    }
  );
}