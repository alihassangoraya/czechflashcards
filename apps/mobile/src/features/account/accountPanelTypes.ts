import type { createSupabaseClient } from "../../sync";
import type { AuthMode } from "./accountAuth";
import type { AccountStudySummary } from "./accountTypes";

export type AccountPanelProps = {
  configured: boolean;
  supabase: ReturnType<typeof createSupabaseClient>;
  accountEmail: string | null;
  studySummary: AccountStudySummary;
  busy: boolean;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
};
