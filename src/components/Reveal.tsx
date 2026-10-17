"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Fades + slides content in once when scrolled into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, light }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 text-center">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2
        className={`font-serif text-5xl md:text-6xl ${
          light ? "text-white" : "text-[var(--au-rose)]"
        }`}
      >
        {title}
      </h2>
      <div className="flourish mt-6">
        <span className="text-base">&#10048;</span>
      </div>
    </Reveal>
  );
}

