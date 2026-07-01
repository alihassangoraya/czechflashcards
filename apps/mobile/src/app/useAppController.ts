import type { AppShellProps } from "./appTypes";
import type { AppSupabaseClient } from "../sync";
import { buildAppShellDataProps } from "./shellData";
import { buildAppShellHandlers } from "./shellHandlers";
import { useAppData } from "./data/useAppData";
import { useAppCardManagement } from "./cards/useAppCardManagement";
import { useFilteredStudyDeck } from "./cards/useFilteredStudyDeck";
import { useAppNavigation } from "./navigation/useAppNavigation";
import { useControllerSettingsTools } from "./useControllerSettingsTools";
import { useStudySession } from "./study/useStudySession";
import { useToast } from "./feedback/useToast";
import { createI18nValue } from "../i18n/i18nValue";

export function useAppController(supabase: AppSupabaseClient): AppShellProps | null {
  const data = useAppData(supabase);
  const { toastMessage, showToast } = useToast();
  const navigation = useAppNavigation(data.accountEmail);
  const deck = useFilteredStudyDeck(data.cards, data.settings, data.savedCardIds, data.deckMemberships);
  const studySession = useStudySession({ db: data.db, settings: data.settings, deck, states: data.states, refresh: data.refresh });
  const cardManagement = useAppCardManagement({ data, navigation, showToast, studySession });
  const settingsTools = useControllerSettingsTools({ data, navigation, studySession, deck, supabase, showToast });

  if (!data.db || !data.settings) return null;

  return {
    ...buildAppShellDataProps({ data, navigation, deck, studySession, cardManagement, supabase, toastMessage, showToast }),
    ...buildAppShellHandlers({ data, settings: data.settings, navigation, studySession, cardManagement, settingsTools, showToast, t: createI18nValue(data.settings.appLanguage).t })
  };
}
