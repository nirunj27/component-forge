import { useEffect, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@component-forge/app-ui/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@component-forge/app-ui/components/ui/tabs";
import { cn } from "@component-forge/app-ui/lib/utils";
import { fetchComponentSource, type ComponentSourceFile } from "../lib/api";

interface ComponentSourceViewerProps {
  slug: string;
  componentName: string;
}

export function ComponentSourceViewer({ slug, componentName }: ComponentSourceViewerProps) {
  const [files, setFiles] = useState<ComponentSourceFile[]>([]);
  const [activeFile, setActiveFile] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setCopied(false);

    fetchComponentSource(slug)
      .then((source) => {
        if (cancelled) return;
        setFiles(source.files);
        const main =
          source.files.find(
            (f) => f.filename.endsWith(".tsx") && !f.filename.includes(".test.") && !f.filename.includes(".stories."),
          ) ?? source.files[0];
        setActiveFile(main?.filename ?? "");
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const current = files.find((f) => f.filename === activeFile);

  async function copyCode() {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.content);
      setCopied(true);
      toast.success(`Copied ${current.filename}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  }

  async function copyImport() {
    const snippet = `import { ${componentName} } from "@component-forge/ui";`;
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Copied import statement");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading generated code…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Generated files in <code className="rounded bg-muted px-1">packages/ui/src/components/{slug}/</code>
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={copyImport}>
            Copy import
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={copyCode} disabled={!current}>
            {copied ? <Check className="mr-1 h-3.5 w-3.5" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy file"}
          </Button>
        </div>
      </div>

      <Tabs value={activeFile} onValueChange={setActiveFile}>
        <TabsList className="h-auto flex-wrap justify-start">
          {files.map((file) => (
            <TabsTrigger key={file.filename} value={file.filename} className="text-xs">
              {file.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {files.map((file) => (
          <TabsContent key={file.filename} value={file.filename} className="mt-0">
            <pre
              className={cn(
                "max-h-80 overflow-auto rounded-lg border bg-muted/40 p-4 text-xs leading-relaxed",
                "font-mono whitespace-pre-wrap break-words",
              )}
            >
              <code>{file.content}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
