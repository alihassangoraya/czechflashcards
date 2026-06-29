import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  detail: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export function TogglePreference({ icon, title, detail, value, onChange }: Props) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleIcon}><MaterialIcons name={icon} size={size.iconSmall} color={colors.actionMuted} /></View>
      <View style={styles.toggleCopy}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleDetail}>{detail}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: colors.borderMuted, true: colors.primary }} thumbColor={colors.surface} />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  toggleIcon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.actionSoft },
  toggleCopy: { flex: 1, gap: spacing.xxs },
  toggleTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  toggleDetail: { color: colors.textMuted, fontSize: typography.caption, lineHeight: typography.bodySmall + spacing.xs }
});
