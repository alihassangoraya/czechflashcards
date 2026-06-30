function hasBalancedParentheses(value) {
  const text = String(value || "");
  return (text.match(/\(/g) || []).length === (text.match(/\)/g) || []).length;
}

function hasDuplicateEquivalent(value) {
  const parts = String(value || "")
    .split(/[,،;؛]/)
    .map((part) => part.trim().replace(/[.!।۔]+$/g, ""))
    .filter(Boolean);
  return parts.length > 1 && new Set(parts).size !== parts.length;
}

module.exports = { hasBalancedParentheses, hasDuplicateEquivalent };
