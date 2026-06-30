import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, typography } from "../../../theme/design";

type Props = {
  message: string;
};

export function AccountAuthMessage({ message }: Props) {
  if (!message) return null;
  return <Text style={styles.formError}>{message}</Text>;
}

const styles = StyleSheet.create({
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold }
});
