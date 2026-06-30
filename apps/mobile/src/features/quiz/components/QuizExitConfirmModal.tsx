import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function QuizExitConfirmModal({ visible, onCancel, onConfirm }: Props) {
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

const styles = StyleSheet.create({
  exitOverlay: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.modalOverlay, padding: spacing.page },
  exitDialog: { width: "100%", maxWidth: size.modalMaxWidth, gap: spacing.xlPlus, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  exitTitle: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold, textAlign: "center" },
  exitCopy: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, lineHeight: typography.screenTitle, textAlign: "center" },
  exitActions: { flexDirection: "row", gap: spacing.lg },
  exitSecondary: { flex: 1, minHeight: size.touchTarget, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  exitPrimary: { flex: 1, minHeight: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.danger },
  exitSecondaryText: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  exitPrimaryText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
