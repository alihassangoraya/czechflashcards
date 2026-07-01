import { csSettingsCustomDeckTranslations } from "./settings/customDecks";
import { csSettingsDataToolsTranslations } from "./settings/dataTools";
import { csSettingsNoticeTranslations } from "./settings/notices";
import { csSettingsReminderTranslations } from "./settings/reminders";
import { csSettingsStudyPlanTranslations } from "./settings/studyPlan";
import { csSettingsSummaryTranslations } from "./settings/summary";
import { csSettingsSyncTranslations } from "./settings/sync";

export const csSettingsTranslations = {
  ...csSettingsStudyPlanTranslations,
  ...csSettingsDataToolsTranslations,
  ...csSettingsReminderTranslations,
  ...csSettingsCustomDeckTranslations,
  ...csSettingsSyncTranslations,
  ...csSettingsSummaryTranslations,
  ...csSettingsNoticeTranslations
} as const;
