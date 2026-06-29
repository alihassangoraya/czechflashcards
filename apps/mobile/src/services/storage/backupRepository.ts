import type { Card, DailyProgress, ReviewState } from "@czech-flashcards/shared";
import { normalizeCards } from "@czech-flashcards/shared";
import type { AppDatabase, CustomCard, StudySettings, WebStore } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import { normalizeStore, persistDatabase } from "./storageCore";
import { loadSettings } from "./settingsRepository";

export function exportBackup(db: AppDatabase): Record<string, unknown> {
  return {
    exportedAt: new Date().toISOString(),
    store: db.store,
    reviewStates: db.store.reviewStates,
    reviews: db.store.reviews,
    dailyProgress: db.store.dailyProgress,
    customCards: Object.values(db.store.customCards).filter((entry) => !entry.deletedAt).map((entry) => entry.card),
    editedCards: db.store.overrides,
    savedCardIds: db.store.savedCardIds,
    settings: db.store.settings
  };
}

export async function restoreBackup(db: AppDatabase, payload: unknown): Promise<StudySettings> {
  if (!payload || typeof payload !== "object") throw new Error("Backup file is not valid JSON.");
  const backup = payload as Partial<WebStore> & {
    store?: Partial<WebStore>;
    progress?: Record<string, ReviewState>;
    reviewStates?: Record<string, ReviewState>;
    importedCards?: Card[];
    customCards?: Card[];
    editedCards?: Record<string, Card>;
    savedCardIds?: string[];
    dailyLog?: Record<string, DailyProgress>;
    dailyProgress?: Record<string, DailyProgress>;
    dailyGoal?: number;
    examLevel?: StudySettings["examLevel"];
    meaningLanguage?: StudySettings["meaningLanguage"];
    settings?: StudySettings;
  };
  const source = backup.store || backup;
  const previousCards = db.store.cards;
  db.store = normalizeStore({
    ...db.store,
    ...source,
    cards: Array.isArray(source.cards) ? normalizeCards(source.cards) : previousCards,
    reviewStates: backup.reviewStates || backup.progress || source.reviewStates || {},
    reviews: Array.isArray(source.reviews) ? source.reviews : [],
    dailyProgress: backup.dailyProgress || backup.dailyLog || source.dailyProgress || {},
    customCards: normalizeCustomCards(source.customCards || backup.customCards || backup.importedCards),
    overrides: backup.editedCards || source.overrides || {},
    savedCardIds: Array.isArray(backup.savedCardIds || source.savedCardIds) ? (backup.savedCardIds || source.savedCardIds || []).filter((id) => typeof id === "string") : [],
    settings: normalizeRestoredSettings(backup.settings || source.settings, backup)
  });
  await persistDatabase(db);
  return loadSettings(db);
}

function normalizeCustomCards(value: unknown): Record<string, CustomCard> {
  if (!value) return {};
  if (!Array.isArray(value) && typeof value === "object") return value as Record<string, CustomCard>;
  const cards = normalizeCards(value as Card[]);
  return Object.fromEntries(cards.map((card) => [card.id, { card }]));
}

function normalizeRestoredSettings(settings: StudySettings | undefined, backup: { dailyGoal?: number; examLevel?: StudySettings["examLevel"]; meaningLanguage?: StudySettings["meaningLanguage"] }): StudySettings {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    dailyGoal: Number(settings?.dailyGoal || backup.dailyGoal) || DEFAULT_SETTINGS.dailyGoal,
    examLevel: settings?.examLevel || backup.examLevel || DEFAULT_SETTINGS.examLevel,
    meaningLanguage: settings?.meaningLanguage || backup.meaningLanguage || DEFAULT_SETTINGS.meaningLanguage,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...settings?.notifications }
  };
}
