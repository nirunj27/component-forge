import { existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getCatalogItems } from "../packages/catalog/src/index.ts";
import { buildStarterSchema } from "../packages/catalog/src/buildSchema.ts";
import { serializeSchemaToYaml } from "../packages/schema/src/serialize.ts";

const schemasDir = join(dirname(fileURLToPath(import.meta.url)), "../schemas");
const items = getCatalogItems();

let written = 0;
let skipped = 0;

for (const item of items) {
  const filePath = join(schemasDir, `${item.slug}.schema.yaml`);
  if (existsSync(filePath)) {
    skipped++;
    continue;
  }

  const schema = buildStarterSchema(item.name, item.description, item.category, item.archetype);
  writeFileSync(filePath, serializeSchemaToYaml(schema), "utf-8");
  written++;
}

console.log(`Catalog seed: ${written} new schemas, ${skipped} already existed (${items.length} total)`);
