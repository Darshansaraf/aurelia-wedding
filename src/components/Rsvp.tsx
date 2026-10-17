"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { weddingConfig } from "@/config/wedding.config";
import { useLocale } from "@/lib/LocaleContext";
import { Reveal, SectionHeading } from "./Reveal";

interface RsvpForm {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  guests: number;
  events: string[];
  blessing: string;
}

export function Rsvp() {
  const { tx, t, locale } = useLocale();
  const { rsvp, weekend } = weddingConfig;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const { register, handleSubmit, watch, reset } = useForm<RsvpForm>({
    defaultValues: { attending: "yes", guests: 1, events: [] },
  });
  const attending = watch("attending");

  if (!rsvp.enabled) return null;

  const onSubmit = async (data: RsvpForm) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-xl border border-[var(--au-gold)]/30 bg-white/80 px-4 py-3 text-[var(--au-ink)] outline-none focus:border-[var(--au-rose)]";

  const guestOptions = Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1);

  return (
    <section id="rsvp" className="py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading eyebrow={tx(rsvp.eyebrow)} title={tx(rsvp.heading)} />
        <Reveal className="-mt-8 mb-8 text-center">
          <p className="text-[var(--au-ink)]/70">{tx(rsvp.deadline)}</p>
        </Reveal>

        {status === "done" ? (
          <Reveal>
            <p className="rounded-2xl bg-[var(--au-rose-light)] p-10 text-center text-lg text-[var(--au-rose)]">
              {t("rsvp_success")}
            </p>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input className={field} placeholder={t("rsvp_name")} {...register("name", { required: true })} />

              <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} type="email" placeholder={t("rsvp_email")} {...register("email")} />
                <input className={field} placeholder={t("rsvp_phone")} {...register("phone")} />
              </div>

              <div>
                <p className="mb-2 text-sm text-[var(--au-ink)]/70">{t("rsvp_attending_q")}</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--au-gold)]/30 px-4 py-3 text-sm has-checked:border-[var(--au-rose)] has-checked:bg-[var(--au-rose-light)]">
                    <input type="radio" value="yes" {...register("attending")} />
                    {t("rsvp_accept")}
                  </label>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--au-gold)]/30 px-4 py-3 text-sm has-checked:border-[var(--au-sage-dark)] has-checked:bg-[var(--au-sage)]/20">
                    <input type="radio" value="no" {...register("attending")} />
                    {t("rsvp_decline")}
                  </label>
                </div>
              </div>

              {attending === "yes" ? (
                <>
                  <div>
                    <label className="mb-1 block text-sm text-[var(--au-ink)]/70">
                      {t("rsvp_guests")}
                    </label>
                    <select className={field} {...register("guests", { valueAsNumber: true })}>
                      {guestOptions.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-[var(--au-ink)]/70">{t("rsvp_events")}</p>
                    <div className="flex flex-wrap gap-3">
                      {weekend.events.map((e) => (
                        <label
                          key={e.id}
                          className="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--au-gold)]/30 px-4 py-2 text-sm has-checked:border-[var(--au-rose)] has-checked:bg-[var(--au-rose-light)]"
                        >
                          <input type="checkbox" value={e.id} {...register("events")} />
                          {tx(e.name)}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}

              {rsvp.blessingEnabled ? (
                <textarea
                  className={field}
                  rows={3}
                  placeholder={t("rsvp_blessing")}
                  {...register("blessing")}
                />
              ) : null}

              {status === "error" ? (
                <p className="text-sm text-red-500">{t("rsvp_error")}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-[var(--au-rose)] py-3 uppercase tracking-widest text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? t("rsvp_sending") : t("rsvp_submit")}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

