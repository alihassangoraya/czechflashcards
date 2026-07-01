import { enCoreTranslations } from "./en/core";
import { enToastTranslations } from "./en/toast";
import { enHomeTranslations } from "./en/home";
import { enSettingsTranslations } from "./en/settings";
import { enStudyTranslations } from "./en/study";
import { enQuizTranslations } from "./en/quiz";
import { enSearchTranslations } from "./en/search";
import { enWordsTranslations } from "./en/words";
import { enAccountTranslations } from "./en/account";
import { enProgressTranslations } from "./en/progress";

export const en = {
  ...enCoreTranslations,
  ...enToastTranslations,
  ...enHomeTranslations,
  ...enSettingsTranslations,
  ...enStudyTranslations,
  ...enQuizTranslations,
  ...enSearchTranslations,
  ...enWordsTranslations,
  ...enAccountTranslations,
  ...enProgressTranslations,
} as const;
