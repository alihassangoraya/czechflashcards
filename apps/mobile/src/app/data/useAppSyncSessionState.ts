import { useState } from "react";
import type { SyncStatus } from "../../sync";

export function useAppSyncSessionState() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);

  return { syncStatus, accountEmail, setSyncStatus, setAccountEmail };
}
