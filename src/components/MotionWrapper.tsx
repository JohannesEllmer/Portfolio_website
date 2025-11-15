import * as React from "react";
import { motion, type MotionProps, type Variants } from "framer-motion";

interface Props extends MotionProps {
  children: React.ReactNode;
  delay?: number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  // visible wird als Funktion deklariert, die das `custom`-Prop (hier: delay) entgegennimmt
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MotionWrapper({ children, delay = 0, ...props }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      custom={delay}
      {...props}
    >
      {children}
    </motion.div>
  );
}
