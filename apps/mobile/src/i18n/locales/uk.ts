import { ukCoreTranslations } from "./uk/core";
import { ukToastTranslations } from "./uk/toast";
import { ukHomeTranslations } from "./uk/home";
import { ukSettingsTranslations } from "./uk/settings";
import { ukStudyTranslations } from "./uk/study";
import { ukQuizTranslations } from "./uk/quiz";
import { ukSearchTranslations } from "./uk/search";
import { ukWordsTranslations } from "./uk/words";
import { ukAccountTranslations } from "./uk/account";
import { ukProgressTranslations } from "./uk/progress";

export const uk = {
  ...ukCoreTranslations,
  ...ukToastTranslations,
  ...ukHomeTranslations,
  ...ukSettingsTranslations,
  ...ukStudyTranslations,
  ...ukQuizTranslations,
  ...ukSearchTranslations,
  ...ukWordsTranslations,
  ...ukAccountTranslations,
  ...ukProgressTranslations,
} as const;
