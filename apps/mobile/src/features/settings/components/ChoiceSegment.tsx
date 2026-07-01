import { Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props<T extends string> = {
  value: T;
  options: T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
  compact?: boolean;
};

export function ChoiceSegment<T extends string>({ value, options, labels, onChange, compact = false }: Props<T>) {
  const { direction } = useI18n();
  const fixedOrder = { direction: "ltr" } as ViewStyle;

  return (
    <View style={[styles.choiceSegment, compact && styles.choiceSegmentCompact, fixedOrder]}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.choiceOption, value === option && styles.choiceOptionActive]} onPress={() => onChange(option)} accessibilityRole="radio" accessibilityState={{ selected: value === option }}>
          <Text style={[styles.choiceText, { writingDirection: direction }, value === option && styles.choiceTextActive]}>{labels[option]}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  choiceSegment: { flexDirection: "row", gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.sheet, padding: spacing.xs },
  choiceSegmentCompact: { flex: 1 },
  choiceOption: { flex: 1, minHeight: size.actionMinHeight, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, paddingHorizontal: spacing.md },
  choiceOptionActive: { backgroundColor: colors.primaryDeep },
  choiceText: { color: colors.textBody, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  choiceTextActive: { color: colors.onPrimary, fontWeight: typography.weightSemibold }
});
