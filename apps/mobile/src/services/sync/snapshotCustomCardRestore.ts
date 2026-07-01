import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../storage/storagePublicApi";
import type { CustomCardSnapshotRow } from "./snapshotTypes";

function toCustomCard(row: CustomCardSnapshotRow): Card {
  return {
    id: row.id,
    cz: row.cz,
    en: row.en,
    cs: row.cs || "",
    hi: row.hi || "",
    ur: row.ur || "",
    uk: row.uk || "",
    sentence: row.sentence || "",
    sentenceEn: row.sentence_en || "",
    level: row.level,
    tags: row.tags,
    source: "custom"
  };
}

export function applyCustomCardSnapshot(db: AppDatabase, rows: CustomCardSnapshotRow[] = []) {
  for (const row of rows) {
    const card = toCustomCard(row);
    const cardIndex = db.store.cards.findIndex((entry) => entry.id === card.id);
    if (cardIndex >= 0) db.store.cards[cardIndex] = card;
    else db.store.cards.push(card);
    db.store.customCards[card.id] = { card };
  }
}
