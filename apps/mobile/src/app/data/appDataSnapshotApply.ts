import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, ReviewStates, SavedCardIds } from "../../database";
import type { AppDataSnapshot } from "./appDataSnapshotTypes";

type AppDataSnapshotSetters = {
  setCards: (cards: Card[]) => void;
  setSavedCardIds: (savedCardIds: SavedCardIds) => void;
  setDeckMemberships: (deckMemberships: DeckMemberships) => void;
  setStates: (states: ReviewStates) => void;
  setDailyProgress: (dailyProgress: string) => void;
};

export function applyAppDataSnapshot(snapshot: AppDataSnapshot, setters: AppDataSnapshotSetters) {
  setters.setCards(snapshot.cards);
  setters.setSavedCardIds(snapshot.savedCardIds);
  setters.setDeckMemberships(snapshot.deckMemberships);
  setters.setStates(snapshot.states);
  setters.setDailyProgress(snapshot.dailyProgress);
}
