import type { ThemeMode, ThemePreference } from "./design";
import { applyNativeThemePreference } from "./themeReload";
import { resolveThemePreference } from "./systemThemeMode";
import { writeStoredThemePreference } from "./themeModePersistence";
import { applyWebThemeVariables } from "./webThemeVariables";

export function applyThemePreference(themePreference: ThemePreference): ThemeMode {
  const resolvedThemeMode = resolveThemePreference(themePreference);
  writeStoredThemePreference(themePreference);
  applyNativeThemePreference(themePreference);
  applyWebThemeVariables(resolvedThemeMode);
  return resolvedThemeMode;
}
