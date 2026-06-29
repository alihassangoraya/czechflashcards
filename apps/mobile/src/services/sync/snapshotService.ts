import { persistDatabase, type AppDatabase } from "../../database";
import type { SupabaseClient } from "./supabaseClient";
import type { SyncStatus } from "./syncTypes";

export async function restoreSyncSnapshot(db: AppDatabase, supabase: SupabaseClient | null): Promise<SyncStatus> {
  if (!supabase) return "not-configured";
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "guest";
  const { data, error } = await supabase.rpc("sync_snapshot");
  if (error || !data) return "error";

  const snapshot = data as Record<string, any[]>;
  for (const row of snapshot.user_cards || []) {
    db.store.reviewStates[row.card_id] = {
      cardId: row.card_id,
      knownStreak: row.known_streak,
      againCount: row.again_count,
      dueAt: Date.parse(row.due_at) || 0,
      seen: row.seen
    };
  }
  for (const row of snapshot.custom_cards || []) {
    const card = { id: row.id, cz: row.cz, en: row.en, hi: row.hi, ur: row.ur, sentence: row.sentence, sentenceEn: row.sentence_en, level: row.level, tags: row.tags, source: "custom" as const };
    const cardIndex = db.store.cards.findIndex((entry) => entry.id === card.id);
    if (cardIndex >= 0) db.store.cards[cardIndex] = card;
    else db.store.cards.push(card);
    db.store.customCards[card.id] = { card };
  }
  const savedIds = new Set(db.store.savedCardIds);
  for (const row of snapshot.saved_cards || []) savedIds.add(row.card_id);
  db.store.savedCardIds = [...savedIds];
  for (const row of snapshot.card_overrides || []) {
    db.store.overrides[row.card_id] = row.payload;
  }
  await persistDatabase(db);
  return "synced";
}
