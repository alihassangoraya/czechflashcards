import { useState } from "react";
import type { SyncStatus } from "../../sync";

export function useAppSyncSessionState() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);

  return { syncStatus, accountEmail, accountName, setSyncStatus, setAccountEmail, setAccountName };
}
