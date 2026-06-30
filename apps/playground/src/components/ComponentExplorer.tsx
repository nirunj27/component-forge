import { useEffect, useMemo, useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@component-forge/app-ui/components/ui/badge";
import { Button } from "@component-forge/app-ui/components/ui/button";
import { Input } from "@component-forge/app-ui/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@component-forge/app-ui/components/ui/dialog";
import { cn } from "@component-forge/app-ui/lib/utils";
import { useRegistry } from "../hooks/useRegistry";
import type { RegistryComponent } from "../hooks/useRegistry";
import { ComponentPreview } from "../lib/componentPreviews";
import { ComponentSourceViewer } from "./ComponentSourceViewer";
import { VirtualizedComponentGrid } from "./VirtualizedComponentGrid";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@component-forge/app-ui/components/ui/tabs";

export function ComponentExplorer() {
  const { components, categories, stats } = useRegistry();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<RegistryComponent | null>(null);
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = useMemo(() => {
    if (!components.data) return [];
    const q = debounced.toLowerCase();
    return components.data.filter((c) => {
      const matchCat = category === "all" || c.category === category;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.slug.includes(q) ||
        c.authorName?.toLowerCase().includes(q) ||
        c.category.includes(q);
      return matchCat && matchQ;
    });
  }, [components.data, category, debounced]);

  const openComponent = useCallback((c: RegistryComponent) => {
    setSelected(c);
    toast.message(`Preview: ${c.name}`, { description: c.description });
  }, []);

  return (
    <section className="py-16" id="explorer">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div>
          <h2 className="text-3xl font-bold">Component explorer</h2>
          <p className="text-muted-foreground">
            {stats.data?.totalComponents ?? components.data?.length ?? 0} components — virtualized
            grid renders only visible cards. Click any card to preview.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by name, slug, author, category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-full border px-3 py-1 text-sm",
              category === "all" ? "border-primary bg-primary/10 text-primary" : "border-border",
            )}
          >
            All ({components.data?.length ?? 0})
          </button>
          {categories.data?.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm",
                category === c.slug ? "border-primary bg-primary/10 text-primary" : "border-border",
              )}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {components.loading ? (
          <p className="text-muted-foreground">Loading components…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">No components match &quot;{debounced}&quot;</p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} result{filtered.length === 1 ? "" : "s"} (virtual scroll)
            </p>
            <VirtualizedComponentGrid
              items={filtered}
              searchQuery={debounced}
              onOpen={openComponent}
            />
          </>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selected.name}
                  <Badge variant="outline">{selected.category}</Badge>
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">{selected.description}</p>

              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Live preview</TabsTrigger>
                  <TabsTrigger value="code">Generated code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <ComponentPreview component={selected} />
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <ComponentSourceViewer slug={selected.slug} componentName={selected.name} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>by {selected.authorName}</span>
                <span>
                  {selected.propsCount} props · {selected.schemaFile}
                </span>
              </div>
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
