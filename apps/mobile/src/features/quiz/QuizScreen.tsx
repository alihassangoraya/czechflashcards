import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Speech from "expo-speech";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, shadow, size, spacing, typography } from "../../theme/design";

type Question = {
  card: Card;
  options: string[];
  correctIndex: number;
};

type Props = {
  deck: Card[];
  onClose: () => void;
};

export function QuizScreen({ deck, onClose }: Props) {
  const [round, setRound] = useState(0);
  const questions = useMemo(() => buildQuestions(deck), [deck, round]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }, [deck, round]);

  const answeredCount = index + (checked ? 1 : 0);
  const accuracy = answeredCount ? Math.round((score / answeredCount) * 100) : 0;

  function restartQuiz() {
    setRound((value) => value + 1);
  }

  if (questions.length === 0) {
    return (
      <View style={styles.empty}>
        <View style={styles.emptyIcon}>
          <MaterialIcons name="quiz" size={size.iconLarge} color={colors.warning} />
        </View>
        <Text style={styles.emptyTitle}>Quiz needs more cards</Text>
        <Text style={styles.emptyCopy}>Choose a deck with at least four distinct translations to start a quiz.</Text>
        <Pressable style={styles.secondaryButton} onPress={onClose} accessibilityRole="button">
          <MaterialIcons name="arrow-back" size={size.icon} color={colors.primaryDeep} />
          <Text style={styles.secondaryText}>Back home</Text>
        </Pressable>
      </View>
    );
  }

  if (finished) {
    const missed = questions.length - score;
    const finalAccuracy = Math.round((score / questions.length) * 100);
    const feedback = score === questions.length
      ? "Bezchybne. Every answer was correct."
      : finalAccuracy >= 80
        ? "Vyborne. Your recall is looking strong."
        : finalAccuracy >= 50
          ? "Dobra prace. A short review will help these words stick."
          : "Keep going. Review the missed words, then take another round.";

    return (
      <ScrollView contentContainerStyle={styles.resultContent}>
        <View style={styles.resultIcon}>
          <MaterialIcons name="emoji-events" size={size.quizResultIcon} color={colors.warning} />
        </View>
        <Text style={styles.resultTitle}>Gratulujeme!</Text>
        <Text style={styles.resultSubtitle}>Quiz complete</Text>

        <View style={styles.resultCard}>
          <Text style={styles.resultEyebrow}>Your score</Text>
          <View style={styles.scoreLine}>
            <Text style={[styles.resultScore, finalAccuracy >= 50 ? styles.scorePositive : styles.scoreNeedsReview]}>{score}</Text>
            <Text style={styles.scoreTotal}>/ {questions.length}</Text>
          </View>
          <Text style={styles.resultFeedback}>{feedback}</Text>
          <View style={styles.resultMetrics}>
            <ResultMetric icon="check-circle" value={`${score}`} label="Correct" color={colors.success} />
            <ResultMetric icon="cancel" value={`${missed}`} label="Missed" color={colors.danger} />
            <ResultMetric icon="bolt" value={`${finalAccuracy}%`} label="Accuracy" color={colors.action} />
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={restartQuiz} accessibilityRole="button">
          <MaterialIcons name="refresh" size={size.icon} color={colors.onPrimary} />
          <Text style={styles.primaryText}>Try another quiz</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onClose} accessibilityRole="button">
          <MaterialIcons name="home" size={size.icon} color={colors.primaryDeep} />
          <Text style={styles.secondaryText}>Return home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  const question = questions[index];
  const isCorrect = selected === question.correctIndex;
  const category = question.card.tags.find((tag) => !["extended", "forms", "numbers", "daily", "noun", "verb", "adjective"].includes(tag)) || question.card.tags[0] || "practice";

  function next() {
    if (!checked) {
      if (selected == null) return;
      setChecked(true);
      if (selected === question.correctIndex) setScore((value) => value + 1);
      return;
    }
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={onClose} accessibilityRole="button" accessibilityLabel="Back home">
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.topTitle}>Czech quiz</Text>
          <Text style={styles.topMeta}>Multiple choice</Text>
        </View>
        <View style={styles.scoreChip} accessibilityLabel={`${score} correct answers`}>
          <MaterialIcons name="check-circle" size={size.iconSmall} color={colors.success} />
          <Text style={styles.scoreChipText}>{score}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressTitle}>Question {index + 1} of {questions.length}</Text>
          <Text style={styles.progressMeta}>{accuracy}% accurate</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((index + 1) / questions.length) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.promptCard}>
        <View style={styles.promptTopline}>
          <View style={styles.modeChip}>
            <MaterialIcons name="translate" size={size.iconSmall} color={colors.primaryDeep} />
            <Text style={styles.modeChipText}>Czech to English</Text>
          </View>
          <Text style={styles.categoryText}>{titleCase(category)}</Text>
        </View>
        <Text style={styles.promptLabel}>Choose the matching meaning</Text>
        <Text style={styles.word}>{question.card.cz}</Text>
        <Pressable style={styles.audioLine} onPress={() => Speech.speak(question.card.cz, { language: "cs-CZ", rate: 0.86 })} accessibilityRole="button" accessibilityLabel={`Play ${question.card.cz}`}>
          <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
          <Text style={styles.pronunciation}>[ {question.card.pronunciation || question.card.cz} ]</Text>
        </Pressable>
        {Boolean(question.card.sentence) && <Text style={styles.example}>{question.card.sentence}</Text>}
      </View>

      <View style={styles.options}>
        {question.options.map((option, optionIndex) => (
          <QuizOption
            key={`${option}-${optionIndex}`}
            option={option}
            letter={String.fromCharCode(65 + optionIndex)}
            selected={selected === optionIndex}
            correct={question.correctIndex === optionIndex}
            checked={checked}
            onPress={() => setSelected(optionIndex)}
          />
        ))}
      </View>

      {checked && (
        <View style={[styles.feedbackPanel, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <MaterialIcons name={isCorrect ? "check-circle" : "info"} size={size.iconMedium} color={isCorrect ? colors.success : colors.danger} />
          <View style={styles.feedbackCopy}>
            <Text style={styles.feedbackTitle}>{isCorrect ? "Correct" : "Correct answer"}</Text>
            <Text style={styles.feedbackText}>{isCorrect ? "Nice recall. Keep the momentum." : question.options[question.correctIndex]}</Text>
          </View>
        </View>
      )}

      <Pressable disabled={selected == null} style={[styles.primaryButton, selected == null && styles.disabled]} onPress={next} accessibilityRole="button">
        <Text style={styles.primaryText}>{checked ? (index + 1 === questions.length ? "See results" : "Next question") : "Check answer"}</Text>
        <MaterialIcons name={checked ? "arrow-forward" : "check"} size={size.icon} color={colors.onPrimary} />
      </Pressable>
    </ScrollView>
  );
}

function QuizOption({ option, letter, selected, correct, checked, onPress }: { option: string; letter: string; selected: boolean; correct: boolean; checked: boolean; onPress: () => void }) {
  const stateStyle = checked && correct ? styles.correctOption : checked && selected ? styles.wrongOption : selected ? styles.selectedOption : null;
  const letterStyle = checked && correct ? styles.correctLetter : checked && selected ? styles.wrongLetter : selected ? styles.selectedLetter : styles.optionLetter;
  const textStyle = checked && (correct || selected) ? styles.optionTextInverted : styles.optionText;
  return (
    <Pressable disabled={checked} style={[styles.option, stateStyle]} onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      <View style={styles.optionInner}>
        <Text style={letterStyle}>{letter}</Text>
        <Text style={textStyle}>{option}</Text>
      </View>
      {checked && correct && <MaterialIcons name="check-circle" size={size.iconMedium} color={colors.onPrimary} />}
      {checked && selected && !correct && <MaterialIcons name="cancel" size={size.iconMedium} color={colors.onPrimary} />}
    </Pressable>
  );
}

function ResultMetric({ icon, value, label, color }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; value: string; label: string; color: string }) {
  return (
    <View style={styles.resultMetric}>
      <MaterialIcons name={icon} size={size.iconSmall} color={color} />
      <Text style={styles.resultMetricValue}>{value}</Text>
      <Text style={styles.resultMetricLabel}>{label}</Text>
    </View>
  );
}

function buildQuestions(deck: Card[]): Question[] {
  const pool = deck.filter((card) => card.cz && card.en);
  const meanings = Array.from(new Set(pool.map((card) => card.en)));
  if (pool.length < 4 || meanings.length < 4) return [];

  // Build only the questions displayed in this session. The former generator
  // rebuilt a full distractor pool for every card, which was costly on B1 decks.
  return shuffle(pool).slice(0, Math.min(10, pool.length)).map((card) => {
    const distractors = shuffle(meanings.filter((meaning) => meaning !== card.en)).slice(0, 3);
    const options = shuffle([...distractors, card.en]);
    return { card, options, correctIndex: options.indexOf(card.en) };
  });
}

function shuffle<T>(items: T[]): T[] {
  const result = items.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[nextIndex]] = [result[nextIndex], result[index]];
  }
  return result;
}

function titleCase(value: string) {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "Practice";
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: spacing.screenBottom },
  topBar: { minHeight: size.headerAction, flexDirection: "row", alignItems: "center" },
  backButton: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1, alignItems: "center" },
  topTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  topMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  scoreChip: { minWidth: size.headerAction, height: size.headerAction, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.mintSoft },
  scoreChipText: { color: colors.success, fontSize: typography.body, fontWeight: typography.weightBold },
  progressSection: { gap: spacing.smd },
  progressLabels: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressTitle: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  progressMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  progressTrack: { height: spacing.md, overflow: "hidden", borderRadius: radius.xs, backgroundColor: colors.progressTrackStrong },
  progressFill: { height: "100%", borderRadius: radius.xs, backgroundColor: colors.primary },
  promptCard: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  promptTopline: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  modeChip: { flexDirection: "row", alignItems: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primarySoft, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  modeChipText: { color: colors.primaryDeep, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  categoryText: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  promptLabel: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, textAlign: "center" },
  word: { color: colors.textStrong, fontSize: typography.word, lineHeight: typography.word + spacing.lg, fontWeight: typography.weightBold, textAlign: "center" },
  audioLine: { alignSelf: "center", flexDirection: "row", alignItems: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  pronunciation: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  example: { color: colors.textExample, fontSize: typography.bodySmall, fontWeight: typography.weightMedium, lineHeight: typography.bodyLarge, textAlign: "center" },
  options: { gap: spacing.lg },
  option: { minHeight: size.quizOptionHeight, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  optionInner: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  optionLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.textMuted, backgroundColor: colors.surfaceMuted, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  selectedOption: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  selectedLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.onPrimary, backgroundColor: colors.primary, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  correctOption: { borderColor: colors.success, backgroundColor: colors.success },
  correctLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.success, backgroundColor: colors.surface, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  wrongOption: { borderColor: colors.danger, backgroundColor: colors.danger },
  wrongLetter: { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, color: colors.danger, backgroundColor: colors.surface, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" },
  optionText: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightMedium },
  optionTextInverted: { flex: 1, color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  feedbackPanel: { flexDirection: "row", alignItems: "flex-start", gap: spacing.lg, borderWidth: spacing.hairline, borderRadius: radius.md, padding: spacing.xl },
  feedbackCorrect: { borderColor: colors.success, backgroundColor: colors.mintSoft },
  feedbackWrong: { borderColor: colors.dangerBorder, backgroundColor: colors.dangerSoft },
  feedbackCopy: { flex: 1, gap: spacing.xs },
  feedbackTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  feedbackText: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.hero },
  primaryText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  secondaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.hero },
  secondaryText: { color: colors.primaryDeep, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.42 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.xl, paddingHorizontal: spacing.hero, backgroundColor: colors.background },
  emptyIcon: { width: size.quizResultIcon, height: size.quizResultIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.goldSoft },
  emptyTitle: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightBold, textAlign: "center" },
  emptyCopy: { color: colors.textSoft, fontSize: typography.bodyLarge, lineHeight: typography.titleSmall + spacing.xs, textAlign: "center" },
  resultContent: { flexGrow: 1, alignItems: "center", justifyContent: "center", gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingVertical: spacing.hero, backgroundColor: colors.background },
  resultIcon: { width: size.quizResultIcon + spacing.card, height: size.quizResultIcon + spacing.card, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.goldSoft },
  resultTitle: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightBold, textAlign: "center" },
  resultSubtitle: { color: colors.textMuted, fontSize: typography.bodyLarge, fontWeight: typography.weightRegular, textAlign: "center" },
  resultCard: { width: "100%", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  resultEyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textAlign: "center", textTransform: "uppercase" },
  scoreLine: { flexDirection: "row", alignItems: "baseline", justifyContent: "center" },
  resultScore: { fontSize: typography.word, fontWeight: typography.weightBold },
  scorePositive: { color: colors.success },
  scoreNeedsReview: { color: colors.danger },
  scoreTotal: { color: colors.textMuted, fontSize: typography.title, fontWeight: typography.weightMedium },
  resultFeedback: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, lineHeight: typography.bodyLarge + spacing.xs, textAlign: "center" },
  resultMetrics: { flexDirection: "row", borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  resultMetric: { flex: 1, alignItems: "center", gap: spacing.xs },
  resultMetricValue: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightBold },
  resultMetricLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
