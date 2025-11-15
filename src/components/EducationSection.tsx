import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";

export default function EducationSection() {
  return (
    <section id="education" className="py-12 bg-gradient-to-b from-background to-muted/10">
      <div className="container max-w-5xl mx-auto px-6">
        <h3 className="text-lg font-semibold mb-4 text-primary">Ausbildung</h3>

        <div className="space-y-6">
          {education.map((ed, i) => (
            <TimelineItem
              key={ed.institution + ed.period}
              title={ed.degree}
              subtitle={`${ed.institution}${ed.location ? " · " + ed.location : ""}`}
              date={ed.period}
              isLast={i === education.length - 1}
              index={i}
            >
              {ed.achievements?.length ? (
                <ul className="list-disc ml-5 space-y-1 text-sm text-foreground/80">
                  {ed.achievements.map((a: string, idx: number) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              ) : null}
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}
