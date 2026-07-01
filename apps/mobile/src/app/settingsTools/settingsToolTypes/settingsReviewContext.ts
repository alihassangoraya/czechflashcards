import type { SettingsToolContext } from "./settingsToolContext";

export type SettingsReviewContext = Pick<SettingsToolContext, "db" | "deck" | "refresh"> & {
  shuffleDueCards: (onNotice: (message: string) => void) => boolean;
  clearShuffledDueQueue: () => void;
  forceDeckRefresh: () => void;
  showActionNotice: (message: string) => void;
};
