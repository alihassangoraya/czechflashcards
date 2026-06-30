import { DEFAULT_SETTINGS, type AppDatabase, type StudySettings } from "../../database";
import type { CustomCardSnapshotRow, SyncSnapshot } from "./snapshotTypes";

function toCustomCard(row: CustomCardSnapshotRow) {
  return {
    id: row.id,
    cz: row.cz,
    en: row.en,
    hi: row.hi || "",
    ur: row.ur || "",
    sentence: row.sentence || "",
    sentenceEn: row.sentence_en || "",
    level: row.level,
    tags: row.tags,
    source: "custom" as const
  };
}

export function applySyncSnapshot(db: AppDatabase, snapshot: Partial<SyncSnapshot>) {
  for (const row of snapshot.user_cards || []) {
    db.store.reviewStates[row.card_id] = {
      cardId: row.card_id,
      knownStreak: row.known_streak,
      againCount: row.again_count,
      dueAt: Date.parse(row.due_at) || 0,
      seen: typeof row.seen === "number" ? row.seen : Number(row.seen)
    };
  }

  for (const row of snapshot.custom_cards || []) {
    const card = toCustomCard(row);
    const cardIndex = db.store.cards.findIndex((entry) => entry.id === card.id);
    if (cardIndex >= 0) db.store.cards[cardIndex] = card;
    else db.store.cards.push(card);
    db.store.customCards[card.id] = { card };
  }

  const savedIds = new Set(db.store.savedCardIds);
  for (const row of snapshot.saved_cards || []) savedIds.add(row.card_id);
  db.store.savedCardIds = [...savedIds];
  db.store.deckMemberships = {};

  for (const row of snapshot.user_decks || []) {
    const settings = db.store.settings;
    if (settings && !settings.customDecks.some((deck) => deck.id === row.id)) {
      settings.customDecks = [...settings.customDecks, { id: row.id, name: row.name }];
    }
  }

  for (const row of snapshot.user_deck_cards || []) {
    const deckId = row.deck_id;
    db.store.deckMemberships[deckId] = [...(db.store.deckMemberships[deckId] || []), row.card_id];
  }

  for (const row of snapshot.card_overrides || []) {
    db.store.overrides[row.card_id] = row.payload;
  }

  if (snapshot.settings && !Array.isArray(snapshot.settings) && Object.keys(snapshot.settings).length) {
    db.store.settings = { ...DEFAULT_SETTINGS, ...db.store.settings, ...(snapshot.settings as Partial<StudySettings>) };
  }
}
