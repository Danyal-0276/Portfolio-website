"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePortfolioAnimations<T extends HTMLElement>(
  root: RefObject<T | null>,
  motion: boolean,
) {
  useGSAP(
    () => {
      if (!motion) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".page-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "max",
            scrub: 0.2,
          },
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", root.current)
          .forEach((element) => {
            gsap.from(element, {
              y: 34,
              opacity: 0,
              duration: 0.85,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
        gsap.fromTo(
          ".campus-image",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".campus-chapter",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.from(".research-result", {
          rotate: -5,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".research-section",
            start: "top 75%",
            once: true,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(".section-heading h2, .contact-heading h2")
          .forEach((heading) => {
            gsap.from(heading, {
              clipPath: "inset(0 0 100% 0)",
              y: 35,
              duration: 1,
              scrollTrigger: { trigger: heading, start: "top 90%", once: true },
            });
          });
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true },
  );
}
