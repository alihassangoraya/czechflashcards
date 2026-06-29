import { radius, size, spacing } from "./baseTokens";
import { darkColors, lightColors } from "./colors";
import { typography } from "./typography";

export type ThemeMode = "light" | "dark";

const shared = { spacing, radius, size, typography } as const;

export const themes = {
  light: { ...shared, colors: lightColors },
  dark: { ...shared, colors: darkColors }
} as const;

export type AppTheme = (typeof themes)[ThemeMode];

export function getTheme(mode: ThemeMode = "light"): AppTheme {
  return themes[mode];
}
