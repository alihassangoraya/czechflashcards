import type { Card } from "@czech-flashcards/shared";
import { normalizeCards } from "@czech-flashcards/shared";
import type { CustomCards, StudySettings, WebStore } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import { normalizeStore } from "./storageCore";
import type { BackupPayload } from "./backupPayload";

export function normalizeBackupStore(current: WebStore, backup: BackupPayload): WebStore {
  const source = backup.store || backup;

  return normalizeStore({
    ...current,
    ...source,
    cards: Array.isArray(source.cards) ? normalizeCards(source.cards) : current.cards,
    reviewStates: backup.reviewStates || backup.progress || source.reviewStates || {},
    reviews: Array.isArray(source.reviews) ? source.reviews : [],
    dailyProgress: backup.dailyProgress || backup.dailyLog || source.dailyProgress || {},
    customCards: normalizeCustomCards(source.customCards || backup.customCards || backup.importedCards),
    overrides: backup.editedCards || source.overrides || {},
    savedCardIds: normalizeSavedCardIds(backup.savedCardIds || source.savedCardIds),
    settings: normalizeRestoredSettings(backup.settings || source.settings, backup)
  });
}

function normalizeCustomCards(value: unknown): CustomCards {
  if (!value) return {};
  if (!Array.isArray(value) && typeof value === "object") return value as CustomCards;
  const cards = normalizeCards(value as Card[]);
  return Object.fromEntries(cards.map((card) => [card.id, { card }]));
}

function normalizeSavedCardIds(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
}

function normalizeRestoredSettings(settings: StudySettings | undefined, backup: BackupPayload): StudySettings {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    dailyGoal: Number(settings?.dailyGoal || backup.dailyGoal) || DEFAULT_SETTINGS.dailyGoal,
    examLevel: settings?.examLevel || backup.examLevel || DEFAULT_SETTINGS.examLevel,
    meaningLanguage: settings?.meaningLanguage || backup.meaningLanguage || DEFAULT_SETTINGS.meaningLanguage,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...settings?.notifications }
  };
}
