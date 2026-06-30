import type { AppSupabaseClient } from "../../../sync";
import type { AuthMode } from "../models/accountAuth";
import type { AccountStudySummary } from "./accountTypes";

export type AccountPanelProps = {
  configured: boolean;
  supabase: AppSupabaseClient;
  accountEmail: string | null;
  studySummary: AccountStudySummary;
  busy: boolean;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
};
