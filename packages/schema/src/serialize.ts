import { stringify } from "yaml";
import { componentSchema, type ComponentSchema } from "./definitions.js";

export function serializeSchemaToYaml(schema: ComponentSchema): string {
  const validated = componentSchema.parse(schema);
  const payload = JSON.parse(JSON.stringify(validated)) as Record<string, unknown>;

  if (payload.props && Object.keys(payload.props as object).length === 0) {
    delete payload.props;
  }
  if (Array.isArray(payload.slots) && payload.slots.length === 0) {
    delete payload.slots;
  }
  if (Array.isArray(payload.events) && payload.events.length === 0) {
    delete payload.events;
  }
  if (!payload.options) {
    delete payload.options;
  }
  if (!payload.a11y) {
    delete payload.a11y;
  }

  return stringify(payload, { lineWidth: 0 });
}
