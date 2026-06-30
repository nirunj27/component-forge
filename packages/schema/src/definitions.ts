import { z } from "zod";

const propTypeSchema = z.enum(["string", "number", "boolean", "enum"]);

const propDefinitionSchema = z
  .object({
    type: propTypeSchema,
    values: z.array(z.string()).optional(),
    default: z.union([z.string(), z.number(), z.boolean()]).optional(),
    required: z.boolean().optional(),
    description: z.string().optional(),
  })
  .superRefine((prop, ctx) => {
    if (prop.type === "enum" && (!prop.values || prop.values.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enum props must define at least one value in `values`",
      });
    }
  });

const slotSchema = z.object({
  name: z.string().min(1),
  required: z.boolean().optional().default(false),
  description: z.string().optional(),
});

const a11ySchema = z.object({
  role: z.string().optional(),
  keyboard: z.array(z.string()).optional(),
  aria: z.array(z.string()).optional(),
});

const selectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const componentSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[A-Z][a-zA-Z0-9]*$/, "Component name must be PascalCase"),
  description: z.string().optional(),
  category: z.string().optional(),
  props: z.record(propDefinitionSchema).optional().default({}),
  slots: z.array(slotSchema).optional().default([]),
  events: z.array(z.string()).optional().default([]),
  options: z.array(selectOptionSchema).optional(),
  a11y: a11ySchema.optional(),
});

export type ComponentSchema = z.infer<typeof componentSchema>;
export type PropDefinition = z.infer<typeof propDefinitionSchema>;
export type SlotDefinition = z.infer<typeof slotSchema>;
export type SelectOption = z.infer<typeof selectOptionSchema>;
