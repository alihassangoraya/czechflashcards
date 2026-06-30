import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  dueCount: number;
};

export function HomeHeroCopy({ dueCount }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.heroCopy}>
      <Text style={[styles.heroEyebrow, { textAlign }]}>{t("home.continueLearning")}</Text>
      <Text style={[styles.heroTitle, { textAlign }]}>{t("home.greeting")}</Text>
      <Text style={[styles.heroSubtitle, { textAlign }]}>{dueCount > 0 ? t("home.cardsReady", { count: dueCount }) : t("home.keepFresh")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCopy: { gap: spacing.xxs },
  heroEyebrow: { color: colors.heroTextMuted, fontSize: typography.label, fontWeight: typography.weightMedium },
  heroTitle: { color: colors.heroText, fontSize: typography.display, lineHeight: typography.heroLine, fontWeight: typography.weightBold },
  heroSubtitle: { color: colors.heroTextSecondary, fontSize: typography.body, fontWeight: typography.weightRegular }
});
