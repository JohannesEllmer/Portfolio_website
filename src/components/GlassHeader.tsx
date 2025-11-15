import ThemeToggle from "./ui/ThemeToggle";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



const LINKS = [
  { href: "#skills", label: "Tech Stack" },
  { href: "#projects", label: "Projekte" },
  { href: "#certificates", label: "Zertifikate" },
  { href: "#career", label: "Werdegang" },
  { href: "#education", label: "Ausbildung" },
  { href: "#contact", label: "Kontakt" },
  { href: "#impressum", label: "Impressum" },
];

export default function GlassHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <motion.a
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={"/favicon.png"}
            alt="Logo Johannes Ellmer"
            className="h-8 w-8"
          />
          <span>{personalInfo?.name ?? "Johannes Ellmer"}</span>
        </motion.a>

        {/* Hauptnavigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-foreground/70">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>

        {/* Theme-Toggle + Burger-Button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2"
            aria-label="Navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile-Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-border/20 bg-background/90 backdrop-blur px-4 py-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className="py-2 text-sm text-foreground/80 hover:text-foreground"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
