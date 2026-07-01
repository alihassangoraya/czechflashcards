import type { Screen } from "../../appTypes";

export type MainRouteStateProps = {
  screen: Screen;
  settingsNotice: string;
  showToast: (message: string) => void;
};
