import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";
import type { AccountStudySummary } from "../../features/account";
import type { SyncStatus } from "../../sync";

export function buildAccountStudySummary(deck: Card[], cards: Card[], states: Record<string, ReviewState>, savedCount: number, settings: StudySettings, syncStatus: SyncStatus): AccountStudySummary {
  const dueCount = deck.filter((card) => (states[card.id]?.dueAt || 0) <= Date.now()).length;
  const studiedCount = deck.filter((card) => (states[card.id]?.seen || 0) > 0).length;
  const masteredCount = deck.filter((card) => (states[card.id]?.knownStreak || 0) >= 4).length;
  const learningCount = deck.filter((card) => {
    const state = states[card.id];
    return Boolean(state?.seen && (state.knownStreak || 0) < 4);
  }).length;

  return {
    deckTotal: deck.length,
    studiedCount,
    masteredCount,
    learningCount,
    dueCount,
    customCount: cards.filter((card) => card.source === "custom").length,
    savedCount,
    examLevel: settings.examLevel.toUpperCase(),
    syncStatus
  };
}

export function parseDailyProgress(dailyProgress: string) {
  const [reviewedToday, dailyGoal] = dailyProgress.split(" / ").map((value) => Number.parseInt(value, 10) || 0);
  return {
    reviewedToday,
    dailyGoal,
    sessionProgress: dailyGoal ? Math.min(1, reviewedToday / dailyGoal) : 0
  };
}
