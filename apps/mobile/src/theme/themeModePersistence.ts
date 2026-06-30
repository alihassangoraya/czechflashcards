import type { ThemePreference } from "./tokens/themeFactory";

export const THEME_MODE_STORAGE_KEY = "czechFlashcards.themeMode";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

export function readStoredThemePreference(fallback: ThemePreference = "system"): ThemePreference {
  try {
    const stored = globalThis.localStorage?.getItem(THEME_MODE_STORAGE_KEY);
    return isThemePreference(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredThemePreference(themePreference: ThemePreference): void {
  try {
    if (themePreference === "system") globalThis.localStorage?.removeItem(THEME_MODE_STORAGE_KEY);
    else globalThis.localStorage?.setItem(THEME_MODE_STORAGE_KEY, themePreference);
  } catch {
    // Native platforms do not expose localStorage; settings persistence remains the source of truth there.
  }
}
