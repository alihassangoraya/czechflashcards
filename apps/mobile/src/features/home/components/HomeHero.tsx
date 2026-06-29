import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons, { type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import pragueHero from "../../../../assets/images/prague_hero_banner.jpg";
import { labelForDeck } from "../homeContent";

type Props = {
  deckFilter: string;
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

export function HomeHero({ deckFilter, examLevel, dueCount, accountEmail, wide, onStartStudy, onStartQuiz, onSearch, onAdd, onSettings, onAccount }: Props) {
  return (
    <ImageBackground source={pragueHero as never} style={[styles.hero, wide && styles.heroWide]} imageStyle={styles.heroImage} resizeMode="cover">
      <View style={styles.heroOverlay} />
      <View style={styles.heroTop}>
        <Text style={styles.levelPill}>{examLevel.toUpperCase()} · {labelForDeck(deckFilter)}</Text>
        <View style={styles.heroIconGroup}>
          <HeroIcon icon="search" label="Search words" onPress={onSearch} />
          <HeroIcon icon="add" label="Add word" onPress={onAdd} />
          <HeroIcon icon={accountEmail ? "account-circle" : "person-outline"} label={accountEmail ? "Account" : "Guest account"} onPress={onAccount} />
          <HeroIcon icon="settings" label="Open settings" onPress={onSettings} />
        </View>
      </View>
      <View style={styles.heroCopy}>
        <Text style={styles.heroEyebrow}>Continue learning</Text>
        <Text style={styles.heroTitle}>Ahoj, studentu!</Text>
        <Text style={styles.heroSubtitle}>{dueCount > 0 ? `${dueCount} cards are ready for you.` : "Keep your Czech fresh today."}</Text>
      </View>
      <View style={styles.heroActions}>
        <Pressable style={styles.reviewAction} onPress={onStartStudy} accessibilityRole="button" accessibilityLabel={dueCount > 0 ? `Review ${dueCount} due cards` : "Start review"}>
          <MaterialIcons name="play-arrow" size={20} color={colors.charcoalText} />
          <Text style={styles.reviewActionText}>{dueCount > 0 ? `Review ${dueCount} due` : "Start review"}</Text>
        </Pressable>
        <Pressable style={styles.quizAction} onPress={onStartQuiz} accessibilityRole="button" accessibilityLabel="Start B1 quiz">
          <MaterialIcons name="psychology" size={19} color={colors.onPrimary} />
          <Text style={styles.quizActionText}>Quiz</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

function HeroIcon({ icon, label, onPress }: { icon: MaterialIconName; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.heroIcon} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={colors.heroText} />
    </Pressable>
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
  heroIcon: { width: size.cardAction, height: size.cardAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.heroControl },
  heroCopy: { gap: 2 },
  heroEyebrow: { color: colors.heroTextMuted, fontSize: typography.label, fontWeight: typography.weightMedium },
  heroTitle: { color: colors.heroText, fontSize: typography.display, lineHeight: 33, fontWeight: typography.weightBold },
  heroSubtitle: { color: colors.heroTextSecondary, fontSize: typography.body, fontWeight: typography.weightRegular },
  heroActions: { flexDirection: "row", gap: 8 },
  reviewAction: { flex: 1, minHeight: 40, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.md, borderRadius: radius.lg, backgroundColor: colors.surface, paddingHorizontal: spacing.lgPlus },
  reviewActionText: { color: colors.text, fontSize: typography.body, fontWeight: typography.weightSemibold },
  quizAction: { minWidth: 80, minHeight: 40, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.heroOutline, backgroundColor: colors.heroControl, paddingHorizontal: spacing.lgPlus },
  quizActionText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
