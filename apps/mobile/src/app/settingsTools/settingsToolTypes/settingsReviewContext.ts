import type { SettingsToolContext } from "./settingsToolContext";

export type SettingsReviewContext = Pick<SettingsToolContext, "db" | "deck" | "setSettingsNotice" | "refresh"> & {
  shuffleDueCards: (onNotice: (message: string) => void) => void;
  clearShuffledDueQueue: () => void;
  forceDeckRefresh: () => void;
};
