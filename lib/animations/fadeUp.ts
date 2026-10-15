import { gsap, ScrollTrigger } from "@/lib/gsap";

export function fadeUp(
  element: Element,
  trigger: Element,
  delay = 0
) {
  return gsap.fromTo(
    element,
    {
      y: 80,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: "top 75%",
      },
    }
  );
}