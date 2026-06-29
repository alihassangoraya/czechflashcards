import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
  multiline?: boolean;
  rtl?: boolean;
};

export function FormField({ label, value, onChangeText, placeholder, autoFocus = false, multiline = false, rtl = false }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={[styles.input, multiline && styles.textarea, rtl && styles.rtl]} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textMuted} autoFocus={autoFocus} autoCapitalize={rtl ? "none" : "sentences"} multiline={multiline} textAlignVertical={multiline ? "top" : "center"} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.smd },
  fieldLabel: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  input: { minHeight: size.reviewButton, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, color: colors.textStrong, fontSize: typography.body, paddingHorizontal: spacing.xl },
  textarea: { minHeight: size.cardHeight / 5, paddingTop: spacing.xl, paddingBottom: spacing.xl },
  rtl: { writingDirection: "rtl", textAlign: "right" }
});
