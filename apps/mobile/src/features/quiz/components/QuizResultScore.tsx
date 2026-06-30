import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../../../theme/design";

type Props = {
  accuracy: number;
  score: number;
  total: number;
};

export function QuizResultScore({ accuracy, score, total }: Props) {
  return (
    <View style={styles.scoreLine}>
      <Text style={[styles.resultScore, accuracy >= 50 ? styles.scorePositive : styles.scoreNeedsReview]}>{score}</Text>
      <Text style={styles.scoreTotal}>/ {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreLine: { flexDirection: "row", alignItems: "baseline", justifyContent: "center" },
  resultScore: { fontSize: typography.word, fontWeight: typography.weightBold },
  scorePositive: { color: colors.success },
  scoreNeedsReview: { color: colors.danger },
  scoreTotal: { color: colors.textMuted, fontSize: typography.title, fontWeight: typography.weightMedium }
});
