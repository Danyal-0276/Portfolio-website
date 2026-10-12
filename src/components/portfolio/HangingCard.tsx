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

    const cord = element.querySelector<SVGPathElement>(".lanyard-cord-path");
    const cordHighlight = element.querySelector<SVGPathElement>(".lanyard-cord-highlight");
    const state = { x: 0, y: 0, vx: 0, vy: 0, angle: -4, spin: 0, leanX: 0, leanY: 0 };
    const setX = gsap.quickSetter(rig, "x", "px");
    const setY = gsap.quickSetter(rig, "y", "px");
    const setAngle = gsap.quickSetter(rig, "rotation", "deg");
    const setLeanX = gsap.quickSetter(card, "rotationX", "deg");
    const setLeanY = gsap.quickSetter(card, "rotationY", "deg");
    let drag: { id: number; x: number; y: number; startX: number; startY: number; lastX: number; lastY: number; time: number } | null = null;
    let frame = 0;
    let lastTime = 0;
    let hoverX = 0;
    let hoverY = 0;
    const render = () => {
      setX(state.x); setY(state.y); setAngle(state.angle);
      setLeanX(state.leanX); setLeanY(state.leanY);
      const center = element.clientWidth / 2;
      const restingLength = parseFloat(getComputedStyle(rig).paddingTop) - 18;
      const angle = state.angle * Math.PI / 180;
      const endX = center + state.x + Math.sin(angle) * 18;
      const endY = restingLength + state.y + 18 * (1 - Math.cos(angle));
      const path = `M ${center} 4 C ${center} ${Math.max(25, endY * .45)} ${endX - state.vx * .025} ${endY * .65} ${endX} ${endY}`;
      cord?.setAttribute("d", path); cordHighlight?.setAttribute("d", path);
    };
    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000 || .016, .032);
      lastTime = time;
      if (!drag) {
        state.vx += (-65 * state.x - 10 * state.vx) * dt;
        state.vy += (-85 * state.y - 11 * state.vy) * dt;
        state.x += state.vx * dt; state.y += state.vy * dt;
      }
      const targetAngle = gsap.utils.clamp(-28, 28, -4 + state.x * .08 + state.vx * .01);
      state.spin += ((targetAngle - state.angle) * 70 - state.spin * 12) * dt;
      state.angle += state.spin * dt;
      state.leanX += (gsap.utils.clamp(-20, 20, hoverX - state.vy * .012) - state.leanX) * Math.min(1, dt * 12);
      state.leanY += (gsap.utils.clamp(-26, 26, hoverY + state.vx * .018) - state.leanY) * Math.min(1, dt * 12);
      render();
      const moving = drag || Math.abs(state.x) + Math.abs(state.y) + Math.abs(state.vx) + Math.abs(state.vy) + Math.abs(state.spin) + Math.abs(state.angle + 4) + Math.abs(state.leanX - hoverX) + Math.abs(state.leanY - hoverY) > .15;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => { if (!frame) { lastTime = performance.now(); frame = requestAnimationFrame(tick); } };
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || drag) return;
      event.preventDefault();
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: state.x, startY: state.y, lastX: state.x, lastY: state.y, time: performance.now() };
      state.vx = 0; state.vy = 0; hoverX = 0; hoverY = 0;
      card.setPointerCapture(event.pointerId);
      card.dataset.dragging = "true";
      card.focus({ preventScroll: true });
      wake();
    };
    const move = (event: PointerEvent) => {
      if (drag && event.pointerId === drag.id) {
        const now = performance.now();
        const dt = Math.max(.008, (now - drag.time) / 1000);
        const bounds = element.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        const halfCard = card.offsetWidth / 2 + 16;
        state.x = gsap.utils.clamp(Math.max(-260, halfCard - center), Math.min(260, window.innerWidth - halfCard - center), drag.startX + event.clientX - drag.x);
        state.y = gsap.utils.clamp(-78, 140, drag.startY + event.clientY - drag.y);
        state.vx = gsap.utils.clamp(-1000, 1000, (state.x - drag.lastX) / dt);
        state.vy = gsap.utils.clamp(-900, 900, (state.y - drag.lastY) / dt);
        drag.lastX = state.x; drag.lastY = state.y; drag.time = now;
        render(); wake();
      } else if (!drag && event.pointerType === "mouse" && card.contains(event.target as Node)) {
        const bounds = card.getBoundingClientRect();
        hoverX = -((event.clientY - bounds.top) / bounds.height - .5) * 12;
        hoverY = ((event.clientX - bounds.left) / bounds.width - .5) * 16;
        wake();
      }
    };
    const release = (event?: PointerEvent) => {
      if (!drag || (event && event.pointerId !== drag.id)) return;
      const { id, time } = drag;
      drag = null;
      if (performance.now() - time > 100) { state.vx = 0; state.vy = 0; }
      delete card.dataset.dragging;
      hoverX = 0; hoverY = 0;
      if (card.hasPointerCapture(id)) card.releasePointerCapture(id);
      wake();
    };
    const leave = () => { if (!drag) { hoverX = 0; hoverY = 0; wake(); } };
    const blur = () => { release(); leave(); };
    const key = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", " "].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") state.vx = -600;
      else if (event.key === "ArrowRight") state.vx = 600;
      else if (event.key === "ArrowUp") state.vy = -450;
      else if (event.key === "ArrowDown") state.vy = 450;
      else { state.vx = 450; state.vy = -300; }
      wake();
    };
    render();
    card.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", blur);
    card.addEventListener("lostpointercapture", release);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("keydown", key);
    const resize = () => { release(); render(); };
    window.addEventListener("resize", resize);
    return () => {
      card.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", blur);
      card.removeEventListener("lostpointercapture", release);
      card.removeEventListener("pointerleave", leave);
      card.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
      if (drag && card.hasPointerCapture(drag.id)) card.releasePointerCapture(drag.id);
      cancelAnimationFrame(frame);
      rig.style.removeProperty("transform"); card.style.removeProperty("transform");
      delete card.dataset.dragging;
    };
  }, { scope: stage, dependencies: [motion], revertOnUpdate: true });

  return <div ref={stage} className="lanyard-stage">
    <div className="lanyard-anchor" aria-hidden="true" />
    <svg className="lanyard-cord" aria-hidden="true"><line className="lanyard-cord-static" x1="50%" x2="50%" y1="4" y2="98" /><path className="lanyard-cord-path" d="M 160 4 L 160 98" /><path className="lanyard-cord-highlight" d="M 160 4 L 160 98" /></svg>
    <div className="lanyard-rig">
      <div className="lanyard-clip" aria-hidden="true" />
      <button type="button" className="id-card" draggable={false} aria-label={motion ? "Danyal’s engineer ID card. Drag in any direction, release to swing, or use the arrow keys." : "Danyal’s engineer ID card. Motion is off."} aria-describedby="badge-hint">
        <span className="badge-slot" aria-hidden="true" />
        <span className="badge-top mono"><span>THE BUILDER’S PASS</span><span>2026 / DT</span></span>
        <span className="badge-photo"><span className="badge-photo-grid" /><Image src="/images/portrait-2026.png" alt="Danyal Tanveer" width={1254} height={1254} priority sizes="(max-width: 600px) 220px, 310px" /><span className="badge-photo-tag mono">LAHORE / PK</span></span>
        <span className="badge-identity"><strong>Danyal<br />Tanveer<span>↗</span></strong><span className="mono">SOFTWARE & AI ENGINEER</span></span>
        <span className="badge-bottom"><span className="mono"><i />OPEN TO OPPORTUNITIES</span><span className="badge-barcode" aria-hidden="true" /></span>
      </button>
    </div>
    <span className="badge-hint mono" id="badge-hint">{motion ? "↔ GRAB, MOVE & LET GO. TRY ANY DIRECTION." : "THE PERSON BEHIND THE CODE."}</span>
  </div>;
}
