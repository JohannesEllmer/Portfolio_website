  import { personalInfo } from "@/lib/data";
  import { Mail, Linkedin, Github } from "lucide-react";

  export default function Footer() {
    return (
      <>
        {/* --- Kontaktbereich --- */}
        <section
          id="contact"
          className="relative py-20 border-t border-white/10 bg-gradient-to-b from-background via-background/90 to-background/60"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(120,119,198,0.08),transparent)]"></div>

          <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--chart-3)]">
              Kontakt
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Du möchtest zusammenarbeiten oder hast Fragen? Schreib mir gerne eine Nachricht –
              ich freue mich auf den Austausch.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition backdrop-blur-sm"
              >
                <Mail size={16} /> {personalInfo.email}
              </a>

              {/* GitHub */}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition backdrop-blur-sm"
                >
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>
          </div>
        </section>

        {/* --- Impressum --- */}
        <section
          id="impressum"
          className="py-12 bg-gradient-to-t from-background/80 to-background/40 border-t border-white/10 backdrop-blur-md"
        >
          <div className="container max-w-3xl mx-auto px-6 text-center text-sm text-foreground/70">
            <h2 className="text-lg font-semibold mb-4 text-foreground/90 tracking-wide uppercase">
              Impressum
            </h2>

            <div className="space-y-1">
              <p>{personalInfo.name}</p>
              {personalInfo.address && <p>{personalInfo.address}</p>}
              {personalInfo.company && <p>{personalInfo.company}</p>}
              <p>
                E-Mail:{" "}
                <a
                  className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  href={`mailto:${personalInfo.email}`}
                >
                  {personalInfo.email}
                </a>
              </p>
              {personalInfo.legalNote && (
                <p className="mt-2 text-foreground/60">{personalInfo.legalNote}</p>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-foreground/50">
                &copy; {new Date().getFullYear()} {personalInfo.name}. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
