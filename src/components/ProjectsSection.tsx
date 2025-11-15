import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import { CardHeader, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Github } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { cn } from "@/lib/utils";

export default function ProjectsSection() {
  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.stack?.forEach(t => s.add(t)));
    return Array.from(s).sort();
  }, []);
  const [active, setActive] = useState<string | "Alle">("Alle");

  const visible = useMemo(() => {
    if (active === "Alle") return projects;
    return projects.filter(p => p.stack?.includes(active));
  }, [active]);

  return (
    <section id="projects" className="py-12">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Projekte</h2>

        {/* Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("Alle")}
            className={cn("px-3 py-1 rounded-md border text-sm", active==="Alle" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-white/5")}
          >Alle</button>
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={cn("px-3 py-1 rounded-md border text-sm", active===t ? "bg-primary text-primary-foreground" : "bg-background hover:bg-white/5")}
            >{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((p, idx) => (
            <MotionWrapper key={p.title} delay={idx * 0.06}>
              <GlassCard className="group overflow-hidden h-full flex flex-col">
                {p.image && (
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                )}

                <CardHeader className="bg-gradient-to-r from-primary/5 to-chart-2/5">
                  <CardTitle className="group-hover:text-primary transition-colors">{p.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  {Array.isArray(p.description) ? (
                    <ul className="list-disc ml-4 space-y-1 text-sm text-foreground/80">
                      {p.description.map((d,i)=> <li key={i}>{d}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-foreground/80">{p.summary ?? p.description}</p>
                  )}
                  {p.stack?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[11px]">{t}</span>
                      ))}
                    </div>
                  ) : null}
                </CardContent>

                <CardFooter className="border-t border-white/10 bg-background/40">
                  <div className="flex gap-4 items-center py-3">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="text-sm text-foreground/80 hover:text-foreground inline-flex items-center gap-2">
                        <Github size={16} /> Quellcode
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                        Live-Demo
                      </a>
                    )}
                  </div>
                </CardFooter>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
