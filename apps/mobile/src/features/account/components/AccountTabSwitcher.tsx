import React from "react";
import { Pressable, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { accountTabSwitcherStyles as styles } from "./accountTabSwitcherStyles";
import { accountTabs, type AccountTabId } from "./accountTabs";

type Props = {
  activeTab: AccountTabId;
  onChangeTab: (tab: AccountTabId) => void;
};

export function AccountTabSwitcher({ activeTab, onChangeTab }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.shell}>
      {accountTabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChangeTab(tab)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <Text style={[styles.tabText, active && styles.activeTabText]}>{t(`account.tab.${tab}`)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
