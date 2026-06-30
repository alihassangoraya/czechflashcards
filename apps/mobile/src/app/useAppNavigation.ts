import { useCallback, useEffect, useState } from "react";
import type { Panel, Screen } from "./appTypes";
import { getInitialScreenFromLocation, screenFromPath, syncScreenPath } from "./webRoutes";

export function useAppNavigation(accountEmail: string | null) {
  const [screen, setScreen] = useState<Screen>(() => getInitialScreenFromLocation());
  const [panel, setPanel] = useState<Panel | null>(null);
  const [query, setQuery] = useState("");
  const [settingsNotice, setSettingsNotice] = useState("");

  useEffect(() => {
    syncScreenPath(screen, true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    function handlePopState() {
      setScreen(screenFromPath(window.location.pathname));
      setPanel(null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateScreen = useCallback((nextScreen: Screen) => {
    setScreen(nextScreen);
    setPanel(null);
    syncScreenPath(nextScreen);
  }, []);

  useEffect(() => {
    if (accountEmail && (screen === "login" || screen === "register")) navigateScreen("home");
  }, [accountEmail, navigateScreen, screen]);

  return { screen, panel, query, settingsNotice, setPanel, setQuery, setSettingsNotice, navigateScreen };
}

export type AppNavigation = ReturnType<typeof useAppNavigation>;
