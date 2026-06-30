import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import pragueHero from "../../../../assets/images/prague_hero_banner.jpg";
import { HomeHeroActions } from "./HomeHeroActions";
import { HeroIcon } from "./HeroIcon";

type Props = {
  activeDeckLabel: string;
  examLevel: string;
  dueCount: number;
  accountEmail: string | null;
  wide: boolean;
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onSearch: () => void;
  onAdd: () => void;
  onSettings: () => void;
  onAccount: () => void;
};

export function HomeHero({ activeDeckLabel, examLevel, dueCount, accountEmail, wide, onStartStudy, onStartQuiz, onSearch, onAdd, onSettings, onAccount }: Props) {
  const { t, textAlign } = useI18n();
  const reviewLabel = dueCount > 0 ? t("common.reviewDue", { count: dueCount }) : t("common.startReview");
  const quizLabel = t("common.quiz");
  const quizAccessibilityLabel = t("home.startQuiz");

  return (
    <ImageBackground source={pragueHero as never} style={[styles.hero, wide && styles.heroWide]} imageStyle={styles.heroImage} resizeMode="cover">
      <View style={styles.heroOverlay} />
      <View style={styles.heroTop}>
        <Text style={styles.levelPill}>{examLevel.toUpperCase()} · {activeDeckLabel}</Text>
        <View style={styles.heroIconGroup}>
          <HeroIcon icon="search" label={t("common.searchWords")} onPress={onSearch} />
          <HeroIcon icon="add" label={t("common.addWord")} onPress={onAdd} />
          <HeroIcon icon={accountEmail ? "account-circle" : "person-outline"} label={accountEmail ? t("common.account") : t("common.guestAccount")} onPress={onAccount} />
          <HeroIcon icon="settings" label={t("common.openSettings")} onPress={onSettings} />
        </View>
      </View>
      <View style={styles.heroCopy}>
        <Text style={[styles.heroEyebrow, { textAlign }]}>{t("home.continueLearning")}</Text>
        <Text style={[styles.heroTitle, { textAlign }]}>{t("home.greeting")}</Text>
        <Text style={[styles.heroSubtitle, { textAlign }]}>{dueCount > 0 ? t("home.cardsReady", { count: dueCount }) : t("home.keepFresh")}</Text>
      </View>
      <HomeHeroActions reviewLabel={reviewLabel} quizLabel={quizLabel} quizAccessibilityLabel={quizAccessibilityLabel} onStartStudy={onStartStudy} onStartQuiz={onStartQuiz} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: { width: "100%", height: size.heroHeight, overflow: "hidden", backgroundColor: colors.primaryDeep, padding: spacing.page, justifyContent: "space-between" },
  heroWide: { height: size.heroWideHeight },
  heroImage: { resizeMode: "cover" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.heroOverlay },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  levelPill: { overflow: "hidden", borderRadius: radius.md, backgroundColor: colors.heroPill, color: colors.heroText, paddingHorizontal: spacing.md, paddingVertical: spacing.xxs, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  heroIconGroup: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  heroCopy: { gap: spacing.xxs },
  heroEyebrow: { color: colors.heroTextMuted, fontSize: typography.label, fontWeight: typography.weightMedium },
  heroTitle: { color: colors.heroText, fontSize: typography.display, lineHeight: typography.heroLine, fontWeight: typography.weightBold },
  heroSubtitle: { color: colors.heroTextSecondary, fontSize: typography.body, fontWeight: typography.weightRegular }
});
