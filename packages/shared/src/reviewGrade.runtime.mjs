import { applyAgainGrade, applyEasyGrade, applyGoodGrade, applyHardGrade } from "./reviewGradeTransitions.runtime.mjs";

export function applyReviewGrade(state, grade, reviewedAt = Date.now()) {
  const next = nextReviewState(state, grade, reviewedAt);
  return {
    state: next,
    event: { cardId: state.cardId, grade, reviewedAt, wasNew: !state.seen, nextDueAt: next.dueAt }
  };
}

function nextReviewState(state, grade, reviewedAt) {
  const next = { ...state, seen: (state.seen || 0) + 1 };
  if (grade === "again") return applyAgainGrade(next, state, reviewedAt);
  if (grade === "hard") return applyHardGrade(next, state, reviewedAt);
  if (grade === "easy") return applyEasyGrade(next, state, reviewedAt);
  return applyGoodGrade(next, state, reviewedAt);
}
