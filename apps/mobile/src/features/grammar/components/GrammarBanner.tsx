import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  meta: string;
  word: string;
};

export function GrammarBanner({ meta, word }: Props) {
  return (
    <View style={styles.banner}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.meta}>{meta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.actionSoft, padding: spacing.xlPlus },
  word: { color: colors.primaryDeep, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  meta: { color: colors.actionMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular }
});
