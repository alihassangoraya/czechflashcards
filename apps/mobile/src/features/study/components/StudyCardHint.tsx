import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, typography } from "../../../theme/design";

type Props = {
  children: string;
  textAlign: "auto" | "left" | "right" | "center" | "justify";
};

export function StudyCardHint({ children, textAlign }: Props) {
  return <Text style={[styles.hint, { textAlign }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  hint: {
    color: colors.textMuted,
    fontSize: typography.cardHint,
    marginTop: typography.bodyLarge,
    textAlign: "center",
    fontWeight: typography.weightRegular
  }
});
