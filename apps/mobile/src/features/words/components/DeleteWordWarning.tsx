import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteWordWarning({ onCancel, onConfirm }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.warning}>
      <View style={styles.copy}>
        <Text style={[styles.title, { textAlign }]}>{t("words.deleteTitle")}</Text>
        <Text style={[styles.text, { textAlign }]}>{t("words.deleteCopy")}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.cancelButton} onPress={onCancel} accessibilityRole="button">
          <Text style={styles.cancelText}>{t("common.cancel")}</Text>
        </Pressable>
        <Pressable style={styles.confirmButton} onPress={onConfirm} accessibilityRole="button">
          <Text style={styles.confirmText}>{t("common.delete")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  warning: { gap: spacing.md, borderRadius: radius.sm, backgroundColor: colors.dangerSoft, padding: spacing.lg },
  copy: { gap: spacing.xxs },
  title: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.smd },
  cancelButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.surface, paddingHorizontal: spacing.lg },
  cancelText: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  confirmButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.danger, paddingHorizontal: spacing.lg },
  confirmText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
