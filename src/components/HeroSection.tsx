import { useEffect, useMemo, useRef, useState } from "react";
import {
  personalInfo,
  projects,
  certificates,
  skills,
  workExperience,
  education,
} from "@/lib/data";
import { Mail, Github, MapPin, Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { cn } from "@/lib/utils";

type ResultItem = {
  label: string;
  sectionId: string;
  meta?: string;
  kind: "Projekt" | "Zertifikat" | "Skill" | "Erfahrung" | "Ausbildung";
};

export default function HeroSection() {
  // ---------- Suche ----------
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const index: ResultItem[] = useMemo(() => {
    const res: ResultItem[] = [];

    projects?.forEach((p) =>
      res.push({
        label: p.title,
        sectionId: "#projects",
        meta: (p.stack?.slice(0, 3) ?? []).join(" · "),
        kind: "Projekt",
      })
    );

    (certificates ?? []).forEach((c) =>
      res.push({
        label: c.name,
        sectionId: "#certificates",
        meta: [c.issuer, c.date].filter(Boolean).join(" · "),
        kind: "Zertifikat",
      })
    );

    const allSkills = [
      ...(skills?.programmingLanguages ?? []),
      ...(skills?.frontendDevelopment ?? []),
      ...(skills?.backendDevelopment ?? []),
      ...(skills?.databaseAndStorage ?? []),
      ...(skills?.cloudAndDevOps ?? []),
      ...(skills?.toolsAndServices ?? []),
    ];
    const normalizedSkills = Array.from(
      new Set(
        allSkills.map((s) =>
          typeof s === "string"
            ? s
            : (s as any)?.name ?? (s as any)?.label ?? String(s)
        )
      )
    );
    normalizedSkills.forEach((s) =>
      res.push({
        label: s,
        sectionId: "#skills",
        meta: "Technologie",
        kind: "Skill",
      })
    );

    workExperience?.forEach((w) =>
      res.push({
        label: `${w.position} · ${w.company}`,
        sectionId: "#career",
        meta: [w.location, w.period].filter(Boolean).join(" · "),
        kind: "Erfahrung",
      })
    );

    education?.forEach((e) =>
      res.push({
        label: `${e.degree} · ${e.institution}`,
        sectionId: "#career",
        meta: [e.location, e.period].filter(Boolean).join(" · "),
        kind: "Ausbildung",
      })
    );

    return res;
  }, [projects, certificates, skills, workExperience, education]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .map((item) => {
        const l = item.label.toLowerCase();
        const m = (item.meta ?? "").toLowerCase();
        const score = (l.includes(q) ? 2 : 0) + (m.includes(q) ? 1 : 0);
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ item }) => item);
  }, [index, query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const goTo = (r: ResultItem | undefined) => {
    if (!r) return;
    setOpen(false);
    const el = document.querySelector(r.sectionId) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (el) {
      el.classList.add("ring-2", "ring-primary/60", "rounded-xl");
      setTimeout(
        () =>
          el.classList.remove(
            "ring-2",
            "ring-primary/60",
            "rounded-xl"
          ),
        900
      );
    }
  };

  // ---------- UI ----------
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Optimierter Wallpaper-Hintergrund mit img Tag */}
      <img
        src="/backgroundimg.jpg"
        alt=""
        className="absolute inset-0 -z-20 w-full h-full object-cover opacity-60"
        aria-hidden="true"
        loading="eager"
        decoding="async"
      />

      {/* leichtes Overlay für bessere Lesbarkeit */}
      <div
        className="absolute inset-0 -z-10 bg-background/70"
        aria-hidden="true"
      />

      <div className="container max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            {/* Willkommenstext + Vision + Zitat */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Hello World!
              </h1>
              <p className="mt-3 text-lg text-foreground/70">
                Ich bin{" "}
                <span className="text-primary">Johannes Ellmer</span>, , HTL-Schüler im
                Bereich Informatik und angehender Softwareentwickler mit großem Interesse
                an performanten Web-Anwendungen, sauberen APIs und klaren Datenmodellen.
                </p>
               <p className="mt-3 text-sm text-foreground/60 border-l-2 border-primary/60 pl-3 italic">
                „Any fool can write code that a computer can understand. 
                Good programmers write code that humans can understand.“
                <br />
                <span className="not-italic font-normal">– Martin Fowler</span>
  </p>
            </div>

            {/* Suchleiste */}
            <div ref={boxRef} className="mb-5 relative">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-2xl border bg-background/80 backdrop-blur px-3 py-2",
                  "focus-within:border-input focus-within:ring-1 focus-within:ring-ring transition"
                )}
              >
                <Search className="h-4 w-4 text-foreground/60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    setActiveIdx(0);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveIdx((i) =>
                        Math.min(i + 1, Math.max(0, results.length - 1))
                      );
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveIdx((i) => Math.max(i - 1, 0));
                    }
                    if (e.key === "Enter") goTo(results[activeIdx]);
                    if (e.key === "Escape") {
                      setOpen(false);
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  placeholder="Suche nach Projekten, Zertifikaten, Skills …"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-foreground/50"
                  aria-label="Seitensuche"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setActiveIdx(0);
                      setOpen(false);
                      inputRef.current?.focus();
                    }}
                    className="text-xs text-foreground/60 hover:text-foreground"
                  >
                    Löschen
                  </button>
                )}
              </div>

              {open && results.length > 0 && (
                <div
                  className="absolute mt-2 w-full rounded-xl border bg-background/95 backdrop-blur shadow-lg overflow-hidden z-20"
                  role="listbox"
                >
                  {results.map((r, i) => (
                    <button
                      key={r.kind + r.label + i}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => goTo(r)}
                      onMouseEnter={() => setActiveIdx(i)}
                      role="option"
                      aria-selected={activeIdx === i}
                      className={cn(
                        "w-full text-left px-3 py-2 flex items-center justify-between gap-2",
                        activeIdx === i
                          ? "bg-white/6"
                          : "hover:bg-white/4"
                      )}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm">{r.label}</div>
                        {r.meta && (
                          <div className="truncate text-xs text-foreground/60">
                            {r.meta}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-foreground/70">
                        {r.kind}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info-Text */}
            <p className="mt-4 text-foreground/85 max-w-prose leading-relaxed">
              Schau dich um und entdecke meine Projekte, Zertifikate und Fähigkeiten.
              Wenn du Fragen hast oder dir eine Zusammenarbeit vorstellen kannst,
              freue ich mich über deine Nachricht.
            </p>

            {/* Kontakt */}
            <div className="mt-6 flex flex-col gap-2 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>St. Johann im Pongau, Österreich</span>
              </div>
              <a
                href="mailto:johannes.ellmer@htl-saalfelden.at"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail size={16} /> johannes.ellmer@htl-saalfelden.at
              </a>
              <a
                href="https://github.com/JohannesEllmer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Bild */}
          <div className="order-1 md:order-2">
            <MotionWrapper>
              <div className="flex justify-center md:justify-end">
                <div className="relative group">
                  <div className="pointer-events-none absolute -inset-[2px] rounded-2xl bg-[conic-gradient(from_200deg,theme(colors.chart.3),theme(colors.primary),transparent_70%)] opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="rounded-2xl border border-white/15 bg-background/70 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    <img
                      src={personalInfo.profilePicture}
                      alt="Johannes Ellmer – Porträt"
                      className="block w-full h-auto object-cover aspect-[3/4] max-w-xs mx-auto"
                      loading="eager"
                      decoding="async"
                      width={300}
                      height={400}
                    />
                  </div>
                  <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10 rounded-3xl opacity-60 blur-xl"></div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>

        {/* Quicklinks */}
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <a
            href="#projects"
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          >
            Projekte <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#certificates"
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          >
            Zertifikate <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#career"
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          >
            Werdegang <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
