import React from "react";
import { Text, View, type DimensionValue } from "react-native";
import { screenProgressStyles as styles } from "./screenProgressStyles";
import type { ScreenProgressProps } from "./screenProgressTypes";

export function ScreenProgress({ title, progress, meta, centered }: ScreenProgressProps) {
  const width = `${Math.min(100, Math.max(3, progress * 100))}%` as DimensionValue;

  return (
    <View style={[styles.section, centered && styles.centered]}>
      <View style={[styles.labels, centered && styles.centeredLabels]}>
        <Text style={[styles.title, centered && styles.centeredText]}>{title}</Text>
        {meta ? <Text style={[styles.meta, centered && styles.centeredText]}>{meta}</Text> : null}
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}
