import { Suspense, lazy, useMemo, useState } from "react";
import {
  Button,
  Badge,
  Input,
  Card,
  Modal,
  Select,
} from "@component-forge/ui";
import type { RegistryComponent } from "../hooks/useRegistry";

const generatedModules = import.meta.glob(
  "../../../../packages/ui/src/components/*/*.tsx",
) as Record<string, () => Promise<Record<string, React.ComponentType<Record<string, unknown>>>>>;

function getGeneratedLoader(slug: string, name: string) {
  const path = `../../../../packages/ui/src/components/${slug}/${name}.tsx`;
  return generatedModules[path];
}

function GeneratedPreview({ slug, name }: { slug: string; name: string }) {
  const LazyComp = useMemo(() => {
    const loader = getGeneratedLoader(slug, name);
    if (!loader) return null;
    return lazy(async () => {
      const mod = await loader();
      const Comp = mod[name];
      if (!Comp) throw new Error("Component not found");
      return { default: Comp as React.ComponentType<Record<string, unknown>> };
    });
  }, [slug, name]);

  if (!LazyComp) return null;

  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading preview…</p>}>
      <LazyComp />
    </Suspense>
  );
}

function AuthPreview({ component }: { component: RegistryComponent }) {
  const n = component.slug;
  if (n === "login-form") {
    return (
      <div className="mx-auto w-full max-w-sm space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Sign in</h3>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Email</span>
          <input type="email" className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Password</span>
          <input type="password" className="w-full rounded-md border px-3 py-2" placeholder="••••••••" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" /> Remember me
        </label>
        <button type="button" className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white">Sign in</button>
      </div>
    );
  }
  if (n === "register-form") {
    return (
      <div className="mx-auto w-full max-w-sm space-y-3 rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Create account</h3>
        {["Full name", "Email", "Password", "Confirm password"].map((f) => (
          <label key={f} className="block space-y-1 text-sm">
            <span className="font-medium">{f}</span>
            <input className="w-full rounded-md border px-3 py-2" type={f.includes("Password") ? "password" : f === "Email" ? "email" : "text"} />
          </label>
        ))}
        <button type="button" className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white">Create account</button>
      </div>
    );
  }
  if (n === "social-login-buttons") {
    return (
      <div className="flex flex-col gap-2 sm:flex-row">
        {["Google", "GitHub", "Microsoft"].map((p) => (
          <button key={p} type="button" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">{p}</button>
        ))}
      </div>
    );
  }
  return null;
}

function CategoryPreview({ component }: { component: RegistryComponent }) {
  const cat = component.category;
  const slug = component.slug;

  const auth = AuthPreview({ component });
  if (auth) return auth;

  if (cat === "forms" || cat === "inputs") {
    const type = slug.includes("password") ? "password" : slug.includes("email") ? "email" : slug.includes("phone") ? "tel" : slug.includes("search") ? "search" : slug.includes("number") ? "number" : "text";
    if (slug.includes("textarea")) {
      return (
        <label className="block w-full max-w-md space-y-1 text-sm">
          <span className="font-medium">{component.name}</span>
          <textarea className="w-full rounded-md border px-3 py-2" rows={4} placeholder="Enter text…" />
        </label>
      );
    }
    if (slug.includes("select") || slug.includes("dropdown")) {
      return (
        <label className="block w-full max-w-md space-y-1 text-sm">
          <span className="font-medium">{component.name}</span>
          <select className="w-full rounded-md border px-3 py-2">
            <option>Option A</option>
            <option>Option B</option>
          </select>
        </label>
      );
    }
    if (slug.includes("checkbox") || slug.includes("switch") || slug.includes("toggle") || slug.includes("radio")) {
      return (
        <label className="flex items-center gap-2 text-sm">
          <input type={slug.includes("radio") ? "radio" : "checkbox"} name="preview" />
          {component.name}
        </label>
      );
    }
    return (
      <label className="block w-full max-w-md space-y-1 text-sm">
        <span className="font-medium">{component.name}</span>
        <input type={type} className="w-full rounded-md border px-3 py-2" placeholder={`Enter ${component.name.toLowerCase()}…`} />
      </label>
    );
  }

  if (cat === "buttons") {
    return (
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">Primary</button>
        <button type="button" className="rounded-md border px-4 py-2 text-sm font-medium">Secondary</button>
        <button type="button" className="rounded-md px-4 py-2 text-sm font-medium text-blue-600">Ghost</button>
        {slug.includes("loading") && <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white opacity-70">Loading…</button>}
        {slug.includes("icon") && <button type="button" className="rounded-md border p-2" aria-label="Icon">★</button>}
      </div>
    );
  }

  if (cat === "navigation") {
    if (slug.includes("tabs")) {
      return (
        <div className="flex gap-1 border-b">
          {["Overview", "Details", "Settings"].map((t, i) => (
            <button key={t} type="button" className={`px-4 py-2 text-sm ${i === 0 ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}>{t}</button>
          ))}
        </div>
      );
    }
    if (slug.includes("breadcrumb")) {
      return <nav className="text-sm text-gray-500">Home / Projects / <span className="text-gray-900">Current</span></nav>;
    }
    if (slug.includes("pagination")) {
      return (
        <div className="flex gap-1">
          {["Prev", "1", "2", "3", "Next"].map((p) => (
            <button key={p} type="button" className={`rounded border px-3 py-1 text-sm ${p === "2" ? "bg-blue-600 text-white" : ""}`}>{p}</button>
          ))}
        </div>
      );
    }
    return (
      <nav className="flex flex-wrap gap-4 text-sm font-medium">
        {["Home", "Components", "Docs", "Settings"].map((l) => (
          <a key={l} href="#" className="text-gray-600 hover:text-blue-600">{l}</a>
        ))}
      </nav>
    );
  }

  if (cat === "feedback" || cat === "overlay") {
    if (slug.includes("modal") || slug.includes("dialog")) return <ModalDemo />;
    if (slug.includes("toast") || slug.includes("snackbar")) {
      return <div className="rounded-lg border bg-white px-4 py-3 shadow-lg text-sm">Saved successfully — changes applied.</div>;
    }
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        <strong>{component.name}:</strong> {component.description}
      </div>
    );
  }

  if (cat === "loading") {
    if (slug.includes("skeleton")) {
      return (
        <div className="w-full max-w-md space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
      );
    }
    if (slug.includes("progress") || slug.includes("circular")) {
      return (
        <div className="w-full max-w-xs">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-2/3 rounded-full bg-blue-600" />
          </div>
          <p className="mt-1 text-xs text-gray-500">67% complete</p>
        </div>
      );
    }
    return <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />;
  }

  if (cat === "tables" || slug.includes("table")) {
    return (
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Role</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Alex Rivera", "Developer", "Active"],
            ["Sam Chen", "Designer", "Active"],
          ].map(([a, b, c]) => (
            <tr key={a}>
              <td className="border-b p-2">{a}</td>
              <td className="border-b p-2">{b}</td>
              <td className="border-b p-2"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{c}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (cat === "data-display" || cat === "dashboard" || cat === "ecommerce" || cat === "admin") {
    if (slug.includes("avatar")) {
      return (
        <div className="flex -space-x-2">
          {["A", "S", "J"].map((l) => (
            <span key={l} className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-sm font-medium text-white">{l}</span>
          ))}
        </div>
      );
    }
    return (
      <div className="w-full max-w-sm rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{component.name}</p>
        <p className="mt-1 text-2xl font-bold">$12,480</p>
        <p className="mt-1 text-sm text-gray-500">{component.description}</p>
      </div>
    );
  }

  if (cat === "search") {
    return (
      <div className="relative w-full max-w-md">
        <input className="w-full rounded-full border py-2 pl-10 pr-4 text-sm" placeholder="Search components…" />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>
    );
  }

  if (cat === "media") {
    return (
      <div className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-sm text-gray-500">
        {component.name} preview
      </div>
    );
  }

  if (cat === "layout") {
    return (
      <div className="grid w-full max-w-md grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded border bg-white p-3 text-center text-xs text-gray-500">Col {i}</div>
        ))}
      </div>
    );
  }

  if (cat === "typography" || cat === "display") {
    return (
      <div className="space-y-2">
        <p className="text-2xl font-bold">{component.name}</p>
        <p className="text-sm text-gray-600">{component.description}</p>
        <Badge variant="success">Sample</Badge>
      </div>
    );
  }

  if (cat === "advanced") {
    return (
      <div className="w-full max-w-lg rounded-lg border bg-gray-950 p-4 font-mono text-xs text-green-400">
        {`// ${component.name}\n{\n  "preview": true,\n  "status": "ready"\n}`}
      </div>
    );
  }

  if (cat === "utility") {
    return (
      <button type="button" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
        {component.name}
      </button>
    );
  }

  if (cat === "authentication") {
    return (
      <div className="mx-auto w-full max-w-sm space-y-3 rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">{component.name}</h3>
        <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Email" />
        <input className="w-full rounded-md border px-3 py-2 text-sm" type="password" placeholder="Password" />
        <button type="button" className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white">Continue</button>
      </div>
    );
  }

  return <p className="text-sm text-muted-foreground">{component.description}</p>;
}

const LIVE: Record<string, () => React.ReactNode> = {
  button: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button loading>Loading</Button>
    </div>
  ),
  input: () => <Input label="Email" placeholder="you@example.com" />,
  select: () => <Select label="Framework" placeholder="Pick one" />,
  badge: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Stable</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="secondary">Draft</Badge>
    </div>
  ),
  card: () => (
    <Card variant="elevated" title="Schema-driven" footer={<Badge variant="success">Generated</Badge>}>
      <p>TSX, tests, Storybook, and docs from YAML.</p>
    </Card>
  ),
  modal: () => <ModalDemo />,
};

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} title="Confirm action" onClose={() => setOpen(false)}>
        <p>Interactive modal preview from generated component.</p>
        <Button variant="primary" onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </>
  );
}

function SmartPreview({ component }: { component: RegistryComponent }) {
  const hasGenerated = Boolean(getGeneratedLoader(component.slug, component.name));
  if (hasGenerated) {
    return <GeneratedPreview slug={component.slug} name={component.name} />;
  }
  return <CategoryPreview component={component} />;
}

export function ComponentPreview({ component }: { component: RegistryComponent }) {
  const live = LIVE[component.slug];

  return (
    <div className="rounded-xl border bg-muted/30 p-6">
      {live ? live() : <SmartPreview component={component} />}
    </div>
  );
}
