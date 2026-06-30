import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { quizExitConfirmModalStyles as styles } from "./quizExitConfirmModalStyles";
import type { QuizExitConfirmModalProps } from "./quizExitConfirmModalTypes";

export function QuizExitConfirmModal({ visible, onCancel, onConfirm }: QuizExitConfirmModalProps) {
  const { t, textAlign } = useI18n();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.exitOverlay}>
        <View style={styles.exitDialog}>
          <Text style={[styles.exitTitle, { textAlign }]}>{t("quiz.leaveTitle")}</Text>
          <Text style={[styles.exitCopy, { textAlign }]}>{t("quiz.leaveCopy")}</Text>
          <View style={styles.exitActions}>
            <Pressable style={styles.exitSecondary} onPress={onCancel} accessibilityRole="button">
              <Text style={styles.exitSecondaryText}>{t("quiz.stay")}</Text>
            </Pressable>
            <Pressable style={styles.exitPrimary} onPress={onConfirm} accessibilityRole="button">
              <Text style={styles.exitPrimaryText}>{t("quiz.leave")}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
