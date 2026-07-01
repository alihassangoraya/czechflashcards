import type { AppShellHandlerInput } from "../handlerInput";

export type SettingsHandlerInput = Pick<AppShellHandlerInput, "data" | "settingsTools" | "showToast" | "t">;
