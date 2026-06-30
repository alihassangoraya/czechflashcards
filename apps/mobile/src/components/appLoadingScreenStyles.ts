import { StyleSheet } from "react-native";
import { colors, typography } from "../theme/design";

export const appLoadingScreenStyles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  muted: { color: colors.textMuted, lineHeight: typography.compactLine }
});
