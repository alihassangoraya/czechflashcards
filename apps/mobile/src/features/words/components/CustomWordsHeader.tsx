import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function CustomWordsHeader({ count }: { count: number }) {
  return (
    <View style={styles.header}>
      <View style={styles.copy}>
        <Text style={styles.title}>Your added words</Text>
        <Text style={styles.subtitle}>Edit details or remove words you added yourself.</Text>
      </View>
      <View style={styles.countPill}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  subtitle: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  countPill: { minWidth: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.primarySoft, paddingHorizontal: spacing.smd },
  count: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
