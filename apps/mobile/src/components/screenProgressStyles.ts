import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../theme/design";

export const screenProgressStyles = StyleSheet.create({
  section: { gap: spacing.smd },
  centered: { width: "100%", maxWidth: size.studyProgressMaxWidth, alignSelf: "center", marginTop: spacing.xs, marginBottom: spacing.xl },
  labels: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.lg },
  centeredLabels: { justifyContent: "center" },
  title: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  meta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  centeredText: { color: colors.textSubtle, textAlign: "center" },
  track: { height: spacing.md, overflow: "hidden", borderRadius: radius.xs, backgroundColor: colors.progressTrackStrong },
  fill: { height: "100%", borderRadius: radius.xs, backgroundColor: colors.primary }
});
