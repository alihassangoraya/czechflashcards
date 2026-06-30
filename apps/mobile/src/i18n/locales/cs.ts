import { csCoreTranslations } from "./cs/core";
import { csHomeTranslations } from "./cs/home";
import { csSettingsTranslations } from "./cs/settings";
import { csStudyTranslations } from "./cs/study";
import { csQuizTranslations } from "./cs/quiz";
import { csSearchTranslations } from "./cs/search";
import { csWordsTranslations } from "./cs/words";
import { csAccountTranslations } from "./cs/account";

export const cs = {
  ...csCoreTranslations,
  ...csHomeTranslations,
  ...csSettingsTranslations,
  ...csStudyTranslations,
  ...csQuizTranslations,
  ...csSearchTranslations,
  ...csWordsTranslations,
  ...csAccountTranslations,
} as const;
