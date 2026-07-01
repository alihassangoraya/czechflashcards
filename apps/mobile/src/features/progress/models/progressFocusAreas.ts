import type { Card } from "@czech-flashcards/shared";
import type { ProgressDashboardInput, ProgressFocusArea } from "../types/progressTypes";

function isMastered(input: ProgressDashboardInput, card: Card) {
  return (input.states[card.id]?.knownStreak || 0) >= 4;
}

function isLearning(input: ProgressDashboardInput, card: Card) {
  const state = input.states[card.id];
  return Boolean(state?.seen && (state.knownStreak || 0) < 4);
}

function categoryLabel(card: Card) {
  return card.googleCategory || card.level.toUpperCase();
}

export function buildFocusAreas(input: ProgressDashboardInput): ProgressFocusArea[] {
  const groups = new Map<string, Card[]>();
  input.cards.forEach((card) => groups.set(categoryLabel(card), [...(groups.get(categoryLabel(card)) || []), card]));
  return [...groups.entries()].map(([label, cards]) => {
    const mastered = cards.filter((card) => isMastered(input, card)).length;
    const learning = cards.filter((card) => isLearning(input, card)).length;
    return { key: label, label, total: cards.length, mastered, learning, percent: cards.length ? mastered / cards.length : 0 };
  }).sort((a, b) => a.percent - b.percent || b.learning - a.learning).slice(0, 4);
}
