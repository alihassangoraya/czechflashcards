import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../../../theme/design";
import { ResultMetric } from "./ResultMetric";

type Props = {
  accuracy: number;
  labels: {
    accuracy: string;
    correct: string;
    missed: string;
  };
  missed: number;
  score: number;
};

export function QuizResultMetrics({ accuracy, labels, missed, score }: Props) {
  return (
    <View style={styles.resultMetrics}>
      <ResultMetric icon="check-circle" value={`${score}`} label={labels.correct} color={colors.iconSuccess} />
      <ResultMetric icon="cancel" value={`${missed}`} label={labels.missed} color={colors.iconDanger} />
      <ResultMetric icon="bolt" value={`${accuracy}%`} label={labels.accuracy} color={colors.iconAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  resultMetrics: { flexDirection: "row", borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl }
});
