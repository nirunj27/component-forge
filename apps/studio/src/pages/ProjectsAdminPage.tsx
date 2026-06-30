import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@component-forge/app-ui/components/ui/alert";
import { Button } from "@component-forge/app-ui/components/ui/button";
import { Input } from "@component-forge/app-ui/components/ui/input";
import { Label } from "@component-forge/app-ui/components/ui/label";
import { Textarea } from "@component-forge/app-ui/components/ui/textarea";
import {
  createProjectApi,
  deleteProjectApi,
  fetchProjects,
  fetchUsers,
  type AuthUser,
  type Project,
} from "../lib/auth";
import { AdminLayout } from "../components/AdminLayout";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { UserAvatar } from "../components/UserAvatar";
import { formatZodErrors, projectSchema } from "../lib/validation";

export function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [developers, setDevelopers] = useState<AuthUser[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDevs, setSelectedDevs] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const [p, u] = await Promise.all([fetchProjects(), fetchUsers()]);
    setProjects(p);
    setDevelopers(u.filter((x) => x.role === "developer" || x.role === "admin"));
  }

  useEffect(() => {
    load().catch((e) => setFormStatus(String(e)));
  }, []);

  function toggleDev(id: string) {
    setSelectedDevs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setFieldErrors((errs) => {
      const next = { ...errs };
      delete next.memberIds;
      return next;
    });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus(null);
    setFieldErrors({});

    const parsed = projectSchema.safeParse({
      name,
      description: description || undefined,
      memberIds: selectedDevs,
    });

    if (!parsed.success) {
      setFieldErrors(formatZodErrors(parsed.error));
      return;
    }

    setLoading(true);
    try {
      await createProjectApi({
        name: parsed.data.name,
        description: parsed.data.description ?? "",
        memberIds: parsed.data.memberIds,
      });
      toast.success("Project created");
      setName("");
      setDescription("");
      setSelectedDevs([]);
      await load();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Create failed";
      setFormStatus(msg);
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteProjectApi(deleteId);
      toast.success("Project deleted");
      setDeleteId(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Create projects and assign developers. Components are scoped to a project.
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-4 rounded-lg border bg-card p-6" noValidate>
          <h2 className="font-semibold">New project</h2>

          {formStatus && (
            <Alert variant="destructive">
              <AlertDescription>{formStatus}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="pname">Project name</Label>
            <Input
              id="pname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ops Dashboard"
              aria-invalid={!!fieldErrors.name}
            />
            {fieldErrors.name && (
              <p className="text-xs text-destructive">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdesc">Description</Label>
            <Textarea
              id="pdesc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              aria-invalid={!!fieldErrors.description}
            />
            {fieldErrors.description && (
              <p className="text-xs text-destructive">{fieldErrors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Assign developers</Label>
            <div className="flex flex-wrap gap-2">
              {developers.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDev(d.id)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                    selectedDevs.includes(d.id) ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <UserAvatar avatarId={d.avatar} name={d.name} size="sm" />
                  {d.name}
                </button>
              ))}
            </div>
            {fieldErrors.memberIds && (
              <p className="text-xs text-destructive">{fieldErrors.memberIds}</p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create project"}
          </Button>
        </form>

        <div className="space-y-3">
          <h2 className="font-semibold">All projects ({projects.length})</h2>
          {projects.map((p) => (
            <Alert key={p.id}>
              <AlertDescription>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.description || "No description"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.memberIds.length} member(s) · slug: {p.slug}
                    </p>
                  </div>
                  {projects.length > 1 && (
                    <Button variant="destructive" size="sm" onClick={() => setDeleteId(p.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {deleteId && (
        <ConfirmDialog
          open
          onOpenChange={(o) => !o && setDeleteId(null)}
          title="Delete project?"
          description="Components must be removed or reassigned first. This cannot be undone."
          confirmLabel="Delete project"
          variant="destructive"
          loading={loading}
          onConfirm={confirmDelete}
        />
      )}
    </AdminLayout>
  );
}
