import type { AppShellDataInput } from "./shellDataInput";

export function buildAccountDataProps(input: AppShellDataInput) {
  const { data, supabase } = input;
  return {
    syncStatus: data.syncStatus,
    accountEmail: data.accountEmail,
    accountName: data.accountName,
    authBusy: data.authBusy,
    supabase
  };
}
