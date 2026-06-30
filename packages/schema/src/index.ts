import { z } from "zod";
import {
  componentSchema,
  type ComponentSchema,
  type PropDefinition,
  type SlotDefinition,
  type SelectOption,
} from "./definitions.js";

export type { ComponentSchema, PropDefinition, SlotDefinition, SelectOption };
export { componentSchema };

export function parseComponentSchema(input: unknown): ComponentSchema {
  return componentSchema.parse(input);
}

export function safeParseComponentSchema(input: unknown) {
  return componentSchema.safeParse(input);
}

export function formatValidationErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "root";
      return `  - ${path}: ${issue.message}`;
    })
    .join("\n");
}

export { serializeSchemaToYaml } from "./serialize.js";
