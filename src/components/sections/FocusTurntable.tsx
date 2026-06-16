"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { focusAreas } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Draggable,
  gsap,
  registerGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

function getActiveIndex(rotation: number) {
  // Which segment is aligned to the top (12 o'clock) after rotation
  const index = Math.round(-rotation / 90) % focusAreas.length;
  return ((index % focusAreas.length) + focusAreas.length) % focusAreas.length;
}

export function FocusTurntable() {
  const sectionRef = useRef<HTMLElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayIndex = hoveredIndex ?? activeIndex;
  const active = focusAreas[displayIndex];

  useGSAP(
    () => {
      registerGSAP();

      const disc = discRef.current;
      if (!disc) return;

      const draggable = Draggable.create(disc, {
        type: "rotation",
        inertia: true,
        snap: (value) => Math.round(value / 90) * 90,
        onDrag() {
          setActiveIndex(getActiveIndex(this.rotation));
          setHoveredIndex(null);
        },
        onThrowUpdate() {
          setActiveIndex(getActiveIndex(this.rotation));
        },
        onThrowComplete() {
          setActiveIndex(getActiveIndex(this.rotation));
        },
        onDragEnd() {
          setActiveIndex(getActiveIndex(this.rotation));
        },
      });

      return () => draggable[0]?.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="focus"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-white"
    >
      <div className="section-container">
        <SectionHeading
          label="Focus Areas"
          title="Spin the dial and explore what I do"
          description="Drag the turntable or hover a segment to reveal services and expertise."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Turntable */}
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-charcoal/10 bg-cream" />

            {/* Segment labels stay fixed while disc rotates */}
            {focusAreas.map((area, i) => {
              const angle = i * 90 - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 42;
              const x = 50 + radius * Math.cos(rad);
              const y = 50 + radius * Math.sin(rad);

              return (
                <button
                  key={area.id}
                  type="button"
                  className={cn(
                    "absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium transition-all md:text-sm",
                    displayIndex === i
                      ? "scale-110 bg-charcoal text-cream shadow-lg"
                      : "bg-white text-charcoal/70 shadow-sm hover:scale-105 hover:shadow-md",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setHoveredIndex(null);
                    setActiveIndex(i);
                    if (discRef.current) {
                      gsap.to(discRef.current, {
                        rotation: -i * 90,
                        duration: 0.6,
                        ease: "power3.out",
                        onUpdate() {
                          if (discRef.current) {
                            const rot = gsap.getProperty(discRef.current, "rotation") as number;
                            setActiveIndex(getActiveIndex(rot));
                          }
                        },
                      });
                    }
                  }}
                >
                  {area.title.split(" ")[0]}
                </button>
              );
            })}

            {/* Rotating disc */}
            <div
              ref={discRef}
              className="turntable-disc absolute inset-[12%] cursor-grab rounded-full active:cursor-grabbing"
              style={{ transform: "rotate(0deg)" }}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-md">
                {focusAreas.map((area, i) => {
                  const startAngle = i * 90 - 45;
                  const endAngle = startAngle + 90;
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const r = 100;
                  const cx = 100;
                  const cy = 100;
                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);
                  const largeArc = 0;

                  return (
                    <path
                      key={area.id}
                      d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={area.accent}
                      fillOpacity={displayIndex === i ? 0.85 : 0.35}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                  );
                })}
                <circle cx="100" cy="100" r="18" fill="#343434" />
                <circle cx="100" cy="100" r="6" fill="#ff6b00" />
              </svg>
            </div>

            {/* Tonearm decoration */}
            <div
              className="pointer-events-none absolute top-[8%] right-[18%] z-10 origin-bottom-right"
              style={{ transform: "rotate(-25deg)" }}
              aria-hidden="true"
            >
              <div className="h-24 w-1 rounded-full bg-charcoal/30 md:h-32" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-charcoal/40" />
            </div>

            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-center text-xs text-charcoal/40">
              Drag to rotate, hover labels for details
            </p>
          </div>

          {/* Detail panel — no "reveal" class; it updates live as the dial turns */}
          <div className="rounded-2xl border border-charcoal/8 bg-cream p-5 sm:p-6 lg:p-8 transition-all duration-300">
            <span
              className="mb-4 inline-block h-1 w-12 rounded-full transition-colors duration-300"
              style={{ backgroundColor: active.accent }}
            />
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-charcoal/50">
              {active.subtitle}
            </p>
            <h3 className="mb-4 font-serif text-2xl text-charcoal sm:text-3xl">{active.title}</h3>
            <p className="mb-6 leading-relaxed text-charcoal-light">{active.description}</p>
            <ul className="space-y-2">
              {active.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-sm text-charcoal"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: active.accent }}
                  />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
