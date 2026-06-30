import { hiSettingsDataToolsTranslations } from "./settings/dataTools";
import { hiSettingsReminderTranslations } from "./settings/reminders";
import { hiSettingsStudyPlanTranslations } from "./settings/studyPlan";

export const hiSettingsTranslations = {
  ...hiSettingsStudyPlanTranslations,
  ...hiSettingsDataToolsTranslations,
  ...hiSettingsReminderTranslations
} as const;
