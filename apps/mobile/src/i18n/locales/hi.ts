import { hiCoreTranslations } from "./hi/core";
import { hiToastTranslations } from "./hi/toast";
import { hiHomeTranslations } from "./hi/home";
import { hiSettingsTranslations } from "./hi/settings";
import { hiStudyTranslations } from "./hi/study";
import { hiQuizTranslations } from "./hi/quiz";
import { hiSearchTranslations } from "./hi/search";
import { hiWordsTranslations } from "./hi/words";
import { hiAccountTranslations } from "./hi/account";
import { hiProgressTranslations } from "./hi/progress";

export const hi = {
  ...hiCoreTranslations,
  ...hiToastTranslations,
  ...hiHomeTranslations,
  ...hiSettingsTranslations,
  ...hiStudyTranslations,
  ...hiQuizTranslations,
  ...hiSearchTranslations,
  ...hiWordsTranslations,
  ...hiAccountTranslations,
  ...hiProgressTranslations,
} as const;
