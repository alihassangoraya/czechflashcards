import type { AppShellHandlerInput } from "./handlerInput";

type Input = Pick<AppShellHandlerInput, "data" | "navigation">;

export function buildAccountHandlers({ data, navigation }: Input) {
  return {
    onAuthenticate: data.authenticate,
    onSignOut: async () => {
      const error = await data.signOutAccount();
      if (!error) navigation.setPanel(null);
      return error;
    }
  };
}
