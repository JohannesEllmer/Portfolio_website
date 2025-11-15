import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

const DEFAULT_SECTIONS: Section[] = [
  { id: "skills",       label: "Tech Stack" },
  { id: "projects",     label: "Projekte" },
  { id: "certificates", label: "Zertifikate" },
  { id: "career",       label: "Werdegang" },
  { id: "education",    label: "Ausbildung" },
  { id: "contact",      label: "Kontakt" },
];

export default function SectionDotsNav({
  sections = DEFAULT_SECTIONS,
  offset = 72,
  minVisibleRatio = 0.5,
}: {
  sections?: Section[];
  offset?: number;
  minVisibleRatio?: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const ratiosRef = useRef<Record<string, number>>({});
  const tickingRef = useRef(false);

  const els = useMemo(() => {
    if (typeof window === "undefined") return [];
    return sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
  }, [sections]);

  useEffect(() => {
    els.forEach((el) => {
      const current = (el as HTMLElement).style.scrollMarginTop;
      if (!current) {
        (el as HTMLElement).style.scrollMarginTop = `${Math.max(0, offset + 8)}px`;
      }
    });
  }, [els, offset]);

  useEffect(() => {
    if (!els.length || typeof window === "undefined") return;

    ratiosRef.current = {};
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratiosRef.current[(e.target as HTMLElement).id] = e.intersectionRatio;
        });

        const best = Object.entries(ratiosRef.current).sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] >= minVisibleRatio && active !== best[0]) {
          setActive(best[0]);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [els, minVisibleRatio]);

  useEffect(() => {
    if (!els.length || typeof window === "undefined") return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;

        const centerY = window.innerHeight / 2;
        let bestId: string | null = null;
        let bestDist = Number.POSITIVE_INFINITY;

        for (const el of els) {
          const rect = el.getBoundingClientRect();
          const distance =
            rect.top <= centerY && rect.bottom >= centerY
              ? 0
              : Math.min(Math.abs(rect.top - centerY), Math.abs(rect.bottom - centerY));

          if (distance < bestDist) {
            bestDist = distance;
            bestId = el.id;
          }
        }

        if (bestId && bestId !== active) {
          setActive(bestId);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [els]);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id) setActive(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    window.history.pushState(null, "", `#${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  if (!sections.length) return null;

  return (
    <nav
      className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-40",
        "hidden lg:flex flex-col gap-2"
      )}
      aria-label="Abschnitt-Navigation"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleClick(e, s.id)}
            aria-label={s.label}
            aria-current={isActive ? "true" : "false"}
            title={s.label}
            className={cn(
              "group relative flex h-11 w-11 items-center justify-center",
              "rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <span
              className={cn(
                "block h-3 w-3 rounded-full border transition-shadow",
                "bg-black/20 border-black/30",
                "dark:bg-white/20 dark:border-white/40",
                // Hover States
                isActive
                  ? [
                      "bg-primary border-primary shadow-[0_0_0_6px_rgba(129,140,248,0.35)]",
                      "dark:bg-yellow-300 dark:border-yellow-300",
                      "dark:shadow-[0_0_0_6px_rgba(250,204,21,0.65)]",
                    ].join(" ")
                  : [
                      "hover:bg-black/30 hover:border-black/50",
                      "dark:hover:bg-yellow-200/40 dark:hover:border-yellow-300",
                    ].join(" ")
              )}
            />
            <span
              className={cn(
                "pointer-events-none absolute right-12 top-1/2 -translate-y-1/2",
                "rounded-md px-2 py-1 text-[11px] leading-none",
                "border bg-background/95 backdrop-blur text-foreground/90 shadow",
                "opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
              )}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
