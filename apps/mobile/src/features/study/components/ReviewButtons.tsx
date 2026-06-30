import React from "react";
import { StyleSheet, View } from "react-native";
import type { ReviewGrade } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors } from "../../../theme/design";
import { ReviewButton } from "./ReviewButton";

type Props = {
  grading: boolean;
  reviewInterval: (grade: ReviewGrade) => string;
  onGrade: (grade: ReviewGrade) => void;
};

export function ReviewButtons({ grading, reviewInterval, onGrade }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.reviewRow}>
      <ReviewButton disabled={grading} style={styles.reviewAgain} label={t("review.again")} interval={reviewInterval("again")} onPress={() => onGrade("again")} />
      <ReviewButton disabled={grading} style={styles.reviewHard} label={t("review.hard")} interval={reviewInterval("hard")} onPress={() => onGrade("hard")} />
      <ReviewButton disabled={grading} style={styles.reviewGood} label={t("review.good")} interval={reviewInterval("good")} onPress={() => onGrade("good")} />
      <ReviewButton disabled={grading} style={styles.reviewEasy} label={t("review.easy")} interval={reviewInterval("easy")} onPress={() => onGrade("easy")} />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewRow: { flexDirection: "row", gap: 6 },
  reviewAgain: { backgroundColor: colors.danger },
  reviewHard: { backgroundColor: colors.warning },
  reviewGood: { backgroundColor: colors.primary },
  reviewEasy: { backgroundColor: colors.success }
});
