"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export function MusicToggle() {
  const { music } = weddingConfig;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!music.enabled || !music.autoplayAttempt) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.4;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [music.enabled, music.autoplayAttempt]);

  if (!music.enabled) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.volume = 0.4;
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label="Toggle music"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--au-rose)] text-white shadow-lg transition hover:scale-105"
      >
        {playing ? (
          <Pause size={18} />
        ) : (
          <Music size={18} className="animate-pulse" />
        )}
      </button>
    </>
  );
}

