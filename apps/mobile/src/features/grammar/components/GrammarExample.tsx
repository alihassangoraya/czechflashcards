import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  text: string;
};

export function GrammarExample({ text }: Props) {
  return <Text style={styles.example}>{text}</Text>;
}

const styles = StyleSheet.create({
  example: { color: colors.primary, fontSize: typography.body, lineHeight: typography.bodyLarge + spacing.sm, fontStyle: "italic", fontWeight: typography.weightRegular }
});
