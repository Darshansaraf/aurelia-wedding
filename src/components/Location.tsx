"use client";

import { useState } from "react";
import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal, SectionHeading } from "./Reveal";

export function Location() {
  const { tx, t } = useLocale();
  const { location } = weddingConfig;
  const [showMap, setShowMap] = useState(false);
  if (!location.enabled) return null;

  return (
    <section id="location" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow={tx(location.eyebrow)} title={tx(location.heading)} />

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[var(--au-gold)]/20 bg-white/70 shadow-sm backdrop-blur-sm">
            <div className="p-8 text-center">
              <h3 className="font-serif text-3xl text-[var(--au-rose)]">
                {tx(location.venueName)}
              </h3>
              <p className="mt-2 text-[var(--au-ink)]/70">{tx(location.address)}</p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--au-rose)] px-6 py-2 text-sm uppercase tracking-wider text-white transition hover:opacity-90"
                >
                  {t("get_directions")}
                </a>
                {!showMap ? (
                  <button
                    onClick={() => setShowMap(true)}
                    className="rounded-full border border-[var(--au-rose)] px-6 py-2 text-sm uppercase tracking-wider text-[var(--au-rose)] transition hover:bg-[var(--au-rose)] hover:text-white"
                  >
                    {t("show_live_map")}
                  </button>
                ) : null}
              </div>
            </div>

            {showMap ? (
              <iframe
                src={location.mapEmbedUrl}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={tx(location.venueName)}
              />
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

