import type { ComponentSchema } from "@component-forge/schema";

export interface GeneratedFile {
  filename: string;
  content: string;
}

export interface GenerateContext {
  schema: ComponentSchema;
  outputDir: string;
  files: GeneratedFile[];
}

export interface ForgePluginHooks {
  /** Run before templates are generated. Return a new schema to replace it. */
  beforeGenerate?(schema: ComponentSchema): ComponentSchema | void;
  /** Transform each generated file (runs per plugin, in registration order). */
  transformFile?(file: GeneratedFile, context: GenerateContext): GeneratedFile | void;
  /** Run after all transforms. Return a new file list to replace it. */
  afterGenerate?(context: GenerateContext): GeneratedFile[] | void;
}

export interface ForgePlugin {
  name: string;
  version: string;
  description?: string;
  hooks?: ForgePluginHooks;
}

export interface ForgeConfig {
  plugins?: ForgePlugin[];
}

export function definePlugin(plugin: ForgePlugin): ForgePlugin {
  if (!plugin.name?.trim()) {
    throw new Error("Plugin must have a name");
  }
  if (!plugin.version?.trim()) {
    throw new Error(`Plugin "${plugin.name}" must have a version`);
  }
  return plugin;
}

export function defineConfig(config: ForgeConfig): ForgeConfig {
  return config;
}

/**
 * Apply all plugin hooks to a schema and generated files.
 */
export function applyPlugins(
  schema: ComponentSchema,
  files: GeneratedFile[],
  plugins: ForgePlugin[],
  outputDir: string,
): { schema: ComponentSchema; files: GeneratedFile[] } {
  let currentSchema = schema;
  let currentFiles = [...files];

  for (const plugin of plugins) {
    const next = plugin.hooks?.beforeGenerate?.(currentSchema);
    if (next) currentSchema = next;
  }

  for (const plugin of plugins) {
    const context: GenerateContext = {
      schema: currentSchema,
      outputDir,
      files: currentFiles,
    };

    if (plugin.hooks?.transformFile) {
      currentFiles = currentFiles.map((file) => {
        const transformed = plugin.hooks!.transformFile!(file, {
          ...context,
          files: currentFiles,
        });
        return transformed ?? file;
      });
    }

    if (plugin.hooks?.afterGenerate) {
      const next = plugin.hooks.afterGenerate({
        schema: currentSchema,
        outputDir,
        files: currentFiles,
      });
      if (next) currentFiles = next;
    }
  }

  return { schema: currentSchema, files: currentFiles };
}

export function listPlugins(plugins: ForgePlugin[]): Array<{
  name: string;
  version: string;
  description?: string;
  hooks: string[];
}> {
  return plugins.map((p) => ({
    name: p.name,
    version: p.version,
    description: p.description,
    hooks: Object.keys(p.hooks ?? {}),
  }));
}
