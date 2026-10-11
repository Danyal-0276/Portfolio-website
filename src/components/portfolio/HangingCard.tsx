"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HangingCard({ motion }: { motion: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const element = stage.current;
    const rig = element?.querySelector<HTMLElement>(".lanyard-rig");
    const card = element?.querySelector<HTMLButtonElement>(".id-card");
    if (!element || !rig || !card || !motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const swing = gsap.quickTo(rig, "rotation", { duration: .6, ease: "power3.out" });
    const tiltX = gsap.quickTo(card, "rotationX", { duration: .4, ease: "power2.out" });
    const tiltY = gsap.quickTo(card, "rotationY", { duration: .4, ease: "power2.out" });
    const stretch = gsap.quickTo(rig, "y", { duration: .4, ease: "power2.out" });
    const settle = gsap.to(rig, { rotation: -4, y: 0, duration: 1.8, ease: "elastic.out(1, .28)", paused: true });
    let origin: { x: number; y: number } | null = null;
    const down = (event: PointerEvent) => {
      origin = { x: event.clientX, y: event.clientY };
      card.setPointerCapture(event.pointerId);
      card.dataset.dragging = "true";
      settle.pause();
    };
    const move = (event: PointerEvent) => {
      if (origin) {
        swing(gsap.utils.clamp(-24, 24, -4 - (event.clientX - origin.x) / 9));
        stretch(gsap.utils.clamp(-8, 32, (event.clientY - origin.y) / 5));
        tiltY(gsap.utils.clamp(-18, 18, (event.clientX - origin.x) / 10));
      } else if (event.pointerType === "mouse") {
        const rect = card.getBoundingClientRect();
        tiltX(-((event.clientY - rect.top) / rect.height - .5) * 12);
        tiltY(((event.clientX - rect.left) / rect.width - .5) * 18);
      }
    };
    const release = () => {
      origin = null;
      delete card.dataset.dragging;
      swing.tween.pause(); stretch.tween.pause();
      tiltX(0); tiltY(0);
      settle.invalidate().restart();
    };
    const leave = () => { if (!origin) { tiltX(0); tiltY(0); } };
    const key = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "Enter", " "].includes(event.key)) return;
      event.preventDefault();
      settle.pause();
      swing(event.key === "ArrowLeft" ? 16 : -18);
      rebound.restart(true);
    };
    const rebound = gsap.delayedCall(.25, release).pause();
    card.addEventListener("pointerdown", down);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
    card.addEventListener("lostpointercapture", release);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("keydown", key);
    return () => {
      card.removeEventListener("pointerdown", down); card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", release); card.removeEventListener("pointercancel", release);
      card.removeEventListener("lostpointercapture", release); card.removeEventListener("pointerleave", leave);
      card.removeEventListener("keydown", key); delete card.dataset.dragging;
    };
  }, { scope: stage, dependencies: [motion], revertOnUpdate: true });

  return <div ref={stage} className="lanyard-stage">
    <div className="lanyard-anchor" aria-hidden="true" />
    <div className="lanyard-rig">
      <div className="lanyard-strap" aria-hidden="true"><span>DANYAL / BUILDER / DANYAL / BUILDER</span></div>
      <div className="lanyard-clip" aria-hidden="true" />
      <button type="button" className="id-card" aria-label={motion ? "Danyal’s engineer ID card. Drag to swing, or use left and right arrow keys." : "Danyal’s engineer ID card. Motion is off."} aria-describedby="badge-hint">
        <span className="badge-slot" aria-hidden="true" />
        <span className="badge-top mono"><span>THE BUILDER’S PASS</span><span>2026 / DT</span></span>
        <span className="badge-photo"><span className="badge-photo-grid" /><Image src="/images/portrait-2026.png" alt="Danyal Tanveer" width={1254} height={1254} priority sizes="(max-width: 600px) 220px, 310px" /><span className="badge-photo-tag mono">LAHORE / PK</span></span>
        <span className="badge-identity"><strong>Danyal<br />Tanveer<span>↗</span></strong><span className="mono">SOFTWARE & AI ENGINEER</span></span>
        <span className="badge-bottom"><span className="mono"><i />OPEN TO OPPORTUNITIES</span><span className="badge-barcode" aria-hidden="true" /></span>
      </button>
    </div>
    <span className="badge-hint mono" id="badge-hint">{motion ? "↔ DRAG THE CARD. MEET THE BUILDER." : "THE PERSON BEHIND THE CODE."}</span>
  </div>;
}
