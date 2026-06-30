import type { AppDatabase } from "./storageTypes";
import { enqueueSync } from "./syncQueueRepository";

export async function addCardToCustomDeck(db: AppDatabase, deckId: string, cardId: string): Promise<void> {
  const cardIds = new Set(db.store.deckMemberships[deckId] || []);
  cardIds.add(cardId);
  db.store.deckMemberships[deckId] = [...cardIds];
  await enqueueSync(db, "deck_card_added", { deckId, cardId, addedAt: Date.now() });
}

export async function removeCardFromCustomDeck(db: AppDatabase, deckId: string, cardId: string): Promise<void> {
  const cardIds = new Set(db.store.deckMemberships[deckId] || []);
  cardIds.delete(cardId);
  db.store.deckMemberships[deckId] = [...cardIds];
  await enqueueSync(db, "deck_card_removed", { deckId, cardId, removedAt: Date.now() });
}

export async function loadDeckMemberships(db: AppDatabase): Promise<Record<string, string[]>> {
  return db.store.deckMemberships;
}
