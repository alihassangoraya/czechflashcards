import type { ThemePreference } from "./design";

export function applyNativeThemePreference(themePreference: ThemePreference): void {
  void themePreference;
}

export function reloadForThemeChange(): void {
  // Web styles use CSS variables, so theme changes apply without a page reload.
}
