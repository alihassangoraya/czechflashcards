import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";
import { ProgressFocusAreaRow } from "./ProgressFocusAreaRow";
import { ProgressSectionHeader } from "./ProgressSectionHeader";
import type { ProgressFocusArea } from "../types/progressTypes";

type Props = { title: string; detail: string; areas: ProgressFocusArea[]; areaDetail: (area: ProgressFocusArea) => string };

export function ProgressFocusAreas({ title, detail, areas, areaDetail }: Props) {
  return (
    <View style={styles.card}>
      <ProgressSectionHeader title={title} detail={detail} />
      {areas.map((area) => <ProgressFocusAreaRow key={area.key} area={area} detail={areaDetail(area)} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.lg }
});
