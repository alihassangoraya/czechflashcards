import React from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useI18n } from "../i18n/I18nProvider";
import { appModalStyles as styles } from "./appModalStyles";
import type { AppModalProps } from "./appModalTypes";

export function AppModal({ visible, title, onClose, children }: AppModalProps) {
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
