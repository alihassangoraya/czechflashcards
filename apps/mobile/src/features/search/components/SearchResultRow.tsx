import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import * as Speech from "../../../speech";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  card: Card;
  meaningLanguage: MeaningLanguage;
  saved: boolean;
  onStudy: (card: Card) => void;
  onToggleSaved: (card: Card) => void;
  onManageDecks: (card: Card) => void;
  onEdit: (card: Card) => void;
};

export function SearchResultRow({ card, meaningLanguage, saved, onStudy, onToggleSaved, onManageDecks, onEdit }: Props) {
  const meaning = selectedMeaning(card, meaningLanguage);

  return (
    <View style={styles.row}>
      <Pressable style={styles.study} onPress={() => onStudy(card)} accessibilityRole="button" accessibilityLabel={`Study ${card.cz}`}>
        <View style={styles.heading}>
          <Text style={styles.word}>{card.cz}</Text>
          {card.grammar?.partOfSpeech && <Text style={styles.partOfSpeech}>{card.grammar.partOfSpeech}</Text>}
        </View>
        <Text style={styles.english}>{card.en}</Text>
        <Text style={[styles.meaning, meaningLanguage === "ur" && styles.rtl]}>{meaning}</Text>
      </Pressable>
      <View style={styles.actions}>
        {card.source === "custom" && (
          <Pressable style={styles.action} onPress={() => onEdit(card)} accessibilityRole="button" accessibilityLabel={`Edit ${card.cz}`}>
            <MaterialIcons name="edit" size={size.iconSmall} color={colors.action} />
          </Pressable>
        )}
        <Pressable style={styles.action} onPress={() => Speech.speak(card.cz, { language: "cs-CZ", rate: 0.86 })} accessibilityRole="button" accessibilityLabel={`Play ${card.cz}`}>
          <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
        </Pressable>
        <Pressable style={styles.action} onPress={() => onManageDecks(card)} accessibilityRole="button" accessibilityLabel={`Add ${card.cz} to a deck`}>
          <MaterialIcons name="folder" size={size.iconSmall} color={colors.action} />
        </Pressable>
        <Pressable style={[styles.action, saved && styles.savedAction]} onPress={() => onToggleSaved(card)} accessibilityRole="button" accessibilityLabel={saved ? `Remove ${card.cz} from My list` : `Add ${card.cz} to My list`}>
          <MaterialIcons name={saved ? "star" : "star-border"} size={size.iconSmall} color={saved ? colors.onPrimary : colors.action} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  study: { flex: 1, gap: spacing.xxs },
  heading: { flexDirection: "row", alignItems: "center", gap: spacing.smd, flexWrap: "wrap" },
  word: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  partOfSpeech: { borderRadius: radius.sm, backgroundColor: colors.primarySoft, color: colors.primaryDeep, fontSize: typography.micro, fontWeight: typography.weightSemibold, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  english: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  meaning: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  actions: { gap: spacing.smd },
  action: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  savedAction: { borderColor: colors.primaryDeep, backgroundColor: colors.primaryDeep }
});
