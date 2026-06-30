import { Appearance } from "react-native";
import type { ThemeMode, ThemePreference } from "./tokens/themeFactory";

export function readSystemThemeMode(): ThemeMode {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

export function resolveThemePreference(preference: ThemePreference): ThemeMode {
  return preference === "system" ? readSystemThemeMode() : preference;
}
