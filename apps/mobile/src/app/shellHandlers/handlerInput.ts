import type { StudySettings } from "../../database";
import type { AppData } from "../data/useAppData";
import type { AppNavigation } from "../navigation/useAppNavigation";
import type { CardManagement } from "../cards/useCardManagement";
import type { SettingsTools } from "../settingsTools/useSettingsTools";
import type { StudySession } from "../study/useStudySession";

export type AppShellHandlerInput = {
  data: AppData;
  settings: StudySettings;
  navigation: AppNavigation;
  studySession: StudySession;
  cardManagement: CardManagement;
  settingsTools: SettingsTools;
};
