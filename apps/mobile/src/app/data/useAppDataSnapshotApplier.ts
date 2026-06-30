import { applyAppDataSnapshot } from "./appDataSnapshotApply";
import type { AppDataSnapshot } from "./appDataSnapshotTypes";
import type { AppDataState } from "./appDataStateTypes";

type SnapshotSetters = Pick<AppDataState, "setCards" | "setSavedCardIds" | "setDeckMemberships" | "setStates"> & {
  setDailyProgress: (dailyProgress: string) => void;
};

export function useAppDataSnapshotApplier(setters: SnapshotSetters) {
  return (snapshot: AppDataSnapshot) => applyAppDataSnapshot(snapshot, setters);
}
