import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";
import type { EditCardFieldKey } from "./editCardFormTypes";

type Props = {
  fieldKey: EditCardFieldKey;
  label: string;
  rtl?: boolean;
  value: string;
  onChange: (key: EditCardFieldKey, value: string) => void;
};

export function EditCardInput({ fieldKey, label, rtl, value, onChange }: Props) {
  return (
    <TextInput
      style={[styles.input, rtl && styles.rtl]}
      value={value}
      onChangeText={(nextValue) => onChange(fieldKey, nextValue)}
      placeholder={label}
      placeholderTextColor={colors.textMuted}
    />
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  rtl: { writingDirection: "rtl", textAlign: "right" }
});
