import type { AppSupabaseClient } from "../../../sync";

export type PanelAccountDataProps = {
  accountEmail: string | null;
  authBusy: boolean;
  supabase: AppSupabaseClient;
};
