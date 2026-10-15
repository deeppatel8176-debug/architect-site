import { gsap } from "@/lib/gsap";

export function manifestoAnimation(section: HTMLElement) {
  const ctx = gsap.context(() => {

    gsap.from(".manifesto-title", {
      y: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".manifesto-title",
        start: "top 80%",
      },
    });

    gsap.from(".manifesto-image", {
      y: 120,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".manifesto-image",
        start: "top 85%",
      },
    });

  }, section);

  return () => ctx.revert();
}