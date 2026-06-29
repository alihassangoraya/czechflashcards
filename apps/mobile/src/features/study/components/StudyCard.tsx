import React from "react";
import { Animated, GestureResponderHandlers, StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { size } from "../../../theme/design";
import { EmptyStudyCard } from "./EmptyStudyCard";
import { StudyCardActions } from "./StudyCardActions";
import { StudyCardBack } from "./StudyCardBack";
import { StudyCardFront } from "./StudyCardFront";
import { SwipeStamp } from "./SwipeStamp";

type SwipeDirection = "again" | "known";

type Props = {
  current: Card | null;
  currentSecondaryMeaning: string;
  savedCardIds: Set<string>;
  revealed: boolean;
  flipping: boolean;
  grading: boolean;
  swipeDirection: SwipeDirection | null;
  lastReviewCard: Card | null;
  dragX: Animated.Value;
  flipProgress: Animated.Value;
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  panHandlers: GestureResponderHandlers;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};

export function StudyCard({
  current,
  currentSecondaryMeaning,
  savedCardIds,
  revealed,
  flipping,
  grading,
  swipeDirection,
  lastReviewCard,
  dragX,
  flipProgress,
  cardRotation,
  panHandlers,
  meaningLanguage,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview
}: Props) {
  return (
    <View style={styles.cardFrame} {...panHandlers}>
      <Animated.View pointerEvents="box-none" style={[styles.cardMotion, { transform: [{ translateX: dragX }, { rotateZ: cardRotation }] }]}>
        {swipeDirection && <SwipeStamp direction={swipeDirection} />}
        {current ? (
          <>
            <StudyCardActions
              current={current}
              isSaved={savedCardIds.has(current.id)}
              showEdit={revealed && !flipping}
              onToggleSaved={onToggleSaved}
              onManageDecks={onManageDecks}
              onEditCard={onEditCard}
            />
            <StudyCardFront
              current={current}
              flipProgress={flipProgress}
              grading={grading}
              lastReviewCard={lastReviewCard}
              onFlipCard={onFlipCard}
              onCompleteSwipe={onCompleteSwipe}
              onUndoLastReview={onUndoLastReview}
            />
            <StudyCardBack
              current={current}
              currentSecondaryMeaning={currentSecondaryMeaning}
              flipProgress={flipProgress}
              meaningLanguage={meaningLanguage}
              onFlipCard={onFlipCard}
            />
          </>
        ) : (
          <EmptyStudyCard />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardFrame: { position: "relative", height: size.cardHeight },
  cardMotion: { ...StyleSheet.absoluteFillObject }
});
