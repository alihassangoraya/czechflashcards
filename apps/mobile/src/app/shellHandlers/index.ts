import { buildAccountHandlers } from "./accountHandlers";
import { buildCardHandlers } from "./cardHandlers";
import type { AppShellHandlerInput } from "./handlerInput";
import { buildNavigationHandlers } from "./navigationHandlers";
import { buildSettingsHandlers } from "./settingsHandlers";
import { buildStudyHandlers } from "./studyHandlers";

export function buildAppShellHandlers(input: AppShellHandlerInput) {
  return {
    ...buildNavigationHandlers(input),
    ...buildAccountHandlers(input),
    ...buildCardHandlers(input),
    ...buildStudyHandlers(input),
    ...buildSettingsHandlers(input)
  };
}

export type AppShellHandlers = ReturnType<typeof buildAppShellHandlers>;
