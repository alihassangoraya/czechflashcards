import { useEffect } from "react";
import type { ThemePreference } from "../theme/design";
import { applyThemePreference } from "../theme/applyThemePreference";

type Props = {
  themePreference: ThemePreference;
};

export function ThemeModeSync({ themePreference }: Props) {
  useEffect(() => {
    applyThemePreference(themePreference);
  }, [themePreference]);

  return null;
}
