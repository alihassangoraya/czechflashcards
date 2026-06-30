import React from "react";
import { StudyCard } from "./StudyCard";
import { buildStudyCardProps } from "./studyCardPropsAdapter";
import type { StudyContentCardProps } from "./studyContentCardTypes";

export function StudyContentCard(props: StudyContentCardProps) {
  return <StudyCard {...buildStudyCardProps(props)} />;
}
