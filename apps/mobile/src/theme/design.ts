export { getTheme, themes, type AppTheme, type ThemeMode } from "./tokens/themeFactory";
import { themes } from "./tokens/themeFactory";

// Components use the light theme today; a provider can switch this source when dark mode is enabled.
export const theme = themes.light;
export const { colors, radius, spacing, size, typography, motion } = theme;
export { shadow } from "./tokens/shadow";
