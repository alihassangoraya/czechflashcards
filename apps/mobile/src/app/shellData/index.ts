import { buildAccountSummaryProps } from "./accountSummaryProps";
import { getCustomCards } from "./customCards";
import { buildSessionProgressProps } from "./sessionProgressProps";
import type { AppShellDataInput } from "./shellDataInput";

export function buildAppShellDataProps(input: AppShellDataInput) {
  const { data, navigation, deck, studySession, cardManagement, supabase, toastMessage } = input;
  if (!data.settings) throw new Error("Cannot build app shell data before settings load");
  const progress = buildSessionProgressProps({ data, deck, studySession });

  return {
    screen: navigation.screen,
    panel: navigation.panel,
    deck,
    cards: data.cards,
    customCards: getCustomCards(data.cards),
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
    ...progress,
    studyAnimations: studySession.studyAnimations,
    query: navigation.query,
    syncStatus: data.syncStatus,
    settingsNotice: navigation.settingsNotice,
    toastMessage,
    accountEmail: data.accountEmail,
    authBusy: data.authBusy,
    ...buildAccountSummaryProps({ data, deck }),
    supabase,
    editingCard: cardManagement.editingCard,
    dailyProgress: data.dailyProgress,
    reviewInterval: studySession.reviewInterval
  };
}

export type AppShellDataProps = ReturnType<typeof buildAppShellDataProps>;
