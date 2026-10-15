import { gsap } from "@/lib/gsap";

export function galleryAnimation(section: HTMLElement) {
  const ctx = gsap.context(() => {
    gsap.from(".gallery-grid article", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
      },
    });
  }, section);

  return () => ctx.revert();
}