import { useEffect, useRef, useState } from "react";
import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import {
  advanceRelearningQueue as advanceRelearningEntries,
  chooseVariedDueCard,
  rememberShownCardId,
  scheduleRelearningEntry,
  shuffleValues,
  sortDueCardsByUrgency,
  takeRelearningCardFromQueue,
  type RelearningEntry
} from "../features/study";
import { useI18n } from "../i18n/I18nProvider";

const RELEARNING_MIN_CARDS = 10;
const RELEARNING_MAX_CARDS = 15;
const RECENT_CARD_LIMIT = 18;

export function useStudyQueue(deck: Card[], states: Record<string, ReviewState>) {
  const { t } = useI18n();
  const [current, setCurrent] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);
  const shuffledDueQueue = useRef<string[]>([]);
  const relearningQueue = useRef<RelearningEntry[]>([]);
  const recentCardIds = useRef<string[]>([]);

  useEffect(() => {
    const now = Date.now();
    const queuedIds = new Set(relearningQueue.current.map((entry) => entry.id));
    const due = sortDueCardsByUrgency(
      deck.filter((card) => (states[card.id]?.dueAt || 0) <= now && !queuedIds.has(card.id)),
      states,
      now
    );
    const forced = forcedCardId.current ? deck.find((card) => card.id === forcedCardId.current) : null;
    const relearning = forced ? null : takeRelearningCard(deck);
    const fallbackRelearning = forced || relearning || due.length ? null : takeRelearningCard(deck, true);
    shuffledDueQueue.current = shuffledDueQueue.current.filter((id) => due.some((card) => card.id === id));
    const queued = shuffledDueQueue.current.length ? due.find((card) => card.id === shuffledDueQueue.current[0]) || null : null;
    const nextCard = forced || relearning || queued || chooseVariedDueCard(due, states, recentCardIds.current, now) || fallbackRelearning || null;
    rememberShownCard(nextCard);
    setCurrent(nextCard);
    setRevealed(Boolean(forced && revealForcedCard.current));
    forcedCardId.current = null;
    revealForcedCard.current = false;
  }, [deck, states]);

  function forceCard(cardId: string, reveal = false) {
    forcedCardId.current = cardId;
    revealForcedCard.current = reveal;
  }

  function recordReviewedCard(cardId: string, grade: ReviewGrade) {
    shuffledDueQueue.current = shuffledDueQueue.current.filter((id) => id !== cardId);
    relearningQueue.current = advanceRelearningEntries(relearningQueue.current, cardId);
    if (grade === "again") {
      relearningQueue.current = scheduleRelearningEntry(relearningQueue.current, cardId, RELEARNING_MIN_CARDS, RELEARNING_MAX_CARDS);
    }
  }

  function snapshotRelearningQueue() {
    return relearningQueue.current.map((entry) => ({ ...entry }));
  }

  function restoreRelearningQueue(queue: RelearningEntry[]) {
    relearningQueue.current = queue.map((entry) => ({ ...entry }));
  }

  function shuffleDueCards(onNotice: (message: string) => void) {
    const due = deck.filter((card) => (states[card.id]?.dueAt || 0) <= Date.now());
    const currentId = current && due.some((card) => card.id === current.id) ? current.id : null;
    const otherIds = due.map((card) => card.id).filter((id) => id !== currentId);
    shuffledDueQueue.current = currentId ? [...shuffleValues(otherIds), currentId] : shuffleValues(otherIds);
    forcedCardId.current = null;
    onNotice(due.length ? t("settings.notice.shuffledDue", { count: due.length }) : t("settings.notice.noDueToShuffle"));
  }

  function clearShuffledDueQueue() {
    shuffledDueQueue.current = [];
  }

  function takeRelearningCard(deckCards: Card[], allowEarlyReturn = false): Card | null {
    const next = takeRelearningCardFromQueue(relearningQueue.current, deckCards, recentCardIds.current, allowEarlyReturn);
    relearningQueue.current = next.queue;
    return next.card;
  }

  function rememberShownCard(card: Card | null) {
    recentCardIds.current = rememberShownCardId(recentCardIds.current, card, RECENT_CARD_LIMIT);
  }

  return {
    current,
    revealed,
    setCurrent,
    setRevealed,
    forceCard,
    recordReviewedCard,
    snapshotRelearningQueue,
    restoreRelearningQueue,
    shuffleDueCards,
    clearShuffledDueQueue
  };
}
