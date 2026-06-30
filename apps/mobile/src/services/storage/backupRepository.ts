import type { AppDatabase, StudySettings } from "./storageTypes";
import { persistDatabase } from "./storageCore";
import { loadSettings } from "./settingsRepository";
import { assertBackupPayload } from "./backupPayload";
import { normalizeBackupStore } from "./backupNormalizer";

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
  db.store = normalizeBackupStore(db.store, assertBackupPayload(payload));
  await persistDatabase(db);
  return loadSettings(db);
}
