import type { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";

export type StudyCardBackProps = {
  current: Card;
  currentSecondaryMeaning: string;
  flipProgress: Animated.Value;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
};
