import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  score: number;
  onBack: () => void;
};

export function QuizHeader({ score, onBack }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.topBar}>
      <View style={styles.headerLeft}>
        <Pressable style={styles.backButton} onPress={onBack} accessibilityRole="button" accessibilityLabel={t("common.backHome")}>
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={[styles.topTitle, { textAlign }]}>{t("quiz.title")}</Text>
        </View>
      </View>
      <View style={styles.scoreChip} accessibilityLabel={t("quiz.correctAnswers", { count: score })}>
        <MaterialIcons name="check-circle" size={size.iconSmall} color={colors.success} />
        <Text style={styles.scoreChipText}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { minHeight: size.headerAction, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  backButton: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1, alignItems: "flex-start" },
  topTitle: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  scoreChip: { width: size.headerAction, height: size.headerAction, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.mintSoft },
  scoreChipText: { color: colors.success, fontSize: typography.body, fontWeight: typography.weightBold }
});
