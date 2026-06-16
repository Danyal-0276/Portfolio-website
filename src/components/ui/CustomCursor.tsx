"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";

const CURSOR_LABELS: Record<string, string> = {
  a: "OPEN",
  button: "CLICK",
  "[data-cursor='view']": "VIEW",
  "[data-cursor='explore']": "EXPLORE",
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!coarse && !reduced);
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;
      registerGSAP();

      const cursor = cursorRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!cursor || !ring) return;

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
      const ringXTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      const ringYTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        ringXTo(e.clientX);
        ringYTo(e.clientY);
      };

      const setHover = (active: boolean, text = "") => {
        gsap.to(ring, {
          scale: active ? 2.2 : 1,
          opacity: active ? 0.85 : 0.5,
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(cursor, {
          scale: active ? 0 : 1,
          duration: 0.25,
          ease: "power3.out",
        });
        if (label) {
          label.textContent = text;
          gsap.to(label, {
            opacity: active && text ? 1 : 0,
            scale: active && text ? 1 : 0.8,
            duration: 0.25,
          });
        }
      };

      const onOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        for (const [selector, text] of Object.entries(CURSOR_LABELS)) {
          const match =
            selector.startsWith("[") ? target.closest(selector) : target.closest(selector);
          if (match) {
            setHover(true, text);
            return;
          }
        }
        setHover(false);
      };

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onOver);

      return () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        aria-hidden="true"
      >
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/80">
          <span
            ref={labelRef}
            className="absolute text-[9px] font-medium tracking-widest text-white opacity-0"
          />
        </div>
      </div>
      <div
        ref={cursorRef}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
        aria-hidden="true"
      />
    </>
  );
}
