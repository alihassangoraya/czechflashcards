import type { AppShellHandlerInput } from "./handlerInput";

export type AccountHandlerInput = Pick<AppShellHandlerInput, "data" | "navigation">;

export type CardHandlerInput = Pick<AppShellHandlerInput, "cardManagement">;

export type NavigationHandlerInput = Pick<
  AppShellHandlerInput,
  "data" | "settings" | "navigation" | "studySession" | "cardManagement"
>;

export type SettingsHandlerInput = Pick<AppShellHandlerInput, "data" | "settingsTools">;

export type StudyHandlerInput = Pick<AppShellHandlerInput, "studySession">;
