import { rtlLanguages, translations, type LanguageCode } from "./translations";

export type TranslationParams = Record<string, string | number>;
export type TextDirection = "ltr" | "rtl";
export type TextAlignment = "left" | "right";

export const defaultLanguage: LanguageCode = "en";

export function interpolateTranslation(template: string, params?: TranslationParams) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
}

export function normalizeLanguage(value?: string | null): LanguageCode {
  return value && value in translations ? value as LanguageCode : defaultLanguage;
}

export function getTextDirection(language: LanguageCode): TextDirection {
  return rtlLanguages.has(language) ? "rtl" : "ltr";
}

export function getTextAlign(direction: TextDirection): TextAlignment {
  return direction === "rtl" ? "right" : "left";
}
