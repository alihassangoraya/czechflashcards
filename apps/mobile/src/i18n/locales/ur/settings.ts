import { urSettingsDataToolsTranslations } from "./settings/dataTools";
import { urSettingsReminderTranslations } from "./settings/reminders";
import { urSettingsStudyPlanTranslations } from "./settings/studyPlan";

export const urSettingsTranslations = {
  ...urSettingsStudyPlanTranslations,
  ...urSettingsDataToolsTranslations,
  ...urSettingsReminderTranslations
} as const;
