import type { AppSupabaseClient } from "../sync";
import type { AppData } from "./data/useAppData";
import type { AppNavigation } from "./navigation/appNavigationTypes";
import type { StudySession } from "./study/useStudySession";
import { useSettingsTools } from "./settingsTools/useSettingsTools";

type Params = { data: AppData; navigation: AppNavigation; studySession: StudySession; deck: AppData["cards"]; supabase: AppSupabaseClient; showToast: (message: string) => void };

export function useControllerSettingsTools({ data, navigation, studySession, deck, supabase, showToast }: Params) {
  const setDataNotice = (message: string) => {
    navigation.setSettingsNotice(message);
    showToast(message);
  };
  return useSettingsTools({
    db: data.db,
    deck,
    settings: data.settings,
    accountEmail: data.accountEmail,
    supabase,
    setSettingsState: data.setSettingsState,
    setSettingsNotice: setDataNotice,
    showActionNotice: showToast,
    refresh: data.refresh,
    shuffleDueCards: studySession.shuffleDueCards,
    clearShuffledDueQueue: studySession.clearShuffledDueQueue,
    forceDeckRefresh: () => data.setStates((value) => ({ ...value }))
  });
}
