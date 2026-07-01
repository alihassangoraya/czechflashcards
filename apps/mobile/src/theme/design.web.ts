export { getTheme, themes, type AppTheme, type ThemeMode, type ThemePreference } from "./tokens/themeFactory";
import { radius, size, spacing } from "./tokens/baseTokens";
import { motion } from "./tokens/motion";
import { shadow } from "./tokens/shadow";
import { typography } from "./tokens/typography";
import { getTheme } from "./tokens/themeFactory";
import { readStoredThemePreference } from "./themeModePersistence";
import { resolveThemePreference } from "./systemThemeMode";
import { webColors as colors } from "./webThemeVariables";

export const startupThemePreference = readStoredThemePreference();
export const startupThemeMode = resolveThemePreference(startupThemePreference);
export const theme = { ...getTheme(startupThemeMode), colors };
export { colors, radius, shadow, spacing, size, typography, motion };
