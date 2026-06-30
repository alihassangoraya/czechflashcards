import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates, SavedCardIds, StudySettings } from "../../../database";

export type MainDeckDataProps = {
  deck: Card[];
  cards: Card[];
  customCards: Card[];
  states: ReviewStates;
  settings: StudySettings;
  savedCardIds: SavedCardIds;
};
