import { urSettingsCustomDeckTranslations } from "./settings/customDecks";
import { urSettingsDataToolsTranslations } from "./settings/dataTools";
import { urSettingsNoticeTranslations } from "./settings/notices";
import { urSettingsReminderTranslations } from "./settings/reminders";
import { urSettingsStudyPlanTranslations } from "./settings/studyPlan";
import { urSettingsSummaryTranslations } from "./settings/summary";
import { urSettingsSyncTranslations } from "./settings/sync";

export const urSettingsTranslations = {
  ...urSettingsStudyPlanTranslations,
  ...urSettingsDataToolsTranslations,
  ...urSettingsReminderTranslations,
  ...urSettingsCustomDeckTranslations,
  ...urSettingsSyncTranslations,
  ...urSettingsSummaryTranslations,
  ...urSettingsNoticeTranslations
} as const;
