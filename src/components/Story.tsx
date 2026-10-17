"use client";

import Image from "next/image";
import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal, SectionHeading } from "./Reveal";

export function Story() {
  const { tx } = useLocale();
  const { story } = weddingConfig;
  if (!story.enabled) return null;

  return (
    <section id="story" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={tx(story.eyebrow)} title={tx(story.heading)} />

        <div className="relative">
          {/* center line */}
          <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--au-gold)]/50 to-transparent md:block" />

          <div className="space-y-16">
            {story.milestones.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={i}>
                  <div
                    className={`flex flex-col items-center gap-8 md:flex-row ${
                      flip ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-[2rem] border border-[var(--au-gold)]/30 shadow-md md:h-64 md:w-64">
                      <Image src={m.image} alt={tx(m.title)} fill className="object-cover" />
                    </div>

                    <div
                      className={`flex-1 text-center ${
                        flip ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <p className="eyebrow mb-2">{tx(m.eyebrow)}</p>
                      <h3 className="font-script text-4xl text-[var(--au-rose)] md:text-5xl">
                        {tx(m.title)}
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-lg text-[var(--au-ink)]/75 md:mx-0">
                        {tx(m.text)}
                      </p>
                    </div>
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

