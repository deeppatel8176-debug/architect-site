import { gsap } from "@/lib/gsap";

export function splitFade(element: HTMLElement) {
  const words = element.innerHTML.split(" ");

  element.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  gsap.from(".word", {
    opacity: 0,
    y: 40,
    stagger: 0.06,
    duration: 0.8,
    ease: "power3.out",
  });
}