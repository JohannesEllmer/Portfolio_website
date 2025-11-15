import { useEffect, useState } from "react";

export default function PageProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(p);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] w-full h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-chart-3 via-primary to-chart-2 transition-[width] duration-150"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
