import React, { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "./MaterialIcons";
import { colors, size, spacing, typography } from "../theme/design";

type Props = {
  title: string;
  backLabel: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  trailing?: ReactNode;
  onBack: () => void;
};

export function ScreenHeader({ title, backLabel, textAlign, trailing, onBack }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Pressable style={styles.backIcon} onPress={onBack} accessibilityRole="button" accessibilityLabel={backLabel}>
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <Text style={[styles.title, { textAlign }]}>{title}</Text>
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: typography.bodyLarge },
  titleRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  title: { flex: 1, color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  trailing: { flexDirection: "row", gap: spacing.lg },
  backIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" }
});
