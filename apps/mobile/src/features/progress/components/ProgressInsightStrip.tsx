import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { ProgressInsight } from "../types/progressTypes";

type Props = { insights: ProgressInsight[] };

export function ProgressInsightStrip({ insights }: Props) {
  const { t } = useI18n();
  return (
    <View style={styles.wrap}>
      {insights.map((item) => (
        <View key={item.labelKey} style={styles.item}>
          <View style={styles.icon}><MaterialIcons name={item.icon} size={size.iconSmall} color={colors.iconPrimary} /></View>
          <View style={styles.copy}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.label}>{t(item.labelKey)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg },
  item: { flex: 1, minWidth: size.progressMetricMinWidth, minHeight: size.reviewButton + spacing.xl, flexDirection: "row", alignItems: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.md },
  icon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.actionSoft },
  copy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  value: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  label: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" }
});
