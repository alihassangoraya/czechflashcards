import type { TranslationKey } from "../../../i18n/translations";
import type { I18nContextValue } from "../../../i18n/i18nContext";
import type { Category } from "../models/homeContent";

const translatableDeckIds = new Set(["a2-focus", "b1-focus", "saved", "core", "all", "daily", "extended", "travel", "work", "health", "verbs", "forms", "custom", "numbers"]);

export function getDeckTitle(category: Category, t: I18nContextValue["t"]) {
  return translatableDeckIds.has(category.id) ? t(`deck.${category.id}` as TranslationKey) : category.title;
}
