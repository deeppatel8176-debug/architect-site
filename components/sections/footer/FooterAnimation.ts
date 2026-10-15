import { gsap } from "@/lib/gsap";

export function footerAnimation(section: HTMLElement) {
  const ctx = gsap.context(() => {

    gsap.from(".footer-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });

  }, section);

  return () => ctx.revert();
}