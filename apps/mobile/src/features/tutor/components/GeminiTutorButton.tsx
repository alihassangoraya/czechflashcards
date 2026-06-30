import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
};

export function GeminiTutorButton({ label, accessibilityLabel, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      <MaterialIcons name="auto-awesome" size={size.iconSmall} color={colors.bohemianGold} />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.mdPlus, minHeight: size.actionMinHeight, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.warningBorder, backgroundColor: colors.surface, paddingHorizontal: spacing.xlPlus },
  text: { color: colors.warning, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
