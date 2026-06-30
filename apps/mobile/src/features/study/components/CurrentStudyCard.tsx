import React from "react";
import type { Card } from "@czech-flashcards/shared";
import { StudyCardFaces, type StudyCardFacesProps } from "./StudyCardFaces";
import type { StudyCardProps } from "./studyCardTypes";

type Props = Omit<StudyCardProps, "cardRotation" | "current" | "dragX" | "panHandlers" | "swipeDirection"> & {
  current: Card;
};

function toStudyCardFacesProps({ savedCardIds, ...props }: Props): StudyCardFacesProps {
  return {
    ...props,
    isSaved: savedCardIds.has(props.current.id)
  };
}

export function CurrentStudyCard(props: Props) {
  return (
    <StudyCardFaces {...toStudyCardFacesProps(props)} />
  );
}
