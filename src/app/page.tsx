import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { About } from "@/components/sections/About";
import { FocusTurntable } from "@/components/sections/FocusTurntable";
import { Experience } from "@/components/sections/Experience";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ProjectCollage } from "@/components/sections/ProjectCollage";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <FocusTurntable />
      <About />
      <Experience />
      <Certifications />
      <ProjectShowcase />
      <ProjectCollage />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
