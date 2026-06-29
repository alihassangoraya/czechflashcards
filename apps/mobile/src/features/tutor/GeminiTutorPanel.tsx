import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import { explainCzechCard, type GeminiTutorResult } from "../../services/geminiTutor";
import { colors, radius, shadow, spacing, typography } from "../../theme/design";

type Props = {
  card: Card | null;
};

export function GeminiTutorPanel({ card }: Props) {
  const [openForId, setOpenForId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiTutorResult | null>(null);

  async function openTutor() {
    if (!card || loading) return;
    setOpenForId(card.id);
    setResult(null);
    setLoading(true);
    try {
      setResult(await explainCzechCard(card));
    } finally {
      setLoading(false);
    }
  }

  if (!card) return null;

  const isOpen = openForId === card.id;

  if (!isOpen) {
    return (
      <Pressable style={styles.button} onPress={openTutor} accessibilityRole="button" accessibilityLabel={`Ask Gemini tutor about ${card.cz}`}>
        <MaterialIcons name="auto-awesome" size={17} color={colors.bohemianGold} />
        <Text style={styles.buttonText}>Need help? Gemini Tutor</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Gemini tutor</Text>
          <Text style={styles.title}>Czech lesson for {card.cz}</Text>
        </View>
        <Pressable style={styles.close} onPress={() => setOpenForId(null)} accessibilityRole="button" accessibilityLabel="Close Gemini tutor">
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.bohemianGold} />
          <Text style={styles.muted}>Preparing personalized notes...</Text>
        </View>
      ) : (
        <View style={styles.copy}>
          <Text style={styles.section}>Lesson</Text>
          <Text style={styles.body}>{result?.lesson}</Text>
          <Text style={styles.section}>Pronunciation</Text>
          <Text style={styles.body}>{result?.phonetics}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.mdPlus, minHeight: 40, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.warningBorder, backgroundColor: colors.surface, paddingHorizontal: spacing.xlPlus },
  buttonText: { color: colors.warning, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  panel: { gap: spacing.xl, borderRadius: radius.card, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surface, padding: spacing.xlPlus, ...shadow.soft },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.xl },
  eyebrow: { color: colors.warning, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  title: { color: colors.text, fontSize: typography.titleSmall, fontWeight: typography.weightBold, marginTop: spacing.xxs },
  close: { width: 34, height: 34, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.borderSoft },
  closeText: { color: colors.text, fontSize: 25, lineHeight: 27, fontWeight: typography.weightBold },
  loading: { alignItems: "center", gap: spacing.lgPlus, paddingVertical: spacing.panel },
  muted: { color: colors.muted, fontWeight: typography.weightRegular },
  copy: { gap: spacing.lg },
  section: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textTransform: "uppercase", marginTop: spacing.sm },
  body: { color: colors.textSoft, fontSize: typography.body, lineHeight: 21, fontWeight: typography.weightRegular }
});
