import { Appearance, NativeModules } from "react-native";
import type { ThemePreference } from "./design";

export function applyNativeThemePreference(themePreference: ThemePreference): void {
  Appearance.setColorScheme?.(themePreference === "system" ? null : themePreference);
}

export function reloadForThemeChange(): void {
  NativeModules.DevSettings?.reload?.();
}
