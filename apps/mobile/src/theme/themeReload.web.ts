import type { ThemePreference } from "./design";

export function applyNativeThemePreference(themePreference: ThemePreference): void {
  void themePreference;
}

export function reloadForThemeChange(): void {
  if (typeof window !== "undefined") window.location.reload();
}
