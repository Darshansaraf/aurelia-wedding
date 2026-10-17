"use client";

import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal } from "./Reveal";

export function Footer() {
  const { tx, t } = useLocale();
  const { couple, footer } = weddingConfig;

  return (
    <footer className="relative border-t border-[var(--au-gold)]/20 py-20 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="flourish mb-8">
            <span>&#10048;</span>
          </div>
          <p className="font-script text-2xl text-[var(--au-sage-dark)]">{tx(footer.signoff)}</p>
          <p className="mt-3 font-serif text-5xl text-[var(--au-rose)] md:text-6xl">
            {tx(couple.bride)} &amp; {tx(couple.groom)}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--au-ink)]/50 underline-offset-4 hover:underline"
          >
            {t("back_to_top")} ↑
          </button>
        </Reveal>
      </div>
    </footer>
  );
}

