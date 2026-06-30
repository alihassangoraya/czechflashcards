import { createContext, useContext } from "react";
import { defaultLanguage, type TextAlignment, type TextDirection, type TranslationParams } from "./i18nCore";
import { translations, type LanguageCode, type TranslationKey } from "./translations";

export type I18nContextValue = {
  language: LanguageCode;
  direction: TextDirection;
  textAlign: TextAlignment;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

export const I18nContext = createContext<I18nContextValue>({
  language: defaultLanguage,
  direction: "ltr",
  textAlign: "left",
  t: (key) => translations.en[key]
});

export function useI18n() {
  return useContext(I18nContext);
}
