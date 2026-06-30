import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  score: number;
  onBack: () => void;
};

export function QuizHeader({ score, onBack }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <ScreenHeader
      title={t("quiz.title")}
      backLabel={t("common.backHome")}
      textAlign={textAlign}
      onBack={onBack}
      trailing={(
        <View style={styles.scoreChip} accessibilityLabel={t("quiz.correctAnswers", { count: score })}>
          <MaterialIcons name="check-circle" size={size.iconSmall} color={colors.success} />
          <Text style={styles.scoreChipText}>{score}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  scoreChip: { width: size.headerAction, height: size.headerAction, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.mintSoft },
  scoreChipText: { color: colors.success, fontSize: typography.body, fontWeight: typography.weightBold }
});
