import type { Card } from "@czech-flashcards/shared";

type StudySearchResultParams = {
  card: Card;
  forceCard: (cardId: string, reveal?: boolean) => void;
  setCurrent: (card: Card | null) => void;
  setPanel: (panel: null) => void;
  setRevealed: (revealed: boolean) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
};

export function openSearchResultForStudy({ card, forceCard, setCurrent, setPanel, setRevealed, setSessionReviews }: StudySearchResultParams) {
  forceCard(card.id, true);
  setCurrent(card);
  setRevealed(true);
  setSessionReviews(0);
  setPanel(null);
}
