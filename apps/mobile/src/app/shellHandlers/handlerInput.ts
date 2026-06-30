import type { StudySettings } from "../../database";
import type { AppData } from "../data/useAppData";
import type { AppNavigation } from "../navigation/useAppNavigation";
import type { CardManagement } from "../cards/useCardManagement";
import type { SettingsTools } from "../useSettingsTools";
import type { StudySession } from "../useStudySession";

export type AppShellHandlerInput = {
  data: AppData;
  settings: StudySettings;
  navigation: AppNavigation;
  studySession: StudySession;
  cardManagement: CardManagement;
  settingsTools: SettingsTools;
};
