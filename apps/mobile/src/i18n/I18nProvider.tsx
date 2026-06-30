import React, { createContext, useContext, useMemo } from "react";
import { I18nManager } from "react-native";
import { defaultLanguage, getTextAlign, getTextDirection, interpolateTranslation, normalizeLanguage, type TextAlignment, type TextDirection, type TranslationParams } from "./i18nCore";
import { translations, type LanguageCode, type TranslationKey } from "./translations";

type I18nContextValue = {
  language: LanguageCode;
  direction: TextDirection;
  textAlign: TextAlignment;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

const I18nContext = createContext<I18nContextValue>({
  language: defaultLanguage,
  direction: "ltr",
  textAlign: "left",
  t: (key) => translations.en[key]
});

export function I18nProvider({ language, children }: { language?: string | null; children: React.ReactNode }) {
  const normalizedLanguage = normalizeLanguage(language);
  const value = useMemo<I18nContextValue>(() => {
    const catalog = translations[normalizedLanguage] as Partial<Record<TranslationKey, string>>;
    const direction = getTextDirection(normalizedLanguage);

    return {
      language: normalizedLanguage,
      direction,
      textAlign: getTextAlign(direction),
      t: (key, params) => interpolateTranslation(catalog[key] || translations.en[key] || key, params)
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
