import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-charcoal text-cream">
      <div className="section-container">
        <SectionHeading
          label="Experience"
          title="Where I've built real-world impact"
          description="Professional experience shipping production software."
          dark
        />

        <div className="space-y-8">
          {experience.map((job) => (
            <article
              key={job.id}
              className="reveal rounded-2xl border border-cream/10 bg-charcoal-light/30 p-8"
            >
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-cream">{job.role}</h3>
                  <p className="text-gold">{job.company}</p>
                </div>
                <div className="text-sm text-cream/60">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <ul className="mb-6 space-y-2">
                {job.description.map((item) => (
                  <li
                    key={item.slice(0, 40)}
                    className="flex gap-3 text-cream/80 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-gold"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
