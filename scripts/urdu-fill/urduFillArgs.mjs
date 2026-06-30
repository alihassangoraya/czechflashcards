export function readLimit(argv) {
  const limitArg = argv.find((argument) => argument.startsWith("--limit="));
  return limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : Number.POSITIVE_INFINITY;
}
