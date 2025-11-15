import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
}
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg border border-border/50 bg-background/80 backdrop-blur-md shadow-sm dark:bg-card/30",
        hoverEffect && "transition-all duration-300 hover:shadow-md",
        className
      )}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      {...props}
    />
  )
);
GlassCard.displayName = "GlassCard";
export { GlassCard };
