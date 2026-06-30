import type { CustomDeck, StudySettings } from "../../../database";
import type { I18nContextValue } from "../../../i18n/i18nContext";
import type { TranslationKey } from "../../../i18n/translations";

const translatableDeckIds = new Set(["a2-focus", "b1-focus", "saved", "core", "all", "daily", "extended", "travel", "work", "health", "verbs", "forms", "custom", "numbers"]);

export function deckLabel(value: string, decks: CustomDeck[], t?: I18nContextValue["t"]) {
  const customDeck = decks.find((deck) => deck.id === value);
  if (customDeck) return customDeck.name;
  if (t && translatableDeckIds.has(value)) return t(`deck.${value}` as TranslationKey);
  return titleCase(value);
}

export function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

export function slug(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function normalizeReminderTime(value: string): string | null {
  const trimmed = value.trim();
  const match = /^(\d{1,2})(?::?(\d{2}))?$/.exec(trimmed);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2] || "0");
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export type ReminderSettings = StudySettings["notifications"];
