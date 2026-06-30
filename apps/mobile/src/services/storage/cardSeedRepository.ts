import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";
import { persistDatabase } from "./storageCore";

export async function seedCards(db: AppDatabase, cards: Card[], seedVersion?: string): Promise<void> {
  if (seedVersion && db.store.seedVersion === seedVersion && db.store.cards.length >= cards.length) return;
  const customCardIds = new Set(Object.keys(db.store.customCards));
  const byId = new Map<string, Card>();
  for (const card of db.store.cards) {
    if (customCardIds.has(card.id) || card.source === "custom" || card.source === "import") byId.set(card.id, card);
  }
  for (const card of cards) {
    if (!db.store.customCards[card.id]) byId.set(card.id, card);
  }
  db.store.cards = [...byId.values()];
  if (seedVersion) db.store.seedVersion = seedVersion;
  await persistDatabase(db);
}

export async function loadCards(db: AppDatabase): Promise<Card[]> {
  return db.store.cards
    .filter((card) => !db.store.customCards[card.id]?.deletedAt)
    .map((card) => db.store.overrides[card.id] || card);
}
