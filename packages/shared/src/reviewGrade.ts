import type { ReviewEvent, ReviewGrade, ReviewState } from "./types";
import { applyAgainGrade, applyEasyGrade, applyGoodGrade, applyHardGrade } from "./reviewGradeTransitions";

export function applyReviewGrade(state: ReviewState, grade: ReviewGrade, reviewedAt = Date.now()): {
  state: ReviewState;
  event: ReviewEvent;
} {
  const next = nextReviewState(state, grade, reviewedAt);
  return {
    state: next,
    event: { cardId: state.cardId, grade, reviewedAt, wasNew: !state.seen, nextDueAt: next.dueAt }
  };
}

function nextReviewState(state: ReviewState, grade: ReviewGrade, reviewedAt: number): ReviewState {
  const next = { ...state, seen: (state.seen || 0) + 1 };
  if (grade === "again") return applyAgainGrade(next, state, reviewedAt);
  if (grade === "hard") return applyHardGrade(next, state, reviewedAt);
  if (grade === "easy") return applyEasyGrade(next, state, reviewedAt);
  return applyGoodGrade(next, state, reviewedAt);
}
