import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ReviewGrade } from "@czech-flashcards/shared";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  grading: boolean;
  reviewInterval: (grade: ReviewGrade) => string;
  onGrade: (grade: ReviewGrade) => void;
};

export function ReviewButtons({ grading, reviewInterval, onGrade }: Props) {
  return (
    <View style={styles.reviewRow}>
      <ReviewButton disabled={grading} style={styles.reviewAgain} label="Again" interval={reviewInterval("again")} onPress={() => onGrade("again")} />
      <ReviewButton disabled={grading} style={styles.reviewHard} label="Hard" interval={reviewInterval("hard")} onPress={() => onGrade("hard")} />
      <ReviewButton disabled={grading} style={styles.reviewGood} label="Good" interval={reviewInterval("good")} onPress={() => onGrade("good")} />
      <ReviewButton disabled={grading} style={styles.reviewEasy} label="Easy" interval={reviewInterval("easy")} onPress={() => onGrade("easy")} />
    </View>
  );
}

function ReviewButton({ disabled, style, label, interval, onPress }: { disabled: boolean; style: object; label: string; interval: string; onPress: () => void }) {
  return (
    <Pressable disabled={disabled} style={[styles.reviewButton, style, disabled && styles.disabledButton]} onPress={onPress}>
      <Text style={styles.reviewButtonText}>{label}</Text>
      <Text style={styles.reviewIntervalText}>{interval}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  reviewRow: { flexDirection: "row", gap: 6 },
  reviewButton: { flex: 1, minHeight: size.reviewButton, alignItems: "center", justifyContent: "center", gap: spacing.xxs, borderRadius: radius.xl, paddingHorizontal: spacing.sm },
  reviewAgain: { backgroundColor: colors.danger },
  reviewHard: { backgroundColor: colors.warning },
  reviewGood: { backgroundColor: colors.primary },
  reviewEasy: { backgroundColor: colors.success },
  reviewButtonText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightBold },
  reviewIntervalText: { color: colors.onPrimaryMuted, fontSize: typography.micro, fontWeight: typography.weightMedium },
  disabledButton: { opacity: 0.45 }
});
