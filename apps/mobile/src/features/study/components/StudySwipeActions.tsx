import { Pressable, Text, View, type ViewStyle } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { studySwipeActionStyles as styles } from "./studySwipeActionStyles";
import type { StudySwipeActionsProps } from "./studySwipeActionTypes";

export function StudySwipeActions({ grading, onCompleteSwipe }: StudySwipeActionsProps) {
  const { direction, t } = useI18n();
  const rtl = direction === "rtl";
  const fixedOrder = { direction: "ltr" } as ViewStyle;

  return (
    <View style={[styles.actions, fixedOrder]}>
      <Pressable
        disabled={grading}
        style={[styles.button, styles.again, grading && styles.disabled]}
        onPress={(event) => { event.stopPropagation(); onCompleteSwipe("again"); }}
        accessibilityRole="button"
        accessibilityLabel={t("study.markAgain")}
      >
        {rtl ? <Text style={[styles.text, styles.againText]}>{t("review.again")}</Text> : null}
        <MaterialIcons name="arrow-back" size={size.icon} color={colors.iconDanger} />
        {rtl ? null : <Text style={[styles.text, styles.againText]}>{t("review.again")}</Text>}
      </Pressable>
      <Pressable
        disabled={grading}
        style={[styles.button, styles.known, grading && styles.disabled]}
        onPress={(event) => { event.stopPropagation(); onCompleteSwipe("known"); }}
        accessibilityRole="button"
        accessibilityLabel={t("study.markKnown")}
      >
        {rtl ? <MaterialIcons name="arrow-forward" size={size.icon} color={colors.iconSuccess} /> : null}
        <Text style={[styles.text, styles.knownText]}>{t("review.easy")}</Text>
        {rtl ? null : <MaterialIcons name="arrow-forward" size={size.icon} color={colors.iconSuccess} />}
      </Pressable>
    </View>
  );
}
