"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const certificates = [
  { issuer: "Google / Coursera", title: "AI Fundamentals", date: "Apr 2026", image: "/certifications/google-ai-fundamentals.png", width: 1024, height: 682, verify: "https://coursera.org/verify/7C403PQ3QE0D" },
  { issuer: "Hugging Face", title: "Fundamentals of Agents · Unit 1", date: "May 2026", image: "/certifications/huggingface-agents.png", width: 1024, height: 723 },
  { issuer: "HackerRank", title: "Python (Basic)", date: "Aug 2026", image: "/certifications/hackerrank-python.png", width: 1500, height: 1143, verify: "https://www.hackerrank.com/certificates/550aec2dfab" },
];

export function CertificateGallery({ motion }: { motion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const certificate = certificates[selected];

  useGSAP(() => {
    if (!motion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".certificate-heading", {
        y: 24, autoAlpha: 0, duration: .7, ease: "power3.out", clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: ".certificate-heading", start: "top 92%", toggleActions: "play none none none" },
      });
      gsap.utils.toArray<HTMLElement>(".certificate-card", root.current).forEach((card, index) => {
        // Individual triggers keep later rows animated on phones and tablets.
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out", clearProps: "transform,opacity,visibility" },
          scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
        });
        timeline.from(card.querySelector(".certificate-preview"), { y: 48, rotation: index % 2 ? 4 : -4, scale: .94, autoAlpha: 0, duration: .85 }, (index % 3) * .1)
          .from(card.querySelectorAll(".certificate-caption > *"), { y: 14, autoAlpha: 0, duration: .5, stagger: .09 }, "<.28");
        timeline.scrollTrigger?.refresh();
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  return <div ref={root} className="certificate-section" aria-labelledby="certificate-title">
    <div className="certificate-heading"><div><p className="eyebrow">Always a student</p><h3 id="certificate-title">Learning, <span>with proof.</span></h3></div><p>Select a certificate to take a closer look.</p></div>
    <div className="certificate-grid">
      {certificates.map((item, index) => <article className="certificate-card" key={item.image}>
        <button className="certificate-preview" type="button" aria-label={`Enlarge ${item.title} certificate`} aria-haspopup="dialog" onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
          <Image src={item.image} alt={`${item.title} certificate awarded to Danyal Tanveer by ${item.issuer}`} width={item.width} height={item.height} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw" />
          <span className="certificate-expand" aria-hidden="true">View certificate ↗</span>
        </button>
        <div className="certificate-caption"><p>{item.issuer}<span className="mono">{item.date}</span></p><h4>{item.title}</h4></div>
      </article>)}
    </div>
    <dialog className="certificate-dialog" ref={dialog} aria-labelledby="certificate-dialog-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="certificate-dialog-bar"><h3 id="certificate-dialog-title">{certificate.title}</h3><button type="button" onClick={() => dialog.current?.close()} aria-label="Close certificate" autoFocus>Close ×</button></div>
      <Image src={certificate.image} alt={`${certificate.title} certificate awarded to Danyal Tanveer`} width={certificate.width} height={certificate.height} sizes="95vw" />
      <div className="certificate-dialog-footer"><span>{certificate.issuer} · {certificate.date}</span>{certificate.verify && <a href={certificate.verify} target="_blank" rel="noopener noreferrer">Verify credential ↗</a>}</div>
    </dialog>
  </div>;
}
