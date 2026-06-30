import { en } from "./locales/en";
import { cs } from "./locales/cs";
import { hi } from "./locales/hi";
import { ur } from "./locales/ur";

export const translations = { en, cs, hi, ur } as const;

export type LanguageCode = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export const languageOptions: LanguageCode[] = ["en", "cs", "hi", "ur"];
export const rtlLanguages = new Set<LanguageCode>(["ur"]);
