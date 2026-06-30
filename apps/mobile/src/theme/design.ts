export { getTheme, themes, type AppTheme, type ThemeMode, type ThemePreference } from "./tokens/themeFactory";
import { getTheme } from "./tokens/themeFactory";
import { readStoredThemePreference } from "./themeModePersistence";
import { resolveThemePreference } from "./systemThemeMode";

export const startupThemePreference = readStoredThemePreference();
export const startupThemeMode = resolveThemePreference(startupThemePreference);
export const theme = getTheme(startupThemeMode);
export const { colors, radius, spacing, size, typography, motion } = theme;
export { shadow } from "./tokens/shadow";
