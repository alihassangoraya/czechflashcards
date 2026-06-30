import type { Panel, Screen } from "../../appTypes";

export type MainNavigationHandlers = {
  onSetPanel: (panel: Panel | null) => void;
  onSetScreen: (screen: Screen) => void;
  onStartStudy: () => void;
  onSelectCategory: (category: string) => void;
};
