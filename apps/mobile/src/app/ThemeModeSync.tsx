import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { getTheme, startupThemeMode, type ThemePreference } from "../theme/design";
import { applyNativeThemePreference, reloadForThemeChange } from "../theme/themeReload";
import { resolveThemePreference } from "../theme/systemThemeMode";
import { writeStoredThemePreference } from "../theme/themeModePersistence";

type Props = {
  themePreference: ThemePreference;
};

export function ThemeModeSync({ themePreference }: Props) {
  const initialSyncDone = useRef(false);

  useEffect(() => {
    const resolvedThemeMode = resolveThemePreference(themePreference);
    const background = getTheme(resolvedThemeMode).colors.background;
    applyNativeThemePreference(themePreference);
    writeStoredThemePreference(themePreference);
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.documentElement.style.setProperty("--app-background", background);
      document.body.style.backgroundColor = background;
    }

    if (Platform.OS === "web" && !initialSyncDone.current && resolvedThemeMode !== startupThemeMode) {
      initialSyncDone.current = true;
      reloadForThemeChange();
      return;
    }

    initialSyncDone.current = true;
  }, [themePreference]);

  return null;
}
