import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { startupThemeMode, type ThemePreference } from "../theme/design";
import { resolveThemePreference } from "../theme/systemThemeMode";
import { writeStoredThemePreference } from "../theme/themeModePersistence";

type Props = {
  themePreference: ThemePreference;
};

export function ThemeModeSync({ themePreference }: Props) {
  const initialSyncDone = useRef(false);

  useEffect(() => {
    const resolvedThemeMode = resolveThemePreference(themePreference);
    writeStoredThemePreference(themePreference);

    if (!initialSyncDone.current && Platform.OS === "web" && resolvedThemeMode !== startupThemeMode && typeof window !== "undefined") {
      initialSyncDone.current = true;
      window.location.reload();
      return;
    }

    initialSyncDone.current = true;
  }, [themePreference]);

  return null;
}
