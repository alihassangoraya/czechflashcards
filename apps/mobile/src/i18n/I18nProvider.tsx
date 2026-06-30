import React, { createContext, useContext, useMemo } from "react";
import { I18nManager } from "react-native";
import { rtlLanguages, translations, type LanguageCode, type TranslationKey } from "./translations";

type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  language: LanguageCode;
  direction: "ltr" | "rtl";
  textAlign: "left" | "right";
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

const defaultLanguage: LanguageCode = "en";

const I18nContext = createContext<I18nContextValue>({
  language: defaultLanguage,
  direction: "ltr",
  textAlign: "left",
  t: (key) => translations.en[key]
});

function interpolate(template: string, params?: TranslationParams) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
}

export function normalizeLanguage(value?: string | null): LanguageCode {
  return value && value in translations ? value as LanguageCode : defaultLanguage;
}

export function I18nProvider({ language, children }: { language?: string | null; children: React.ReactNode }) {
  const normalizedLanguage = normalizeLanguage(language);
  const value = useMemo<I18nContextValue>(() => {
    const catalog = translations[normalizedLanguage] as Partial<Record<TranslationKey, string>>;
    const direction = rtlLanguages.has(normalizedLanguage) ? "rtl" : "ltr";

    return {
      language: normalizedLanguage,
      direction,
      textAlign: direction === "rtl" ? "right" : "left",
      t: (key, params) => interpolate(catalog[key] || translations.en[key] || key, params)
    };
  }, [normalizedLanguage]);

  if (I18nManager.isRTL !== (value.direction === "rtl")) {
    I18nManager.allowRTL(value.direction === "rtl");
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
