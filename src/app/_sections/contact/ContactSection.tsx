import Image from "next/image";
import { siteConfig } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";

interface ContactSectionProps {
  motion: boolean;
  onToggleMotion: () => void;
}

export function ContactSection({
  motion,
  onToggleMotion,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="contact-section section-space"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <div className="contact-heading" data-reveal>
          <p className="eyebrow">
            <span>07 /</span> Let’s make something
          </p>
          <h2 id="contact-title">
            Have a good
            <br />
            <span className="serif">problem?</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="contact-arrow"
              aria-label="Email Danyal"
            >
              <span aria-hidden="true">↗</span>
            </a>
          </h2>
          <p>
            I’m open to junior software and AI engineering roles,
            <br className="desktop-break" /> collaborations, and conversations
            that lead somewhere.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-direct">
            <span className="mono">Start with hello</span>
            <a className="email-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="phone-link"
              href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}
            >
              {siteConfig.phone}
            </a>
            <div className="social-links">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="resume-downloads">
              <span className="mono">Pick your résumé</span>
              <a
                href="/resumes/danyal-full-stack.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Full-stack ↗
              </a>
              <a
                href="/resumes/danyal-ai-ml.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI / ML ↗
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
        <footer className="site-footer">
          <a className="wordmark" href="#home">
            <span className="brand-logo">
              <Image
                src={siteConfig.logoPath}
                alt="Danyal"
                width={2172}
                height={724}
                priority
              />
            </span>
          </a>
          <span className="mono">
            © 2026 Danyal Tanveer / Made with curiosity
          </span>
          <button
            type="button"
            className="motion-toggle mono"
            aria-pressed={motion}
            onClick={onToggleMotion}
          >
            <span
              className={motion ? "motion-indicator on" : "motion-indicator"}
            />
            Motion {motion ? "on" : "off"}
          </button>
          <a className="back-top mono" href="#home">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
