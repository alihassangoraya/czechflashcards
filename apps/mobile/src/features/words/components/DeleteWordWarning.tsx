import React from "react";
import { Pressable, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { deleteWordWarningStyles as styles } from "./deleteWordWarningStyles";
import type { DeleteWordWarningProps } from "./deleteWordWarningTypes";

export function DeleteWordWarning({ onCancel, onConfirm }: DeleteWordWarningProps) {
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
