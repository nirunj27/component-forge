import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@component-forge/app-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@component-forge/app-ui/components/ui/dialog";
import { Input } from "@component-forge/app-ui/components/ui/input";
import { ScrollArea } from "@component-forge/app-ui/components/ui/scroll-area";
import { cn } from "@component-forge/app-ui/lib/utils";
import { COMPONENT_GROUPS } from "@component-forge/catalog";

interface ComponentCatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingSlugs: string[];
  onSelect: (name: string) => void;
}

export function ComponentCatalogDialog({
  open,
  onOpenChange,
  existingSlugs,
  onSelect,
}: ComponentCatalogDialogProps) {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | "all">("all");

  const q = search.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    return COMPONENT_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const slug = item.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        const matchGroup = activeGroup === "all" || group.id === activeGroup;
        const matchSearch =
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          slug.includes(q) ||
          group.label.toLowerCase().includes(q);
        return matchGroup && matchSearch;
      }),
    })).filter((g) => g.items.length > 0);
  }, [q, activeGroup]);

  const totalMatches = filteredGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-3xl flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Component catalog</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Pick a starter template from 140+ UI components across 17 categories.
          </p>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search components…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGroup("all")}
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              activeGroup === "all" ? "border-primary bg-primary/10 text-primary" : "border-border",
            )}
          >
            All
          </button>
          {COMPONENT_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveGroup(g.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                activeGroup === g.id ? "border-primary bg-primary/10 text-primary" : "border-border",
              )}
            >
              {g.icon} {g.label}
            </button>
          ))}
        </div>

        <ScrollArea className="min-h-0 flex-1 pr-3">
          {totalMatches === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No components match your search.</p>
          ) : (
            <div className="space-y-6">
              {filteredGroups.map((group) => (
                <section key={group.id}>
                  <h3 className="mb-2 text-sm font-semibold">
                    {group.icon} {group.label}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => {
                      const slug = item.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                      const exists = existingSlugs.includes(slug);
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            onSelect(item.name);
                            onOpenChange(false);
                            setSearch("");
                          }}
                          className={cn(
                            "rounded-lg border p-3 text-left transition-colors hover:border-primary hover:bg-primary/5",
                            exists && "border-dashed opacity-80",
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-sm">{item.name}</span>
                            {exists && (
                              <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                exists
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
