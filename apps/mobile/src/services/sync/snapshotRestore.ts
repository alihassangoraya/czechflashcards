import type { AppDatabase } from "../storage/storagePublicApi";
import { applyCustomCardSnapshot } from "./snapshotCustomCardRestore";
import { applyDeckSnapshot } from "./snapshotDeckRestore";
import { applyCardOverrideSnapshot } from "./snapshotOverrideRestore";
import { applyReviewStateSnapshot } from "./snapshotReviewRestore";
import { applySavedCardSnapshot } from "./snapshotSavedCardRestore";
import { applySettingsSnapshot } from "./snapshotSettingsRestore";
import type { SyncSnapshot } from "./snapshotTypes";

export function applySyncSnapshot(db: AppDatabase, snapshot: Partial<SyncSnapshot>) {
  applyReviewStateSnapshot(db, snapshot.user_cards);
  applyCustomCardSnapshot(db, snapshot.custom_cards);
  applySavedCardSnapshot(db, snapshot.saved_cards);
  applyDeckSnapshot(db, snapshot.user_decks, snapshot.user_deck_cards);
  applyCardOverrideSnapshot(db, snapshot.card_overrides);
  applySettingsSnapshot(db, snapshot.settings);
}
