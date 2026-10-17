"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { useCountdown } from "@/lib/useCountdown";

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Canvas scratch-off heart revealing the wedding date. */
function ScratchHeart({ onRevealed }: { onRevealed: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const revealed = useRef(false);

  const paintCover = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d8b3a4");
    grad.addColorStop(1, "#9fb09b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    paintCover(ctx, w, h);
  }, [paintCover]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkCleared();
  };

  const checkCleared = () => {
    if (revealed.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 40) > 0.5) {
      revealed.current = true;
      ctx.clearRect(0, 0, width, height);
      onRevealed();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-pointer touch-none"
      onMouseDown={() => (drawing.current = true)}
      onMouseUp={() => (drawing.current = false)}
      onMouseLeave={() => (drawing.current = false)}
      onMouseMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
      onTouchStart={() => (drawing.current = true)}
      onTouchEnd={() => (drawing.current = false)}
      onTouchMove={(e) => {
        const tch = e.touches[0];
        scratch(tch.clientX, tch.clientY);
      }}
    />
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/10 text-2xl text-white backdrop-blur-sm md:h-20 md:w-20 md:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-white/80">
        {label}
      </span>
    </div>
  );
}

function downloadIcs() {
  const { hero, couple } = weddingConfig;
  const dt = new Date(hero.weddingDate);
  const end = new Date(dt.getTime() + 4 * 3600 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(dt)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${couple.bride.en} & ${couple.groom.en} — Wedding`,
    `LOCATION:${hero.city.en}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function Hero() {
  const { tx, t, locale } = useLocale();
  const { couple, hero } = weddingConfig;
  const [revealed, setRevealed] = useState(false);
  const time = useCountdown(hero.weddingDate);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Wedding hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--au-ink)]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--au-ivory)]" />
      </div>

      <div className="relative z-10 px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-5 text-sm uppercase tracking-[0.35em] text-white/85"
        >
          {tx(couple.families)}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-title text-xs tracking-[0.3em] text-white/80 md:text-sm"
        >
          {tx(hero.titleLead)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="my-3 font-script text-6xl leading-none md:text-8xl"
        >
          {tx(hero.titleEmphasis)}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl">
            {tx(couple.bride)}
            <span className="mx-3 text-[var(--au-gold)]">&amp;</span>
            {tx(couple.groom)}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/80">
            {tx(hero.subtitle)} · {tx(hero.city)}
          </p>
        </motion.div>

        {/* Scratch-to-reveal heart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mx-auto mt-8 w-full max-w-sm"
        >
          <div
            className="au-heartbeat relative mx-auto flex h-28 items-center justify-center overflow-hidden md:h-32"
            style={{
              width: "100%",
              maxWidth: "20rem",
              WebkitMaskImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29'%3E%3Cpath d='M16 29s-13-8.4-13-17.3C3 6.1 6.6 3 10.4 3 13 3 15 4.5 16 6.3 17 4.5 19 3 21.6 3 25.4 3 29 6.1 29 11.7 29 20.6 16 29 16 29z' fill='black'/%3E%3C/svg%3E\")",
              maskImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 29'%3E%3Cpath d='M16 29s-13-8.4-13-17.3C3 6.1 6.6 3 10.4 3 13 3 15 4.5 16 6.3 17 4.5 19 3 21.6 3 25.4 3 29 6.1 29 11.7 29 20.6 16 29 16 29z' fill='black'/%3E%3C/svg%3E\")",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <span className="px-6 text-center font-serif text-lg leading-tight text-white md:text-2xl">
              {formatDate(hero.weddingDate, locale)}
            </span>
            {!revealed ? <ScratchHeart onRevealed={() => setRevealed(true)} /> : null}
          </div>
          {!revealed ? (
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/80">
              {tx(hero.scratchPrompt)}
            </p>
          ) : (
            <button
              onClick={downloadIcs}
              className="mt-3 rounded-full border border-white/60 px-6 py-2 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-[var(--au-rose)]"
            >
              {t("add_to_calendar")}
            </button>
          )}
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8"
        >
          {time.done ? (
            <p className="font-serif text-2xl text-white">{t("the_big_day")}</p>
          ) : (
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <Unit value={time.days} label={t("days")} />
              <Unit value={time.hours} label={t("hours")} />
              <Unit value={time.minutes} label={t("minutes")} />
              <Unit value={time.seconds} label={t("seconds")} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

