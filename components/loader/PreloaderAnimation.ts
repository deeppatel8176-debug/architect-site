import { gsap, initGSAP } from "@/lib/gsap";

export function preloaderAnimation(
  loader: HTMLDivElement,
  onComplete: () => void
) {
  initGSAP();

  const title = loader.querySelector(".loader-title");
  const subtitle = loader.querySelector(".loader-subtitle");

  const tl = gsap.timeline({
    onComplete: () => {
      onComplete();
    },
  });

  tl.fromTo(
    title,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }
  )
    .fromTo(
      subtitle,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to({}, { duration: 0.6 })
    .to(loader, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    });
}