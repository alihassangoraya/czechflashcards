import type { MainScreenProps } from "../screenTypes/index";

export type SettingsRouteProps = Pick<
  MainScreenProps,
  | "settings"
  | "cards"
  | "deckMemberships"
  | "settingsNotice"
  | "onGoBack"
  | "onChangeSettings"
  | "onRestoreJson"
  | "onImportCsv"
  | "onExportProgress"
  | "onExportDeck"
  | "onExportAccountData"
>;
