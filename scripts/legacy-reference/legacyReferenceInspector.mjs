import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function inspectLegacyReference(root, rules) {
  const violations = [];

  for (const rule of rules) {
    const content = await readFile(join(root, rule.file), "utf8");
    inspectRequiredTokens(rule, content, violations);
    inspectForbiddenTokens(rule, content, violations);
  }

  return violations;
}

function inspectRequiredTokens(rule, content, violations) {
  for (const token of rule.required || []) {
    if (!content.includes(token)) violations.push(`${rule.file}: missing ${JSON.stringify(token)}. ${rule.message}`);
  }
}

function inspectForbiddenTokens(rule, content, violations) {
  for (const token of rule.forbidden || []) {
    if (content.includes(token)) violations.push(`${rule.file}: forbidden ${JSON.stringify(token)}. ${rule.message}`);
  }
}
