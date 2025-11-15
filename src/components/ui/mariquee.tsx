import { ReactNode } from "react";

export default function Marquee({ children, speed=30 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex gap-10 min-w-full animate-[marquee_linear_infinite] will-change-transform"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      `}</style>
    </div>
  );
}
