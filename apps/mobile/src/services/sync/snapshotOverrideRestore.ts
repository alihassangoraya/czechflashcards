import type { AppDatabase } from "../../database";
import type { CardOverrideSnapshotRow } from "./snapshotTypes";

export function applyCardOverrideSnapshot(db: AppDatabase, rows: CardOverrideSnapshotRow[] = []) {
  for (const row of rows) {
    db.store.overrides[row.card_id] = row.payload;
  }
}
