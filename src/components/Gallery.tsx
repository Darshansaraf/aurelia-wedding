"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal, SectionHeading } from "./Reveal";

const shapeClass: Record<string, string> = {
  tall: "row-span-2 aspect-[3/4]",
  wide: "col-span-2 aspect-[16/9]",
  square: "aspect-square",
};

export function Gallery() {
  const { tx, t } = useLocale();
  const { gallery } = weddingConfig;
  const [index, setIndex] = useState(-1);
  const [custom, setCustom] = useState<Record<number, string>>({});

  if (!gallery.enabled) return null;

  const onPick = (i: number, file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustom((c) => ({ ...c, [i]: url }));
  };

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={tx(gallery.eyebrow)} title={tx(gallery.heading)} />

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.images.map((img, i) => {
            const src = custom[i] ?? img.src;
            return (
              <Reveal
                key={img.src}
                delay={i * 0.04}
                className={`${shapeClass[img.shape ?? "square"]} group relative overflow-hidden rounded-2xl`}
              >
                <button onClick={() => setIndex(i)} className="relative block h-full w-full">
                  <Image
                    src={src}
                    alt={img.alt}
                    fill
                    unoptimized={!!custom[i]}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-[var(--au-ink)]/0 transition group-hover:bg-[var(--au-ink)]/15" />
                </button>

                {gallery.allowTryYourPhoto ? (
                  <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white/85 px-3 py-1 text-[0.6rem] uppercase tracking-wider text-[var(--au-rose)] opacity-0 transition group-hover:opacity-100">
                    {custom[i] ? t("reset_photo") : t("try_your_photo")}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onClick={(e) => {
                        if (custom[i]) {
                          e.preventDefault();
                          setCustom((c) => {
                            const n = { ...c };
                            delete n[i];
                            return n;
                          });
                        }
                      }}
                      onChange={(e) => onPick(i, e.target.files?.[0])}
                    />
                  </label>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={gallery.images.map((img, i) => ({
          src: custom[i] ?? img.src,
          alt: img.alt,
        }))}
      />
    </section>
  );
}

