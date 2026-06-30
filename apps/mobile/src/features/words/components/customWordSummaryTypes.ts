import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";

export type CustomWordSummaryProps = {
  card: Card;
  decks: CustomDeck[];
};
