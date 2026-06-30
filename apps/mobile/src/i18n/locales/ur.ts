import { urCoreTranslations } from "./ur/core";
import { urHomeTranslations } from "./ur/home";
import { urSettingsTranslations } from "./ur/settings";
import { urStudyTranslations } from "./ur/study";
import { urQuizTranslations } from "./ur/quiz";
import { urSearchTranslations } from "./ur/search";
import { urWordsTranslations } from "./ur/words";
import { urAccountTranslations } from "./ur/account";

export const ur = {
  ...urCoreTranslations,
  ...urHomeTranslations,
  ...urSettingsTranslations,
  ...urStudyTranslations,
  ...urQuizTranslations,
  ...urSearchTranslations,
  ...urWordsTranslations,
  ...urAccountTranslations,
} as const;
