import { useEffect } from "react";
import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import { rememberShownCardId } from "./recentCards";
import { RECENT_CARD_LIMIT } from "./studyQueueConstants";
import type { StudyQueueRefs } from "./studyQueueRefs";
import { selectNextStudyCard } from "./studyQueueSelection";

type Input = {
  deck: Card[];
  refs: StudyQueueRefs;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  states: ReviewStates;
};

export function useStudyQueueSelectionEffect({ deck, refs, setCurrent, setRevealed, states }: Input) {
  useEffect(() => {
    const selection = selectNextStudyCard({
      deck,
      states,
      forcedCardId: refs.forcedCardId.current,
      shuffledDueQueue: refs.shuffledDueQueue.current,
      relearningQueue: refs.relearningQueue.current,
      recentCardIds: refs.recentCardIds.current,
      now: Date.now()
    });
    refs.shuffledDueQueue.current = selection.shuffledDueQueue;
    refs.relearningQueue.current = selection.relearningQueue;
    refs.recentCardIds.current = rememberShownCardId(refs.recentCardIds.current, selection.nextCard, RECENT_CARD_LIMIT);
    setCurrent(selection.nextCard);
    setRevealed(Boolean(selection.forced && refs.revealForcedCard.current));
    refs.forcedCardId.current = null;
    refs.revealForcedCard.current = false;
  }, [deck, refs, setCurrent, setRevealed, states]);
}
