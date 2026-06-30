import type { AppShellHandlerInput } from "../handlerInput";

export type NavigationHandlerInput = Pick<
  AppShellHandlerInput,
  "data" | "settings" | "navigation" | "studySession" | "cardManagement"
>;
