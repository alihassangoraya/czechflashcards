import { hiSettingsCustomDeckTranslations } from "./settings/customDecks";
import { hiSettingsDataToolsTranslations } from "./settings/dataTools";
import { hiSettingsNoticeTranslations } from "./settings/notices";
import { hiSettingsReminderTranslations } from "./settings/reminders";
import { hiSettingsStudyPlanTranslations } from "./settings/studyPlan";
import { hiSettingsSummaryTranslations } from "./settings/summary";
import { hiSettingsSyncTranslations } from "./settings/sync";

export const hiSettingsTranslations = {
  ...hiSettingsStudyPlanTranslations,
  ...hiSettingsDataToolsTranslations,
  ...hiSettingsReminderTranslations,
  ...hiSettingsCustomDeckTranslations,
  ...hiSettingsSyncTranslations,
  ...hiSettingsSummaryTranslations,
  ...hiSettingsNoticeTranslations
} as const;
