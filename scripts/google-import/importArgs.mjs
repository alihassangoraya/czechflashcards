export function parseImportArgs(argv) {
  const offset = Number(argv.find((argument) => argument.startsWith("--offset="))?.split("=")[1]);
  const limit = Number(argv.find((argument) => argument.startsWith("--limit="))?.split("=")[1]);
  return {
    translate: argv.includes("--translate"),
    batchOffset: Math.max(0, offset || 0),
    batchLimit: Math.max(1, limit || Number.POSITIVE_INFINITY)
  };
}
