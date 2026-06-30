import { ukSettingsCustomDeckTranslations } from "./settings/customDecks";
import { ukSettingsDataToolsTranslations } from "./settings/dataTools";
import { ukSettingsNoticeTranslations } from "./settings/notices";
import { ukSettingsReminderTranslations } from "./settings/reminders";
import { ukSettingsStudyPlanTranslations } from "./settings/studyPlan";
import { ukSettingsSummaryTranslations } from "./settings/summary";
import { ukSettingsSyncTranslations } from "./settings/sync";

export const ukSettingsTranslations = {
  ...ukSettingsStudyPlanTranslations,
  ...ukSettingsDataToolsTranslations,
  ...ukSettingsReminderTranslations,
  ...ukSettingsCustomDeckTranslations,
  ...ukSettingsSyncTranslations,
  ...ukSettingsSummaryTranslations,
  ...ukSettingsNoticeTranslations
} as const;
