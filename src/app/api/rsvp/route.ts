import { NextResponse } from "next/server";

/**
 * RSVP endpoint.
 *
 * Forwards the submission to a Google Apps Script Web App (Google Sheets
 * backend) configured via the SHEETS_WEBAPP_URL environment variable.
 * If the env var is not set, the submission is just logged so the site
 * still works in development.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = process.env.SHEETS_WEBAPP_URL;

    if (!url) {
      console.log("[RSVP] (no SHEETS_WEBAPP_URL set) received:", body);
      return NextResponse.json({ ok: true, dev: true });
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "rsvp", ...body }),
    });

    if (!res.ok) throw new Error(`Sheets responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[RSVP] error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

