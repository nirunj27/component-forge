import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getRepoRoot(): string {
  if (process.env.FORGE_ROOT) return process.env.FORGE_ROOT;
  return join(__dirname, "../../..");
}

export function getApiDataDir(): string {
  if (process.env.FORGE_API_DATA) return process.env.FORGE_API_DATA;
  return join(__dirname, "..");
}
