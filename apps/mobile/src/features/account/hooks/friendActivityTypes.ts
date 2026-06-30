import type { AppSupabaseClient } from "../../../sync";

export type FriendActivityParams = {
  accountEmail: string | null;
  supabase: AppSupabaseClient;
  setMessage: (message: string) => void;
};
