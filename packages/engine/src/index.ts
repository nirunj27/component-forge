import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";
import {
  parseComponentSchema,
  safeParseComponentSchema,
  formatValidationErrors,
  serializeSchemaToYaml,
  type ComponentSchema,
} from "@component-forge/schema";
import {
  generateAllTemplates,
  getComponentFolderName,
  type GeneratedFile,
} from "@component-forge/templates-react";
import { applyPlugins, type ForgePlugin } from "@component-forge/plugin-sdk";
import { loadPlugins, loadForgeConfig } from "./config.js";

export { serializeSchemaToYaml };

export interface GenerateOptions {
  outputDir: string;
  dryRun?: boolean;
  force?: boolean;
  /** Explicit plugin list (overrides forge.config.ts) */
  plugins?: ForgePlugin[];
  /** Directory to resolve forge.config.ts from */
  configDir?: string;
}

export interface GenerateResult {
  schema: ComponentSchema;
  outputDir: string;
  files: GeneratedFile[];
  written: string[];
}

export async function loadSchemaFromFile(
  schemaPath: string,
): Promise<ComponentSchema> {
  const raw = await readFile(schemaPath, "utf-8");
  const ext = schemaPath.split(".").pop()?.toLowerCase();

  let parsed: unknown;
  if (ext === "yaml" || ext === "yml") {
    parsed = parseYaml(raw);
  } else if (ext === "json") {
    parsed = JSON.parse(raw);
  } else {
    throw new Error(
      `Unsupported schema format: .${ext}. Use .yaml, .yml, or .json`,
    );
  }

  const result = safeParseComponentSchema(parsed);
  if (!result.success) {
    throw new Error(
      `Invalid component schema:\n${formatValidationErrors(result.error)}`,
    );
  }

  return result.data;
}

export function generateFiles(
  schema: ComponentSchema,
  plugins: ForgePlugin[] = [],
  outputDir = "",
): GeneratedFile[] {
  const baseFiles = generateAllTemplates(schema);
  const { files } = applyPlugins(schema, baseFiles, plugins, outputDir);
  return files;
}

export async function resolvePlugins(options: GenerateOptions): Promise<ForgePlugin[]> {
  if (options.plugins) return options.plugins;
  return loadPlugins(options.configDir ?? process.cwd());
}

export async function writeGeneratedFiles(
  schema: ComponentSchema,
  files: GeneratedFile[],
  options: GenerateOptions,
): Promise<string[]> {
  const componentDir = join(
    resolve(options.outputDir),
    getComponentFolderName(schema.name),
  );
  const written: string[] = [];

  if (!options.dryRun) {
    await mkdir(componentDir, { recursive: true });
  }

  for (const file of files) {
    const filePath = join(componentDir, file.filename);
    if (!options.dryRun) {
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, file.content, "utf-8");
    }
    written.push(filePath);
  }

  return written;
}

export async function generateFromSchemaFile(
  schemaPath: string,
  options: GenerateOptions,
): Promise<GenerateResult> {
  const schema = await loadSchemaFromFile(schemaPath);
  const plugins = await resolvePlugins(options);
  const files = generateFiles(schema, plugins, options.outputDir);
  const written = await writeGeneratedFiles(schema, files, options);

  return { schema, outputDir: options.outputDir, files, written };
}

export async function generateFromSchema(
  schema: ComponentSchema,
  options: GenerateOptions,
): Promise<GenerateResult> {
  const validated = parseComponentSchema(schema);
  const plugins = await resolvePlugins(options);
  const files = generateFiles(validated, plugins, options.outputDir);
  const written = await writeGeneratedFiles(validated, files, options);

  return {
    schema: validated,
    outputDir: options.outputDir,
    files,
    written,
  };
}

export async function saveSchemaToFile(
  schema: ComponentSchema,
  schemaDir: string,
): Promise<string> {
  const validated = parseComponentSchema(schema);
  const slug = getComponentFolderName(validated.name);
  const filePath = join(resolve(schemaDir), `${slug}.schema.yaml`);
  await writeFile(filePath, serializeSchemaToYaml(validated), "utf-8");
  return filePath;
}

export async function loadSchemaBySlug(
  slug: string,
  schemaDir: string,
): Promise<ComponentSchema> {
  const filePath = join(resolve(schemaDir), `${slug}.schema.yaml`);
  return loadSchemaFromFile(filePath);
}

export async function listSchemaSlugs(schemaDir: string): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(resolve(schemaDir));
  return entries
    .filter((f) => f.endsWith(".schema.yaml"))
    .map((f) => f.replace(".schema.yaml", ""));
}

export { getComponentFolderName, loadPlugins, loadForgeConfig };
export type { ComponentSchema, GeneratedFile, ForgePlugin };
