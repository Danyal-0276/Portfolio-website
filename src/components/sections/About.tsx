import { about } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="section-container">
        <SectionHeading
          label="About Me"
          title="Building software & researching truth in the digital age"
          description="Computer Science student passionate about full-stack engineering and NLP research."
        />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="reveal space-y-4 lg:col-span-2">
            {about.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="text-lg leading-relaxed text-charcoal-light">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="reveal space-y-6">
            <div className="rounded-2xl border border-charcoal/8 bg-cream p-6">
              <h3 className="mb-4 font-serif text-xl text-charcoal">Education</h3>
              <p className="font-medium text-charcoal">{about.education.degree}</p>
              <p className="text-sm text-charcoal-light">{about.education.institution}</p>
              <p className="mt-1 text-sm text-charcoal/60">{about.education.period}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-sm font-medium text-gold-dark">
                  CGPA {about.education.cgpa}
                </span>
              </div>
              <p className="mt-4 text-sm text-charcoal-light">
                <span className="font-medium text-charcoal">Focus:</span>{" "}
                {about.education.focus}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {about.highlights.map((item) => (
                <div
                  key={item.label}
                  className="reveal rounded-xl border border-charcoal/8 bg-cream p-4 text-center"
                >
                  <p className="font-serif text-2xl text-gold-dark">{item.value}</p>
                  <p className="text-xs uppercase tracking-wider text-charcoal/60">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
