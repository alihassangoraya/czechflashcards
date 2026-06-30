import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  customReminderTime: string;
  onChange: (value: string) => void;
  onCommit: () => void;
};

export function CustomReminderTimeInput({ customReminderTime, onChange, onCommit }: Props) {
  const { t, textAlign, direction } = useI18n();

  return (
    <View style={styles.customRow}>
      <MaterialIcons name="schedule" size={size.iconSmall} color={colors.textMuted} />
      <TextInput
        style={[styles.input, { textAlign, writingDirection: direction }]}
        value={customReminderTime}
        onChangeText={onChange}
        onBlur={onCommit}
        onSubmitEditing={onCommit}
        placeholder="HH:mm"
        placeholderTextColor={colors.textMuted}
        keyboardType="numbers-and-punctuation"
        maxLength={5}
        returnKeyType="done"
        accessibilityLabel={t("settings.customReminderTime")}
      />
      <Text style={[styles.hint, { textAlign }]}>{t("settings.timeHint")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  customRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg },
  input: { minWidth: size.timeInputMinWidth, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold, paddingVertical: spacing.smd },
  hint: { flex: 1, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
