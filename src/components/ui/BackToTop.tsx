import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={onClick}
      aria-label="Nach oben"
      className={`fixed right-5 bottom-5 z-[55] rounded-full border border-white/15 bg-white/10 backdrop-blur p-3 shadow-sm hover:bg-white/15 transition
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
