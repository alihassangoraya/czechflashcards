import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { HeaderIcon } from "../../../components/HeaderIcon";
import { colors, size, spacing, typography } from "../../../theme/design";

type Props = {
  onBack: () => void;
  onOpenGrammar: () => void;
};

export function StudyHeader({ onBack, onOpenGrammar }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <Pressable style={styles.backIcon} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back home">
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <Text style={styles.title}>Czech Flashcards</Text>
      </View>
      <View style={styles.headerActions}>
        <HeaderIcon icon="school" label="Open grammar guide" onPress={onOpenGrammar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: typography.bodyLarge },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  title: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  headerActions: { flexDirection: "row", gap: spacing.lg },
  backIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" }
});
