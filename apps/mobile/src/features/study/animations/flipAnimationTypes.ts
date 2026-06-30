import type { MutableRefObject } from "react";
import type { Card } from "@czech-flashcards/shared";

export type FlipAnimationParams = {
  consumedSwipe: MutableRefObject<boolean>;
  current: Card | null;
  revealed: boolean;
  onRevealChange: (revealed: boolean) => void;
};
