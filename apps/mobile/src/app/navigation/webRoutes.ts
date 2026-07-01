import { Platform } from "react-native";
import type { Screen } from "../appTypes";
import { normalizeWebPath } from "./normalizeWebPath";
import { screenPaths } from "./screenPaths";

function canUseBrowserHistory() {
  return Platform.OS === "web" && typeof window !== "undefined" && Boolean(window.history && window.location);
}

export function screenFromPath(pathname: string): Screen {
  const path = normalizeWebPath(pathname);
  const match = (Object.keys(screenPaths) as Screen[]).find((screen) => screenPaths[screen] === path);
  if (match) return match;
  return "home";
}

export function getInitialScreenFromLocation(): Screen {
  if (!canUseBrowserHistory()) return "home";
  return screenFromPath(window.location.pathname);
}

export function syncScreenPath(screen: Screen, replace = false) {
  if (!canUseBrowserHistory()) return false;
  const nextPath = screenPaths[screen];
  if (window.location.pathname === nextPath) return false;
  const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
  if (replace) {
    window.history.replaceState({ screen }, "", nextUrl);
    return false;
  }
  window.history.pushState({ screen }, "", nextUrl);
  return true;
}
