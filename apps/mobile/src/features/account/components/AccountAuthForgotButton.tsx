import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";

type Props = { onPress?: () => void };

export function AccountAuthForgotButton({ onPress }: Props) {
  const { t } = useI18n();
  if (!onPress) return null;
  return (
    <Pressable style={styles.button} onPress={onPress} accessibilityRole="button">
      <Text style={styles.text}>{t("account.forgotPassword")}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", paddingVertical: spacing.sm },
  text: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
