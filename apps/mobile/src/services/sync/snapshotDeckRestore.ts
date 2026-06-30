import type { AppDatabase } from "../storage/storagePublicApi";
import type { UserDeckCardSnapshotRow, UserDeckSnapshotRow } from "./snapshotTypes";

export function applyDeckSnapshot(
  db: AppDatabase,
  decks: UserDeckSnapshotRow[] = [],
  memberships: UserDeckCardSnapshotRow[] = []
) {
  db.store.deckMemberships = {};

  for (const row of decks) {
    const settings = db.store.settings;
    if (settings && !settings.customDecks.some((deck) => deck.id === row.id)) {
      settings.customDecks = [...settings.customDecks, { id: row.id, name: row.name }];
    }
  }

  for (const row of memberships) {
    const deckId = row.deck_id;
    db.store.deckMemberships[deckId] = [...(db.store.deckMemberships[deckId] || []), row.card_id];
  }
}
