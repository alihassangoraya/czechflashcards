import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Card, DailyProgress, NotificationPreferences, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import { createReviewState, normalizeCards } from "@czech-flashcards/shared";

export type CustomDeck = { id: string; name: string };

export type StudySettings = {
  examLevel: "a2" | "b1";
  deckFilter: string;
  meaningLanguage: "hi" | "ur";
  dailyGoal: number;
  customDecks: CustomDeck[];
  notifications: NotificationPreferences;
};

type CustomCard = { card: Card; deletedAt?: number };
type SyncEntry = { id: number; type: string; payload: unknown; createdAt: number; syncedAt?: number };
type WebStore = {
  cards: Card[];
  reviewStates: Record<string, ReviewState>;
  reviews: ReviewEvent[];
  dailyProgress: Record<string, DailyProgress>;
  customCards: Record<string, CustomCard>;
  overrides: Record<string, Card>;
  savedCardIds: string[];
  settings?: StudySettings;
  syncQueue: SyncEntry[];
  nextSyncId: number;
};

export type AppDatabase = { store: WebStore };

const STORAGE_KEY = "czech-flashcards.web-store.v1";
const DEFAULT_SETTINGS: StudySettings = {
  examLevel: "b1",
  deckFilter: "b1-focus",
  meaningLanguage: "ur",
  dailyGoal: 30,
  customDecks: [],
  notifications: {
    dailyReminderEnabled: false,
    dailyReminderTime: "19:00",
    streakRiskEnabled: true,
    reviewDueEnabled: true
  }
};

function emptyStore(): WebStore {
  return {
    cards: [],
    reviewStates: {},
    reviews: [],
    dailyProgress: {},
    customCards: {},
    overrides: {},
    savedCardIds: [],
    syncQueue: [],
    nextSyncId: 1
  };
}

function normalizeStore(value: Partial<WebStore> | null): WebStore {
  return { ...emptyStore(), ...value, nextSyncId: value?.nextSyncId || 1 };
}

export async function persistDatabase(db: AppDatabase): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db.store));
}

export async function openAppDatabase(): Promise<AppDatabase> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return { store: normalizeStore(raw ? JSON.parse(raw) : null) };
}

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

export async function getReviewState(db: AppDatabase, cardId: string): Promise<ReviewState> {
  return db.store.reviewStates[cardId] || createReviewState(cardId);
}

export async function loadReviewStates(db: AppDatabase): Promise<Record<string, ReviewState>> {
  return { ...db.store.reviewStates };
}

export async function saveReviewResult(db: AppDatabase, state: ReviewState, event: ReviewEvent, dailyGoal: number): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const previous = db.store.dailyProgress[date] || { date, reviewed: 0, newCards: 0, goal: dailyGoal, completed: false };
  const progress: DailyProgress = {
    date,
    reviewed: previous.reviewed + 1,
    newCards: previous.newCards + (event.wasNew ? 1 : 0),
    goal: dailyGoal,
    completed: previous.reviewed + 1 >= dailyGoal
  };
  db.store.reviewStates[state.cardId] = state;
  db.store.reviews.push(event);
  db.store.dailyProgress[date] = progress;
  await enqueueSync(db, "review_recorded", { event, state, date, dailyGoal });
  return progress;
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

export async function markCardsDueNow(db: AppDatabase, cardIds: string[]): Promise<number> {
  const now = Date.now();
  for (const cardId of cardIds) {
    const state = db.store.reviewStates[cardId] || createReviewState(cardId);
    db.store.reviewStates[cardId] = { ...state, dueAt: 0 };
  }
  await enqueueSync(db, "cards_marked_due", { cardIds, updatedAt: now });
  return cardIds.length;
}

export async function undoReviewResult(
  db: AppDatabase,
  previousState: ReviewState,
  event: ReviewEvent,
  dailyGoal: number
): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const previous = db.store.dailyProgress[date] || { date, reviewed: 0, newCards: 0, goal: dailyGoal, completed: false };
  const progress: DailyProgress = {
    date,
    reviewed: Math.max(0, previous.reviewed - 1),
    newCards: Math.max(0, previous.newCards - (event.wasNew ? 1 : 0)),
    goal: dailyGoal,
    completed: Math.max(0, previous.reviewed - 1) >= dailyGoal
  };
  if (!previousState.seen && !previousState.knownStreak && !previousState.againCount && !previousState.dueAt) {
    delete db.store.reviewStates[previousState.cardId];
  } else {
    db.store.reviewStates[previousState.cardId] = previousState;
  }
  const reviewIndex = db.store.reviews.findLastIndex((review) => review.cardId === event.cardId && review.reviewedAt === event.reviewedAt);
  if (reviewIndex >= 0) db.store.reviews.splice(reviewIndex, 1);
  const queueIndex = db.store.syncQueue.findLastIndex((entry) => entry.type === "review_recorded" && !entry.syncedAt);
  if (queueIndex >= 0) db.store.syncQueue.splice(queueIndex, 1);
  db.store.dailyProgress[date] = progress;
  await persistDatabase(db);
  return progress;
}

export async function getDailyProgress(db: AppDatabase, date = localDateKey(), goal = DEFAULT_SETTINGS.dailyGoal): Promise<DailyProgress> {
  return db.store.dailyProgress[date] || { date, reviewed: 0, newCards: 0, goal, completed: false };
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

export async function loadSettings(db: AppDatabase): Promise<StudySettings> {
  return {
    ...DEFAULT_SETTINGS,
    ...db.store.settings,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...db.store.settings?.notifications }
  };
}

export async function saveSettings(db: AppDatabase, settings: StudySettings): Promise<void> {
  db.store.settings = settings;
  await enqueueSync(db, "settings_updated", { settings });
}

export function exportBackup(db: AppDatabase): Record<string, unknown> {
  return {
    exportedAt: new Date().toISOString(),
    store: db.store,
    reviewStates: db.store.reviewStates,
    reviews: db.store.reviews,
    dailyProgress: db.store.dailyProgress,
    customCards: Object.values(db.store.customCards).filter((entry) => !entry.deletedAt).map((entry) => entry.card),
    editedCards: db.store.overrides,
    savedCardIds: db.store.savedCardIds,
    settings: db.store.settings
  };
}

export async function restoreBackup(db: AppDatabase, payload: unknown): Promise<StudySettings> {
  if (!payload || typeof payload !== "object") throw new Error("Backup file is not valid JSON.");
  const backup = payload as Partial<WebStore> & {
    store?: Partial<WebStore>;
    progress?: Record<string, ReviewState>;
    reviewStates?: Record<string, ReviewState>;
    importedCards?: Card[];
    customCards?: Card[];
    editedCards?: Record<string, Card>;
    savedCardIds?: string[];
    dailyLog?: Record<string, DailyProgress>;
    dailyProgress?: Record<string, DailyProgress>;
    dailyGoal?: number;
    examLevel?: StudySettings["examLevel"];
    meaningLanguage?: StudySettings["meaningLanguage"];
    settings?: StudySettings;
  };
  const source = backup.store || backup;
  const previousCards = db.store.cards;
  db.store = normalizeStore({
    ...db.store,
    ...source,
    cards: Array.isArray(source.cards) ? normalizeCards(source.cards) : previousCards,
    reviewStates: backup.reviewStates || backup.progress || source.reviewStates || {},
    reviews: Array.isArray(source.reviews) ? source.reviews : [],
    dailyProgress: backup.dailyProgress || backup.dailyLog || source.dailyProgress || {},
    customCards: normalizeCustomCards(source.customCards || backup.customCards || backup.importedCards),
    overrides: backup.editedCards || source.overrides || {},
    savedCardIds: Array.isArray(backup.savedCardIds || source.savedCardIds) ? (backup.savedCardIds || source.savedCardIds || []).filter((id) => typeof id === "string") : [],
    settings: normalizeRestoredSettings(backup.settings || source.settings, backup)
  });
  await persistDatabase(db);
  return loadSettings(db);
}

export async function enqueueSync(db: AppDatabase, type: string, payload: unknown): Promise<void> {
  db.store.syncQueue.push({ id: db.store.nextSyncId++, type, payload, createdAt: Date.now() });
  await persistDatabase(db);
}

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeCustomCards(value: unknown): Record<string, CustomCard> {
  if (!value) return {};
  if (!Array.isArray(value) && typeof value === "object") return value as Record<string, CustomCard>;
  const cards = normalizeCards(value as Card[]);
  return Object.fromEntries(cards.map((card) => [card.id, { card }]));
}

function normalizeRestoredSettings(settings: StudySettings | undefined, backup: { dailyGoal?: number; examLevel?: StudySettings["examLevel"]; meaningLanguage?: StudySettings["meaningLanguage"] }): StudySettings {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    dailyGoal: Number(settings?.dailyGoal || backup.dailyGoal) || DEFAULT_SETTINGS.dailyGoal,
    examLevel: settings?.examLevel || backup.examLevel || DEFAULT_SETTINGS.examLevel,
    meaningLanguage: settings?.meaningLanguage || backup.meaningLanguage || DEFAULT_SETTINGS.meaningLanguage,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...settings?.notifications }
  };
}
