import type { AppDatabase, SavedCardIds } from "./storageTypes";
import { enqueueSync } from "./syncQueueRepository";

export async function loadSavedCardIds(db: AppDatabase): Promise<SavedCardIds> {
  return new Set(db.store.savedCardIds);
}

export async function setCardSaved(db: AppDatabase, cardId: string, saved: boolean): Promise<void> {
  const savedCardIds = new Set(db.store.savedCardIds);
  if (saved) savedCardIds.add(cardId);
  else savedCardIds.delete(cardId);
  db.store.savedCardIds = [...savedCardIds];
  await enqueueSync(db, saved ? "saved_card_added" : "saved_card_removed", saved ? { cardId, savedAt: Date.now() } : { cardId });
}
