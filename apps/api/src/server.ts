import cors from "cors";
import express, { type Express } from "express";
import jsonServer from "json-server";
import { rm, unlink } from "node:fs/promises";
import { join } from "node:path";
import { getApiDataDir, getRepoRoot } from "./paths.js";
import {
  formatValidationErrors,
  safeParseComponentSchema,
  type ComponentSchema,
} from "@component-forge/schema";
import {
  generateFromSchema,
  listSchemaSlugs,
  loadSchemaBySlug,
  loadPlugins,
  saveSchemaToFile,
  serializeSchemaToYaml,
  getComponentFolderName,
} from "@component-forge/engine";
import { listPlugins } from "@component-forge/plugin-sdk";
import {
  authMiddleware,
  canCreateComponents,
  requireRoles,
  signToken,
  toPublicUser,
  type AuthedRequest,
} from "./auth.js";
import {
  AVATAR_OPTIONS,
  createProject,
  createUser,
  deleteProject,
  deleteRegistryComponent,
  deleteUser,
  findUserByEmail,
  getAvailableAvatars,
  getDevelopers,
  getRegistryComponentBySlug,
  listProjects,
  listRegistryComponents,
  listUsers,
  migrateDbComponents,
  enforceSingleAdmin,
  seedUsersIfEmpty,
  updateProject,
  updateUser,
  upsertRegistryComponent,
  verifyPassword,
  type UserRole,
} from "./store.js";
import { validateEmail, validateName, validatePassword, validateRegisterPassword } from "./validation.js";
import { loadComponentSource } from "./componentSource.js";
import { isAvatarId } from "./avatars.js";
import { CATALOG_CATEGORIES, COMPONENT_GROUPS, getCatalogItems } from "@component-forge/catalog";

function routeParam(value: string | string[] | undefined): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] ?? "";
  return "";
}

const ROOT = getRepoRoot();
const SCHEMAS_DIR = join(ROOT, "schemas");
const OUTPUT_DIR = join(ROOT, "packages/ui/src/components");
const DB_PATH = join(getApiDataDir(), "db.json");

export async function createApp(): Promise<Express> {
  const app = express();

  const allowedOrigins = process.env.CORS_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins?.length ? allowedOrigins : true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Forge-Client"],
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  await seedUsersIfEmpty();
  await enforceSingleAdmin();
  await migrateDbComponents();

app.get("/api/auth/avatars", async (req, res) => {
  const excludeUserId = typeof req.query.excludeUserId === "string" ? req.query.excludeUserId : undefined;
  const avatars = await getAvailableAvatars(excludeUserId);
  res.json({ avatars, all: AVATAR_OPTIONS });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name, avatar } = req.body as {
      email?: string;
      password?: string;
      name?: string;
      avatar?: string;
    };

    if (!email || !password || !name || !avatar) {
      res.status(400).json({ message: "email, password, name, and avatar are required" });
      return;
    }

    const emailErr = validateEmail(email);
    if (emailErr) {
      res.status(400).json({ message: emailErr });
      return;
    }
    const nameErr = validateName(name);
    if (nameErr) {
      res.status(400).json({ message: nameErr });
      return;
    }
    const passwordErr = validateRegisterPassword(password);
    if (passwordErr) {
      res.status(400).json({ message: passwordErr });
      return;
    }
    if (!isAvatarId(avatar)) {
      res.status(400).json({ message: "Invalid avatar selection" });
      return;
    }

    const available = await getAvailableAvatars();
    if (!available.includes(avatar)) {
      res.status(400).json({ message: "This avatar is already taken — choose another" });
      return;
    }

    const user = await createUser({
      email,
      password,
      name,
      avatar,
      role: "developer",
    });

    const token = signToken(user);
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Register failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ message: "email and password required" });
      return;
    }

    const emailErr = validateEmail(email);
    if (emailErr) {
      res.status(400).json({ message: emailErr });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(user, password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.json({ token: signToken(user), user: toPublicUser(user) });
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
});

app.get("/api/auth/me", authMiddleware, (req: AuthedRequest, res) => {
  res.json({ user: toPublicUser(req.user!) });
});

app.get("/api/users", authMiddleware, requireRoles("admin"), async (_req, res) => {
  const users = await listUsers();
  res.json({ users: users.map(toPublicUser) });
});

app.put("/api/users/:id", authMiddleware, requireRoles("admin"), async (req, res) => {
  try {
    const patch = req.body as {
      name?: string;
      email?: string;
      role?: string;
      avatar?: string;
      password?: string;
    };

    if (patch.email) {
      const emailErr = validateEmail(patch.email);
      if (emailErr) {
        res.status(400).json({ message: emailErr });
        return;
      }
    }
    if (patch.name) {
      const nameErr = validateName(patch.name);
      if (nameErr) {
        res.status(400).json({ message: nameErr });
        return;
      }
    }
    if (patch.password) {
      const passwordErr = validatePassword(patch.password);
      if (passwordErr) {
        res.status(400).json({ message: passwordErr });
        return;
      }
    }
    if (patch.role && !["admin", "developer", "viewer"].includes(patch.role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    const { user, demotedAdmins } = await updateUser(routeParam(req.params.id), {
      name: patch.name,
      email: patch.email,
      avatar: patch.avatar,
      password: patch.password,
      role: patch.role as UserRole | undefined,
    });
    res.json({
      user: toPublicUser(user),
      demotedAdmins,
      message:
        demotedAdmins.length > 0
          ? `${user.name} is now admin. ${demotedAdmins.map((u) => u.name).join(", ")} changed to developer.`
          : undefined,
    });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Update failed" });
  }
});

app.delete("/api/users/:id", authMiddleware, requireRoles("admin"), async (req, res) => {
  try {
    await deleteUser(routeParam(req.params.id));
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Delete failed" });
  }
});

app.get("/api/projects", authMiddleware, async (req: AuthedRequest, res) => {
  const all = await listProjects();
  const user = req.user!;
  if (user.role === "admin") {
    res.json({ projects: all });
    return;
  }
  res.json({ projects: all.filter((p) => p.memberIds.includes(user.id)) });
});

app.post("/api/projects", authMiddleware, requireRoles("admin"), async (req: AuthedRequest, res) => {
  try {
    const { name, description, memberIds } = req.body as {
      name?: string;
      description?: string;
      memberIds?: string[];
    };
    if (!name?.trim()) {
      res.status(400).json({ message: "Project name is required" });
      return;
    }
    if (!memberIds?.length) {
      res.status(400).json({ message: "Assign at least one developer" });
      return;
    }
    const project = await createProject({
      name,
      description: description ?? "",
      memberIds,
      createdBy: req.user!.id,
    });
    res.status(201).json({ project });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Create failed" });
  }
});

app.put("/api/projects/:id", authMiddleware, requireRoles("admin"), async (req, res) => {
  try {
    const project = await updateProject(routeParam(req.params.id), req.body);
    res.json({ project });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Update failed" });
  }
});

app.delete("/api/projects/:id", authMiddleware, requireRoles("admin"), async (req, res) => {
  try {
    await deleteProject(routeParam(req.params.id));
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Delete failed" });
  }
});

app.get("/api/registry/components", async (req, res) => {
  let components = await listRegistryComponents();
  const { mine, userId, projectId, search, category } = req.query;

  if (projectId && typeof projectId === "string") {
    components = components.filter((c) => c.projectId === projectId);
  }
  if (mine === "true" && typeof userId === "string") {
    components = components.filter((c) => c.createdBy === userId);
  }
  if (category && typeof category === "string" && category !== "all") {
    components = components.filter((c) => c.category === category);
  }
  if (search && typeof search === "string" && search.trim()) {
    const q = search.trim().toLowerCase();
    components = components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.slug.includes(q) ||
        c.authorName?.toLowerCase().includes(q) ||
        c.category.includes(q),
    );
  }

  const total = components.length;
  const hasPage = req.query.page !== undefined;
  const page = hasPage ? Math.max(1, Number.parseInt(String(req.query.page), 10) || 1) : 1;
  const limit = hasPage
    ? Math.min(100, Math.max(1, Number.parseInt(String(req.query.limit ?? "24"), 10) || 24))
    : total || 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;
  const items = hasPage ? components.slice(start, start + limit) : components;

  res.json({
    components: items,
    pagination: {
      page: safePage,
      limit: hasPage ? limit : total,
      total,
      totalPages: hasPage ? totalPages : 1,
    },
  });
});

app.get("/api/developers", async (_req, res) => {
  res.json({ developers: await getDevelopers() });
});

app.get("/api/catalog", async (_req, res) => {
  res.json({
    categories: CATALOG_CATEGORIES,
    groups: COMPONENT_GROUPS.map((g) => ({
      id: g.id,
      label: g.label,
      icon: g.icon,
      items: g.items.map((item) => ({
        name: item.name,
        slug: getComponentFolderName(item.name),
        description: item.description,
        category: g.id,
      })),
    })),
    items: getCatalogItems(),
    total: getCatalogItems().length,
  });
});

app.get("/api/components/:slug/source", async (req, res) => {
  try {
    const source = await loadComponentSource(OUTPUT_DIR, routeParam(req.params.slug));
    res.json(source);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load source";
    const status = message.includes("not found") || message.includes("Invalid") ? 404 : 500;
    res.status(status).json({ message });
  }
});

async function syncRegistryFromSchema(
  schema: ComponentSchema,
  user: AuthedRequest["user"],
  projectId?: string,
) {
  const slug = getComponentFolderName(schema.name);
  await upsertRegistryComponent({
    name: schema.name,
    slug,
    category: schema.category ?? "inputs",
    description: schema.description ?? "",
    status: "stable",
    schemaFile: `${slug}.schema.yaml`,
    propsCount: Object.keys(schema.props ?? {}).length,
    hasTests: true,
    hasStories: true,
    createdBy: user?.id ?? "system",
    authorName: user?.name ?? "Forge Team",
    authorAvatar: user?.avatar ?? "user-felix",
    projectId: projectId ?? "proj-core",
  });
}

app.get("/api/schemas", async (_req, res) => {
  try {
    const slugs = await listSchemaSlugs(SCHEMAS_DIR);
    res.json({ slugs });
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
});

app.get("/api/schemas/:slug", async (req, res) => {
  try {
    const slug = routeParam(req.params.slug);
    const schema = await loadSchemaBySlug(slug, SCHEMAS_DIR);
    res.json(schema);
  } catch {
    res.status(404).json({ message: `Schema not found: ${routeParam(req.params.slug)}` });
  }
});

app.put(
  "/api/schemas/:slug",
  authMiddleware,
  requireRoles("admin", "developer"),
  async (req: AuthedRequest, res) => {
    const { projectId, ...schemaBody } = req.body as ComponentSchema & { projectId?: string };
    const parsed = safeParseComponentSchema(schemaBody);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid schema",
        errors: formatValidationErrors(parsed.error),
      });
      return;
    }

    try {
      const savedPath = await saveSchemaToFile(parsed.data, SCHEMAS_DIR);
      await syncRegistryFromSchema(parsed.data, req.user, projectId);
      res.json({ ok: true, path: savedPath, schema: parsed.data });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  },
);

app.post(
  "/api/schemas",
  authMiddleware,
  requireRoles("admin", "developer"),
  async (req: AuthedRequest, res) => {
    const { projectId, ...schemaBody } = req.body as ComponentSchema & { projectId?: string };
    const parsed = safeParseComponentSchema(schemaBody);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid schema",
        errors: formatValidationErrors(parsed.error),
      });
      return;
    }

    try {
      const savedPath = await saveSchemaToFile(parsed.data, SCHEMAS_DIR);
      await syncRegistryFromSchema(parsed.data, req.user, projectId);
      res.status(201).json({ ok: true, path: savedPath, schema: parsed.data });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  },
);

app.delete(
  "/api/schemas/:slug",
  authMiddleware,
  requireRoles("admin", "developer"),
  async (req: AuthedRequest, res) => {
    const slug = routeParam(req.params.slug);
    const user = req.user!;

    try {
      const registryEntry = await getRegistryComponentBySlug(slug);
      if (!registryEntry) {
        res.status(404).json({ message: `Component not found: ${slug}` });
        return;
      }

      const isOwner = registryEntry.createdBy === user.id;
      const isAdmin = user.role === "admin";
      if (!isOwner && !isAdmin) {
        res.status(403).json({ message: "You can only delete components you created" });
        return;
      }

      const schemaPath = join(SCHEMAS_DIR, `${slug}.schema.yaml`);
      try {
        await unlink(schemaPath);
      } catch {
        // schema file may already be missing
      }

      const componentDir = join(OUTPUT_DIR, slug);
      try {
        await rm(componentDir, { recursive: true, force: true });
      } catch {
        // generated output may not exist
      }

      await deleteRegistryComponent(slug);

      res.json({ ok: true, slug, message: `Deleted component ${slug}` });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Delete failed" });
    }
  },
);

app.get("/api/plugins", async (_req, res) => {
  try {
    const plugins = await loadPlugins(ROOT);
    res.json({ plugins: listPlugins(plugins) });
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
});

app.post("/api/validate", (req, res) => {
  const parsed = safeParseComponentSchema(req.body);
  if (!parsed.success) {
    res.status(400).json({
      valid: false,
      errors: formatValidationErrors(parsed.error),
    });
    return;
  }
  res.json({ valid: true, schema: parsed.data });
});

app.post(
  "/api/generate",
  authMiddleware,
  async (req: AuthedRequest, res) => {
    if (!canCreateComponents(req.user!.role)) {
      res.status(403).json({ message: "Only developers can generate components" });
      return;
    }

    const body = req.body as {
      schema?: ComponentSchema;
      slug?: string;
      dryRun?: boolean;
      projectId?: string;
    };
    let schema: ComponentSchema;

    try {
      if (body.schema) {
        const parsed = safeParseComponentSchema(body.schema);
        if (!parsed.success) {
          res.status(400).json({
            message: "Invalid schema",
            errors: formatValidationErrors(parsed.error),
          });
          return;
        }
        schema = parsed.data;
        await saveSchemaToFile(schema, SCHEMAS_DIR);
        await syncRegistryFromSchema(schema, req.user, body.projectId);
      } else if (body.slug) {
        schema = await loadSchemaBySlug(body.slug, SCHEMAS_DIR);
      } else {
        res.status(400).json({ message: "Provide schema or slug" });
        return;
      }

      const result = await generateFromSchema(schema, {
        outputDir: OUTPUT_DIR,
        dryRun: body.dryRun ?? false,
        configDir: ROOT,
      });

      res.json({
        ok: true,
        component: schema.name,
        files: result.files.map((f) => f.filename),
        written: result.written,
      });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  },
);

  const router = jsonServer.router(DB_PATH);
  app.use("/", router);

  return app;
}

const PORT = Number(process.env.PORT ?? 3001);

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`Component Forge API running on http://localhost:${PORT}`);
    console.log(`  Auth:      POST /api/auth/login`);
    console.log(`  Registry:  GET /api/registry/components`);
    console.log(`  Source:    GET /api/components/:slug/source`);
    console.log(`  Schemas:   GET /api/schemas`);
  });
}
