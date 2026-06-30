import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import * as Speech from "../../../services/speech";
import { colors, radius, size, spacing } from "../../../theme/design";

type Props = {
  card: Card;
  saved: boolean;
  onToggleSaved: (card: Card) => void;
  onManageDecks: (card: Card) => void;
  onEdit: (card: Card) => void;
};

export function SearchResultActions({ card, saved, onToggleSaved, onManageDecks, onEdit }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.actions}>
      {card.source === "custom" && (
        <SearchAction icon="edit" label={t("search.editWord", { word: card.cz })} onPress={() => onEdit(card)} />
      )}
      <SearchAction icon="volume-up" label={t("search.playWord", { word: card.cz })} onPress={() => Speech.speak(card.cz, { language: "cs-CZ", rate: 0.86 })} />
      <SearchAction icon="folder" label={t("search.addToDeck", { word: card.cz })} onPress={() => onManageDecks(card)} />
      <SearchAction
        icon={saved ? "star" : "star-border"}
        label={saved ? t("search.removeFromMyList", { word: card.cz }) : t("search.addToMyList", { word: card.cz })}
        onPress={() => onToggleSaved(card)}
        saved={saved}
      />
    </View>
  );
}

type SearchActionProps = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress: () => void;
  saved?: boolean;
};

function SearchAction({ icon, label, onPress, saved }: SearchActionProps) {
  return (
    <Pressable style={[styles.action, saved && styles.savedAction]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={saved ? colors.onPrimary : colors.action} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actions: { gap: spacing.smd },
  action: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  savedAction: { borderColor: colors.primaryDeep, backgroundColor: colors.primaryDeep }
});
