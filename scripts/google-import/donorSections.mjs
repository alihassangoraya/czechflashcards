export function donorSection(source, name, nextName) {
  const start = source.indexOf(`private fun ${name}`);
  const end = nextName ? source.indexOf(`private fun ${nextName}`, start) : source.length;
  return source.slice(start, end);
}
