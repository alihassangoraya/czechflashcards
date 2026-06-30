import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, SavedCardIds } from "../../../database";

export type PanelCardDataProps = {
  cards: Card[];
  customCards: Card[];
  savedCardIds: SavedCardIds;
  deckMemberships: DeckMemberships;
  current: Card | null;
  deckManagementCard: Card | null;
  editingCard: Card | null;
};
