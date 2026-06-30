import React from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../theme/design";

export function AppModal({ visible, title, onClose, children }: { visible: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  const { t, textAlign } = useI18n();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { textAlign }]}>{title}</Text>
            <Pressable style={styles.closeButton} onPress={onClose} accessibilityRole="button" accessibilityLabel={t("common.close", { title })}>
              <Text style={styles.closeButtonText}>x</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: colors.modalOverlay },
  modalSheet: { maxHeight: "90%", backgroundColor: colors.sheet, borderTopLeftRadius: radius.md, borderTopRightRadius: radius.md },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: spacing.panel, paddingBottom: spacing.xl, backgroundColor: colors.surface, borderBottomWidth: spacing.hairline, borderBottomColor: colors.border },
  modalTitle: { color: colors.textStrong, fontSize: size.icon, fontWeight: typography.weightBold },
  closeButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  closeButtonText: { color: colors.textStrong, fontSize: typography.display, lineHeight: typography.closeLine },
  modalContent: { gap: spacing.xlPlus, padding: spacing.page, paddingBottom: spacing.hero }
});
