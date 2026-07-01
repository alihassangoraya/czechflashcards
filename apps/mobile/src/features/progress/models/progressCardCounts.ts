import type { ProgressDashboardInput } from "../types/progressTypes";

export function getProgressCardCounts(input: ProgressDashboardInput) {
  const mastered = input.cards.filter((card) => (input.states[card.id]?.knownStreak || 0) >= 4).length;
  const learning = input.cards.filter((card) => {
    const state = input.states[card.id];
    return Boolean(state?.seen && (state.knownStreak || 0) < 4);
  }).length;
  const studied = Object.values(input.states).filter((state) => state.seen).length;

  return { mastered, learning, studied, unseen: Math.max(0, input.cards.length - mastered - learning) };
}
