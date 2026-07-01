import { Appearance } from "react-native";
import type { ThemePreference } from "./design";

export function applyNativeThemePreference(themePreference: ThemePreference): void {
  Appearance.setColorScheme?.(themePreference === "system" ? null : themePreference);
}

export function reloadForThemeChange(): void {
  // Native theme changes are applied through Appearance.setColorScheme.
}
