// src/components/AwardsSection.tsx

import { certificates as certsFromData, type Certificate } from "@/lib/data";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

const certificates: Certificate[] = certsFromData;

export default function AwardsSection() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scroller.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.9, 600);
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section
      id="certificates"
      className="py-12 bg-gradient-to-b from-muted/10 to-background"
    >
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Zertifikate & Badges</h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-md border bg-background px-2 py-1"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-md border bg-background px-2 py-1"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scroller}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth"
          >
            {certificates.map((c, idx) => (
              <MotionWrapper
                key={c.name + (c.date ?? idx)}
                delay={idx * 0.04}
              >
                <div className="min-w-[85%] md:min-w-[48%] lg:min-w-[32%] snap-start">
                  <GlassCard className="p-5 h-full flex flex-col">
                    {/* Badge-Bild (falls vorhanden) */}
                    {c.badge && (
                      <div className="flex justify-center mb-3">
                        <img
                          src={c.badge}
                          alt={`${c.name} Badge`}
                          className="h-16 w-auto object-contain drop-shadow"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">{c.name}</h3>
                    </div>

                    {c.issuer && (
                      <p className="text-xs text-foreground/70">{c.issuer}</p>
                    )}
                    {c.date && (
                      <p className="text-xs text-foreground/60 mt-1">{c.date}</p>
                    )}

                    {c.technologies?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[11px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 text-sm text-primary hover:underline"
                      >
                        Zertifikat ansehen
                      </a>
                    )}
                  </GlassCard>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {/* mobile arrows */}
          <div className="flex md:hidden justify-end gap-2 mt-3">
            <button
              onClick={() => scroll("left")}
              className="rounded-md border bg-background px-3 py-1"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-md border bg-background px-3 py-1"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
