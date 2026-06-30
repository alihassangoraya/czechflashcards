export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const AGAIN_INTERVALS = [2 * MINUTE, 10 * MINUTE, 30 * MINUTE, 2 * HOUR];
export const HARD_INTERVALS = [30 * MINUTE, 2 * HOUR, 8 * HOUR, DAY, 2 * DAY, 4 * DAY];
export const KNOWN_INTERVALS = [8 * HOUR, DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY, 75 * DAY];
export const EASY_INTERVALS = [DAY, 4 * DAY, 10 * DAY, 24 * DAY, 55 * DAY, 120 * DAY];

export function createReviewState(cardId) {
  return { cardId, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
}

export function reviewPriority(state) {
  if (!state.seen) return 1;
  if (state.againCount > 0) return 3;
  return 2;
}

export function compareDueReviewStates(a, b) {
  const priorityDifference = reviewPriority(b) - reviewPriority(a);
  if (priorityDifference) return priorityDifference;

  const overdueDifference = (b.dueAt || 0) - (a.dueAt || 0);
  if (overdueDifference) return overdueDifference;

  return (b.againCount || 0) - (a.againCount || 0) || (a.knownStreak || 0) - (b.knownStreak || 0);
}

export function applyReviewGrade(state, grade, reviewedAt = Date.now()) {
  const next = { ...state, seen: (state.seen || 0) + 1 };
  const wasNew = !state.seen;

  if (grade === "again") {
    next.knownStreak = 0;
    next.againCount = (state.againCount || 0) + 1;
    next.dueAt = reviewedAt + AGAIN_INTERVALS[Math.min(next.againCount - 1, AGAIN_INTERVALS.length - 1)];
  } else if (grade === "hard") {
    next.knownStreak = Math.max(0, state.knownStreak || 0);
    next.againCount = Math.max(0, state.againCount || 0);
    next.dueAt = reviewedAt + HARD_INTERVALS[Math.min(next.seen - 1, HARD_INTERVALS.length - 1)];
  } else if (grade === "easy") {
    next.knownStreak = (state.knownStreak || 0) + 2;
    next.againCount = 0;
    next.dueAt = reviewedAt + EASY_INTERVALS[Math.min(next.knownStreak - 1, EASY_INTERVALS.length - 1)];
  } else {
    next.knownStreak = (state.knownStreak || 0) + 1;
    next.againCount = Math.max(0, (state.againCount || 0) - 1);
    next.dueAt = reviewedAt + KNOWN_INTERVALS[Math.min(next.knownStreak - 1, KNOWN_INTERVALS.length - 1)];
  }

  return {
    state: next,
    event: { cardId: state.cardId, grade, reviewedAt, wasNew, nextDueAt: next.dueAt }
  };
}

export function formatInterval(ms) {
  if (ms <= 0) return "Due now";
  if (ms < HOUR) return `${Math.ceil(ms / MINUTE)} min`;
  if (ms < DAY) return `${Math.ceil(ms / HOUR)} hr`;
  return `${Math.ceil(ms / DAY)} days`;
}
