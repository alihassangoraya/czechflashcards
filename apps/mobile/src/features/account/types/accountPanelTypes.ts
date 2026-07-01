import type { AppSupabaseClient, AuthProvider, SyncStatus } from "../../../sync";
import type { AuthMode } from "../models/accountAuth";

export type AccountPanelProps = {
  configured: boolean;
  supabase: AppSupabaseClient;
  syncStatus: SyncStatus;
  accountEmail: string | null;
  busy: boolean;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
  onSyncNow: () => void;
  showToast: (message: string) => void;
};
