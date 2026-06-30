import React from "react";
import { Text, TextInput, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { customReminderTimeInputStyles as styles } from "./customReminderTimeInputStyles";
import type { CustomReminderTimeInputProps } from "./customReminderTimeInputTypes";

export function CustomReminderTimeInput({ customReminderTime, onChange, onCommit }: CustomReminderTimeInputProps) {
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
