import React from "react";
import { Text, View } from "react-native";
import { accountLocalSummaryStyles as styles } from "./accountLocalSummaryStyles";

type Props = {
  label: string;
  value: number;
};

export function AccountSummaryItem({ label, value }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
  );
}
