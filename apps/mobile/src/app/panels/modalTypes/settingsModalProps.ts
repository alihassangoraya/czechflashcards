import type { AppPanelProps } from "../panelTypes";

export type SettingsModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "cards"
  | "settings"
  | "deckMemberships"
  | "accountEmail"
  | "syncStatus"
  | "settingsNotice"
  | "onSetPanel"
  | "onChangeSettings"
  | "onSyncNow"
  | "onRestoreJson"
  | "onImportCsv"
  | "onShuffleDue"
  | "onReviewAllNow"
  | "onExportProgress"
  | "onExportDeck"
>;
