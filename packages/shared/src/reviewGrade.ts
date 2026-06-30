import type { ReviewEvent, ReviewGrade, ReviewState } from "./types";
import { AGAIN_INTERVALS, EASY_INTERVALS, HARD_INTERVALS, KNOWN_INTERVALS } from "./reviewIntervals";

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

function applyAgainGrade(next: ReviewState, state: ReviewState, reviewedAt: number): ReviewState {
  next.knownStreak = 0;
  next.againCount = (state.againCount || 0) + 1;
  next.dueAt = reviewedAt + AGAIN_INTERVALS[Math.min(next.againCount - 1, AGAIN_INTERVALS.length - 1)];
  return next;
}

function applyHardGrade(next: ReviewState, state: ReviewState, reviewedAt: number): ReviewState {
  next.knownStreak = Math.max(0, state.knownStreak || 0);
  next.againCount = Math.max(0, state.againCount || 0);
  next.dueAt = reviewedAt + HARD_INTERVALS[Math.min(next.seen - 1, HARD_INTERVALS.length - 1)];
  return next;
}

function applyEasyGrade(next: ReviewState, state: ReviewState, reviewedAt: number): ReviewState {
  next.knownStreak = (state.knownStreak || 0) + 2;
  next.againCount = 0;
  next.dueAt = reviewedAt + EASY_INTERVALS[Math.min(next.knownStreak - 1, EASY_INTERVALS.length - 1)];
  return next;
}

function applyGoodGrade(next: ReviewState, state: ReviewState, reviewedAt: number): ReviewState {
  next.knownStreak = (state.knownStreak || 0) + 1;
  next.againCount = Math.max(0, (state.againCount || 0) - 1);
  next.dueAt = reviewedAt + KNOWN_INTERVALS[Math.min(next.knownStreak - 1, KNOWN_INTERVALS.length - 1)];
  return next;
}
