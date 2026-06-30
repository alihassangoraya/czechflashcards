import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size, spacing } from "../../../theme/design";
import pragueHero from "../../../../assets/images/prague_hero_banner.jpg";
import { HomeHeroActions } from "./HomeHeroActions";
import { HomeHeroCopy } from "./HomeHeroCopy";
import { HomeHeroTop } from "./HomeHeroTop";
import type { HomeHeroProps } from "./homeHeroTypes";

export function HomeHero({ activeDeckLabel, examLevel, dueCount, accountEmail, wide, onStartStudy, onStartQuiz, onOpenProgress, onSearch, onAdd, onSettings, onAccount }: HomeHeroProps) {
  const { t } = useI18n();
  const reviewLabel = dueCount > 0 ? t("common.reviewDue", { count: dueCount }) : t("common.startReview");
  const quizLabel = t("common.quiz");
  const quizAccessibilityLabel = t("home.startQuiz");

  return (
    <ImageBackground source={pragueHero as never} style={[styles.hero, wide && styles.heroWide]} imageStyle={styles.heroImage} resizeMode="cover">
      <View style={styles.heroOverlay} />
      <HomeHeroTop activeDeckLabel={activeDeckLabel} accountEmail={accountEmail} examLevel={examLevel} onAccount={onAccount} onAdd={onAdd} onProgress={onOpenProgress} onSearch={onSearch} onSettings={onSettings} />
      <HomeHeroCopy dueCount={dueCount} />
      <HomeHeroActions reviewLabel={reviewLabel} quizLabel={quizLabel} quizAccessibilityLabel={quizAccessibilityLabel} onStartStudy={onStartStudy} onStartQuiz={onStartQuiz} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: { width: "100%", height: size.heroHeight, overflow: "hidden", backgroundColor: colors.primaryDeep, padding: spacing.page, justifyContent: "space-between" },
  heroWide: { height: size.heroWideHeight },
  heroImage: { resizeMode: "cover" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.heroOverlay }
});
