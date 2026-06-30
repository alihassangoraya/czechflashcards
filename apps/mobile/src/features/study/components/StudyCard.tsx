import React from "react";
import { CurrentStudyCard } from "./CurrentStudyCard";
import { EmptyStudyCard } from "./EmptyStudyCard";
import { StudyCardMotion } from "./StudyCardMotion";
import type { StudyCardProps } from "./studyCardTypes";

export function StudyCard({
  current,
  swipeDirection,
  dragX,
  cardRotation,
  panHandlers,
  ...currentCardProps
}: StudyCardProps) {
  return (
    <StudyCardMotion cardRotation={cardRotation} dragX={dragX} panHandlers={panHandlers} swipeDirection={swipeDirection}>
      {current ? (
        <CurrentStudyCard
          current={current}
          {...currentCardProps}
        />
      ) : (
        <EmptyStudyCard />
      )}
    </StudyCardMotion>
  );
}
