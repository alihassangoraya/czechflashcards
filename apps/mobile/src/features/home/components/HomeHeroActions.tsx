import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  reviewLabel: string;
  quizLabel: string;
  quizAccessibilityLabel: string;
  onStartStudy: () => void;
  onStartQuiz: () => void;
};

export function HomeHeroActions({ reviewLabel, quizLabel, quizAccessibilityLabel, onStartStudy, onStartQuiz }: Props) {
  return (
    <View style={styles.actions}>
      <Pressable style={styles.reviewAction} onPress={onStartStudy} accessibilityRole="button" accessibilityLabel={reviewLabel}>
        <MaterialIcons name="play-arrow" size={size.icon} color={colors.charcoalText} />
        <Text style={styles.reviewText}>{reviewLabel}</Text>
      </Pressable>
      <Pressable style={styles.quizAction} onPress={onStartQuiz} accessibilityRole="button" accessibilityLabel={quizAccessibilityLabel}>
        <MaterialIcons name="psychology" size={size.iconSmall} color={colors.onPrimary} />
        <Text style={styles.quizText}>{quizLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: "row", gap: spacing.lg },
  reviewAction: { flex: 1, minHeight: size.actionMinHeight, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.md, borderRadius: radius.lg, backgroundColor: colors.surface, paddingHorizontal: spacing.lgPlus },
  reviewText: { color: colors.text, fontSize: typography.body, fontWeight: typography.weightSemibold },
  quizAction: { minWidth: size.quizOptionHeight, minHeight: size.actionMinHeight, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.heroOutline, backgroundColor: colors.heroControl, paddingHorizontal: spacing.lgPlus },
  quizText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
