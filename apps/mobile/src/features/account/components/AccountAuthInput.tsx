import React from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = TextInputProps & {
  value: string;
  onChangeText: (value: string) => void;
};

export function AccountAuthInput(props: Props) {
  return <TextInput {...props} style={styles.input} placeholderTextColor={colors.textMuted} />;
}

const styles = StyleSheet.create({
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge }
});
