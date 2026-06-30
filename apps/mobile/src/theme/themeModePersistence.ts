import type { ThemeMode } from "./tokens/themeFactory";

export const THEME_MODE_STORAGE_KEY = "czechFlashcards.themeMode";

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function readStoredThemeMode(fallback: ThemeMode = "dark"): ThemeMode {
  try {
    const stored = globalThis.localStorage?.getItem(THEME_MODE_STORAGE_KEY);
    return isThemeMode(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredThemeMode(themeMode: ThemeMode): void {
  try {
    globalThis.localStorage?.setItem(THEME_MODE_STORAGE_KEY, themeMode);
  } catch {
    // Native platforms do not expose localStorage; settings persistence remains the source of truth there.
  }
}
