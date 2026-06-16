"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";

export function AuroraBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stainRef = useRef<HTMLDivElement>(null);
  const pointerSmooth = useRef({ x: 0.5, y: 0.5 });

  useGSAP(
    () => {
      registerGSAP();
      const stain = stainRef.current;
      if (!stain) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const placeStain = () => {
        const { x, y } = pointerSmooth.current;
        const w = window.innerWidth;
        const h = window.innerHeight;
        gsap.set(stain, {
          x: x * w,
          y: y * h,
          xPercent: -50,
          yPercent: -50,
        });
      };

      placeStain();

      if (prefersReducedMotion) return;

      const moveX = gsap.quickTo(pointerSmooth.current, "x", {
        duration: 1.05,
        ease: "power3.out",
        onUpdate: placeStain,
      });
      const moveY = gsap.quickTo(pointerSmooth.current, "y", {
        duration: 1.05,
        ease: "power3.out",
        onUpdate: placeStain,
      });

      const onPointerMove = (event: PointerEvent) => {
        moveX(event.clientX / window.innerWidth);
        moveY(event.clientY / window.innerHeight);
      };

      const onResize = () => placeStain();

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="aurora-root pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="aurora-base-gradient absolute inset-0" />
      <div ref={stainRef} className="aurora-cursor-stain absolute left-0 top-0" />
      <div className="aurora-edge-soften absolute inset-0" />
    </div>
  );
}
