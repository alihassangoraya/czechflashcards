import { csSettingsDataToolsTranslations } from "./settings/dataTools";
import { csSettingsReminderTranslations } from "./settings/reminders";
import { csSettingsStudyPlanTranslations } from "./settings/studyPlan";

export const csSettingsTranslations = {
  ...csSettingsStudyPlanTranslations,
  ...csSettingsDataToolsTranslations,
  ...csSettingsReminderTranslations
} as const;
