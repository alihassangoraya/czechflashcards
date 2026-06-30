import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import { QuizOption } from "./QuizOption";

type Props = {
  options: string[];
  correctIndex: number;
  selected: number | null;
  checked: boolean;
  onSelect: (optionIndex: number) => void;
};

export function QuizOptionsList({ options, correctIndex, selected, checked, onSelect }: Props) {
  return (
    <View style={styles.options}>
      {options.map((option, optionIndex) => (
        <QuizOption
          key={`${option}-${optionIndex}`}
          option={option}
          letter={String.fromCharCode(65 + optionIndex)}
          selected={selected === optionIndex}
          correct={correctIndex === optionIndex}
          checked={checked}
          onPress={() => onSelect(optionIndex)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  options: { gap: spacing.lg }
});
