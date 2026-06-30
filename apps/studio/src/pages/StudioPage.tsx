import { useCallback, useEffect, useState } from "react";
import type { ComponentSchema } from "@component-forge/schema";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@component-forge/app-ui/components/ui/alert";
import { Button } from "@component-forge/app-ui/components/ui/button";
import { Input } from "@component-forge/app-ui/components/ui/input";
import { Label } from "@component-forge/app-ui/components/ui/label";
import { ScrollArea } from "@component-forge/app-ui/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@component-forge/app-ui/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@component-forge/app-ui/components/ui/tabs";
import { Textarea } from "@component-forge/app-ui/components/ui/textarea";
import { cn } from "@component-forge/app-ui/lib/utils";
import {
  createSchema,
  deleteComponent,
  fetchSchema,
  fetchSchemaSlugs,
  generateComponent,
  saveSchema,
} from "../lib/api";
import { fetchRegistryComponents, fetchProjects, type Project, type RegistryComponent } from "../lib/auth";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { UserAvatar } from "../components/UserAvatar";
import { createEmptySchema, createSchemaFromCatalog, CATEGORIES } from "../lib/defaults";
import { ComponentCatalogDialog } from "../components/ComponentCatalogDialog";
import { PropsEditor } from "../components/PropsEditor";
import { SlotsEditor } from "../components/SlotsEditor";
import { A11yEditor, EventsEditor, OptionsEditor } from "../components/A11yEditor";
import { YamlPreview } from "../components/YamlPreview";
import { Navbar } from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

type SidebarView = "all" | "mine";

export function StudioPage() {
  const user = useAuthStore((s) => s.user)!;
  const isDeveloper = useAuthStore((s) => s.isDeveloper);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  const [sidebarView, setSidebarView] = useState<SidebarView>("all");
  const [registry, setRegistry] = useState<RegistryComponent[]>([]);
  const [slugs, setSlugs] = useState<string[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [schema, setSchema] = useState<ComponentSchema>(createEmptySchema());
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState<string>("proj-core");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const loadData = useCallback(async () => {
    const [allRegistry, allSlugs] = await Promise.all([
      fetchRegistryComponents(sidebarView === "mine", user.id, projectId),
      fetchSchemaSlugs(),
    ]);
    setRegistry(allRegistry);
    setSlugs(allSlugs);
    return { allRegistry, allSlugs };
  }, [sidebarView, user.id, projectId]);

  useEffect(() => {
    fetchProjects()
      .then((p) => {
        setProjects(p);
        if (p[0] && !p.some((x) => x.id === projectId)) setProjectId(p[0].id);
      })
      .catch(() => {});
  }, [projectId]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .then(({ allRegistry }) => {
        if (allRegistry[0]) setActiveSlug((prev) => prev ?? allRegistry[0]!.slug);
      })
      .catch(() => setStatus("Cannot reach API — run pnpm api"))
      .finally(() => setLoading(false));
  }, [loadData]);

  useEffect(() => {
    if (!activeSlug || isNew) return;
    fetchSchema(activeSlug)
      .then(setSchema)
      .catch(() => setStatus(`Failed to load schema: ${activeSlug}`));
  }, [activeSlug, isNew]);

  function patchSchema(patch: Partial<ComponentSchema>) {
    setSchema((s) => ({ ...s, ...patch }));
    setStatus(null);
  }

  const visibleSlugs =
    sidebarView === "all"
      ? slugs
      : slugs.filter((s) => registry.some((r) => r.slug === s && r.createdBy === user.id));

  async function handleSave() {
    if (!isDeveloper()) {
      setStatus("Only developers can save components");
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      if (isNew) {
        await createSchema(schema, projectId);
        setIsNew(false);
      } else {
        await saveSchema(schema, projectId);
      }
      await loadData();
      const slug = schema.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      setActiveSlug(slug);
      toast.success(`Saved ${schema.name}`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerate() {
    if (!isDeveloper()) {
      setStatus("Only developers can generate components");
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      const files = await generateComponent(schema, projectId);
      toast.success(`Generated ${files.length} files`);
      await loadData();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Generate failed");
    } finally {
      setSaving(false);
    }
  }

  function handleNew() {
    if (!isDeveloper()) {
      setStatus("Only developers can create components");
      return;
    }
    setCatalogOpen(true);
  }

  function handleCatalogSelect(name: string) {
    setIsNew(true);
    setActiveSlug(null);
    setSchema(createSchemaFromCatalog(name));
    setStatus(`Creating ${name} from catalog template`);
  }

  function handleBlankNew() {
    setIsNew(true);
    setActiveSlug(null);
    setSchema(createEmptySchema());
    setStatus("Creating blank component");
    setCatalogOpen(false);
  }

  function getAuthor(slug: string) {
    return registry.find((r) => r.slug === slug);
  }

  function canDeleteComponent(slug: string): boolean {
    const meta = getAuthor(slug);
    if (!meta) return isAdmin();
    if (isAdmin()) return true;
    if (!isDeveloper()) return false;
    return meta.createdBy === user.id;
  }

  async function handleDelete() {
    if (!activeSlug || isNew) return;
    setSaving(true);
    try {
      await deleteComponent(activeSlug);
      const remaining = visibleSlugs.filter((s) => s !== activeSlug);
      setActiveSlug(remaining[0] ?? null);
      setIsNew(false);
      setDeleteOpen(false);
      await loadData();
      toast.success(`Deleted ${activeSlug}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {status && (
        <Alert className="rounded-none border-x-0 border-t-0 border-blue-200 bg-blue-50">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}

      {!isDeveloper() && (
        <Alert className="rounded-none border-x-0 border-t-0 border-amber-200 bg-amber-50">
          <AlertDescription>
            You are signed in as <strong>viewer</strong> — browse all components. Only developers
            can create or edit.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-64 shrink-0 flex-col border-r bg-card p-4">
          {projects.length > 0 && (
            <div className="mb-4 space-y-2">
              <Label>Project</Label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Tabs
            value={sidebarView}
            onValueChange={(v) => setSidebarView(v as SidebarView)}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="mine">Mine</TabsTrigger>
            </TabsList>
          </Tabs>

          {isDeveloper() && (
            <div className="mb-4 space-y-2">
              <Button className="w-full" onClick={handleNew}>
                + From catalog
              </Button>
              <Button className="w-full" variant="outline" onClick={handleBlankNew}>
                Blank component
              </Button>
            </div>
          )}

          <ScrollArea className="flex-1">
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : visibleSlugs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No components in this view.</p>
            ) : (
              <div className="space-y-1">
                {visibleSlugs.map((slug) => {
                  const meta = getAuthor(slug);
                  const active = activeSlug === slug && !isNew;
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => {
                        setIsNew(false);
                        setActiveSlug(slug);
                      }}
                      className={cn(
                        "flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        active ? "bg-primary/10 text-primary" : "hover:bg-muted",
                      )}
                    >
                      <UserAvatar avatarId={meta?.authorAvatar ?? "user-felix"} name={meta?.authorName} size="sm" />
                      <span>
                        <span className="block font-medium capitalize">{slug}</span>
                        {meta?.authorName && (
                          <span className="block text-xs text-muted-foreground">{meta.authorName}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </aside>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_340px]">
          <ScrollArea className="h-[calc(100vh-4rem)] border-r p-4">
            {isDeveloper() && (
              <div className="mb-4 flex flex-wrap gap-2">
                <Button disabled={saving} onClick={handleSave}>
                  {saving && <Loader2 className="animate-spin" />}
                  Save schema
                </Button>
                <Button variant="secondary" disabled={saving} onClick={handleGenerate}>
                  Save &amp; Generate
                </Button>
                {activeSlug && !isNew && canDeleteComponent(activeSlug) && (
                  <Button variant="destructive" disabled={saving} onClick={() => setDeleteOpen(true)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            )}

            <div className="editor space-y-4">
              <section className="panel rounded-lg border bg-card p-4">
                <h3 className="mb-3 font-semibold">General</h3>
                <div className="grid-2 grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (PascalCase)</Label>
                    <Input
                      id="name"
                      value={schema.name}
                      onChange={(e) => patchSchema({ name: e.target.value })}
                      disabled={!isDeveloper()}
                      placeholder="Button"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={schema.category ?? "inputs"}
                      onValueChange={(v) => patchSchema({ category: v })}
                      disabled={!isDeveloper()}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="span-2 space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={2}
                      value={schema.description ?? ""}
                      onChange={(e) => patchSchema({ description: e.target.value })}
                      disabled={!isDeveloper()}
                    />
                  </div>
                </div>
              </section>

              {isDeveloper() ? (
                <>
                  <PropsEditor props={schema.props ?? {}} onChange={(props) => patchSchema({ props })} />
                  <SlotsEditor slots={schema.slots ?? []} onChange={(slots) => patchSchema({ slots })} />
                  <EventsEditor events={schema.events ?? []} onChange={(events) => patchSchema({ events })} />
                  <OptionsEditor
                    options={schema.options}
                    onChange={(options) => patchSchema({ options: options?.length ? options : undefined })}
                  />
                  <A11yEditor a11y={schema.a11y} onChange={(a11y) => patchSchema({ a11y })} />
                </>
              ) : (
                <Alert>
                  <AlertDescription>
                    Switch to a developer account to edit schema fields.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </ScrollArea>

          <YamlPreview schema={schema} />
        </div>
      </div>

      <ComponentCatalogDialog
        open={catalogOpen}
        onOpenChange={setCatalogOpen}
        existingSlugs={slugs}
        onSelect={handleCatalogSelect}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete ${activeSlug}?`}
        description="This removes the YAML schema, registry entry, and generated UI files. This cannot be undone."
        confirmLabel="Delete component"
        variant="destructive"
        loading={saving}
        onConfirm={handleDelete}
      />
    </div>
  );
}
