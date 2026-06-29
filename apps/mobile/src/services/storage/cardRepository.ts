import type { Card } from "@czech-flashcards/shared";
import { normalizeCards } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";
import { persistDatabase } from "./storageCore";
import { enqueueSync } from "./syncQueueRepository";

export async function seedCards(db: AppDatabase, cards: Card[]): Promise<void> {
  const byId = new Map(db.store.cards.map((card) => [card.id, card]));
  for (const card of cards) {
    if (!db.store.customCards[card.id]) byId.set(card.id, card);
  }
  db.store.cards = [...byId.values()];
  await persistDatabase(db);
}

export async function loadCards(db: AppDatabase): Promise<Card[]> {
  return db.store.cards
    .filter((card) => !db.store.customCards[card.id]?.deletedAt)
    .map((card) => db.store.overrides[card.id] || card);
}

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

export async function loadSavedCardIds(db: AppDatabase): Promise<Set<string>> {
  return new Set(db.store.savedCardIds);
}

export async function setCardSaved(db: AppDatabase, cardId: string, saved: boolean): Promise<void> {
  const savedCardIds = new Set(db.store.savedCardIds);
  if (saved) savedCardIds.add(cardId);
  else savedCardIds.delete(cardId);
  db.store.savedCardIds = [...savedCardIds];
  await enqueueSync(db, saved ? "saved_card_added" : "saved_card_removed", saved ? { cardId, savedAt: Date.now() } : { cardId });
}

export async function deleteCustomCard(db: AppDatabase, cardId: string): Promise<void> {
  const custom = db.store.customCards[cardId];
  if (custom) custom.deletedAt = Date.now();
  db.store.savedCardIds = db.store.savedCardIds.filter((id) => id !== cardId);
  await enqueueSync(db, "custom_card_deleted", { cardId, deletedAt: Date.now() });
}
