import type { Card } from "@czech-flashcards/shared";
import type { Panel } from "../../appTypes";
import type { DeckMemberships } from "../deckMembershipState";
import type { SavedCardIds } from "../savedCardState";

export type CardManagementStateProps = {
  setSavedCardIds: (savedCardIds: SavedCardIds | ((previous: SavedCardIds) => SavedCardIds)) => void;
  setDeckMemberships: (deckMemberships: DeckMemberships | ((previous: DeckMemberships) => DeckMemberships)) => void;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
};
