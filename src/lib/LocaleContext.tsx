"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { weddingConfig, type Locale, type LocalizedText } from "@/config/wedding.config";
import { ui } from "@/config/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** translate a static UI key */
  t: (key: string) => string;
  /** resolve a localized content field */
  tx: (field: LocalizedText | undefined) => string;
  locales: Locale[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(weddingConfig.locales[0]);

  useEffect(() => {
    const saved = window.localStorage.getItem("locale") as Locale | null;
    if (saved && weddingConfig.locales.includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => ui[locale]?.[key] ?? ui.en[key] ?? key,
    [locale],
  );

  const tx = useCallback(
    (field: LocalizedText | undefined) =>
      field ? field[locale] ?? field.en ?? "" : "",
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tx, locales: weddingConfig.locales }),
    [locale, setLocale, t, tx],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

