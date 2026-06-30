export function inspectRootAppFeedback(rel, violations) {
  if (rel === "app/useToast.ts") {
    violations.rootAppFeedback.push(`${rel}: move app feedback modules into app/feedback/`);
  }
}
