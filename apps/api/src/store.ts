import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import bcrypt from "bcryptjs";
import { getCatalogItems, CATALOG_CATEGORIES } from "@component-forge/catalog";
import { AVATAR_PORTRAITS, isAvatarId } from "./avatars.js";
import { getApiDataDir } from "./paths.js";

const USERS_PATH = join(getApiDataDir(), "users.json");
const DB_PATH = join(getApiDataDir(), "db.json");

export type UserRole = "admin" | "developer" | "viewer";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

export interface RegistryComponent {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  status: "stable" | "beta" | "draft";
  schemaFile: string;
  propsCount: number;
  hasTests: boolean;
  hasStories: boolean;
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

interface DbData {
  components: RegistryComponent[];
  projects: Project[];
  categories: unknown[];
  tokens: unknown[];
  stats: Record<string, unknown>;
  developers?: unknown[];
}

interface UsersData {
  users: User[];
}

export const AVATAR_OPTIONS = AVATAR_PORTRAITS.map((a) => a.id);

export function toPublicUser(user: User): PublicUser {
  const { password: _, ...rest } = user;
  return rest;
}

async function readUsers(): Promise<UsersData> {
  const raw = await readFile(USERS_PATH, "utf-8");
  return JSON.parse(raw) as UsersData;
}

async function writeUsers(data: UsersData): Promise<void> {
  await writeFile(USERS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

async function readDb(): Promise<DbData> {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as DbData;
}

async function writeDb(data: DbData): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function enforceSingleAdmin(): Promise<void> {
  const data = await readUsers();
  const admins = data.users.filter((u) => u.role === "admin");
  if (admins.length <= 1) return;

  const keepId = admins[0]!.id;
  let changed = false;
  data.users = data.users.map((u) => {
    if (u.role === "admin" && u.id !== keepId) {
      changed = true;
      return { ...u, role: "developer" as UserRole };
    }
    return u;
  });
  if (changed) await writeUsers(data);
}

export async function seedUsersIfEmpty(): Promise<void> {
  try {
    const data = await readUsers();
    if (data.users.length > 0) return;
  } catch {
    // file missing — seed below
  }

  const hash = (pw: string) => bcrypt.hashSync(pw, 10);
  const now = new Date().toISOString();
  const users: User[] = [
    {
      id: "u-admin",
      email: "admin@example.com",
      name: "Admin",
      password: hash("admin123"),
      role: "admin",
      avatar: "user-felix",
      createdAt: now,
    },
    {
      id: "u-dev-1",
      email: "alex@example.com",
      name: "Alex Rivera",
      password: hash("dev123"),
      role: "developer",
      avatar: "user-aisha",
      createdAt: now,
    },
    {
      id: "u-dev-2",
      email: "sam@example.com",
      name: "Sam Chen",
      password: hash("dev123"),
      role: "developer",
      avatar: "user-sam",
      createdAt: now,
    },
    {
      id: "u-viewer",
      email: "viewer@example.com",
      name: "Guest Viewer",
      password: hash("viewer123"),
      role: "viewer",
      avatar: "user-mia",
      createdAt: now,
    },
  ];

  await writeUsers({ users });
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const { users } = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  const { users } = await readUsers();
  return users.find((u) => u.id === id);
}

export async function listUsers(): Promise<User[]> {
  const { users } = await readUsers();
  return users;
}

export async function getUsedAvatars(excludeUserId?: string): Promise<Set<string>> {
  const users = await listUsers();
  return new Set(
    users.filter((u) => u.id !== excludeUserId).map((u) => u.avatar),
  );
}

export async function getAvailableAvatars(excludeUserId?: string): Promise<string[]> {
  const used = await getUsedAvatars(excludeUserId);
  return AVATAR_OPTIONS.filter((a) => !used.has(a));
}

async function assertAvatarAvailable(avatar: string, excludeUserId?: string): Promise<void> {
  if (!isAvatarId(avatar)) {
    throw new Error("Invalid avatar selection");
  }
  const used = await getUsedAvatars(excludeUserId);
  if (used.has(avatar)) {
    throw new Error("This avatar is already taken by another user");
  }
}

export async function getRegistryComponentBySlug(slug: string): Promise<RegistryComponent | undefined> {
  const db = await readDb();
  return db.components.find((c) => c.slug === slug);
}

export async function deleteRegistryComponent(slug: string): Promise<void> {
  const db = await readDb();
  const before = db.components.length;
  db.components = db.components.filter((c) => c.slug !== slug);
  if (db.components.length === before) {
    throw new Error("Component not found in registry");
  }
  db.stats = {
    ...db.stats,
    totalComponents: db.components.length,
    stableComponents: db.components.filter((c) => c.status === "stable").length,
    betaComponents: db.components.filter((c) => c.status === "beta").length,
  };
  await writeDb(db);
}

export async function createUser(input: {
  email: string;
  name: string;
  password: string;
  avatar: string;
  role?: UserRole;
}): Promise<User> {
  const data = await readUsers();
  if (data.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("Email already registered");
  }

  await assertAvatarAvailable(input.avatar);

  const user: User = {
    id: `u-${Date.now()}`,
    email: input.email.toLowerCase(),
    name: input.name,
    password: bcrypt.hashSync(input.password, 10),
    role: input.role ?? "developer",
    avatar: input.avatar,
    createdAt: new Date().toISOString(),
  };

  data.users.push(user);
  await writeUsers(data);
  return user;
}

export async function updateUser(
  id: string,
  patch: Partial<Pick<User, "name" | "email" | "role" | "avatar" | "password">>,
): Promise<{ user: User; demotedAdmins: PublicUser[] }> {
  const data = await readUsers();
  const idx = data.users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");

  const current = data.users[idx]!;
  if (patch.email && patch.email !== current.email) {
    if (data.users.some((u) => u.email.toLowerCase() === patch.email!.toLowerCase())) {
      throw new Error("Email already in use");
    }
  }

  if (patch.avatar && patch.avatar !== current.avatar) {
    await assertAvatarAvailable(patch.avatar, id);
  }

  const demotedAdmins: PublicUser[] = [];

  if (patch.role && patch.role !== "admin" && current.role === "admin") {
    const otherAdmins = data.users.filter((u) => u.role === "admin" && u.id !== id);
    if (otherAdmins.length === 0) {
      throw new Error("Cannot demote the last admin — promote another user to admin first");
    }
  }

  if (patch.role === "admin" && current.role !== "admin") {
    const fallbackRole: UserRole = "developer";
    for (let i = 0; i < data.users.length; i++) {
      const u = data.users[i]!;
      if (u.role === "admin" && u.id !== id) {
        data.users[i] = { ...u, role: fallbackRole };
        demotedAdmins.push(toPublicUser(data.users[i]!));
      }
    }
  }

  const updated: User = {
    ...current,
    ...patch,
    password: patch.password ? bcrypt.hashSync(patch.password, 10) : current.password,
  };
  data.users[idx] = updated;
  await writeUsers(data);
  return { user: updated, demotedAdmins };
}

export async function deleteUser(id: string): Promise<void> {
  const data = await readUsers();
  const user = data.users.find((u) => u.id === id);
  if (!user) throw new Error("User not found");
  if (user.role === "admin" && data.users.filter((u) => u.role === "admin").length <= 1) {
    throw new Error("Cannot delete the last admin");
  }
  data.users = data.users.filter((u) => u.id !== id);
  await writeUsers(data);
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}

export async function listRegistryComponents(): Promise<RegistryComponent[]> {
  const db = await readDb();
  return db.components;
}

export async function upsertRegistryComponent(
  component: Omit<RegistryComponent, "id" | "createdAt"> & { id?: string },
): Promise<RegistryComponent> {
  const db = await readDb();
  const idx = db.components.findIndex((c) => c.slug === component.slug);
  const now = new Date().toISOString();

  if (idx >= 0) {
    const existing = db.components[idx]!;
    const updated: RegistryComponent = {
      ...existing,
      ...component,
      id: existing.id,
      createdAt: existing.createdAt,
    };
    db.components[idx] = updated;
    await writeDb(db);
    return updated;
  }

  const created: RegistryComponent = {
    ...component,
    id: String(Date.now()),
    createdAt: now,
  } as RegistryComponent;
  db.components.push(created);
  await writeDb(db);
  return created;
}

export async function getDevelopers(): Promise<PublicUser[]> {
  const users = await listUsers();
  return users
    .filter((u) => u.role === "developer" || u.role === "admin")
    .map(toPublicUser);
}

export async function listProjects(): Promise<Project[]> {
  const db = await readDb();
  return db.projects ?? [];
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return (await listProjects()).find((p) => p.id === id);
}

export async function createProject(input: {
  name: string;
  description: string;
  memberIds: string[];
  createdBy: string;
}): Promise<Project> {
  const db = await readDb();
  if (!db.projects) db.projects = [];
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (db.projects.some((p) => p.slug === slug)) {
    throw new Error("A project with this name already exists");
  }
  const project: Project = {
    id: `proj-${Date.now()}`,
    name: input.name.trim(),
    slug,
    description: input.description.trim(),
    createdBy: input.createdBy,
    memberIds: [...new Set(input.memberIds)],
    createdAt: new Date().toISOString(),
  };
  db.projects.push(project);
  await writeDb(db);
  return project;
}

export async function updateProject(
  id: string,
  patch: Partial<Pick<Project, "name" | "description" | "memberIds">>,
): Promise<Project> {
  const db = await readDb();
  const idx = (db.projects ?? []).findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Project not found");
  const current = db.projects![idx]!;
  const updated: Project = {
    ...current,
    ...patch,
    name: patch.name?.trim() ?? current.name,
    description: patch.description?.trim() ?? current.description,
    memberIds: patch.memberIds ? [...new Set(patch.memberIds)] : current.memberIds,
  };
  db.projects![idx] = updated;
  await writeDb(db);
  return updated;
}

export async function deleteProject(id: string): Promise<void> {
  const db = await readDb();
  const projects = db.projects ?? [];
  if (projects.length <= 1) throw new Error("Cannot delete the last project");
  if (db.components.some((c) => c.projectId === id)) {
    throw new Error("Remove or reassign components before deleting this project");
  }
  db.projects = projects.filter((p) => p.id !== id);
  await writeDb(db);
}

export async function migrateDbComponents(): Promise<void> {
  const db = await readDb();
  let changed = false;

  if (!db.projects || db.projects.length === 0) {
    db.projects = [
      {
        id: "proj-core",
        name: "Forge Core",
        slug: "forge-core",
        description: "Default design system — all platform components",
        createdBy: "u-admin",
        memberIds: ["u-admin", "u-dev-1", "u-dev-2"],
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    ];
    changed = true;
  }

  db.components = db.components.map((c) => {
    let next = { ...c };
    if (!next.createdBy) {
      next = { ...next, createdBy: "system", authorName: "Forge Team", authorAvatar: "user-felix" };
      changed = true;
    }
    if (!next.createdAt) {
      next = { ...next, createdAt: "2026-01-01T00:00:00.000Z" };
      changed = true;
    }
    if (!next.projectId) {
      next = { ...next, projectId: "proj-core" };
      changed = true;
    }
    return next;
  });

  const DEMO_COMPONENTS: Omit<RegistryComponent, "id" | "createdAt">[] = [
    { name: "Checkbox", slug: "checkbox", category: "inputs", description: "Boolean toggle for forms", status: "stable", schemaFile: "checkbox.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
    { name: "Toggle", slug: "toggle", category: "inputs", description: "On/off switch control", status: "stable", schemaFile: "toggle.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
    { name: "Switch", slug: "switch", category: "inputs", description: "Binary state switch", status: "beta", schemaFile: "switch.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-2", authorName: "Sam Chen", authorAvatar: "user-sam", projectId: "proj-core" },
    { name: "Alert", slug: "alert", category: "display", description: "Inline status message banner", status: "stable", schemaFile: "alert.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
    { name: "Tooltip", slug: "tooltip", category: "overlay", description: "Hover hint overlay", status: "beta", schemaFile: "tooltip.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-2", authorName: "Sam Chen", authorAvatar: "user-sam", projectId: "proj-core" },
    { name: "Tag", slug: "tag", category: "display", description: "Removable label chip", status: "stable", schemaFile: "tag.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
    { name: "Chip", slug: "chip", category: "display", description: "Compact choice chip", status: "stable", schemaFile: "chip.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-2", authorName: "Sam Chen", authorAvatar: "user-sam", projectId: "proj-core" },
    { name: "Spinner", slug: "spinner", category: "display", description: "Loading indicator", status: "stable", schemaFile: "spinner.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-admin", authorName: "Forge Admin", authorAvatar: "user-felix", projectId: "proj-core" },
    { name: "Progress", slug: "progress", category: "display", description: "Progress bar indicator", status: "stable", schemaFile: "progress.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
    { name: "Divider", slug: "divider", category: "layout", description: "Visual section separator", status: "stable", schemaFile: "divider.schema.yaml", propsCount: 1, hasTests: true, hasStories: true, createdBy: "u-dev-2", authorName: "Sam Chen", authorAvatar: "user-sam", projectId: "proj-core" },
    { name: "Link", slug: "link", category: "inputs", description: "Styled anchor link", status: "stable", schemaFile: "link.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
    { name: "Heading", slug: "heading", category: "display", description: "Typography heading levels", status: "stable", schemaFile: "heading.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-admin", authorName: "Forge Admin", authorAvatar: "user-felix", projectId: "proj-core" },
    { name: "Radio", slug: "radio", category: "inputs", description: "Single choice radio input", status: "beta", schemaFile: "radio.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-2", authorName: "Sam Chen", authorAvatar: "user-sam", projectId: "proj-core" },
    { name: "Pill", slug: "pill", category: "display", description: "Rounded status pill", status: "stable", schemaFile: "pill.schema.yaml", propsCount: 2, hasTests: true, hasStories: true, createdBy: "u-dev-1", authorName: "Alex Rivera", authorAvatar: "user-aisha", projectId: "proj-core" },
  ];

  for (const demo of DEMO_COMPONENTS) {
    if (!db.components.some((c) => c.slug === demo.slug)) {
      db.components.push({
        ...demo,
        id: `demo-${demo.slug}`,
        createdAt: new Date().toISOString(),
      });
      changed = true;
    }
  }

  const catalogItems = getCatalogItems();
  for (const item of catalogItems) {
    if (!db.components.some((c) => c.slug === item.slug)) {
      db.components.push({
        id: `cat-${item.slug}`,
        name: item.name,
        slug: item.slug,
        category: item.category,
        description: item.description,
        status: "beta",
        schemaFile: `${item.slug}.schema.yaml`,
        propsCount: 3,
        hasTests: true,
        hasStories: true,
        createdBy: "u-admin",
        authorName: "Forge Catalog",
        authorAvatar: "user-felix",
        projectId: "proj-core",
        createdAt: new Date().toISOString(),
      });
      changed = true;
    }
  }

  const existingCategories = (db.categories ?? []) as { id: string; slug: string; label: string; icon: string }[];
  for (const cat of CATALOG_CATEGORIES) {
    if (!existingCategories.some((c) => c.slug === cat.slug)) {
      existingCategories.push({
        id: `cat-${cat.slug}`,
        slug: cat.slug,
        label: cat.label,
        icon: cat.icon,
      });
      changed = true;
    }
  }
  db.categories = existingCategories;

  db.stats = {
    ...db.stats,
    totalComponents: db.components.length,
    stableComponents: db.components.filter((c) => c.status === "stable").length,
    betaComponents: db.components.filter((c) => c.status === "beta").length,
    totalProjects: db.projects.length,
  };

  if (!db.developers) {
    db.developers = [];
    changed = true;
  }
  if (changed) await writeDb(db);
}
