import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";

export function heroAnimation(section: HTMLElement) {
  initGSAP();

  const ctx = gsap.context(() => {
    const image = section.querySelector(".hero-image");
    const content = section.querySelector(".hero-content");

    if (!image || !content) return;

    // Initial state
    gsap.set(image, {
      scale: 1.15,
      y: 0,
    });

    gsap.set(content, {
      y: 0,
      opacity: 1,
    });

    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Background image movement
    tl.to(
      image,
      {
        scale: 1,
        y: -80,
        ease: "none",
      },
      0
    );

    // Hero content movement
    tl.to(
      content,
      {
        y: -160,
        opacity: 0,
        ease: "none",
      },
      0
    );
  }, section);

  return () => {
    ctx.revert();
  };
}