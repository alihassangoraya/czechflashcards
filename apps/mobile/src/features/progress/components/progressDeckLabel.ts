import type { TranslationKey } from "../../../i18n/translations";

const builtInDecks = new Set(["a2-focus", "b1-focus", "saved", "core", "all", "daily", "extended", "travel", "work", "health", "verbs", "forms", "custom", "numbers"]);

export function progressDeckLabel(value: string, t: (key: TranslationKey) => string) {
  if (value === "all") return t("progress.allVocabulary");
  return builtInDecks.has(value) ? t(`deck.${value}` as TranslationKey) : value;
}
