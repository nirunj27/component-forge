import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@component-forge/app-ui/components/ui/alert";
import { Badge } from "@component-forge/app-ui/components/ui/badge";
import { Button } from "@component-forge/app-ui/components/ui/button";
import { Input } from "@component-forge/app-ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@component-forge/app-ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@component-forge/app-ui/components/ui/table";
import { cn } from "@component-forge/app-ui/lib/utils";
import { getAvatarUrl } from "../lib/avatars";
import { deleteUserApi, fetchAvatars, fetchUsers, updateUserApi, type AuthUser } from "../lib/auth";
import { AdminLayout } from "../components/AdminLayout";
import { adminUserSchema, formatZodErrors } from "../lib/validation";
import { ConfirmDialog } from "../components/ConfirmDialog";

export function AdminPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<AuthUser>>({});
  const [availableAvatars, setAvailableAvatars] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<AuthUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function load() {
    setUsers(await fetchUsers());
  }

  useEffect(() => {
    load().catch((e) => setStatus(String(e)));
  }, []);

  async function startEdit(user: AuthUser) {
    setEditing(user.id);
    setForm({ name: user.name, email: user.email, role: user.role, avatar: user.avatar });
    setFieldErrors({});
    const avatars = await fetchAvatars(user.id);
    setAvailableAvatars(avatars);
  }

  async function saveEdit(id: string) {
    setFieldErrors({});
    const parsed = adminUserSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(formatZodErrors(parsed.error));
      return;
    }

    if (!availableAvatars.includes(parsed.data.avatar)) {
      setFieldErrors({ avatar: "Avatar is taken — choose another" });
      return;
    }

    try {
      const result = await updateUserApi(id, parsed.data);
      setEditing(null);
      setStatus(result.message ?? "User updated");
      toast.success(result.message ?? "User updated");
      await load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Update failed";
      setStatus(msg);
      toast.error(msg);
    }
  }

  async function confirmRemoveUser() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteUserApi(deleteTarget.id);
      setDeleteTarget(null);
      setStatus("User deleted");
      toast.success("User deleted");
      await load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Delete failed";
      toast.error(msg);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <AdminLayout>
      {status && (
        <Alert className="mb-6">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold">User management</h1>
        <p className="text-sm text-muted-foreground">
          Edit roles and assign unique avatars. Only one admin is allowed — promoting a user to admin
          moves the current admin to developer. Admin accounts cannot be deleted.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  {editing === u.id ? (
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {availableAvatars.map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => setForm({ ...form, avatar: a })}
                            className={cn(
                              "rounded border p-1",
                              form.avatar === a ? "border-primary bg-primary/10" : "border-border",
                            )}
                          >
                            <img src={getAvatarUrl(a)} alt="" className="h-8 w-8 rounded-full" />
                          </button>
                        ))}
                      </div>
                      {fieldErrors.avatar && (
                        <p className="text-xs text-destructive">{fieldErrors.avatar}</p>
                      )}
                    </div>
                  ) : (
                    <img src={getAvatarUrl(u.avatar)} alt="" className="h-9 w-9 rounded-full" />
                  )}
                </TableCell>
                <TableCell>
                  {editing === u.id ? (
                    <div>
                      <Input
                        value={form.name ?? ""}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="h-8"
                        aria-invalid={!!fieldErrors.name}
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-destructive">{fieldErrors.name}</p>
                      )}
                    </div>
                  ) : (
                    u.name
                  )}
                </TableCell>
                <TableCell>
                  {editing === u.id ? (
                    <div>
                      <Input
                        value={form.email ?? ""}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-8"
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-destructive">{fieldErrors.email}</p>
                      )}
                    </div>
                  ) : (
                    u.email
                  )}
                </TableCell>
                <TableCell>
                  {editing === u.id ? (
                    <div className="space-y-1">
                      <Select
                        value={form.role}
                        onValueChange={(value) =>
                          setForm({ ...form, role: value as AuthUser["role"] })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">admin</SelectItem>
                          <SelectItem value="developer">developer</SelectItem>
                          <SelectItem value="viewer">viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.role === "admin" && u.role !== "admin" && (
                        <p className="text-xs text-muted-foreground">
                          Current admin will become a developer.
                        </p>
                      )}
                    </div>
                  ) : (
                    <Badge variant="secondary">{u.role}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editing === u.id ? (
                      <>
                        <Button size="sm" onClick={() => saveEdit(u.id)}>
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditing(null);
                            setFieldErrors({});
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => startEdit(u)}>
                          Edit
                        </Button>
                        {u.role !== "admin" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteTarget(u)}
                          >
                            Delete
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          open
          onOpenChange={(o) => !o && setDeleteTarget(null)}
          title={`Delete ${deleteTarget.name}?`}
          description={`This will permanently remove ${deleteTarget.email}. This action cannot be undone.`}
          confirmLabel="Delete user"
          variant="destructive"
          loading={deleteLoading}
          onConfirm={confirmRemoveUser}
        />
      )}
    </AdminLayout>
  );
}
