const literalColor = /#[0-9a-f]{3,8}\b|rgba?\(/i;
const literalFontWeight = /fontWeight:\s*["'][^"']+["']/;
const literalTypographyMetric = /(fontSize|lineHeight):\s*\d/;
const literalLetterSpacing = /letterSpacing:\s*(-?\d+(?:\.\d+)?)/;
const literalLayoutMetric =
  /\b(gap|rowGap|columnGap|margin|marginTop|marginBottom|marginHorizontal|marginVertical|marginLeft|marginRight|padding|paddingTop|paddingBottom|paddingHorizontal|paddingVertical|paddingLeft|paddingRight|width|height|minWidth|maxWidth|minHeight|maxHeight|borderRadius|borderWidth|borderTopWidth|borderBottomWidth|top|left|right|bottom|zIndex):\s*(-?\d+(?:\.\d+)?)/;
const literalMotionMetric = /\b(duration|perspective):\s*(-?\d+(?:\.\d+)?)/;
const literalIconSize = /\bsize=\{(\d+(?:\.\d+)?)\}/;

export function inspectMobileThemeFile(source, violations, options = {}) {
  source.lines.forEach((line, index) => {
    inspectThemeLine(line, `${source.file}:${index + 1}`, violations, options);
  });
}

function inspectThemeLine(line, location, violations, options) {
  if (literalColor.test(line)) violations.colors.push(location);
  if (!options.allowFontWeightLiterals && literalFontWeight.test(line)) violations.fontWeights.push(location);
  if (!options.allowFontWeightLiterals && literalTypographyMetric.test(line)) violations.typographyMetrics.push(location);

  const letterSpacingMatch = line.match(literalLetterSpacing);
  if (letterSpacingMatch && Number(letterSpacingMatch[1]) !== 0) violations.letterSpacing.push(location);

  const layoutMatch = line.match(literalLayoutMetric);
  if (layoutMatch && Number(layoutMatch[2]) !== 0) violations.layoutMetrics.push(location);

  const motionMatch = line.match(literalMotionMetric);
  if (motionMatch && Number(motionMatch[2]) !== 0) violations.motionMetrics.push(location);

  const iconSizeMatch = line.match(literalIconSize);
  if (iconSizeMatch && Number(iconSizeMatch[1]) !== 0) violations.iconSizes.push(location);
}
