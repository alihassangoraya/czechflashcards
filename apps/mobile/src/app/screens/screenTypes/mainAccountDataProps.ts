import type { AppSupabaseClient, SyncStatus } from "../../../sync";

export type MainAccountDataProps = {
  accountEmail: string | null;
  accountName: string | null;
  syncStatus: SyncStatus;
  authBusy: boolean;
  supabase: AppSupabaseClient;
  dailyProgress: string;
};
