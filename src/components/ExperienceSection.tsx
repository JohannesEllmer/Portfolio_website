import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";

export default function ExperienceSection() {
  // Berufserfahrung absteigend sortiert (letzter Eintrag zuerst)
  const sortedWork = workExperience.slice().reverse();

  return (
    <section id="career" className="py-16 bg-gradient-to-b from-muted/10 to-background">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10 tracking-tight">Werdegang</h2>

        <h3 className="text-lg font-semibold mb-4 text-primary">Berufserfahrung</h3>
        <div className="space-y-6">
          {sortedWork.map((job, i) => (
            <TimelineItem
              key={job.company + job.period}
              title={`${job.position} · ${job.company}`}
              subtitle={job.location}
              date={job.period}
              isLast={i === sortedWork.length - 1}
              index={i}
            >
              {job.achievements?.length ? (
                <ul className="list-disc ml-5 space-y-1 text-sm text-foreground/80">
                  {job.achievements.map((a: string, idx: number) => (
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
