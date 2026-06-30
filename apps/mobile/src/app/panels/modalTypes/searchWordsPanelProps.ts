import type { AppPanelProps } from "../panelTypes/index";

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
