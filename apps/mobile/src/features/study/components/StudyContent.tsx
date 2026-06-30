import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { spacing } from "../../../theme/design";
import { StudyContentCard } from "./StudyContentCard";
import { StudyRevealedContent } from "./StudyRevealedContent";
import type { StudyContentProps } from "../types/studyScreenTypes";

export function StudyContent({
  reviewInterval,
  onGrade,
  ...cardProps
}: StudyContentProps) {
  return (
    <ScrollView contentContainerStyle={styles.content} directionalLockEnabled>
      <StudyContentCard {...cardProps} />

      <StudyRevealedContent current={cardProps.current} grading={cardProps.grading} revealed={cardProps.revealed} reviewInterval={reviewInterval} onGrade={onGrade} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
