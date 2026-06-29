import React from "react";
import { StyleSheet, View } from "react-native";
import type { ReviewGrade } from "@czech-flashcards/shared";
import { colors } from "../../../theme/design";
import { ReviewButton } from "./ReviewButton";

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

const styles = StyleSheet.create({
  reviewRow: { flexDirection: "row", gap: 6 },
  reviewAgain: { backgroundColor: colors.danger },
  reviewHard: { backgroundColor: colors.warning },
  reviewGood: { backgroundColor: colors.primary },
  reviewEasy: { backgroundColor: colors.success }
});
