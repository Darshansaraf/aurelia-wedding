"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { weddingConfig } from "@/config/wedding.config";

const links = [
  { id: "story", key: "nav_story", on: () => weddingConfig.story.enabled },
  { id: "gallery", key: "nav_gallery", on: () => weddingConfig.gallery.enabled },
  { id: "weekend", key: "nav_weekend", on: () => weddingConfig.weekend.enabled },
  { id: "location", key: "nav_location", on: () => weddingConfig.location.enabled },
  { id: "rsvp", key: "nav_rsvp", on: () => weddingConfig.rsvp.enabled },
];

export function Navbar() {
  const { t, locale, setLocale, locales } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const visible = links.filter((l) => l.on());

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[var(--au-ivory)]/90 py-3 shadow-sm backdrop-blur" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-script text-2xl ${scrolled ? "text-[var(--au-rose)]" : "text-white"}`}
        >
          {weddingConfig.couple.monogram}
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {visible.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`nav-link font-title text-xs tracking-[0.2em] ${
                  scrolled ? "text-[var(--au-ink)]" : "text-white"
                }`}
              >
                {t(l.key)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {locales.length > 1 ? (
            <div
              className={`flex overflow-hidden rounded-full border text-xs ${
                scrolled ? "border-[var(--au-gold)]/40" : "border-white/50"
              }`}
            >
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-3 py-1 uppercase transition ${
                    locale === l
                      ? "bg-[var(--au-rose)] text-white"
                      : scrolled
                        ? "text-[var(--au-ink)]/70"
                        : "text-white/80"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          ) : null}

          <button
            onClick={() => setOpen((o) => !o)}
            className={`md:hidden ${scrolled ? "text-[var(--au-rose)]" : "text-white"}`}
            aria-label="Menu"
          >
            <span className="mb-1.5 block h-0.5 w-6 bg-current" />
            <span className="mb-1.5 block h-0.5 w-6 bg-current" />
            <span className="block h-0.5 w-6 bg-current" />
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="mt-3 flex flex-col gap-1 bg-[var(--au-ivory)] px-5 py-4 md:hidden">
          {visible.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="w-full py-2 text-left font-title text-xs tracking-[0.2em] text-[var(--au-ink)]"
              >
                {t(l.key)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}

