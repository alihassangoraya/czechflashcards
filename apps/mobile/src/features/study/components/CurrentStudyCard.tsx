import React from "react";
import { StudyCardFaces } from "./StudyCardFaces";
import type { CurrentStudyCardProps } from "./currentStudyCardTypes";
import type { StudyCardFacesProps } from "./studyCardFacesTypes";

function toStudyCardFacesProps({ savedCardIds, ...props }: CurrentStudyCardProps): StudyCardFacesProps {
  return {
    ...props,
    isSaved: savedCardIds.has(props.current.id)
  };
}

export function CurrentStudyCard(props: CurrentStudyCardProps) {
  return (
    <StudyCardFaces {...toStudyCardFacesProps(props)} />
  );
}
