import { StyleSheet, Text, View, type TextStyle, type ViewStyle } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: MaterialIconName;
  title: string;
  value: string;
};

export function PreferenceRow({ icon, title, value }: Props) {
  const { direction, textAlign } = useI18n();
  const rtl = direction === "rtl";
  const fixedOrder = { direction: "ltr" } as ViewStyle;
  const textDirection = { textAlign, writingDirection: direction } as TextStyle;
  const iconSlot = <MaterialIcons name={icon} size={size.iconSmall} color={colors.iconMuted} />;

  return (
    <View style={[styles.preferenceRow, fixedOrder]}>
      {rtl ? <Text style={styles.preferenceValue}>{value}</Text> : iconSlot}
      <Text style={[styles.preferenceTitle, textDirection]}>{title}</Text>
      {rtl ? iconSlot : <Text style={styles.preferenceValue}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  preferenceRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  preferenceTitle: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  preferenceValue: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
