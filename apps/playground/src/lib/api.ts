import axios from "axios";
import { getApiBaseUrl, getApiTimeoutMs } from "./apiBaseUrl";

const API_BASE_URL = getApiBaseUrl();

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: getApiTimeoutMs(),
  headers: { "Content-Type": "application/json" },
});

export const api = apiClient;

apiClient.interceptors.request.use((config) => {
  config.headers["X-Forge-Client"] = "playground";
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isTimeout =
      error.code === "ECONNABORTED" ||
      error.message?.includes("timeout");
    const message = isTimeout
      ? "API is waking up (free tier). Wait up to a minute and refresh."
      : (error.response?.data?.message ??
        error.message ??
        "An unexpected API error occurred");
    return Promise.reject(new Error(message));
  },
);

export interface RegistryComponent {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  status: "stable" | "beta" | "deprecated";
  schemaFile: string;
  propsCount: number;
  hasTests: boolean;
  hasStories: boolean;
  createdBy?: string;
  authorName?: string;
  authorAvatar?: string;
  createdAt?: string;
  projectId?: string;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  icon: string;
}

export interface DesignToken {
  id: string;
  name: string;
  value: string;
  category: string;
}

export interface ForgeStats {
  id: string;
  totalComponents: number;
  stableComponents: number;
  betaComponents: number;
  totalDevelopers?: number;
  lastGenerated: string;
}

export interface RegistryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RegistryComponentsResponse {
  components: RegistryComponent[];
  pagination: RegistryPagination;
}

export interface FetchComponentsParams {
  projectId?: string;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export async function fetchComponents(
  params?: FetchComponentsParams,
): Promise<RegistryComponentsResponse> {
  const { data } = await apiClient.get<RegistryComponentsResponse>(
    "/api/registry/components",
    { params },
  );
  return data;
}

/** Fetch all registry pages (for client-side explorer filtering). */
export async function fetchAllComponents(
  params?: Omit<FetchComponentsParams, "page" | "limit">,
): Promise<RegistryComponent[]> {
  const limit = 100;
  let page = 1;
  const all: RegistryComponent[] = [];

  while (true) {
    const { components, pagination } = await fetchComponents({ ...params, page, limit });
    all.push(...components);
    if (page >= pagination.totalPages) break;
    page += 1;
  }

  return all;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/categories");
  return data;
}

export async function fetchTokens(): Promise<DesignToken[]> {
  const { data } = await apiClient.get<DesignToken[]>("/tokens");
  return data;
}

export async function fetchStats(): Promise<ForgeStats> {
  const { data } = await apiClient.get<ForgeStats | ForgeStats[]>("/stats");
  return Array.isArray(data) ? data[0]! : data;
}

export interface ComponentSourceFile {
  filename: string;
  language: string;
  content: string;
}

export interface ComponentSource {
  slug: string;
  files: ComponentSourceFile[];
}

export async function fetchComponentSource(slug: string): Promise<ComponentSource> {
  const { data } = await apiClient.get<ComponentSource>(`/api/components/${slug}/source`);
  return data;
}
