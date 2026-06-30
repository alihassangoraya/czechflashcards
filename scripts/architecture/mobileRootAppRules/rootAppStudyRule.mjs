export function inspectRootAppStudy(rel, violations) {
  if (rel.match(/^app\/useStudy(?:Queue|Session)\.ts$/)) {
    violations.rootAppStudy.push(`${rel}: move app study modules into app/study/, app/studyQueue/, or app/studySession/`);
  }
}
