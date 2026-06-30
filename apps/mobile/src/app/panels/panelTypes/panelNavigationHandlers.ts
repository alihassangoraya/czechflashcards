import type { Panel } from "../../appTypes";

export type PanelNavigationHandlers = {
  onSetPanel: (panel: Panel | null) => void;
  onQueryChange: (value: string) => void;
};
