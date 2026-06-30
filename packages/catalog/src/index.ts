import type { ComponentSchema } from "@component-forge/schema";
import { buildStarterSchema, slugFromName, type CatalogArchetype } from "./buildSchema.js";
import { COMPONENT_GROUPS, CATALOG_CATEGORIES, type CatalogItemDef } from "./groups.js";

export interface CatalogItem {
  name: string;
  slug: string;
  description: string;
  category: string;
  categoryLabel: string;
  archetype: CatalogArchetype;
  groupIcon: string;
}

export function getCatalogItems(): CatalogItem[] {
  const items: CatalogItem[] = [];
  for (const group of COMPONENT_GROUPS) {
    for (const def of group.items) {
      const archetype = def.archetype ?? group.defaultArchetype;
      items.push({
        name: def.name,
        slug: slugFromName(def.name),
        description: def.description,
        category: group.id,
        categoryLabel: group.label,
        archetype,
        groupIcon: group.icon,
      });
    }
  }
  return items;
}

export function getStarterSchemaBySlug(slug: string): ComponentSchema | null {
  for (const group of COMPONENT_GROUPS) {
    for (const def of group.items) {
      if (slugFromName(def.name) === slug) {
        const archetype = def.archetype ?? group.defaultArchetype;
        return buildStarterSchema(def.name, def.description, group.id, archetype);
      }
    }
  }
  return null;
}

export function getStarterSchemaByName(name: string): ComponentSchema | null {
  for (const group of COMPONENT_GROUPS) {
    for (const def of group.items) {
      if (def.name === name) {
        const archetype = def.archetype ?? group.defaultArchetype;
        return buildStarterSchema(def.name, def.description, group.id, archetype);
      }
    }
  }
  return null;
}

export {
  COMPONENT_GROUPS,
  CATALOG_CATEGORIES,
  type CatalogItemDef,
  type ComponentGroupDef,
} from "./groups.js";

export { buildStarterSchema, slugFromName, type CatalogArchetype } from "./buildSchema.js";
