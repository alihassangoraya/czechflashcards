import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = { icon: MaterialIconName; label: string; value: number; tone: string };

export function ProgressQueueTile({ icon, label, value, tone }: Props) {
  return (
    <View style={styles.tile}>
      <View style={[styles.icon, { backgroundColor: tone }]}><MaterialIcons name={icon} size={size.iconSmall} color={colors.iconOnSoft} /></View>
      <View style={styles.copy}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { width: "48%", minWidth: size.progressMetricMinWidth, flexGrow: 1, minHeight: size.reviewButton + size.cardAction, flexDirection: "row", alignItems: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.md },
  icon: { width: size.cardAction, height: size.cardAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  copy: { flex: 1, minWidth: 0 },
  value: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightSemibold },
  label: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" }
});
