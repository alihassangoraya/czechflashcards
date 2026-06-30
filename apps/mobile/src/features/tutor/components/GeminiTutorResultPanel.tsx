import React from "react";
import { StyleSheet, View } from "react-native";
import type { GeminiTutorResult } from "../../../services/gemini/tutorService";
import { colors, radius, shadow, spacing } from "../../../theme/design";
import { GeminiTutorLessonCopy } from "./GeminiTutorLessonCopy";
import { GeminiTutorLoadingState } from "./GeminiTutorLoadingState";
import { GeminiTutorResultHeader } from "./GeminiTutorResultHeader";

type Props = {
  loading: boolean;
  result: GeminiTutorResult | null;
  title: string;
  eyebrow: string;
  closeLabel: string;
  loadingLabel: string;
  lessonLabel: string;
  pronunciationLabel: string;
  onClose: () => void;
};

export function GeminiTutorResultPanel(props: Props) {
  return (
    <View style={styles.panel}>
      <GeminiTutorResultHeader closeLabel={props.closeLabel} eyebrow={props.eyebrow} title={props.title} onClose={props.onClose} />
      {props.loading ? (
        <GeminiTutorLoadingState label={props.loadingLabel} />
      ) : (
        <GeminiTutorLessonCopy lessonLabel={props.lessonLabel} pronunciationLabel={props.pronunciationLabel} result={props.result} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.xl, borderRadius: radius.card, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surface, padding: spacing.xlPlus, ...shadow.soft }
});
