import type { Card } from "@czech-flashcards/shared";
import { normalizeCards } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";
import { enqueueSync } from "./syncQueueRepository";

export async function importCards(db: AppDatabase, cards: Card[]): Promise<number> {
  const normalized = normalizeCards(cards).map((card) => ({ ...card, source: "import" as const }));
  const byId = new Map(db.store.cards.map((card) => [card.id, card]));
  for (const card of normalized) {
    byId.set(card.id, card);
    db.store.customCards[card.id] = { card };
  }
  db.store.cards = [...byId.values()];
  await enqueueSync(db, "cards_imported", { cards: normalized });
  return normalized.length;
}

export async function addCustomCard(db: AppDatabase, card: Card): Promise<void> {
  const index = db.store.cards.findIndex((entry) => entry.id === card.id);
  if (index >= 0) db.store.cards[index] = card;
  else db.store.cards.push(card);
  db.store.customCards[card.id] = { card };
  await enqueueSync(db, "custom_card_upserted", { card });
}

export async function saveCardCorrection(db: AppDatabase, card: Card): Promise<void> {
  db.store.overrides[card.id] = card;
  await enqueueSync(db, "card_correction_upserted", { card });
}

export async function deleteCustomCard(db: AppDatabase, cardId: string): Promise<void> {
  const deletedAt = Date.now();
  const custom = db.store.customCards[cardId];
  if (custom) custom.deletedAt = deletedAt;
  db.store.savedCardIds = db.store.savedCardIds.filter((id) => id !== cardId);
  await enqueueSync(db, "custom_card_deleted", { cardId, deletedAt });
}
