import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@component-forge/app-ui/components/ui/alert";
import { Button } from "@component-forge/app-ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@component-forge/app-ui/components/ui/card";
import { Input } from "@component-forge/app-ui/components/ui/input";
import { Label } from "@component-forge/app-ui/components/ui/label";
import { cn } from "@component-forge/app-ui/lib/utils";
import { getAvatarUrl } from "../lib/avatars";
import { PasswordField, getPasswordStrength } from "../components/PasswordField";
import { fetchAvatars, register } from "../lib/auth";
import { useAuthStore } from "../store/authStore";
import { formatZodErrors, registerSchema } from "../lib/validation";

const PASSWORD_HINTS = [
  { test: (p: string) => p.length >= 8, label: "8+ characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "Uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), label: "Lowercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "Number" },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: "Special character" },
];

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatars, setAvatars] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvatars()
      .then((available) => {
        setAvatars(available);
        if (available[0]) setAvatar(available[0]);
      })
      .catch(() => setError("Could not load avatars"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const parsed = registerSchema.safeParse({ name, email, password, avatar });
    if (!parsed.success) {
      setFieldErrors(formatZodErrors(parsed.error));
      return;
    }

    if (!avatars.includes(parsed.data.avatar)) {
      setFieldErrors({ avatar: "This avatar is no longer available" });
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await register(parsed.data);
      setAuth(token, user);
      toast.success("Account created — welcome to Forge!");
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Join as Developer</CardTitle>
          <CardDescription>
            Only registered developers can create and generate components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!fieldErrors.name} />
              {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!fieldErrors.email} />
              {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordField
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showStrength
                strengthScore={getPasswordStrength(password)}
                aria-invalid={!!fieldErrors.password}
              />
              <ul className="grid grid-cols-2 gap-1 text-xs">
                {PASSWORD_HINTS.map((h) => (
                  <li key={h.label} className={h.test(password) ? "text-green-600" : "text-muted-foreground"}>
                    {h.test(password) ? "✓" : "○"} {h.label}
                  </li>
                ))}
              </ul>
              {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label>Choose your profile</Label>
              {avatars.length === 0 ? (
                <p className="text-sm text-muted-foreground">No avatars available.</p>
              ) : (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {avatars.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={cn(
                        "overflow-hidden rounded-full border-2 p-0.5 transition-colors",
                        avatar === a ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50",
                      )}
                    >
                      <img src={getAvatarUrl(a)} alt="" className="h-12 w-12 rounded-full bg-muted" />
                    </button>
                  ))}
                </div>
              )}
              {fieldErrors.avatar && <p className="text-xs text-destructive">{fieldErrors.avatar}</p>}
              <p className="text-xs text-muted-foreground">Taken profiles are hidden — each user gets a unique look.</p>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading || avatars.length === 0}>
              {loading ? "Creating account…" : "Register as developer"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
