import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function projectsAnimation(
  section: HTMLElement,
  track: HTMLDivElement,
  setCurrent?: (index: number) => void
) {
  const ctx = gsap.context(() => {
    const slides = gsap.utils.toArray<HTMLElement>(".project-slide");

    const scrollDistance = () =>
      track.scrollWidth - window.innerWidth;

    const horizontalTween = gsap.to(track, {
      x: () => -scrollDistance(),
      ease: "none",

      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    slides.forEach((slide, index) => {
      const image = slide.querySelector(".project-image");
      const content = slide.querySelector(".project-content");
      const overlay = slide.querySelector(".project-overlay");

      if (setCurrent) {
        ScrollTrigger.create({
          trigger: slide,
          containerAnimation: horizontalTween,
          start: "left center",
          end: "right center",

          onEnter: () => setCurrent(index + 1),
          onEnterBack: () => setCurrent(index + 1),
        });
      }

      if (image) {
        gsap.fromTo(
          image,
          {
            scale: 1.25,
            clipPath: "inset(15% 15% 15% 15%)",
          },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",

            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      if (overlay) {
        gsap.fromTo(
          overlay,
          {
            opacity: 0.7,
          },
          {
            opacity: 0.35,
            ease: "none",

            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      if (content) {
        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",

            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    });

    ScrollTrigger.refresh();
  }, section);

  return () => ctx.revert();
}