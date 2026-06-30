import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import * as Speech from "../../../services/speech";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  label: string;
  sentence: string;
};

export function ExampleSpeechButton({ label, sentence }: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={(event) => {
        event.stopPropagation();
        Speech.speak(sentence, { language: "cs-CZ", rate: 0.86 });
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
      <Text style={styles.example} numberOfLines={2}>{sentence}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.mdPlus, paddingVertical: spacing.smd },
  example: { flex: 1, fontSize: typography.cardBody, lineHeight: typography.cardBodyLine, color: colors.textExample }
});
