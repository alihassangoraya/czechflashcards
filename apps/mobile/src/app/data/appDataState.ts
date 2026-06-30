import { useAppCardCollectionsState } from "./useAppCardCollectionsState";
import { useAppDatabaseState } from "./useAppDatabaseState";
import { useAppDataSnapshotApplier } from "./useAppDataSnapshotApplier";
import { useAppReviewProgressState } from "./useAppReviewProgressState";
import { useAppSettingsState } from "./useAppSettingsState";
import { useAppSyncSessionState } from "./useAppSyncSessionState";

export function useAppDataState() {
  const database = useAppDatabaseState();
  const collections = useAppCardCollectionsState();
  const progress = useAppReviewProgressState();
  const settingsState = useAppSettingsState();
  const session = useAppSyncSessionState();
  const applySnapshot = useAppDataSnapshotApplier({ ...collections, ...progress });

  return {
    ...database,
    ...collections,
    ...progress,
    ...settingsState,
    ...session,
    applySnapshot
  };
}
