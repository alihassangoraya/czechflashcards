import type { Card, DailyProgress, NotificationPreferences, ReviewEvent, ReviewState } from "@czech-flashcards/shared";

export type CustomDeck = { id: string; name: string };

export type StudySettings = {
  examLevel: "a2" | "b1";
  deckFilter: string;
  meaningLanguage: "hi" | "ur";
  appLanguage: "en" | "cs" | "hi" | "ur";
  dailyGoal: number;
  customDecks: CustomDeck[];
  notifications: NotificationPreferences;
};

export type CustomCard = { card: Card; deletedAt?: number };
export type CardOverrides = Record<string, Card>;
export type CustomCards = Record<string, CustomCard>;
export type DailyProgressLog = Record<string, DailyProgress>;
export type DeckMemberships = Record<string, string[]>;
export type ReviewStates = Record<string, ReviewState>;
export type SavedCardIds = Set<string>;
export type SyncEntry = { id: number; type: string; payload: unknown; createdAt: number; syncedAt?: number };

export type WebStore = {
  seedVersion?: string;
  cards: Card[];
  reviewStates: ReviewStates;
  reviews: ReviewEvent[];
  dailyProgress: DailyProgressLog;
  customCards: CustomCards;
  deckMemberships: DeckMemberships;
  overrides: CardOverrides;
  savedCardIds: string[];
  settings?: StudySettings;
  syncQueue: SyncEntry[];
  nextSyncId: number;
};

export type AppDatabase = { store: WebStore };

export const DEFAULT_SETTINGS: StudySettings = {
  examLevel: "b1",
  deckFilter: "b1-focus",
  meaningLanguage: "ur",
  appLanguage: "en",
  dailyGoal: 30,
  customDecks: [],
  notifications: {
    dailyReminderEnabled: false,
    dailyReminderTime: "19:00",
    streakRiskEnabled: true,
    reviewDueEnabled: true
  }
};
