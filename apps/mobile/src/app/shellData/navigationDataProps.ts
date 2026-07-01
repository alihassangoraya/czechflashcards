import type { AppShellDataInput } from "./shellDataInput";

export function buildNavigationDataProps({ navigation, showToast }: AppShellDataInput) {
  return {
    screen: navigation.screen,
    panel: navigation.panel,
    query: navigation.query,
    settingsNotice: navigation.settingsNotice,
    showToast
  };
}
