import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Dancing_Script, Jost } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/config/wedding.config";
import { LocaleProvider } from "@/lib/LocaleContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
});

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-script",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const { couple, theme, hero } = weddingConfig;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${couple.bride.en} & ${couple.groom.en} — Aurelia Wedding Invitation`,
  description: `${couple.bride.en} & ${couple.groom.en} are getting married in ${hero.city.en}. Join us.`,
  openGraph: {
    title: `${couple.bride.en} & ${couple.groom.en} — Wedding`,
    description: `Join us as we celebrate our wedding in ${hero.city.en}.`,
    images: [hero.backgroundImage],
  },
};

/** Injects the configurable Aurelia palette as CSS variables. */
function ThemeStyle() {
  const css = `:root{
    --au-rose:${theme.rose};
    --au-rose-light:${theme.roseLight};
    --au-rose-muted:${theme.roseMuted};
    --au-sage:${theme.sage};
    --au-sage-dark:${theme.sageDark};
    --au-gold:${theme.gold};
    --au-cream:${theme.cream};
    --au-ivory:${theme.ivory};
    --au-ink:${theme.ink};
  }`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={weddingConfig.locales[0]}>
      <head>
        <ThemeStyle />
      </head>
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${script.variable} ${jost.variable} bg-parchment min-h-full`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
