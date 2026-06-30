import type { Card } from "@czech-flashcards/shared";

export function selectForcedStudyCard(deck: Card[], forcedCardId: string | null): Card | null {
  return forcedCardId ? deck.find((card) => card.id === forcedCardId) || null : null;
}
