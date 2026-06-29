import React from "react";
import { Text, type TextStyle } from "react-native";

const glyphs = {
  "account-circle": 59475,
  add: 57669,
  "add-circle-outline": 57672,
  "arrow-back": 58820,
  "arrow-forward": 58824,
  assignment: 59485,
  "auto-awesome": 58975,
  "auto-stories": 58982,
  bolt: 59915,
  bookmark: 59494,
  "bookmark-border": 59495,
  cancel: 58825,
  check: 58826,
  "check-circle": 59500,
  close: 58829,
  "cloud-done": 58047,
  "cloud-sync": 60250,
  "compare-arrows": 59669,
  "delete-outline": 59694,
  edit: 58313,
  "emoji-events": 59939,
  "expand-less": 58830,
  "expand-more": 58831,
  favorite: 59517,
  flight: 58681,
  flag: 57683,
  folder: 58055,
  "format-list-numbered": 57922,
  home: 59530,
  info: 59534,
  layers: 58683,
  "library-add": 57390,
  "local-fire-department": 61269,
  login: 60023,
  "manage-search": 61487,
  "menu-book": 59929,
  notifications: 59380,
  person: 59389,
  "person-outline": 59391,
  "play-arrow": 57399,
  psychology: 59978,
  quiz: 61516,
  refresh: 58837,
  remove: 57691,
  schedule: 59573,
  school: 59404,
  search: 59574,
  "search-off": 60022,
  settings: 59576,
  star: 59448,
  "swap-horiz": 59604,
  sync: 58919,
  "sync-problem": 58921,
  translate: 59618,
  "trending-up": 59621,
  tune: 58409,
  today: 59615,
  "volume-up": 57424,
  whatshot: 59406
} as const;

export type MaterialIconName = keyof typeof glyphs;

type Props = {
  name: MaterialIconName;
  size?: number;
  color?: string;
  style?: TextStyle;
};

export default function MaterialIcons({ name, size = 24, color = "currentColor", style }: Props) {
  return (
    <Text
      aria-hidden
      style={[
        {
          color,
          fontFamily: "MaterialIcons",
          fontSize: size,
          fontWeight: "400",
          lineHeight: size,
          textAlign: "center"
        },
        style
      ]}
    >
      {String.fromCharCode(glyphs[name])}
    </Text>
  );
}
