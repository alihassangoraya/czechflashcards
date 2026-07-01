import { useEffect } from "react";
import type { ThemePreference } from "../theme/design";
import { applyNativeThemePreference } from "../theme/themeReload";
import { resolveThemePreference } from "../theme/systemThemeMode";
import { writeStoredThemePreference } from "../theme/themeModePersistence";
import { applyWebThemeVariables } from "../theme/webThemeVariables";

type Props = {
  themePreference: ThemePreference;
};

export function ThemeModeSync({ themePreference }: Props) {
  useEffect(() => {
    const resolvedThemeMode = resolveThemePreference(themePreference);
    applyNativeThemePreference(themePreference);
    writeStoredThemePreference(themePreference);
    applyWebThemeVariables(resolvedThemeMode);
  }, [themePreference]);

  return null;
}
