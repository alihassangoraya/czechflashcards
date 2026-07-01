import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { grammarInfoCardStyles as styles } from "./grammarInfoCardStyles";

type Props = {
  icon: MaterialIconName;
  label: string;
  text: string;
  tone?: "primary" | "success" | "danger" | "gold";
};

const toneColor = {
  primary: colors.iconPrimary,
  success: colors.iconSuccess,
  danger: colors.iconDanger,
  gold: colors.iconWarning
};

export function GrammarInfoCard({ icon, label, text, tone = "primary" }: Props) {
  const { textAlign } = useI18n();
  const color = toneColor[tone];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconTile}>
          <MaterialIcons name={icon} size={size.iconSmall} color={color} />
        </View>
        <Text style={[styles.label, { color, textAlign }]}>{label}</Text>
      </View>
      <Text style={[styles.text, { textAlign }]}>{text}</Text>
    </View>
  );
}
