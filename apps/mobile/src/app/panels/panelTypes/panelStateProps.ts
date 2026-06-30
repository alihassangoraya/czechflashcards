import type { Panel } from "../../appTypes";

export type PanelStateProps = {
  panel: Panel | null;
  query: string;
  settingsNotice: string;
};
