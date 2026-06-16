"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";

/** Grey → teal/cyan mesh like the reference; color focal point follows cursor. */
function buildMeshGradient(x: number, y: number) {
  const px = x * 100;
  const py = y * 100;
  const px2 = (x * 0.55 + 0.38) * 100;
  const py2 = (y * 0.45 + 0.28) * 100;
  const greyX = 12 + (1 - x) * 28;
  const greyY = 48 + y * 18;

  const tealCore = 0.5 + x * 0.45;
  const cyanGlow = 0.35 + y * 0.4;
  const edgeTeal = 0.18 + x * 0.42;

  return [
    `radial-gradient(ellipse 115% 100% at ${px.toFixed(1)}% ${py.toFixed(1)}%, rgba(45, 212, 191, ${tealCore.toFixed(2)}) 0%, rgba(34, 211, 238, ${(cyanGlow * 0.75).toFixed(2)}) 24%, rgba(20, 184, 166, ${(cyanGlow * 0.35).toFixed(2)}) 44%, transparent 64%)`,
    `radial-gradient(ellipse 90% 80% at ${px2.toFixed(1)}% ${py2.toFixed(1)}%, rgba(56, 189, 248, ${(0.22 + x * 0.28).toFixed(2)}) 0%, rgba(14, 116, 144, ${(0.12 + y * 0.12).toFixed(2)}) 36%, transparent 58%)`,
    `radial-gradient(ellipse 100% 90% at ${greyX.toFixed(1)}% ${greyY.toFixed(1)}%, rgba(71, 85, 105, 0.92) 0%, rgba(51, 65, 85, 0.5) 36%, transparent 68%)`,
    `radial-gradient(ellipse 85% 70% at 90% 68%, rgba(13, 148, 136, ${edgeTeal.toFixed(2)}) 0%, transparent 56%)`,
    `radial-gradient(ellipse 120% 90% at 50% 108%, rgba(15, 23, 42, 0.75) 0%, transparent 52%)`,
    "linear-gradient(128deg, #0c1016 0%, #1a2332 40%, #243044 68%, #121820 100%)",
  ].join(", ");
}

export function AuroraBackground() {
  const meshRef = useRef<HTMLDivElement>(null);
  const pointerTarget = useRef({ x: 0.68, y: 0.42 });
  const pointerSmooth = useRef({ x: 0.68, y: 0.42 });

  useGSAP(
    () => {
      registerGSAP();
      const mesh = meshRef.current;
      if (!mesh) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const applyMesh = () => {
        const { x, y } = pointerSmooth.current;
        mesh.style.background = buildMeshGradient(x, y);
      };

      applyMesh();

      if (prefersReducedMotion) return;

      const moveX = gsap.quickTo(pointerSmooth.current, "x", {
        duration: 0.85,
        ease: "power3.out",
        onUpdate: applyMesh,
      });
      const moveY = gsap.quickTo(pointerSmooth.current, "y", {
        duration: 0.85,
        ease: "power3.out",
        onUpdate: applyMesh,
      });

      const onPointerMove = (event: PointerEvent) => {
        pointerTarget.current = {
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        };
        moveX(pointerTarget.current.x);
        moveY(pointerTarget.current.y);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
      };
    },
    { scope: meshRef },
  );

  return (
    <div
      className="aurora-root pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div ref={meshRef} className="aurora-mesh-layer absolute inset-0" />
      <div className="aurora-noise absolute inset-0 opacity-[0.14]" />
    </div>
  );
}
