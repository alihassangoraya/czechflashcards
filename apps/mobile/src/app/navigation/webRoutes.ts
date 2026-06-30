import type { Screen } from "../appTypes";
import { screenPaths } from "./screenPaths";

function canUseBrowserHistory() {
  return typeof window !== "undefined" && Boolean(window.history);
}

export function screenFromPath(pathname: string): Screen {
  if (pathname === screenPaths.quiz) return "quiz";
  if (pathname === screenPaths.progress) return "progress";
  if (pathname === screenPaths.study) return "study";
  if (pathname === screenPaths.login) return "login";
  if (pathname === screenPaths.register) return "register";
  return "home";
}

export function getInitialScreenFromLocation(): Screen {
  if (typeof window === "undefined") return "home";
  return screenFromPath(window.location.pathname);
}

export function syncScreenPath(screen: Screen, replace = false) {
  if (!canUseBrowserHistory()) return;

  const nextPath = screenPaths[screen];
  if (window.location.pathname === nextPath) return;

  const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
  if (replace) {
    window.history.replaceState({ screen }, "", nextUrl);
    return;
  }

  window.history.pushState({ screen }, "", nextUrl);
}
