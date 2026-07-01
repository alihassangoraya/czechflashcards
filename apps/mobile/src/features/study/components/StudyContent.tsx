import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme/design";
import { StudyContentCard } from "./StudyContentCard";
import { StudyRevealedContent } from "./StudyRevealedContent";
import type { StudyContentProps } from "../types/studyScreenTypes";

export function StudyContent({
  reviewInterval,
  onGrade,
  ...cardProps
}: StudyContentProps) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} directionalLockEnabled>
      <StudyContentCard {...cardProps} />

      <StudyRevealedContent current={cardProps.current} grading={cardProps.grading} revealed={cardProps.revealed} reviewInterval={reviewInterval} onGrade={onGrade} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, gap: spacing.xlPlus, backgroundColor: colors.background, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
