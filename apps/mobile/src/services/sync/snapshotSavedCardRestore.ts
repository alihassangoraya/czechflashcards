import type { AppDatabase } from "../../database";
import type { SavedCardSnapshotRow } from "./snapshotTypes";

export function applySavedCardSnapshot(db: AppDatabase, rows: SavedCardSnapshotRow[] = []) {
  const savedIds = new Set(db.store.savedCardIds);
  for (const row of rows) savedIds.add(row.card_id);
  db.store.savedCardIds = [...savedIds];
}
