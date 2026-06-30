import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { startupThemeMode, type ThemeMode } from "../theme/design";
import { writeStoredThemeMode } from "../theme/themeModePersistence";

type Props = {
  themeMode: ThemeMode;
};

export function ThemeModeSync({ themeMode }: Props) {
  const initialSyncDone = useRef(false);

  useEffect(() => {
    writeStoredThemeMode(themeMode);

    if (!initialSyncDone.current && Platform.OS === "web" && themeMode !== startupThemeMode && typeof window !== "undefined") {
      initialSyncDone.current = true;
      window.location.reload();
      return;
    }

    initialSyncDone.current = true;
  }, [themeMode]);

  return null;
}
