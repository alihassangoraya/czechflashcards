import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { QuizEmptyStateProps } from "./quizEmptyStateTypes";

export function QuizEmptyState({ onClose }: QuizEmptyStateProps) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <MaterialIcons name="quiz" size={size.iconLarge} color={colors.warning} />
      </View>
      <Text style={[styles.emptyTitle, { textAlign }]}>{t("quiz.needsMoreCards")}</Text>
      <Text style={[styles.emptyCopy, { textAlign }]}>{t("quiz.needsMoreCardsCopy")}</Text>
      <Pressable style={styles.secondaryButton} onPress={onClose} accessibilityRole="button">
        <MaterialIcons name="arrow-back" size={size.icon} color={colors.primaryDeep} />
        <Text style={styles.secondaryText}>{t("common.backHome")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.xl, paddingHorizontal: spacing.hero, backgroundColor: colors.background },
  emptyIcon: { width: size.quizResultIcon, height: size.quizResultIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.goldSoft },
  emptyTitle: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightBold, textAlign: "center" },
  emptyCopy: { color: colors.textSoft, fontSize: typography.bodyLarge, lineHeight: typography.titleSmall + spacing.xs, textAlign: "center" },
  secondaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.hero },
  secondaryText: { color: colors.primaryDeep, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
