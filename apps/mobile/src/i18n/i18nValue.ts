import { getTextAlign, getTextDirection, interpolateTranslation, normalizeLanguage, type TranslationParams } from "./i18nCore";
import type { I18nContextValue } from "./i18nContext";
import { translations, type TranslationKey } from "./translations";

export function createI18nValue(language?: string | null): I18nContextValue {
  const normalizedLanguage = normalizeLanguage(language);
  const catalog = translations[normalizedLanguage] as Partial<Record<TranslationKey, string>>;
  const direction = getTextDirection(normalizedLanguage);

  return {
    language: normalizedLanguage,
    direction,
    textAlign: getTextAlign(direction),
    t: (key, params?: TranslationParams) => interpolateTranslation(catalog[key] || translations.en[key] || key, params)
  };
}
