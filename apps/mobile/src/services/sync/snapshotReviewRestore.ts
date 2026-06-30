import type { AppDatabase } from "../../database";
import type { UserCardSnapshotRow } from "./snapshotTypes";

export function applyReviewStateSnapshot(db: AppDatabase, rows: UserCardSnapshotRow[] = []) {
  for (const row of rows) {
    db.store.reviewStates[row.card_id] = {
      cardId: row.card_id,
      knownStreak: row.known_streak,
      againCount: row.again_count,
      dueAt: Date.parse(row.due_at) || 0,
      seen: typeof row.seen === "number" ? row.seen : Number(row.seen)
    };
  }
}
