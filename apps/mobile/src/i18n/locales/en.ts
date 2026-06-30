import { enCoreTranslations } from "./en/core";
import { enHomeTranslations } from "./en/home";
import { enSettingsTranslations } from "./en/settings";
import { enStudyTranslations } from "./en/study";
import { enQuizTranslations } from "./en/quiz";
import { enSearchTranslations } from "./en/search";
import { enWordsTranslations } from "./en/words";
import { enAccountTranslations } from "./en/account";

export const en = {
  ...enCoreTranslations,
  ...enHomeTranslations,
  ...enSettingsTranslations,
  ...enStudyTranslations,
  ...enQuizTranslations,
  ...enSearchTranslations,
  ...enWordsTranslations,
  ...enAccountTranslations,
} as const;
