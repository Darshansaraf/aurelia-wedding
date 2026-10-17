"use client";

import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal, SectionHeading } from "./Reveal";

export function GoodToKnow() {
  const { tx } = useLocale();
  const { goodToKnow } = weddingConfig;
  if (!goodToKnow.enabled) return null;

  return (
    <section id="good-to-know" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={tx(goodToKnow.eyebrow)} title={tx(goodToKnow.heading)} />

        <div className="grid gap-6 md:grid-cols-3">
          {goodToKnow.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--au-gold)]/20 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
                <div className="mb-3 text-3xl">{item.icon ?? "✦"}</div>
                <h3 className="font-serif text-2xl text-[var(--au-rose)]">{tx(item.title)}</h3>
                <p className="mt-3 text-[var(--au-ink)]/70">{tx(item.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

