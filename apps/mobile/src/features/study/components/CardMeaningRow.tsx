import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { StudySettings } from "../../../database";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  english: string;
  meaningLanguage: StudySettings["meaningLanguage"];
  secondaryMeaning: string;
};

export function CardMeaningRow({ english, meaningLanguage, secondaryMeaning }: Props) {
  return (
    <View style={styles.meaningRow}>
      <Text style={styles.meaning}>{english}</Text>
      {Boolean(secondaryMeaning) && (
        <Text style={[styles.meaning, meaningLanguage === "ur" && styles.rtl]}>
          {secondaryMeaning}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  meaningRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.xl },
  meaning: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontSize: typography.cardBody,
    lineHeight: typography.cardBodyLine,
    color: colors.textBody,
    fontWeight: typography.weightMedium
  },
  rtl: { writingDirection: "rtl", textAlign: "right" }
});
