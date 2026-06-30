import type { AccountStudySummary } from "../../../features/account";
import type { AppSupabaseClient } from "../../../sync";

export type PanelAccountDataProps = {
  accountEmail: string | null;
  authBusy: boolean;
  accountStudySummary: AccountStudySummary;
  supabase: AppSupabaseClient;
};
