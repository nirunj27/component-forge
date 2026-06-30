import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createJiti } from "jiti";
import type { ForgeConfig, ForgePlugin } from "@component-forge/plugin-sdk";

const CONFIG_FILES = [
  "forge.config.ts",
  "forge.config.mts",
  "forge.config.js",
  "forge.config.mjs",
];

export async function loadForgeConfig(cwd = process.cwd()): Promise<ForgeConfig> {
  const jiti = createJiti(import.meta.url, { interopDefault: true });

  for (const file of CONFIG_FILES) {
    const configPath = resolve(cwd, file);
    if (!existsSync(configPath)) continue;

    try {
      const loaded = await jiti.import<ForgeConfig>(configPath);
      return loaded ?? {};
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load ${file}: ${message}`);
    }
  }

  return {};
}

export async function loadPlugins(cwd = process.cwd()): Promise<ForgePlugin[]> {
  const config = await loadForgeConfig(cwd);
  return config.plugins ?? [];
}
