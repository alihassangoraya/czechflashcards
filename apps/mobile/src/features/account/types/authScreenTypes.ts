import type { AuthMode, AuthProvider } from "../../../sync";

export type AuthScreenProps = {
  configured: boolean;
  initialMode: AuthMode;
  busy: boolean;
  onBack: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>;
};
