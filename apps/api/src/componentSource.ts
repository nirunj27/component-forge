import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export interface SourceFile {
  filename: string;
  language: string;
  content: string;
}

const LANGUAGE_BY_EXT: Record<string, string> = {
  ".tsx": "tsx",
  ".ts": "typescript",
  ".css": "css",
  ".md": "markdown",
};

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function fileSortKey(filename: string): number {
  if (filename.endsWith(".tsx") && !filename.includes(".test.") && !filename.includes(".stories.")) {
    return 0;
  }
  if (filename.endsWith(".module.css")) return 1;
  if (filename === "index.ts") return 2;
  if (filename.includes(".stories.")) return 3;
  if (filename.includes(".test.")) return 4;
  if (filename.endsWith(".md")) return 5;
  return 6;
}

export async function loadComponentSource(
  outputDir: string,
  slug: string,
): Promise<{ slug: string; files: SourceFile[] }> {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error("Invalid component slug");
  }

  const dir = join(outputDir, slug);
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    throw new Error(`Generated files not found for "${slug}" — generate the component in Studio first`);
  }

  const files: SourceFile[] = [];
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = entry.name.slice(entry.name.lastIndexOf("."));
    if (!LANGUAGE_BY_EXT[ext]) continue;
    const content = await readFile(join(dir, entry.name), "utf-8");
    files.push({
      filename: entry.name,
      language: LANGUAGE_BY_EXT[ext]!,
      content,
    });
  }

  files.sort((a, b) => fileSortKey(a.filename) - fileSortKey(b.filename));

  if (files.length === 0) {
    throw new Error(`No generated source files for "${slug}"`);
  }

  return { slug, files };
}
