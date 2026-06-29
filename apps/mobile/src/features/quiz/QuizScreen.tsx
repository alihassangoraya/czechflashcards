import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { QuizEmptyState } from "./components/QuizEmptyState";
import { QuizExitConfirmModal } from "./components/QuizExitConfirmModal";
import { QuizFeedback } from "./components/QuizFeedback";
import { QuizHeader } from "./components/QuizHeader";
import { QuizOption } from "./components/QuizOption";
import { QuizProgress } from "./components/QuizProgress";
import { QuizPromptCard } from "./components/QuizPromptCard";
import { QuizResultScreen } from "./components/QuizResultScreen";
import { buildQuestions } from "./quizQuestions";

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
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
    setShowExitConfirm(false);
  }, [deck, round]);

  const answeredCount = index + (checked ? 1 : 0);
  const accuracy = answeredCount ? Math.round((score / answeredCount) * 100) : 0;
  const hasProgress = index > 0 || selected !== null || checked || score > 0;

  function restartQuiz() {
    setRound((value) => value + 1);
  }

  function requestClose() {
    if (hasProgress && !finished) {
      setShowExitConfirm(true);
      return;
    }
    onClose();
  }

  function confirmClose() {
    setShowExitConfirm(false);
    onClose();
  }

  if (questions.length === 0) {
    return <QuizEmptyState onClose={onClose} />;
  }

  if (finished) {
    return <QuizResultScreen score={score} total={questions.length} onRestart={restartQuiz} onClose={onClose} />;
  }

  const question = questions[index];
  const isCorrect = selected === question.correctIndex;

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
      <QuizHeader score={score} onBack={requestClose} />
      <QuizProgress current={index + 1} total={questions.length} accuracy={accuracy} />
      <QuizPromptCard card={question.card} />

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

      {checked && <QuizFeedback correct={isCorrect} correctAnswer={question.options[question.correctIndex]} />}

      <Pressable disabled={selected == null} style={[styles.primaryButton, selected == null && styles.disabled]} onPress={next} accessibilityRole="button">
        <Text style={styles.primaryText}>{checked ? (index + 1 === questions.length ? "See results" : "Next question") : "Check answer"}</Text>
        <MaterialIcons name={checked ? "arrow-forward" : "check"} size={size.icon} color={colors.onPrimary} />
      </Pressable>

      <QuizExitConfirmModal visible={showExitConfirm} onCancel={() => setShowExitConfirm(false)} onConfirm={confirmClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: spacing.screenBottom },
  options: { gap: spacing.lg },
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.hero },
  primaryText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.42 }
});
