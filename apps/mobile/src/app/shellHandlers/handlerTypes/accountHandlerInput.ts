import type { AppShellHandlerInput } from "../handlerInput";

export type AccountHandlerInput = Pick<AppShellHandlerInput, "data" | "navigation">;
