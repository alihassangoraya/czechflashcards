import React from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import MaterialIcons, { type MaterialIconName } from "../../components/MaterialIcons";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";
import { colors, radius, shadow, size, spacing, typography } from "../../theme/design";
import pragueHero from "../../../assets/images/prague_hero_banner.jpg";

type Props = {
  deck: Card[];
  allCards: Card[];
  states: Record<string, ReviewState>;
  settings: StudySettings;
  savedCount: number;
  customCount: number;
  dailyProgress: string;
  accountEmail: string | null;
  syncStatus: string;
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onSelectCategory: (category: string) => void;
  onSearch: () => void;
  onAdd: () => void;
  onSettings: () => void;
  onAccount: () => void;
};

type Category = { id: string; title: string; icon: MaterialIconName; color: string; count?: number };
type GuideItem = { icon: MaterialIconName; text: string };

const BASE_DECKS: Category[] = [
  { id: "a2-focus", title: "A2 Focus", icon: "school", color: colors.bohemianBlue },
  { id: "b1-focus", title: "B1 Focus", icon: "emoji-events", color: colors.bohemianGold },
  { id: "saved", title: "My List", icon: "star", color: colors.bohemianGold },
  { id: "core", title: "Core Words", icon: "layers", color: colors.softMint },
  { id: "all", title: "All Cards", icon: "auto-stories", color: colors.bohemianBlue },
  { id: "daily", title: "Daily Life", icon: "home", color: colors.bohemianBlue },
  { id: "extended", title: "Extended", icon: "library-add", color: colors.softMint },
  { id: "travel", title: "Travel", icon: "flight", color: colors.bohemianGold },
  { id: "work", title: "Work", icon: "assignment", color: colors.softMint },
  { id: "health", title: "Health", icon: "favorite", color: colors.bohemianRed },
  { id: "verbs", title: "Verbs", icon: "menu-book", color: colors.bohemianBlue },
  { id: "forms", title: "Forms", icon: "swap-horiz", color: colors.softMint },
  { id: "custom", title: "Custom", icon: "folder", color: colors.bohemianRed },
  { id: "numbers", title: "Numbers", icon: "format-list-numbered", color: colors.bohemianGold }
];

const GUIDE_ITEMS: GuideItem[] = [
  { icon: "touch-app", text: "Tap the card to reveal meanings, examples, and word details." },
  { icon: "arrow-back", text: "Swipe left or press Again to see a word again after 10-15 other cards." },
  { icon: "arrow-forward", text: "Swipe right or press Known when a word feels familiar." },
  { icon: "volume-up", text: "Use the audio buttons to hear the Czech word and example." },
  { icon: "undo", text: "Use Undo on the Czech side if you reviewed the previous card by mistake." },
  { icon: "star", text: "Star important cards to keep them in My List." },
  { icon: "search", text: "Use search to find a word, + to add one, and settings to choose your deck." },
  { icon: "quiz", text: "Use Quiz for quick recall practice after reviewing your due cards." }
];

export function HomeScreen({
  deck,
  allCards,
  states,
  settings,
  savedCount,
  customCount,
  dailyProgress,
  accountEmail,
  syncStatus,
  onStartStudy,
  onStartQuiz,
  onSelectCategory,
  onSearch,
  onAdd,
  onSettings,
  onAccount
}: Props) {
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 768;
  const now = Date.now();
  const dueCount = deck.filter((card) => (states[card.id]?.dueAt || 0) <= now).length;
  const [reviewedToday, goalToday] = dailyProgress.split(" / ").map((value) => Number.parseInt(value, 10) || 0);
  const dailyGoal = goalToday || settings.dailyGoal;
  const dailyRatio = dailyGoal ? Math.min(1, reviewedToday / dailyGoal) : 0;
  const visibleCards = allCards.filter((card) => settings.examLevel === "b1" || card.level === "a2" || card.tags.includes("custom") || String(card.id).startsWith("import-"));
  const categories: Category[] = [
    ...BASE_DECKS.map((category) => ({ ...category, count: countForDeck(category.id, visibleCards, savedCount, customCount) })),
    ...settings.customDecks.map((customDeck, index) => ({
      id: customDeck.id,
      title: customDeck.name,
      icon: "folder" as MaterialIconName,
      color: index % 2 ? colors.bohemianBlue : colors.softMint,
      count: visibleCards.filter((card) => card.tags.includes(customDeck.id)).length
    }))
  ];

  return (
    <View style={styles.screen}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <ImageBackground source={pragueHero as never} style={[styles.hero, isWideLayout && styles.heroWide]} imageStyle={styles.heroImage} resizeMode="cover">
        <View style={styles.heroOverlay} />
        <View style={styles.heroTop}>
          <Text style={styles.levelPill}>{settings.examLevel.toUpperCase()} · {labelForDeck(settings.deckFilter)}</Text>
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

      <View style={styles.todayCard}>
        <View style={styles.todayIcon}>
          <MaterialIcons name={dailyRatio >= 1 ? "check-circle" : "whatshot"} size={24} color={dailyRatio >= 1 ? colors.softMint : colors.bohemianGold} />
        </View>
        <View style={styles.todayCopy}>
          <View style={styles.sectionHeader}>
            <Text style={styles.todayTitle}>{dailyRatio >= 1 ? "Daily goal met" : "Today's goal"}</Text>
            <Text style={styles.todayCount}>{reviewedToday} / {dailyGoal}</Text>
          </View>
          <Text style={styles.todayMeta}>{dailyRatio >= 1 ? "Nice work. Come back tomorrow for more." : `${Math.max(0, dailyGoal - reviewedToday)} cards left today`}</Text>
          <ProgressBar value={dailyRatio} color={dailyRatio >= 1 ? colors.softMint : colors.bohemianGold} compact />
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Decks</Text>
          <Text style={styles.sectionMeta}>{deck.length} in current deck</Text>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((category) => {
            const selected = settings.deckFilter === category.id;
            return (
              <Pressable
                key={category.id}
                style={[styles.categoryCard, selected && styles.categoryCardSelected]}
                onPress={() => onSelectCategory(category.id)}
                accessibilityRole="button"
                accessibilityLabel={`Study ${category.title}`}
              >
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}1f` }]}>
                  <MaterialIcons name={category.icon} size={22} color={category.color} />
                </View>
                <View style={styles.categoryCopy}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryCount}>{category.count || 0} cards</Text>
                </View>
                {selected && <MaterialIcons name="check-circle" size={17} color={colors.softMint} />}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.studyGuide}>
        <Text style={styles.guideTitle}>Study Guide</Text>
        <View style={styles.guideGrid}>
          {GUIDE_ITEMS.map((item) => (
            <View key={item.text} style={styles.guideItem}>
              <View style={styles.guideBullet}>
                <MaterialIcons name={item.icon} size={size.iconSmall} color={colors.bohemianBlue} />
              </View>
              <Text style={styles.guideText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

function labelForDeck(deckFilter: string): string {
  return ({ "a2-focus": "A2 Focus", "b1-focus": "B1 Focus", saved: "My list", core: "Core words", all: "All cards" } as Record<string, string>)[deckFilter] || deckFilter;
}

function countForDeck(deckId: string, cards: Card[], savedCount: number, customCount: number): number {
  if (deckId === "saved") return savedCount;
  if (deckId === "all") return cards.length;
  if (deckId === "core") return cards.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms")).length;
  if (deckId === "custom") return customCount;
  return cards.filter((card) => card.tags.includes(deckId)).length;
}

function ProgressBar({ value, color, compact = false }: { value: number; color: string; compact?: boolean }) {
  return (
    <View style={[styles.progressTrack, compact && styles.progressCompact]}>
      <View style={[styles.progressFill, { width: `${Math.max(3, Math.min(100, value * 100))}%`, backgroundColor: color }]} />
    </View>
  );
}

function Stat({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statCount, { color }]}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { gap: typography.bodyLarge, paddingBottom: spacing.screenBottom },
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
  quizActionText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  sectionTitle: { color: colors.charcoalText, fontSize: 18, fontWeight: "700" },
  sectionMeta: { color: colors.mutedSlate, fontSize: 12, fontWeight: "500" },
  categoriesSection: { gap: 10, marginHorizontal: 15 },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: { width: "48%", minHeight: size.categoryCardHeight, flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.lightSand, backgroundColor: colors.card, padding: spacing.md },
  categoryCardSelected: { borderColor: colors.softMint, borderWidth: spacing.xxs, padding: spacing.xs },
  categoryIcon: { width: size.categoryIcon, height: size.categoryIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  categoryCopy: { flex: 1, gap: 2 },
  categoryTitle: { color: colors.charcoalText, fontSize: 15, fontWeight: "600" },
  categoryCount: { color: colors.mutedSlate, fontSize: 12, fontWeight: "400" },
  todayCard: { flexDirection: "row", alignItems: "center", gap: spacing.xl, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  todayIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: radius.lg, backgroundColor: colors.goldSoft },
  todayCopy: { flex: 1, gap: 5 },
  todayTitle: { color: colors.charcoalText, fontSize: 16, fontWeight: "700" },
  todayCount: { color: colors.bohemianGold, fontSize: 15, fontWeight: "600" },
  todayMeta: { color: colors.mutedSlate, fontSize: 13, fontWeight: "400" },
  card: { gap: spacing.xlPlus, marginHorizontal: spacing.page, borderRadius: radius.xl, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.borderSoft, padding: spacing.page, ...shadow.soft },
  progressTrack: { height: spacing.lg, overflow: "hidden", borderRadius: spacing.sm, backgroundColor: colors.progressTrack },
  progressCompact: { height: 6 },
  progressFill: { height: "100%", borderRadius: 4 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  stat: { flex: 1, alignItems: "center", gap: 2 },
  statCount: { fontSize: 18, fontWeight: "700" },
  statLabel: { color: colors.mutedSlate, fontSize: 11, fontWeight: "500" },
  secondaryCard: { gap: spacing.xl, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surface, padding: spacing.page },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft },
  avatarText: { color: colors.bohemianBlue, fontSize: 24, fontWeight: "600" },
  profileCopy: { flex: 1 },
  profileName: { color: colors.charcoalText, fontSize: 16, fontWeight: "700" },
  profileMeta: { color: colors.mutedSlate, fontSize: 12, fontWeight: "400", marginTop: 2 },
  rankPill: { overflow: "hidden", borderRadius: radius.md, backgroundColor: colors.mintSoft, color: colors.success, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, fontSize: typography.micro, fontWeight: typography.weightSemibold },
  badgeTitle: { color: colors.bohemianBlue, fontSize: 12, fontWeight: "600", textTransform: "uppercase" },
  badges: { flexDirection: "row", gap: 8 },
  badgeItem: { flex: 1, alignItems: "center", gap: 3 },
  badgeIcon: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: radius.lg, backgroundColor: colors.goldSoft },
  badgeLocked: { backgroundColor: colors.progressTrack },
  badgeName: { color: colors.charcoalText, fontSize: 10, fontWeight: "600", textAlign: "center" },
  badgeLabel: { color: colors.mutedSlate, fontSize: 9, lineHeight: 11, textAlign: "center" },
  lockedText: { color: colors.mutedSlate },
  syncNote: { color: colors.mutedSlate, fontSize: 11, lineHeight: 16, textAlign: "center" },
  studyGuide: { gap: spacing.lg, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surface, padding: spacing.page },
  guideTitle: { color: colors.mutedSlate, fontSize: typography.bodySmall, fontWeight: typography.weightBold, textTransform: "uppercase" },
  guideGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: spacing.xlPlus, rowGap: spacing.lg },
  guideItem: { width: "47%", minWidth: 260, flexGrow: 1, flexDirection: "row", alignItems: "flex-start", gap: spacing.smd },
  guideBullet: { width: size.iconMedium, alignItems: "center", paddingTop: spacing.xxs },
  guideText: { flex: 1, color: colors.mutedSlate, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
