import type { Panel, Screen } from "../../appTypes";

export type PanelNavigationHandlers = {
  onSetPanel: (panel: Panel | null) => void;
  onSetScreen: (screen: Screen) => void;
  onQueryChange: (value: string) => void;
};
