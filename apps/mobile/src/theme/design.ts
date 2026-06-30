export { getTheme, themes, type AppTheme, type ThemeMode } from "./tokens/themeFactory";
import { getTheme } from "./tokens/themeFactory";
import { readStoredThemeMode } from "./themeModePersistence";

export const startupThemeMode = readStoredThemeMode();
export const theme = getTheme(startupThemeMode);
export const { colors, radius, spacing, size, typography, motion } = theme;
export { shadow } from "./tokens/shadow";
