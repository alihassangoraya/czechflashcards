import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { GeminiTutorResult } from "../../../services/gemini/tutorService";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  lessonLabel: string;
  pronunciationLabel: string;
  result: GeminiTutorResult | null;
};

export function GeminiTutorLessonCopy({ lessonLabel, pronunciationLabel, result }: Props) {
  return (
    <View style={styles.copy}>
      <Text style={styles.section}>{lessonLabel}</Text>
      <Text style={styles.body}>{result?.lesson}</Text>
      <Text style={styles.section}>{pronunciationLabel}</Text>
      <Text style={styles.body}>{result?.phonetics}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  copy: { gap: spacing.lg },
  section: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textTransform: "uppercase", marginTop: spacing.sm },
  body: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLine, fontWeight: typography.weightRegular }
});
