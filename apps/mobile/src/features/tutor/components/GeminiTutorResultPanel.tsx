import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import type { GeminiTutorResult } from "../../../services/gemini/tutorService";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";

type Props = {
  loading: boolean;
  result: GeminiTutorResult | null;
  title: string;
  eyebrow: string;
  closeLabel: string;
  loadingLabel: string;
  lessonLabel: string;
  pronunciationLabel: string;
  onClose: () => void;
};

export function GeminiTutorResultPanel(props: Props) {
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>{props.eyebrow}</Text>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <Pressable style={styles.close} onPress={props.onClose} accessibilityRole="button" accessibilityLabel={props.closeLabel}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>

      {props.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.bohemianGold} />
          <Text style={styles.muted}>{props.loadingLabel}</Text>
        </View>
      ) : (
        <View style={styles.copy}>
          <Text style={styles.section}>{props.lessonLabel}</Text>
          <Text style={styles.body}>{props.result?.lesson}</Text>
          <Text style={styles.section}>{props.pronunciationLabel}</Text>
          <Text style={styles.body}>{props.result?.phonetics}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.xl, borderRadius: radius.card, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surface, padding: spacing.xlPlus, ...shadow.soft },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.xl },
  eyebrow: { color: colors.warning, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  title: { color: colors.text, fontSize: typography.titleSmall, fontWeight: typography.weightBold, marginTop: spacing.xxs },
  close: { width: size.closeAction, height: size.closeAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.borderSoft },
  closeText: { color: colors.text, fontSize: typography.closeIcon, lineHeight: typography.closeIconLine, fontWeight: typography.weightBold },
  loading: { alignItems: "center", gap: spacing.lgPlus, paddingVertical: spacing.panel },
  muted: { color: colors.muted, fontWeight: typography.weightRegular },
  copy: { gap: spacing.lg },
  section: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textTransform: "uppercase", marginTop: spacing.sm },
  body: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLine, fontWeight: typography.weightRegular }
});
