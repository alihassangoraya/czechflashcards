import type { Card, ReviewEvent } from "@czech-flashcards/shared";
import type { CardOverrides, CustomCards, DailyProgressLog, DeckMemberships, ReviewStates } from "./collectionTypes";
import type { StudySettings } from "./settingsTypes";
import type { SyncEntry } from "./syncEntry";

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
