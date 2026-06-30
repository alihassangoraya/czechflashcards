import { enSettingsCustomDeckTranslations } from "./settings/customDecks";
import { enSettingsDataToolsTranslations } from "./settings/dataTools";
import { enSettingsNoticeTranslations } from "./settings/notices";
import { enSettingsReminderTranslations } from "./settings/reminders";
import { enSettingsStudyPlanTranslations } from "./settings/studyPlan";
import { enSettingsSummaryTranslations } from "./settings/summary";
import { enSettingsSyncTranslations } from "./settings/sync";

export const enSettingsTranslations = {
  ...enSettingsStudyPlanTranslations,
  ...enSettingsDataToolsTranslations,
  ...enSettingsReminderTranslations,
  ...enSettingsCustomDeckTranslations,
  ...enSettingsSyncTranslations,
  ...enSettingsSummaryTranslations,
  ...enSettingsNoticeTranslations
} as const;
