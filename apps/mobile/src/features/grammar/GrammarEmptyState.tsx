import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../theme/design";

export function GrammarEmptyState() {
  return <Text style={styles.muted}>Choose a card to see its grammar notes.</Text>;
}

const styles = StyleSheet.create({
  muted: { color: colors.textMuted, lineHeight: 20 }
});
