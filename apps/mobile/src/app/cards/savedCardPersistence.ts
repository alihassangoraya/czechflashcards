import { loadSavedCardIds, setCardSaved, type AppDatabase } from "../../database";
import type { SavedCardIds } from "./savedCardState";

export async function persistSavedCardState(db: AppDatabase, cardId: string, saved: boolean) {
  await setCardSaved(db, cardId, saved);
}

export async function reloadSavedCardIds(db: AppDatabase): Promise<SavedCardIds> {
  return loadSavedCardIds(db);
}
