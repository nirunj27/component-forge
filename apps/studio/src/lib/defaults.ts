import {
  CATALOG_CATEGORIES,
  getStarterSchemaByName,
  slugFromName,
} from "@component-forge/catalog";
import type { ComponentSchema } from "@component-forge/schema";

/** Legacy categories used by early schemas — kept for backward compatibility */
export const LEGACY_CATEGORIES = ["inputs", "display", "layout", "overlay"] as const;

export const CATEGORIES = [
  ...CATALOG_CATEGORIES.map((c) => c.slug),
  ...LEGACY_CATEGORIES.filter(
    (legacy) => !CATALOG_CATEGORIES.some((c) => c.slug === legacy),
  ),
] as const;

export const EVENT_OPTIONS = ["onClick", "onChange", "onBlur", "onClose", "onFocus", "onSubmit"] as const;

export const A11Y_ROLES = [
  "button",
  "textbox",
  "combobox",
  "dialog",
  "region",
  "status",
] as const;

export function createEmptySchema(): ComponentSchema {
  return {
    name: "NewComponent",
    description: "",
    category: "forms",
    props: {},
    slots: [{ name: "children", required: true }],
    events: [],
  };
}

export function createSchemaFromCatalog(name: string): ComponentSchema {
  return getStarterSchemaByName(name) ?? createEmptySchema();
}

export { slugFromName };
