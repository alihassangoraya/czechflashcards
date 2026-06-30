import type { PanelAccountDataProps } from "./panelAccountDataProps";
import type { PanelAccountHandlers } from "./panelAccountHandlers";
import type { PanelCardDataProps } from "./panelCardDataProps";
import type { PanelCardHandlers } from "./panelCardHandlers";
import type { PanelNavigationHandlers } from "./panelNavigationHandlers";
import type { PanelSettingsDataProps } from "./panelSettingsDataProps";
import type { PanelSettingsHandlers } from "./panelSettingsHandlers";
import type { PanelStateProps } from "./panelStateProps";

export type AppPanelProps =
  PanelStateProps &
  PanelCardDataProps &
  PanelSettingsDataProps &
  PanelAccountDataProps &
  PanelNavigationHandlers &
  PanelCardHandlers &
  PanelSettingsHandlers &
  PanelAccountHandlers;
