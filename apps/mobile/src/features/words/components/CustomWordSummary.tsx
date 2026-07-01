import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { customCardDeckLabel } from "../models/wordDecks";
import { customWordSummaryStyles as styles } from "./customWordSummaryStyles";
import type { CustomWordSummaryProps } from "./customWordSummaryTypes";

export function CustomWordSummary({ card, decks }: CustomWordSummaryProps) {
  const { t } = useI18n();

  return (
    <>
      <View style={styles.accent}>
        <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.iconPrimary} />
      </View>
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.word} numberOfLines={1}>{card.cz}</Text>
          <View style={styles.deckPill}>
            <Text style={styles.deckText} numberOfLines={1}>{customCardDeckLabel(card, decks, t)}</Text>
          </View>
        </View>
        <Text style={styles.meaning} numberOfLines={2}>{card.en}</Text>
      </View>
    </>
  );
}
