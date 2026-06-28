import * as SQLite from "expo-sqlite";
import type { Card, DailyProgress, NotificationPreferences, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import { createReviewState } from "@czech-flashcards/shared";

export type AppDatabase = SQLite.SQLiteDatabase;

export type StudySettings = {
  examLevel: "a2" | "b1";
  deckFilter: string;
  meaningLanguage: "hi" | "ur";
  dailyGoal: number;
  notifications: NotificationPreferences;
};

const DEFAULT_SETTINGS: StudySettings = {
  examLevel: "b1",
  deckFilter: "core",
  meaningLanguage: "ur",
  dailyGoal: 30,
  notifications: {
    dailyReminderEnabled: false,
    dailyReminderTime: "19:00",
    streakRiskEnabled: true,
    reviewDueEnabled: true
  }
};

export async function openAppDatabase(): Promise<AppDatabase> {
  const db = await SQLite.openDatabaseAsync("czech-flashcards.db");
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      cz TEXT NOT NULL,
      en TEXT NOT NULL,
      hi TEXT NOT NULL,
      ur TEXT NOT NULL,
      sentence TEXT NOT NULL,
      sentence_en TEXT NOT NULL,
      level TEXT NOT NULL,
      tags_json TEXT NOT NULL,
      source TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS user_cards (
      card_id TEXT PRIMARY KEY,
      known_streak INTEGER NOT NULL DEFAULT 0,
      again_count INTEGER NOT NULL DEFAULT 0,
      due_at INTEGER NOT NULL DEFAULT 0,
      seen INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_id TEXT NOT NULL,
      grade TEXT NOT NULL,
      reviewed_at INTEGER NOT NULL,
      was_new INTEGER NOT NULL,
      next_due_at INTEGER NOT NULL,
      synced_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS daily_progress (
      date TEXT PRIMARY KEY,
      reviewed INTEGER NOT NULL DEFAULT 0,
      new_cards INTEGER NOT NULL DEFAULT 0,
      goal INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      synced_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS custom_cards (
      id TEXT PRIMARY KEY,
      payload_json TEXT NOT NULL,
      deleted_at INTEGER,
      synced_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS card_overrides (
      id TEXT PRIMARY KEY,
      payload_json TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      synced_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS sync_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      synced_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
  return db;
}

export async function seedCards(db: AppDatabase, cards: Card[]): Promise<void> {
  const existing = await db.getFirstAsync<{ count: number }>("SELECT COUNT(*) as count FROM cards WHERE source IN ('seed', 'legacy-web')");
  if ((existing?.count || 0) >= cards.length) return;

  const now = Date.now();
  await db.withTransactionAsync(async () => {
    for (const card of cards) {
      await db.runAsync(
        `INSERT OR REPLACE INTO cards
          (id, cz, en, hi, ur, sentence, sentence_en, level, tags_json, source, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        card.id,
        card.cz,
        card.en,
        card.hi,
        card.ur,
        card.sentence,
        card.sentenceEn,
        card.level,
        JSON.stringify(card.tags),
        "seed",
        now
      );
    }
  });
}

export async function loadCards(db: AppDatabase): Promise<Card[]> {
  const rows = await db.getAllAsync<any>("SELECT * FROM cards WHERE id NOT IN (SELECT id FROM custom_cards WHERE deleted_at IS NOT NULL)");
  const overrides = await db.getAllAsync<{ id: string; payload_json: string }>("SELECT id, payload_json FROM card_overrides");
  const overridesById = new Map(overrides.map((row) => [row.id, JSON.parse(row.payload_json)]));
  return rows.map((row) => ({
    id: row.id,
    cz: row.cz,
    en: row.en,
    hi: row.hi,
    ur: row.ur,
    sentence: row.sentence,
    sentenceEn: row.sentence_en,
    level: row.level,
    tags: JSON.parse(row.tags_json),
    source: row.source,
    ...(overridesById.get(row.id) || {})
  }));
}

export async function getReviewState(db: AppDatabase, cardId: string): Promise<ReviewState> {
  const row = await db.getFirstAsync<any>("SELECT * FROM user_cards WHERE card_id = ?", cardId);
  if (!row) return createReviewState(cardId);
  return {
    cardId,
    knownStreak: row.known_streak,
    againCount: row.again_count,
    dueAt: row.due_at,
    seen: row.seen
  };
}

export async function loadReviewStates(db: AppDatabase): Promise<Record<string, ReviewState>> {
  const rows = await db.getAllAsync<any>("SELECT * FROM user_cards");
  return Object.fromEntries(rows.map((row) => [row.card_id, {
    cardId: row.card_id,
    knownStreak: row.known_streak,
    againCount: row.again_count,
    dueAt: row.due_at,
    seen: row.seen
  }]));
}

export async function saveReviewResult(db: AppDatabase, state: ReviewState, event: ReviewEvent, dailyGoal: number): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const now = Date.now();
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO user_cards (card_id, known_streak, again_count, due_at, seen, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(card_id) DO UPDATE SET
        known_streak = excluded.known_streak,
        again_count = excluded.again_count,
        due_at = excluded.due_at,
        seen = excluded.seen,
        updated_at = excluded.updated_at`,
      state.cardId,
      state.knownStreak,
      state.againCount,
      state.dueAt,
      state.seen,
      now
    );
    await db.runAsync(
      "INSERT INTO reviews (card_id, grade, reviewed_at, was_new, next_due_at) VALUES (?, ?, ?, ?, ?)",
      event.cardId,
      event.grade,
      event.reviewedAt,
      event.wasNew ? 1 : 0,
      event.nextDueAt
    );
    await db.runAsync(
      `INSERT INTO daily_progress (date, reviewed, new_cards, goal, completed)
       VALUES (?, 1, ?, ?, ?)
       ON CONFLICT(date) DO UPDATE SET
        reviewed = reviewed + 1,
        new_cards = new_cards + excluded.new_cards,
        goal = excluded.goal,
        completed = CASE WHEN reviewed + 1 >= excluded.goal THEN 1 ELSE completed END`,
      date,
      event.wasNew ? 1 : 0,
      dailyGoal,
      dailyGoal <= 1 ? 1 : 0
    );
    await enqueueSync(db, "review_recorded", { event, state, date, dailyGoal });
  });
  return getDailyProgress(db, date, dailyGoal);
}

export async function undoReviewResult(
  db: AppDatabase,
  previousState: ReviewState,
  event: ReviewEvent,
  dailyGoal: number
): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const now = Date.now();
  await db.withTransactionAsync(async () => {
    if (!previousState.seen && !previousState.knownStreak && !previousState.againCount && !previousState.dueAt) {
      await db.runAsync("DELETE FROM user_cards WHERE card_id = ?", previousState.cardId);
    } else {
      await db.runAsync(
        `INSERT INTO user_cards (card_id, known_streak, again_count, due_at, seen, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(card_id) DO UPDATE SET
          known_streak = excluded.known_streak,
          again_count = excluded.again_count,
          due_at = excluded.due_at,
          seen = excluded.seen,
          updated_at = excluded.updated_at`,
        previousState.cardId,
        previousState.knownStreak,
        previousState.againCount,
        previousState.dueAt,
        previousState.seen,
        now
      );
    }

    await db.runAsync(
      `DELETE FROM reviews
       WHERE id = (
         SELECT id FROM reviews
         WHERE card_id = ? AND reviewed_at = ?
         ORDER BY id DESC LIMIT 1
       )`,
      event.cardId,
      event.reviewedAt
    );
    await db.runAsync(
      `UPDATE daily_progress SET
        reviewed = MAX(0, reviewed - 1),
        new_cards = MAX(0, new_cards - ?),
        goal = ?,
        completed = CASE WHEN MAX(0, reviewed - 1) >= ? THEN 1 ELSE 0 END,
        synced_at = NULL
       WHERE date = ?`,
      event.wasNew ? 1 : 0,
      dailyGoal,
      dailyGoal,
      date
    );
    await db.runAsync(
      `DELETE FROM sync_queue
       WHERE id = (
         SELECT id FROM sync_queue
         WHERE type = 'review_recorded'
           AND synced_at IS NULL
           AND instr(payload_json, ?) > 0
           AND instr(payload_json, ?) > 0
         ORDER BY id DESC LIMIT 1
       )`,
      `"cardId":"${event.cardId}"`,
      `"reviewedAt":${event.reviewedAt}`
    );
  });
  return getDailyProgress(db, date, dailyGoal);
}

export async function getDailyProgress(db: AppDatabase, date = localDateKey(), goal = DEFAULT_SETTINGS.dailyGoal): Promise<DailyProgress> {
  const row = await db.getFirstAsync<any>("SELECT * FROM daily_progress WHERE date = ?", date);
  if (!row) return { date, reviewed: 0, newCards: 0, goal, completed: false };
  return {
    date,
    reviewed: row.reviewed,
    newCards: row.new_cards,
    goal: row.goal,
    completed: Boolean(row.completed)
  };
}

export async function addCustomCard(db: AppDatabase, card: Card): Promise<void> {
  const now = Date.now();
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT OR REPLACE INTO cards
        (id, cz, en, hi, ur, sentence, sentence_en, level, tags_json, source, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'custom', ?)`,
      card.id,
      card.cz,
      card.en,
      card.hi,
      card.ur,
      card.sentence,
      card.sentenceEn,
      card.level,
      JSON.stringify(card.tags),
      now
    );
    await db.runAsync("INSERT OR REPLACE INTO custom_cards (id, payload_json) VALUES (?, ?)", card.id, JSON.stringify(card));
    await enqueueSync(db, "custom_card_upserted", { card });
  });
}

export async function saveCardCorrection(db: AppDatabase, card: Card): Promise<void> {
  const now = Date.now();
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      "INSERT OR REPLACE INTO card_overrides (id, payload_json, updated_at) VALUES (?, ?, ?)",
      card.id,
      JSON.stringify(card),
      now
    );
    await enqueueSync(db, "card_correction_upserted", { card });
  });
}

export async function deleteCustomCard(db: AppDatabase, cardId: string): Promise<void> {
  const deletedAt = Date.now();
  await db.withTransactionAsync(async () => {
    await db.runAsync("UPDATE custom_cards SET deleted_at = ? WHERE id = ?", deletedAt, cardId);
    await enqueueSync(db, "custom_card_deleted", { cardId, deletedAt });
  });
}

export async function loadSettings(db: AppDatabase): Promise<StudySettings> {
  const row = await db.getFirstAsync<{ value_json: string }>("SELECT value_json FROM settings WHERE key = 'study'");
  return row ? { ...DEFAULT_SETTINGS, ...JSON.parse(row.value_json) } : DEFAULT_SETTINGS;
}

export async function saveSettings(db: AppDatabase, settings: StudySettings): Promise<void> {
  await db.runAsync(
    `INSERT INTO settings (key, value_json, updated_at)
     VALUES ('study', ?, ?)
     ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = excluded.updated_at`,
    JSON.stringify(settings),
    Date.now()
  );
  await enqueueSync(db, "settings_updated", { settings });
}

export async function enqueueSync(db: AppDatabase, type: string, payload: unknown): Promise<void> {
  await db.runAsync("INSERT INTO sync_queue (type, payload_json, created_at) VALUES (?, ?, ?)", type, JSON.stringify(payload), Date.now());
}

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
