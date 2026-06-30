import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, size } from "../../../theme/design";
import { quizOptionStyles as styles } from "./quizOptionStyles";
import type { QuizOptionProps } from "./quizOptionTypes";

export function QuizOption({ option, letter, selected, correct, checked, onPress }: QuizOptionProps) {
  const stateStyle = checked && correct ? styles.correctOption : checked && selected ? styles.wrongOption : selected ? styles.selectedOption : null;
  const letterStyle = checked && correct ? styles.correctLetter : checked && selected ? styles.wrongLetter : selected ? styles.selectedLetter : styles.optionLetter;
  const textStyle = checked && (correct || selected) ? styles.optionTextInverted : styles.optionText;
  return (
    <Pressable disabled={checked} style={[styles.option, stateStyle]} onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      <View style={styles.optionInner}>
        <Text style={letterStyle}>{letter}</Text>
        <Text style={textStyle}>{option}</Text>
      </View>
      {checked && correct && <MaterialIcons name="check-circle" size={size.iconMedium} color={colors.onPrimary} />}
      {checked && selected && !correct && <MaterialIcons name="cancel" size={size.iconMedium} color={colors.onPrimary} />}
    </Pressable>
  );
}
