"use client";

import { useRef } from "react";
import { SiteHeader } from "../layout/SiteHeader";
import { Ticker } from "../layout/Ticker";
import { useActiveSection } from "../../_hooks/useActiveSection";
import { useMotionPreference } from "../../_hooks/useMotionPreference";
import { usePortfolioAnimations } from "../../_hooks/usePortfolioAnimations";
import { AboutSection } from "../../_sections/about/AboutSection";
import { ContactSection } from "../../_sections/contact/ContactSection";
import { HeroScene } from "../../_sections/hero/HeroScene";
import { PlaygroundSection } from "../../_sections/playground/PlaygroundSection";
import { ResearchSection } from "../../_sections/research/ResearchSection";
import { SkillsSection } from "../../_sections/skills/SkillsSection";
import { ToolkitSection } from "../../_sections/toolkit/ToolkitSection";
import { WorkSection } from "../../_sections/work/WorkSection";

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const { motion, setMotion } = useMotionPreference();
  const activeSection = useActiveSection(root);
  usePortfolioAnimations(root, motion);

  return (
    <div ref={root} className={motion ? "portfolio" : "portfolio motion-paused"}>
      <div className="page-progress" aria-hidden="true" />
      <SiteHeader activeSection={activeSection} />
      <main id="main-content">
        <HeroScene motion={motion} />
        <Ticker />
        <AboutSection />
        <WorkSection motion={motion} />
        <SkillsSection motion={motion} />
        <ToolkitSection motion={motion} />
        <ResearchSection />
        <PlaygroundSection motion={motion} />
        <ContactSection motion={motion} onToggleMotion={() => setMotion((enabled) => !enabled)} />
      </main>
    </div>
  );
}
