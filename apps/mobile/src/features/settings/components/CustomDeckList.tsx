import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import { CustomDeckListRow } from "./CustomDeckListRow";
import type { CustomDeckListProps } from "./customDeckListTypes";

export function CustomDeckList({ items, ...controls }: CustomDeckListProps) {
  if (!items.length) return null;

  return (
    <View style={styles.customDeckList}>
      {items.map((item) => (
        <CustomDeckListRow key={item.deck.id} item={item} {...controls} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  customDeckList: { gap: spacing.smd }
});
