import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppShellProps } from "./appShellTypes";
import { buildAppShellDataProps } from "./shellData";
import { buildAppShellHandlers } from "./shellHandlers";
import { useAppData } from "./data/useAppData";
import { useCardManagement } from "./cards/useCardManagement";
import { useFilteredStudyDeck } from "./cards/useFilteredStudyDeck";
import { useAppNavigation } from "./navigation/useAppNavigation";
import { useSettingsTools } from "./useSettingsTools";
import { useStudySession } from "./useStudySession";
import { useToast } from "./useToast";

export function useAppController(supabase: SupabaseClient | null): AppShellProps | null {
  const data = useAppData(supabase);
  const { toastMessage, showToast } = useToast();
  const navigation = useAppNavigation(data.accountEmail);
  const deck = useFilteredStudyDeck(data.cards, data.settings, data.savedCardIds, data.deckMemberships);
  const studySession = useStudySession({ db: data.db, settings: data.settings, deck, states: data.states, refresh: data.refresh });
  const cardManagement = useCardManagement({
    db: data.db,
    cards: data.cards,
    current: studySession.current,
    panel: navigation.panel,
    savedCardIds: data.savedCardIds,
    setSavedCardIds: data.setSavedCardIds,
    setDeckMemberships: data.setDeckMemberships,
    setCurrent: studySession.setCurrent,
    setRevealed: studySession.setRevealed,
    setPanel: navigation.setPanel,
    setSessionReviews: studySession.setSessionReviews,
    refresh: data.refresh,
    forceCard: studySession.forceCard,
    showToast
  });
  const settingsTools = useSettingsTools({
    db: data.db,
    deck,
    settings: data.settings,
    setSettingsState: data.setSettingsState,
    setSettingsNotice: navigation.setSettingsNotice,
    refresh: data.refresh,
    shuffleDueCards: studySession.shuffleDueCards,
    clearShuffledDueQueue: studySession.clearShuffledDueQueue,
    forceDeckRefresh: () => data.setStates((value) => ({ ...value }))
  });

  if (!data.db || !data.settings) return null;

  return {
    ...buildAppShellDataProps({ data, navigation, deck, studySession, cardManagement, supabase, toastMessage }),
    ...buildAppShellHandlers({ data, settings: data.settings, navigation, studySession, cardManagement, settingsTools })
  };
}
