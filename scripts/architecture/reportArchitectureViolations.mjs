import { mobileViolationMessages } from "./mobileViolationMessages.mjs";

export function reportMobileArchitectureViolations(violations) {
  let failed = false;
  for (const [key, message] of mobileViolationMessages) {
    if (!violations[key].length) continue;
    failed = true;
    console.error(message);
    console.error(violations[key].join("\n"));
  }

  if (failed) process.exit(1);
}
