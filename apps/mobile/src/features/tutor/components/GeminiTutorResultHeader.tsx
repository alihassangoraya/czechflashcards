import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  closeLabel: string;
  eyebrow: string;
  title: string;
  onClose: () => void;
};

export function GeminiTutorResultHeader({ closeLabel, eyebrow, title, onClose }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable style={styles.close} onPress={onClose} accessibilityRole="button" accessibilityLabel={closeLabel}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.xl },
  eyebrow: { color: colors.warning, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  title: { color: colors.text, fontSize: typography.titleSmall, fontWeight: typography.weightBold, marginTop: spacing.xxs },
  close: { width: size.closeAction, height: size.closeAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.borderSoft },
  closeText: { color: colors.text, fontSize: typography.closeIcon, lineHeight: typography.closeIconLine, fontWeight: typography.weightBold }
});
