import type { AppPanelProps } from "./panelTypes";

export type AccountModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "supabase"
  | "accountEmail"
  | "accountStudySummary"
  | "authBusy"
  | "onSetPanel"
  | "onAuthenticate"
  | "onSignOut"
>;

export type AddWordModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "customCards"
  | "settings"
  | "onSetPanel"
  | "onAddWord"
  | "onDeleteWord"
  | "onOpenCardEditor"
>;

export type DeckMembershipModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "settings"
  | "deckMemberships"
  | "deckManagementCard"
  | "onSetPanel"
  | "onSetDeckManagementCard"
  | "onAddCardToDeck"
  | "onRemoveCardFromDeck"
>;

export type EditCardModalProps = Pick<
  AppPanelProps,
  "panel" | "editingCard" | "onCloseCardEditor" | "onSaveCorrection"
>;

export type GrammarModalProps = Pick<AppPanelProps, "panel" | "current" | "onSetPanel">;

export type SearchWordsPanelProps = Pick<
  AppPanelProps,
  | "panel"
  | "cards"
  | "query"
  | "settings"
  | "savedCardIds"
  | "onSetPanel"
  | "onQueryChange"
  | "onStudySearchResult"
  | "onToggleSaved"
  | "onSetDeckManagementCard"
  | "onOpenCardEditor"
>;

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
