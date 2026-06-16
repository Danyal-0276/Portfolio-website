import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { About } from "@/components/sections/About";
import { StatsBand } from "@/components/sections/StatsBand";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ProjectCollage } from "@/components/sections/ProjectCollage";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <About />
      <StatsBand />
      <Experience />
      <FeaturedWork />
      <ProjectShowcase />
      <ProjectCollage />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
