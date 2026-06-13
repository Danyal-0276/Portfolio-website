"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
  registered = true;
}

export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin };

export function scrollToSection(target: string) {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, "top 80px");
  } else {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
