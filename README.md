# 💍 Wedding Invitation Website

An elegant, fully-configurable digital wedding invitation built with **Next.js 16 + TypeScript + Tailwind CSS v4**, designed for one-click deployment on **Vercel**.

Everything — names, dates, venues, photos, colors, music, contacts — lives in a
single config file. No coding needed to reuse it for a different wedding.

---

## ✨ Features ("Aurelia" theme)

- **Opening overlay** — tappable wax seal "You are invited"
- **Hero** — couple names + a **scratch-the-heart to reveal the date**, live countdown, add-to-calendar (.ics)
- **Our Story** — vertical milestone timeline
- **Gallery** with full-screen lightbox + "try your own photo" preview
- **Wedding Weekend** timeline — Mehndi, Haldi, Welcome, Ceremony, Reception with dress codes
- **Location** with on-demand embedded Google Map + directions
- **Good to know** — dress code, stay, gifts cards
- **RSVP** — joyfully accept / regretfully decline, guest count, celebrations, send a blessing → Google Sheets
- **Background music** toggle
- **Multi-language** (English / Hindi, easily extendable)
- Smooth scroll, scroll-reveal animations, mobile-responsive
- **Configurable palette & fonts** (rose · sage · gold · ivory; Cinzel + Cormorant + Dancing Script)

---

## 🗂️ Project structure

```
src/
  config/
    wedding.config.ts   ← EDIT EVERYTHING HERE (content, dates, colors, photos)
    i18n.ts             ← UI button/label translations
  lib/                  ← hooks (countdown, smooth scroll, locale)
  components/           ← Intro, Hero, Story, Gallery, Weekend, Location, GoodToKnow, Rsvp, Footer…
  app/
    page.tsx            ← assembles the sections
    layout.tsx          ← fonts + theme injection
    api/rsvp/route.ts   ← RSVP → Google Sheets
public/
  photos/               ← your images (placeholders included)
  audio/theme.mp3       ← background music (add your own)
google-apps-script/
  Code.gs               ← the Google Sheets backend script
```

---

## 🛠️ Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

---

## 🎨 Customizing (no code)

Open **`src/config/wedding.config.ts`** and edit:

| What | Where |
|------|-------|
| Couple names, monogram | `couple` |
| Colors | `theme` |
| Opening seal | `intro` |
| Wedding date, city, hero photo | `hero` |
| Story milestones | `story.milestones[]` |
| All celebrations | `weekend.events[]` |
| Gallery photos | `gallery.images[]` |
| RSVP options (max guests, blessing) | `rsvp` |
| Good to know cards | `goodToKnow.items[]` |
| Location & map | `location` |
| Music file | `music.src` |
| Languages shown | `locales` |

### Replacing photos
Drop your images into `public/photos/` and point the config at them, e.g.
`backgroundImage: "/photos/hero.jpg"`. Any `.jpg/.png/.webp` works. The included
placeholders are `.svg` — swap in real photos and update the paths.

### Adding music
Put an MP3 at `public/audio/theme.mp3` (or set `music.src` to any URL).

### Google Maps
Set `location.mapUrl` (directions link) and `location.mapEmbedUrl`
(Google Maps → Share → **Embed a map** → copy the `src` URL).

---

## 📊 RSVP → Google Sheets (free, no database)

1. Create a Google Sheet with one tab: **RSVP** (headers listed in `google-apps-script/Code.gs`).
2. **Extensions → Apps Script**, paste `google-apps-script/Code.gs`.
3. **Deploy → New deployment → Web app** → Execute as *Me*, Access *Anyone*.
4. Copy the Web App URL.
5. Add it as an environment variable `SHEETS_WEBAPP_URL` (locally in `.env`, and in Vercel).

> Without `SHEETS_WEBAPP_URL`, the site still runs — RSVPs are logged to the
> server console (dev only).

---

## 🚀 Deploy to Vercel

1. Push this folder to a **GitHub** repo.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repo.
3. Framework preset auto-detects **Next.js** — just click **Deploy**.
4. (Optional) In **Project → Settings → Environment Variables**, add:
   - `SHEETS_WEBAPP_URL` = your Apps Script URL
   - `NEXT_PUBLIC_SITE_URL` = your final domain (for social share images)
5. Redeploy. Done — your invite is live! 🎉

Every `git push` auto-deploys a new version.

---

## 🌐 Adding another language

1. Add the locale code to `locales` in the config (e.g. `["en", "hi", "gu"]`).
2. Add matching entries in `src/config/i18n.ts`.
3. Provide that language's text in each `LocalizedText` field in the config.

---

Made with ❤️ using Next.js.

