import { skillGroups } from "@/data/portfolio";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-white">
      <div className="section-container">
        <SectionHeading
          label="Skills"
          title="Technologies I work with"
          description="Languages, frameworks, CS fundamentals, ML tooling, databases, cloud deployment, and the tools I use daily."
        />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="reveal">
              <h3 className="mb-4 font-serif text-xl text-charcoal">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
