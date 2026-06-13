"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";

interface UseSectionRevealOptions {
  selector?: string;
  start?: string;
  stagger?: number;
}

export function useSectionReveal({
  selector = ".reveal",
  start = "top 85%",
  stagger = 0.12,
}: UseSectionRevealOptions = {}) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(selector, { opacity: 1, y: 0 });
        return;
      }

      ScrollTrigger.batch(selector, {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: "power3.out",
            overwrite: true,
          });
        },
        start,
        once: true,
      });
    },
    { scope: scopeRef, dependencies: [selector, start, stagger] },
  );

  return scopeRef;
}
