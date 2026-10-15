import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";

export function showcaseAnimation(section: HTMLElement) {
  initGSAP();

  const image = section.querySelector(".showcase-image");
  const content = section.querySelector(".showcase-content");

  if (!image || !content) return;

  gsap.set(image, {
    clipPath: "inset(15% 15% 15% 15%)",
    scale: 1.15,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  tl.to(image, {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    ease: "none",
  });

  tl.fromTo(
    content,
    {
      opacity: 0,
      y: 80,
    },
    {
      opacity: 1,
      y: 0,
      ease: "none",
    },
    0.2
  );

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });
  };
}