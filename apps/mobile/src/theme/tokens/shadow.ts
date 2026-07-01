import { Platform, type ViewStyle } from "react-native";
import { themes } from "./themeFactory";

const { colors, spacing } = themes.light;
const softNativeShadow = {
  shadowColor: colors.text,
  shadowOffset: { width: spacing.none, height: spacing.lg },
  shadowOpacity: 0.08,
  shadowRadius: spacing.xxl,
  elevation: spacing.xxs
};
const softWebShadow = { boxShadow: `0 ${spacing.lg}px ${spacing.xxl}px rgba(45,42,38,0.08)` } as unknown as ViewStyle;

export const shadow = {
  soft: (Platform.OS === "web" ? softWebShadow : softNativeShadow) as ViewStyle
};
