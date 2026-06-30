import { radius, size, spacing } from "./baseTokens";
import { darkColors, lightColors } from "./colors";
import { motion } from "./motion";
import { typography } from "./typography";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

const shared = { spacing, radius, size, typography, motion } as const;

export const themes = {
  light: { ...shared, colors: lightColors },
  dark: { ...shared, colors: darkColors }
} as const;

export type AppTheme = (typeof themes)[ThemeMode];

export function getTheme(mode: ThemeMode): AppTheme {
  return themes[mode];
}
