#!/usr/bin/env node

import { resolve, join } from "node:path";
import { readdir } from "node:fs/promises";
import { Command } from "commander";
import chalk from "chalk";
import { generateFromSchemaFile, loadPlugins } from "@component-forge/engine";
import { listPlugins } from "@component-forge/plugin-sdk";

const program = new Command();

program
  .name("forge")
  .description("Component Forge — schema-driven React component generator")
  .version("0.1.0");

program
  .command("generate")
  .description("Generate React component files from a schema")
  .argument("[schema]", "Path to schema file (.yaml, .yml, .json)")
  .option("-o, --out <dir>", "Output directory", "./packages/ui/src/components")
  .option("--all", "Generate all schemas from ./schemas directory")
  .option("--schemas <dir>", "Schemas directory (used with --all)", "./schemas")
  .option("--dry-run", "Preview files without writing")
  .option("-c, --config <dir>", "Directory containing forge.config.ts", process.cwd())
  .action(async (schemaArg: string | undefined, options) => {
    try {
      const outputDir = resolve(options.out);
      const configDir = resolve(options.config);

      if (options.all) {
        const schemasDir = resolve(options.schemas);
        const entries = await readdir(schemasDir);
        const schemaFiles = entries.filter((f) =>
          /\.schema\.(ya?ml|json)$/i.test(f),
        );

        if (schemaFiles.length === 0) {
          console.log(chalk.yellow("No schema files found in ./schemas"));
          process.exit(1);
        }

        console.log(
          chalk.bold(`\n🔨 Component Forge — generating ${schemaFiles.length} component(s)\n`),
        );

        for (const file of schemaFiles) {
          const schemaPath = join(schemasDir, file);
          await runGenerate(schemaPath, outputDir, configDir, options.dryRun);
        }

        console.log(chalk.green("\n✓ All components generated successfully\n"));
        return;
      }

      if (!schemaArg) {
        console.error(chalk.red("Error: provide a schema file or use --all"));
        process.exit(1);
      }

      const schemaPath = resolve(schemaArg);
      console.log(chalk.bold("\n🔨 Component Forge\n"));
      await runGenerate(schemaPath, outputDir, configDir, options.dryRun);
      console.log(chalk.green("\n✓ Done\n"));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(chalk.red(`\n✗ ${message}\n`));
      process.exit(1);
    }
  });

program
  .command("plugins")
  .description("List plugins from forge.config.ts")
  .option("-c, --config <dir>", "Config directory", process.cwd())
  .action(async (options) => {
    try {
      const plugins = await loadPlugins(resolve(options.config));
      if (plugins.length === 0) {
        console.log(chalk.yellow("\nNo plugins configured. Add forge.config.ts at project root.\n"));
        return;
      }
      console.log(chalk.bold(`\n🔌 Component Forge plugins (${plugins.length})\n`));
      for (const p of listPlugins(plugins)) {
        console.log(chalk.cyan(`  ${p.name}`) + chalk.gray(` v${p.version}`));
        if (p.description) console.log(chalk.gray(`    ${p.description}`));
        if (p.hooks.length > 0) {
          console.log(chalk.gray(`    hooks: ${p.hooks.join(", ")}`));
        }
      }
      console.log();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(chalk.red(`\n✗ ${message}\n`));
      process.exit(1);
    }
  });

program
  .description("Show quick-start instructions")
  .action(() => {
    console.log(`
${chalk.bold("Component Forge — Quick Start")}

1. Define a schema in ${chalk.cyan("schemas/button.schema.yaml")}
2. Generate components:
   ${chalk.cyan("pnpm generate:all")}
3. Import in your app:
   ${chalk.cyan('import { Button } from "@component-forge/ui/button"')}

Schema format:
  name: Button          # PascalCase component name
  props:                # typed props with defaults
    variant:
      type: enum
      values: [primary, secondary]
  slots:                # React children slots
    - name: children
      required: true
  events:               # event handlers
    - onClick
  a11y:                 # accessibility defaults
    role: button
    keyboard: [Enter, Space]
`);
  });

async function runGenerate(
  schemaPath: string,
  outputDir: string,
  configDir: string,
  dryRun?: boolean,
): Promise<void> {
  const result = await generateFromSchemaFile(schemaPath, {
    outputDir,
    dryRun,
    configDir,
  });

  console.log(chalk.cyan(`  ${result.schema.name}`));
  if (dryRun) {
    console.log(chalk.gray("  (dry run — no files written)"));
  }

  for (const file of result.files) {
    console.log(chalk.gray(`    → ${file.filename}`));
  }

  if (!dryRun) {
    console.log(chalk.gray(`    📁 ${result.written[0]?.replace(/[/\\][^/\\]+$/, "") ?? outputDir}`));
  }
}

program.parse();
