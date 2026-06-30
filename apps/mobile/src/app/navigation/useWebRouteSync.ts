import { useEffect } from "react";
import type { Screen } from "../appTypes";
import { screenFromPath, syncScreenPath } from "./webRoutes";

type Params = {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  setPanel: (panel: null) => void;
};

export function useWebRouteSync({ screen, setScreen, setPanel }: Params) {
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
  }, [setPanel, setScreen]);
}
