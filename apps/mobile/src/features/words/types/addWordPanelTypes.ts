import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import type { AddWordValues } from "./addWordTypes";

export type AddWordPanelProps = {
  onSubmit: (values: AddWordValues) => void;
  cards: Card[];
  decks: CustomDeck[];
  onDelete: (cardId: string) => void;
  onEdit: (card: Card) => void;
};
