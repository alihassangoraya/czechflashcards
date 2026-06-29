import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type SwipeDirection = "again" | "known";

export function StudySwipeActions({ grading, onCompleteSwipe }: { grading: boolean; onCompleteSwipe: (direction: SwipeDirection) => void }) {
  return (
    <View style={styles.actions}>
      <Pressable
        disabled={grading}
        style={[styles.button, styles.again, grading && styles.disabled]}
        onPress={(event) => { event.stopPropagation(); onCompleteSwipe("again"); }}
        accessibilityRole="button"
        accessibilityLabel="Mark again"
      >
        <MaterialIcons name="arrow-back" size={size.icon} color={colors.danger} />
        <Text style={[styles.text, styles.againText]}>Again</Text>
      </Pressable>
      <Pressable
        disabled={grading}
        style={[styles.button, styles.known, grading && styles.disabled]}
        onPress={(event) => { event.stopPropagation(); onCompleteSwipe("known"); }}
        accessibilityRole="button"
        accessibilityLabel="Mark known"
      >
        <Text style={[styles.text, styles.knownText]}>Known</Text>
        <MaterialIcons name="arrow-forward" size={size.icon} color={colors.success} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: "row", justifyContent: "space-between", gap: spacing.lg, marginTop: spacing.xlPlus },
  button: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, borderWidth: spacing.hairline, paddingHorizontal: spacing.md },
  again: { borderColor: colors.dangerSoft, backgroundColor: colors.dangerSoft },
  known: { borderColor: colors.mintSoft, backgroundColor: colors.mintSoft },
  text: { fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  againText: { color: colors.danger },
  knownText: { color: colors.success },
  disabled: { opacity: 0.45 }
});
