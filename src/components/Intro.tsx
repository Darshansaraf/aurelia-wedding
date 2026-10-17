"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";

/**
 * Full-screen opening overlay with a tappable wax seal.
 * Replicates the Aurelia "Tap the seal to open" intro.
 */
export function Intro() {
  const { tx, t } = useLocale();
  const { intro, couple } = weddingConfig;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || !intro.enabled ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, intro.enabled]);

  if (!intro.enabled || !mounted) return null;

  return (
    <AnimatePresence>
      {!open ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-parchment px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="eyebrow mb-8"
          >
            {tx(intro.invited)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-script mb-10 text-4xl text-[var(--au-rose)] md:text-5xl"
          >
            {tx(couple.bride)} &amp; {tx(couple.groom)}
          </motion.p>

          <motion.button
            onClick={() => setOpen(true)}
            aria-label={t("open_invite")}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group relative flex h-32 w-32 items-center justify-center rounded-full shadow-xl"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, var(--au-rose-muted), var(--au-rose) 55%, var(--au-sage-dark) 120%)",
            }}
          >
            <span className="absolute inset-2 rounded-full border border-white/40" />
            <span className="font-title text-xl tracking-[0.1em] text-white">
              {intro.monogram}
            </span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 text-sm uppercase tracking-[0.3em] text-[var(--au-sage-dark)]"
          >
            {tx(intro.seal)}
          </motion.p>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 text-xs uppercase tracking-[0.25em] text-[var(--au-ink)]/50 underline-offset-4 hover:underline"
          >
            {t("skip_intro")}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


