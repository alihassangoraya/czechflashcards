import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Animated, Easing } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { motion } from "../../../theme/design";

type Params = {
  consumedSwipe: MutableRefObject<boolean>;
  current: Card | null;
  revealed: boolean;
  onRevealChange: (revealed: boolean) => void;
};

export function useFlipAnimation({ consumedSwipe, current, revealed, onRevealChange }: Params) {
  const flipProgress = useRef(new Animated.Value(0)).current;
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    flipProgress.stopAnimation();
    flipProgress.setValue(revealed ? 1 : 0);
    setFlipping(false);
  }, [current?.id]);

  function flipCard() {
    if (consumedSwipe.current) {
      consumedSwipe.current = false;
      return;
    }
    if (!current || flipping) return;
    const nextRevealed = !revealed;
    setFlipping(true);
    Animated.timing(flipProgress, {
      toValue: nextRevealed ? 1 : 0,
      duration: motion.cardFlipDuration,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) onRevealChange(nextRevealed);
      setFlipping(false);
    });
  }

  return { flipCard, flipping, flipProgress };
}
