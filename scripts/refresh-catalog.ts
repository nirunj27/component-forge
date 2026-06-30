import { existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getCatalogItems } from "../packages/catalog/src/index.ts";
import { buildStarterSchema } from "../packages/catalog/src/buildSchema.ts";
import { serializeSchemaToYaml } from "../packages/schema/src/serialize.ts";

/** Original hand-tuned schemas — never overwrite on refresh */
const PROTECTED_SLUGS = new Set([
  "button",
  "input",
  "select",
  "badge",
  "card",
  "modal",
]);

const schemasDir = join(dirname(fileURLToPath(import.meta.url)), "../schemas");
const items = getCatalogItems();

let refreshed = 0;
let skipped = 0;

for (const item of items) {
  if (PROTECTED_SLUGS.has(item.slug)) {
    skipped++;
    continue;
  }
  const schema = buildStarterSchema(item.name, item.description, item.category, item.archetype);
  const filePath = join(schemasDir, `${item.slug}.schema.yaml`);
  writeFileSync(filePath, serializeSchemaToYaml(schema), "utf-8");
  refreshed++;
}

console.log(`Refreshed ${refreshed} catalog schemas (${skipped} protected)`);
