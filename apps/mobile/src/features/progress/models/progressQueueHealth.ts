import type { ProgressDashboardInput, ProgressQueueHealth } from "../types/progressTypes";

const dayMs = 24 * 60 * 60 * 1000;

export function buildProgressQueueHealth(input: ProgressDashboardInput, now = Date.now()): ProgressQueueHealth {
  return input.cards.reduce((queue, card) => {
    const state = input.states[card.id];
    if (!state) return queue;
    if ((state.knownStreak || 0) >= 4) queue.stable += 1;
    if ((state.againCount || 0) > 0) queue.relearning += 1;
    if ((state.dueAt || 0) <= now) queue.dueNow += 1;
    else if ((state.dueAt || 0) <= now + dayMs) queue.dueSoon += 1;
    return queue;
  }, { dueNow: 0, dueSoon: 0, relearning: 0, stable: 0 });
}
