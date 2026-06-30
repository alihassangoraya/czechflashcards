import type {
  PanelAccountDataProps,
  PanelAccountHandlers,
  PanelCardDataProps,
  PanelCardHandlers,
  PanelNavigationHandlers,
  PanelSettingsDataProps,
  PanelSettingsHandlers,
  PanelStateProps
} from "./panelTypes/index";

export type AppPanelProps =
  PanelStateProps &
  PanelCardDataProps &
  PanelSettingsDataProps &
  PanelAccountDataProps &
  PanelNavigationHandlers &
  PanelCardHandlers &
  PanelSettingsHandlers &
  PanelAccountHandlers;
