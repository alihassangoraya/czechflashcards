import { readdir, readFile } from "node:fs/promises";
import { relative, join } from "node:path";

export async function collectSourceFiles(directory, options = {}) {
  const ignoredDirectories = options.ignoredDirectories || new Set();
  const extensionPattern = options.extensionPattern || /\.(ts|tsx|js|mjs)$/;
  const files = [];

  async function collect(currentDirectory) {
    for (const entry of await readdir(currentDirectory, { withFileTypes: true })) {
      if (ignoredDirectories.has(entry.name)) continue;
      const path = join(currentDirectory, entry.name);
      if (entry.isDirectory()) await collect(path);
      if (entry.isFile() && extensionPattern.test(entry.name)) files.push(path);
    }
  }

  await collect(directory);
  return files;
}

export async function readSourceFile(root, file) {
  const content = await readFile(file, "utf8");
  return {
    content,
    file,
    lines: content.split("\n"),
    rel: relative(root, file)
  };
}
