import { useCallback, useEffect, useState } from "react";
import type { Panel, Screen } from "../appTypes";
import { canUseBrowserBack } from "./browserHistoryAvailability";
import { useNavigationHistory } from "./useNavigationHistory";
import { useWebRouteSync } from "./useWebRouteSync";
import { getInitialScreenFromLocation, syncScreenPath } from "./webRoutes";
import { isPasswordRecoveryUrl } from "../../services/sync/passwordRecoveryUrl";

export function useAppNavigation(accountEmail: string | null) {
  const [screen, setScreen] = useState<Screen>(() => isPasswordRecoveryUrl() ? "reset-password" : getInitialScreenFromLocation());
  const [panel, setPanel] = useState<Panel | null>(null);
  const [query, setQuery] = useState("");
  const [settingsNotice, setSettingsNotice] = useState("");
  const history = useNavigationHistory();
  const onPopState = useCallback(() => {
    history.drop();
  }, [history]);
  useWebRouteSync({ screen, setScreen, setPanel, onPopState });
  const navigateScreen = useCallback((nextScreen: Screen) => {
    history.push(screen, nextScreen);
    setScreen(nextScreen);
    setPanel(null);
    syncScreenPath(nextScreen);
  }, [history, screen]);
  const goBack = useCallback(() => {
    if (canUseBrowserBack(history.has())) {
      window.history.back();
      return;
    }
    const previous = history.pop() || "home";
    setScreen(previous);
    setPanel(null);
    syncScreenPath(previous, true);
  }, [history]);
  useEffect(() => {
    if (accountEmail && (screen === "login" || screen === "register")) navigateScreen("account");
  }, [accountEmail, navigateScreen, screen]);
  return { screen, panel, query, settingsNotice, setPanel, setQuery, setSettingsNotice, navigateScreen, goBack };
}
