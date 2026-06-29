import React from "react";
import {
  Animated,
  GestureResponderHandlers,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import * as Speech from "../../speech";
import MaterialIcons from "../../components/MaterialIcons";
import { HeaderIcon } from "../../components/HeaderIcon";
import { GeminiTutorPanel } from "../tutor/GeminiTutorPanel";
import type { StudySettings } from "../../database";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { WordDetailsPanel } from "./WordDetailsPanel";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SwipeDirection = "again" | "known";

type Props = {
  current: Card | null;
  settings: StudySettings;
  savedCardIds: Set<string>;
  revealed: boolean;
  flipping: boolean;
  grading: boolean;
  swipeDirection: SwipeDirection | null;
  lastReviewCard: Card | null;
  sessionReviews: number;
  sessionTarget: number;
  reviewedToday: number;
  dailyGoal: number;
  sessionProgress: number;
  dragX: Animated.Value;
  flipProgress: Animated.Value;
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  panHandlers: GestureResponderHandlers;
  reviewInterval: (grade: ReviewGrade) => string;
  onBack: () => void;
  onOpenGrammar: () => void;
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
  onGrade: (grade: ReviewGrade) => void;
};

export function StudyScreen({
  current,
  settings,
  savedCardIds,
  revealed,
  flipping,
  grading,
  swipeDirection,
  lastReviewCard,
  sessionReviews,
  sessionTarget,
  reviewedToday,
  dailyGoal,
  sessionProgress,
  dragX,
  flipProgress,
  cardRotation,
  panHandlers,
  reviewInterval,
  onBack,
  onOpenGrammar,
  onFlipCard,
  onToggleSaved,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview,
  onGrade
}: Props) {
  const currentSecondaryMeaning = current ? displaySelectedMeaning(current, settings.meaningLanguage) : "";

  return (
    <>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Pressable style={styles.backIcon} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back home">
            <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
          </Pressable>
          <Text style={styles.title}>Czech Flashcards</Text>
        </View>
        <View style={styles.headerActions}>
          <HeaderIcon icon="school" label="Open grammar guide" onPress={onOpenGrammar} />
        </View>
      </View>

      <View style={styles.sessionProgressRow}>
        <Text style={styles.sessionProgressText}>Card {sessionReviews + 1} of {sessionTarget} · Today {reviewedToday} / {dailyGoal}</Text>
        <View style={styles.sessionProgressTrack}>
          <View style={[styles.sessionProgressFill, { width: `${Math.max(3, sessionProgress * 100)}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} directionalLockEnabled>
        <View style={styles.cardFrame} {...panHandlers}>
          <Animated.View pointerEvents="box-none" style={[styles.cardMotion, { transform: [{ translateX: dragX }, { rotateZ: cardRotation }] }]}>
            {swipeDirection && (
              <Text style={[styles.swipeOverlay, swipeDirection === "known" ? styles.swipeKnown : styles.swipeAgain]}>
                {swipeDirection === "known" ? "Known" : "Again"}
              </Text>
            )}
            {current ? (
              <>
                <Pressable
                  style={styles.cardSaveButton}
                  onPressIn={(event) => event.stopPropagation()}
                  onPress={(event) => { event.stopPropagation(); onToggleSaved(current.id); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: savedCardIds.has(current.id) }}
                  accessibilityLabel={savedCardIds.has(current.id) ? `Remove ${current.cz} from My list` : `Add ${current.cz} to My list`}
                >
                  <MaterialIcons name={savedCardIds.has(current.id) ? "star" : "star-border"} size={size.icon} color={colors.action} />
                </Pressable>
                {revealed && !flipping && (
                  <Pressable style={styles.cardEditButton} onPress={(event) => { event.stopPropagation(); onEditCard(); }} accessibilityRole="button" accessibilityLabel={`Edit ${current.cz}`}>
                    <MaterialIcons name="edit" size={size.iconMedium} color={colors.actionMuted} />
                  </Pressable>
                )}
                <AnimatedPressable
                  onPress={onFlipCard}
                  accessibilityRole="button"
                  accessibilityLabel="Reveal meaning"
                  style={[
                    styles.cardFace,
                    {
                      transform: [
                        { perspective: 1200 },
                        { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) }
                      ]
                    }
                  ]}
                >
                  <Text style={styles.word}>{current.cz}</Text>
                  <Pressable
                    style={styles.pronunciationPill}
                    onPress={(event) => { event.stopPropagation(); Speech.speak(current.cz, { language: "cs-CZ", rate: 0.86 }); }}
                    accessibilityRole="button"
                    accessibilityLabel={`Play ${current.cz}`}
                  >
                    <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
                    <Text style={styles.pronunciationText}>{current.pronunciation || pronunciationHint(current.cz)}</Text>
                  </Pressable>
                  <View style={styles.swipeAffordance}>
                    <Pressable
                      disabled={grading}
                      style={[styles.swipeAffordanceButton, styles.swipeAffordanceAgain, grading && styles.disabledButton]}
                      onPress={(event) => { event.stopPropagation(); onCompleteSwipe("again"); }}
                      accessibilityRole="button"
                      accessibilityLabel="Mark again"
                    >
                      <MaterialIcons name="arrow-back" size={size.icon} color={colors.danger} />
                      <Text style={[styles.swipeAffordanceText, styles.swipeAffordanceAgainText]}>Again</Text>
                    </Pressable>
                    <Pressable
                      disabled={grading}
                      style={[styles.swipeAffordanceButton, styles.swipeAffordanceKnown, grading && styles.disabledButton]}
                      onPress={(event) => { event.stopPropagation(); onCompleteSwipe("known"); }}
                      accessibilityRole="button"
                      accessibilityLabel="Mark known"
                    >
                      <Text style={[styles.swipeAffordanceText, styles.swipeAffordanceKnownText]}>Known</Text>
                      <MaterialIcons name="arrow-forward" size={size.icon} color={colors.success} />
                    </Pressable>
                  </View>
                  <Text style={styles.hint}>Tap to reveal meaning</Text>
                  {lastReviewCard && !revealed && (
                    <Pressable
                      disabled={grading}
                      style={[styles.cardUndoButton, grading && styles.disabledButton]}
                      onPress={(event) => { event.stopPropagation(); onUndoLastReview(); }}
                      accessibilityRole="button"
                      accessibilityLabel={`Undo review for ${lastReviewCard.cz}`}
                    >
                      <MaterialIcons name="undo" size={size.iconSmall} color={colors.primaryDeep} />
                      <Text style={styles.cardUndoText}>Undo</Text>
                    </Pressable>
                  )}
                </AnimatedPressable>
                <AnimatedPressable
                  onPress={onFlipCard}
                  accessibilityRole="button"
                  accessibilityLabel="Show Czech word"
                  style={[
                    styles.cardFace,
                    styles.cardBack,
                    {
                      transform: [
                        { perspective: 1200 },
                        { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] }) }
                      ]
                    }
                  ]}
                >
                  <Text style={styles.backWord}>{current.cz}</Text>
                  <View style={styles.answer}>
                    <Text style={styles.contentLabel}>Translation</Text>
                    <View style={styles.meaningRow}>
                      <Text style={styles.meaning}>{current.en}</Text>
                      {Boolean(currentSecondaryMeaning) && (
                        <Text style={[styles.meaning, settings.meaningLanguage === "ur" && styles.rtl]}>
                          {currentSecondaryMeaning}
                        </Text>
                      )}
                    </View>
                    {Boolean(current.sentence) && (
                      <View style={styles.exampleBlock}>
                        <Text style={styles.contentLabel}>In context</Text>
                        <Pressable
                          style={styles.exampleSpeech}
                          onPress={(event) => { event.stopPropagation(); Speech.speak(current.sentence, { language: "cs-CZ", rate: 0.86 }); }}
                          accessibilityRole="button"
                          accessibilityLabel="Play Czech example"
                        >
                          <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
                          <Text style={styles.example} numberOfLines={2}>{current.sentence}</Text>
                        </Pressable>
                        {Boolean(current.sentenceEn) && <Text style={styles.muted} numberOfLines={2}>{current.sentenceEn}</Text>}
                      </View>
                    )}
                  </View>
                  <Text style={styles.hint}>Tap to see Czech</Text>
                </AnimatedPressable>
              </>
            ) : (
              <View style={styles.cardFace}>
                <Text style={styles.word}>Done</Text>
                <Text style={styles.hint}>No cards are due in this deck.</Text>
              </View>
            )}
          </Animated.View>
        </View>

        {revealed && current && (
          <View style={styles.reviewRow}>
            <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewAgain, grading && styles.disabledButton]} onPress={() => onGrade("again")}>
              <Text style={styles.reviewButtonText}>Again</Text>
              <Text style={styles.reviewIntervalText}>{reviewInterval("again")}</Text>
            </Pressable>
            <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewHard, grading && styles.disabledButton]} onPress={() => onGrade("hard")}>
              <Text style={styles.reviewButtonText}>Hard</Text>
              <Text style={styles.reviewIntervalText}>{reviewInterval("hard")}</Text>
            </Pressable>
            <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewGood, grading && styles.disabledButton]} onPress={() => onGrade("good")}>
              <Text style={styles.reviewButtonText}>Good</Text>
              <Text style={styles.reviewIntervalText}>{reviewInterval("good")}</Text>
            </Pressable>
            <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewEasy, grading && styles.disabledButton]} onPress={() => onGrade("easy")}>
              <Text style={styles.reviewEasyText}>Easy</Text>
              <Text style={styles.reviewIntervalText}>{reviewInterval("easy")}</Text>
            </Pressable>
          </View>
        )}

        {revealed && current && <WordDetailsPanel card={current} />}
        {revealed && <GeminiTutorPanel card={current} />}
      </ScrollView>
    </>
  );
}

function pronunciationHint(word: string) {
  return `[ ${word} ] · stress the first syllable`;
}

function displaySelectedMeaning(card: Card, language: StudySettings["meaningLanguage"]): string {
  const meaning = selectedMeaning(card, language).trim();
  return isRealTranslation(meaning) ? meaning : "";
}

function isRealTranslation(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return Boolean(normalized) && normalized !== "hindi meaning pending" && normalized !== "اردو معنی باقی ہے";
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: typography.bodyLarge },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  title: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  sessionProgressRow: { width: 250, alignSelf: "center", gap: 5, marginTop: 1, marginBottom: 12 },
  sessionProgressText: { color: colors.textSubtle, fontSize: typography.caption, fontWeight: typography.weightMedium, textAlign: "center" },
  sessionProgressTrack: { height: spacing.sm, overflow: "hidden", borderRadius: spacing.xs, backgroundColor: colors.progressTrackStrong },
  sessionProgressFill: { height: "100%", borderRadius: spacing.xs, backgroundColor: colors.primary },
  headerActions: { flexDirection: "row", gap: spacing.lg },
  backIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom },
  cardFrame: { position: "relative", height: size.cardHeight },
  cardMotion: { ...StyleSheet.absoluteFillObject },
  cardFace: { position: "absolute", inset: 0, justifyContent: "center", backgroundColor: colors.surface, borderRadius: radius.card, padding: spacing.card, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backfaceVisibility: "hidden" },
  cardBack: { backgroundColor: colors.surfaceSecondary },
  cardSaveButton: { position: "absolute", top: spacing.xlPlus, left: spacing.xlPlus, zIndex: spacing.sm, width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  cardEditButton: { position: "absolute", top: spacing.xlPlus, right: spacing.xlPlus, zIndex: spacing.sm, width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  cardUndoButton: { position: "absolute", bottom: spacing.xlPlus, alignSelf: "center", minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.xl },
  cardUndoText: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  swipeOverlay: { position: "absolute", zIndex: spacing.lgPlus, left: -spacing.lgPlus, right: -spacing.lgPlus, top: "50%", borderWidth: spacing.sm, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.stampSurface, fontSize: 62, fontWeight: "900", lineHeight: 68, textAlign: "center", textTransform: "uppercase" },
  swipeKnown: { color: colors.successStrong, borderColor: colors.successStrong, transform: [{ translateY: -size.headerAction }, { rotate: "-18deg" }] },
  swipeAgain: { color: colors.dangerStrong, borderColor: colors.dangerStrong, transform: [{ translateY: -size.headerAction }, { rotate: "18deg" }] },
  word: { fontSize: typography.word, lineHeight: 56, color: colors.textStrong, fontWeight: typography.weightBold, textAlign: "center" },
  pronunciationPill: { alignSelf: "center", flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.xlPlus, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  pronunciationText: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  backWord: { color: colors.primary, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold, textAlign: "center", marginBottom: spacing.sm },
  swipeAffordance: { flexDirection: "row", justifyContent: "space-between", gap: spacing.lg, marginTop: spacing.xlPlus },
  swipeAffordanceButton: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, borderWidth: spacing.hairline, paddingHorizontal: spacing.md },
  swipeAffordanceAgain: { borderColor: colors.dangerSoft, backgroundColor: colors.dangerSoft },
  swipeAffordanceKnown: { borderColor: colors.mintSoft, backgroundColor: colors.mintSoft },
  swipeAffordanceText: { fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  swipeAffordanceAgainText: { color: colors.danger },
  swipeAffordanceKnownText: { color: colors.success },
  answer: { gap: 7, marginTop: 12 },
  contentLabel: { color: colors.action, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  meaningRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  meaning: { flex: 1, flexShrink: 1, minWidth: 0, fontSize: typography.bodyLarge, lineHeight: 21, color: colors.textBody, fontWeight: typography.weightMedium },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  exampleBlock: { gap: 5, marginTop: 5 },
  exampleSpeech: { flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.mdPlus, paddingVertical: spacing.smd },
  example: { flex: 1, fontSize: typography.bodyLarge, lineHeight: 21, color: colors.textExample },
  hint: { color: colors.textMuted, marginTop: typography.bodyLarge, textAlign: "center", fontWeight: typography.weightRegular },
  muted: { color: colors.textMuted, lineHeight: 20 },
  reviewRow: { flexDirection: "row", gap: 6 },
  reviewButton: { flex: 1, minHeight: size.reviewButton, alignItems: "center", justifyContent: "center", gap: spacing.xxs, borderRadius: radius.xl, paddingHorizontal: spacing.sm },
  reviewAgain: { backgroundColor: colors.danger },
  reviewHard: { backgroundColor: colors.warning },
  reviewGood: { backgroundColor: colors.primary },
  reviewEasy: { backgroundColor: colors.success },
  reviewButtonText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightBold },
  reviewEasyText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightBold },
  reviewIntervalText: { color: colors.onPrimaryMuted, fontSize: typography.micro, fontWeight: typography.weightMedium },
  disabledButton: { opacity: 0.45 }
});
