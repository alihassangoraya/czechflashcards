import type { AppSupabaseClient, AuthMode, AuthProvider } from "../../../sync";

export type AuthScreenProps = {
  configured: boolean;
  initialMode: AuthMode;
  busy: boolean;
  supabase: AppSupabaseClient;
  onBack: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>;
  showToast: (message: string) => void;
};
