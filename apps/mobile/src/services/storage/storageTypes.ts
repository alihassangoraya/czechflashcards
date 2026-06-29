import type { Card, DailyProgress, NotificationPreferences, ReviewEvent, ReviewState } from "@czech-flashcards/shared";

export type CustomDeck = { id: string; name: string };

export type StudySettings = {
  examLevel: "a2" | "b1";
  deckFilter: string;
  meaningLanguage: "hi" | "ur";
  dailyGoal: number;
  customDecks: CustomDeck[];
  notifications: NotificationPreferences;
};

export type CustomCard = { card: Card; deletedAt?: number };
export type SyncEntry = { id: number; type: string; payload: unknown; createdAt: number; syncedAt?: number };

export type WebStore = {
  cards: Card[];
  reviewStates: Record<string, ReviewState>;
  reviews: ReviewEvent[];
  dailyProgress: Record<string, DailyProgress>;
  customCards: Record<string, CustomCard>;
  deckMemberships: Record<string, string[]>;
  overrides: Record<string, Card>;
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
  dailyGoal: 30,
  customDecks: [],
  notifications: {
    dailyReminderEnabled: false,
    dailyReminderTime: "19:00",
    streakRiskEnabled: true,
    reviewDueEnabled: true
  }
};
