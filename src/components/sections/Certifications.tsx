"use client";

import Image from "next/image";
import { certifications } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-cream-dark/40">
      <div className="section-container">
        <SectionHeading
          label="Certifications"
          title="Verified credentials in AI & agents"
          description="Professional certificates from Google and Hugging Face covering AI fundamentals and agent development."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="reveal group overflow-hidden rounded-2xl border border-charcoal/8 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate from ${cert.issuer}`}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </div>

              <div className="space-y-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-dark">
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-charcoal/50">{cert.date}</span>
                </div>

                <h3 className="font-serif text-xl leading-snug text-charcoal">{cert.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-light">{cert.description}</p>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark transition-colors hover:text-charcoal"
                  >
                    Verify certificate
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
