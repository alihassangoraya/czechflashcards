import type { SupabaseClient } from "@supabase/supabase-js";
import type { Card } from "@czech-flashcards/shared";
import type { AppData } from "./useAppData";
import type { AppNavigation } from "./useAppNavigation";
import type { CardManagement } from "./useCardManagement";
import type { StudySession } from "./useStudySession";
import { buildAccountStudySummary, parseDailyProgress } from "./studySummary";

type Input = {
  data: AppData;
  navigation: AppNavigation;
  deck: Card[];
  studySession: StudySession;
  cardManagement: CardManagement;
  supabase: SupabaseClient | null;
  toastMessage: string;
};

export function buildAppShellDataProps({ data, navigation, deck, studySession, cardManagement, supabase, toastMessage }: Input) {
  if (!data.settings) throw new Error("Cannot build app shell data before settings load");
  const customCards = data.cards.filter((card) => card.source === "custom");
  const accountStudySummary = buildAccountStudySummary(deck, data.cards, data.states, data.savedCardIds.size, data.settings, data.syncStatus);
  const { reviewedToday, dailyGoal, sessionProgress } = parseDailyProgress(data.dailyProgress);
  const sessionTarget = Math.min(deck.length, Math.max(1, dailyGoal - reviewedToday + studySession.sessionReviews));

  return {
    screen: navigation.screen,
    panel: navigation.panel,
    deck,
    cards: data.cards,
    customCards,
    states: data.states,
    settings: data.settings,
    savedCardIds: data.savedCardIds,
    deckMemberships: data.deckMemberships,
    current: studySession.current,
    deckManagementCard: cardManagement.deckManagementCard,
    revealed: studySession.revealed,
    grading: studySession.grading,
    lastReviewCard: studySession.lastReview?.card || null,
    sessionReviews: studySession.sessionReviews,
    sessionTarget,
    reviewedToday,
    dailyGoal,
    sessionProgress,
    studyAnimations: studySession.studyAnimations,
    query: navigation.query,
    syncStatus: data.syncStatus,
    settingsNotice: navigation.settingsNotice,
    toastMessage,
    accountEmail: data.accountEmail,
    authBusy: data.authBusy,
    accountStudySummary,
    supabase,
    editingCard: cardManagement.editingCard,
    dailyProgress: data.dailyProgress,
    reviewInterval: studySession.reviewInterval
  };
}
