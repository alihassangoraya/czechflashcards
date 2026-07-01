import type { StudySettings } from "../../database";
import type { AppData } from "../data/useAppData";
import type { AppNavigation } from "../navigation/appNavigationTypes";
import type { CardManagement } from "../cards/useCardManagement";
import type { SettingsTools } from "../settingsTools/useSettingsTools";
import type { StudySession } from "../study/useStudySession";
import type { I18nContextValue } from "../../i18n/i18nContext";

export type AppShellHandlerInput = {
  data: AppData;
  settings: StudySettings;
  navigation: AppNavigation;
  studySession: StudySession;
  cardManagement: CardManagement;
  settingsTools: SettingsTools;
  showToast: (message: string) => void;
  t: I18nContextValue["t"];
};
