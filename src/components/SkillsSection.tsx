import { skills, type SkillItem } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

type SkillsRowProps = {
  title: string;
  hint?: string;
  items: SkillItem[];
  speed?: number; // Sekunden für eine Runde
};

const MIN_MARQUEE_ITEMS = 5; // ab wie vielen Skills sich die Reihe bewegt

function SkillsMarqueeRow({ title, hint, items, speed = 28 }: SkillsRowProps) {
  if (!items.length) return null;

  const hasMarquee = items.length >= MIN_MARQUEE_ITEMS;
  const track = hasMarquee ? [...items, ...items] : items;

  return (
    <MotionWrapper>
      <GlassCard className="p-5 md:p-6 flex flex-col gap-4">
        {/* Titel / Beschreibung */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
            {hint && (
              <p className="text-xs md:text-sm text-foreground/60 mt-0.5">
                {hint}
              </p>
            )}
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-foreground/70">
            {items.length} Skills
          </span>
        </div>

        {/* Marquee / statische Reihe */}
        <div className="relative overflow-hidden">
          {/* Fades nur anzeigen, wenn wir wirklich scrollen */}
          {hasMarquee && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent" />
            </>
          )}

          <motion.div
            className="flex gap-4 w-max"
            animate={
              hasMarquee
                ? { x: ["0%", "-50%"] }
                : undefined
            }
            transition={
              hasMarquee
                ? {
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration: speed,
                  }
                : undefined
            }
          >
            {track.map((s, i) => (
              <div
                key={s.name + i}
                className="flex min-w-[220px] sm:min-w-[250px] lg:min-w-[200px] items-center gap-4 rounded-2xl border border-white/10 bg-background/95 px-4 py-4 md:px-5 md:py-5 shadow-md hover:border-primary/60 hover:bg-primary/5 transition-colors"
              >
                {s.logo && (
                  <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-muted/70 border border-white/10 overflow-hidden">
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm md:text-lg font-medium text-foreground">
                    {s.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </GlassCard>
    </MotionWrapper>
  );
}

export default function SkillsSection() {
  if (!skills) return null;

  const programming = skills.programmingLanguages ?? [];
  const frontend = skills.frontendDevelopment ?? [];
  const backendAndDevops = [
    ...(skills.backendDevelopment ?? []),
    ...(skills.cloudAndDevOps ?? []),
  ];
  const databases = skills.databaseAndStorage ?? [];
  const tools = skills.toolsAndServices ?? [];

  const totalSkills =
    programming.length +
    frontend.length +
    backendAndDevops.length +
    databases.length +
    tools.length;

  return (
    <section
      id="skills"
      className="py-16 bg-gradient-to-b from-background via-background/95 to-muted/20"
    >
      <div className="container max-w-5xl mx-auto px-6 space-y-10">
        {/* Header */}
        <MotionWrapper>
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary/70">
              Tech Stack
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Technologien & Werkzeuge
            </h2>
            <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
              Laufende Übersicht über Sprachen, Frameworks und Plattformen, mit
              denen ich arbeite – von UI bis Infrastruktur ({totalSkills}+ Skills).
            </p>
          </div>
        </MotionWrapper>

        <div className="space-y-6 md:space-y-7">
          {programming.length > 0 && (
            <SkillsMarqueeRow
              title="Programmiersprachen"
              hint="Von Skriptsprachen bis hin zu modernen, typisierten Sprachen."
              items={programming}
              speed={30}
            />
          )}

          {frontend.length > 0 && (
            <SkillsMarqueeRow
              title="Frontend"
              hint="Moderne Web-UIs, SPAs und komponentenbasierte Architekturen."
              items={frontend}
              speed={32}
            />
          )}

          {backendAndDevops.length > 0 && (
            <SkillsMarqueeRow
              title="Backend"
              hint="APIs, Services, Container & Deployments."
              items={backendAndDevops}
              speed={34}
            />
          )}

          {databases.length > 0 && (
            <SkillsMarqueeRow
              title="Datenbanken & Storage"
              hint="Relationale und dokumentenbasierte Datenhaltung."
              items={databases}
              speed={31}
            />
          )}

          {tools.length > 0 && (
            <SkillsMarqueeRow
              title="Tools & Services"
              hint="Ergänzende Services wie Monitoring, ERP & Infrastruktur."
              items={tools}
              speed={33}
            />
          )}
        </div>
      </div>
    </section>
  );
}
