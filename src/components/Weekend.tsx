"use client";

import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal, SectionHeading } from "./Reveal";

function fmt(iso: string, locale: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString(locale === "hi" ? "hi-IN" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return { date, time };
}

export function Weekend() {
  const { tx, t, locale } = useLocale();
  const { weekend } = weddingConfig;
  if (!weekend.enabled) return null;

  return (
    <section id="weekend" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow={tx(weekend.eyebrow)} title={tx(weekend.heading)} />

        <div className="relative">
          <span className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--au-gold)]/60 via-[var(--au-rose)]/40 to-transparent md:left-1/2" />

          <div className="space-y-6">
            {weekend.events.map((ev, i) => {
              const { date, time } = fmt(ev.datetime, locale);
              const flip = i % 2 === 1;
              return (
                <Reveal key={ev.id} delay={i * 0.05}>
                  <div
                    className={`relative flex items-start gap-5 pl-14 md:pl-0 ${
                      flip ? "md:flex-row-reverse md:text-right" : ""
                    } md:items-center md:justify-between`}
                  >
                    {/* node */}
                    <span className="absolute left-5 top-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--au-gold)] ring-4 ring-[var(--au-ivory)] md:left-1/2" />

                    <div className="w-full md:w-[46%]">
                      <article className="rounded-2xl border border-[var(--au-gold)]/20 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div
                          className={`mb-2 flex items-center gap-2 ${
                            flip ? "md:justify-end" : ""
                          }`}
                        >
                          <span className="text-2xl">{ev.icon ?? "✦"}</span>
                          <h3 className="font-serif text-3xl text-[var(--au-rose)]">
                            {tx(ev.name)}
                          </h3>
                        </div>
                        <p className="text-sm uppercase tracking-widest text-[var(--au-sage-dark)]">
                          {date} · {time}
                        </p>
                        <p className="mt-2 font-medium text-[var(--au-ink)]">{tx(ev.venue)}</p>
                        {ev.note ? (
                          <p className="text-sm text-[var(--au-ink)]/65">{tx(ev.note)}</p>
                        ) : null}
                        <p className="mt-3 inline-block rounded-full bg-[var(--au-rose-light)] px-3 py-1 text-xs tracking-wide text-[var(--au-rose)]">
                          {t("dress_code")}: {tx(ev.dressCodeLabel)}
                        </p>
                      </article>
                    </div>

                    <div className="hidden md:block md:w-[46%]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

