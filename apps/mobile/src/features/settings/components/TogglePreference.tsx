import { StyleSheet, Switch, Text, View, type TextStyle, type ViewStyle } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
type Props = {
  icon: MaterialIconName;
  title: string;
  detail: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export function TogglePreference({ icon, title, detail, value, disabled = false, onChange }: Props) {
  const { direction, textAlign } = useI18n();
  const rtl = direction === "rtl";
  const fixedOrder = { direction: "ltr" } as ViewStyle;
  const textDirection = { textAlign, writingDirection: direction } as TextStyle;
  const iconSlot = <View style={styles.toggleIcon}><MaterialIcons name={icon} size={size.iconSmall} color={colors.iconMuted} /></View>;
  const switchSlot = <Switch disabled={disabled} value={value} onValueChange={onChange} style={fixedOrder} trackColor={{ false: colors.borderMuted, true: colors.primary }} thumbColor={colors.surface} />;
  const copySlot = <View style={styles.toggleCopy}><Text style={[styles.toggleTitle, textDirection]}>{title}</Text><Text style={[styles.toggleDetail, textDirection]}>{detail}</Text></View>;

  return (
    <View style={[styles.toggleRow, fixedOrder, disabled && styles.disabled]}>
      {rtl ? switchSlot : iconSlot}
      {copySlot}
      {rtl ? iconSlot : switchSlot}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  toggleIcon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.actionSoft },
  toggleCopy: { flex: 1, gap: spacing.xxs },
  toggleTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  toggleDetail: { color: colors.textMuted, fontSize: typography.caption, lineHeight: typography.bodySmall + spacing.xs },
  disabled: { opacity: 0.58 }
});
