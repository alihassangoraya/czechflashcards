import type { AccountHandlerInput } from "./handlerTypes";

export function buildAccountHandlers({ data, navigation }: AccountHandlerInput) {
  return {
    onAuthenticate: data.authenticate,
    onAuthenticateProvider: data.authenticateWithProvider,
    onSignOut: async () => {
      const error = await data.signOutAccount();
      if (!error) navigation.setPanel(null);
      return error;
    }
  };
}
