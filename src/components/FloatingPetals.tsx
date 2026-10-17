"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotate: number;
}

/**
 * Gentle falling petals for ambiance (decorative only).
 * Generated on the client after mount so static prerender stays deterministic.
 */
export function FloatingPetals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        size: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 120,
        rotate: Math.random() * 360,
      })),
    );
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-10vh", x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{
            y: "110vh",
            x: p.drift,
            rotate: p.rotate + 180,
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          className="absolute top-0"
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <path
              d="M10 1c3 3 6 5 6 9a6 6 0 0 1-12 0c0-4 3-6 6-9z"
              fill="var(--au-rose-light)"
              opacity="0.9"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}


