import type { Card, DailyProgress, ReviewState } from "@czech-flashcards/shared";

export type CustomCard = { card: Card; deletedAt?: number };
export type CardOverrides = Record<string, Card>;
export type CustomCards = Record<string, CustomCard>;
export type DailyProgressLog = Record<string, DailyProgress>;
export type DeckMemberships = Record<string, string[]>;
export type ReviewStates = Record<string, ReviewState>;
export type SavedCardIds = Set<string>;
