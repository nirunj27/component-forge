import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@component-forge/app-ui/components/ui/alert";
import { Avatar, AvatarFallback } from "@component-forge/app-ui/components/ui/avatar";
import { Badge } from "@component-forge/app-ui/components/ui/badge";
import {
  Card,
  CardContent,
} from "@component-forge/app-ui/components/ui/card";
import { Input } from "@component-forge/app-ui/components/ui/input";
import { cn } from "@component-forge/app-ui/lib/utils";
import { useRegistry, useFilteredComponents } from "../hooks/useRegistry";
import type { RegistryComponent } from "../hooks/useRegistry";

function StatusBadge({ status }: { status: RegistryComponent["status"] }) {
  const variant =
    status === "stable" ? "default" : status === "beta" ? "secondary" : "destructive";
  return (
    <Badge variant={variant} className="text-[10px] uppercase">
      {status}
    </Badge>
  );
}

export function ComponentRegistry() {
  const { components, categories, tokens, stats } = useRegistry();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useFilteredComponents(components.data, category, debouncedSearch);

  if (components.loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading registry…
      </div>
    );
  }

  if (components.error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Alert variant="destructive">
          <AlertTitle>API unavailable</AlertTitle>
          <AlertDescription>
            Start the API with <code>pnpm api</code>
            <br />
            {components.error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <section className="pb-16" id="registry">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div>
          <h2 className="text-3xl font-bold">Component registry</h2>
          <p className="text-muted-foreground">Browse all schemas created by Forge developers.</p>
        </div>

        {stats.data && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total", value: stats.data.totalComponents },
              { label: "Stable", value: stats.data.stableComponents },
              { label: "Beta", value: stats.data.betaComponents },
              { label: "Developers", value: stats.data.totalDevelopers ?? "—" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              category === "all"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50",
            )}
          >
            All
          </button>
          {categories.data?.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                category === c.slug
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50",
              )}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        <Input
          placeholder="Search components…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card key={c.id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{c.name}</h3>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-sm text-muted-foreground">{c.description}</p>
                {c.authorName && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-sm">{c.authorAvatar ?? "⚡"}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">by {c.authorName}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {c.propsCount} props · {c.schemaFile}
                  {c.hasTests && " · tests"}
                  {c.hasStories && " · stories"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {tokens.data && tokens.data.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Design tokens</h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {tokens.data.map((t) => (
                <Card key={t.id}>
                  <CardContent className="flex items-center gap-2 p-3 text-sm">
                    {t.category === "color" && (
                      <span
                        className="h-4 w-4 shrink-0 rounded border"
                        style={{ background: t.value }}
                      />
                    )}
                    <code className="text-xs">{t.name}</code>
                    <span className="text-muted-foreground">{t.value}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
