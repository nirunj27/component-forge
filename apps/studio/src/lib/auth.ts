import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers["X-Forge-Client"] = "studio";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    const message =
      error.response?.data?.message ?? error.message ?? "Request failed";
    return Promise.reject(new Error(message));
  },
);

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "developer" | "viewer";
  avatar: string;
  createdAt: string;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<{ token: string; user: AuthUser }>("/api/auth/login", {
    email,
    password,
  });
  return data;
}

export async function register(input: {
  email: string;
  password: string;
  name: string;
  avatar: string;
}) {
  const { data } = await api.post<{ token: string; user: AuthUser }>("/api/auth/register", input);
  return data;
}

export async function fetchAvatars(excludeUserId?: string): Promise<string[]> {
  const { data } = await api.get<{ avatars: string[] }>("/api/auth/avatars", {
    params: excludeUserId ? { excludeUserId } : {},
  });
  return data.avatars;
}

export async function fetchUsers(): Promise<AuthUser[]> {
  const { data } = await api.get<{ users: AuthUser[] }>("/api/users");
  return data.users;
}

export async function updateUserApi(
  id: string,
  patch: Partial<{ name: string; email: string; role: string; avatar: string; password: string }>,
) {
  const { data } = await api.put<{ user: AuthUser; message?: string }>(`/api/users/${id}`, patch);
  return data;
}

export async function deleteUserApi(id: string) {
  await api.delete(`/api/users/${id}`);
}

export interface RegistryComponent {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  status: string;
  createdBy: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdBy: string;
  memberIds: string[];
  createdAt: string;
}

export async function fetchRegistryComponents(
  mine?: boolean,
  userId?: string,
  projectId?: string,
) {
  const { data } = await api.get<{ components: RegistryComponent[]; pagination?: unknown }>(
    "/api/registry/components",
    { params: { ...(mine ? { mine: "true", userId } : {}), ...(projectId ? { projectId } : {}) } },
  );
  return data.components;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await api.get<{ projects: Project[] }>("/api/projects");
  return data.projects;
}

export async function createProjectApi(input: {
  name: string;
  description: string;
  memberIds: string[];
}) {
  const { data } = await api.post<{ project: Project }>("/api/projects", input);
  return data.project;
}

export async function deleteProjectApi(id: string) {
  await api.delete(`/api/projects/${id}`);
}
