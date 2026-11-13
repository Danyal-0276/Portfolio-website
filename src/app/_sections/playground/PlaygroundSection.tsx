import { CertificateGallery } from "./CertificateGallery";
import { Playground } from "./Playground";

export function PlaygroundSection({ motion }: { motion: boolean }) {
  return (
    <section id="playground" className="playground-section shell section-space" aria-labelledby="playground-title">
      <div className="section-heading compact" data-reveal><div><p className="eyebrow"><span>06 /</span> The playground</p><h2 id="playground-title">Follow the <span className="serif">curiosity.</span></h2></div><p className="section-intro">Side quests, smaller builds,<br />and ideas worth trying.</p></div>
      <Playground motion={motion} />
      <CertificateGallery motion={motion} />
    </section>
  );
}
