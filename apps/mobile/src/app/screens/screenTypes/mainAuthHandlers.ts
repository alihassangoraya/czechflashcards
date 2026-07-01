import type { AuthMode, AuthProvider } from "../../../sync";

export type MainAuthHandlers = {
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>;
};
