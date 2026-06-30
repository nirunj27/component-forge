import { definePlugin, type GeneratedFile, type GenerateContext } from "@component-forge/plugin-sdk";

export interface TestIdPluginOptions {
  /** Attribute value prefix. Default: kebab-case component name */
  prefix?: string;
  /** Also add to story files */
  includeStories?: boolean;
}

function toKebabCase(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function isComponentTsx(filename: string, includeStories: boolean): boolean {
  if (!filename.endsWith(".tsx")) return false;
  if (filename.endsWith(".test.tsx")) return false;
  if (filename.endsWith(".stories.tsx")) return includeStories;
  return true;
}

function injectTestId(content: string, testId: string): string {
  if (content.includes("data-testid")) return content;

  const withClassName = content.replace(
    /(className=\{[^}]+\})/,
    `$1 data-testid="${testId}"`,
  );
  if (withClassName !== content) return withClassName;

  return content.replace(
    /(return\s*\(\s*\n?\s*)(<[A-Za-z]\w*)/,
    `$1$2 data-testid="${testId}"`,
  );
}

export function testIdPlugin(options: TestIdPluginOptions = {}) {
  return definePlugin({
    name: "@component-forge/plugin-testid",
    version: "0.1.0",
    description: "Injects data-testid attributes into generated component TSX files",
    hooks: {
      transformFile(file: GeneratedFile, context: GenerateContext) {
        if (!isComponentTsx(file.filename, options.includeStories ?? false)) {
          return file;
        }

        const testId = options.prefix
          ? `${options.prefix}-${toKebabCase(context.schema.name)}`
          : toKebabCase(context.schema.name);

        return {
          ...file,
          content: injectTestId(file.content, testId),
        };
      },
    },
  });
}

export default testIdPlugin;
