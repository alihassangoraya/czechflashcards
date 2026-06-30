import type { AppPanelProps } from "../panelTypes";

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
