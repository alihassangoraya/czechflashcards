import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import type { StudySettings } from "../../../database";
import * as Speech from "../../../speech";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  current: Card;
  currentSecondaryMeaning: string;
  flipProgress: Animated.Value;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
};

export function StudyCardBack({ current, currentSecondaryMeaning, flipProgress, meaningLanguage, onFlipCard }: Props) {
  return (
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
            <Text style={[styles.meaning, meaningLanguage === "ur" && styles.rtl]}>
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
  );
}

const styles = StyleSheet.create({
  cardFace: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    backfaceVisibility: "hidden"
  },
  cardBack: { backgroundColor: colors.surfaceSecondary },
  backWord: {
    color: colors.primary,
    fontSize: typography.screenTitle,
    fontWeight: typography.weightSemibold,
    textAlign: "center",
    marginBottom: spacing.sm
  },
  answer: { gap: 7, marginTop: 12 },
  contentLabel: {
    color: colors.action,
    fontSize: typography.caption,
    fontWeight: typography.weightSemibold,
    textTransform: "uppercase"
  },
  meaningRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  meaning: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontSize: typography.bodyLarge,
    lineHeight: 21,
    color: colors.textBody,
    fontWeight: typography.weightMedium
  },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  exampleBlock: { gap: 5, marginTop: 5 },
  exampleSpeech: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.actionSoft,
    paddingHorizontal: spacing.mdPlus,
    paddingVertical: spacing.smd
  },
  example: {
    flex: 1,
    fontSize: typography.bodyLarge,
    lineHeight: 21,
    color: colors.textExample
  },
  muted: { color: colors.textMuted, lineHeight: 20 },
  hint: {
    color: colors.textMuted,
    marginTop: typography.bodyLarge,
    textAlign: "center",
    fontWeight: typography.weightRegular
  }
});
