import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { explainCzechCard, type GeminiTutorResult } from "../../../services/geminiTutor";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";

type Props = {
  card: Card | null;
};

export function GeminiTutorPanel({ card }: Props) {
  const { t } = useI18n();
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
      <Pressable style={styles.button} onPress={openTutor} accessibilityRole="button" accessibilityLabel={t("tutor.ask", { word: card.cz })}>
        <MaterialIcons name="auto-awesome" size={size.iconSmall} color={colors.bohemianGold} />
        <Text style={styles.buttonText}>{t("tutor.button")}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>{t("tutor.eyebrow")}</Text>
          <Text style={styles.title}>{t("tutor.title", { word: card.cz })}</Text>
        </View>
        <Pressable style={styles.close} onPress={() => setOpenForId(null)} accessibilityRole="button" accessibilityLabel={t("tutor.close")}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.bohemianGold} />
          <Text style={styles.muted}>{t("tutor.loading")}</Text>
        </View>
      ) : (
        <View style={styles.copy}>
          <Text style={styles.section}>{t("tutor.lesson")}</Text>
          <Text style={styles.body}>{result?.lesson}</Text>
          <Text style={styles.section}>{t("tutor.pronunciation")}</Text>
          <Text style={styles.body}>{result?.phonetics}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.mdPlus, minHeight: size.actionMinHeight, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.warningBorder, backgroundColor: colors.surface, paddingHorizontal: spacing.xlPlus },
  buttonText: { color: colors.warning, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
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
