import axios from "axios";
import type { ComponentSchema } from "@component-forge/schema";
import { api } from "./auth";

export { api };

export async function fetchSchemaSlugs(): Promise<string[]> {
  const { data } = await api.get<{ slugs: string[] }>("/api/schemas");
  return data.slugs;
}

export async function fetchSchema(slug: string): Promise<ComponentSchema> {
  const { data } = await api.get<ComponentSchema>(`/api/schemas/${slug}`);
  return data;
}

export async function saveSchema(schema: ComponentSchema, projectId?: string): Promise<void> {
  const slug = schema.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  await api.put(`/api/schemas/${slug}`, { ...schema, projectId });
}

export async function createSchema(schema: ComponentSchema, projectId?: string): Promise<void> {
  await api.post("/api/schemas", { ...schema, projectId });
}

export async function generateComponent(schema: ComponentSchema, projectId?: string): Promise<string[]> {
  const { data } = await api.post<{ files: string[] }>("/api/generate", { schema, projectId });
  return data.files;
}

export async function deleteComponent(slug: string): Promise<void> {
  await api.delete(`/api/schemas/${slug}`);
}

export async function validateSchema(
  schema: ComponentSchema,
): Promise<{ valid: boolean; errors?: string }> {
  try {
    await api.post("/api/validate", schema);
    return { valid: true };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const body = err.response.data as { errors?: string; message?: string };
      return { valid: false, errors: body.errors ?? body.message };
    }
    return { valid: false, errors: "Validation failed" };
  }
}
