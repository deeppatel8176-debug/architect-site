import { gsap } from "@/lib/gsap";

export function splitReveal(element: HTMLElement) {
  const text = element.textContent;

  if (!text) return;

  const words = text.split(" ");

  element.innerHTML = words
    .map(
      (word) =>
        `<span class="split-word"><span class="split-word-inner">${word}</span></span>`
    )
    .join(" ");

  const innerWords = element.querySelectorAll(".split-word-inner");

  gsap.set(innerWords, {
    yPercent: 110,
    opacity: 0,
  });

  gsap.to(innerWords, {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.08,
    ease: "power4.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
    },
  });
}