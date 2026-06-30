import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

export const accountProgressStyles = StyleSheet.create({
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  sectionTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  sectionMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  progressTrack: { height: spacing.lg, overflow: "hidden", borderRadius: spacing.sm, backgroundColor: colors.progressTrack },
  progressFill: { height: "100%", borderRadius: spacing.sm, backgroundColor: colors.success },
  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md }
});
