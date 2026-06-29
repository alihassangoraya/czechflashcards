import { themes } from "./themeFactory";

const { colors, spacing } = themes.light;

export const shadow = {
  soft: {
    shadowColor: colors.text,
    shadowOffset: { width: spacing.none, height: spacing.lg },
    shadowOpacity: 0.08,
    shadowRadius: spacing.xxl,
    elevation: spacing.xxs
  }
};
