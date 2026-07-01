import type { SyncStatus } from "../../../sync";

export type MainAccountDataProps = {
  accountEmail: string | null;
  accountName: string | null;
  syncStatus: SyncStatus;
  authBusy: boolean;
  dailyProgress: string;
};
