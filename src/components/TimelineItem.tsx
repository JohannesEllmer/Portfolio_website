import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date?: string;
  isLast?: boolean;
  index?: number;
  children?: React.ReactNode;
}

export default function TimelineItem({
  title,
  subtitle,
  date,
  isLast = false,
  index = 0,
  children,
}: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.18 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="flex h-[18px] w-[18px] rounded-full border border-primary/50 bg-background z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: index * 0.18 + 0.15 }}
          viewport={{ once: true }}
        />
        {!isLast && (
          <motion.div
            className="w-px grow bg-gradient-to-b from-primary/50 to-chart-2/30"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.8, delay: index * 0.18 + 0.25 }}
            viewport={{ once: true }}
          />
        )}
      </div>

      <div className={cn("pb-8", isLast ? "pb-0" : "")}>
        <motion.div
          className="flex flex-col gap-0.5"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.18 + 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-medium">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          {date && <p className="text-xs text-muted-foreground/70 mb-2">{date}</p>}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.18 + 0.35 }} viewport={{ once: true }}>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
