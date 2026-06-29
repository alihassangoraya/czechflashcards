import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  option: string;
  letter: string;
  selected: boolean;
  correct: boolean;
  checked: boolean;
  onPress: () => void;
};

export function QuizOption({ option, letter, selected, correct, checked, onPress }: Props) {
  const stateStyle = checked && correct ? styles.correctOption : checked && selected ? styles.wrongOption : selected ? styles.selectedOption : null;
  const letterStyle = checked && correct ? styles.correctLetter : checked && selected ? styles.wrongLetter : selected ? styles.selectedLetter : styles.optionLetter;
  const textStyle = checked && (correct || selected) ? styles.optionTextInverted : styles.optionText;
  return (
    <Pressable disabled={checked} style={[styles.option, stateStyle]} onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      <View style={styles.optionInner}>
        <Text style={letterStyle}>{letter}</Text>
        <Text style={textStyle}>{option}</Text>
      </View>
      {checked && correct && <MaterialIcons name="check-circle" size={size.iconMedium} color={colors.onPrimary} />}
      {checked && selected && !correct && <MaterialIcons name="cancel" size={size.iconMedium} color={colors.onPrimary} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: { minHeight: size.quizOptionHeight, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  optionInner: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  optionLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.textMuted, backgroundColor: colors.surfaceMuted, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  selectedOption: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  selectedLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.onPrimary, backgroundColor: colors.primary, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  correctOption: { borderColor: colors.success, backgroundColor: colors.success },
  correctLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.success, backgroundColor: colors.surface, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  wrongOption: { borderColor: colors.danger, backgroundColor: colors.danger },
  wrongLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.danger, backgroundColor: colors.surface, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  optionText: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightMedium },
  optionTextInverted: { flex: 1, color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
