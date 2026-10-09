"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { capabilities } from "@/data/selected-work";

export function StackLab({ motion }: { motion: boolean }) {
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const current = capabilities[active];

  useGSAP(() => {
    if (!motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".stack-content", { y: 16, opacity: 0, duration: 0.4, ease: "power2.out", clearProps: "all" });
    gsap.from(".pipeline-node", { y: 20, opacity: 0, stagger: 0.07, duration: 0.45, ease: "power2.out", clearProps: "all" });
  }, { scope: root, dependencies: [active, motion], revertOnUpdate: true });

  return <div className="stack-lab" ref={root}>
    <div className="stack-tabs" role="group" aria-label="Choose an engineering discipline">
      {capabilities.map((capability, index) => <button type="button" key={capability.id} aria-pressed={active === index} className={active === index ? "stack-tab active" : "stack-tab"} onClick={() => { setActive(index); setStage(0); }}><span className="mono">{capability.number}</span>{capability.label}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div className="stack-content">
      <div className="stack-intro"><h3>{current.title}</h3><p>{current.description}</p></div>
      <p className="mono pipeline-hint">Explore the workflow <span aria-hidden="true">↓</span></p>
      <div className="pipeline" role="group" aria-label={`${current.label} workflow stages`}>
        {current.stages.map((item, index) => <button key={item.name} type="button" className={stage === index ? "pipeline-node selected" : "pipeline-node"} aria-pressed={stage === index} onClick={() => setStage(index)}><span className="node-top"><span className="mono">0{index + 1}</span><span className="node-dot" /></span><strong>{item.name}</strong><span>{item.tools}</span></button>)}
      </div>
      <div className="pipeline-detail" aria-live="polite"><span className="detail-marker" aria-hidden="true">↳</span><p><strong>{current.stages[stage].name}.</strong> {current.stages[stage].detail}</p></div>
      <a href={current.href} className="text-link">{current.project}<span aria-hidden="true">↗</span></a>
    </div>
  </div>;
}
