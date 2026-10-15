import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

let initialized = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !initialized) {
    gsap.registerPlugin(ScrollTrigger);
    initialized = true;
  }
}

export { gsap, ScrollTrigger };