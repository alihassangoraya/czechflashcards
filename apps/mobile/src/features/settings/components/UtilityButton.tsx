import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  detail: string;
  onPress: () => void;
};

export function UtilityButton({ icon, title, detail, onPress }: Props) {
  return (
    <Pressable style={styles.utilityButton} onPress={onPress} accessibilityRole="button">
      <View style={styles.utilityIcon}>
        <MaterialIcons name={icon} size={size.iconSmall} color={colors.primaryDeep} />
      </View>
      <View style={styles.utilityCopy}>
        <Text style={styles.utilityTitle}>{title}</Text>
        <Text style={styles.utilityDetail}>{detail}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  utilityButton: { width: "48%", minWidth: 132, flexGrow: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  utilityIcon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  utilityCopy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  utilityTitle: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  utilityDetail: { color: colors.textMuted, fontSize: typography.caption, lineHeight: typography.bodySmall }
});
